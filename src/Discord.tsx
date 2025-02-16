import "react";

interface DiscordProps {
    href?: string,
    label?: string,
    className?: string
}

export function Discord ({href, label, className = ''}: DiscordProps) {
    if (href === undefined || href === null || href === '') {
        return null
    }
    if (label === undefined || label === null || label === '') {
        label = href
    }

    return (
        <>
        <div className={className}>
            <div>To register, please go to:</div>
            <div><a href={href}>{label}</a></div>
        </div>
        </>
    )
}