<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

class ImageUploader
{
    public static function uploadImage(UploadedFile $image, string $folder, int $maxWidth = 1200): string
    {
        try {
            $filename = uniqid() . '_' . time() . '.webp'; // Nom de fichier avec l'extension WebP
            $folder = trim($folder, '/');
            $storagePath = "uploads/{$folder}/{$filename}";

            // Instancier ImageManager avec le driver spécifié
            $manager = new ImageManager('gd'); // Utiliser 'gd' ou 'imagick'
            $image = $manager->make($image); // Utilisez make() pour créer une instance d'image

            // Redimensionner l'image si elle dépasse la largeur maximale
            if ($image->width() > $maxWidth) {
                $image->resize($maxWidth, null, function ($constraint) {
                    $constraint->aspectRatio(); // Conserver le ratio
                    $constraint->upsize(); // Ne pas agrandir l'image
                });
            }

            // Encodez l'image au format WebP avec la qualité souhaitée
            $encodedImage = (string) $image->encode('webp', 75);

            // Enregistrez l'image dans le système de fichiers
            Storage::disk('public')->put($storagePath, $encodedImage);

            // Retournez le chemin public
            return str_replace('public/', '', '/storage/', $storagePath);

        } catch (\Exception $e) {
            report($e);
            return '';
        }
    }

    public static function deleteImage($path): bool
    {
        try {
            if($path){
                if (!Storage::disk('public')->exists($path)) {
                    return false;
                }
            }

            Storage::disk('public')->delete($path);
            return true;
        } catch (\Exception $e) {
            report($e);
            return false;
        }
    }
}
