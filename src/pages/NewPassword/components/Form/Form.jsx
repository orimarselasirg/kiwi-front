import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetPassword } from 'redux/slices'
import { useRoute } from 'wouter'

const initialState = {
  password: '',
  confirmPassword: ''
}

function Form() {
  // const [match, params] = useRoute('/auth/new-password/:token')
  const [params] = useRoute('/auth/new-password/:token')
  // const { msg, type } = useSelector((state) => state.auth.status)
  const [values, setValues] = useState(initialState)
  const [isWrong, setIsWrong] = useState(false)
  const dispatch = useDispatch()

  const { password, confirmPassword } = values

  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (confirmPassword !== password) {
      return setIsWrong(true)
    }
    dispatch(resetPassword({ password, token: params.token }))
  }
  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Flex direction='column' mt='5' gap='4'>
        <FormControl isRequired isInvalid={isWrong}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired isInvalid={isWrong}>
          <FormLabel>Confirmar contraseña</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          {isWrong && (
            <FormErrorMessage>Las contraseñas no coinciden</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" mt='4' colorScheme='orange'>
          Enviar
        </Button>
        </Flex>
      </form>
    </>
  )
}

export default Form
