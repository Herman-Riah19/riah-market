import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Creator } from '@/datas/creator-data';

export const CardCreator: React.FC<Creator> = ({ name, value, image, rank = 1 }) => {
  return (
    <Card className="relative rounded-xl bg-muted p-4 text-center">
      {/* Badge rank */}
      <span className="absolute top-2 left-2 bg-black/30 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {rank}
      </span>

      <CardHeader 
        className="self-center h-[18vh] w-[10vw] rounded-full"
        style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

      <CardContent className="mt-4 p-0">
        <CardTitle className="text-base">{name}</CardTitle>
      </CardContent>

      <CardFooter className="flex flex-row items-center text-center text-sm text-muted-foreground gap-4">
        <span className="text-xs">Total Sales:</span>
        <span className="text-white font-semibold">{value.toFixed(2)} ETH</span>
      </CardFooter>
    </Card>
  );
};
