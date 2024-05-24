import { useEffect, useState } from 'react'
import { Button, Flex, FormControl, FormLabel, FormErrorMessage, Input, Icon } from '@chakra-ui/react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from 'redux/slices/auth/thunk'
import { createUserAdapter } from 'adapters'
import { useNavigate } from 'react-router-dom'
import { validPassword } from '../../../../utilities/auth-password'

const initialState = {
  username: '',
  email: '',
  password: ''
}

function Form() {
  const [values, setValues] = useState(initialState)
  const [shown, setShown] = useState(true)
  const [isFormat, setIsFormat] = useState(false)
  const status = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'success') {
      // setTimeout(navigate('/login'), 9000)
      navigate('/login')
    }
  }, [status])

  const switchShown = () => setShown(!shown)
  const { username, email, password } = values

  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFormat(validPassword(password))
    dispatch(signUp(createUserAdapter(values)))
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Flex direction="column" mt="5" gap="4">
        <FormControl isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Correo electronico</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Flex direction="row">
            <Input
              type={shown ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Button colorScheme='orange' onClick={switchShown} margin={0}>
                {shown ? <Icon as={AiFillEyeInvisible} /> : <Icon as={AiFillEye} />}
            </Button>
            {!isFormat && (
              <FormErrorMessage>
                Formato incorrecto:<br />
                - Debe contener al menos una mayúscula (A-Z)<br />
                - Debe contener al menos una minúscula (a-z)<br />
                - Debe contener al menos un dígito (0-9)<br />
                - Debe contener al menos un caracter especial<br />
                - Ser mínimo de 8 caracteres y máximo de 16<br />
                - No deben haber espacios
              </FormErrorMessage>
            )}
          </Flex>
        </FormControl>
        <Button type="submit" mt="4" colorScheme="orange">
          Crear cuenta
        </Button>
      </Flex>
    </form>
  )
}

export default Form
