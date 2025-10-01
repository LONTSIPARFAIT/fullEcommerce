<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class ImageUploader
{
    public function uploadImage(UploadedFile $image, string $folder, int $maxWidth=1200) : string
    {
        try {

        } catch (\Exception $e) {
            report ($e);
            return null;
        }
    }
}
