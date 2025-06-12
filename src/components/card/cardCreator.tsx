import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export interface CardCreatorProps {
    name: string;
    value: number;
    image: string;
}

export const CardCreator: React.FC<CardCreatorProps> = ({ name, value, image }) => {
    return (
        <Card className='p-0 border-none flex flex-col items-center justify-center'>
            <CardHeader>
                <Image 
                    className="rounded-full dark:invert"
                    src={image}
                    alt={name}
                    width={50}
                    height={50}/>
            </CardHeader>
            <CardFooter className='flex flex-col text-center justify-center'>
                <CardTitle>{name}</CardTitle>
                <h5 className='text-md font-normal'>{value}</h5>
            </CardFooter>
        </Card>
    )
}
