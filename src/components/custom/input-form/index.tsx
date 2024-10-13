import React from "react"
import { Input } from "@/components/ui/input"
import "./input-form.css"

type Props = {
    id?: string;
    children?: React.ReactNode;
    title: string;
    containerClassName?: string;
    error?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>

export const Inputform = React.forwardRef<HTMLInputElement, Props>(({ error, id, title, containerClassName = "", children, ...props }, ref) => {
    return (
        <div className="input-form-container">
            <label className="input-form-label" htmlFor={id}>
                <p>{title}</p>
                {children ? children : <Input autoComplete="off" id={id} ref={ref} {...props} />}
            </label>
            {error && <p className="input-form-error">{error}</p>}
        </div>
    )
})
