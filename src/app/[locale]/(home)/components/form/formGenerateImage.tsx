"use client";
import { LabelledSelectFieldWithIcon } from "@/components/form/labelledSelectField";
import { LabelledTextField } from "@/components/form/labelledTextFiled";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateImageSchema } from "@/validators/generate-image-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardImageGenerated } from "../card/cardImageGenerated";
import { useTranslations } from "next-intl";
import { generateImageByIA } from "@/services/ServiceStableDiffusion";

const ratiosImages = [
  {
    name: "perfect square",
    ratio: "1:1",
  },
  {
    name: "Widescreen displays",
    ratio: "16:9",
  },
  {
    name: "Vertical Widescreen displays",
    ratio: "9:16",
  },
  {
    name: "Vertical Slight variation",
    ratio: "9:21",
  },
  {
    name: "Ultrawide displays",
    ratio: "21:9",
  },
  {
    name: "Vertical Photography",
    ratio: "2:3",
  },
  {
    name: "Horizontal Photography",
    ratio: "3:2",
  },
  {
    name: "Vertical print formats",
    ratio: "4:5",
  },
  {
    name: "Horizontal print formats",
    ratio: "5:4",
  },
];

export interface IFormGenerateImageProps {
  setImage: (image: File | null) => void;
}

export function FormGenerateImage({ setImage }: IFormGenerateImageProps) {
  const t = useTranslations("Generator");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const form = useForm<z.infer<typeof GenerateImageSchema>>({
    resolver: zodResolver(GenerateImageSchema),
    defaultValues: {
      prompt: "",
      ratio: "1:1",
    },
  });

  const onSubmit = async (values: z.infer<typeof GenerateImageSchema>) => {
    try {
      setLoading(true);
      console.log("has clicked");
      const formData = new FormData();
      formData.append("prompt", values.prompt);
      formData.append("aspect_ratio", values.ratio.toString());
      formData.append("output_format", "png");
      const response = await generateImageByIA(formData);
      if (response && response.imageUrl) {
        const imageUrl = response.imageUrl;

        const generateFileName = "Generated_image.png";

        const file = await dataUrlToFile(imageUrl, generateFileName);

        setImage(file);
        setGeneratedImage(imageUrl);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setLoading(false);
    }
  };

  const dataUrlToFile = async (
    dataUrl: string,
    filename: string
  ): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>{t("Generate")}</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4 w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              {t("Settings")}
            </legend>
            <LabelledTextField
              label={t("Prompt")}
              type="text"
              placeholder={t("PromptPlaceholder")}
              {...form.register("prompt")}
            />
            <LabelledSelectFieldWithIcon
              label="Ratio"
              placeholder={t("RatioPlaceholder")}
              options={ratiosImages.map(({ name, ratio }) => ({
                value: ratio,
                label: name,
              }))}
              {...form.register("ratio")}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                t("Generate")
              )}
            </Button>
          </fieldset>
        </form>
        <CardImageGenerated image={generatedImage} />
      </CardContent>
    </Card>
  );
}
