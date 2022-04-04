import React from "react";
import { TextField, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
function FormTextField(props) {
  const {
    name,
    control,
    label,
    size,
    variant,
    type,
    onChange,
    disabled,
    rows,
    ...rest
  } = props;
  return (
    <FormControl sx={{ width: "100%" }} margin="nomal">
      <Controller
        name={name}
        control={control}
        {...rest}
        render={({ field, fieldState: { error } }) => (
          <TextField
            id="standard-multiline-static"
            helperText={error && error.message}
            size={size || "medium"}
            error={!!error}
            type={type || "text"}
            fullwidth
            multiline={rows > 1 ? true : false}
            rows={rows || 1}
            label={label}
            {...field}
            disabled={disabled || false}
            variant={variant || "outlined"}
            onChange={(e) => {
              field.onChange(e);
              onChange && onChange(e.target);
            }}
          />
        )}
      />
    </FormControl>
  );
}

export default FormTextField;
