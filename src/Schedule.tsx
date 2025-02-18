
interface ScheduleProps {
    date_start: string
    date_end: string
}


export function Schedule({date_start, date_end}: ScheduleProps) {
 

    const start = new Date(date_start)
    const end = new Date(date_end)

    const fmt_opts: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
        timeZoneName: "short"
    }
    const date_fmt = new Intl.DateTimeFormat("en-US", fmt_opts)

    return (
        <>
            <div>
                <div className='brand'>SaikoCTF</div>
                <div className='date'><span>{date_fmt.format(start)} - {date_fmt.format(end)}</span></div>
            </div>
            <hr/>
        </>
    )
}