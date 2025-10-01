'use client'
import { useState } from "react"
import Registro from "@/components/Registro"
export default function Login() {
  const [ modalRegistroAbierto, setModalRegistroAbierto] = useState(false)
  const registroAbierto = ()=>{
    setModalRegistroAbierto((estadoPrevio)=> !estadoPrevio)
  }
  const cerrarConEscape = (e) => {
    e.key === "Escape" && modalRegistroAbierto === true ? (registroAbierto()) : ('')
  };
  return (
    <div className="flex flex-col justify-center items-center text-gray-800 shadow bg-gray-100 p-5 rounded-lg">
      <h2 className="font-bold">Bienvenido</h2>
      <span className="mb-5">Ingrese sus credenciales</span>
      <div className="flex flex-col gap-2">
        <input type="text" className="bg-white rounded-lg p-2 focus:outline-none" placeholder="Usuario"/>
        <input type="password" className="bg-white rounded-lg p-2 focus:outline-none"placeholder="Contraseña"/>
      </div>
      <div className="flex gap-2 mt-5">
        <button 
          className="rounded-lg bg-white p-2 cursor-pointer shadow hover:bg-gray-50 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
        >Iniciar sesión</button>
        <button 
          className="rounded-lg bg-blue-800 p-2 cursor-pointer text-white shadow hover:bg-blue-900 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
          onClick={registroAbierto}
          tabIndex={0}
          onKeyDown={cerrarConEscape}
        >Registrarse</button>
      </div>
      { modalRegistroAbierto ? (
        <div className="fixed bg-black/40 backdrop-blur-sm flex inset-0 h-screen w-screen items-center justify-center" onClick={registroAbierto}>
          <div onClick={(e)=> e.stopPropagation()}>
            <Registro />
          </div>
        </div>
        ) : ('')}
    </div>
  )
}
