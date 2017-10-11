/*****

Image Cross Fade Redux
Version 1.0
Last revision: 02.15.2006
steve@slayeroffice.com

Please leave this notice intact. 

Rewrite of old code found here: http://slayeroffice.com/code/imageCrossFade/index.html


*****/

if (window.XMLHttpRequest) {
	// IE 7, mozilla, safari, opera 9
	Event.observe(window, 'load', so_init);
} else {
	// IE6, older browsers. Die die die
}


var d=document, imgs = new Array(), zInterval = null, current=0;

function so_init() {
	if(!d.getElementById || !d.createElement) return;
	if(!d.getElementById('sshowcontainer')) {
		return;
	}
	
	css = d.createElement("link");
	css.setAttribute("href","css/xfade2.css");
	css.setAttribute("rel","stylesheet");
	css.setAttribute("type","text/css");
	d.getElementsByTagName("head")[0].appendChild(css);
	
	imgs = d.getElementById("sshowcontainer").getElementsByTagName("img");
	var relativeY = Element.getHeight(imgs[0]);
	
	for(i=1;i<imgs.length;i++) {
		imgs[i].xOpacity = 0;
		imgs[i].style.top = "-" + relativeY + "px";
		relativeY += Element.getHeight(imgs[i]);
		
	}
	imgs[0].style.display = "block";
	imgs[0].xOpacity = .99;
	
	setTimeout(so_xfade,4000);
}

function so_xfade() {
	cOpacity = imgs[current].xOpacity;
	nIndex = imgs[current+1]?current+1:0;
	nOpacity = imgs[nIndex].xOpacity;
	
	cOpacity-=.05; 
	nOpacity+=.05;
	
	imgs[nIndex].style.display = "block";
	imgs[current].xOpacity = cOpacity;
	imgs[nIndex].xOpacity = nOpacity;
	
	setOpacity(imgs[current]); 
	setOpacity(imgs[nIndex]);
	
	if(cOpacity<=0) {
		//imgs[current].style.display = "none";
		current = nIndex;
		setTimeout(so_xfade,4000);
	} else {
		setTimeout(so_xfade,50);
	}
	
	function setOpacity(obj) {
		if(obj.xOpacity>.99) {
			obj.xOpacity = .99;
			return;
		}
		obj.style.opacity = obj.xOpacity;
		obj.style.MozOpacity = obj.xOpacity;
		obj.style.filter = "alpha(opacity=" + (obj.xOpacity*100) + ")";
	}
	
}