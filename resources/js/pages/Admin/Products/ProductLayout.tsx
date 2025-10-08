import DeleteDialog from '@/components/DeleteDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import JoditEditor from 'jodit-react';
import { AlertCircle, ArrowLeft, File, Grid, Images, Layers, List, Pencil, Save, TagIcon, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface ProductLayoutProps {
    title: string;
    description: string;
    breadcrumbs: BreadcrumbItem;
    children: React.ReactNode;
    backUrl: string;
    icon?: React.ReactNode;
    productId?: number;
    activeTab?: 'edit' | 'images' | 'variation-types' | 'variations';
}

export default function ProductLayout({
    title,
    description,
    breadcrumbs,
    children,
    backUrl,
    icon,
    productId,
    activeTab = 'edit',
}: ProductLayoutProps) {

  return (
    
  );
}
