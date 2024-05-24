import { AiFillCheckCircle } from 'react-icons/ai'
import { Flex, Heading, Text } from '@chakra-ui/react'

function SentEmail() {
  return (
    <Flex direction='column' alignItems='center' gap='4'>
      <AiFillCheckCircle size='40px' color='#38A169'/>
      <Heading as='h1' size='md'>Chequea tu email</Heading>
      <Text align='center' maxW='80%'>Te hemos enviado las instruciones para resetear a tu email</Text>
    </Flex>
  )
}

export default SentEmail
