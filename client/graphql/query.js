import { gql } from "@apollo/client"

export const LoginUser = gql`
  mutation Login($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      token,
      
    }
  }
`

export const RegisterUser = gql`
  mutation Register(
    $username: String!
    $password: String!
    $email: String!
    $contactNo: String!
  ) {
    register(
      user: {
        username: $username
        password: $password
        email: $email
        contactNo: $contactNo
      }
    ) {
      username
      email
      contactNo
      password
    }
  }
`

