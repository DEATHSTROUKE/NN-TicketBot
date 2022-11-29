function dateToDBFormat(date) {
    try {
        let parts = date.split('.');
        return new Date(parts[2], parts[1] - 1, parts[0], 3, 0);
    } catch (e) {
        return 'bad date'
    }
}

module.exports = {
    dateToDBFormat
}
