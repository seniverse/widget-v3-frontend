export const getCodeByTime = (
  code: {
    now: string
    day: string
    night: string
  },
  sun: {
    rise: string
    set: string
  }
): string => {
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()

  const [riseHour, riseMinute] = sun.rise.split(':').map(t => parseInt(t))
  const [setHour, setMinute] = sun.set.split(':').map(t => parseInt(t))

  if (
    (hour > riseHour || (hour === riseHour && minute >= riseMinute)) &&
    (hour < setHour || (hour === setHour && minute <= setMinute))
  ) {
    return code.now
  }

  if (hour * 60 + minute - (setHour * 60 + setMinute) < 15) {
    return code.night
  }

  if (
    riseHour * 60 + riseMinute - (hour * 60 + minute) < 15 &&
    riseHour * 60 + riseMinute > hour * 60 + minute
  ) {
    return code.night
  }

  return code.now
}

export const getSunTime = (sun: {
  rise: string
  set: string
}): {
  rise: string
  set: string
} => {
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()

  const [riseHour, riseMinute] = sun.rise.split(':').map(t => parseInt(t))
  const [setHour, setMinute] = sun.set.split(':').map(t => parseInt(t))

  if (
    (hour > riseHour || (hour === riseHour && minute >= riseMinute)) &&
    (hour < setHour || (hour === setHour && minute <= setMinute))
  ) {
    return sun
  }

  return {
    rise: sun.set,
    set: sun.rise
  }
}
