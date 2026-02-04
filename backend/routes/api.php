<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\requestController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthController::class, 'adminLogin'])->name('admin.login');
Route::post('/createRequest', [requestController::class, 'newRequest'])->name('create-new-request');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/check',[AuthController::class,'check'])->name('check user');
    Route::post('/logout', [AuthController::class, 'logOut'])->name('logout');
});

//admin protected routes
Route::middleware('auth:sanctum','role:admin')->prefix('admin')->group(function () {
    Route::get('/requests', [requestController::class, 'getRequests'])->name('get-requests');
});