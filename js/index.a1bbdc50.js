(function(e){function t(t){for(var a,c,i=t[0],l=t[1],s=t[2],f=0,d=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);u&&u(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var l=n[i];0!==r[l]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={index:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"20b4":function(e,t,n){"use strict";n("a90f")},9848:function(e,t,n){"use strict";n("9924")},9924:function(e,t,n){},a90f:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),r=(n("a15b"),n("d3b7"),function(e){return Object(a["i"])("data-v-d7e17a84"),e=e(),Object(a["h"])(),e}),o=r((function(){return Object(a["e"])("span",{class:"fontloader"},"test",-1)})),c={ref:"canvas"},i={key:0,class:"results"};function l(e,t,n,r,l,s){return Object(a["g"])(),Object(a["d"])(a["a"],null,[o,Object(a["e"])("canvas",c,null,512),r.results?(Object(a["g"])(),Object(a["d"])("span",i,[Object(a["f"])(Object(a["k"])(r.results.join(" + "))+" ",1),r.results.length>1?(Object(a["g"])(),Object(a["d"])(a["a"],{key:0},[Object(a["f"])(" = "+Object(a["k"])(r.results.reduce((function(e,t){return e+t}),0)),1)],64)):Object(a["c"])("",!0)])):Object(a["c"])("",!0)],64)}var s,u,f=n("3835"),d=n("b85c"),v=(n("d81d"),n("1bf2"),n("f8c9"),n("4c53"),n("caad"),n("2532"),n("10a2")),h=n("5a89"),p=n("4f96"),m=n("2909"),g=(n("7db0"),n("4e82"),n("fb6a"),n("cfc3"),n("907a"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("99af"),n("6062"),n("3ca3"),n("ddb0"),n("1c69"));function w(e){var t=e(),n=e(),a=e();return new v["f"](Math.sqrt(1-t)*Math.sin(2*Math.PI*n),Math.sqrt(1-t)*Math.cos(2*Math.PI*n),Math.sqrt(t)*Math.sin(2*Math.PI*a),Math.sqrt(t)*Math.cos(2*Math.PI*a))}function b(e){return function(t,n){function a(e,t,n,a){var r=e.vsub(n),o=t.vsub(n),c=Math.min(1,Math.max(-1,r.dot(o)/r.length()/o.length())),i=Math.acos(c),l=r.cross(o).dot(a);return l>=0?i:2*Math.PI-i}function r(e,t){var n,r=new v["g"],o=Object(d["a"])(e);try{for(o.s();!(n=o.n()).done;){var c=n.value;r.vadd(c,r)}}catch(l){o.e(l)}finally{o.f()}r.scale(1/e.length,r);var i=e[0];return e.slice().sort((function(e,n){return a(i,e,r,t)-a(i,n,r,t)}))}var o,c=[],i=[],l=e.vertices.map((function(e){var n=(new h["g"]).set(e.faces[0].normal.x,e.faces[0].normal.y,e.faces[0].normal.z,e.faces[1].normal.x,e.faces[1].normal.y,e.faces[1].normal.z,e.faces[2].normal.x,e.faces[2].normal.y,e.faces[2].normal.z);n.invert();var a=new h["s"](-t,-t,-t),r=a.applyMatrix3(n),o=new v["g"](r.x,r.y,r.z);return Object(g["a"])(e.faces.every((function(e){return Math.abs(e.normal.dot(o)+t)<1e-6})),"rounding"),e.point.vadd(o)})),s=Object(d["a"])(e.edges);try{for(s.s();!(o=s.n()).done;)for(var u=o.value,p=l[e.vertices.indexOf(u.vertices[0])],m=l[e.vertices.indexOf(u.vertices[1])],w=(new v["f"]).setFromVectors(u.faces[0].normal,u.faces[0].normal),b=(new v["f"]).setFromVectors(u.faces[0].normal,u.faces[1].normal),y=new v["f"],j=0;j<n;++j){w.slerp(b,j/n,y);var M=p.vadd(y.vmult(u.faces[0].normal.scale(t))),O=m.vadd(y.vmult(u.faces[0].normal.scale(t)));w.slerp(b,(j+1)/n,y);var x=p.vadd(y.vmult(u.faces[0].normal.scale(t))),I=m.vadd(y.vmult(u.faces[0].normal.scale(t)));w.slerp(b,(j+.5)/n,y);var T=y.vmult(u.faces[0].normal);c.push(r([M,O,I,x],T).map((function(e){return[e,new h["r"](.5,.5)]}))),i.push(T)}}catch(Q){s.e(Q)}finally{s.f()}for(var A=function(n){var a,o=e.faces[n].vertices.map((function(a){return l[e.vertices.indexOf(a)].vadd(e.faces[n].normal.scale(t))})),s=r(o,e.faces[n].normal),u=new v["g"],f=Object(d["a"])(s);try{for(f.s();!(a=f.n()).done;){var p=a.value;u.vadd(p,u)}}catch(Q){f.e(Q)}finally{f.f()}u.scale(1/s.length,u);var m,g=s[1].vsub(u).unit(),w=g.cross(e.faces[n].normal),b=s.map((function(e){var t=e.vsub(u),n=t.dot(w),a=t.dot(g);return[e,new h["r"](n,a)]})),y=b.reduce((function(e,t){return new h["r"](Math.min(e.x,t[1].x),Math.min(e.y,t[1].y))}),new h["r"]),j=b.reduce((function(e,t){return new h["r"](Math.max(e.x,t[1].x),Math.max(e.y,t[1].y))}),new h["r"]),M=Math.max(-y.x,-y.y,j.x,j.y),O=Object(d["a"])(b);try{for(O.s();!(m=O.n()).done;){var x=m.value;x[1].multiplyScalar(1/M),x[1].x=(x[1].x/2+.5+n)/e.faces.length,x[1].y=x[1].y/2+.5}}catch(Q){O.e(Q)}finally{O.f()}c.push(b),i.push(e.faces[n].normal)},q=0;q<e.faces.length;++q)A(q);for(var _=[],S=[],F=[],P=[],U=0;U<c.length;++U){var N,z=S.length/3,V=Object(d["a"])(c[U]);try{for(V.s();!(N=V.n()).done;){var C=Object(f["a"])(N.value,2),R=C[0],k=C[1];S.push(R.x,R.y,R.z),_.push(k.x,k.y),F.push(i[U].x,i[U].y,i[U].z)}}catch(Q){V.e(Q)}finally{V.f()}P.push(z,z+1,z+2),c[U].length>=4&&P.push(z+2,z+3,z+0),c[U].length>=5&&P.push(z+3,z+4,z+0)}var Y=[],Z=new h["c"];Z.setAttribute("position",new h["b"](new Float32Array(S),3)),Z.setAttribute("normal",new h["b"](new Float32Array(F),3)),Z.setAttribute("uv",new h["b"](new Float32Array(_),2)),Z.setIndex(P),Y.push(Z);var B,E=Object(d["a"])(l);try{for(E.s();!(B=E.n()).done;){var X=B.value,L=new h["q"](t);L.translate(X.x,X.y,X.z);var J=new h["h"];J.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),L.attributes.uv.applyMatrix4(J),Y.push(L)}}catch(Q){E.e(Q)}finally{E.f()}return Y}}function y(e){return new v["c"]({vertices:e.vertices.map((function(e){return e.point})),normals:e.faces.map((function(e){return e.normal})),faces:e.faces.map((function(t){return t.vertices.map((function(t){return e.vertices.indexOf(t)}))}))})}function j(e,t){for(var n=t(1),a=Object(p["a"])(n),r=a[0],o=a.slice(1),c=[],i=[],l=[],u=0;u<r.length;++u){var h={point:r[u],edges:[],faces:[]};c.push(h);for(var w=function(e){var t=c[e],n=h.point.vsub(t.point);if(o.some((function(e){return Math.abs(e-n.length())<1e-6}))){var a={vertices:[h,t],faces:[]};h.edges.push(a),t.edges.push(a),i.push(a)}},b=0;b<u;++b)w(b)}function y(e,t,n){var a=[],r=[[t,[]]];while(r.length>0){var o,c=r.pop(),i=Object(f["a"])(c,2),l=i[0],u=i[1],v=Object(d["a"])(l.edges);try{for(v.s();!(o=v.n()).done;){var h=o.value,p=s.otherVertex(h,l);u.includes(h)||(p==e?a.push([].concat(Object(m["a"])(u),[h])):u.length+1<n&&r.push([p,[].concat(Object(m["a"])(u),[h])]))}}catch(g){v.e(g)}finally{v.f()}}return a}for(var j=2*i.length/e,M=[],O=0,x=c;O<x.length;O++){var I=x[O];M.push.apply(M,Object(m["a"])(y(I,I,j)))}for(var T=function(){var e,t=q[A],n=new Set,a=Object(d["a"])(t);try{for(a.s();!(e=a.n()).done;){var r,o=e.value,c=Object(d["a"])(o.vertices);try{for(c.s();!(r=c.n()).done;){var i=r.value;n.add(i)}}catch(I){c.e(I)}finally{c.f()}}}catch(I){a.e(I)}finally{a.f()}var s=Object(m["a"])(n),u=s[1].point.vsub(s[0].point).cross(s[2].point.vsub(s[0].point)).unit();if(l.find((function(e){return e.normal.almostEquals(u)})))return"continue";var f,h=new v["g"],p=Object(d["a"])(s);try{for(p.s();!(f=p.n()).done;){var g=f.value;h.vadd(g.point,h)}}catch(I){p.e(I)}finally{p.f()}if(h.scale(1/s.length,h),h.dot(u)<0)return"continue";var w,b={normal:u,edges:t,vertices:s},y=Object(d["a"])(s);try{for(y.s();!(w=y.n()).done;){var j=w.value;j.faces.push(b)}}catch(I){y.e(I)}finally{y.f()}var M,O=Object(d["a"])(t);try{for(O.s();!(M=O.n()).done;){var x=M.value;x.faces.push(b)}}catch(I){O.e(I)}finally{O.f()}l.push(b)},A=0,q=M;A<q.length;A++)T();return Object(g["a"])(i.every((function(e){return 2==e.faces.length})),"valid die"),{vertices:c,edges:i,faces:l}}function M(e,t){return function(){var n=document.createElement("canvas");n.width=512*e.faces.length,n.height=512;var a=n.getContext("2d");Object(g["a"])(null!=a,"context"),a.fillStyle="#333",a.fillRect(0,0,512*e.faces.length,512),a.fillStyle="red",a.textAlign="center",a.textBaseline="middle",t(a,(function(e,t,n,r){a.translate(256+512*t,256),a.rotate(n*Math.PI),a.translate(0,r),a.fillText(e,0,0),a.resetTransform()}));var r=new h["d"](n);return r}}function O(e,t,n,a,r){return function(o,c){return{model:e,shape:t,texture:n(),geometry:a(o,c),results:r}}}(function(e){function t(e,t){return e.vertices[1]==t?e.vertices[0]:e.vertices[1]}e.otherVertex=t})(s||(s={})),function(e){function t(e){var t=new h["j"]({map:e.texture}),n=new h["f"];return n.add.apply(n,Object(m["a"])(e.geometry.map((function(e){var n=new h["i"](e,t);return n.castShadow=!0,n})))),n}function n(e){return new v["a"]({mass:1,shape:e.shape})}function a(e){var a=n(e),r=t(e);return{die:e,body:a,object:r}}function r(e,t){e.body.position=t.position.clone(),e.body.quaternion=t.orientation.clone(),e.body.velocity=t.velocity.clone(),e.body.angularVelocity=t.angularVelocity.clone()}function o(e){e.object.position.set(e.body.position.x,e.body.position.y,e.body.position.z),e.object.quaternion.set(e.body.quaternion.x,e.body.quaternion.y,e.body.quaternion.z,e.body.quaternion.w)}function c(e){var t=e.body.angularVelocity.lengthSquared(),n=e.body.velocity.lengthSquared(),a=e.die.model.faces.find((function(t){return e.body.quaternion.vmult(t.normal).dot(v["g"].UNIT_Y)<-.99}));return(e.body.type==v["a"].STATIC||t<1e-4&&n<1e-4)&&void 0!==a?a:null}e.createObject=t,e.createBody=n,e.create=a,e.initRoll=r,e.update=o,e.resolve=c}(u||(u={}));var x=j(4,(function(e){var t=20*e/16,n=(new v["f"]).setFromAxisAngle(v["g"].UNIT_Z,-Math.acos(-1/3)),a=(new v["f"]).setFromAxisAngle(v["g"].UNIT_Y,2*Math.PI/3).mult(n),r=(new v["f"]).setFromAxisAngle(v["g"].UNIT_Y,2*-Math.PI/3).mult(n),o=v["g"].UNIT_Y.scale(t*Math.sqrt(6)/4),c=[o,n.vmult(o),a.vmult(o),r.vmult(o)];return[c,t]})),I=y(x),T=M(x,(function(e,t){e.font="bold 130px Roboto",t("1",0,0,-125),t("2",0,2/3,-125),t("3",0,4/3,-125),t("1",1,0,-125),t("4",1,4/3,-125),t("3",1,2/3,-125),t("1",2,0,-125),t("4",2,2/3,-125),t("2",2,4/3,-125),t("4",3,0,-125),t("2",3,4/3,-125),t("3",3,2/3,-125)})),A=b(x),q=[2,3,4,1],_=O(x,I,T,A,q),S=j(6,(function(e){for(var t=e,n=[],a=0;a<8;++a)n.push(new v["g"](1&a?t/2:-t/2,2&a?t/2:-t/2,4&a?t/2:-t/2));return[n,t]})),F=y(S),P=M(S,(function(e,t){e.font="bold 240px Roboto",t("1",0,3/4,20),t("2",2,1/4,20),t("3",1,7/4,20),t("4",3,1/4,20),t("5",5,7/4,20),t("6",4,1/4,20)})),U=b(S),N=[6,4,5,3,1,2],z=O(S,F,P,U,N),V=j(8,(function(e){var t=18.5*e/16,n=t/Math.SQRT2,a=[new v["g"](+n,0,0),new v["g"](-n,0,0),new v["g"](0,+n,0),new v["g"](0,-n,0),new v["g"](0,0,+n),new v["g"](0,0,-n)];return[a,t]})),C=y(V),R=M(V,(function(e,t){e.font="bold 200px Roboto",t("1",0,4/3,0),t("2",1,4/3,0),t("3",2,2/3,0),t("4",3,2/3,0),t("5",5,4/3,0),t("6",4,4/3,0),t("7",6,2/3,0),t("8",7,2/3,0)})),k=b(V),Y=[8,7,6,5,3,4,2,1],Z=O(V,C,R,k,Y),B=j(10,(function(e){var t=e,n=2*Math.PI/5,a=.27*Math.PI,r=Math.sin(a)*t,o=Math.cos(a)*t,c=Math.cos(n/2)*r,i=Math.atan(c/o),l=Math.PI-a-i,s=t/Math.sin(i),u=s*Math.sin(l),f=Math.sqrt(u*u/4+t*t-u*t*Math.cos(a)),d=Math.asin(t*Math.sin(a)/f),h=Math.PI/2-d,p=(new v["f"]).setFromAxisAngle(v["g"].UNIT_Y,n),m=(new v["f"]).setFromAxisAngle(v["g"].UNIT_Z,h),g=v["g"].UNIT_Y.scale(u/2),w=v["g"].UNIT_X.scale(f),b=[g,m.vmult(w),p.vmult(m.vmult(w)),p.vmult(p.vmult(m.vmult(w))),p.vmult(p.vmult(p.vmult(m.vmult(w)))),p.vmult(p.vmult(p.vmult(p.vmult(m.vmult(w))))),g.negate(),m.vmult(w.negate()),p.vmult(m.vmult(w.negate())),p.vmult(p.vmult(m.vmult(w.negate()))),p.vmult(p.vmult(p.vmult(m.vmult(w.negate())))),p.vmult(p.vmult(p.vmult(p.vmult(m.vmult(w.negate())))))];return[b,b[1].vsub(b[0]).length(),b[7].vsub(b[3]).length()]})),E=y(B),X=M(B,(function(e,t){e.font="bold 160px Roboto",t("1",0,0,0),t("2",8,1,0),t("3",4,0,0),t("4",5,1,0),t("5",2,0,0),t("6",9,1,0),t("7",1,0,0),t("8",7,1,0),t("9",3,0,0),t("10",6,1,0)})),L=b(B),J=[10,4,6,2,8,7,1,3,9,5],Q=O(B,E,X,L,J),K=j(12,(function(e){for(var t=.5*e,n=(1+Math.sqrt(5))/2,a=[new v["g"](1,1,1),new v["g"](-1,1,1),new v["g"](1,-1,1),new v["g"](1,1,-1),new v["g"](-1,-1,1),new v["g"](1,-1,-1),new v["g"](-1,1,-1),new v["g"](-1,-1,-1),new v["g"](0,n,1/n),new v["g"](0,-n,1/n),new v["g"](0,n,-1/n),new v["g"](0,-n,-1/n),new v["g"](1/n,0,n),new v["g"](1/n,0,-n),new v["g"](-1/n,0,n),new v["g"](-1/n,0,-n),new v["g"](n,1/n,0),new v["g"](-n,1/n,0),new v["g"](n,-1/n,0),new v["g"](-n,-1/n,0)],r=0,o=a;r<o.length;r++){var c=o[r];c.scale(t*n/2,c)}return[a,t]})),D=y(K),G=b(K),H=M(K,(function(e,t){e.font="bold 240px Roboto",t("1",0,0,20),t("2",2,1.6,20),t("3",1,.4,20),t("4",7,0,20),t("5",6,1.2,20),t("6",5,1.2,20),t("7",3,1.6,20),t("8",8,1.6,20),t("9",4,.8,20),t("10",10,.8,20),t("11",9,1.6,20),t("12",11,1.2,20)})),W=[12,10,11,6,4,7,8,9,5,2,3,1],$=O(K,D,H,G,W),ee=j(20,(function(e){for(var t=.8*e,n=(1+Math.sqrt(5))/2,a=[new v["g"](0,1,n),new v["g"](0,-1,n),new v["g"](0,1,-n),new v["g"](0,-1,-n),new v["g"](1,n,0),new v["g"](-1,n,0),new v["g"](1,-n,0),new v["g"](-1,-n,0),new v["g"](n,0,1),new v["g"](n,0,-1),new v["g"](-n,0,1),new v["g"](-n,0,-1)],r=0,o=a;r<o.length;r++){var c=o[r];c.scale(t/2,c)}return[a,20,t]})),te=y(ee),ne=b(ee),ae=M(ee,(function(e,t){e.font="bold 180px Roboto",t("1",0,0,35),t("2",12,0,35),t("3",1,2/3,35),t("4",13,2/3,35),t("5",10,0,35),t("6",7,0,35),t("7",2,4/3,35),t("8",18,2/3,35),t("9",6,2/3,35),t("10",16,0,35),t("11",19,0,35),t("12",9,4/3,35),t("13",17,4/3,35),t("14",14,2/3,35),t("15",11,0,35),t("16",5,0,35),t("17",3,4/3,35),t("18",8,2/3,35),t("19",4,2/3,35),t("20",15,0,35)})),re=[20,18,14,4,2,5,12,15,3,9,16,6,19,17,7,1,11,8,13,10],oe=O(ee,te,ae,ne,re);function ce(){return{d4:_(.05,20),d6:z(.09,20),d8:Z(.09,20),d10:Q(.09,20),d12:$(.09,20),d20:oe(.09,20)}}function ie(e){var t=w(Math.random),n=Math.random()*Math.PI*2,a=new v["g"](Math.cos(n),0,Math.sin(n)).scale(3).vadd(new v["g"](8,0,0)),r=w(Math.random),o=r.vmult(v["g"].UNIT_Y.scale(30));return{position:e,orientation:t,velocity:a,angularVelocity:o}}function le(e){var t=new h["o"],n=new h["k"](-e.width/200,e.width/200,e.height/200,-e.height/200);n.position.set(0,100,0),n.lookAt(0,0,0);var a=new h["t"]({canvas:e,alpha:!0,antialias:!0});a.shadowMap.enabled=!0,a.shadowMap.type=h["l"];var r=new h["a"](16777215,.4);t.add(r);var o=Math.sqrt(n.right*n.right+n.top*n.top),c=new h["e"](16777215,.6);c.position.set(2,3,-1),c.shadow.mapSize.width=4*e.width,c.shadow.mapSize.height=4*e.height,c.shadow.camera.near=-2*o,c.shadow.camera.far=2*o,c.shadow.camera.top=o,c.shadow.camera.bottom=-o,c.shadow.camera.left=-o,c.shadow.camera.right=o,c.castShadow=!0,t.add(c);var i=new h["m"](2*n.right,2*n.top),l=new h["p"]({opacity:.5}),s=new h["i"](i,l);return s.rotateX(-Math.PI/2),s.castShadow=!1,s.receiveShadow=!0,t.add(s),{scene:t,camera:n,renderer:a}}function se(e){var t=new v["h"]({gravity:new v["g"](0,-30,0)}),n=new v["d"],a=new v["d"],r=new v["a"]({type:v["a"].STATIC,shape:new v["e"],position:new v["g"](0,0,0),quaternion:(new v["f"]).setFromVectors(v["g"].UNIT_Z,v["g"].UNIT_Y),material:a}),o=[new v["a"]({type:v["a"].STATIC,shape:new v["e"],position:new v["g"](-e.x/2,0,0),quaternion:(new v["f"]).setFromVectors(v["g"].UNIT_Z,v["g"].UNIT_X),material:n}),new v["a"]({type:v["a"].STATIC,shape:new v["e"],position:new v["g"](+e.x/2,0,0),quaternion:(new v["f"]).setFromVectors(v["g"].UNIT_Z,v["g"].UNIT_X.negate()),material:n}),new v["a"]({type:v["a"].STATIC,shape:new v["e"],position:new v["g"](0,0,-e.y/2),quaternion:(new v["f"]).setFromVectors(v["g"].UNIT_Z,v["g"].UNIT_Z),material:n}),new v["a"]({type:v["a"].STATIC,shape:new v["e"],position:new v["g"](0,0,+e.y/2),quaternion:(new v["f"]).setFromVectors(v["g"].UNIT_Z,v["g"].UNIT_Z.negate()),material:n})];t.addBody(r);for(var c=0,i=o;c<i.length;c++){var l=i[c];t.addBody(l)}return t.addContactMaterial(new v["b"](t.defaultMaterial,n,{friction:0})),t.addContactMaterial(new v["b"](t.defaultMaterial,a,{friction:.04})),t.addContactMaterial(new v["b"](t.defaultMaterial,t.defaultMaterial,{friction:0})),{world:t,walls:o,floor:r}}function ue(e,t){if("complete"!=document.readyState)return window.addEventListener("load",(function(){return ue(e,t)}));var n=ce(),a=e.getBoundingClientRect();e.width=a.width,e.height=a.height;var r=le(e),o=r.scene,c=r.camera,i=r.renderer,l=new h["r"](2*c.right,2*c.top),s=se(l),p=s.world,m=s.floor,g=s.walls,w=[],b=Reflect.ownKeys(n).map((function(e){return n[e]})),y=b.map((function(e,t){var n=new h["r"](-l.x/2+.5,1*(t+.5-b.length/2)),a=u.createObject(e);a.position.set(n.x,10,n.y),a.scale.set(.6,.6,.6);var r,c=(new h["n"]).setFromUnitVectors(new h["s"](e.model.faces[0].normal.x,e.model.faces[0].normal.y,e.model.faces[0].normal.z),new h["s"](0,-1,0)),i=new v["g"],s=Object(d["a"])(e.model.faces[0].vertices);try{for(s.s();!(r=s.n()).done;){var f=r.value;i.vadd(f.point,i)}}catch(g){s.e(g)}finally{s.f()}i.scale(1/e.model.faces[0].vertices.length,i);var p=new h["s"];p.copy(e.model.faces[0].vertices[1].point),p.sub(i),p.normalize(),p.applyQuaternion(c);var m=new h["n"];return 6==e.model.faces.length?m.setFromAxisAngle(new h["s"](0,1,0),5*Math.PI/4):8==e.model.faces.length&&m.setFromAxisAngle(new h["s"](0,1,0),2*Math.PI/3),m.multiply((new h["n"]).setFromUnitVectors(p,new h["s"](0,0,1))),m.multiply(c),m.normalize(),a.quaternion.copy(m),o.add(a),{die:e,object:a,position:n,orientation:m,rotation:0}}));function j(t,n){var a,r=new h["r"]((t/e.width-.5)*l.x,(n/e.height-.5)*l.y),o=new h["r"],c=Object(d["a"])(y);try{for(c.s();!(a=c.n()).done;){var i=a.value;if(o.copy(r),o.sub(i.position),o.length()<.5)return i}}catch(s){c.e(s)}finally{c.f()}return null}function M(e,t){var n=u.create(e);w.push(n),o.add(n.object),p.addBody(n.body);var a=ie(t);u.initRoll(n,a),u.update(n)}var O=null;function x(e){O=j(e.offsetX,e.offsetY)}e.addEventListener("mouseenter",x),e.addEventListener("mouseleave",x),e.addEventListener("mousemove",x),e.addEventListener("click",(function(e){var n=j(e.offsetX,e.offsetY);if(null!=n){if(!I){var a,r=Object(d["a"])(w);try{for(r.s();!(a=r.n()).done;){var c=a.value;o.remove(c.object),p.removeBody(c.body)}}catch(i){r.e(i)}finally{r.f()}w.length=0,t.value=null}I=!0,M(n.die,new v["g"](n.object.position.x,5,n.object.position.z))}}));var I=!1;function T(){e.style.cursor=O?"pointer":"default";var n,a=new h["s"](3,1,-3).normalize(),r=Object(d["a"])(y);try{for(r.s();!(n=r.n()).done;){var l=n.value;if(l==O||l.rotation%50!=0){l==O?l.rotation+=1:l.rotation>45||l.rotation<5?l.rotation=0:l.rotation<25?l.rotation-=5:l.rotation+=5,l.rotation%=50;var s=(new h["n"]).setFromAxisAngle(a,l.rotation*Math.PI/25);s.multiply(l.orientation),s.normalize(),l.object.quaternion.copy(s)}else l.object.quaternion.copy(l.orientation);l.object.updateMatrix()}}catch(P){r.e(P)}finally{r.f()}if(I){p.step(1/60);var b,j=Object(d["a"])(w);try{for(j.s();!(b=j.n()).done;){var M=b.value;u.update(M),u.resolve(M)&&(M.body.type=v["a"].STATIC)}}catch(P){j.e(P)}finally{j.f()}var x,A=[],q=p.contacts.map((function(e){return[e.bi,e.bj]})),_=Math.min(150,40*p.time),S=Object(d["a"])(q);try{var F=function(){var e=Object(f["a"])(x.value,2),t=e[0],n=e[1];if(t==m||n==m)return"continue";if(A.some((function(e){return t==e[0]&&n==e[1]||n==e[0]&&t==e[1]})))return"continue";if(A.push([t,n]),g.includes(t)||g.includes(n)){var a=g.includes(t)?[n,t]:[t,n],r=Object(f["a"])(a,2),o=r[0],c=r[1],i=c.quaternion.vmult(v["g"].UNIT_Z);o.applyForce(i.scale(_))}else{var l=t.position.vsub(n.position).unit();t.applyForce(l.scale(_/2)),n.applyForce(l.scale(-_/2))}};for(S.s();!(x=S.n()).done;)F()}catch(P){S.e(P)}finally{S.f()}I=w.some((function(e){return e.body.type!=v["a"].STATIC})),I||(t.value=w.map((function(e){return e.die.results[e.die.model.faces.indexOf(u.resolve(e))]})))}i.render(o,c),requestAnimationFrame(T)}requestAnimationFrame(T)}var fe={name:"dnd-dice",setup:function(e){var t=Object(a["j"])(null),n=Object(a["j"])(null);return Object(a["l"])(t,(function(e){ue(e,n)})),{canvas:t,results:n}}},de=(n("20b4"),n("9848"),n("6b0d")),ve=n.n(de);const he=ve()(fe,[["render",l],["__scopeId","data-v-d7e17a84"]]);var pe=he,me=Object(a["b"])(pe);me.mount("#app")}});
//# sourceMappingURL=index.a1bbdc50.js.map