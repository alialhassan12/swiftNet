<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function check(Request $request){
        return response()->json([
            'status'=>true,
            'message'=>'User is logged in',
            'user'=>$request->user()
        ],200);
    }
    public function login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>'required|min:8'
        ]);
        $user=User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json([
                'status'=>false,
                'message'=>'Email or password is incorrect'
            ],401);
        }
        //check if the user is client and if his account is active
        if($user->role=='client'){
            $client=Client::where('user_id',$user->id)->first();
            if($client->status=='suspended'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Your account is suspended'
                ],401);
            }
            if($client->status=='disconnected'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Your account is disconnected'
                ],401);
            }
            if($client->status=='pending'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Your account is pending approval'
                ],401);
            }
        }

        $token=$user->createToken('user-token')->plainTextToken;
        return response()->json([
            'status'=>true,
            'message'=>'Login successfully',
            'user'=>$user,
            'token'=>$token
        ],200);
    }
    public function logOut(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status'=>true,
            'message'=>'Logout successfully'
        ],200);
    }
}
