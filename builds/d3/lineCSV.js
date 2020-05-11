function drawChart() {

    //importera data från extern csv fil
    d3.cs
    //d3.v5 erbjuder .then metoden och promises
    /*d3.csv("lineData.csv").then(function(data) {
        console.log(data);
    });*/
    
    d3.csv("lineData.csv").then(function(data) {

        //ladda in datan
        var temps = [], months = [], dataFix=[];
        for(i=0; i<data.length; i++) {
            months.push(data[i].Month);
            temps.push( parseFloat(data[i].Temp))
            dataFix.push({ month:months[i], temp:temps[i]} );
        }
        
        console.log(dataFix);
        console.log(temps);
        console.log(months);

        //skapa ritunderlag
        var width = 600, height = 300;
        var canvas = d3.select('body').append('svg').attr('width',width).attr('height',height);

        var xScale = d3.scaleBand()
            .domain(months)
            .range([0,width]);

        //Temperaturen -20 kan inte användas som Y axel, -20 är ju utanför canvas!
        //Vi behöver en skala, för temperatur passar en lineär skala

        yScale = d3.scaleLinear()
        .domain([d3.min(temps), d3.max(temps)]) //Vilka värden ska konverteras till pixelvärden
        .range([height, 0]);  //Skala över vilken pixelstorlek

        //generera d strängen för path
        var dString = d3.line()
        .x(function(d){ return d.month})
        .y(function(d){ return yScale(d.temp)});
        //console.log(dString(data));
        
        var dotsGroup = canvas.append('g');

        //rita linjen
        canvas.append('path')
        .attr('fill','none')
        .attr('stroke','blue')
        .attr('d', dString(dataFix));


        canvas.selectAll('dots').data(dataFix)
    .enter()
    .append('circle')
    .attr('cx', function(d) {return xScale(d.month) })
    .attr('cy',function(d)  {return  yScale(d.temp)} )
    .attr('r','2')
    });
}