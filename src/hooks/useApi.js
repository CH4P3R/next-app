import { useState } from "react"

export const useApi = (urlBase = "/api")=>{
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ data, setData ] = useState(null)
    const request = async (endpoint, metodo = "GET", body)=>{
        try{
            const res = await fetch(`${urlBase}${endpoint}`, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : null
            });
            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || "Error al registrar usuario");
            }
            const resultado = await res.json();
            setData(resultado);
        }catch(error){
            setError(error);
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    return { request, data, loading, error }
}
