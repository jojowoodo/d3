function drawChart() {

    //en array för våra x & y kordinater för cassiopeia
    
    ///Fetch data from JSON
    d3.json("lineData.json").get( function(error,data) {
        console.log(data);
        //en array med våra x och y kordinater för cassiopeia
        var dataArray = data;

    var width = 500, height = 300;

        //Skapa arrays för att lagra x och y värden
    var xs = [];
    var ys = [];
        //gå genom ataarrayn och hämta x samt y
    for (i=0; i<dataArray.length; i++) {
        xs.push(dataArray[i].x);
        ys.push(dataArray[i].y);
    }
    console.log(xs);
    //skapa vårt ritunderlag 
    var canvas = d3.select('body').append('svg').attr("width", width).attr("height", height);

    //d.3line() är en generator som genererar en sträng för d="M x y..."
    var path = d3.line()
        .x( function(data) {return data.x * 16} )
        .y( function(data) {return data.y * 16} )
        .curve(d3.curveCardinal);

    //rita en linje (obs path inte svg line)
    canvas.append("path")
    .attr('fill', 'none')
    .attr('stroke','blue')
    .attr('d',path(dataArray));
});
}