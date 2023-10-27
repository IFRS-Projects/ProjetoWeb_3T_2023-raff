type myProps = {
  label: string,
  type: 'text' | string,
  placeholder: string,
  helpText?: string
}

export default function Input({ label, type, placeholder, helpText }: myProps) {

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-6">
      <label className="font-bold text-base text-cyan-400">{label}</label>
      <input className="border-2 border-cyan-100 rounded-lg p-2 bg-slate-100 text-black" type={type} placeholder={placeholder} />
      {helpText !== '' && <p>{helpText}</p>}
    </div>
  )
}