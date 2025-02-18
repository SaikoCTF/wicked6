import "react";

interface DiscordProps {
    href?: string,
    label?: string,
    prereg_date?: string,
    className?: string
}

export function Discord ({prereg_date, href, label, className = ''}: DiscordProps) {
    if (label === undefined || label === null || label === '') {
        label = href
    }

    return (
        <>
        <div className={className}>
            { 
                (href === undefined || href === null || href === '') ? (
                    <div className="emphasis">To register, please come back on {prereg_date} for the registration link.</div>
                ) : (
                    <>
                        <div>To register, please go to:</div>
                        <div><a href={href}>{label}</a></div>
                    </>
                )
            }
        </div>
        </>
    )
}