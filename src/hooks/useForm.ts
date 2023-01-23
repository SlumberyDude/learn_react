import { ChangeEvent, FormEvent, useState } from "react";

// type RulePattern = {
//   value: string;
//   message: string;
// }

// type RuleCustom = {
//   isValid: (value: string) => boolean;
//   message: string;
// }

// type RuleRequired = {
//   value: boolean;  
//   message: string;
// }

// type RuleMap = {
//   required?: RuleRequired
//   custom?: RuleCustom
//   pattern?: RulePattern
// }

// type Validations = {
//   [field_name: string]: RuleMap;
// }

// type Options = {
//   validations?: Validations;
//   onSubmit?: (value?: unknown) => void;
//   initialValues?: { [key: string]: unknown }
// }

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

// type Validations<T extends {}> = Record<keyof T, Validation>;
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, string> = {}> (options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  // ...
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S,
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (options?.onSubmit) {
      options.onSubmit();
    }
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      // const newErrors: { [key: string]: string} = {};
      const newErrors: ErrorRecord<T> = {}
      for (const field_name in validations) {
        // value of the field we are validating
        const value = data[field_name]
        // validation rule for this field
        const validation = validations[field_name]
        // there could be different validations rules
        // REQUIRED
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[field_name] = validation?.required?.message;
        };
        // PATTERN
        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[field_name] = pattern.message;
        };
        // CUSTOM
        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[field_name] = custom.message;
        }
      }
      // now newErrors filled with some messages
      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };

};