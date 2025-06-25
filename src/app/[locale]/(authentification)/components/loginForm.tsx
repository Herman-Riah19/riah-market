"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LabelledTextField } from "@/components/form/labelledTextFiled";
import { ButtonConnectWallet } from "@/components/button/buttonConnect";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { SignInSchema } from "@/validators/user-validator";

export function LoginForm() {
  const router = useRouter();
  const local = useLocale();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      setLoading(true);
      const response = await signIn("wallet", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        console.log("Sign-in failed:", response.error);
        setLoading(false);
      } else {
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
    }
  };
  return (
    <Card className="w-full border-none bg-background">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>

        <ButtonConnectWallet />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <LabelledTextField
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...form.register("email")}
            />

            <LabelledTextField
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />

            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={`/${local}/sign-up`} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
