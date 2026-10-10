(function(){
// Sample hours (placeholder). 0=Sun
var HOURS={0:null,1:[9,18],2:[9,18],3:[9,18],4:[9,18],5:[9,18.5],6:[8,17]};
var DAYN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var DAYF=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function fmtH(h){var hh=Math.floor(h),m=Math.round((h-hh)*60);var ap=hh>=12?"pm":"am";var d=hh%12||12;return d+(m?":"+String(m).padStart(2,"0"):"")+ap;}
function hrs(d){return HOURS[d]?fmtH(HOURS[d][0])+" to "+fmtH(HOURS[d][1]):"Closed";}
var now=new Date(), today=now.getDay();
var days=document.getElementById("days"), table=document.getElementById("hourTable");
[1,2,3,4,5,6,0].forEach(function(d){if(!days&&!table)return;
  var el=document.createElement("div"); if(d===today)el.className="today";
  el.innerHTML="<b>"+DAYN[d]+"</b>"+(HOURS[d]?fmtH(HOURS[d][0])+"<br>"+fmtH(HOURS[d][1]):"Closed");
  if(days)days.appendChild(el);
  var tr=document.createElement("tr"); if(d===today)tr.className="today";
  tr.innerHTML="<td>"+DAYF[d]+"</td><td>"+hrs(d)+"</td>"; if(table)table.appendChild(tr);
});
(function(){var h=now.getHours()+now.getMinutes()/60,t=HOURS[today],st=document.getElementById("status");if(!st)return;
  var open=t&&h>=t[0]&&h<t[1]; st.querySelector("span").textContent=open?"Open until "+fmtH(t[1]):"Closed now"; if(!open)st.classList.add("closed");})();

// Catalog (sample prices)
var P=[
 {id:"newport",cat:"Beef",name:"Newport Steak",desc:"Our house original from the bottom sirloin. Big flavor, real tenderness.",ppl:22.99,unit:"piece",est:.6,thick:true,badge:"House original"},
 {id:"ribeye-da",cat:"Beef",name:"Dry-Aged Rib Steak",desc:"Bone-in, aged in house for about 30 days.",ppl:44.99,unit:"piece",est:1.4,thick:true},
 {id:"strip",cat:"Beef",name:"Prime Strip Steak",desc:"Boneless New York strip, trimmed to order.",ppl:29.99,unit:"piece",est:.8,thick:true},
 {id:"porter",cat:"Beef",name:"Porterhouse",desc:"Strip and filet on the bone. Made for two.",ppl:31.99,unit:"piece",est:1.8,thick:true},
 {id:"skirt",cat:"Beef",name:"Skirt Steak",desc:"Outside skirt, cleaned. Fast and hot on the grill.",ppl:21.99,unit:"lb"},
 {id:"ground",cat:"Beef",name:"Ground Chuck",desc:"Ground fresh when you order. 80/20.",ppl:9.99,unit:"lb"},
 {id:"lambrack",cat:"Lamb",name:"Rack of Lamb",desc:"Frenched 8-bone rack, cap trimmed.",ppl:34.99,unit:"piece",est:1.5},
 {id:"lambchop",cat:"Lamb",name:"Lamb Loin Chops",desc:"Thick-cut little porterhouses.",ppl:29.99,unit:"piece",est:.35,thick:true},
 {id:"lambleg",cat:"Lamb",name:"Leg of Lamb",desc:"Bone-in or boned and tied. Say which in the notes.",ppl:14.99,unit:"lb"},
 {id:"porkchop",cat:"Pork",name:"Pork Rib Chops",desc:"Bone-in, cut thick so they stay juicy.",ppl:10.99,unit:"piece",est:.7,thick:true},
 {id:"bacon",cat:"Pork",name:"Slab Bacon",desc:"Smoked slab, sliced to your thickness.",ppl:12.99,unit:"lb"},
 {id:"sausage",cat:"Sausage",name:"House Italian Sausage",desc:"Sweet or hot, made here. Say which in the notes.",ppl:9.99,unit:"lb"},
 {id:"chicken",cat:"Poultry",name:"Whole Chicken",desc:"Air-chilled. Left whole, spatchcocked or cut in 8.",ppl:5.99,unit:"piece",est:3.8},
 {id:"cutlets",cat:"Poultry",name:"Chicken Cutlets",desc:"Breast, pounded thin on request.",ppl:11.99,unit:"lb"}
];
var H=[
 {id:"turkey",cat:"Holiday",name:"Fresh Turkey",desc:"Never frozen. Pick the size, we confirm the exact bird.",ppl:4.99,unit:"size",sizes:[["12 to 14 lb",13],["16 to 18 lb",17],["20 to 22 lb",21]],deposit:25},
 {id:"ribroast",cat:"Holiday",name:"Standing Rib Roast",desc:"Prime, chine removed and tied. About 2 people per rib.",ppl:29.99,unit:"size",sizes:[["2 ribs",4.5],["3 ribs",7],["4 ribs",9.5]],deposit:25},
 {id:"crown",cat:"Holiday",name:"Crown Roast of Pork",desc:"Tied and frenched. A centerpiece for 10 to 12.",ppl:14.99,unit:"size",sizes:[["12 ribs",9]],deposit:25}
];
var ALL=P.concat(H), byId={}; ALL.forEach(function(p){byId[p.id]=p;});
var THICK=[["1 in",1],["1¼ in",1.25],["1½ in",1.5],["2 in",2]];
function money(n){return "$"+n.toFixed(2);}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

function card(p){
  var opts="";
  if(p.unit==="piece"){
    opts+='<label for="q-'+p.id+'">Quantity<select id="q-'+p.id+'">'+[1,2,3,4,5,6,8].map(function(n){return "<option>"+n+"</option>";}).join("")+'</select></label>';
    opts+=p.thick?'<label for="t-'+p.id+'">Thickness<select id="t-'+p.id+'">'+THICK.map(function(t,i){return '<option value="'+i+'">'+t[0]+'</option>';}).join("")+'</select></label>':'<label>Est. each<input value="'+p.est+' lb" disabled></label>';
  }else if(p.unit==="lb"){
    opts+='<label for="q-'+p.id+'">Weight<select id="q-'+p.id+'">'+[.5,1,1.5,2,3,4,5].map(function(n){return '<option value="'+n+'"'+(n===1?" selected":"")+'>'+n+' lb</option>';}).join("")+'</select></label><label>Trim<input value="To order" disabled></label>';
  }else{
    opts+='<label for="q-'+p.id+'" style="grid-column:1/-1">Size<select id="q-'+p.id+'">'+p.sizes.map(function(s,i){return '<option value="'+i+'">'+s[0]+'</option>';}).join("")+'</select></label>';
  }
  var right=p.unit==="size"?"Reserve now, pay at pickup":(p.unit==="piece"?"About "+p.est+" lb each":"Sold by the pound");
  return '<article class="tagcard">'+(p.badge?'<span class="badge">'+p.badge+'</span>':'')+
    '<div class="cat">'+p.cat+'</div><h3>'+p.name+'</h3><p>'+p.desc+'</p>'+
    (right?'<div class="price"><span>'+right+'</span></div>':'')+
    '<div class="opts">'+opts+'</div>'+
    '<button class="btn small" type="button" data-add="'+p.id+'">'+(p.unit==="size"?"Reserve":"Add to order")+'</button></article>';
}
var grid=document.getElementById("grid"), filters=document.getElementById("filters");
var cats=["All","Beef","Lamb","Pork","Poultry","Sausage"], cur="All";
function renderGrid(){grid.innerHTML=P.filter(function(p){return cur==="All"||p.cat===cur;}).map(card).join("");}
if(grid){filters.innerHTML=cats.map(function(c){return '<button class="chip" type="button" aria-pressed="'+(c===cur)+'" data-cat="'+c+'">'+c+'</button>';}).join("");
filters.addEventListener("click",function(e){var b=e.target.closest("[data-cat]");if(!b)return;cur=b.dataset.cat;
  filters.querySelectorAll(".chip").forEach(function(x){x.setAttribute("aria-pressed",x===b);});renderGrid();});
renderGrid();}
var hg=document.getElementById("holidayGrid");if(hg){hg.innerHTML=H.map(card).join("");hg.style.gridTemplateColumns="repeat(auto-fill,minmax(220px,1fr))";}

// Cart
var cart=[];
try{cart=JSON.parse(localStorage.getItem("florenceCart")||"[]")||[];}catch(e){cart=[];}
cart=cart.filter(function(l){return byId[l.id];});
function save(){try{localStorage.setItem("florenceCart",JSON.stringify(cart));}catch(e){}}
function lineEst(l){var p=byId[l.id];
  if(p.unit==="lb")return l.qty*p.ppl;
  if(p.unit==="size")return p.sizes[l.size][1]*p.ppl;
  var f=p.thick?THICK[l.thick][1]:1;return l.qty*p.est*f*p.ppl;}
function lineDesc(l){var p=byId[l.id];
  if(p.unit==="lb")return l.qty+" lb · trimmed to order";
  if(p.unit==="size")return p.sizes[l.size][0]+" · holiday reservation";
  return l.qty+" × "+(p.thick?THICK[l.thick][0]+" thick":"about "+p.est+" lb each");}
function add(id){var p=byId[id],q=document.getElementById("q-"+id),t=document.getElementById("t-"+id);
  var l={id:id,qty:1,thick:0,size:0};
  if(p.unit==="size")l.size=+q.value; else l.qty=+(q?q.value:1);
  if(t)l.thick=+t.value;
  var same=cart.find(function(c){return c.id===l.id&&c.thick===l.thick&&c.size===l.size;});
  if(same&&p.unit!=="size")same.qty+=l.qty; else if(!same)cart.push(l);
  save();update();toast(p.name+" added");}
document.addEventListener("click",function(e){
  var a=e.target.closest("[data-add]"); if(a)add(a.dataset.add);
  var q=e.target.closest("[data-quick]"); if(q){cart.push({id:q.dataset.quick,qty:2,thick:0,size:0});save();update();toast("2 Newport Steaks added");}
});
var countEl=document.getElementById("count");
function update(){var n=cart.reduce(function(s,l){return s+(byId[l.id].unit==="lb"?1:l.qty);},0);countEl.textContent=n;if(!drawer.hidden)renderDrawer();}

var toastEl=document.getElementById("toast"),tt;
function toast(m){toastEl.textContent=m;toastEl.hidden=false;clearTimeout(tt);tt=setTimeout(function(){toastEl.hidden=true;},1800);}

// Drawer + checkout
var drawer=document.getElementById("drawer"),scrim=document.getElementById("scrim"),dBody=document.getElementById("dBody"),dFoot=document.getElementById("dFoot"),dTitle=document.getElementById("dTitle");
var step="cart", mode="pickup";
function openCart(){step="cart";drawer.hidden=false;scrim.hidden=false;renderDrawer();document.getElementById("closeCart").focus();}
function closeCart(){drawer.hidden=true;scrim.hidden=true;}
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;scrim.onclick=closeCart;
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!drawer.hidden)closeCart();});
function totals(){var est=0,dep=0,hasMeat=false;cart.forEach(function(l){var p=byId[l.id];if(p.unit==="size")dep+=p.deposit;else{est+=lineEst(l);hasMeat=true;}});
  var fee=(mode==="delivery"&&hasMeat)?(est>=150?0:8):0;return{est:est,dep:dep,fee:fee,hasMeat:hasMeat};}
