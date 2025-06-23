"use client"
import { Badge } from "@/components/ui/badge";
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

type CardResultatProps = {
    image: string;
}

export const CardImageGenerated: React.FC<CardResultatProps> = ({ image }) => {
    const t = useTranslations("Generator");
    
    const handleDownload = () => {
        // Télécharger l'image
        const link = document.createElement("a");
        link.href = image;
        link.download = "image.png"; // Nom du fichier téléchargé
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="m-5 flex flex-col rounded-xl bg-muted/50">
          <Badge variant="outline" className="absolute right-2 mr-12">
            {t('Output')}
          </Badge>
          <Card className="bg-transparent border-none shadow-none overflow-hidden mt-5 h-full">
            <CardHeader>
              <CardTitle>{('Response')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {image ? (
                  <Image
                    src={image}
                    alt="image"
                    className="aspect-auto w-full rounded-md object-cover h-full"
                    width={100}
                    height={200} />
                ) : (
                  <span className="h-[300px] w-[200px] rounded-md object-cover">{t('FreshImage')}</span>
                )}
              </div>
              <div className="mt-[10vw]">
                <Button
                  onClick={handleDownload}
                  className="text-white px-4 py-2 rounded-md"
                >
                  {t('Download')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
  )
}