import { Stack, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

export default function AccordionItem({ title, path, index }) {
  const { pathname } = useLocation()

  return (
    <Stack
      key={title}
      position="relative"
      h="3rem"
      pl="3rem"
      justifyContent="center"
      borderBottom="1px"
      borderTop={index === 0 ? '1px' : 0}
      borderColor="brand.primaryLightVariant"
      cursor="pointer"
      boxShadow="sm"
      _before={{
        content: '""',
        position: 'absolute',
        right: `${pathname !== path ? '-97%' : 0}`,
        bg: 'brand.select',
        h: '100%',
        w: '97%',
        zIndex: '2',
        transition: 'right .2s ease'
      }}
    >
      <div style={{ zIndex: '2' }}>
        <Link to={path}>
          <Text>{title}</Text>
        </Link>
      </div>
    </Stack>
  )
}
