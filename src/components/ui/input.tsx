import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    description?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, ...props }, ref) => {
    const id = props.id || React.useId()
    return (
      <div className="w-full">
        {label && <Label htmlFor={id} className="mb-2 block">{label}</Label>}
        <input
          type={type}
          id={id}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
