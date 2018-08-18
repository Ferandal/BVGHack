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
    .attr("margin", 0)

svg.append("line")
    .attr("x1", 10).attr("y1", 10)
    .attr("x2", screen.width - 30).attr("y2", 10)
    .attr("stroke-width", 2)
    .attr("stroke", "black")

svg.selectAll("boxes")
    .data(uSixStations)
    .enter().append("text")
    .text(d => d)
    .attr("y", 42)
    .attr("x", d => uSixStations.indexOf(d) * screen.width /uSixStations.length + 15)
    .attr("writing-mode", "tb-rl")

svg.selectAll("circles")
    .data(uSixStations)
    .enter().append("circle")
    .attr("cy", 10)
    .attr("cx", d => uSixStations.indexOf(d) * screen.width /uSixStations.length + 15)
    .attr("r", 10)
    .attr("fill", "black")

svg.selectAll("wagons")
    .data(colors)
    .enter().append("rect")
    .attr("height", 7).attr("width", 10)
    .attr("x", c => 50 + c[0] * 10)
    .attr("y", 25)
    .attr("fill", c => c[1])
    .attr("stroke", c => c[1])
    .attr("stroke-width", 2)
    
d3.select('#slider').call(d3.slider().axis(true).min(0).max(28).step(1))
d3.select('#slider').style("margin-bottom", "30px")

fetch("http://localhost:8080/trainOne.json")
.then(response => console.log(response))