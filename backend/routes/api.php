<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\clientsController;
use App\Http\Controllers\Api\plansController;
use App\Http\Controllers\Api\requestController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/createRequest', [requestController::class, 'newRequest'])->name('create-new-request');
Route::get('/plans', [plansController::class, 'getPlans'])->name('get-plans');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/check', [AuthController::class, 'check'])->name('check user');
    Route::post('/logout', [AuthController::class, 'logOut'])->name('logout');
});

//admin protected routes
Route::middleware('auth:sanctum', 'role:admin')->prefix('admin')->group(function () {
    //requests routes
    Route::get('/requests', [requestController::class, 'getRequests'])->name('get-requests');
    Route::post('/request/reject/{id}', [requestController::class, 'rejectRequest'])->name('reject-request{id}');
    Route::post('/request/approve/{id}', [requestController::class, 'approveRequest'])->name('approve-request{id}');
    //plans routes
    Route::post('/plans', [plansController::class, 'createPlan'])->name('create-plan');
    Route::get('/plans/deactivate/{id}', [plansController::class, "deactivatePlan"])->name('deactivate-plan');
    Route::get('/plans/activate/{id}', [plansController::class, "activatePlan"])->name('activate-plan');
    //clients routes
    Route::get('/clients', [clientsController::class, 'getClients'])->name('get-clients');
});
