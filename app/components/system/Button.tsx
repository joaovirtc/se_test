"use client"

import React from "react"

type ButtonVariant =
  | "primary_button"
  | "secondary_button"
  | "tertiary_button"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  label?: string
  icon?: React.ReactNode
}

export default function Button({
  variant = "primary_button",
  label,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      )}

      {label && (
        <span>{label}</span>
      )}
    </button>
  )
}
