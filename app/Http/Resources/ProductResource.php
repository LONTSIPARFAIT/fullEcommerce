<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $options = $request->input('options') ?: [];
        if($options){
            $images = $this->getImagesForOptions($options);
        }else{
            $images = $this->getImages();
        }
        return [
            'id'
        ];
    }
}
