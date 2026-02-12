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
}
