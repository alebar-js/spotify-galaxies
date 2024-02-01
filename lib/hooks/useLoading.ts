import { useState } from "react"

const useLoading = <T extends (...args: any[]) => Promise<any>>(action: T) => {
    const [loading, setLoading] = useState(false)     // loading state - returned by function
  
    const doAction = (...args: Parameters<T>) => {    // action trigger, returned as well
      setLoading(true)
      return action(...args).finally(() => setLoading(false))
    }
  
    return [doAction, loading] as const
  }
  
export default useLoading