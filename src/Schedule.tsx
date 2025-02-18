
interface ScheduleProps {
    dates?: string
}


export function Schedule({dates}: ScheduleProps) {
    if (dates === undefined || dates === null || dates === '') {
        return null
    }

    return (
        <>
            <div>
                <div className='brand'>SaikoCTF</div>
                <div className='date'><span>{dates}</span></div>
            </div>
            <hr/>
        </>
    )
}