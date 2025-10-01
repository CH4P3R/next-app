import React from 'react'

export default function Registro() {
  return (
    <div className="flex flex-col justify-center items-center text-gray-800 shadow bg-gray-100 p-5 rounded-lg">
      <h2 className="font-bold mb-5">Ingrese sus datos</h2>
      <div className="flex flex-col gap-2">
        <input type="text" className="bg-white rounded-lg p-2 focus:outline-none" placeholder="Usuario"/>
        <input type="email" className="bg-white rounded-lg p-2 focus:outline-none" placeholder="Correo electrónico"/>
        <input type="password" className="bg-white rounded-lg p-2 focus:outline-none"placeholder="Contraseña"/>
      </div>
        <button 
          className="rounded-lg w-full mt-5 bg-blue-800 p-2 cursor-pointer text-white shadow hover:bg-blue-900 transition-all ease-in-out duration-200 active:translate-y-1 active:shadow-inner"
        >Registrarse</button>
    </div>
  )
}
