import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface ILabelledSelectFieldProps extends UseFormRegisterReturn {
    label: string;
    placeholder?: string;
    options: Array<{ value: string; label: string }>;
}

export function LabelledSelectFieldWithIcon ({
        label,
        placeholder,
        options,
        ...registerProps
}: ILabelledSelectFieldProps) {
    return (
        <div className='grid gap-3'>
            <Label>{label}</Label>
            <Select {...registerProps}>
                <SelectTrigger className="items-start [&_[data-description]]:hidden">
                    <SelectValue placeholder={placeholder || 'Select an option'} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                            <div className="flex items-start gap-3 text-muted-foreground">
                                <ImageIcon className='size-5' />
                                <div className='grid gap-0.5'>
                                    <span className="font-medium text-foreground">{option.label}</span>
                                    <span className='text-xs text-muted-foreground'>{option.value}</span>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
