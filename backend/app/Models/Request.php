<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'address',
        'plan',
        'status'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'password' => 'hashed',
    ];
    protected $attributes = [
        'status' => 'pending',
    ];
}
