import { HStack, Center, Icon, Heading } from '@chakra-ui/react'
import { GiKiwiBird } from 'react-icons/gi'

export default function Logo({ isOpenMenu }) {
  return (
    <HStack
      h="10%"
      w="full"
      alignItems="center"
      justifyContent="center"
      display="inline-flex"
    >
      {isOpenMenu ? (
        <>
          <Center>
            <Icon as={GiKiwiBird} boxSize="35px" />
          </Center>
          <Heading>Kiwi</Heading>
        </>
      ) : (
        <Center>
          <Icon as={GiKiwiBird} boxSize="35px" />
        </Center>
      )}
    </HStack>
  )
}
