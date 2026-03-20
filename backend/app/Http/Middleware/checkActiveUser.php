<?php

namespace App\Http\Middleware;

use App\Models\Client;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkActiveUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->user()->role=="client"){
            $client=Client::where('user_id',$request->user()->id)->first();
            if($client->status=="suspended"){
                return response()->json([
                    'status'=>false,
                    'message'=>'your account is suspended'
                ],401);
            }
            if($client->status=="disconnected"){
                return response()->json([
                    'status'=>false,
                    'message'=>'your account is disconnected'
                ],401);
            }
            if($client->status=="pending"){
                return response()->json([
                    'status'=>false,
                    'message'=>'your account is pending approval'
                ],401);
            }
        }
        return $next($request);
    }
}
