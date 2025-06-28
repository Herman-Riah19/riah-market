import React from "react";
import SidebarUser from "@/components/sidebar/sidebar-user";
import { getAuthSession } from "@/lib/authentification";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Navbar } from "@/components/navbar/navbar";

const MidasLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await getAuthSession()
  const locale = await getLocale()

  if(!session) {
    redirect(`/${locale}/auth/login`)
  }
  return (
    <section>
      <Navbar />
      <div className="grid grid-cols-5">
        <div className="w-[15vw] col-span-1 ">
          <SidebarUser/>
        </div>
        <div className="col-span-4 ml-0 w-full">
          <div className="h-full px-2 py-6 lg:px-4">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidasLayout;
