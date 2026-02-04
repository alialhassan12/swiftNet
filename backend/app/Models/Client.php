<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'user_id',
        'address',
        'plan',
        'status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // public function plan()
    // {
    //     return $this->belongsTo(Plan::class);
    // }
}
