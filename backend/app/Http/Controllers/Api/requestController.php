<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
            'plan' => 'required',
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
            'plan' => $request->plan,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Request sent successfully wait admin Approval'
        ]);
    }
    public function getRequests(){
        try{
            $requests=\App\Models\Request::paginate(4);
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
}
