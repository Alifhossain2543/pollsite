import React, {useState} from "react"
import * as Yup from "yup"
import Input from "../custom/Input"
import { Formik, Form } from "formik"
import { useRouter } from "next/router"
import {RegisterUser} from '../../graphql/query'
import { useMutation } from "@apollo/client"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const signupValidation = Yup.object().shape({
  username: Yup.string()
    .required("username is required"),
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  contactNo: Yup.string()
  .required("Contact number is required"),

})



const Register = ({ setLogin, isLoginScreen }) => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [register] = useMutation(RegisterUser, {
    onError: (error) => {
      setErrorMessage(error.message)
      setIsLoading(false)
    },
    onCompleted: () => {
      setLogin(true)
      setErrorMessage(null)
    },
  })


  const registerHandler = ({username, password, email, contactNo}) => {
    setIsLoading(true)
    register({ variables: { username, password, email, contactNo } })
  }

  return (
    <div>
      <h1 className="text-center text-[20px] font-extrabold text-text-color-light">
        Sign in
      </h1>
      <Formik
        initialValues={{ email: "", password: "", username: "", contactNo: "" }}
        validationSchema={signupValidation}
        onSubmit={registerHandler}
      >
        {({ _, touched, errors }) => {
          return (
            <Form name="register" className="w-[100%] p-[15px]">
              <Input
                label="Username"
                name="username"
                id="username"
                isError={
                  touched.username == true && errors.username != undefined
                    ? true
                    : false
                }
                placeholder="Your username..."
              />
              <Input
                label="Email"
                name="email"
                type="email"
                id="email"
                isError={
                  touched.email == true && errors.email != undefined
                    ? true
                    : false
                }
                placeholder="Your email address..."
              />
              <Input
                label="Password"
                name="password"
                type="password"
                isError={
                  touched.password == true && errors.password != undefined
                    ? true
                    : false
                }
                id="password"
                placeholder="Your password..."
              />

              <Input
                label="Contact Number"
                name="contactNo"
                isError={
                  touched.contactNo == true && errors.contactNo != undefined
                    ? true
                    : false
                }
                id="contactNo"
                placeholder="Contact Number..."
              />
              <button
                disabled={isLoading}
                className=" text-text-color-dark p-[10px] rounded-full shadow-xl hover:text-primary-dark font-extrabold bg-primary-light disabled:bg-text-color-light disabled:hover:text-text-color-dark hover:bg-text-color-dark active:scale-[0.9] flex gap-2 items-center justify-center
               mt-[10px]"
                type="submit"
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                    color="#e53935"
                  />
                )}
                <span>Sign in</span>
              </button>

              {errorMessage && (
                <p className="mt-[10px text-primary-dark text-[14px]]">
                  {errorMessage}
                </p>
              )}
            </Form>
          )
        }}
      </Formik>
      <div className="pl-5">
        <p className="text-[12px]  font-extrabold">OR</p>
        <p
          onClick={() => setLogin(!isLoginScreen)}
          className="mt-[5px] text-primary-dark underline cursor-pointer"
        >
          Login
        </p>
      </div>
    </div>
  )
}

export default Register
