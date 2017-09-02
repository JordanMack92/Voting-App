'use strict';

(function () {

   var apiUrl = appUrl + '/navigation';
   
var addOptionBtn = document.querySelector("#addOption");
var numOptions = 2;
var removeOption = null;

function addOption(){
    removeOptions();
    numOptions += 1;
    var newOption = '<div class="form-group" id = "option'+numOptions+'"> <label>Option #'+numOptions+'</label> <input type="text" class="form-control" name="option"  > </div>';
    $('#option'+(numOptions-1)+'').after(newOption);
    console.log(newOption);
}

function removeOptions(){
    if (removeOption == null){
        $('#addOption').after('<button type="button" id = "removeOption" class = "btn btn-warning btn-lg"> Remove Option </button>');
        removeOption = document.querySelector("#removeOption");
        removeOption.addEventListener('click', function(){
           $('#option'+numOptions).remove(); 
           numOptions -= 1;
           if (numOptions < 3){
               $('#removeOption').remove();
               removeOption = null;
           }
        });
    }
    
}

addOptionBtn.addEventListener('click', function(){
   addOption(); 
});


   



})();

