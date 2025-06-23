"use client";
import * as React from "react";
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
import { userRegister } from "../services/signoutAction";
import { ButtonConnectWallet } from "@/components/button/buttonConnect";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { SignupSchema } from "@/validators/user-validator";

export function RegisterForm() {
  const local = useLocale();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    try {
      setLoading(true);
      await userRegister({
        name: values.username,
        email: values.email,
        password: values.password,
        address: values.address
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);
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
              label="Username"
              placeholder="Enter your username"
              {...form.register("username")}
            />

            <LabelledTextField
              label="Email"
              placeholder="Enter your email"
              {...form.register("email")}
            />

            <LabelledTextField
              label="Address"
              placeholder="Enter your wallet address"
              {...form.register("address")}
            />

            <LabelledTextField
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...form.register("password")}
            />

            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          You have an account?{" "}
          <Link href={`/${local}/sign-in`} className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
