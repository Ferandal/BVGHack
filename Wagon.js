class Wagon {
  constructor (seatsTaken, standsTaken) {
    this.seatsTaken = seatsTaken;
    this.standsTaken = standsTaken;
    this.load = 0;
  }
  calcLoad(stands, seats, baureihe){
    return (stands + seats)/((baureihe[0] + baureihe[1])/100);
  }

  calcStands(passengerNumber, seatsTaken){
    return passengerNumber - seatsTaken;
  }
}

module.exports = Wagon;
