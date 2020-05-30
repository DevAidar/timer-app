/**
 * Helper function to correct formating on time [HHMMSS]
 * @param { string } time 
 */
const getTime = (time) => {
    let seconds = parseInt(time.substr(4, 2));      // adding seconds
    seconds += parseInt(time.substr(2, 2)) * 60;    // adding minutes
    seconds += parseInt(time.substr(0, 2)) * 3600;  // adding hours
    seconds = Math.min(seconds, 60 * 60 * 60 - 1)   // max time is [59:59:59] or 1 second short of 60 hours

    // hours
    time = '00'.concat(parseInt(seconds / 3600 % 60)).slice(-2);

    // minutes
    time += '00'.concat(parseInt(seconds / 60 % 60)).slice(-2);

    // seconds 
    time += '00'.concat(parseInt(seconds % 60)).slice(-2);

    return time;
}

/**
 * Helper function to convert seconds into correct formated string [HHMMSS]
 * @param { number } time 
 */
const getTimeFromNum = (time) => {
    // hours
    let result = '00'.concat(parseInt(time / 3600 % 60)).slice(-2);

    // minutes
    result += '00'.concat(parseInt(time / 60 % 60)).slice(-2);

    // seconds 
    result += '00'.concat(parseInt(time % 60)).slice(-2);

    return result;
}

export { getTime, getTimeFromNum };