'use client'
import { useEffect, useState } from "react"
import { useRouter} from "next/navigation"
import Registro from "@/components/Registro"
import { useApi } from "@/hooks/useApi"
export default function Login() {
  const [ modalRegistroAbierto, setModalRegistroAbierto] = useState(false)
  const [ msjAdvertencia, setMsjAdvertencia ] = useState(false)
  const [ msjUsuarioNoExiste, setMsjUsuarioNoExiste ] = useState(false)
  const [ msjDatosIncorrectos, setMsjDatosIncorrectos ] = useState(false)

  const [ usuarioIngresado, setUsuarioIngresado ] = useState('')
  const [ correoIngresado, setCorreoIngresado ] = useState('')
  const [ contraseniaIngresada, setContraseniaIngresada ] = useState('')
  const { request, data, loading, error } = useApi();

  const router = useRouter();

  const registroAbierto = ()=>{
    setModalRegistroAbierto((estadoPrevio)=> !estadoPrevio)
  }
  const cerrarConEscape = (e) => {
    e.key === "Escape" && modalRegistroAbierto === true ? (registroAbierto()) : ('')
  };
  const iniciarSesion = async ()=>{
    if (usuarioIngresado === "" || correoIngresado === "" || contraseniaIngresada === "") {
      setMsjAdvertencia(true);
      return ; 
    }
    await request("/login", "POST", {
      nombre: usuarioIngresado,
      correo: correoIngresado,
      contrasenia: contraseniaIngresada
    });
  }
  useEffect(()=>{
    if (!loading) {
      if(!data.encontrado && !data.valido){
        setMsjUsuarioNoExiste(true);
      }
      if(data.encontrado && !data.valido){
        setMsjDatosIncorrectos(true);
      }
      if(data.encontrado && data.valido){
        router.push('/home');
      }
    }
  },[data])

  return (
    <div className="relative flex flex-col justify-center items-center text-gray-800 shadow bg-white p-5 rounded-lg w-full max-w-[300px]">
      <p className={`absolute -top-15 bg-red-100 border-l-red-400 border-l-2 text-red-400 p-2 w-full text-center transition-all duration-500 ease-in-out
      ${msjDatosIncorrectos ? ('opacity-100 translate-y-0') : ('opacity-0 -translate-y-4 pointer-events-none')}`}>Correo o contraseña incorrectos</p>
      <p className={`absolute -top-15 bg-red-100 border-l-red-400 border-l-2 text-red-400 p-2 w-full text-center transition-all duration-500 ease-in-out
      ${msjUsuarioNoExiste? ('opacity-100 translate-y-0') : ('opacity-0 -translate-y-4 pointer-events-none')}`}>El usuario ingresado no existe</p>
      <p className={`absolute -top-15 bg-red-100 border-l-red-400 border-l-2 text-red-400 p-2 w-full text-center transition-all duration-500 ease-in-out
      ${msjAdvertencia ? ('opacity-100 translate-y-0') : ('opacity-0 -translate-y-4 pointer-events-none')}`}>Por favor, complete los campos</p>
      <h2 className="font-bold text-2xl">Bienvenido/a</h2>
      <span className="m-3">Ingrese sus credenciales</span>
      <div className="flex flex-col gap-2 w-full">
        <input onClick={()=> {setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false)}} onChange={(e)=> setUsuarioIngresado(e.target.value)} type="text" 
          className="bg-slate-200 rounded-lg p-2 focus:outline-none" placeholder="Usuario"/>
        <input onClick={()=> {setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false)}} onChange={(e)=> setCorreoIngresado(e.target.value)} type="email" 
          className="bg-slate-200 rounded-lg p-2 focus:outline-none"placeholder="Correo"/>
        <input onClick={()=> {setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false)}} onChange={(e)=> setContraseniaIngresada(e.target.value)} type="password" 
          className="bg-slate-200 rounded-lg p-2 focus:outline-none"placeholder="Contraseña"/>
      </div>
      <div className="flex gap-2 mt-5 w-full">
        <button
        onClick={iniciarSesion}
          className="flex-1 rounded-lg shadow bg-white p-2 cursor-pointer hover:bg-gray-50 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
        >
           Iniciar sesión
        </button>
        <button
          className="flex-1 rounded-lg shadow bg-cyan-500 p-2 cursor-pointer text-white hover:bg-cyan-400 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
          onClick={()=>{registroAbierto(); setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false);}}
          tabIndex={0}
          onKeyDown={cerrarConEscape}
        >
          Registrarse
        </button>
      </div>
      { modalRegistroAbierto ? (
        <div className="fixed bg-black/40 backdrop-blur-sm flex inset-0 h-screen w-screen items-center justify-center" onClick={registroAbierto}>
            <Registro/>
        </div>
        ) : ('')}
    </div>
  )
}
