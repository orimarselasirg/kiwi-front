import { Text, Input, Select, Textarea, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendService,
  removeService,
  updateService,
  getProduct,
  getTypeServices
} from '../../../../redux'
import swal from 'sweetalert'
import './EditFinish.css'
import TableProducts from '../TableProducts'

function EditFinish({ estado, timer, onClose, vehicle_id, socket, editServiceEmit, removeServiceEmit }) {
  useEffect(() => {
    dispatch(getProduct())
    dispatch(getTypeServices())
  }, [])

  const dispatch = useDispatch()
  const productos = useSelector((state) => state.products.products)
  const serviceRedux = useSelector((state) => state.service.service)
  const stationsRedux = useSelector((state) => state.station.station)
  const techRedux = useSelector((state) => state.tech.tech)
  const typeService = useSelector((state) => state.typeServices.typeService)
  const serviceFound = serviceRedux.filter((s) => s.vehicle_id === vehicle_id)

  const [inputs, setInputs] = useState({
    data: serviceFound[0].data,
    timer: `${timer.hours}:${timer.minutes}:${timer.seconds}`,
    datetime: serviceFound[0].datetime,
    workstation: serviceFound[0].workstation ? serviceFound[0].workstation : '',
    driver: serviceFound[0].driver,
    kilometers: serviceFound[0].kilometers ? serviceFound[0].kilometers : '',
    technician: serviceFound[0].technician ? serviceFound[0].technician : '',
    vehicle_id,
    goods: serviceFound[0].goods ? serviceFound[0].goods : '',
    services: serviceFound[0].services ? serviceFound[0].services : '',
    comments: serviceFound[0].comments ? serviceFound[0].comments : ''
  })
  const generalInfo = {
    type: inputs.services ? inputs.services : 'mantenimiento',
    cronometer: inputs.timer ? inputs.timer : '',
    datetime: inputs.datetime ? inputs.datetime : '',
    workstation: inputs.workstation ? inputs.workstation : '1',
    technician: inputs.technician ? inputs.technician : '',
    kilometers: inputs.kilometers ? inputs.kilometers : '0',
    goods: inputs.goods ? inputs.goods : [],
    vehicle_id: vehicle_id || '',
    driver: inputs.driver ? inputs.driver : '',
    comments: inputs.comments ? inputs.comments : ''
  }

  function handleDeleteProduct(e) {
    setInputs({
      ...inputs,
      goods: inputs.goods.filter((type) => type.product !== e)
    })
  }

  function handleSelect(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  function handleProductSelect(e) {
    const addProduct = productos.find((p) => p._id === e.target.value)
    const findProd = inputs.goods.find((t) => t._id === e.target.value)
    if (findProd) alert('El producto ya esta agregado')
    setInputs({
      ...inputs,
      goods: findProd ? [...inputs.goods] : [...inputs.goods, addProduct]
    })
  }

  const handleSubmit = () => {
    if (estado === 'Finalizar') {
      swal({
        title: 'Atención',
        text: '¿Desear finalizar el Servicio?',
        icon: 'warning',
        buttons: {
          No: true,
          Si: true
        }
      }).then((value) => {
        switch (value) {
          case 'Si':
            dispatch(sendService(generalInfo))
            dispatch(removeService(vehicle_id))
            removeServiceEmit(socket, vehicle_id)
            localStorage.removeItem(`${vehicle_id}`)
            break
          case 'No':
            break
          default:
            break
        }
      })
    } else {
      dispatch(updateService(inputs))
      editServiceEmit(socket, inputs)
      swal({
        title: 'Atención',
        text: 'Cambios guardados exitosamente',
        icon: 'success'
      })
      onClose()
    }
  }

  return (
    <div className="edit-container">
      <div className="edit-title-container">
        <Text className="edit-title" fontSize="4xl">
          {estado} servicio
        </Text>
        {estado === 'Finalizar' && (
          <Text fontSize="2xl" className="edit-time">
            Tiempo: {`${timer.hours}:${timer.minutes}:${timer.seconds}`}
          </Text>
        )}
      </div>
      <div className="edit-form-container">
        <div className="edit-form-text">
          <Text>
            Cliente: <b>{inputs.data?.name}</b>
          </Text>
          <Text>
            Placa: <b>{vehicle_id}</b>
          </Text>
          <Text>
            Fecha de ingreso: <b>{inputs.datetime}</b>
          </Text>
        </div>
        <div className="edit-form-inputs">
          <div className="edit-form-inputs-left">
            <div className="edit-form-input">
              <Text>Conductor:</Text>
              <Input
                backgroundColor={'#fff'}
                width="70%"
                _placeholder={{ color: 'gray.500' }}
                placeholder={inputs.driver || 'Nombre y Apellido'}
                className="edit-form-inputs-left-conductor-input"
                name="driver"
                value={inputs.driver}
                onChange={(e) => handleSelect(e)}
              />
            </div>
            <div className="edit-form-input">
              <Text>Kilometraje:</Text>
              <Input
                width="70%"
                backgroundColor={'#fff'}
                _placeholder={{ color: 'gray.500' }}
                placeholder={inputs.kilometers || '110.000'}
                className="edit-form-inputs-left-conductor-input"
                name="kilometers"
                value={inputs.kilometers}
                onChange={(e) => handleSelect(e)}
              />
            </div>
            <div className="edit-form-productos-container">
              <div className="edit-form-productos">
                <Text>Productos:</Text>
                <Select
                  defaultValue={'Productos'}
                  onChange={(e) => handleProductSelect(e)}
                  name="select-producto"
                  className="edit-form-inputs-left-conductor-input"
                  width="50%"
                >
                  <option value="" disabled hidden>
                    Productos
                  </option>
                  {productos.map((e) => (
                    <option value={e._id} key={e._id}>
                      {e.product}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="edit-form-selected-products">
                <TableProducts
                  goods={inputs?.goods}
                  inputs={inputs}
                  setInputs={setInputs}
                  deleteProducts={handleDeleteProduct}
                />
              </div>
            </div>
          </div>
          <div className="edit-form-inputs-right">
            <div className="edit-form-input">
              <Text>Servicio:</Text>
              <Select
                defaultValue={inputs.services}
                onChange={(e) => handleSelect(e)}
                width="50%"
                backgroundColor={'#fff'}
                className="edit-form-inputs-left-conductor-input"
                name="services"
              >
                <option value="" disabled hidden>
                  {inputs.services}
                </option>
                {typeService &&
                  typeService.map((e) => (
                    <option key={e._id} value={e.type}>
                      {e.type}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="edit-form-input">
              <Text>Estación:</Text>
              <Select
                defaultValue={inputs.workstation}
                onChange={(e) => handleSelect(e)}
                width="50%"
                className="edit-form-inputs-left-conductor-input"
                backgroundColor={'#fff'}
                name="workstation"
              >
                <option value="" disabled hidden>
                  {inputs.workstation}
                </option>
                {/*  <option value="" disabled hidden>{inputs.workstation}</option> */}
                {stationsRedux.map((opt) => (
                  <option key={opt._id} value={opt.workStation}>
                    {opt.workStation}
                  </option>
                ))}
              </Select>
            </div>
            <div className="edit-form-input">
              <Text>Técnico:</Text>
              <Select
                defaultValue={inputs.technician}
                onChange={(e) => handleSelect(e)}
                width="50%"
                className="edit-form-inputs-left-conductor-input"
                backgroundColor={'#fff'}
                name="technician"
              >
                <option value="" disabled hidden>
                  {inputs.technician}
                </option>
                {techRedux.map((tech) => (
                  <option key={tech._id} value={tech.name}>
                    {tech.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="edit-form-input-observaciones">
              <Text>Observaciones:</Text>
              <Textarea
                placeholder="Agrega una aclaracion"
                backgroundColor={'#fff'}
                name="comments"
                value={inputs.comments}
                onChange={(e) => handleSelect(e)}
              />
            </div>
            <div className="edit-form-input-buttons">
              <Button marginRight={'15px'} onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>Guardar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditFinish
