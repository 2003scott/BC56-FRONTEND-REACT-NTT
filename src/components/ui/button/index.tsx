import React from "react"
import "./style.css"

interface ButtonProps {
    children: React.ReactNode
    type? : "button" | "submit" | "reset"
    onClick? : () => void
}

export const Button = ({ children, type = "button", onClick } : ButtonProps) => {
    return (
        <button type={type} onClick={() => onClick} className="button">
            {children}
        </button>
    )
}
