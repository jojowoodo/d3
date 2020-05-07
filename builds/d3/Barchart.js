//Rite grafen när fönstret ändrar storlek
window.onresize = reDraw;
//rita grafen en gång onload
window.onload = reDraw;

function reDraw() {
var dataTable = [30, 50, 70, 30, 40];//Höjden på rektanglar i barcharten

//TODO: justera höjd och bredd av grafen enligt fönsterstorlek
//Ex: 80% av fönsterbredden
//Utmaning: Responsivt
var height = window.innerHeight / 2; 
var width = window.innerWidth * 0.8;
var barwidth = 50,
barMargin = 20;

//töm grafen
d3.select('svg').remove('staplar');

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataTable)])
    .range([0,height]);

var xScale = d3.scaleBand()
    .domain(dataTable)
    .range([0,width]).padding(0.2);

//skapa ett ritunderlag
var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background","lightgrey");


//här börjar tidsresan
canvas.selectAll("staplar").data(dataTable) //Fyll virtuella staplar med data från databales array
    //Skapar virtuella element med __data__ = dataTable[0] för första elementet osv.
    //Gå in i varje virtuella stapel
    .enter() //first (i=0 idata.length; i++)
    .append("rect")
    .attr("width", function(data) {return xScale.bandwidth(); })
    //bredden av rektangeln = värdet från datatabellen
    .attr("height", function (data) {return yScale(data) + barMargin;})

    //första rektabgekb x = 100*0, x2 == 100*1 ...
    .attr("x", function (data, i) {return xScale(data);})

    //Vi måste definera y startpunkten enligt höjden av stapeln
    .attr("y",function(data){return height - yScale(data) + barMargin;});

}