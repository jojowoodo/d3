function drawChart() {

    //importera data från extern csv fil
    d3.cs
    //d3.v5 erbjuder .then metoden och promises
    /*d3.csv("lineData.csv").then(function(data) {
        console.log(data);
    });*/
    
    d3.csv("lineData.csv").then(function(data) {
        console.log(data);

        //ladda in datan
        var temps = [], months = [];
        for(i=0; i<data.length; i++) {
            months.push(data[i].Month);
            temps.push(data[i].Temp);
        }
        
        console.log(temps);
        console.log(months);
    });
};