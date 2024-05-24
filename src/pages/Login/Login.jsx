import { Form } from './components'
import { Box, Flex, Heading, Icon } from '@chakra-ui/react'
import { GiKiwiBird } from 'react-icons/gi'
import { ToastContainer } from 'react-toastify'

function Login() {
  return (
    <Flex
      direction="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box
        display="flex"
        gap="4"
        maxW="sm"
        flexDir="column"
        width="full"
        mb="2"
        p="10"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
      >
        <Icon as={GiKiwiBird} boxSize="35px" />
        <Heading as="h1" size="lg" fontFamily="serif">
          Kiwi
        </Heading>
        <Form />
      </Box>
    </Flex>
  )
}

export default Login
