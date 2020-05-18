function drawHistogram() {
    //Läs in extern JSON data (d3.w5)
    d3.json("basketPlayers.json").then( function(jsonData) {

        //Definera variabler
        var width = 600, height = 300, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
        var barWidth = 40, barPadding = 5;

        //ladda in datan
        var heights = [], names = [];
        for(i=0; i <jsonData.basketplayers.length; i++) {
            heights.push(jsonData.basketplayers[i].size);
            names.push( jsonData.basketplayers[i].name );
            
        }
        console.log(names);
        console.log(heights);

        //TODO:Skapa klasser(engelska:bins) enligt längder (170-179, 180-189)
        var klasser = ["170-179","180-189","190-199","200-209","210-219","220-229","230-239"];
        //TODO: Ändra Y axeln till Frekvenser ""Hur många är 170-179"?
        var frekvenser = [];
        var klassStorlek = 10; //binsize 160-169
        var klass = 170; //Variabel håller koll på vilken klass vi är i (börjar med minsta)
        var antalKlasser = klasser.length;

        //räkna antalet spelare i varje längdklass
        for (i=0; i<antalKlasser; i++){
            var frekvens = 0; //iterand som räknar hur många som hör till en klass
            // gå igenom heights och kolla om längden hör till klassen
            for(j=0; j<heights.length;j++){
                 //kolla om längden hör till nuvarande klassen
                 if (heights[j] >= klass &&  heights[j] < klass+klassStorlek ){
                     console.log("trigg")
                     frekvens++;
                 }
            }
            klass += klassStorlek;
            frekvenser.push(frekvens);
        }
        console.log(klasser);
        console.log(frekvenser);

        //Skapa X och Y skalor (det var ju på tur att ca 200px passade i grafen)
        var xScale = d3.scaleBand().domain(klasser).range([0, chartWidth]);
        var yScale = d3.scaleLinear().domain([0,d3.max(frekvenser)]).range([chartHeight,0]);

        //Skapa Y och X-axel
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        //Skapa ritunderlag
        var canvas = d3.select("body").append("svg").attr("width", width).attr("height", height);

        //Skapa en grupp som inte täcker hela ritunderlaget (använd margins!)
        var chartGroup = canvas.append("g").attr("transform","translate("+margin+ ",0)");

        //Rita staplar 
        chartGroup.selectAll("staplar").data(frekvenser).enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(data,i) { return chartHeight - yScale(data)})
        //.attr("x", function (data,i) {return i* (chartWidth / antalKlasser) + barPadding + barWidth/2})
        .attr("x", function(d, i){return i * (chartWidth / antalKlasser)+(barWidth/2-barPadding/2)})

        .attr("y", function (data,i) {return  yScale(data) });

        //rita axlar
        chartGroup.append("g").call(yAxis);
        chartGroup.append("g").call(xAxis).attr("transform","translate(0,"+chartHeight+")");

     });
     
};