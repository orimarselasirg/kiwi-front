import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { addService } from '../../../../redux/slices/services/serviceSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getStations } from '../../../../redux/slices/station/thunk'
import { getTeches } from '../../../../redux/slices/tech/thunk.js'
import { validateBack } from '../../../../redux/slices/services/thunk'
import {
  relateLicense,
  createLicense
} from '../../../../redux/slices/clients/thunk'
import RegisterClient from '../RegisterClient/RegisterClient.jsx'
import {
  Flex,
  Box,
  HStack,
  FormControl,
  Input,
  Button,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'
import './Form.home.css'
import swal from 'sweetalert'

function Formcard({ addServiceEmit, socket, allServices, setAllServices }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm()
  useEffect(() => {
    dispatch(getStations())
    dispatch(getTeches())
  }, [])
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // Get data tech/station/service using useSelector
  const techOptions = useSelector((state) => state.tech.tech)
  const stationOptions = useSelector((state) => state.station.station)
  const serviceRedux = useSelector((state) => state.service.service)
  // Custom notifications
  const notify = () =>
    toast.success('🦄 Servicio creado satisfactoriamente', { autoClose: 3000 })
  const notifyPlacaError = () =>
    toast.error('No se pueden crear dos servicios con la misma placa', {
      autoClose: 3000
    })
  // Date & time
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  // Create service
  const serviceSubmit = (service) => {
    const { clientId, vehicle_id, workstation, technician } = service
    service = {
      clientId,
      vehicle_id: vehicle_id.toUpperCase(),
      workstation,
      technician
    }
    const placaFound = serviceRedux.filter(
      (s) => s.vehicle_id === service.vehicle_id
    )
    dispatch(validateBack(clientId, vehicle_id.toUpperCase())).then((res) => {
      if (
        res.client === false &&
        res.license === false &&
        res.isRelated === false
      ) {
        swal({
          title: 'Atención',
          text: 'El cliente y la placa no estan registrados ¿Quiere registrarlas y asociarlas?',
          icon: 'warning',
          buttons: {
            No: true,
            Si: true
          }
        }).then((value) => {
          switch (value) {
            case 'Si':
              onOpen()
              break
            case 'No':
              onClose()
              break
            default:
              break
          }
        })
      }
      if (
        res.client === true &&
        res.license === false &&
        res.isRelated === false
      ) {
        swal({
          title: 'Atención',
          text: 'El cliente esta registrado pero la placa no esta creada ¿Quiere registrar la placa y asociarle al cliente?',
          icon: 'warning',
          buttons: {
            No: true,
            Si: true
          }
        }).then(async (value) => {
          switch (value) {
            case 'Si':
              await dispatch(createLicense(vehicle_id.toUpperCase()))
              await dispatch(
                relateLicense(vehicle_id.toUpperCase(), service.clientId)
              )
              if (placaFound.length > 0) {
                return notifyPlacaError()
              }
              await swal({
                title: 'Felicitaciones',
                text: 'La placa ha sido creada y relacionada exitosamente, su servicio sera creado',
                icon: 'success'
              })
              await dispatch(
                addService({
                  ...service,
                  data: res.data,
                  type: '',
                  timer: null,
                  datetime: `${currentDate} ${currentTime}`,
                  kilometers: '',
                  goods: [],
                  driver: '',
                  comments: ''
                })
              )
              addServiceEmit(socket, {
                data: {
                  ...service,
                  data: res.data,
                  type: '',
                  timer: null,
                  datetime: `${currentDate} ${currentTime}`,
                  kilometers: '',
                  goods: [],
                  driver: '',
                  comments: ''
                }
              })
              break
            case 'No':
              onClose()
              break
            default:
              break
          }
        })
      }
      if (
        res.client === false &&
        res.license === true &&
        res.isRelated === false
      ) {
        swal({
          title: 'Atención',
          text: 'El cliente no esta registrado pero la placa existe ¿Quiere registrar al cliente y asociarle la placa?',
          icon: 'warning',
          buttons: {
            No: true,
            Si: true
          }
        }).then((value) => {
          switch (value) {
            case 'Si':
              onOpen()
              break
            case 'No':
              onClose()
              break
            default:
              break
          }
        })
      }
      if (
        res.client === true &&
        res.license === true &&
        res.isRelated === false
      ) {
        swal({
          title: 'Atención',
          text: 'La placa no esta relacionada al cliente ¿Quiere relacionarla?',
          icon: 'warning',
          buttons: {
            No: true,
            Si: true
          }
        }).then((value) => {
          switch (value) {
            case 'Si':
              dispatch(relateLicense(service.vehicle_id, service.clientId))
              swal({
                title: 'Felicitaciones',
                text: 'La placa ha sido relacionada exitosamente',
                icon: 'success'
              })
              if (placaFound.length > 0) {
                return notifyPlacaError()
              }
              dispatch(
                addService({
                  ...service,
                  data: res.data,
                  type: '',
                  timer: null,
                  datetime: `${currentDate} ${currentTime}`,
                  kilometers: '',
                  goods: [],
                  driver: '',
                  comments: ''
                })
              )
              addServiceEmit(socket, {
                data: {
                  ...service,
                  data: res.data,
                  type: '',
                  timer: null,
                  datetime: `${currentDate} ${currentTime}`,
                  kilometers: '',
                  goods: [],
                  driver: '',
                  comments: ''
                }
              })
              break
            case 'No':
              break
            default:
              break
          }
        })
      }
      if (
        res.client === true &&
        res.license === true &&
        res.isRelated === true
      ) {
        if (placaFound.length > 0) {
          return notifyPlacaError()
        } else {
          dispatch(
            addService({
              ...service,
              data: res.data,
              type: '',
              timer: null,
              datetime: `${currentDate} ${currentTime}`,
              kilometers: '',
              goods: [],
              driver: '',
              comments: ''
            })
          )
          addServiceEmit(socket, {
            data: {
              ...service,
              data: res.data,
              type: '',
              timer: null,
              datetime: `${currentDate} ${currentTime}`,
              kilometers: '',
              goods: [],
              driver: '',
              comments: ''
            }
          })
          // setAllServices([...allServices, {
          //   data: {
          //     ...service,
          //     data: res.data,
          //     type: '',
          //     timer: null,
          //     datetime: `${currentDate} ${currentTime}`,
          //     kilometers: '',
          //     goods: [],
          //     driver: '',
          //     comments: ''
          //   }
          // }]) // validar si es util este seteo de estado
          reset()
          notify()
        }
      }
    })
  }
  return (
    <Box
      p={5}
      bg="gray.100"
      mt="5"
      h="90px"
      w="1041px"
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
    >
      <form onSubmit={handleSubmit(serviceSubmit)}>
        <Flex align="center" justify="center">
          <HStack spacing="24px">
            <Box border="1px" borderColor="gray.400" borderRadius="md">
              <FormControl isRequired>
                <Input
                  type="text"
                  {...register('clientId', { required: true, maxLength: 10 })}
                  placeholder="DNI Cliente"
                  width="200px"
                />
              </FormControl>
              {errors.clientId?.type === 'required' && (
                <small className="fail">DNI vacío</small>
              )}
              {errors.clientId?.type === 'maxLength' && (
                <small className="fail">DNI invalido</small>
              )}
            </Box>
            <Box border="1px" borderColor="gray.400" borderRadius="md">
              <FormControl isRequired>
                <Input
                  type="text"
                  {...register('vehicle_id', { required: true, maxLength: 7 })}
                  placeholder="Placa"
                  width="150px"
                />
              </FormControl>
              {errors.vehicle_id?.type === 'required' && (
                <small className="fail">Placa vacía</small>
              )}
              {errors.vehicle_id?.type === 'maxLength' && (
                <small className="fail">Placa invalida</small>
              )}
            </Box>
            <Box border="1px" borderColor="gray.400" borderRadius="md">
              <FormControl style={{ color: 'black' }}>
                <Select
                  {...register('workstation', { required: true })}
                  placeholder="Estación"
                  width="150px"
                >
                  {stationOptions.map((opt) => (
                    <option key={opt._id} value={opt.workStation}>
                      {opt.workStation}
                    </option>
                  ))}
                </Select>
                {errors.workstation?.type === 'required' && (
                  <small className="fail">Selecciona una estación</small>
                )}
              </FormControl>
            </Box>
            <Box border="1px" borderColor="gray.400" borderRadius="md">
              <FormControl style={{ color: 'black' }}>
                <Select
                  {...register('technician', { required: true })}
                  placeholder="Tecnico"
                  width="200px"
                >
                  {techOptions.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </Select>
                {errors.technician?.type === 'required' && (
                  <small className="fail">Selecciona un tecnico</small>
                )}
              </FormControl>
            </Box>
            <Box my={-8} width="150px">
              <FormControl>
                <Button type="submit" colorScheme="orange" width="150px">
                  Iniciar
                </Button>
                <ToastContainer theme="colored" />
              </FormControl>
            </Box>
          </HStack>
        </Flex>
      </form>
      <Modal isOpen={isOpen} onClose={onClose} width="fit-content">
        <ModalOverlay />
        <ModalContent maxWidth={'none'} width={'fit-content'}>
          <RegisterClient
            onClose={onClose}
            vehicle_id={getValues('vehicle_id')}
            identificacion={getValues('clientId')}
          />
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Formcard
