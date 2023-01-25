import { ChangeEvent, FormEvent, useState } from "react";
// import { useNavigate } from '@tanstack/react-location'

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

// const navigate = useNavigate();

export const useForm = <T extends Record<keyof T, string> = {}> (options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  // ...
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
      setIsLoading(true)
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
          // In the case it's an error message
          newErrors['username' as Extract<keyof T, string>] = response.detail;
          setErrors(newErrors)
        }
        if (response.Message != undefined) {
          if (response.Message == 'Registration successfull!') {
            // successfull registration
            console.log('call "setIsReady"')
            setIsReady(true)
            // navigate({ to: './', replace: true })
          } else {
            newErrors['username' as Extract<keyof T, string>]
            = `Unknown message: ${response.Message}`;
            setErrors(newErrors)
          }
            console.log("🚀 ~ file: useForm.ts:133 ~ handleSubmit ~ setIsReady", setIsReady)
            console.log("🚀 ~ file: useForm.ts:133 ~ handleSubmit ~ setIsReady", setIsReady)
            console.log("🚀 ~ file: useForm.ts:133 ~ handleSubmit ~ setIsReady", setIsReady)
        }
        // loading is finished, lower the flag
        setIsLoading(false)
        // console.log(response)
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
    isLoading,
    isReady
  };

};