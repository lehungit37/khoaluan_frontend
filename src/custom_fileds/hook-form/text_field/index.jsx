import React from "react";
import { TextField, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
function FormTextField(props) {
  const { name, control, label, size, variant, type, disabled, ...rest } =
    props;
  return (
    <FormControl fullwidth margin="nomal">
      <Controller
        name={name}
        control={control}
        {...rest}
        render={({ field, fieldState: { error } }) => (
          <TextField
            helperText={error && error.message}
            size={size || "medium"}
            error={!!error}
            type={type || "text"}
            fullwidth
            label={label}
            {...field}
            disabled={disabled || false}
            variant={variant || "outlined"}
          />
        )}
      />
    </FormControl>
  );
}

export default FormTextField;
