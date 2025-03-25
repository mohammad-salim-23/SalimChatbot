import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'

createRoot(document.getElementById('root')).render(
 <div className='mx-w-7xl mx-auto'>
   <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
 </div>
)
