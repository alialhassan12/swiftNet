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
        'plan_id',
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
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
