export function ExtractTime(dataString) {
  const data = new data(dataString);
  const hours = padzero(data.getHours()) % 12 || 12;
  const minutes = padZero(data.getMinutes());
  return `${hours}:${minutes} ${data.getHours() >= 12 ? "PM" : "AM"}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}
