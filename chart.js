function getChartParams(jss) {
    var values = [
          ['Enrollment', '4 yr Graduation Rate', '6 yr Graduation Rate', 'Undergrad Enrollment', 'Grad Enrollment'],
          [],
          [],
          [],
          []]
    
    var data = [{
      type: 'table',
      header: {
        values: [["PROFILES"], ["Albany"],
    				 ["Binghamton"], ["Buffalo"], ["Stony Brook"]],
        align: ["left", "center"],
        line: {width: 1, color: '#506784'},
        fill: {color: '#119DFF'},
        font: {family: "Arial", size: 12, color: "white"}
      },
      cells: {
        values: values,
        align: ["left", "center"],
        line: {color: "#506784", width: 1},
    	 fill: {color: ['#25FEFD', 'white']},
        font: {family: "Arial", size: 11, color: ["#506784"]}
      }
    }]
        
    var d = JSON.parse(jss);
    
    for (var i = 0; i < d.length; i++) {
        if (d[i][0] =="Albany") {
            values[1][0] = d[i][1];
            values[1][1] = d[i][2];
            values[1][2] = d[i][3];
            values[1][3] = d[i][4];
            values[1][4] = d[i][5];
        }
        if (d[i][0] =="Binghamton") {
            values[2][0] = d[i][1];
            values[2][1] = d[i][2];
            values[2][2] = d[i][3];
            values[2][3] = d[i][4];
            values[2][4] = d[i][5];
        }
        if (d[i][0] =="Buffalo Univ") {
            values[3][0] = d[i][1];
            values[3][1] = d[i][2];
            values[3][2] = d[i][3];
            values[3][3] = d[i][4];
            values[3][4] = d[i][5];
        }
        if (d[i][0] =="Stony Brook") {
            values[4][0] = d[i][1];
            values[4][1] = d[i][2];
            values[4][2] = d[i][3];
            values[4][3] = d[i][4];
            values[4][4] = d[i][5];
        }
    }    
        
    return data; 
}

function loadChart() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var data = getChartParams(this.response);
            Plotly.plot('chart', data);
        }
    };
    xhttp.open("GET", "/suny_chart");
    xhttp.send();    
}
