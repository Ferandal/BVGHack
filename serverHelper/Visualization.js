const uSixStations = ['U Alt-Tegel', 'U Borsigwerke', 'U Holzhauser Str.', 'U Otisstr.', 
                      'U Scharnweberstr.', 'U Kurt-Schumacher-Platz', 'U Afrikanische Str.',
                      'U Rehberge', 'U Seestr.', 'U Leopoldplatz', 'S+U Wedding',
                      'U Reinickendorfer Str.', 'U Schwartzkopffstr.', 'U Naturkundemuseum',
                      'U Oranienburger Tor', 'S+U Friedrichstr.', 'U Franzoesische Str.',
                      'U Stadtmitte', 'U Kochstr./Checkpoint Charlie', 'U Hallesches Tor',
                      'U Mehringdamm', 'U Platz der Luftbruecke', 'U Paradestr.', 'S+U Tempelhof',
                      'U Alt-Tempelhof', 'U Kaiserin-Augusta-Str.', 'U Ullsteinstr.',
                      'U Westphalweg', 'U Alt-Mariendorf'];

const colors = [[0, 'red'], [1, 'yellow'], [2, 'green'], [3, 'yellow'], [4, 'red'], [5, 'red']]

//fetch("http://localhost:8080/trainOne.json")

let svg = d3.select("#canvas").append("svg")
    .attr("width", screen.width)
    .attr("height", 500)
    .style("margin", 0)

svg.append("line")
    .attr("x1", 30).attr("y1", 10)
    .attr("x2", 29 * (screen.width - 50) /(uSixStations.length)).attr("y2", 10)
    .attr("stroke-width", 2)
    .attr("stroke", "black")

svg.selectAll("boxes")
    .data(uSixStations)
    .enter().append("text")
    .text(d => d)
    .attr("y", 85)
    .attr("x", d => uSixStations.indexOf(d) * (screen.width - 50) /uSixStations.length + 35)
    .attr("writing-mode", "tb-rl")

svg.selectAll("circles")
    .data(uSixStations)
    .enter().append("circle")
    .attr("cy", 10)
    .attr("cx", d => uSixStations.indexOf(d) * (screen.width - 50) /uSixStations.length + 35)
    .attr("r", 10)
    .attr("fill", "black")

updateColors(0);
    
d3.select('#slider').call(d3.slider().axis(true).min(0).max(28).step(1).on("slide", (evt, value) => {
    svg.selectAll("rect").remove();
    updateColors(value);    
}));
d3.select('#slider').style("margin-bottom", "30px");

function updateColors(value){
    fetch("http://localhost:8080/trainOne.json")
    .then(response => {
        let seats = response.json().then(seats => {;
            getColors(seats[value], value, 25);
        });
    });
    fetch("http://localhost:8080/trainTwo.json")
    .then(response => {
        let seats = response.json().then(seats => {;
            getColors(seats[value], value, 40);
        });
    });
    fetch("http://localhost:8080/trainThree.json")
    .then(response => {
        let seats = response.json().then(seats => {;
            getColors(seats[value], value, 55);
        });
    });
    fetch("http://localhost:8080/trainFour.json")
    .then(response => {
        let seats = response.json().then(seats => {;
            getColors(seats[value], value, 70);
        });
    });
}

function getColors(stop, value, y) {
    for (let index = 0; index < stop.wagonsSeats.length; index++) {
        let element = stop.wagonsSeats[index];
        if (element < 18){
            colors[index] = [index, 'green'];
        }
        else if (element < 33){
            colors[index] = [index, 'orange'];
        }
        else{
            colors[index] = [index, 'red'];
        }
    }
    updateWagons(stop.station, y);
}
let trainlength  = 30 - ((screen.width - 50) /(uSixStations.length * 4));
function updateWagons(index, y) {
    svg.selectAll("wagons")
    .data(colors)
    .enter().append("rect")
    .attr("height", 7).attr("width", (screen.width - 50) /(uSixStations.length * 12))
    .attr("x", c => index * (screen.width - 50) /(uSixStations.length)+ trainlength + c[0] * ((screen.width - 50) /(uSixStations.length * 12) + 3))
    .attr("y", y)
    .attr("fill", c => c[1])
    .attr("stroke", c => c[1])
    .attr("stroke-width", 2)
}

function press() {
    svg.selectAll("rect").remove();
    for (let index = 0; index <= 28; index++) {
        fetch("http://localhost:8080/trainOne.json")
        .then(response => {
            let seats = response.json().then(seats => {;
                getColors(seats[index], index, 25);
            });
        });        
    }    
}