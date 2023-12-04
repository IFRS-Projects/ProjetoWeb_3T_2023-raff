'use client'
import { Input } from '../ui/input'

export default function ImageDropZone() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Input type="file" id="MovieCape" className="hidden" />
      <label
        htmlFor="MovieCape"
        className="w-1/2 h-52 border border-red-900 cursor-pointer"
      >
        LABEL
      </label>
    </div>
  )
}
