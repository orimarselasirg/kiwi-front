import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from 'redux/slices'
import { SentEmail } from '../../components'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [isSent, setSent] = useState(false)
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
    setSent(true)
  }

  return (
    <Box display="flex" flexDir="column" gap="3">
      {isSent && status === 'success' ? (
        <SentEmail />
      ) : (
        <>
          <Heading size="lg" fontFamily="serif">
            Resetear contraseña
          </Heading>
          <Text mb="3">
            Ingresa el correo electronico asociado con tu cuenta para enviarte
            un correo con las instruciones para restablecer tu contraseña
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Correo electronico</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormControl>
            <Button type="submit" mt="4" w="full" colorScheme="orange">
              Resetear contraseña
            </Button>
          </form>
        </>
      )}
    </Box>
  )
}

export default ResetPassword
