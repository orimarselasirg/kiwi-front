import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { VStack, useBoolean, Button, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { PanelSIdeBar, Logo, Navbar } from 'components'
import { useEffect } from 'react'

export default function SideBar({ setIsOpenMenu }) {
  const [flag, setFlag] = useBoolean()
  const toggleMenu = {
    open: { width: '19rem' },
    closed: { width: '4rem' }
  }

  useEffect(() => {
    setIsOpenMenu(flag)
  })

  return (
    <>
      <VStack
        as={motion.div}
        spacing="6"
        h="inherit"
        py="2rem"
        bg="brand.sec"
        fontSize="lg"
        animate={flag ? 'open' : 'closed'}
        variants={toggleMenu}
      >
        <Box w="full" h="3.5rem" position="relative">
          <Button
            onClick={setFlag.toggle}
            position="absolute"
            variant="unstyled"
            right="0"
          >
            {flag ? <FaArrowLeft /> : <FaArrowRight />}
          </Button>
        </Box>
        <Logo isOpenMenu={flag} />
        <Navbar isOpenMenu={flag} />
        <PanelSIdeBar isOpenMenu={flag} />
      </VStack>
    </>
  )
}
