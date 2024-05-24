import PropTypes from 'prop-types'
import { useStopwatch } from 'react-timer-hook'
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  FaPause,
  FaPlay,
  FaHistory,
  FaEdit
} from 'react-icons/fa'
import { EditFinish } from '../EditFinish'
import { removeService, updateService } from '../../../../redux'
import swal from 'sweetalert'
import './Card.css'

function ItemHeader({ text, text2 }) {
  return (
    <Flex
      flex={4}
      direction="column"
      textAlign="center"
      justify="center"
      align="center"
    >
      <Text fontSize="14px" fontWeight="medium" color="brand.dark" width="78px">
        {text}
      </Text>
      <Text
        bg="white"
        borderRadius="5px"
        fontSize="16px"
        fontWeight="semibold"
        color="brand.dark"
        width="78px"
      >
        {text2}
      </Text>
    </Flex>
  )
}
ItemHeader.propTypes = {
  text: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired
}

function Card({ vehicle_id, workstation, editServiceEmit, removeServiceEmit, socket }) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [estado, setEstado] = useState('')
  const { seconds, minutes, hours, isRunning, reset, start, pause } =
    useStopwatch({
      autoStart: false
    })
  const timer = {
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds
  }
  localStorage.setItem(
    `${vehicle_id}`,
    `${timer.hours}:${timer.minutes}:${timer.seconds}`
  )

  useEffect(() => {
    socket.on('editData', (data) => {
      dispatch(updateService(data))
    })
    socket.on('removeData', (data) => {
      dispatch(removeService(data))
    })
    return () => {
      socket.off('editData')
      socket.off('removeData')
    }
  }, [])

  const handleCancel = (e) => {
    e.preventDefault()
    swal({
      title: 'Atención',
      text: '¿Esta seguro de cancelar el servicio? la información editada y el tiempo no se guardara',
      icon: 'warning',
      buttons: { No: true, Si: true }
    }).then((value) => {
      switch (value) {
        case 'Si':
          dispatch(removeService(vehicle_id))
          removeServiceEmit(socket, vehicle_id)
          break
        case 'No':
          break
        default:
          break
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setEstado(e.target.name)
    if (e.target.name === 'end') {
      pause()
    }
    onOpen()
  }
  return (
    <Box
      bg="white"
      w="100%"
      maxW="230px"
      minW="220px"
      h="304px"
      maxH="400px"
      boxShadow="0px 0px 10px -2px"
      borderRadius="5px"
      margin="10px 15px 10px 15px"
    >
      <Flex bg="brand.greyLight" width="100%" align="center" height="63px">
        <ItemHeader text="PLACA" text2={vehicle_id} />
        <ItemHeader text="ESTACION" text2={workstation} />
      </Flex>
      <Flex direction="column" justify="center" align="center">
        <Text
          fontSize="36px"
          fontWeight="medium"
          color="brand.dark"
          name="time"
        >
          {`${timer.hours}:${timer.minutes}:${timer.seconds}`}
        </Text>
        <Flex justifyContent="center" w="80%">
          <Box h="110px" color="white">
            <Button
              bg="brand.sec"
              borderRadius="100px"
              h="100px"
              w="100px"
              onClick={isRunning ? pause : start}
            >
              {!isRunning ? (
                <Icon as={FaPlay} w="60px" h="60px" />
              ) : (
                <Icon as={FaPause} w="60px" h="60px" />
              )}
            </Button>
          </Box>
          <Flex w="0px">
            <Button onClick={() => reset()} h="26px" bg="white">
              <Icon as={FaHistory} color="brand.sec" w="25px" h="25px" />
            </Button>
          </Flex>
        </Flex>
        <Flex
          maxWidth="191px"
          h="70px"
          direction="column"
          gap="10px"
          justify="center"
          align="center"
          paddingBottom="3px"
        >
          <Button
            bg="brand.sec"
            color="white"
            width="191px"
            height="30px"
            name="end"
            onClick={(e) => handleSubmit(e)}
          >
            FINALIZAR
          </Button>
          <Flex w="100%" justifyContent="space-around">
            <Button
              bg="brand.greyLight"
              color="brand.dark"
              width="85px"
              height="30px"
              name="edit"
              onClick={(e) => handleSubmit(e)}
            >
              EDITAR{' '}
              <Icon
                as={FaEdit}
                w="1.1em"
                h="1.1em"
                alignSelf="center"
                marginLeft="8px"
              />
            </Button>
            <Button
              bg="brand.greyLight"
              color="brand.dark"
              width="85px"
              height="30px"
              name="cancel"
              onClick={(e) => handleCancel(e)}
            >
              CANCELAR
              {/* <Icon as={FaTimes} w='1.5em' h='1.5em'/> */}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} width="fit-content">
        <ModalOverlay />
        <ModalContent maxWidth={'none'} width={'fit-content'}>
          <EditFinish
            onClose={onClose}
            estado={estado === 'end' ? 'Finalizar' : 'Editar'}
            vehicle_id={vehicle_id}
            timer={timer}
            editServiceEmit={editServiceEmit}
            removeServiceEmit={removeServiceEmit}
            socket={socket}
          />
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Card
