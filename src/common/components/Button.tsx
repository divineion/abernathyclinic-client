// inclura les attributs essentiels pr l'accessibilité
const Button = (
    { handleClick, value, ariaLabel, title, className }: ButtonProps
) => {

    return (
        <>
            <button onClick={handleClick} aria-label={ariaLabel} title={title} className={className}>{value}</button>
        </>
    )
}

type ButtonProps = {
    handleClick: () => void,
    value: string,
    ariaLabel: string,
    title: string,
    className: string
}

export default Button