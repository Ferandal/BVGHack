const baureiheG = [198,450];
const baureiheIK = [160,500];
const baureiheD = [206,450];
const baureiheH = [208,450];


function calcLoad(stands, seats, baureihe){
  return (stands + seats)/((baureihe[0] + baureihe[1])/100);
}

function calcStands(passengerNumber, seatsTaken){
  return passengerNumber - seatsTaken;
}
