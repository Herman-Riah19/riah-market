"use client"
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl';

export const CardPresentation = () => {
  const t = useTranslations("Home")
  return (
    <Card className='border-none shadow-none bg-transparent'>
        <CardContent>
            <h3 className="text-4xl lg:text-7xl lg:leading-24 font-bold">{t('Presentation')}</h3>
            <p className="text-lg font-normal">Marketplace for monster character collections non fungible token NFTs</p>
        </CardContent>
        <CardFooter className='flex flex-col lg:flex-row gap-2'>
            <Button variant="default" className='w-52'>Create</Button>
            <Button variant="outline" className='w-52'>Sell</Button>
        </CardFooter>
    </Card>
  )
}
