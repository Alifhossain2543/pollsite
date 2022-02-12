import React, { useState, useEffect } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Input from '../components/custom/Input'
import Register from '../components/base/Register'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import {useMutation} from '@apollo/client'
import {LoginUser} from '../graphql/query'
import { useRouter } from "next/router"
const loginValidation = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required!"),
})


const Login = () => {
  const [isLoginScreenn ,setIsLoginScreen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [redirect, setRedirect] = useState(true)
  const router = useRouter()
    const [login] = useMutation(LoginUser, {
      onError: (error) => {
        setErrorMessage(error.message)
                setIsLoading(false)

      },
      onCompleted: ({ login }) => {
        console.log(login)
        if(login) {
          localStorage.setItem("token", login.token)
        }
        setIsLoading(false)
        setErrorMessage(null)
      },
    })

  const loginHandler = async ({ username, password }) => {
    setIsLoading(true)
         login({ variables: { username, password } })

  }

  useEffect(() => {
      if (localStorage.getItem("token")) router.push("/").then(() => setRedirect(false))

  }, [])

    return (
      <>
        {redirect ? (
          <h1 className="text-3xl font-bold underline flex items-center justify-center h-[80vh]">
            <AiOutlineLoading3Quarters
              size={50}
              className="animate-spin"
              color="#e53935"
            />
          </h1>
        ) : (
          <>
            <div className="min-h-[90vh] flex justify-center items-center  p-0 bg-fixed bg-cover ">
              <div className="p-10  w-[85w] sm:w-[450px] rounded-xl">
                {/* Signup form */}

                {isLoginScreenn ? (
                  <>
                    <h1 className="text-center text-[20px] font-extrabold text-text-color-light">
                      Sign in
                    </h1>
                    <Formik
                      initialValues={{ username: "", password: "" }}
                      validationSchema={loginValidation}
                      onSubmit={loginHandler}
                    >
                      {({ _, touched, errors }) => {
                        return (
                          <Form name="login" className="w-[100%] p-[15px]">
                            <Input
                              label="Username"
                              name="username"
                              id="username"
                              isError={
                                touched.username == true &&
                                errors.username != undefined
                                  ? true
                                  : false
                              }
                              placeholder="Your username..."
                            />
                            <Input
                              label="Password"
                              name="password"
                              type="password"
                              isError={
                                touched.password == true &&
                                errors.password != undefined
                                  ? true
                                  : false
                              }
                              id="password"
                              placeholder="Your password..."
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
                        onClick={() => setIsLoginScreen(!isLoginScreenn)}
                        className="mt-[5px] text-primary-dark underline cursor-pointer"
                      >
                        Register
                      </p>
                    </div>
                  </>
                ) : (
                  <Register
                    setLogin={setIsLoginScreen}
                    isLoginScreen={isLoginScreenn}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </>
    )
}

export default Login