/**
 * Created by lalittanwar on 26/02/16.
 */
(function(foo){

  var isPromise = function(obj){
    if(obj!==undefined && is.Function(obj.done) && is.Function(obj.then) && is.Function(obj.fail)){
      return true;
    } else return false;
  };

  foo.lazy = function(callback){

  };

  foo.lazy.promise = function(callback){
    return function(){
      var myDeffered = $.Deferred(),context = this;
      var resp = callback.apply(context,arguments);
      if(isPromise(resp)){
        resp.done(function(resp2){
          myDeffered.resolve(resp2);
        });
      } else {
        myDeffered.resolve(resp);
      }
      return myDeffered.promise();
    };
  };

  foo.lazy.debounce = function(func, wait, immediate,fname){
    var context,myDeffered = $.Deferred();
    var defResp = foo.debounce(function(){
      var resp = func.apply(context, arguments);
      if(isPromise(resp)){
        resp.done(function(resp2){
          myDeffered.resolve(resp2);
        });
      } else {
        myDeffered.resolve(resp);
      }
    }, wait, immediate,fname);

    return function(){
      context = this;
      if(myDeffered.state() !== "pending"){
        myDeffered = $.Deferred();
      }
      defResp.apply(context,arguments);
      return myDeffered.promise();
    };
  };

  var throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  foo.lazy.throttle = function(func, wait, options){
    var context,myDeffered = $.Deferred();
    var defResp = throttle(function(){
      var resp = func.apply(context, arguments);
      if(isPromise(resp)){
        resp.done(function(resp2){
          myDeffered.resolve(resp2);
        });
      } else {
        myDeffered.resolve(resp);
      }
    }, func, wait, options);

    return function(){
      context = this;
      if(myDeffered.state() !== "pending"){
        myDeffered = $.Deferred();
      }
      defResp.apply(context,arguments);
      return myDeffered.promise();
    };
  };

})(this);