import "react";
import { CalendarOptions, ICalendar, YahooCalendar, GoogleCalendar, OutlookCalendar } from "datebook";
import * as FileSaver from 'file-saver';

interface DiscordProps {
    href?: string,
    label?: string,
    prereg_date_start: string,
    prereg_date_end: string,
    className?: string
}

export function Discord ({prereg_date_start, prereg_date_end, href, label, className = ''}: DiscordProps) {
    if (label === undefined || label === null || label === '') {
        label = href
    }

    let end_time = new Date(prereg_date_end) 
    end_time.setSeconds(end_time.getSeconds() - 1)

    const calendar_config: CalendarOptions = {
        title: `SaikoCTF Registration`,
        location: `${location.href}`,
        description: `Registration for SaikoCTF Online Capture the Flag (CTF) opens.\nGo to ${location.href} to register!`,
        start: new Date(prereg_date_start),
        end: end_time
    }

    const handleICal = () => {
        const ical = new ICalendar(calendar_config);

        const ics = ical.render()
        const blob = new Blob([ics], {type: 'text/calendar'})
        FileSaver.saveAs(blob, 'saikoctf-registration-event.ics')
    }
    
    const cal_urls = [];

    const gcal = new GoogleCalendar(calendar_config);
    cal_urls.push([gcal.render(), 'Google Calendar'])

    const ycal = new YahooCalendar(calendar_config);
    cal_urls.push([ycal.render(), "Yahoo! Calendar"])

    const owa = new OutlookCalendar(calendar_config);
    cal_urls.push([owa.render(), "Outlook Calendar"])

    
    const prereg_date = new Date(prereg_date_start)
    const date_opts : Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    const date_fmt = new Intl.DateTimeFormat("en-US", date_opts)
    

    return (
        <>
        <div className={className}>
            { 
                (href === undefined || href === null || href === '') ? (
                    <>
                        <div className="emphasis">To register, please come back on {date_fmt.format(prereg_date)} for the registration link.</div>
                        <div className="row reminders">
                            <div className="col">Reminders:
                                <a href="#" onClick={handleICal}>iCal</a>
                            {
                                cal_urls.map((link_info, idx) => {
                                    return (
                                        <a key={`cal${idx}`} href={link_info[0]} target="_blank">{link_info[1]}</a>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </>
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