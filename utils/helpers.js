const formatDate = function(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.toLocaleTimeString()}`;
}

module.exports = { formatDate };