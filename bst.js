//Class methods
var BST = {
  
  //Store the references to letters for contains method
  hash: {},
  
  useContains: false,
  
  create: function( _ch ){
    var node = { ch: _ch };
    if( BST.useContains ){
      var h = BST.hash;
      if(!h[_ch]) 
        h[_ch] = [node];
      else
        h[_ch].push(node);
    }
    return node;
  },

  add: function( node, key, value ){
    var ch = key[0];
    if( node.ch < ch ){
      //right
      if( !node.right )
        node.right = BST.create( ch );
      BST.add( node.right, key, value );
    }else if( node.ch > ch){
      //left
      if( !node.left )
        node.left = BST.create( ch );
      BST.add( node.left, key, value );
    }else{
      var next = key.slice(1);
      //it is
      if(next == ""){
        //End of search!
        node.value = value;
      }else{
        if( !node.down ){
          node.down = BST.create( next[0] );
        }
        BST.add( node.down, next, value );
      }
    }
  },
  get: function( node, key ){
    var ch = key[0];
    if( node.ch < ch ){
      if( node.right ){
        return BST.get( node.right, key);
      }//else undefined
    }else if( node.ch > ch){
      if( node.left ){
        return BST.get( node.left, key);
      }
    }else{
      var next = key.slice(1);
      if(next == ""){
        return node.value;
      }else{
        if(node.down){
          return BST.get( node.down, next );
        }
      }
    }
    return null;//not found
  },
  startsWith: function( node, key, _limit, _arr ){
    var limit = _limit || null;
    var ch = key[0];
    var arr = _arr || [];
    //log("start node("+ch+") "+ key +" lim "+ limit + " arr "+ arr.inspect());
    if( node.ch < ch ){
      //log("right");
      if(node.right)
        return BST.startsWith( node.right, key, limit, arr);
    }else if(node.ch > ch){
      //log("left");
      if(node.left)
        return BST.startsWith( node.left, key, limit, arr);
    }else{
      //log("eq");
      var next = key.slice(1);
      if(next == ""){
        if(node.down){
          if(node.value){
            arr.push(node.value);
            BST.all( node.down, limit, arr );
            return arr;
          }else
            return BST.all( node.down, limit, arr );
        }else if(node.value){
          arr.push(node.value);
        }
      }else{
        if(node.down)
          return BST.startsWith( node.down, next, limit, arr);
      }
    }
    return arr;
  },
  
  all: function( node, _limit, _arr ){
    var limit = _limit || null;
    var arr = _arr || [] ; 
    //log( "All: Limit "+ limit + " arr "+ arr.inspect()); 
    if( limit != null && arr.size() == limit ){
      return arr;
    }
    if(node.left){
      BST.all( node.left, limit, arr );
    }
    if( node.value ){
      arr.push( node.value );
    }
    if( node.down ){
      BST.all( node.down, limit, arr );
    }
    if( node.right ){
      BST.all( node.right, limit, arr );
    }
    return arr;
  },
  contains:function( node, text, _limit ){
    if (!BST.useContains) throw ("contains method not in use");
    var limit = _limit || null;
    var ch = text[0];
    var arr = [];
    if(BST.hash[ch]){
      BST.hash[ch].each(function( n ){
          //log("node");
          BST.startsWith( n, text, limit, arr);
      });
      return arr;
    }else{
      return [];
    }
  },

  clear: function( node ){
    BST.hash = {};
    node.left = null;
    node.right = null;
    node.down = null;
    node.value = null;
  }
}

var BSTNodeOld = Class.create({
  initialize: function( ch ) {
    if( ch.length != 1) alert("Bad init data for BSTNode char "+ch);
    this.ch = ch;
    if(!BSTNode.hash) BSTNode.hash = [];
    if(!BSTNode.hash[ch]) BSTNode.hash[ch] = [];
    BSTNode.hash[ch].push(this);
  },
  
  add: function( key, value ){
    var ch = key[0];
    if( this.ch < ch ){
      //right
      if( !this.right )
        this.right = new BSTNode( ch );
      this.right.add( key, value );
    }else if( this.ch > ch){
      //left
      if( !this.left )
        this.left = new BSTNode( ch );
      this.left.add( key, value );
    }else{
      var next = key.slice(1);
      //it is
      if(next == ""){
        //End of search!
        this.value = value;
      }else{
        if( !this.down ){
          this.down = new BSTNode( next[0] );
        }
        this.down.add( next, value );
      }
    }
  },
  
  get: function( key ){
    var ch = key[0];
    if( this.ch < ch ){
      if( this.right ){
        return this.right.get(key);
      }//else undefined
    }else if( this.ch > ch){
      if( this.left ){
        return this.left.get(key);
      }
    }else{
      var next = key.slice(1);
      if(next == ""){
        return this.value;
      }else{
        if(this.down){
          return this.down.get( next );
        }
      }
    }
    return null;//not found
  },
  startsWith: function( key, _limit, _arr ){
    var limit = _limit || null;
    var ch = key[0];
    var arr = _arr || [];
    //log("start node("+ch+") "+ key +" lim "+ limit + " arr "+ arr.inspect());
    if( this.ch < ch ){
      //log("right");
      if(this.right)
        return this.right.startsWith( key, limit, arr);
    }else if(this.ch > ch){
      //log("left");
      if(this.left)
        return this.left.startsWith( key, limit, arr);
    }else{
      //log("eq");
      var next = key.slice(1);
      if(next == ""){
        if(this.down){
          if(this.value){
            arr.push(this.value);
            this.down.all( limit, arr );
            return arr;
          }else
            return this.down.all( limit, arr );
        }else if(this.value){
          arr.push(this.value);
        }
      }else{
        if(this.down)
          return this.down.startsWith(next, limit, arr);
      }
    }
    return arr;
  },
  
  all: function( _limit, _arr ){
    var limit = _limit || null;
    var arr = _arr || [] ; 
    //log( "All: Limit "+ limit + " arr "+ arr.inspect()); 
    if( limit != null && arr.size() == limit ){
      return arr;
    }
    if(this.left){
      this.left.all( limit, arr );
    }
    if( this.value ){
      arr.push( this.value );
    }
    if( this.down ){
      this.down.all( limit, arr );
    }
    if( this.right ){
      this.right.all( limit, arr );
    }
    return arr;
  },
  
  contains:function( text, _limit ){
    var limit = _limit || null;
    var ch = text[0];
    var arr = [];
    if(BSTNode.hash[ch]){
      BSTNode.hash[ch].each(function( n ){
          //log("node");
          n.startsWith(text, limit, arr);
      });
      return arr;
    }else{
      return [];
    }
  },
});

