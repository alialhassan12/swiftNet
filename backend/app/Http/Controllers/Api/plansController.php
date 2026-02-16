<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;

class plansController extends Controller
{
    public function getPlans()
    {
        $plans = Plan::all();
        return response()->json([
            'plans' => $plans,
            'message'=>'Plans fetched successfully'
        ]);
    }

    public function createPlan(Request $request)
    {
        $request->validate([    
            'name' => 'required',
            'price' => 'required',
            'speed' => 'required',
            'data' => 'required',
            'description' => 'required',
        ]);
        $plan = Plan::create($request->all());
        return response()->json([
            'plan' => $plan,
            'message'=>'Plan created successfully'
        ]);
    }
    public function deactivatePlan($id){
        $plan=Plan::where('id',$id)->first();
        $plan->is_active=false;
        $plan->save();
        $plans=Plan::all();
        return response()->json([
            'plans'=>$plans,
            'message'=>"{$plan->name} plan deactivated successfully"
        ]);
    }
    public function activatePlan($id){
        $plan=Plan::where('id',$id)->first();
        $plan->is_active=true;
        $plan->save();
        $plans=Plan::all();
        return response()->json([
            'plans'=>$plans,
            'message'=>"{$plan->name} plan activated successfully"
        ]);
    }
}
