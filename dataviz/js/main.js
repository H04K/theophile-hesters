const projection = d3.geo.mercator()
	.center([2.454071, 46.279229])
	.scale([1800]);
const path = d3.geo.path().projection(projection);
const widthMap = 1000,
	heigthMap = 500;
let day = 1
let hour = 0
d3.json('data/dep.json', function (error, geoJson) {
	svg = d3.select("#contentMap")
		.append("div")
		.attr("id", "content")
		.append("svg")
		.attr("viewBox", "0 0 " + widthMap + " " + heigthMap)
		.append("g")
		.attr('class', "map")

	g = svg.attr("widthMap", widthMap)
		.attr("heigthMap", heigthMap)
		.attr("viewBox", "0 0 " + widthMap + " " + heigthMap)
		.attr("preserveAspectRatio", "xMinYMin")
		.append('g')
		.attr("class", "map");

	g.selectAll('path')
		.data(geoJson.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('class', 'country')
		.on("mouseover", function(d) {
			Tooltip.style("display", "inline")
			.text(d.properties.nom);
			console.log(d)
		})
		.on("mousemove", function(){
			Tooltip.style("left", (d3.event.pageX - 10) + "px")
			.style("top", (d3.event.pageY) + "px")

		})
		.on("mouseout", function(d) {
			Tooltip.style("display", "none");
		}); 

		

	d3.json('data/meteo.json', (stations) => {
		meteo = stations;
		createSelect();
		selectVille()
		draw();
		initTooltip()
		
	})

	

});
function initTooltip() {
    Tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
		.style("display", "none")
		.style("opacity", .9)
		
}
function updateChart(Ville) {
	let villeChoisie = ""
	if (Ville) {
		villeChoisie = Ville.target.value
		d3.selectAll("#my_dataviz svg").remove()
		d3.selectAll("#my_dataviz p").remove()
		drawGraph(villeChoisie)
	}
}
function selectVille(){
	let selectVille = document.getElementById('selectville')
		for (let ville of meteo[0].station) {
			let option = document.createElement("option")
			option.setAttribute('value', ville.n)
			option.text = ville.n
			selectVille.appendChild(option)
		}
		selectVille.addEventListener('change', updateChart)
		selectVille.addEventListener('load', updateChart())
}
function createSelect() {

	let selectBoxDays = document.createElement("select");
	let selectBoxHours = document.createElement("select")
	selectBoxHours.classList.add("select")
	selectBoxDays.classList.add("select")
	selectBoxDays.addEventListener("change", (element) => {
		day = element.target.value;
		draw();
	})
	selectBoxHours.addEventListener("change", (element) => {
		hour = element.target.value;
		draw();
	})
	let temp = document.getElementsByClassName('choix')[0].appendChild(document.createElement("a"));
	temp = temp.appendChild(document.createElement("div"))
	let label = temp.appendChild(document.createElement("label"))
	label.textContent = "Choisir le jour"
	temp.appendChild(selectBoxDays)

	for (let i = 0; i < meteo.length; i++) {
		let option = document.createElement("option");
		option.setAttribute("value", i);
		option.text = (i + 1).toString();
		selectBoxDays.appendChild(option);
	}

	temp = document.getElementsByClassName('choix')[0].appendChild(document.createElement("a"));
	temp = temp.appendChild(document.createElement("div"))
	label = temp.appendChild(document.createElement("label"))
	temp.classList.add("select")
	label.textContent = "Choisir l'heure"
	temp.appendChild(selectBoxHours)
	let option = document.createElement("option");
	option.text = "Heure";
	selectBoxHours.appendChild(option);
	for (let i = 0; i <= 21; i += 3) {
		option = document.createElement("option");
		option.setAttribute("value", i);
		option.text = i.toString();
		selectBoxHours.appendChild(option);
	}

}