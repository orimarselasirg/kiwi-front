import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Center,
  HStack,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react'
import { SECTIONS } from 'utilities'
import { AccordionItem as Item } from 'components'

function Navbar({ isOpenMenu }) {
  const { pathname } = useLocation()

  return isOpenMenu ? (
    <VStack as={motion.div} spacing="0" w="full" h="70%">
      {SECTIONS.map(({ title, path, activeIcon, inactiveIcon, submenu }) => {
        return !submenu ? (
          <Center key={title} boxShadow="base" h="3rem" w="full">
            <HStack
              display="inline-block"
              key={title}
              w="inherit"
              h="full"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
            >
              <Link to={path}>
                <HStack
                  as={motion.div}
                  pl="4"
                  w="300px"
                  h="full"
                  transition="0.2s linear"
                >
                  <Icon
                    as={pathname === path ? activeIcon : inactiveIcon}
                    boxSize="25px"
                  />
                  <Text
                    as={motion.p}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    {title}
                  </Text>
                </HStack>
              </Link>
            </HStack>
          </Center>
        ) : (
          <Accordion allowMultiple key={title}>
            <AccordionItem boxShadow="base">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    href={path}
                    _expanded={{ bg: 'brand.select' }}
                    display="inline-flex"
                  >
                    <HStack w="full">
                      <Icon
                        as={!isExpanded ? inactiveIcon : activeIcon}
                        boxSize="25px"
                      />
                      <Text
                        as={motion.p}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        {title}
                      </Text>
                      <AccordionIcon />
                    </HStack>
                  </AccordionButton>
                  <AccordionPanel boxShadow="sm">
                    {submenu?.map((item, i) => {
                      return (
                        <Item
                          key={item.title}
                          title={item.title}
                          path={item.path}
                          index={i}
                        />
                      )
                    })}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        )
      })}
    </VStack>
  ) : (
    <VStack as={motion.div} spacing="0" w="full" h="60%">
      {SECTIONS.map(({ title, path, activeIcon, inactiveIcon }, index) => {
        return (
          <Center
            key={title}
            boxShadow="base"
            h="3rem"
            w="inherit"
            bg={location === path ? 'brand.select' : ''}
          >
            <Link to={path}>
              <Icon
                as={pathname === path ? activeIcon : inactiveIcon}
                boxSize="25px"
              />
            </Link>
          </Center>
        )
      })}
    </VStack>
  )
}

export default Navbar