var BSTClear = function( obj ){
  obj.left = null;
  obj.right = null;
  obj.value = null;
  obj.down = null;
  BSTNode.hash = [];
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
  log("Performance of "+msg+": "+ (new Date().getTime() - startsat.getTime()));
}

var runBSTTest = function(){

  document.title = "Test 1";
  var test = BST.create();
  BST.add( test, "abc" , 123 );
  assert_equals( BST.get( test, "abc"), 123 );
  assert_equals( BST.get( test, "abc "), null );
  
  if (true) {
    BST.clear(test);
    BST.useContains = true;
    var littlelist = ["aaron","ab","abba","abbe","abbey"];
    
    $A(littlelist).each(function( e ){
        BST.add(test, e, e);
    });
    
    assert_equals( BST.startsWith( test,"aa"), ["aaron"]);
    assert_equals( BST.startsWith( test,"ab"), ["ab","abba","abbe","abbey"]);
    assert_equals( BST.startsWith( test,"abb"), ["abba","abbe","abbey"]);
    assert_equals( BST.startsWith( test,"ab", 2 ), ["ab","abba"]);
    assert_equals( BST.contains( test, "bb" ) , ["abba","abbe","abbey"]);
    BST.add( test, "abbba","abbba");
    //assert_equals( BST.contains(test, "bb") , ["abba","abbba","abbe","abbey","abbba"]);
    //Big size test
    BST.clear(test);
    BST.useContains = true;
    var list = ["aaron","ab","abba","abbe","abbey","abbie","abbot","abbott","abby","abdel","abdul","abe","abel","abelard","abeu","abey","abie","abner","abraham","abrahan","abram","abramo","abran","ad","adair","adam","adamo","adams","adan","addie","addison","addy","ade","adelbert","adham","adlai","adler","ado","adolf","adolph","adolphe","adolpho","adolphus","adrian","adriano","adrien","agosto","aguie","aguistin","aguste","agustin","aharon","ahmad","ahmed","ailbert","akim","aksel","al","alain","alair","alan","aland","alano","alanson","alard","alaric","alasdair","alastair","alasteir","alaster","alberik","albert","alberto","albie","albrecht","alden","aldin","aldis","aldo","aldon","aldous","aldric","aldrich","aldridge","aldus","aldwin","alec","alejandro","alejoa","aleksandr","alessandro","alex","alexander","alexandr","alexandre","alexandro","alexandros","alexei","alexio","alexis","alf","alfie","alfons","alfonse","alfonso","alford","alfred","alfredo","alfy","algernon","ali","alic","alick","alisander","alistair","alister","alix","allan","allard","allayne","allen","alley","alleyn","allie","allin","allister","allistir","allyn","aloin","alon","alonso","alonzo","aloysius","alphard","alphonse","alphonso","alric","aluin","aluino","alva","alvan","alvie","alvin","alvis","alvy","alwin","alwyn","alyosha","amble","ambros","ambrose","ambrosi","ambrosio","ambrosius","amby","amerigo","amery","amory","amos","anatol","anatole","anatollo","ancell","anders","anderson","andie","andonis","andras","andre","andrea","andreas","andrej","andres","andrew","andrey","andris","andros","andrus","andy","ange","angel","angeli","angelico","angelo","angie","angus","ansel","ansell","anselm","anson","anthony","antin","antoine","anton","antone","antoni","antonin","antonino","antonio","antonius","antons","antony","any","ara","araldo","arch","archaimbaud","archambault","archer","archibald","archibaldo","archibold","archie","archy","arel","ari","arie","ariel","arin","ario","aristotle","arlan","arlen","arley","arlin","arman","armand","armando","armin","armstrong","arnaldo","arne","arney","arni","arnie","arnold","arnoldo","arnuad","arny","aron","arri","arron","art","artair","arte","artemas","artemis","artemus","arther","arthur","artie","artur","arturo","artus","arty","arv","arvie","arvin","arvy","asa","ase","ash","ashbey","ashby","asher","ashley","ashlin","ashton","aube","auberon","aubert","aubrey","augie","august","augustin","augustine","augusto","augustus","augy","aurthur","austen","austin","ave","averell","averil","averill","avery","avictor","avigdor","avram","avrom","ax","axe","axel","aylmar","aylmer","aymer","bail","bailey","bailie","baillie","baily","baird","bald","balduin","baldwin","bale","ban","bancroft","bank","banky","bar","barbabas","barclay","bard","barde","barn","barnabas","barnabe","barnaby","barnard","barnebas","barnett","barney","barnie","barny","baron","barr","barret","barrett","barri","barrie","barris","barron","barry","bart","bartel","barth","barthel","bartholemy","bartholomeo","bartholomeus","bartholomew","bartie","bartlet","bartlett","bartolemo","bartolomeo","barton","bartram","barty","bary","baryram","base","basil","basile","basilio","basilius","bastian","bastien","bat","batholomew","baudoin","bax","baxie","baxter","baxy","bay","bayard","beale","bealle","bear","bearnard","beau","beaufort","beauregard","beck","beltran","ben","bendick","bendicty","bendix","benedetto","benedick","benedict","benedicto","benedikt","bengt","beniamino","benito","benjamen","benjamin","benji","benjie","benjy","benn","bennett","bennie","benny","benoit","benson","bent","bentlee","bentley","benton","benyamin","ber","berk","berke","berkeley","berkie","berkley","berkly","berky","bern","bernard","bernardo","bernarr","berne","bernhard","bernie","berny","bert","berti","bertie","berton","bertram","bertrand","bertrando","berty","bev","bevan","bevin","bevon","bil","bill","billie","billy","bing","bink","binky","birch","birk","biron","bjorn","blaine","blair","blake","blane","blayne","bo","bob","bobbie","bobby","bogart","bogey","boigie","bond","bondie","bondon","bondy","bone","boniface","boone","boonie","boony","boot","boote","booth","boothe","bord","borden","bordie","bordy","borg","boris","bourke","bowie","boy","boyce","boycey","boycie","boyd","brad","bradan","brade","braden","bradford","bradley","bradly","bradney","brady","bram","bran","brand","branden","brander","brandon","brandtr","brandy","brandyn","brannon","brant","brantley","bren","brendan","brenden","brendin","brendis","brendon","brennan","brennen","brent","bret","brett","brew","brewer","brewster","brian","briano","briant","brice","brien","brig","brigg","briggs","brigham","brion","brit","britt","brnaba","brnaby","brock","brockie","brocky","brod","broddie","broddy","broderic","broderick","brodie","brody","brok","bron","bronnie","bronny","bronson","brook","brooke","brooks","brose","bruce","brucie","bruis","bruno","bryan","bryant","bryanty","bryce","bryn","bryon","buck","buckie","bucky","bud","budd","buddie","buddy","buiron","burch","burg","burgess","burk","burke","burl","burlie","burnaby","burnard","burr","burt","burtie","burton","burty","butch","byram","byran","byrann","byrle","byrom","byron","cad","caddric","caesar","cal","caldwell","cale","caleb","calhoun","callean","calv","calvin","cam","cameron","camey","cammy","car","carce","care","carey","carl","carleton","carlie","carlin","carling","carlo","carlos","carly","carlyle","carmine","carney","carny","carolus","carr","carrol","carroll","carson","cart","carter","carver","cary","caryl","casar","case","casey","cash","caspar","casper","cass","cassie","cassius","caz","cazzie","cchaddie","cece","cecil","cecilio","cecilius","ced","cedric","cello","cesar","cesare","cesaro","chad","chadd","chaddie","chaddy","chadwick","chaim","chalmers","chan","chance","chancey","chandler","chane","chariot","charles","charley","charlie","charlton","chas","chase","chaunce","chauncey","che","chen","ches","chester","cheston","chet","chev","chevalier","chevy","chic","chick","chickie","chicky","chico","chilton","chip","chris","chrisse","chrissie","chrissy","christian","christiano","christie","christoffer","christoforo","christoper","christoph","christophe","christopher","christophorus","christos","christy","chrisy","chrotoem","chucho","chuck","cirillo","cirilo","ciro","cirstoforo","claiborn","claiborne","clair","claire","clarance","clare","clarence","clark","clarke","claudell","claudian","claudianus","claudio","claudius","claus","clay","clayborn","clayborne","claybourne","clayson","clayton","cleavland","clem","clemens","clement","clemente","clementius","clemmie","clemmy","cleon","clerc","clerkclaude","cletis","cletus","cleve","cleveland","clevey","clevie","cliff","clifford","clim","clint","clive","cly","clyde","clyve","clywd","cob","cobb","cobbie","cobby","codi","codie","cody","cointon","colan","colas","colby","cole","coleman","colet","colin","collin","colman","colver","con","conan","conant","conn","conney","connie","connor","conny","conrad","conrade","conrado","conroy","consalve","constantin","constantine","constantino","conway","coop","cooper","corbet","corbett","corbie","corbin","corby","cord","cordell","cordie","cordy","corey","cori","cornall","cornelius","cornell","corney","cornie","corny","correy","corrie","cort","cortie","corty","cory","cos","cosimo","cosme","cosmo","costa","court","courtnay","courtney","cozmo","craggie","craggy","craig","crawford","creigh","creight","creighton","crichton","cris","cristian","cristiano","cristobal","crosby","cross","cull","cullan","cullen","culley","cullie","cullin","cully","culver","curcio","curr","curran","currey","currie","curry","curt","curtice","curtis","cy","cyril","cyrill","cyrille","cyrillus","cyrus","d'arcy","dael","dag","dagny","dal","dale","dalis","dall","dallas","dalli","dallis","dallon","dalston","dalt","dalton","dame","damian","damiano","damien","damon","dan","dana","dane","dani","danie","daniel","dannel","dannie","danny","dante","danya","dar","darb","darbee","darby","darcy","dare","daren","darill","darin","dario","darius","darn","darnall","darnell","daron","darrel","darrell","darren","darrick","darrin","darryl","darwin","daryl","daryle","dav","dave","daven","davey","david","davidde","davide","davidson","davie","davin","davis","davon","davy","de witt","dean","deane","decca","deck","del","delainey","delaney","delano","delbert","dell","delmar","delmer","delmor","delmore","demetre","demetri","demetris","demetrius","demott","den","dene","denis","dennet","denney","dennie","dennis","dennison","denny","denver","denys","der","derby","derek","derick","derk","dermot","derrek","derrick","derrik","derril","derron","derry","derward","derwin","des","desi","desmond","desmund","dev","devin","devland","devlen","devlin","devy","dew","dewain","dewey","dewie","dewitt","dex","dexter","diarmid","dick","dickie","dicky","diego","dieter","dietrich","dilan","dill","dillie","dillon","dilly","dimitri","dimitry","dino","dion","dionisio","dionysus","dirk","dmitri","dolf","dolph","dom","domenic","domenico","domingo","dominic","dominick","dominik","dominique","don","donal","donall","donalt","donaugh","donavon","donn","donnell","donnie","donny","donovan","dore","dorey","dorian","dorie","dory","doug","dougie","douglas","douglass","dougy","dov","doy","doyle","drake","drew","dru","drud","drugi","duane","dud","dudley","duff","duffie","duffy","dugald","duke","dukey","dukie","duky","dun","dunc","duncan","dunn","dunstan","dur","durand","durant","durante","durward","dwain","dwayne","dwight","dylan","eadmund","eal","eamon","earl","earle","earlie","early","earvin","eb","eben","ebeneser","ebenezer","eberhard","eberto","ed","edan","edd","eddie","eddy","edgar","edgard","edgardo","edik","edlin","edmon","edmund","edouard","edsel","eduard","eduardo","eduino","edvard","edward","edwin","efrem","efren","egan","egbert","egon","egor","el","elbert","elden","eldin","eldon","eldredge","eldridge","eli","elia","elias","elihu","elijah","eliot","elisha","ellary","ellerey","ellery","elliot","elliott","ellis","ellswerth","ellsworth","ellwood","elmer","elmo","elmore","elnar","elroy","elston","elsworth","elton","elvin","elvis","elvyn","elwin","elwood","elwyn","ely","em","emanuel","emanuele","emelen","emerson","emery","emile","emilio","emlen","emlyn","emmanuel","emmerich","emmery","emmet","emmett","emmit","emmott","emmy","emory","engelbert","englebert","ennis","enoch","enos","enrico","enrique","ephraim","ephrayim","ephrem","erasmus","erastus","erek","erhard","erhart","eric","erich","erick","erie","erik","erin","erl","ermanno","ermin","ernest","ernesto","ernestus","ernie","ernst","erny","errick","errol","erroll","erskine","erv","ervin","erwin","esdras","esme","esra","esteban","estevan","etan","ethan","ethe","ethelbert","ethelred","etienne","ettore","euell","eugen","eugene","eugenio","eugenius","eustace","ev","evan","evelin","evelyn","even","everard","evered","everett","evin","evyn","ewan","eward","ewart","ewell","ewen","ezechiel","ezekiel","ezequiel","eziechiele","ezra","ezri","fabe","faber","fabian","fabiano","fabien","fabio","fair","fairfax","fairleigh","fairlie","falito","falkner","far","farlay","farlee","farleigh","farley","farlie","farly","farr","farrel","farrell","farris","faulkner","fax","federico","fee","felic","felice","felicio","felike","feliks","felipe","felix","felizio","feodor","ferd","ferdie","ferdinand","ferdy","fergus","ferguson","fernando","ferrel","ferrell","ferris","fidel","fidelio","fidole","field","fielding","fields","filbert","filberte","filberto","filip","filippo","filmer","filmore","fin","findlay","findley","finlay","finley","finn","fitz","fitzgerald","flem","fleming","flemming","fletch","fletcher","flin","flinn","flint","florian","flory","floyd","flynn","fons","fonsie","fonz","fonzie","forbes","ford","forest","forester","forrest","forrester","forster","foss","foster","fowler","fran","francesco","franchot","francis","francisco","franciskus","francklin","francklyn","francois","frank","frankie","franklin","franklyn","franky","frannie","franny","frans","fransisco","frants","franz","franzen","frasco","fraser","frasier","frasquito","fraze","frazer","frazier","fred","freddie","freddy","fredek","frederic","frederich","frederick","frederico","frederigo","frederik","fredric","fredrick","free","freedman","freeland","freeman","freemon","fremont","friedrich","friedrick","fritz","fulton","gabbie","gabby","gabe","gabi","gabie","gabriel","gabriele","gabriello","gaby","gael","gaelan","gage","gail","gaile","gal","gale","galen","gallagher","gallard","galvan","galven","galvin","gamaliel","gan","gannie","gannon","ganny","gar","garald","gard","gardener","gardie","gardiner","gardner","gardy","gare","garek","gareth","garey","garfield","garik","garner","garold","garrard","garrek","garret","garreth","garrett","garrick","garrik","garrot","garrott","garry","garth","garv","garvey","garvin","garvy","garwin","garwood","gary","gaspar","gaspard","gasparo","gasper","gaston","gaultiero","gauthier","gav","gavan","gaven","gavin","gawain","gawen","gay","gayelord","gayle","gayler","gaylor","gaylord","gearalt","gearard","gene","geno","geoff","geoffrey","geoffry","georas","geordie","georg","george","georges","georgi","georgie","georgy","gerald","gerard","gerardo","gerek","gerhard","gerhardt","geri","gerick","gerik","germain","germaine","germayne","gerome","gerrard","gerri","gerrie","gerry","gery","gherardo","giacobo","giacomo","giacopo","gian","gianni","giavani","gib","gibb","gibbie","gibby","gideon","giff","giffard","giffer","giffie","gifford","giffy","gil","gilbert","gilberto","gilburt","giles","gill","gilles","ginger","gino","giordano","giorgi","giorgio","giovanni","giraldo","giraud","giselbert","giulio","giuseppe","giustino","giusto","glen","glenden","glendon","glenn","glyn","glynn","godard","godart","goddard","goddart","godfree","godfrey","godfry","godwin","gonzales","gonzalo","goober","goran","goraud","gordan","gorden","gordie","gordon","gordy","gothart","gottfried","grace","gradeigh","gradey","grady","graehme","graeme","graham","graig","gram","gran","grange","granger","grannie","granny","grant","grantham","granthem","grantley","granville","gray","greg","gregg","greggory","gregoire","gregoor","gregor","gregorio","gregorius","gregory","grenville","griff","griffie","griffin","griffith","griffy","gris","griswold","griz","grove","grover","gualterio","guglielmo","guido","guilbert","guillaume","guillermo","gun","gunar","gunner","guntar","gunter","gunther","gus","guss","gustaf","gustav","gustave","gustavo","gustavus","guthrey","guthrie","guthry","guy","had","hadlee","hadleigh","hadley","hadrian","hagan","hagen","hailey","haily","hakeem","hakim","hal","hale","haleigh","haley","hall","hallsy","halsey","halsy","ham","hamel","hamid","hamil","hamilton","hamish","hamlen","hamlin","hammad","hamnet","hanan","hank","hans","hansiain","hanson","harald","harbert","harcourt","hardy","harlan","harland","harlen","harley","harlin","harman","harmon","harold","haroun","harp","harper","harris","harrison","harry","hart","hartley","hartwell","harv","harvey","harwell","harwilll","hasheem","hashim","haskel","haskell","haslett","hastie","hastings","hasty","haven","hayden","haydon","hayes","hayward","haywood","hayyim","haze","hazel","hazlett","heall","heath","hebert","hector","heindrick","heinrick","heinrik","henderson","hendrick","hendrik","henri","henrik","henry","herb","herbert","herbie","herby","herc","hercule","hercules","herculie","heriberto","herman","hermann","hermie","hermon","hermy","hernando","herold","herrick","hersch","herschel","hersh","hershel","herve","hervey","hew","hewe","hewet","hewett","hewie","hewitt","heywood","hi","hieronymus","hilario","hilarius","hilary","hill","hillard","hillary","hillel","hillery","hilliard","hillie","hillier","hilly","hillyer","hilton","hinze","hiram","hirsch","hobard","hobart","hobey","hobie","hodge","hoebart","hogan","holden","hollis","holly","holmes","holt","homer","homere","homerus","horace","horacio","horatio","horatius","horst","hort","horten","horton","howard","howey","howie","hoyt","hube","hubert","huberto","hubey","hubie","huey","hugh","hughie","hugibert","hugo","hugues","humbert","humberto","humfrey","humfrid","humfried","humphrey","hunfredo","hunt","hunter","huntington","huntlee","huntley","hurlee","hurleigh","hurley","husain","husein","hussein","hy","hyatt","hyman","hymie","iago","iain","ian","ibrahim","ichabod","iggie","iggy","ignace","ignacio","ignacius","ignatius","ignaz","ignazio","igor","ike","ikey","ilaire","ilario","immanuel","ingamar","ingar","ingelbert","ingemar","inger","inglebert","inglis","ingmar","ingra","ingram","ingrim","inigo","inness","innis","iorgo","iorgos","iosep","ira","irv","irvin","irvine","irving","irwin","irwinn","isa","isaac","isaak","isac","isacco","isador","isadore","isaiah","isak","isiahi","isidor","isidore","isidoro","isidro","israel","issiah","itch","ivan","ivar","ive","iver","ives","ivor","izaak","izak","izzy","jabez","jack","jackie","jackson","jacky","jacob","jacobo","jacques","jae","jaime","jaimie","jake","jakie","jakob","jamaal","jamal","james","jameson","jamesy","jamey","jamie","jamil","jamill","jamison","jammal","jan","janek","janos","jarad","jard","jareb","jared","jarib","jarid","jarrad","jarred","jarret","jarrett","jarrid","jarrod","jarvis","jase","jasen","jason","jasper","jasun","javier","jay","jaye","jayme","jaymie","jayson","jdavie","jean","jecho","jed","jedd","jeddy","jedediah","jedidiah","jeff","jefferey","jefferson","jeffie","jeffrey","jeffry","jeffy","jehu","jeno ","jens","jephthah","jerad","jerald","jeramey","jeramie","jere","jereme","jeremiah","jeremias","jeremie","jeremy","jermain","jermaine","jermayne","jerome","jeromy","jerri","jerrie","jerrold","jerrome","jerry","jervis","jess","jesse","jessee","jessey","jessie","jesus","jeth","jethro","jim","jimmie","jimmy","jo","joachim","joaquin","job","jock","jocko","jodi","jodie","jody","joe","joel","joey","johan","johann","johannes","john","johnathan","johnathon","johnnie","johnny","johny","jon","jonah","jonas","jonathan","jonathon","jone","jordan","jordon","jorgan","jorge","jory","jose","joseito","joseph","josh","joshia","joshua","joshuah","josiah","josias","jourdain","jozef","juan","jud","judah","judas","judd","jude","judon","jule","jules","julian","julie","julio","julius","justen","justin","justinian","justino","justis","justus","kahaleel","kahlil","kain","kaine","kaiser","kale","kaleb","kalil","kalle","kalvin","kane","kareem","karel","karim","karl","karlan","karlens","karlik","karlis","karney","karoly","kaspar","kasper","kayne","kean","keane","kearney","keary","keefe","keefer","keelby","keen","keenan","keene","keir","keith","kelbee","kelby","kele","kellby","kellen","kelley","kelly","kelsey","kelvin","kelwin","ken","kendal","kendall","kendell","kendrick","kendricks","kenn","kennan","kennedy","kenneth","kennett","kennie","kennith","kenny","kenon","kent","kenton","kenyon","ker","kerby","kerk","kermie","kermit","kermy","kerr","kerry","kerwin","kerwinn","kev","kevan","keven","kevin","kevon","khalil","kiel","kienan","kile","kiley","kilian","killian","killie","killy","kim","kimball","kimbell","kimble","kin","kincaid","king","kingsley","kingsly","kingston","kinnie","kinny","kinsley","kip","kipp","kippar","kipper","kippie","kippy","kirby","kirk","kit","klaus","klemens","klement","kleon","kliment","knox","koenraad","konrad","konstantin","konstantine","korey","kort","kory","kris","krisha","krishna","krishnah","krispin","kristian","kristo","kristofer","kristoffer","kristofor","kristoforo","kristopher","kristos","kurt","kurtis","ky","kyle","kylie","laird","lalo","lamar","lambert","lammond","lamond","lamont","lance","lancelot","land","lane","laney","langsdon","langston","lanie","lannie","lanny","larry","lars","laughton","launce","lauren","laurence","laurens","laurent","laurie","lauritz","law","lawrence","lawry","lawton","lay","layton","lazar","lazare","lazaro","lazarus","lee","leeland","lefty","leicester","leif","leigh","leighton","lek","leland","lem","lemar","lemmie","lemmy","lemuel","lenard","lenci","lennard","lennie","leo","leon","leonard","leonardo","leonerd","leonhard","leonid","leonidas","leopold","leroi","leroy","les","lesley","leslie","lester","leupold","lev","levey","levi","levin","levon","levy","lew","lewes","lewie","lewiss","lezley","liam","lief","lin","linc","lincoln","lind","lindon","lindsay","lindsey","lindy","link","linn","linoel","linus","lion","lionel","lionello","lisle","llewellyn","lloyd","llywellyn","lock","locke","lockwood","lodovico","logan","lombard","lon","lonnard","lonnie","lonny","lorant","loren","lorens","lorenzo","lorin","lorne","lorrie","lorry","lothaire","lothario","lou","louie","louis","lovell","lowe","lowell","lowrance","loy","loydie","luca","lucais","lucas","luce","lucho","lucian","luciano","lucias","lucien","lucio","lucius","ludovico","ludvig","ludwig","luigi","luis","lukas","luke","lutero","luther","ly","lydon","lyell","lyle","lyman","lyn","lynn","lyon","mac","mace","mack","mackenzie","maddie","maddy","madison","magnum","mahmoud","mahmud","maison","maje","major","mal","malachi","malchy","malcolm","mallory","malvin","man","mandel","manfred","mannie","manny","mano","manolo","manuel","mar","marc","marcel","marcello","marcellus","marcelo","marchall","marco","marcos","marcus","marietta","marijn","mario","marion","marius","mark","markos","markus","marlin","marlo","marlon","marlow","marlowe","marmaduke","marsh","marshal","marshall","mart","martainn","marten","martie","martin","martino","marty","martyn","marv","marve","marven","marvin","marwin","mason","massimiliano","massimo","mata","mateo","mathe","mathew","mathian","mathias","matias","matt","matteo","matthaeus","mattheus","matthew","matthias","matthieu","matthiew","matthus","mattias","mattie","matty","maurice","mauricio","maurie","maurise","maurits","maurizio","maury","max","maxie","maxim","maximilian","maximilianus","maximilien","maximo","maxwell","maxy","mayer","maynard","mayne","maynord","mayor","mead","meade","meier","meir","mel","melvin","melvyn","menard","mendel","mendie","mendy","meredeth","meredith","merell","merill","merle","merrel","merrick","merrill","merry","merv","mervin","merwin","merwyn","meryl","meyer","mic","micah","michael","michail","michal","michale","micheal","micheil","michel","michele","mick","mickey","mickie","micky","miguel","mikael","mike","mikel","mikey","mikkel","mikol","mile","miles","mill","millard","miller","milo","milt","miltie","milton","milty","miner","minor","mischa","mitch","mitchael","mitchel","mitchell","moe","mohammed","mohandas","mohandis","moise","moises","moishe","monro","monroe","montague","monte","montgomery","monti","monty","moore","mord","mordecai","mordy","morey","morgan","morgen","morgun","morie","moritz","morlee","morley","morly","morrie","morris","morry","morse","mort","morten","mortie","mortimer","morton","morty","mose","moses","moshe","moss","mozes","muffin","muhammad","munmro","munroe","murdoch","murdock","murray","murry","murvyn","my","myca","mycah","mychal","myer","myles","mylo","myron","myrvyn","myrwyn","nahum","nap","napoleon","nappie","nappy","nat","natal","natale","nataniel","nate","nathan","nathanael","nathanial","nathaniel","nathanil","natty","neal","neale","neall","nealon","nealson","nealy","ned","neddie","neddy","neel","nefen","nehemiah","neil","neill","neils","nels","nelson","nero","neron","nester","nestor","nev","nevil","nevile","neville","nevin","nevins","newton","nial","niall","niccolo","nicholas","nichole","nichols","nick","nickey","nickie","nicko","nickola","nickolai","nickolas","nickolaus","nicky","nico","nicol","nicola","nicolai","nicolais","nicolas","nicolis","niel","niels","nigel","niki","nikita","nikki","niko","nikola","nikolai","nikolaos","nikolas","nikolaus","nikolos","nikos","nil","niles","nils","nilson","niven","noach","noah","noak","noam","nobe","nobie","noble","noby","noe","noel","nolan","noland","noll","nollie","nolly","norbert","norbie","norby","norman","normand","normie","normy","norrie","norris","norry","north","northrop","northrup","norton","nowell","nye","oates","obadiah","obadias","obed","obediah","oberon","obidiah","obie","oby","octavius","ode","odell","odey","odie","odo","ody","ogdan","ogden","ogdon","olag","olav","ole","olenolin","olin","oliver","olivero","olivier","oliviero","ollie","olly","olvan","omar","omero","onfre","onfroi","onofredo","oran","orazio","orbadiah","oren","orin","orion","orlan","orland","orlando","orran","orren","orrin","orson","orton","orv","orville","osbert","osborn","osborne","osbourn","osbourne","osgood","osmond","osmund","ossie","oswald","oswell","otes","othello","otho","otis","otto","owen","ozzie","ozzy","pablo","pace","packston","paco","pacorro","paddie","paddy","padget","padgett","padraic","padraig","padriac","page","paige","pail","pall","palm","palmer","panchito","pancho","paolo","papageno","paquito","park","parke","parker","parnell","parrnell","parry","parsifal","pascal","pascale","pasquale","pat","pate","paten","patin","paton","patric","patrice","patricio","patrick","patrizio","patrizius","patsy","patten","pattie","pattin","patton","patty","paul","paulie","paulo","pauly","pavel","pavlov","paxon","paxton","payton","peadar","pearce","pebrook","peder","pedro","peirce","pembroke","pen","penn","pennie","penny","penrod","pepe","pepillo","pepito","perceval","percival","percy","perice","perkin","pernell","perren","perry","pete","peter","peterus","petey","petr","peyter","peyton","phil","philbert","philip","phillip","phillipe","phillipp","phineas","phip","pierce","pierre","pierson","pieter","pietrek","pietro","piggy","pincas","pinchas","pincus","piotr","pip","pippo","pooh","port","porter","portie","porty","poul","powell","pren","prent","prentice","prentiss","prescott","preston","price","prince","prinz","pryce","puff","purcell","putnam","putnem","pyotr","quent","quentin","quill","quillan","quincey","quincy","quinlan","quinn","quint","quintin","quinton","quintus","rab","rabbi","rabi","rad","radcliffe","raddie","raddy","rafael","rafaellle","rafaello","rafe","raff","raffaello","raffarty","rafferty","rafi","ragnar","raimondo","raimund","raimundo","rainer","raleigh","ralf","ralph","ram","ramon","ramsay","ramsey","rance","rancell","rand","randal","randall","randell","randi","randie","randolf","randolph","randy","ransell","ransom","raoul","raphael","raul","ravi","ravid","raviv","rawley","ray","raymond","raymund","raynard","rayner","raynor","read","reade","reagan","reagen","reamonn","red","redd","redford","reece","reed","rees","reese","reg","regan","regen","reggie","reggis","reggy","reginald","reginauld","reid","reidar","reider","reilly","reinald","reinaldo","reinaldos","reinhard","reinhold","reinold","reinwald","rem","remington","remus","renado","renaldo","renard","renato","renaud","renault","rene","reube","reuben","reuven","rex","rey","reynard","reynold","reynolds","rhett","rhys","ric","ricard","ricardo","riccardo","rice","rich","richard","richardo","richart","richie","richmond","richmound","richy","rick","rickard","rickert","rickey","ricki","rickie","ricky","ricoriki","rik","rikki","riley","rinaldo","ring","ringo","riobard","riordan","rip","ripley","ritchie","roarke","rob","robb","robbert","robbie","robby","robers","robert","roberto","robin","robinet","robinson","rochester","rock","rockey","rockie","rockwell","rocky","rod","rodd","roddie","roddy","roderic","roderich","roderick","roderigo","rodge","rodger","rodney","rodolfo","rodolph","rodolphe","rodrick","rodrigo","rodrique","rog","roger","rogerio","rogers","roi","roland","rolando","roldan","roley","rolf","rolfe","rolland","rollie","rollin","rollins","rollo","rolph","roma","romain","roman","romeo","ron","ronald","ronnie","ronny","rooney","roosevelt","rorke","rory","rosco","roscoe","ross","rossie","rossy","roth","rourke","rouvin","rowan","rowen","rowland","rowney","roy","royal","royall","royce","rriocard","rube","ruben","rubin","ruby","rudd","ruddie","ruddy","rudie","rudiger","rudolf","rudolfo","rudolph","rudy","rudyard","rufe","rufus","ruggiero","rupert","ruperto","ruprecht","rurik","russ","russell","rustie","rustin","rusty","rutger","rutherford","rutledge","rutter","ruttger","ruy","ryan","ryley","ryon","ryun","sal","saleem","salem","salim","salmon","salomo","salomon","salomone","salvador","salvatore","salvidor","sam","sammie","sammy","sampson","samson","samuel","samuele","sancho","sander","sanders","sanderson","sandor","sandro","sandy","sanford","sanson","sansone","sarge","sargent","sascha","sasha","saul","sauncho","saunder","saunders","saunderson","saundra","sauveur","saw","sawyer","sawyere","sax","saxe","saxon","say","sayer","sayers","sayre","sayres","scarface","schuyler","scot","scott","scotti","scottie","scotty","seamus","sean","sebastian","sebastiano","sebastien","see","selby","selig","serge","sergeant","sergei","sergent","sergio","seth","seumas","seward","seymour","shadow","shae","shaine","shalom","shamus","shanan","shane","shannan","shannon","shaughn","shaun","shaw","shawn","shay","shayne","shea","sheff","sheffie","sheffield","sheffy","shelby","shelden","shell","shelley","shellysheldon","shelton","shem","shep","shepard","shepherd","sheppard","shepperd","sheridan","sherlock","sherlocke","sherm","sherman","shermie","shermy","sherwin","sherwood","sherwynd","sholom","shurlock","shurlocke","shurwood","si","sibyl","sid","sidnee","sidney","siegfried","siffre","sig","sigfrid","sigfried","sigismond","sigismondo","sigismund","sigismundo","sigmund","sigvard","silas","silvain","silvan","silvano","silvanus","silvester","silvio","sim","simeon","simmonds","simon","simone","sinclair","sinclare","siward","skell","skelly","skip","skipp","skipper","skippie","skippy","skipton","sky","skye","skylar","skyler","slade","sloan","sloane","sly","smith","smitty","sol","sollie","solly","solomon","somerset","son","sonnie","sonny","spence","spencer","spense","spenser","spike","stacee","stacy","staffard","stafford","staford","stan","standford","stanfield","stanford","stanislas","stanislaus","stanislaw","stanleigh","stanley","stanly","stanton","stanwood","stavro","stavros","stearn","stearne","stefan","stefano","steffen","stephan","stephanus","stephen","sterling","stern","sterne","steve","steven","stevie","stevy","steward","stewart","stillman","stillmann","stinky","stirling","stu","stuart","sullivan","sully","sumner","sunny","sutherlan","sutherland","sutton","sven","svend","swen","syd","sydney","sylas","sylvan","sylvester","syman","symon","tab","tabb","tabbie","tabby","taber","tabor","tad","tadd","taddeo","taddeusz","tadeas","tadeo","tades","tadio","tailor","tait","taite","talbert","talbot","tallie","tally","tam","tamas","tammie","tammy","tan","tann","tanner","tanney","tannie","tanny","tarrance","tate","taylor","teador","ted","tedd","teddie","teddy","tedie","tedman","tedmund","temp","temple","templeton","teodoor","teodor","teodorico","teodoro","terence","terencio","terrance","terrel","terrell","terrence","terri","terrill","terry","thacher","thaddeus","thaddus","thadeus","thain","thaine","thane","thatch","thatcher","thaxter","thayne","thebault","thedric","thedrick","theo","theobald","theodor","theodore","theodoric","thibaud","thibaut","thom","thoma","thomas","thor","thorin","thorn","thorndike","thornie","thornton","thorny","thorpe","thorstein","thorsten","thorvald","thurstan","thurston","tibold","tiebold","tiebout","tiler","tim","timmie","timmy","timofei","timoteo","timothee","timotheus","timothy","tirrell","tito","titos","titus","tobe","tobiah","tobias","tobie","tobin","tobit","toby","tod","todd","toddie","toddy","toiboid","tom","tomas","tomaso","tome","tomkin","tomlin","tommie","tommy","tonnie","tony","tore","torey","torin","torr","torrance","torre","torrence","torrey","torrin","torry","town","towney","townie","townsend","towny","trace","tracey","tracie","tracy","traver","travers","travis","travus","trefor","tremain","tremaine","tremayne","trent","trenton","trev","trevar","trever","trevor","trey","trip","tripp","tris","tristam","tristan","troy","trstram","trueman","trumaine","truman","trumann","tuck","tucker","tuckie","tucky","tudor","tull","tulley","tully","turner","ty","tybalt","tye","tyler","tymon","tymothy","tynan","tyrone","tyrus","tyson","udale","udall","udell","ugo","ulberto","ulick","ulises","ulric","ulrich","ulrick","ulysses","umberto","upton","urbain","urban","urbano","urbanus","uri","uriah","uriel","urson","vachel","vaclav","vail","val","valdemar","vale","valentijn","valentin","valentine","valentino","valle","van","vance","vanya","vasili","vasilis","vasily","vassili","vassily","vaughan","vaughn","verge","vergil","vern","verne","vernen","verney","vernon","vernor","vic","vick","victoir","victor","vidovic","vidovik","vin","vince","vincent","vincents","vincenty","vincenz","vinnie","vinny","vinson","virge","virgie","virgil","virgilio","vite","vito","vittorio","vlad","vladamir","vladimir","von","wade","wadsworth","wain","wainwright","wait","waite","waiter","wake","wakefield","wald","waldemar","walden","waldo","waldon","walker","wallace","wallache","wallas","wallie","wallis","wally","walsh","walt","walther","walton","wang","ward","warde","warden","ware","waring","warner","warren","wash","washington","wat","waverley","waverly","way","waylan","wayland","waylen","waylin","waylon","wayne","web","webb","weber","webster","weidar","weider","welbie","welby","welch","wells","welsh","wendall","wendel","wendell","werner","wernher","wes","wesley","west","westbrook","westbrooke","westleigh","westley","weston","weylin","wheeler","whit","whitaker","whitby","whitman","whitney","whittaker","wiatt","wilbert","wilbur","wilburt","wilden","wildon","wilek","wiley","wilfred","wilfrid","wilhelm","will","willard","willdon","willem","willey","willi","william","willie","willis","willy","wilmar","wilmer","wilt","wilton","win","windham","winfield","winfred","winifield","winn","winnie","winny","winslow","winston","winthrop","wit","wittie","witty","wolf","wolfgang","wolfie","wolfy","wood","woodie","woodman","woodrow","woody","worden","worth","worthington","worthy","wright","wyatan","wyatt","wye","wylie","wyn","wyndham","wynn","xavier","xenos","xerxes","xever","ximenes","ximenez","xymenes","yale","yanaton","yance","yancey","yancy","yank","yankee","yard","yardley","yehudi","yehudit","yorgo","yorgos","york","yorke","yorker","yul","yule","yulma","yuma","yuri","yurik","yves","yvon","yvor","zaccaria","zach","zacharia","zachariah","zacharias","zacharie","zachary","zacherie","zachery","zack","zackariah","zak","zane","zared","zeb","zebadiah","zebedee","zebulen","zebulon","zechariah","zed","zedekiah","zeke","zelig","zerk","zollie","zolly"]
    $A(list).each(function( e ){
        BST.add( test, e, e);
    });
    if(true){
      assert_equals( BST.get( test, "aaron"), "aaron");
      assert_equals( BST.get( test, list[133] ), list[133]);
      assert_equals( BST.get( test, list[1133] ), list[1133]);
      assert_equals( BST.all( test ).size(), list.size());
      assert_equals( BST.startsWith(test,"sv"), ["sven","svend"]);
      profiler(function(){
          assert_equals( BST.contains( test, "este"), ["chester","esteban","estevan","forester","forrester","lester","leicester","nester","rochester","silvester","sylvester"]);
      });
    }
  }
  document.title="start";
  var size = 100000;
  profiler(function(){
      for( var i=0; i < size; i++){
        var x = { a: 1 };
      }
  },"create hashs");
  profiler(function(){
      for( var i=0; i < size; i++){
        var x = [ "33" ];
      }
  },"create arrays");
  profiler(function(){
      for( var i=0; i < size; i++){
        var x = BST.create( "a" );
      }
  },"create nodes");
  
  //BIGG LIST!
  BST.clear(test);
  var hugelist = []
  new Ajax.Request( "/lemario80mil.txt", {
    method: "get",
    onSuccess:function(transport){
      profiler(function(){
          hugelist = transport.responseText.split("\n");
      },"split");
      
      profiler(function(){
        hugelist.each(function( e ){
            BST.add( test, e, e);
        });
      }, "adding");
      
      profiler(function(){
        hugelist.each(function( e ){
            BST.add( test, e, e);
        });
      }, "adding twice");
      profiler(function(){
        hugelist.each(function( e ){
            BST.add(test, e, e);
        });
      }, "adding 3times");
  
    },
    onFailure: function(){alert("wrong");}
  });
  
  
  document.title = "Passed test";
}
