<?php

namespace App\Models;

use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, HasFactory;
    protected $guarded = [];
        public function getSlugOptions(): SlugOptions{
        return SlugOptions::create()
        ->generateSlugsFrom('name')
        ->saveSlugsTo('slug');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(100);
        $this->addMediaConversion('small')->width(480);
        $this->addMediaConversion('large')->width(1200);
    }

    public function scopePublished($query)
    {
        return $query->where('status', ProductStatusEnum::Publiched->value);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variationTypes()
    {
        return $this->hasMany(VariationType::class);
    }

    public function options()
    {
        return $this->hasManyThrough(VariationTypeOption::class, VariationType::class, 'product_id',  'variation_type_id', 'id', 'id');
    }

    public function variations(){
        return $this->hasMany(ProductVariation::class);
    }

    public function getFirstImageUrl($collectionName = 'images', $conversion = 'small') {
        if ($this->options->count() > 0) {
            foreach ($this->options as $option) {
                $imageUrl = $option->getFirstMediaUrl($collectionName, $conversion);
                if ($imageUrl) {
                    return $imageUrl;
                }
            }
        }
        return $this->getFirstMediaUrl($collectionName, $conversion);
    }

    public function getPriceForFirstOption(): float{
        $firstOptions = $this->getFirstOptionMap();

        if($firstOptions){
            return $this->getPriceForOptions($firstOptions);
        }
        return $this->price;
    }

    public function getFirstOptionMap(): array{
        return $this->variationTypes->mapWithKeys(fn($type)=> [$type->id => $type->options[0]?->id])->toArray();
    }

    public function getPriceForOptions(array $optionIds=[]) {
        $optionIds = array_values($optionIds);
        sort($optionIds);
        $optionIds = json_encode($optionIds);
        foreach($this->variations as $variation){
            $a = $variation->variation_type_option_ids;
            if($optionIds == $a) {
                return $variation->price != null ? $variation->price : $this->price;
            }
        }
        return $this->price;
    }

    public function getImages() {
        if ($this->options()->count() > 0) {
            foreach ($$this->options as $option) {
                $images = $option->getMedia('images');
                if ($images->count() > 0) {
                    return $images;
                }
            }
        }
        return $this->getMedia('images');
    }

    public function getImagesForOptions(array $optionIds = null){

        if ($optionIds) {
            $optionIds = array_values($optionIds);
            sort($optionIds);
            $options = VariationTypeOption::whereIn('id',$optionIds)->get();
    
            foreach ($options as $option) {
                $image = $option->getFirstImageUrl('images','small');
                if ($image) {
                    return $image;
                }
            }
        }
        return $this->getFirstImageUrl('images','small')?:asset('images/p-1.png'); 
    }
}
