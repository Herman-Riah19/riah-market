"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Settings2, CircleUser } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

export default function SidebarUser({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const path = usePathname();
  const locale = useLocale();
  const route = useRouter();
  const t = useTranslations('Sidebar');

  const handleLogout = (
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    signOut();
    route.push(`/${locale}`);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight hidden md:block">
            {t('Profile')}
          </h2>
          <div className="space-y-1">
            <Link href={`/${locale}/profile`}>
              <Button
                variant={path === `/${locale}/profile` ? "muted" : "ghost"}
                className={`w-full justify-start hover:bg-muted`}
              >
                <CircleUser className="mr-2" />
                <span className="hidden md:block">{t('Profile')}</span>
              </Button>
            </Link>
            <Link href={`/${locale}/setting`}>
              <Button
                variant={path === `/${locale}/setting` ? "muted" : "ghost"}
                className={`w-full justify-start hover:bg-muted`}
              >
                <Settings2 className="mr-2" />
                <span className="hidden md:block">{t('Settings')}</span>
              </Button>
            </Link>
            <Button onClick={handleLogout} className="w-full justify-start">
              <LogOut className="mr-2" />
              <span className="hidden md:block">{t('Logout')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
