// inclura les attributs essentiels pr l'accessibilité
import React from "react";

const Button = (
    { type, handleClick, ariaLabel, title, className, children }: ButtonProps
) => {

    return (
        <>
            <button
                type={type}
                onClick={handleClick}
                aria-label={ariaLabel}
                title={title}
                className={className}
            >
                {children}
            </button>
        </>
    )
}

type ButtonProps = {
    handleClick?: () => void,
    ariaLabel: string,
    title: string,
    className: string,
    children: React.ReactNode,
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export default Button