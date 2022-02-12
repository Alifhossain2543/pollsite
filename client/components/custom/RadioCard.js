import React from 'react'
import { useRadio, Box } from "@chakra-ui/react"


const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: "#e53935",
          color: "white",
          borderColor: "#e53935",
        }}
        px={5}
        py={3}
        m={5}
      >
        {props.children}
      </Box>
    </Box>
  )
}
export default RadioCard