import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './theme/ThemeProvider.tsx'
import { Theme } from "@radix-ui/themes";
import './index.css'
import "leaflet/dist/leaflet.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Theme>
        <App />
      </Theme>
    </ThemeProvider>
  </StrictMode>,
)
