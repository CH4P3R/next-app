import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request) {
  try{
    const body = await request.json();
    console.log("Datos recibidos en el servidor: ", body)
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
                contrasenia: body.contrasenia,
                fecha_nacimiento: new Date(body.fechaNacimiento),
                genero: body.genero
            }
        }
    )
    return new Response(JSON.stringify({ message: "Éxito registrando el usuario" }),{ status: 200 });
  }catch(error){
    return new Response(JSON.stringify({message: "Error al registrar el usuario", error: error}), { status: 500})
  }
}