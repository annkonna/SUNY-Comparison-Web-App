function getPlotParams(jss) {
    var d = JSON.parse(jss);
    var pp = {
        data: [], 
        layout: {}
        };
     
    var data = [{
    x: [],
    y: [],
    name: "Buffalo"
    }, {
    x: [],
    y: [],
    name: "Stony Brook"
    }, {
    x: [],
    y: [],
    name: "Binghamton"
    }, {
    x: [],
    y: [],
    name: "Albany"
    }];

    var layout = {
    "title": "Graduation Rate Progression at SUNY University Centers over the last twelve years",
    xaxis: {
    "title": "Year"
    },
    yaxis:{
    "title": "Graduation Rate"
    }
    }

	var iBuf=0, iSto=0, iBin=0, iAlb=0;
	for (var i = 0; i < d.length; i++) {
	    if (d[i][0] =="Buffalo Univ") {
	        data[0].x[iBuf] = d[i][1];
	        data[0].y[iBuf] = d[i][2];
	        iBuf++;
	    }
	    if (d[i][0] =="Stony Brook") {
	        data[1].x[iSto] = d[i][1];
	        data[1].y[iSto] = d[i][2];
	        iSto++;
	    }
	    if (d[i][0] =="Binghamton") {
	        data[2].x[iBin] = d[i][1];
	        data[2].y[iBin] = d[i][2];
	        iBin++;
	    }
	    if (d[i][0] =="Albany") {
	        data[3].x[iAlb] = d[i][1];
	        data[3].y[iAlb] = d[i][2];
	        iAlb++;
	    }
	}    

    pp.data = data;
    pp.layout = layout;
    
    return pp; 
}


function loadPlot() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var plotParams = getPlotParams(this.response);
            Plotly.plot('plot', plotParams.data, plotParams.layout);
//            Plotly.plot('plot', data, layout);
        }
    };
    xhttp.open("GET", "/suny_plot");
    xhttp.send();    
}
