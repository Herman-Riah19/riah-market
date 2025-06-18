import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const searchSchema = z.object({
    search: z.string().min(2, "Search term must be at least 2 characters")
});

type SearchFormValues = z.infer<typeof searchSchema>;

export interface ISearchInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export function SearchInput(props: ISearchInputProps) {
    const { onChange, placeholder } = props;

    const form = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: props.value || ""
        }
    });

    const onSubmit = (data: SearchFormValues) => {
        onChange?.(data.search);
    };

    return (
        <div className="flex items-center justify-center w-full p-4">
            <div className="relative w-full max-w-2xl">
                <Form {...form}>
                    <form onChange={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="search"
                                            placeholder={placeholder || "Search NFTs"}
                                            {...field}
                                            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
}
