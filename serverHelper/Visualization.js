

let svg = d3.select("body").append("svg")
    .attr("width", 1000)
    .attr("height", 500)

svg.append("text")
    .attr("x", 42)
    .attr("y", 42)
    .text("Hi!")