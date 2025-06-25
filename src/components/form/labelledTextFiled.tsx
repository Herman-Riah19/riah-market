"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

export interface ILabelledTextFieldProps extends UseFormRegisterReturn {
  label: string;
  placeholder?: string;
  type?: string;
}

export function LabelledTextField({
  label,
  placeholder,
  type = "text",
  ...registerProps
}: ILabelledTextFieldProps) {
  return (
    <div className="grid gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        placeholder={placeholder}
        type={type}
        {...registerProps}
      />
    </div>
  );
}
