import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-location';
import SocialLinks from './SocialLinks';

import { useForm, SubmitHandler, UseFormSetError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Api, HTTPValidationError, ValidationError, HttpResponse } from '../api/Api';

import * as Yup from 'yup';

const apiClien = new Api({ baseUrl: import.meta.env.DEV ? '/api' : 'https://' });

const formSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is mandatory')
    .matches(RegExp('^[A-Za-z]+[0-9A-Za-z]*$'), { message: 'Username should ude only latin symbols and numbers' }),
  email: Yup.string().email().optional(),
  password: Yup.string().required('Password is mandatory').min(6, 'Password must be at least 6 char long'),
  password2: Yup.string()
    .required('Password is mandatory')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});
const formOptions = { resolver: yupResolver(formSchema) };

const fieldStyles =
  'form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

const regBtnBase = 'inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded';

const regBtnActive =
  regBtnBase +
  ' bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out';

const regBtnInactive = regBtnBase + ' bg-gray-200';

const goodFieldStyles = fieldStyles + ' border-gray-300';
const badFieldStyles = fieldStyles + ' border-red-700';

type FD = Yup.InferType<typeof formSchema>;
type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};
type FormData = RemoveIndex<FD>;

// type FormData2 = Omit<FormData, >

// type ServerResponse<T> = {
//   success: boolean,
//   errors?: { [P in keyof T]:  }
//   data?:
// }

// backend emulation
type postDataResult<T> = {
  success: boolean;
  errors?: { [P in keyof T]?: string[] };
};
const postData = ({ username }: FormData): Promise<postDataResult<FormData>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'Evgen') {
        resolve({
          success: false,
          errors: {
            username: ['The name must be unique'],
          },
        });
      } else {
        resolve({ success: true });
      }
    }, 100);
  });
};

function addServerErrors(errors: { [P in keyof FormData]?: string[] }, setError: UseFormSetError<FormData>) {
  return Object.keys(errors).forEach((key) => {
    console.log(key);
    setError(key as keyof FormData, {
      type: 'server',
      message: errors[key as keyof FormData]!.join('. '),
    });
  });
}

function Register() {
  console.log('Register RUN');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormData>(formOptions);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // const result = await postData(data as FormData);
    const formData: FormData = data as FormData;
    const result = await apiClien.register
      .registerRegisterPost({
        username: formData.username,
        password: formData.password,
        password_confirm: formData.password2,
      })
      .then(() => {
        console.log('Success registration');
        navigate({ to: '/login', replace: false });
      })
      .catch((result: HttpResponse<any, HTTPValidationError>) => {
        // const message = result.detail;
        console.log(`error detail: ${result.error.detail}`);
        setError('username', { message: 'DEBUG_1' });
        if (result.error.detail != undefined) {
          setError('username', { message: 'DEBUG_2' });

          const errors: { [P in keyof Partial<FormData>]: string[] } = {
            username: [result.error.detail[0].msg],
          };
          console.log(result.error.detail);
          console.log(errors);
          console.log(errors.username);
          addServerErrors(errors, setError);
        }
      });

    // if (!result.success && result.errors) {
    //   addServerErrors<FormData>(result.errors, setError);
    // }
    // console.log(JSON.stringify(data, null, 2));
    // navigate({ to: '/', replace: false });
  };

  // console.log(watch('username')); // watch input value by passing the name of it

  const isLoading = false;
  return (
    <div className="container w-96 mx-auto mt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SocialLinks />
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">Or</p>
        </div>

        {/* Username */}
        <div className="mb-6">
          <input
            defaultValue=""
            placeholder="Username"
            className={goodFieldStyles}
            {...register('username', { required: true })}
          />
          <p className="text-red-500">{(errors.username?.message as string) || ''}</p>
          {/* {errors.username && <p className="text-red-500">{errors.username.message}</p>} */}
        </div>

        {/* Email */}
        <div className="mb-6">
          <input defaultValue="" placeholder="Email" type="email" className={goodFieldStyles} {...register('email')} />
          {/* {errors.email && <p className="text-red-500">Error</p>} */}
          <p className="text-red-500">{(errors.email?.message as string) || ''}</p>
        </div>

        {/* <!-- Password input --> */}
        <div className="mb-6">
          <input
            defaultValue=""
            placeholder="Password"
            type="password"
            className={goodFieldStyles}
            {...register('password', { required: true })}
          />
          <p className="text-red-500">{(errors.password?.message as string) || ''}</p>
          {/* {errors.password && <p className="text-red-500">Error</p>} */}
        </div>

        {/* <!-- Password2 input --> */}
        <div className="mb-6">
          <input
            defaultValue=""
            placeholder="Password confirm"
            type="password"
            className={goodFieldStyles}
            {...register('password2', { required: true })}
          />
          <p className="text-red-500">{(errors.password2?.message as string) || ''}</p>
          {/* {errors.password2 && <p className="text-red-500">Error</p>} */}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={isLoading ? regBtnInactive : regBtnActive}
            disabled={isLoading ? true : false}
          >
            {isLoading ? 'Wait...' : 'Register'}
          </button>
          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
            Already have an account?
            <Link
              to={'/login'}
              className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out pl-1"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

// function Register() {
//   console.log('REGISTER RUN')
//   useTest()
//   const navigate = useNavigate();
//   //   if (isReady) {
// //     console.log('Is Ready for redirect now');
// //     navigate({ to: '/login', replace: false })
// //   }
//   return (
//     <div>
//       <Link to={'/login'} className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out pl-1">Login </Link>
//       <button onClick={() => navigate({ to: '/', replace: false })}>
//         Navigate
//       </button>
//     </div>
//   )
// }

// function useTest() {
//   console.log('Run useTest')
// }

export default Register;
