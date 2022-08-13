import React from 'react'
import { Outlet } from 'react-router-dom'
import {CurrencyContext} from "./context/currency"
import { useContext } from 'react'
import Navbar from './components/Navbar'

export const App = () => {
  const {setCurrency}=useContext(CurrencyContext)
  return (
    <div style={{overflowY:"hidden"}}>
      <div style={{height:"4.5rem"}}></div>
        <Navbar currencyChangeHandler={(e)=>setCurrency(e.target.value)} sx={{position:"fixed",padding:"5rem"}}/>
        <Outlet/>
    </div>
  )
  }