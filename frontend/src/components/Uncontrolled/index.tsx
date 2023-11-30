'use client'
import { useRef } from "react"

export const Uncontrolled = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    const value = inputRef.current?.value
    console.log(value)
  }
  return (
    <>
      <input type='text' ref={inputRef} />

      <button onClick={handleButtonClick}>Get value</button>
    </>
  )
}
