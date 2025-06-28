"use server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserConnected } from '@/lib/authentification'
import React from 'react'
import TablePrompt from '@/app/[locale]/(profile)/components/tablePrompt';
import { Typography } from '@/components/typography';
import { getTranslations } from 'next-intl/server';

const Profile = async () => {
  const user = await getUserConnected();
  const t = await getTranslations('Profile');

  return (
    <div className='m-1'>
      <div className='m-1'>
        <Card className='grid grid-cols-2'>
          <CardHeader >
            <CardTitle className='capitalize text-[2vw]'>{t('name')}: {user?.name}</CardTitle>
            <CardDescription>{t('email')}: {user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-2'>
              <Typography variant='h3' color={'white'} >
                {t('address')}
              </Typography>
              <Typography variant='h4' color={'ring'}>
                {user?.address}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <TablePrompt />
      </div>
    </div>
  )
}

export default Profile