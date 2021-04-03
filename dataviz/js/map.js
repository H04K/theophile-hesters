function draw() {
	g.selectAll('text').remove(); 
	g.selectAll(".pin")
		.data(meteo[day].station)
		.enter().append("circle", ".pin")
		.attr("r", 5)
		.attr("transform", function (d) {
			return "translate(" + projection([
				d.lng,
				d.lat
			]) + ")";
		})
		.attr("fill", "grey")

	g.selectAll(".pin")
		.data(meteo[day].station)
		.enter().append("text")
		.attr('class', "temperature")
		.attr("style", function (d) {
			return "fill: black;font-size : 20px;font-variant: normal;  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
		})
		

		.attr("transform", function (d) {
			return "translate(" + projection([
				d.lng,
				d.lat + 0.20
			]) + ")";
		})
		.text(function (d) {
			for(let hours of d.hours){
				if(hours.h == hour){
					return Math.round(hours.t/100)
				}
			}
		})
		
}
