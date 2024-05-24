import { useState } from 'react'
import { Grid, GridItem, Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { SideBar } from 'components'
import { Outlet } from 'react-router-dom'

export default function Root() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const variants = {
    open: { gridTemplateColumns: '19rem 1fr' },
    closed: { gridTemplateColumns: '4rem 1fr' }
  }
  return (
    <Grid
      as={motion.div}
      templateAreas={`
      "nav main"
      "nav main"`}
      gridTemplateRows="1fr"
      animate={isOpenMenu ? 'open' : 'closed'}
      variants={variants}
      h="200px"
      gap="1"
    >
      <GridItem h="100vh" w="100%" area="nav">
        <Stack h="inherit" w="inherit">
          <SideBar setIsOpenMenu={setIsOpenMenu} />
        </Stack>
      </GridItem>
      <GridItem h="100vh" w="100%" area="main">
        <Stack h="inherit" w="inherit">
          <Outlet />
        </Stack>
      </GridItem>
    </Grid>
  )
}
