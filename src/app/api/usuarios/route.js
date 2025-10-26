import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  try{
    const body = await request.json();
    const respuesta = await prisma.usuario.findUnique(
      {
        where : {
          correo: body.correo
        }
      }
    )
    if(respuesta){
      return new Response(JSON.stringify({ existe: true }),{ status: 200 });
    }
    await prisma.usuario.create(
        {
            data: {
                nombre: body.nombre,
                correo: body.correo,
                contrasenia: body.contrasenia
            }
        }
    )
    return new Response(JSON.stringify({ message: "Éxito registrando el usuario" }),{ status: 200 });
  }catch(error){
    return new Response(JSON.stringify({message: "Error al registrar el usuario" }), { status: 500})
  }
}