import { useState,useEffect } from "react"

function useErrorTImeout<T> (initialErr : T):[T,(value:T)=>void] {
    const [error,setError] = useState<T>(initialErr)

    useEffect(()=>{
        if(error){
            const timer = setTimeout(()=>{
                setError(initialErr)
        },4000)
        return ()=> clearTimeout(timer)
    }
     
    },[error,initialErr])

  return [error,setError ] as const
}

export default useErrorTImeout
