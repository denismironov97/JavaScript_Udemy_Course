const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const redMark = '🔴';
const flightsDataArr = flights.split('+');
for (let i = 0; i < flightsDataArr.length; i++) {
  const strInfo = flightsDataArr[i];

  let [status, planeFromInfo, planeToInfo, time] = strInfo.split(';');
  planeFromInfo = planeFromInfo.slice(0, 3);
  planeToInfo = planeToInfo.slice(0, 3);
  time = time.replace(':', 'h');
  status = status.startsWith('_Arrival')
    ? status.substring(1)
    : status.replaceAll('_', ' ').trimStart();
  status = status.includes('Delayed') ? redMark.concat(' ', status) : status;

  const strMessage =
    `${status} from ${planeFromInfo.toUpperCase()} to ${planeToInfo.toUpperCase()} (${time})`.padStart(
      45,
      ' '
    );

  console.log(strMessage);
}
