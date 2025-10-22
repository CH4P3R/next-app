"use client"
import { useState } from 'react'
import { useApi } from '@/hooks/useApi'

export default function Registro() {
  const { request, data, loading, error } = useApi();
  const [ nombre, setNombre ] = useState("");
  const [ correo, setCorreo ] = useState("");
  const [ contrasenia, setContrasenia ] = useState("");
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false)
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false)
  const registrar = ()=> {
    if (nombre === "" || correo === "" || contrasenia === "") {
      setMostrarAdvertencia(true);
      return;
    }
    request("/usuarios", "POST", {
      nombre,
      correo,
      contrasenia
    })
    setMostrarAdvertencia(false);
    setMostrarMensajeExito(true);
  }
  return (
    <div className="flex relative flex-col justify-center items-center text-gray-800 shadow bg-gray-100 p-5 rounded-lg">
      {mostrarMensajeExito ? (<p className='absolute top-[-90px] bg-green-500 mt-3 text-white p-2 rounded-2xl w-full text-center'>Usuario registrado exitosamente</p>) : ('')}
      {mostrarAdvertencia ? (<p className='absolute top-[-90px] bg-red-500 mt-3 text-white p-2 rounded-2xl w-full text-center'>Por favor, rellene todos los campos</p>) : ('')}
      <h2 className="font-bold mb-5">Ingrese sus datos</h2>
      <div className="flex flex-col gap-2">
        <input onClick={()=> setMostrarAdvertencia(false)} onChange={(e) => setNombre(e.target.value)} type="text" className="bg-white rounded-lg p-2 focus:outline-none" placeholder="Usuario" />
        <input onClick={()=> setMostrarAdvertencia(false)} onChange={(e) => setCorreo(e.target.value)} type="email" className="bg-white rounded-lg p-2 focus:outline-none" placeholder="Correo electrónico"/>
        <input onClick={()=> setMostrarAdvertencia(false)} onChange={(e) => setContrasenia(e.target.value)} type="password" className="bg-white rounded-lg p-2 focus:outline-none"placeholder="Contraseña"/>
      </div>
        <button 
          onClick={registrar}
          className="rounded-lg w-full mt-5 bg-blue-800 p-2 cursor-pointer text-white shadow hover:bg-blue-900 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
        >Registrarse
        </button>
    </div>
  )
}
