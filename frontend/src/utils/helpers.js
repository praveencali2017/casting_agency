/**
 * Convert standard date string to YYYY-MM-dd or YYYY/MM/dd 
 * @param {date string} dateString 
 */
const dateFormatter = function(dateString, sep='-'){
    // Let's remove the timezone concept since we don't require timezone in this particular requirement
    dateString = dateString.replace("GMT", "");
    let date = new Date(dateString);
    const monthFormat = (date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1); 
    return `${date.getFullYear()}${sep}${monthFormat}${sep}${date.getDate()}`;
}
export {dateFormatter};