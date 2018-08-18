const Train = require('./Train.js');

class Line{
  constructor(stations, name) {
    this.stations = stations;
    this.name = name;
    this.trains = [];
  }

  addTrain(){
    this.trains.push(new Train(this.stations[0], 'H'));
  }

  updateTrain(json){
    let train = this.trains.find(x => x.id === json.id);
    if(!train){
      train = new Train(this.stations[json.station], json.direction, json.id);
      this.trains.push(train)
    }
    for(let i = 0; i < train.wagons.length; i ++){
      train.wagons[i].seatsTaken = json.wagonsSeats[i];
    }
  }
}

module.exports = Line;
