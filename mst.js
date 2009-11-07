/**
* Implement a m-ary tree with hashes
*
* In each node we have all paths to all letters in spite of navigating left 
* or right. Compared to BST, its the same nodes as for each letter on each  
* position we'll have a node.
* It can be faster as now we don't need to navigate through the neighbours 
* to find the down. Now the down will be direct in node[ch], and as it's a
* JS core method, it should be faster.
*
* Comments:
*   - keys and searches are case-sensitive
*       To "be" non-case-sensitive, convert all strings to lowercase before
*       inserting and fetching.
*   - Speed comments:
*       The speed of adding and fetching, based on 
*         n:"number of entries"
*         m:"average key length"
*       Costs seem to be: 
*         add: O(m)
*         get: O(m)
*       Its recomended to use the limit parameter in the
*       functions that return collections, as startsWith, contains or all.
* For usage samples see the tests.
*
*/

/**
 * @constructor
 */
function MST(){
    this.initialize.apply(this, arguments);
}

var definitions = {
  initialize: function(_params){
    var params = _params || {};
    this.useContains = params["useContains"] || this.useContains == true;
    this.hash = {};
    this.root = this.create("");
  },
  
  hash: {},
  
  useContains: false,
  
  create: function( _ch ){
    var node = { ch: _ch };
    if( this.useContains ){
      var h = this.hash;
      if(!h[_ch])
        h[_ch] = [node];
      else
        h[_ch].push(node);
    }
    return node;
  },
  
  add: function( key, value ){
    this._add( this.root, key, value );
  },
  
  _add: function( node, key, value ){
    //directs to next char
    var next_ch = key.charAt(0);
    if(!next_ch || next_ch == "" ){
      node.value = value;
    }else{
      if(!node[next_ch]){
        node[next_ch] = this.create( next_ch );
      }
      this._add( node[next_ch], key.slice(1), value );
    }
  },
  
  get: function( key ){
    return this._get( this.root, key );
  },
  
  _get: function( node, key ){
    var next_ch = key.charAt(0);
    if(!next_ch || next_ch == ""){
      return node.value;
    }else{
      if(node[next_ch]){
        return this._get( node[next_ch], key.slice(1));        
      }
    }
    return null;
  },
  
  startsWith: function( key, _limit, _arr){
    return this._startsWith( this.root, key, _limit, _arr);
  },
  
  _startsWith: function( node, key, _limit, _arr){
    var limit = _limit || null;
    var arr = _arr || [];
    var next_ch = key.charAt(0);
    if(!next_ch || next_ch == ""){
      return this._all( node, limit, arr);
    }else{
      if(node[next_ch]){
        return this._startsWith( node[next_ch], key.slice(1), limit, arr);
      }
    }
    return [];
  },
  
  all: function( _limit, _arr){
    return this._all( this.root, _limit, _arr);
  },
  
  _all: function( node, _limit, _arr){
    var limit =_limit || null;
    var arr = _arr || [];
    if( limit != null && arr.size() == limit){
      return arr;
    }
    if(node.value)
      arr.push(node.value);
    for(var k in node){
        if(k.length==1) this._all( node[k], limit, arr);
    }
    return arr;
  },
  
  contains: function( text, _limit){
    if (!this.useContains) throw ("contains method not in use");
    var limit = _limit || null;
    var ch = text.charAt(0);
    var arr = [];
    if(this.hash[ch]){
        var len = this.hash[ch].length;
        for( var i=0; i < len; i++ ){
            this._startsWith( this.hash[ch][i], text.slice(1), limit, arr ); 
        }
        return arr;
    }else{
      return [];
    }
  },
  
  clear: function(){
    this.hash = {};
    this.root = this.create("");
  }
};
for( var key in definitions ){
  MST.prototype[key] = definitions[key];
}

//Exposing methods
window["MST"] = MST;
MST.prototype['get'] = MST.prototype.get;
MST.prototype['add'] = MST.prototype.add;
MST.prototype['all'] = MST.prototype.all;
MST.prototype['startsWith'] = MST.prototype.startsWith;
MST.prototype['contains'] = MST.prototype.contains;
MST.prototype['clear'] = MST.prototype.clear;

