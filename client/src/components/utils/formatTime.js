const formatTime = (timeString) => {
    timeString = timeString.padStart(4, '0');
    
    //converting hours and minutes to numbers.
    let hours = parseInt(timeString.slice(0, 2));
    const minutes = timeString.slice(-2);
    
    // setting Period to AM OR PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Converts hrs to 12 hr format.
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
    
    return `${hours}:${minutes} ${period}`;
};
export default formatTime
