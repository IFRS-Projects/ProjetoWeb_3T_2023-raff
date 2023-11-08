import { InputHTMLAttributes, forwardRef, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', name = '', label = '', helperText = '', ...props },
    ref,
  ) => {
    const inputId = useId()
    return (
      <div className="flex flex-col m-4">
        <label
          htmlFor={inputId}
          className="text-white flex w-full justify-start text-buttonBg font-bold opacity-80 text-sm mb-2"
        >
          {label}
        </label>
        <input
          className="bg-black border-2 border-white w-72 h-8 text-white p-2"
          id={inputId}
          type={type}
          name={name}
          ref={ref}
          {...props}
        />
        {helperText.length > 0 && (
          <p className="text-red-600 flex justify-center text-sm mt-6">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)
