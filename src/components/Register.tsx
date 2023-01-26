import React, { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from '@tanstack/react-location';
import { useForm } from '../hooks/useForm';

const fieldStyles =
  'form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

const regBtnBase = 'inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded';

const regBtnActive =
  regBtnBase +
  ' bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out';

const regBtnInactive = regBtnBase + ' bg-gray-200';

const goodFieldStyles = fieldStyles + ' border-gray-300';
const badFieldStyles = fieldStyles + ' border-red-700';

function Register() {
  console.log('Register RUN');

  const {
    handleSubmit, // handles form submission
    handleChange, // handles input changes
    data, // access to the form data
    errors, // includes the errors to show
    isLoading, // loading indicator
    isReady, // ready indicator (when we ready to redirect)
  } = useForm({
    // the hook we are going to create
    validations: {
      // all our validation rules go here
      username: {},
      email: {
        required: {
          value: false,
          message: 'email is not req',
        },
      },
      password: {},
      password2: {
        match: {
          attribute: 'password',
          message: 'Passwords not match',
        },
      },
    },
    // onSubmit: () => alert('Submit!'),
    initialValues: {
      // used to initialize the data
      username: '',
      password: '',
      password2: '',
    },
  });

  // const navigate = useNavigate()
  // if (isReady) {
  //   console.log('Is Ready for redirect now');
  //   navigate({ to: '/login', replace: false })
  // }

  // const [regstate, setRegstate] = useState();
  // console.log(`In Register, isLoading: ${isLoading}`)

  return (
    <div className="container w-96 mx-auto mt-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-center">
          <p className="text-lg mb-0 mr-4">Register with</p>

          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
          >
            <FaFacebook className="text-3xl" />
          </button>

          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
          >
            <FaTwitter className="text-3xl" />
          </button>

          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
          >
            <FaGithub className="text-3xl" />
          </button>
        </div>

        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">Or</p>
        </div>

        {/* Username */}
        <div className="mb-6">
          <input
            type="text"
            className={errors.username == undefined ? goodFieldStyles : badFieldStyles}
            id="usernameInput"
            placeholder="Username"
            required={true}
            value={data.username || ''}
            onChange={handleChange('username', (x: string) => x.trim())}
            pattern="^[\w\d]+$"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <input
            type="text"
            className={errors.email == undefined ? goodFieldStyles : badFieldStyles}
            id="emailInput"
            placeholder="Email"
            required={false}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* <!-- Password input --> */}
        <div className="mb-6">
          <input
            type="password"
            className={errors.password == undefined ? goodFieldStyles : badFieldStyles}
            id="passwordInput"
            placeholder="Password"
            required={true}
            value={data.password || ''}
            onChange={handleChange('password', (x: string) => x)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* <!-- Password input --> */}
        <div className="mb-6">
          <input
            type="password"
            className={errors.password2 == undefined ? goodFieldStyles : badFieldStyles}
            id="passwordInputConfirm"
            placeholder="Confirm Password"
            required={true}
            value={data.password2 || ''}
            onChange={handleChange('password2', (x: string) => x)}
          />
          {errors.password2 && <p className="text-red-500">{errors.password2}</p>}
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
