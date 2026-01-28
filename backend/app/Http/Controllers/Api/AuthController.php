<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function adminLogin(Request $request){
        $request->validate([
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:8'
        ]);
        $user=User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
            return response()->json([
                'status'=>false,
                'message'=>'Email or password is incorrect'
            ]);
        }
        if($user->role !='admin'){
            return response()->json([
                'status'=>false,
                'message'=>'You are not authorized to login'
            ]);
        }
        $token=$user->createToken('admin-token')->plainTextToken;
        return response()->json([
            'status'=>true,
            'message'=>'Login successfully',
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function logOut(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status'=>true,
            'message'=>'Logout successfully'
        ]);
    }
}
