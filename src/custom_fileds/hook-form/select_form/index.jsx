import React from "react";

import { Controller } from "react-hook-form";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const SelectForm = ({
  name,
  control,
  label,
  errors,
  size,
  options,
  keyItem,
  labelItem,
  disabled,
  onChange,
  variant,
  defaultValue,
  ...rest
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option[keyItem]} value={option[keyItem]}>
          {option[labelItem]}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl fullWidth margin="normal" error={!!errors[name]}>
      <InputLabel
        variant={variant || "outlined"}
        id={name}
        size={size || "medium"}
      >
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        {...rest}
        render={({ field }) => (
          <Select
            labelId={name}
            defaultValue={defaultValue}
            label={label}
            size={size || "medium"}
            variant={variant || "outlined"}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange && onChange(e.target);
            }}
            value={field.value || ""}
            disabled={disabled}
          >
            {/* <MenuItem value="" disabled>
              {label}
            </MenuItem> */}
            {generateSingleOptions()}
          </Select>
        )}
      />
      <FormHelperText variant="standard">
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectForm;
