# lazy
Promise-ify your functions, debounced functions, throttled functions using lazy.js. Currently you can promisify the following: 
- [Simple functions](#lazypromisefucntionpromise)
- [Debounced functions](#lazydebouncefucntion)
- [Throttled functions](#lazythrottlefucntion)

It also includes additional features like:
- [lazy.once()](#lazyoncefucntion) : to make a function executable only once

## lazy.promise([Fucntion|Promise])
Convert any function into Promise.
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


## lazy.debounce([Fucntion])
Makes function debouncable (executes only when function is not called for particluar gap) but with promise functinlaity.
```javascript
  var myTestInstance = {
    //Window scroll is best example for debounce lets use it
    onWindowScroll : lazy.debounce(function(){
        //User is done scrolling and has not touched for scroll for 2000 milliseconds now
        console.log("Perform something based on scroll");
        return $(widnow).height();
    },2000),
   };
   
   //Calling these functions
    $(window).scroll(function(){
      myTestInstance.onWindowScroll();
    });
   
   myTestInstance.onWindowScroll().done(function(resp){
      //window scroll  was adjusted and returnes `resp`
      //I can do few stuff with resp now;
   });
   
   myTestInstance.onWindowScroll().done(function(resp){
      //window scroll  was adjusted and returnes `resp`
      //I can do few more stuff with resp now;
   });
   
```

## lazy.throttle([Fucntion])
Makes function throttle (executes only after particluar gap) but with promise functinlaity.
```javascript
  //Lets use same window on scroll in this example too
  var myTestInstance = {
    onWindowScroll : lazy.throttle(function(){
        //User has been scrolling for long time so i gets executed every 2000 milliseconds
        console.log("Perform something based on scroll");
        return $(widnow).height();
    },2000),
   };
   
   //Calling these functions
    $(window).scroll(function(){
      myTestInstance.onWindowScroll();
    });
   
   myTestInstance.onWindowScroll().done(function(resp){
      //window scroll  was adjusted and returnes `resp`
      //I can do few stuff with resp now;
   });
   
   myTestInstance.onWindowScroll().done(function(resp){
      //window scroll  was adjusted and returnes `resp`
      //I can do few more stuff with resp now;
   });
   
```

## lazy.once([Fucntion])
Makes function executable only once (first time it was called) and saves the output to return next time onward per instance.
```javascript
  var myTestInstance = {
    myTestOnceFun : lazy.once(function(a,b){
        //use a and b to calculate return value
        return a+b;
    }),
     myTestOnceFunWithAjax : lazy.once(function(url,data){
        //use a and b to calculate c
        return jQuery.get(url,data);
    }),
   };
   
   //Calling these functions
   myTestInstance.myTestOnceFun(2,5); // == 7 every time.
   myTestInstance.myTestOnceFunWithAjax().done(function(resp){
      // resp is always details of uid:7 sent from server
   });
```
#Installation
```
bower install webmodules-lazy

```

