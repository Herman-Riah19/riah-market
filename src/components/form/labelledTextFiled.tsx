import * as React from "react";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

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
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input placeholder={placeholder} type={type} {...registerProps} />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}
