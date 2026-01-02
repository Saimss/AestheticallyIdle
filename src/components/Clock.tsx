import type { ClockFormat} from "../types";


interface ClockProps {
    time: Date;
    format: ClockFormat;
    showSeconds: boolean;
    
}

export default function Clock({ time, format, showSeconds,}: ClockProps) {
    function formatTime() {
    const hours = format === '12hr' ? time.getHours() % 12 || 12 : time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    

    if (format === '12hr') {
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const timeString = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            const secondsString = showSeconds ? `:${seconds.toString().padStart(2, '0')}` : '';
            return{time : timeString + secondsString, period}
    }else{
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const secondsString = showSeconds ? `:${seconds.toString().padStart(2, '0')}` : '';
        return{time : timeString + secondsString, period: ''}

    }
}
    const {time : displayTime, period} = formatTime();

    const formatDate = () => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return time.toLocaleDateString('en-US', options);
    }

    return (
        <div className ="text-center select-none">
            <div className="flex items-center justify-center gap-4 ">
                <h1 className={"text-8xl md:text-9xl font-light tracking-tight"}>
                    {displayTime}
                </h1>

                {period &&(
                    <span className="text-3xl md:text-4xl font-light opacity-70 mt-8">{period}</span>
                )}
            </div>
            <p className= "text-xl md:text-2xl font-light opacity-60 mt-6 tracking-wide">{formatDate()}</p>
        </div>
                
            ) 
}