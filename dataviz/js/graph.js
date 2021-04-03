function drawGraph(selectedStation) {
    // set the dimensions and margins of the graph
   
    var margin = {top: 20, right: 40, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
	d3.select("#my_dataviz").append("p").style("color","black").style("text-align","center").text("Evolution température et pluviométrie :  " + selectedStation.charAt(0).toUpperCase() + selectedStation.slice(1).toLowerCase() )	
 
    let svg = d3.select("#my_dataviz")

    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

    //Read the data
    data = [];
    for (let i = 1; i < meteo.length; i++) {
        for (let station of meteo[i - 1].station) {
            if (station.n === selectedStation) {
                for (let hour of station.hours) {
                    data.push({
                        date: d3.timeParse("%d-%I")(i + "-" + hour.h),
                        day: i,
                        hour: hour.h,
                        value: hour.t / 100,
                        pluie : hour.p
                        
                    })
                }
            }
        }
    }
    let max = d3.max(data, function (d) {
            return d.value;
        })
        let min = d3.min(data, function (d) {
            return d.value;
        })
        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y0 = d3.scaleLinear().range([height, 0]);
        var y1 = d3.scaleLinear().range([height, 0]);

        // define the 1st line
        var valueline = d3.line()
            .x((d) => x(d.date))
            .y((d) => y0(d.value));

        // define the 2nd line
        var valueline2 = d3.line()
            .x((d) => x(d.date))
            .y((d) => y1(d.pluie));

        x.domain(d3.extent(data, d => d.date));
        y0.domain([min, max]);
        y1.domain([0, d3.max(data, d => Math.max(d.pluie))]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", valueline);

        // Add the valueline2 path.
        svg.append("path")
            .data([data])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", valueline2);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "axisWhite")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("jour %d, %Ih")));


        // Add the Y0 Axis
        svg.append("g")
        
        .call(d3.axisLeft(y0));

        // Add the Y1 Axis
        svg.append("g")
            .attr("class", "axisRed")
            .attr("transform", "translate( " + width + ", 0 )")
            .call(d3.axisRight(y1));

}