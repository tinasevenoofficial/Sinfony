export const DateWithoutTime = (currentDate, hour = 0) => {
  const date = new Date(currentDate.getTime())
  date.setHours(0, hour, 0, 0)
  return date
}
