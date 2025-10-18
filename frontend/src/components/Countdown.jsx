import { useState, useEffect} from "react";



function Countdown() {

    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    let diffMin = Math.floor((nextHour - now) /1000 /60) ;
    let diffSec = Math.floor(((nextHour - now) /1000) %60);

    

    
    
    
    
    
    
    return (
        <p>Countdown</p>
    );
}

export default Countdown;