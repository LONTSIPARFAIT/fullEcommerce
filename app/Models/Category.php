<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'image',
        'description',
        'parent_id',
    ];

    public function parent(){
        return $this->hasMany(Category::class, 'parent_id');
    }
}
