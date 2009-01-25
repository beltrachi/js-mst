/**
* Implement a m-ary tree with hashes
* In each node we have all paths to all letters in spite of navigating left or right
* Compared to BST, its the same nodes as for each letter on each position we'll have a
* a node.
* It can be faster as now we don't need to navigate through the neighbours to find
* the down. Now the down will be direct in node[ch], and as it's a core method, it can be faster.
*
* For usage samples see the tests
*
* TODO:
*   - Make MST.hash and contains() implementation not class methods but 
*     instance data and methods to allow more than one MST usage at a time
*/

//Prototype required

var MST = {
  hash: {},
  
  useContains: false,
  
  create: function( _ch ){
    var node = { ch: _ch };
    if( MST.useContains ){
      var h = MST.hash;
      if(!h[_ch])
        h[_ch] = [node];
      else
        h[_ch].push(node);
    }
    return node;
  },
  add: function( node, key, value ){
    //log(" Add key:"+key + " and value " +value);
    //directs to next char
    var next_ch = key[0];
    if(!next_ch || next_ch == "" ){
      //log("Set value at ch:"+node.ch + " value "+value);
      node.value = value;
    }else{
      if(!node[next_ch]){
        //log("create node for "+next_ch);
        node[next_ch] = MST.create( next_ch );
      }
      MST.add( node[next_ch], key.slice(1), value );
    }
  },
  get: function( node, key ){
    //log("get "+node.ch+" key "+key);
    //var next = key.split(1);
    var next_ch = key[0];
    if(!next_ch || next_ch == ""){
      //log("return nodevalue");
      return node.value;
    }else{
      //log("find node "+next_ch);
      if(node[next_ch]){
        return MST.get( node[next_ch], key.slice(1));        
      }
    }
    return null;
  },
  startsWith: function( node, key, _limit, _arr){
    var limit = _limit || null;
    var arr = _arr || [];
    var next_ch = key[0];
    //log("startswith "+node+" key:"+key + " limit:"+limit+" arr:"+arr+" nextch:"+next_ch);
    if(!next_ch || next_ch == ""){
      //log("sw calls all with node char"+node.ch);
      return MST.all( node, limit, arr);
    }else{
      if(node[next_ch]){
        return MST.startsWith( node[next_ch], key.slice(1), limit, arr);
      }
    }
    return [];
  },
  all: function( node, _limit, _arr){
    var limit =_limit || null;
    var arr = _arr || [];
    //log("all of "+node+" limit:"+limit+" arr:"+arr);
    if( limit != null && arr.size() == limit){
      return arr;
    }
    if(node.value)
      arr.push(node.value);
    $H(node).each(function(a){
        //log(a);
        //log(a[0].length);
        if(a[0].length == 1){
          //log(""+a+" is length 1");
          MST.all( a[1], limit, arr);
        }
    });
    return arr;
  },
  contains: function( node, text, _limit){
    if (!MST.useContains) throw ("contains method not in use");
    var limit = _limit || null;
    var ch = text[0];
    var arr = [];
    if(MST.hash[ch]){
      MST.hash[ch].each(function( n ){
          //log("node "+n.ch+" and text:"+text);
          MST.startsWith( n, text.slice(1), limit, arr);
      });
      return arr;
    }else{
      return [];
    }
  },
  clear: function( node ){
    MST.hash = {};
    //No way to reset node;
    node = MST.create( "" );
  },
  //FIXME: its not finished as values are managed as strings
  toJSON: function( node ){
    var p = [];
    $H(node).each(function(d){
      if(d[0].length==1){
        //It's a node
        p.push(d[0]+":"+MST.toJSON( d[1] ));
      }else{
        p.push(d[0]+":'"+d[1]+"'");
      }
    });
    return "{"+p.join(",")+"}";
  }
}

