function drawChart() {

    //en array för våra x & y kordinater för cassiopeia
    var dataArray = [ {x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10} ]
    ;

    var width = 500;
    var height = 300;

    //skapa vårt ritunderlag 
    var canvas = d3.select('body')
    .append('svg')
    .attr("width", width)
    .attr("height", height);

    //d.3line() är en generator som genererar en sträng för d="M x y..."
    var path = d3.line()
        .x( function(data,i) {return data.x * 16} )
        .y( function(data,i) {return data.y * 16} )
        .curve(d3.curveCardinal);

    //rita en linje (obs path inte svg line)
    canvas.append("path")
    .attr('fill', 'none')
    .attr('stroke','blue')
    .attr('d',path(dataArray));
  }