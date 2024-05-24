import { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  useDisclosure,
  Icon
} from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { signIn } from 'redux/slices/auth/thunk'
import { createUserAdapter } from 'adapters'
import { Modal } from 'components/Modal'
import { ResetPassword } from '../../components'
import { validPassword } from '../../../../utilities/auth-password'

const initialState = {
  email: '',
  password: ''
}

function Form() {
  const [values, setValues] = useState(initialState)
  const [isWrong, setIsWrong] = useState(false)
  const [shown, setShown] = useState(false)
  const [isFormat, setIsFormat] = useState(false)
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (status === 'failed') setIsWrong(true)
    if (status === 'success') {
      // navigate('/')
    }
  }, [status])

  const { email, password } = values

  const switchShown = () => setShown(!shown)

  const handleChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }
  // const validPassword = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ](?=.*[.,*!?¿¡/#$%&])\S{8,16}$/

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFormat(validPassword(password))
    /*  if (validPassword.test(password)) {
      setIsFormat(true)
    } else {
      setIsFormat(false)
    } */
    dispatch(signIn(createUserAdapter(values)))
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Flex direction="column" mt="5" gap="4">
          <FormControl isRequired isInvalid={isWrong}>
            <FormLabel>Correo electronico</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired isInvalid={isWrong}>
            <FormLabel>Contraseña</FormLabel>
            <Flex direction="row">
              <Input
                type={shown ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleChange}/>
                <Button colorScheme='orange' onClick={switchShown} margin={0}>
                {shown ? <Icon as={AiFillEyeInvisible} /> : <Icon as={AiFillEye} />}
                </Button>
            </Flex>
            {isWrong && (
              <FormErrorMessage>
                El correo o contraseña son erroneos
              </FormErrorMessage>
            )}
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
            <FormHelperText textAlign="right">
              <Link color="orange" onClick={onOpen}>
                ¿Olvidaste tu contraseña?
              </Link>
            </FormHelperText>
          </FormControl>
          <Button type="submit" mt="4" colorScheme="orange">
            Iniciar Sesión
          </Button>
        </Flex>
      </form>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ResetPassword />
      </Modal>
    </>
  )
}

export default Form
