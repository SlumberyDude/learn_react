import { ChangeEvent, FormEvent, useState } from "react";

interface Validation<T = { [key: string]: unknown }> {
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
  match?: {
    attribute: keyof T;
    message: string;
  }
}

type Validations<T extends {}> = Partial<Record<keyof T, Validation<T>>>;
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
    const validations = options?.validations;
    if (options?.onSubmit) {
      options.onSubmit();
    }
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
        // MATCH
        const match = validation?.match;
        if (match?.attribute) {
          const other_val = data[match.attribute]
          if (value != other_val) {
            valid = false;
            newErrors[field_name] = match.message;
          }
        }
      }
      // now newErrors filled with some messages
      if (!valid) {
        setErrors(newErrors);
        return;
      }
      setErrors({}) // remove errors
      console.log('Pass client side validation');
      // check if user already exists in db
      fetch("/api/register", {
        "method": "POST",
        "headers": {
          "Connection": "keep-alive",
          "content-type": "application/json",
          "accept": "*/*"
        },
        "body": JSON.stringify({
            username: data['username' as Extract<keyof T, string>],
            password: data['password' as Extract<keyof T, string>],
            password_confirm: data['password2' as Extract<keyof T, string>]
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.detail != undefined) {
          // something wrong and we got an error message
          // TODO:
          // I need to fix the error flow
          // Need to add location of the error message
          // Now I will count it as a username error
          console.log(response)
        }
        // console.log(response.detail[0])
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };

};