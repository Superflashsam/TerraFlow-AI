"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const PhotoGallery = ({ images }: { images: any[] }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group" onClick={() => openLightbox(index)}>
                <Image
                  src={image.url}
                  alt={image.alt || image.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedImage !== null && (
        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
            <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
                <Image
                    src={images[selectedImage].url}
                    alt={images[selectedImage].alt || images[selectedImage].title}
                    width={1600}
                    height={900}
                    className="rounded-lg object-contain"
                />
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"><ArrowLeft /></button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"><ArrowRight /></button>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
};
