import { Box, Flex } from '@chakra-ui/react'
import Sidebar  from '../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
    const { pathname } = useLocation()
  return (
    <Flex>
        {!['/login', '/signup', '/reset'].includes(pathname) ? (
    <Box>
        <Sidebar />
    </Box>
) : null}
        <Box flex={1} w={{base:"calc(100%-70px)", md: "calc(100%-240px)"}}>
            {children}
        </Box>
    </Flex>
  )
}
