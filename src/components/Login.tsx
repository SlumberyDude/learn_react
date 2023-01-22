import React from 'react'
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from '@tanstack/react-router'

function Login() {
  return (
    <div className="container w-96 mx-auto mt-2">
    <form>
        <div className="flex flex-row items-center justify-center">
            <p className="text-lg mb-0 mr-4">Sign in with</p>
            
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
            >
                <FaFacebook className='text-3xl' />
            </button>

            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
            >
              <FaTwitter className='text-3xl'/>
            </button>

            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-0 text-gray-600 font-medium text-xs leading-tight uppercase rounded-full hover:text-gray-700 transition duration-150 ease-in-out mx-1"
            >
              <FaGithub className='text-3xl'/>
            </button>
          </div>

          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center font-semibold mx-4 mb-0">Or</p>
          </div>

          {/* Username */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="usernameInput"
              placeholder="Username"
              required={true}
            />
          </div>

          {/* <!-- Password input --> */}
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="passwordInput"
              placeholder="Password"
              required={true}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="loginCheckbox"
              />
              <label className="form-check-label inline-block text-gray-800" htmlFor={"exampleCheck2"}
                >Remember me
              </label>
            </div>
            <a href="#!" className="text-gray-800">Forgot password?</a>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <Link to={'/register'} className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out pl-1">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
  )
}

export default Login
