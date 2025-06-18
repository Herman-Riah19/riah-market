'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react'

export const ButtonLogout = () => {
  const locale = useLocale();
  const route = useRouter();

  return <DropdownMenuItem
    onClick={(e) => {
      e.preventDefault();
      signOut();
      route.push(`/${locale}/`);
    }}
  >
    Logout
  </DropdownMenuItem>
}
