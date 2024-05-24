import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input
} from '@chakra-ui/react'

const TableProducts = ({
  goods,
  deleteProducts,
  inputs,
  setInputs
}) => {
  const changeHandler = (e, id, inputs, setInputs) => {
    const initSelect = (data) => {
      return data.map((item) => ({
        ...item
      }))
    }
    const inputsGood = initSelect(inputs.goods)
    const addProduct = inputsGood.find((p) => p._id === id)
    addProduct.qty = e.target.value
    setInputs({
      ...inputs,
      goods: inputsGood
    })
  }

  return (
    <TableContainer fontSize={10} size="sm">
      <Table variant="simple">
        {/* <TableCaption placement='top'>Listado de productos</TableCaption> */}
        <Thead>
          <Tr>
            <Th fontSize={9}>Nº</Th>
            <Th fontSize={9}>Productos</Th>
            <Th fontSize={9}>U.M</Th>
            <Th fontSize={9}>Cantidad</Th>
            <Th fontSize={9}>Borrar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {goods?.map((e, i) => (
            <Tr key={i}>
              <Td>{i + 1}</Td>
              <Td>{e.product}</Td>
              <Td>{e.partnumber}</Td>
              <Td>
                <Input
                  type="text"
                  _placeholder={{ color: 'gray.500' }}
                  placeholder="0"
                  name="quantity"
                  value={e.qty}
                  onChange={(event) =>
                    changeHandler(
                      event,
                      e._id,
                      inputs,
                      setInputs
                    )
                  }
                />
              </Td>
              <Td>
                <button onClick={() => deleteProducts(e.product)}>X</button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableProducts
