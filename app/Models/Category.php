<?php

namespace App\Models;

use Spatie\Sluggable\SlugOptions; // Exemple d'importation
use Spatie\Sluggable\HasSlug; // Exemple d'importation
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
        ->generateSlugsFrom('name')
        ->saveSlugsTo('slug');
    }

    public function parent(){
        return $this->belongTO(Category::class, 'parent_id');
    }

    public function children(){
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function descendants(){
        return $this->children()->with('descendents');
    }
}
