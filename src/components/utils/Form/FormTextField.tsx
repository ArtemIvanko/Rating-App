import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material"; // Adjust based on your UI library

type FormTextFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  "value"
> & {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, any>;
} & TextFieldProps;

export const FormTextField = <TFieldValues extends FieldValues>({
  name,
  control,
  ...restProps
}: FormTextFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...restProps}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
