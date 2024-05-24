import { GiKiwiBird } from 'react-icons/gi'
import { Heading, Icon, VStack, Text } from '@chakra-ui/react'

export default function InProgressPage() {
  return (
    <VStack color="brand.primary" h="full" w="full" alignItems="center" justifyContent="center">
      <Icon boxSize="350" as={GiKiwiBird} />
      <Heading>KIWIS TRABAJANDO</Heading>
      <Text fontSize="lg">Paginas en construccion!</Text>
    </VStack>
  )
}
