'use strict';


(function () {

    var id = window.location.href.split("/")[4];
    var submitButton = document.querySelector('#submitButton');
    var apiUrl = appUrl + '/chart/'+id;
     var poll;

    submitButton.addEventListener('click', function(){
       var options = document.getElementsByName('options');
       for (var i = 0; i < options.length; i++){
           if (options[i].checked){
               var xhr = new XMLHttpRequest();
               var endpoint = appUrl + '/polls/submit/'+id;
               xhr.open('POST', endpoint, true);
               xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
               xhr.onreadystatechange = function(){
                   if (xhr.readyState === 4){
                       window.location.replace(appUrl+'/polls/'+id);
                   }
               };
               xhr.send(JSON.stringify({
                   poll: poll,
                   selected: options[i].value
               }));
           }
       }
    });

   
   
   
   function getPoll(data) {
       poll = JSON.parse(data);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl , getPoll));

   
    


})();
