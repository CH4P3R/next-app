import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  try{
    const body = await request.json();
    const respuesta = await prisma.usuario.findFirst(
        { 
            where: {
                nombre: body.nombre
            }
        }
    )
    if(!respuesta){
        return new Response(JSON.stringify({ encontrado: false, valido: false}),{ status: 200 });
    }
    if(respuesta.correo != body.correo || respuesta.contrasenia != body.contrasenia){
        return new Response(JSON.stringify({ encontrado: true, valido: false}),{ status: 200 });
    }
    return new Response(JSON.stringify({ encontrado: true, valido: true }),{ status: 200 });
  }catch(error){
    return new Response(JSON.stringify({message: "Error al consultar usuario" }), { status: 500})
  }
}