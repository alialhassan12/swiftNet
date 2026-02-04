<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class requestController extends Controller
{
    public function newRequest(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|unique:users,phone',
            'password' => 'required|min:8',
            'address' => 'required',
            'plan_id' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if ($user) {
            return response()->json([
                'status' => false,
                'message' => 'Email already in use'
            ]);
        }
        \App\Models\Request::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'address' => $request->address,
            'plan_id' => $request->plan_id,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Request sent successfully wait admin Approval'
        ]);
    }
    public function getRequests(){
        try{
            $requests=\App\Models\Request::paginate(4);
            $requests->load('plan');
            return response()->json([
                'requests'=>$requests
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'status'=>false,
                'message'=>'Something went wrong'.$e->getMessage()
            ]);
        }
    }
    public function rejectRequest($id){
        try{
            $request=\App\Models\Request::where('id',$id)->first();
            if($request->status=='approved'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Request already approved'
                ]);
            }
            if($request->status=='rejected'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Request already rejected'
                ]);
            }
            $request->status='rejected';
            $request->save();
            return response()->json([
                'status'=>true,
                'message'=>'Request rejected successfully'
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'status'=>false,
                'message'=>'Something went wrong'.$e->getMessage()
            ]);
        }
    }
    public function approveRequest($id){
        try{
            $request= \App\Models\Request::where('id',$id)->first();
            if($request->status=='approved'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Request already approved'
                ],200);
            }
            if($request->status=='rejected'){
                return response()->json([
                    'status'=>false,
                    'message'=>'Request already rejected'
                ],400);
            }
            $request->status='approved';
            $request->save();
            $user=User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'phone'=>$request->phone,
                'password'=>$request->password,
                'role'=>'client',
            ]);
            $client=Client::create([
                'user_id'=>$user->id,
                'address'=>$request->address,
                'plan_id'=>$request->plan_id,
            ]);
            return response()->json([
                'status'=>true,
                'message'=>'Request approved successfully'
            ]);
        }catch(Exception $e){
            return response()->json([
                'status'=>false,
                'message'=>'Something went wrong'.$e->getMessage()
            ]);
        }
    }
}
