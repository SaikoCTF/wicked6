
interface ScheduleProps {
    date_start: string
    date_end: string
}


export function Schedule({date_start, date_end}: ScheduleProps) {
 

    const start = new Date(date_start)
    const end = new Date(date_end)

    const date_fmt_opt: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric"
        }

    const time_fmt_opt: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "UTC",
        timeZoneName: "short"
    }
    const date_fmt = new Intl.DateTimeFormat("en-US", date_fmt_opt)
    const time_fmt = new Intl.DateTimeFormat("en-US", time_fmt_opt)

    return (
        <>
            <div>
                <div className='brand'>SaikoCTF</div>
                <div className='date'><span>{date_fmt.format(start)} {time_fmt.format(start)} - {date_fmt.format(end)} {time_fmt.format(end)}</span></div>
            </div>
            <hr/>
        </>
    )
}