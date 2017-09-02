  'use strict';

(function () {
    
    google.charts.load('current', {'packages':['corechart']});

    var id = window.location.href.split("/")[4];
   var apiUrl = appUrl + '/chart/'+id;
   var poll;
   
   
   function createChart(data) {
       poll = JSON.parse(data);
       for (var i = 0; i < poll.options.length; i++){
        if (poll.options[i].votes > 0){
             google.charts.setOnLoadCallback(drawChart);
        }    
       }
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl , createChart));


      function drawChart() {

        var dataArray = [];
        dataArray.push(["Option","Votes"]);
        
         for (var i = 0; i < poll.options.length; i++){ 
            dataArray.push([ poll.options[i].option ,  poll.options[i].votes ]);
         } 

        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
          title: 'Poll Results'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

})();

  
  
  
     
