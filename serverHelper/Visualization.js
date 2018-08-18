const uSixStations = ['U Alt-Tegel', 'U Borsigwerke', 'U Holzhauser Str.', 'U Otisstr.', 
                      'U Scharnweberstr.', 'U Kurt-Schumacher-Platz', 'U Afrikanische Str.',
                      'U Rehberge', 'U Seestr.', 'U Leopoldplatz', 'S+U Wedding',
                      'U Reinickendorfer Str.', 'U Schwartzkopffstr.', 'U Naturkundemuseum',
                      'U Oranienburger Tor', 'S+U Friedrichstr.', 'U Franzoesische Str.',
                      'U Stadtmitte', 'U Kochstr./Checkpoint Charlie', 'U Hallesches Tor',
                      'U Mehringdamm', 'U Platz der Luftbruecke', 'U Paradestr.', 'S+U Tempelhof',
                      'U Alt-Tempelhof', 'U Kaiserin-Augusta-Str.', 'U Ullsteinstr.',
                      'U Westphalweg', 'U Alt-Mariendorf'];

let svg = d3.select("body").append("svg")
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