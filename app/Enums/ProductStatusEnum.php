<?php

namespace App\Enums;

enum ProductStatusEnum : string
{
    case Draft = 'draft';
    case Publiched = 'publiched';

    public static function lables(): array{
        return [
            self::Draft->value => __('Draft'),
            self::Publiched->value => __('Publiched'),
        ];
    }

    public static function colors(): array{
        return [
            self::Draft->value => 'bg-gray-100 text-gray-800',
            self::Publiched->value => 'bg-green-100 text-green-800',
        ];
    }
}
