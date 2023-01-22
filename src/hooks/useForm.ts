import { useState } from "react";


export const useForm = (options: any) => {
    // ...
    const [data, setData] = useState(options?.initialValues || {});
    const [errors, setErrors] = useState<{username?: string}>({});

    const handleChange = (
        key: any,
        sanitizeFn: any,
    ) => (e: any) => {
        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
        setData({
            ...data,
            [key]: value,
        });
    };
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (options?.onSubmit) {
            console.log(data)
            options.onSubmit();
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
    };

};