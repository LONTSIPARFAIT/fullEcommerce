<?php

namespace App\Models;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions; 
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasSlug;
       protected $fillable = [
        'name',
        'slug',
        'image',
        'status',
    ];
    protected $casts = [
        'status' => 'boolean',
    ];

        public function getSlugOptions(): SlugOptions{
        return SlugOptions::create()
        ->generateSlugsFrom('name')
        ->saveSlugsTo('slug');
    }

    public function getImageUrlAttribute(){
        return $this->image ;
    }
}
