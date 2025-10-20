import { useState, useEffect} from "react";



function Countdown() {

    const [date, setDate] = useState(new Date());
    const [nextHour, setNextHour] = useState(() => {
        const d = new Date();
        return(new Date(d.setHours(d.getHours() + 1, 0, 0, 0)))
    })

    useEffect(() => {
        const interval =setInterval(() => {
            const newDate = new Date();
            const next = new Date(newDate);
            const newNextHour = new Date(next.setHours(next.getHours() + 1, 0, 0, 0));
            
            setDate(newDate);
            setNextHour(newNextHour);

        },1000 );
        return (() => clearInterval(interval));


    }, []);
    
    const diffMin = Math.floor((nextHour - date) / 1000 / 60);
    const diffSec = Math.floor(((nextHour - date) / 1000) % 60);

    return (
        <p>Tid {date.toLocaleTimeString()}, Tid til neste refresh {`${diffMin}:${ diffSec}`} NesteTime {nextHour.toLocaleTimeString()} </p>

    );
}

export default Countdown;