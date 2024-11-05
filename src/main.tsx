import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ChakraProvider} from "@chakra-ui/react"
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
