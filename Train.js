const Wagon = require('./Wagon.js');

class Train {
  constructor(currentStation, currentDirection, id=this.generateGUID()) {
    this.wagons = [];
    this.currentStation = currentStation;
    this.currentDirection = currentDirection;
    //this.id = this.generateGUID();
    this.id = id;
    generateWagons();
  }

  generateGUID(){
    let guid = "", i, random;
    for (let i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
  
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        guid += "-"
      }
      guid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return guid;
  }

  generateWagons(){
    for(let i = 0; i < 6; i++){
      this.wagons.push(new Wagon(0,0));
    }
  }
}

module.exports = Train;
