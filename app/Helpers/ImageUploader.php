<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ImageUploader
{
    public function uploadImage(UploadedFile $image, string $folder, int $maxWidth=1200) : string
    {
        try {
            $filename = uniqid() . '_' . time() .'.webp';
            $folder=trim($folder, '/');
            $storagePath="uploads/{$folder}/{$fileName}";

            $manager = new ImageManager(new Driver());
            $image = $manager->read($image);

            if($image->width() > $maxWidth){
                $image->scaleDown(width: $maxWith);
            }
        } catch (\Exception $e) {
            report ($e);
            return '';
        }
    }
}
