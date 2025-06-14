import React from "react";
import {DarkTheme} from "@/components/dark-theme";
import Link from "next/link";
import {NavbarSheet} from "./navbar-sheet";
import {NavLangue} from "./navLangue";
import {getLocale, getTranslations} from 'next-intl/server';
// import { ButtonConnect } from "@/components/button/buttonConnect";

export const Navbar: React.FC = async () => {
  const t = await getTranslations('Navbar');
  const locale = await getLocale();

  const pages = [
    {
      name: t('Home'),
      link: `/${locale}/`,
    },
    {
      name: t('Create'),
      link: `/${locale}/create`,
    },
    {
      name: t("About"),
      link: `/${locale}/about`,
    },
    {
      name: t("Blog"),
      link: `/${locale}/blog`,
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
        {/* <ButtonConnect /> */}
        <DarkTheme />
      </div>
    </header>
  );
};