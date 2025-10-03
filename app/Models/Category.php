<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasSlug;
    protected $fillable = [
        'name',
        'slug',
        'image',
        'description',
        'parent_id',
    ];
    protected $casts = [
        'parent_id' => 'integer',
    ];

    public function getSlugOptions(): SlugOptions{
        return SlugOptions::create()
        ->generateSlugForm('name')
        ->saveSlugsTo('slug');
    }

    public function parent(){
        return $this->belongTO(Category::class, 'parent_id');
    }

    public function children(){
        return $this->hasMany(Category::class, 'parent_id');
    }
}
