export function timeFormat(unixTimestamp, timezoneOffset) {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000); 
    // Convert Unix timestamp to milliseconds and adjust for timezone
    const hours = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    const minutes = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    return `${hours}:${minutes}`;
}