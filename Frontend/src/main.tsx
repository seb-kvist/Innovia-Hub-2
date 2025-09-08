import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import * as signalR from "@microsoft/signalr"

const connection= new signalR.HubConnectionBuilder().withUrl("http://localhost:5022/bookingHub",{
  withCredentials: true 
})
.withAutomaticReconnect()
.build();

connection.start()
.then(()=>{
  console.log("connection to HUB ok")
})
.catch((err)=>{
  console.log("error ", err);
  
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
