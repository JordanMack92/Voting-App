'use strict';

(function () {

   var apiUrl = appUrl + '/navigation';
   
   
   function updateNavBar (data) {
      $('#navspot').before(data);

   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl , updateNavBar));



})();

