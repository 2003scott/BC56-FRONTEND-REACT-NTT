import React from "react"
import "./button.css"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>( ({...props }, ref) => {
        return (
            <button className="button" ref={ref} {...props}/>
        )
    }
)
