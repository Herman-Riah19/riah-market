"use client";
import { EditUserValidator } from "@/validators/user-validator";
import React, { useState } from "react";
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
import { userUpdate } from "@/services/serviceUser";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

type EditUserSchema = z.infer<typeof EditUserValidator>;

export function FormChangeUsername() {
  const t = useTranslations("Profile.Account");
  const { toast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<EditUserSchema>({
    resolver: zodResolver(EditUserValidator),
    defaultValues: {
      name: session?.user?.name ?? "",
    },
  });

  const changeUsername = async (data: EditUserSchema) => {
    try {
      setLoading(true);
      await userUpdate(data);
      toast({
        title: "Success",
        description: t("UsernameUpdated"),
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: t("UsernameUpdateFailed"),
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(changeUsername)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{t("Title")}</CardTitle>
          <CardDescription>{t("Description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LabelledTextField label={t("Username")} {...register("name")} />
        </CardContent>
        <CardFooter>
          <Button type="submit">
            {loading ? t("Saving...") : t("SaveChanges")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
