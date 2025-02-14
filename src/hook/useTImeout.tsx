import { useState,useEffect } from "react"

const useTImeout = (initialErr : string | null ,delay=5000) => {
    const [error,setError] = useState<string|null>(initialErr)

    useEffect(()=>{
        if(error){
            const timer = setTimeout(()=>{
                setError(null)
        },delay)
        return ()=> clearTimeout(timer)
    }
     
    },[delay,error])

  return [error,setError ] as const
}

export default useTImeout
