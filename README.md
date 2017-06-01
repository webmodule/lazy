# lazy
Be lazy and and wait for it get finshed. lazy.js is a reincarnation of popular javascript concept-functions 
with more advanced features.


## lazy.promise([Fucntion|Promise])
```javascript
  var myTestInstance = {
    myTestPromisFun : lazy.promise(function(a,b){
        //use a and b to calculate return value
        return a+b;
    }),
     myTestPromisFunWithAjax : lazy.promise(function(url,data){
        //use a and b to calculate c
        return jQuery.get(url,data);
    }),
    myTestPromisFunWithAjaxFixed : lazy.promise(jQuery.get("/server/api/details",{uid : 7 });)
   };
   
   //Calling these functions
   myTestInstance.myTestPromisFun(2,5).done(function(resp){
      // resp is 7
   });
   myTestInstance.myTestPromisFunWithAjax("/server/api/details",{uid : 3 }).done(function(resp){
      // resp is details of 3 sent from server
   });
   myTestInstance.myTestPromisFunWithAjaxFixed().done(function(resp){
      // resp is always details of uid:7 sent from server
   });
  
   
```
