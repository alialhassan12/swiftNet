<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Exception;
use Illuminate\Http\Request;

class clientsController extends Controller
{
    public function getClients(){
        try{
            $clients = Client::with('user:id,name,email,phone','plan:id,name')->get();
            $clients=$clients->map(function($client){
                return [
                    'id' => $client->id,
                    'user_id' => $client->user_id,
                    'name' => $client->user->name,
                    'email' => $client->user->email,
                    'phone' => $client->user->phone,
                    'address' => $client->address,
                    'plan_id' => $client->plan_id,
                    'plan_name' => $client->plan->name,
                    'status' => $client->status,
                    'created_at' => $client->created_at,
                    'updated_at' => $client->updated_at
                ];
            });
            return response()->json([
                'status' => 'success',
                'message' => 'Clients fetched successfully',
                'data' => $clients
            ]);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch clients',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function changeClientStatus(Request $request){
        try{
            $newStatus=$request->newStatus;
            $clientId=$request->client_id;
            $client=Client::where('id',$clientId)->first();
            if($client){
                $client->status=$newStatus;
                $client->save();
                $allClients=Client::with('user','plan')->get();
                $allClients=$allClients->map(function($client){
                    return [
                        'id'=>$client->id,
                        'user_id'=>$client->user_id,
                        'name'=>$client->user->name,
                        'email'=>$client->user->email,
                        'phone'=>$client->user->phone,
                        'address'=>$client->address,
                        'plan_id'=>$client->plan_id,
                        'plan_name'=>$client->plan->name,
                        'status'=>$client->status,
                        'created_at'=>$client->created_at,
                        'updated_at'=>$client->updated_at
                    ];
                });
                return response()->json([
                    'status'=>'success',
                    'message'=>'Client status changed successfully',
                    'clients'=>$allClients
                ],200);
            }else{
                return response()->json([
                    'status'=>'error',
                    'message'=>'Client not found',
                ],404);
            }
        }catch(Exception $e){
            return response()->json([
                'message'=>'Failed to change client status',
                'error'=>$e->getMessage()
            ],500);
        }   
    }
}
