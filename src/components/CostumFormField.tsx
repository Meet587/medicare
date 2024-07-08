'use client'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label: string,
    placeholder: string,
    iconSrc: string,
    iconAlt: string
}

const CostumFormField = ({ control, fieldType, name, label, placeholder, iconSrc, iconAlt }: CustomProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                </FormItem>
            )}
        />
    )
}

export default CostumFormField