import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import AppContextProvider from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //      //BrowserRouter ka suppport mil gaua app component me
  //we can access the context file with appContextProvider in App
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)