function earliest(slot,mode){var h=HOURS[slot.dow],start=h[0]+(mode==="pickup"?1:2);
  if(slot.today){var n=new Date(),soon=Math.ceil((n.getHours()+n.getMinutes()/60+1.5)*2)/2;start=Math.max(start,soon);}return start;}
function slots(){var out=[],d=new Date();for(var i=0;out.length<6&&i<10;i++){var x=new Date(d);x.setDate(d.getDate()+i);var dow=x.getDay();if(!HOURS[dow])continue;
  var sl={label:(i===0?"Today":i===1?"Tomorrow":DAYF[dow])+" "+(x.getMonth()+1)+"/"+x.getDate(),dow:dow,today:i===0};
  if(sl.today&&earliest(sl,"delivery")+2>HOURS[dow][1])continue;
  out.push(sl);}return out;}
function renderDrawer(){
  dTitle.textContent=step==="done"?"Order placed":step==="checkout"?"Checkout":"Your order";
  if(step==="done")return;
  if(!cart.length){dBody.innerHTML='<div class="empty"><p class="script">Nothing on the block yet.</p><p>Pick a few cuts and we will have them ready.</p><button class="btn ghost" type="button" id="goShop">Browse the counter</button></div>';dFoot.innerHTML="";
    document.getElementById("goShop").onclick=function(){closeCart();location.href="shop.html";};return;}
  var t=totals();
  if(step==="cart"){
    dBody.innerHTML=cart.map(function(l,i){var p=byId[l.id];return '<div class="line"><b>'+p.name+'</b><small>'+lineDesc(l)+'</small>'+
      '<div class="qty">'+(p.unit==="size"?'':'<button type="button" data-dec="'+i+'" aria-label="Less">−</button><span>'+(p.unit==="lb"?l.qty+" lb":l.qty)+'</span><button type="button" data-inc="'+i+'" aria-label="More">+</button>')+'<button type="button" class="rm" data-rm="'+i+'">Remove</button></div></div>';}).join("")+
      '<label class="field" for="notes"><span>Notes for the butcher</span><textarea id="notes" placeholder="Extra fat trimmed, sausage hot not sweet, bones for stock">'+esc(sessionNotes)+'</textarea></label>';
    dBody.querySelector("#notes").oninput=function(e){sessionNotes=e.target.value;};
    dFoot.innerHTML='<p class="fine">Priced by weight once cut. Nothing to pay online.</p><button class="btn" type="button" id="toCheckout">Choose pickup or delivery</button>';
    document.getElementById("toCheckout").onclick=function(){step="checkout";renderDrawer();dBody.scrollTop=0;};
  } else {
    var s=slots(), hasHol=cart.some(function(l){return byId[l.id].unit==="size";});
    dBody.innerHTML='<div class="seg" role="group" aria-label="Pickup or delivery"><button type="button" data-mode="pickup" aria-pressed="'+(mode==="pickup")+'">Pickup</button><button type="button" data-mode="delivery" aria-pressed="'+(mode==="delivery")+'">Delivery</button></div>'+
      (hasHol?'<p class="fine">Holiday items are picked up Tue Nov 24 or Wed Nov 25. We will confirm the day by text.</p>':'')+
      (t.hasMeat?'<div class="row2"><label class="field" for="cDay"><span>Day</span><select id="cDay">'+s.map(function(x,i){return '<option value="'+i+'">'+x.label+'</option>';}).join("")+'</select></label><label class="field" for="cTime"><span>'+(mode==="pickup"?"Pickup time":"Delivery window")+'</span><select id="cTime"></select></label></div>':'')+
      (mode==="delivery"?'<label class="field" for="cAddr"><span>Street address</span><input id="cAddr" autocomplete="street-address"></label><label class="field" for="cZip"><span>Zip code</span><input id="cZip" inputmode="numeric" maxlength="5" autocomplete="postal-code"></label>':'')+
      '<div class="row2"><label class="field" for="cName"><span>Name</span><input id="cName" autocomplete="name"></label><label class="field" for="cPhone"><span>Mobile</span><input id="cPhone" type="tel" autocomplete="tel"></label></div>'+
      '<label class="field" for="cEmail"><span>Email (optional)</span><input id="cEmail" type="email" autocomplete="email"></label>'+'<p class="err" id="cErr" hidden></p>';
    function fillTimes(){var ts=document.getElementById("cTime");if(!ts)return;var sl=s[+document.getElementById("cDay").value],h=HOURS[sl.dow],o=[],st=earliest(sl,mode);
      if(mode==="pickup"){for(var x=st;x<h[1];x+=.5)o.push(fmtH(x));}else{for(var y=st;y+2<=h[1];y+=2)o.push(fmtH(y)+" to "+fmtH(y+2));}
      ts.innerHTML=o.map(function(v){return "<option>"+v+"</option>";}).join("");}
    if(t.hasMeat){document.getElementById("cDay").onchange=fillTimes;fillTimes();}
    dBody.querySelectorAll("[data-mode]").forEach(function(b){b.onclick=function(){mode=b.dataset.mode;renderDrawer();};});
    dFoot.innerHTML='<p class="fine">You pay '+(mode==="pickup"?"at the counter when you collect":"on delivery")+', by the exact weight.</p>'+
      '<div class="row2"><button class="btn ghost" type="button" id="back">Back</button><button class="btn" type="button" id="place">Place demo order</button></div>';
    document.getElementById("back").onclick=function(){step="cart";renderDrawer();};
    document.getElementById("place").onclick=place;
  }
  dBody.querySelectorAll("[data-inc],[data-dec],[data-rm]").forEach(function(b){b.onclick=function(){
    var i=+(b.dataset.inc||b.dataset.dec||b.dataset.rm),l=cart[i],p=byId[l.id],st=p.unit==="lb"?.5:1;
    if(b.dataset.rm!=null)cart.splice(i,1);else if(b.dataset.inc!=null)l.qty+=st;else{l.qty-=st;if(l.qty<=0)cart.splice(i,1);}
    save();update();renderDrawer();};});
}
var sessionNotes="";
function v(id){var e=document.getElementById(id);return e?e.value.trim():"";}
function place(){
  var err=document.getElementById("cErr"),msg="";
  if(!v("cName"))msg="Add your name so we know whose order it is.";
  else if(v("cPhone").replace(/\D/g,"").length<10)msg="Add a mobile number so we can text you when it is ready.";
  else if(mode==="delivery"&&totals().hasMeat){if(!v("cAddr"))msg="Add the delivery address.";else if(["10003","10011","10012","10013","10014"].indexOf(v("cZip"))<0)msg="We deliver to 10003, 10011, 10012, 10013 and 10014. Switch to pickup for other areas.";}
  if(msg){err.textContent=msg;err.hidden=false;return;}
  var when=document.getElementById("cDay")?(document.getElementById("cDay").selectedOptions[0].text+", "+document.getElementById("cTime").value):"the holiday pickup day";
  var num="FL-"+Math.floor(1000+Math.random()*9000), first=v("cName").split(" ")[0];
  step="done";dTitle.textContent="Order placed";
  dBody.innerHTML='<div class="okmsg"><span class="label">Order '+num+'</span><h3>Thanks, '+esc(first)+'.</h3><p>'+(mode==="pickup"?"Pickup at 5 Jones Street, "+esc(when)+".":"Delivery "+esc(when)+".")+' We will text '+esc(v("cPhone"))+' when it is cut and ready.</p><p class="fine">This is a demo. No order was sent.</p></div>';
  dFoot.innerHTML='<button class="btn" type="button" id="doneBtn">Back to the shop</button>';
  cart=[];sessionNotes="";save();update();
  document.getElementById("doneBtn").onclick=closeCart;
}

// Mobile menu
var mb=document.getElementById("menuBtn"),mn=document.getElementById("mobileNav");
mb.onclick=function(){var o=mn.hidden;mn.hidden=!o;mb.setAttribute("aria-expanded",o);};
mn.addEventListener("click",function(e){if(e.target.closest("a")){mn.hidden=true;mb.setAttribute("aria-expanded","false");}});

// Trade form
var tf=document.getElementById("tradeForm");if(tf)tf.addEventListener("submit",function(e){e.preventDefault();var er=document.getElementById("tErr");
  if(!v("tName")||!v("tBiz")||!/.+@.+\..+/.test(v("tEmail"))){er.textContent="Add your name, business and a valid email.";er.hidden=false;return;}
  this.hidden=true;document.getElementById("tOk").hidden=false;});

update();
})();
