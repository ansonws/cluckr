module.exports = timestamp => {
    const timeSince = new Date() - timestamp;
    if (timeSince > 2.628e+9) {
        return `${Math.floor(timeSince / 2.628e+9)} month(s) ago`;
    } else if (timeSince > 8.64e+7) {
        return `${Math.floor(timeSince / 8.64e+7)} day(s) ago`;
    } else if (timeSince > 3.6e+6) {
        return `${Math.floor(timeSince / 3.6e+6)} hour(s) ago`;
    } else if (timeSince > 60000) {
        return `${Math.floor(timeSince / 60000)} minute(s) ago`;
    } else {
        return "Just now";
    }
}