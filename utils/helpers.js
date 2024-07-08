module.exports = {
  format_date: (date) => {
    const jsDate = new Date(date);

    // Extract hours, minutes, and AM/PM designation
    let hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the time with leading zero for minutes
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    // Format the full date string
    return `${jsDate.toDateString()} ${formattedTime}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  format_url: (url) => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
};
