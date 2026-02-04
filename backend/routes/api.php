<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\plansController;
use App\Http\Controllers\Api\requestController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthController::class, 'adminLogin'])->name('admin.login');
Route::post('/createRequest', [requestController::class, 'newRequest'])->name('create-new-request');
Route::get('/admin/plans', [plansController::class, 'getPlans'])->name('get-plans');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/check',[AuthController::class,'check'])->name('check user');
    Route::post('/logout', [AuthController::class, 'logOut'])->name('logout');
});

//admin protected routes
Route::middleware('auth:sanctum','role:admin')->prefix('admin')->group(function () {
    //requests routes
    Route::get('/requests', [requestController::class, 'getRequests'])->name('get-requests');
    Route::post('/request/reject/{id}', [requestController::class, 'rejectRequest'])->name('reject-request{id}');
    Route::post('/request/approve/{id}', [requestController::class, 'approveRequest'])->name('approve-request{id}');
    //plans routes
    Route::post('/plans', [plansController::class, 'createPlan'])->name('create-plan');
});