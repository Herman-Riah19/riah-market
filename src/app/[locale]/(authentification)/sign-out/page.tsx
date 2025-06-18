"use server"
import { GalleryVerticalEnd } from "lucide-react"
import { getLocale } from "next-intl/server"
import { RegisterForm } from "../components/registerForm";

export default async function SignOutPage() {
  const local = await getLocale();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href={`/${local}`} className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Riah market
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/asset/images/image_18.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
