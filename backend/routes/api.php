<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login',[AuthController::class,'adminLogin'])->name('admin.login');

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logOut'])->name('logout');
});