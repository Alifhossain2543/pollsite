import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useRadioGroup } from "@chakra-ui/react"
import RadioCard from '../components/custom/RadioCard'

export default function Home() {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState(null)
  const [checkingUser, setCheckingUSer] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const options = [
    "A healthy baby GIRL",
    "A healthy baby BOY",
    "A healthy baby",
  ]

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push("/login")
    setCheckingUSer(false)
  }, [])

const { getRadioProps } = useRadioGroup({
  name: "Poll",
  onChange: setSelectedItem,
})

  return (
    <>
      {checkingUser && (
        <h1 className="text-3xl font-bold  flex items-center justify-center h-[80vh]">
          <AiOutlineLoading3Quarters
            size={50}
            className="animate-spin"
            color="#e53935"
          />
        </h1>
      )}

      <div className="font-bold flex items-center justify-center h-[100vh]">
        <div className="w-[350px] md:w-[560px] lg:w-[650px] border-2 border-card-two rounded-md p-[20px]">
          {/* Query */}
          <h1 className="text-center text-2xl  text-primary/[0.8]">
            Before we welcome Baby P., take a guess at what they will be.
          </h1>

          {/* Options */}

          <div className="flex-col mt-10">
            {options.map((value, inx) => {
              const radio = getRadioProps({ value })
              return (
                <RadioCard key={inx} {...radio}>
                  {value}
                </RadioCard>
              )
            })}
          </div>

          <div className='flex items-center justify-center gap-10'>
            <button disabled={isLoading} className=" norBtn">
              {isLoading && (
                <AiOutlineLoading3Quarters
                  size={20}
                  className="animate-spin"
                  color="#e53935"
                />
              )}
              <span>Submit</span>
            </button>
            <button disabled={isLoading} className=" norBtn">
              {isLoading && (
                <AiOutlineLoading3Quarters
                  size={20}
                  className="animate-spin"
                  color="#e53935"
                />
              )}
              <span>Next Poll</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
