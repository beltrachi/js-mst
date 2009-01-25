
var log = function( txt ){
  $("log").insert( { bottom:"<li>" + txt +"</li>" } );
}


var assert_equals = function( gets, expects ){
  if( gets != expects){
    if(gets && expects && expects.toString() == gets.toString() ){
      //so OK
    }else{
      log("FAILED: Expected "+expects+" but found "+gets);
      return;
    }
  }
  log("Passed ("+gets+" equals "+expects+")");
};

var profiler = function( func, msg ){
  var startsat = new Date();
  func.call();
  log("Performance of "+msg+": "+ (new Date().getTime() - startsat.getTime())+ " ms");
}

