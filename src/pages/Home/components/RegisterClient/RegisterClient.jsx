import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createClient,
  createLicense,
  relateLicense
} from '../../../../redux/slices/clients/thunk'
import { validateBack } from '../../../../redux/slices/services/thunk'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
  Box,
  Stack,
  Input,
  WrapItem,
  Button,
  Text
} from '@chakra-ui/react'
import swal from 'sweetalert'

function RegisterClient({ onClose, identificacion, vehicle_id }) {
  vehicle_id = vehicle_id.toUpperCase()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name: '',
    lastName: '',
    email: '',
    identification: identificacion,
    phone: ''
  })

  const handlerChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = () => {
    dispatch(validateBack(identificacion, vehicle_id)).then((res) => {
      if (res.client === false && res.license === true) {
        swal({
          title: 'Atención',
          text: 'Esta a punto de registrar un cliente y asociarle una placa, ¿Desea hacerlo?',
          icon: 'warning',
          buttons: { No: true, Si: true }
        }).then((value) => {
          switch (value) {
            case 'Si':
              dispatch(createClient(inputs))
              dispatch(relateLicense(vehicle_id, inputs.identification))
              swal({
                title: 'Felicitaciones',
                text: 'El cliente ha sido creado exitosamente y se ha relacionado la placa',
                icon: 'success'
              })
              onClose()
              break
            case 'No':
              onClose()
              break
            default:
              break
          }
        })
      }
      if (res.client === false && res.license === false) {
        swal({
          title: 'Atención',
          text: 'Esta a punto de registrar un cliente, una placa y asociarla, ¿Desea hacerlo?',
          icon: 'warning',
          buttons: { No: true, Si: true }
        }).then((value) => {
          switch (value) {
            case 'Si':
              dispatch(createClient(inputs))
              dispatch(createLicense(vehicle_id))
              dispatch(relateLicense(vehicle_id, inputs.identification))
              swal({
                title: 'Felicitaciones',
                text: 'El cliente y la placa han sido creados y relacionados exitosamente',
                icon: 'success'
              })
              onClose()
              break
            case 'No':
              onClose()
              break
            default:
              break
          }
        })
        setInputs({
          name: '',
          lastName: '',
          email: '',
          identification: '',
          phone: ''
        })
      }
    })
  }

  return (
    <Container
      maxW="xl"
      bg="white"
      color="#4A5568"
      h="500px"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      borderRadius="5px"
    >
      <Stack spacing="4px" justifyContent="flex-start" w="100%">
        <Text fontSize="4xl" spacing="5px">
          Registrar Cliente
        </Text>
      </Stack>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        padding="17px"
        marginBottom="30px"
        bg="#F9FAFD"
        borderRadius="5px"
        boxShadow="3px 3px 10px -5px"
      >
        <WrapItem marginBottom="0%">
          <FormControl
            isRequired
            w="250px"
            h="80px"
            direction="column"
            spacing="-2px"
            isInvalid={inputs.name === ''}
          >
            <FormLabel fontSize="sm">Nombre</FormLabel>
            <Input
              type="text"
              _placeholder={{ color: 'gray.500' }}
              placeholder="Nombre"
              value={inputs.name}
              name="name"
              onChange={(e) => handlerChange(e)}
            />
            {inputs.name === '' ? (
              <FormErrorMessage>Se requiere un nombre.</FormErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
        </WrapItem>
        <WrapItem marginBottom="5%">
          <FormControl
            isRequired
            w="250px"
            h="80px"
            direction="column"
            spacing="-2px"
            isInvalid={inputs.lastName === ''}
          >
            <FormLabel fontSize="sm">Apellido</FormLabel>
            <Input
              type="text"
              _placeholder={{ color: 'gray.500' }}
              placeholder="Apellido"
              value={inputs.lastName}
              name="lastName"
              onChange={(e) => handlerChange(e)}
            />
            {inputs.lastName === '' ? (
              <FormErrorMessage>Ingresa un apellido.</FormErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
        </WrapItem>
        <WrapItem marginBottom="5%">
          <FormControl
            isRequired
            w="250px"
            h="80px"
            direction="column"
            spacing="-2px"
            isInvalid={inputs.email === ''}
          >
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input
              type="email"
              _placeholder={{ color: 'gray.500' }}
              placeholder="Email"
              value={inputs.email}
              name="email"
              onChange={(e) => handlerChange(e)}
            />
            {inputs.email === '' ? (
              <FormErrorMessage>Ingresa un email.</FormErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
        </WrapItem>
        <WrapItem marginBottom="5%">
          <FormControl
            isRequired
            w="250px"
            h="80px"
            direction="column"
            spacing="-2px"
            isInvalid={inputs.identification === ''}
          >
            <FormLabel fontSize="sm">Identificación</FormLabel>
            <Input
              type="text"
              _placeholder={{ color: 'gray.500' }}
              placeholder="Identificación"
              value={inputs.identification}
              name="identification"
              onChange={(e) => handlerChange(e)}
              isDisabled
            />
            {inputs.identification === '' ? (
              <FormErrorMessage>
                Ingresa un numero de identificación.
              </FormErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
        </WrapItem>
        <WrapItem marginBottom="5%">
          <FormControl
            isRequired
            w="250px"
            h="80px"
            direction="column"
            spacing="-2px"
            isInvalid={inputs.phone === ''}
          >
            <FormLabel fontSize="sm">Telefono</FormLabel>
            <Input
              type="text"
              _placeholder={{ color: 'gray.500' }}
              placeholder="Telefono"
              value={inputs.phone}
              name="phone"
              onChange={(e) => handlerChange(e)}
            />
            {inputs.phone === '' ? (
              <FormErrorMessage>
                Ingresa un numero de telefono.
              </FormErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
        </WrapItem>
        <Stack direction="row" spacing="4px" justifyContent="flex-end" w="100%">
          <Button bg="white" fontSize="sm" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button bg="white" fontSize="sm" onClick={handlerSubmit}>
            Registrar Cliente
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default RegisterClient
