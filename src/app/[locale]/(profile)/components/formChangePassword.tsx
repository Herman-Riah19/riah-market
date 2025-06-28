"use client";
import React, { useState } from "react";
import { PasswordValidator } from "@/validators/user-validator";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LabelledTextField } from "@/components/form/labelledTextFiled";
import { useToast } from "@/hooks/useToast";
import { changePassword } from "@/services/serviceUser";
import { useTranslations } from "next-intl";

type EditPasswordSchema = z.infer<typeof PasswordValidator>;

export function FormChangePassword() {
  const t = useTranslations("Profile.Password");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<EditPasswordSchema>({
    resolver: zodResolver(PasswordValidator),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: EditPasswordSchema) => {
    try {
      setLoading(true);
      await changePassword(data);
      toast({
        title: "Success",
        description: t("PasswordUpdated"),
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: t("PasswordUpdateFailed"),
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{t("Title")}</CardTitle>
          <CardDescription>
            {t("Description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LabelledTextField label={t("NewPassword")} {...register("password")} />
          <LabelledTextField
            label={t("ConfirmPassword")}
            {...register("confirmPassword")}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">
            {loading ? t("Saving") : t("SaveChanges")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
