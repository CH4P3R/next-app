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
    <div className="relative flex flex-col justify-center items-center text-gray-800 shadow bg-gray-100 p-5 rounded-lg">
      {msjDatosIncorrectos ? (<p className='absolute top-[-90px] bg-red-500 mt-3 text-white p-2 rounded-2xl w-full text-center'>El correo o contraseña ingresados son incorrectos</p>) : ('')}
      {msjUsuarioNoExiste ? (<p className='absolute top-[-90px] bg-red-500 mt-3 text-white p-2 rounded-2xl w-full text-center'>El usuario ingresado no existe</p>) : ('')}
      {msjAdvertencia ? (<p className='absolute top-[-90px] bg-red-500 mt-3 text-white p-2 rounded-2xl w-full text-center'>Por favor, rellene todos los campos</p>) : ('')}
      <h2 className="font-bold">Bienvenido</h2>
      <span className="mb-5">Ingrese sus credenciales</span>
      <div className="flex flex-col gap-2">
        <input onClick={()=> {setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false)}} onChange={(e)=> setUsuarioIngresado(e.target.value)} type="text" className="bg-white rounded-lg p-2 focus:outline-none" placeholder="Usuario"/>
        <input onClick={()=> {setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false)}} onChange={(e)=> setCorreoIngresado(e.target.value)} type="email" className="bg-white rounded-lg p-2 focus:outline-none"placeholder="Correo"/>
        <input onClick={()=> {setMsjAdvertencia(false); setMsjDatosIncorrectos(false); setMsjUsuarioNoExiste(false)}} onChange={(e)=> setContraseniaIngresada(e.target.value)} type="password" className="bg-white rounded-lg p-2 focus:outline-none"placeholder="Contraseña"/>
      </div>
      <div className="flex gap-2 mt-5">
        <button
        onClick={iniciarSesion}
          className="rounded-lg bg-white p-2 cursor-pointer shadow hover:bg-gray-50 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
        >
           Iniciar sesión
        </button>
        <button
          className="rounded-lg bg-blue-800 p-2 cursor-pointer text-white shadow hover:bg-blue-900 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
          onClick={()=>{registroAbierto(); setMsjAdvertencia(false);}}
          tabIndex={0}
          onKeyDown={cerrarConEscape}
        >
          Registrarse
        </button>
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
