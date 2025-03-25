import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthProvider from './component/AuthContext/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
 <div className='mx-w-7xl mx-auto'>
   <StrictMode>
    <AuthProvider>
    <RouterProvider router = {router}/>
    </AuthProvider>
  </StrictMode>,
 </div>
)
