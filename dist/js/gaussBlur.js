window.Zepto,(window.player||(window.player={})).blurImg=function(t,a){var r=t.width,e=t.height,o=document.createElement("canvas"),n=o.getContext("2d");o.width=40,o.height=40,n.drawImage(t,0,0,r,e,0,0,40,40);var h=function(t){var a,r,e,o,n,h,g,d,i,f,w=t.data,u=t.width,c=t.height,m=[],l=0,I=10;for(h=1/(5*Math.sqrt(2*Math.PI)),n=-.02,g=0,a=-I;a<=I;a++,g++)o=h*Math.exp(n*a*a),l+=m[g]=o;for(g=0,f=m.length;g<f;g++)m[g]/=l;for(r=0;r<c;r++)for(a=0;a<u;a++){for(e=o=n=h=0,l=0,d=-I;d<=I;d++)0<=(i=a+d)&&i<u&&(e+=w[g=4*(r*u+i)]*m[d+I],o+=w[g+1]*m[d+I],n+=w[g+2]*m[d+I],l+=m[d+I]);w[g=4*(r*u+a)]=e/l,w[g+1]=o/l,w[g+2]=n/l}for(a=0;a<u;a++)for(r=0;r<c;r++){for(e=o=n=h=0,l=0,d=-I;d<=I;d++)0<=(i=r+d)&&i<c&&(e+=w[g=4*(i*u+a)]*m[d+I],o+=w[g+1]*m[d+I],n+=w[g+2]*m[d+I],l+=m[d+I]);w[g=4*(r*u+a)]=e/l,w[g+1]=o/l,w[g+2]=n/l}return t}(n.getImageData(0,0,40,40));n.putImageData(h,0,0);var g=o.toDataURL();a.css("backgroundImage","url("+g+")")};