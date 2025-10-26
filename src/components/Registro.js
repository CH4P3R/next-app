"use client"
import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'

export default function Registro() {
  const { request, data, loading, error } = useApi();
  const [ nombre, setNombre ] = useState("");
  const [ correo, setCorreo ] = useState("");
  const [ contrasenia, setContrasenia ] = useState("");
  const [ mostrarAdvertencia, setMostrarAdvertencia] = useState(false)
  const [ msjCorreoYaExiste, setMsjCorreoYaExiste ] = useState(false)
  const [ msjRegistradoConExito, setMsjRegistradoConExito] = useState(false)

  const registrar = async ()=> {
    if (nombre === "" || correo === "" || contrasenia === "") {
      setMostrarAdvertencia(true);
      return;
    }
    setMostrarAdvertencia(false);
    await request("/usuarios", "POST", {
      nombre,
      correo,
      contrasenia
    })
  }
  useEffect(()=>{
      if (!loading) {
        if(data.existe){
          setMsjCorreoYaExiste(true);
        }else{
          setMsjRegistradoConExito(true);
        }
      }
    },[data])
  return (
    <div onClick={(e)=> e.stopPropagation()} className="relative flex flex-col justify-center items-center text-gray-800 shadow bg-white p-5 rounded-lg w-full max-w-[300px]">
      <p
        className={`absolute -top-20 bg-green-500 rounded-xl text-white p-2 mt-5 w-full text-center
          transition-all duration-500 ease-in-out
          ${msjRegistradoConExito ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        aria-live="polite"
      >Usuario registrado exitosamente</p>
      <p
        className={`absolute -top-25 bg-red-400 rounded-xl text-white p-2 mt-5 w-full text-center
          transition-all duration-500 ease-in-out
          ${msjCorreoYaExiste ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        aria-live="polite"
      >Ya existe un usuario con el correo ingresado</p>
      <p
        className={`absolute -top-20 bg-red-400 rounded-xl text-white p-2 mt-5 w-full text-center
          transition-all duration-500 ease-in-out
          ${mostrarAdvertencia ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        aria-live="polite"
      >Por favor, complete los campos</p>
      <h2 className="font-bold text-2xl">Registro</h2>
      <h3 className="m-3">Ingrese sus datos</h3>
      <div className="flex flex-col gap-2 w-full">
        <input onClick={()=> {setMostrarAdvertencia(false); setMsjCorreoYaExiste(false); setMsjRegistradoConExito(false);}} onChange={(e) => setNombre(e.target.value)} type="text" className="bg-slate-200 rounded-lg p-2 focus:outline-none" placeholder="Usuario" />
        <input onClick={()=> {setMostrarAdvertencia(false); setMsjCorreoYaExiste(false); setMsjRegistradoConExito(false);}} onChange={(e) => setCorreo(e.target.value)} type="email" className="bg-slate-200 rounded-lg p-2 focus:outline-none" placeholder="Correo"/>
        <input onClick={()=> {setMostrarAdvertencia(false); setMsjCorreoYaExiste(false); setMsjRegistradoConExito(false);}} onChange={(e) => setContrasenia(e.target.value)} type="password" className="bg-slate-200 rounded-lg p-2 focus:outline-none"placeholder="Contraseña"/>
      </div>
        <button 
          onClick={()=>{registrar(); }}
          className={`w-full mt-5 rounded-lg shadow bg-cyan-500 p-2 cursor-pointer text-white transition-all ease-in-out duration-200 hover:bg-cyan-400 active:translate-y-1 active:shadow-inner`}
        >Registrarse
        </button>
    </div>
  )
}
