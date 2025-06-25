import React from "react";
import Link from "next/link";
import {NavbarSheet} from "./navbar-sheet";
import {NavLangue} from "./navLangue";
import {getLocale, getTranslations} from 'next-intl/server';
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { User2 } from "lucide-react";
import { ButtonLogout } from "@/components/button/buttonLogout";

export const Navbar: React.FC = async () => {
  const t = await getTranslations('Navbar');
  const locale = await getLocale();
  const session = await getServerSession();

  const pages = [
    {
      name: t('Home'),
      link: `/${locale}/`,
    },
    {
      name: t('Explore'),
      link: `/${locale}/nft`,
    },
    {
      name: t('Create'),
      link: `/${locale}/create`,
    },
    {
      name: t("About"),
      link: `/${locale}/about`,
    },
  ];

  return (
    <header className="sticky top-0 flex h-16 z-10 items-center gap-1 border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-6 text-lg font-semibold md:text-base"
      >
        <span className="font-semibold">Riah Market</span>
      </Link>
      <NavbarSheet pages={pages} />

      <nav className="flex flex-col text-lg font-medium sm:hidden md:flex justify-end md:flex-row md:items-center md:gap-3 md:text-sm lg:gap-6">
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.link}
            className="text-muted-foreground transition-colors hover:text-foreground w-[8vw]"
          >
            {page.name}
          </Link>
        ))}
      </nav>
      
      <div className="flex w-full justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <NavLangue />
      </div>
      
        <span>{session?.user?.address}</span>
      <div>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="p-2">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt={session?.user?.name ?? ""}
                    width={50}
                    height={50}
                  />
                ) : (
                  <User2 />
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={ `/${locale}/profile`}>
                <DropdownMenuItem>{t('Profile')}</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator color="primary" />
              <Link href={ `/${locale}/profile/setting`}>
                <DropdownMenuItem>{t('Setting')}</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator color="primary"/>
              <ButtonLogout />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex">
            <Link href={ `/${locale}/sign-in`} className="ml-1 mt-2 mr-2">
              <Button variant="default" className="sm:text-[10px] md:text-[15px]">{t('SignIn')}</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};