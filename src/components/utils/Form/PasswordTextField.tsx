import { useCallback, useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { IconButton, TextFieldProps } from "@mui/material";
import { FormTextField } from "@utils/Form/FormTextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

type FormTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, any>;
} & TextFieldProps;

export const PasswordFieldText = <TFieldValues extends FieldValues>({
  name,
  control,
  type = "password",
  ...restProps
}: FormTextFieldProps<TFieldValues>) => {
  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisibility(!isVisible);
  }, [isVisible]);

  return (
    <FormTextField
      name={name}
      control={control}
      type={isVisible ? "text" : type}
      InputProps={{
        endAdornment: (
          <IconButton onClick={toggleVisibility}>
            {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        ),
      }}
      {...restProps}
    />
  );
};
