"use client"
import React, { useTransition } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation';
import { useLocale } from "next-intl";
import Image from 'next/image';

export const NavLangue = () => {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();
  const localActive = useLocale();

  return (
    <div className="flex w-full justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <Select
        onValueChange={(e) => startTransition(() => route.replace(`/${e}`))}
        defaultValue={localActive}
        disabled={isPending}>
        <SelectTrigger className="w-[50px]">
          <SelectValue placeholder="Change language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="fr">
              <div className='flex'>
                <Image
                  src="/asset/language/drapeau-france.jpg"
                  alt="French"
                  width={20}
                  height={20}
                  style={{ marginRight: 5 }}
                />
                <span>Francais</span>
              </div>

            </SelectItem>
            <SelectItem value="en" >
              <div className='flex'>
                <Image
                  src="/asset/language/usa.jpg"
                  alt="English"
                  width={20}
                  height={20}
                  style={{ marginRight: 5 }}
                />
                <span>English</span>
              </div>

            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}