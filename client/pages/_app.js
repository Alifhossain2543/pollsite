import Header from '../components/base/Header'
import '../styles/globals.css'
import Footer from '../components/base/Footer'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
 
} from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ApolloProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
