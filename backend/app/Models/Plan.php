<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'price',
        'speed',
        'data',
        'description',
        'is_active',
    ];
    public function clients()
    {
        return $this->hasMany(Client::class);
    }
    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];
    protected $attributes = [
        'is_active' => true,
    ];
}
