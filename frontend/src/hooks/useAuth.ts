'use client'

import { useEffect, useState } from "react"

export const useAuth = <T, F>(
  store: (callBack: (state: T) => unknown
  ) => unknown,
  callBack: (state: T) => F) => {
  const result = store(callBack) as F
  const [data, setData] = useState<F>()
  useEffect(() => {
    setData(result)
  }, [result])
  return data
}

