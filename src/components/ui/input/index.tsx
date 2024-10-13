import React from "react"
import './input.css'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type,  ...props }, ref) => {
    return (
        <input type={type} id="search" className="input" { ...props} ref={ref}/>
    )
})
