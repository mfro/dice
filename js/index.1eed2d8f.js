(function(e){function t(t){for(var a,c,i=t[0],l=t[1],s=t[2],f=0,v=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&v.push(r[c][0]),r[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);u&&u(t);while(v.length)v.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var l=n[i];0!==r[l]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={index:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"033f":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),r=(n("a15b"),n("d3b7"),function(e){return Object(a["i"])("data-v-24ec25aa"),e=e(),Object(a["h"])(),e}),o=r((function(){return Object(a["e"])("span",{class:"fontloader"},"0123456789",-1)})),c={ref:"canvas"},i={key:0,class:"results"};function l(e,t,n,r,l,s){return Object(a["g"])(),Object(a["d"])(a["a"],null,[o,Object(a["e"])("canvas",c,null,512),r.results?(Object(a["g"])(),Object(a["d"])("span",i,[Object(a["f"])(Object(a["k"])(r.results.join(" + "))+" ",1),r.results.length>1?(Object(a["g"])(),Object(a["d"])(a["a"],{key:0},[Object(a["f"])(" = "+Object(a["k"])(r.results.reduce((function(e,t){return e+t}),0)),1)],64)):Object(a["c"])("",!0)])):Object(a["c"])("",!0)],64)}var s,u,f=n("3835"),v=n("b85c"),d=(n("d81d"),n("1bf2"),n("f8c9"),n("4c53"),n("caad"),n("2532"),n("4721"),n("10a2")),m=n("5a89"),p=n("4f96"),h=n("2909"),g=(n("ac1f"),n("5319"),n("c740"),n("4e82"),n("fb6a"),n("cfc3"),n("907a"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("99af"),n("6062"),n("3ca3"),n("ddb0"),n("7db0"),n("1c69")),w="float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}\n\nfloat noise(vec3 p){\n    vec3 a = floor(p);\n    vec3 d = p - a;\n    d = d * d * (3.0 - 2.0 * d);\n\n    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);\n    vec4 k1 = perm(b.xyxy);\n    vec4 k2 = perm(k1.xyxy + b.zzww);\n\n    vec4 c = k2 + a.zzzz;\n    vec4 k3 = perm(c);\n    vec4 k4 = perm(c + 1.0);\n\n    vec4 o1 = fract(k3 * (1.0 / 41.0));\n    vec4 o2 = fract(k4 * (1.0 / 41.0));\n\n    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);\n    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);\n\n    return o4.y * d.y + o4.x * (1.0 - d.y);\n}\n\nfloat ulerp(float x0, float x1, float x) {\n  return (x - x0) * (1.0 / (x1 - x0));\n}\n\nstruct GradientStop { float value; vec3 color; };\n\nvec3 gradient(float value, GradientStop stops[5]) {\n  int index = 0;\n  while (value > stops[index + 1].value) index += 1;\n\n  float v = ulerp(stops[index].value, stops[index + 1].value, value);\n  return mix(stops[index].color, stops[index + 1].color, v);\n}\n\nvec4 mfroColorMap() {\n  float value = noise(mPosition * 2.4);\n\n  vec3 c0 = vec3(0.0, 0.0, 0.0);\n  vec3 c1 = vec3(0.3, 0.3, 0.3);\n  vec3 c2 = vec3(0.4, 0.4, 0.4);\n\n  vec3 color = gradient(value, GradientStop[5] (\n    GradientStop(0.0, c0),\n    GradientStop(0.44, c1),\n    GradientStop(0.5, c2),\n    GradientStop(0.56, c1),\n    GradientStop(1.0, c0)\n  ));\n\n  return vec4(color, 1.0);\n}\n";function b(e){var t=e(),n=e(),a=e();return new d["f"](Math.sqrt(1-t)*Math.sin(2*Math.PI*n),Math.sqrt(1-t)*Math.cos(2*Math.PI*n),Math.sqrt(t)*Math.sin(2*Math.PI*a),Math.sqrt(t)*Math.cos(2*Math.PI*a))}function y(e){return function(t,n){function a(e,t,n,a){var r=e.vsub(n),o=t.vsub(n),c=Math.min(1,Math.max(-1,r.dot(o)/r.length()/o.length())),i=Math.acos(c),l=r.cross(o).dot(a);return l>=0?i:2*Math.PI-i}function r(e,t){var n,r=new d["g"],o=Object(v["a"])(e);try{for(o.s();!(n=o.n()).done;){var c=n.value;r.vadd(c,r)}}catch(l){o.e(l)}finally{o.f()}r.scale(1/e.length,r);var i=e[0];return e.slice().sort((function(e,n){return a(i,e,r,t)-a(i,n,r,t)}))}var o,c=[],i=e.vertices.map((function(e){var n=(new m["i"]).set(e.faces[0].normal.x,e.faces[0].normal.y,e.faces[0].normal.z,e.faces[1].normal.x,e.faces[1].normal.y,e.faces[1].normal.z,e.faces[2].normal.x,e.faces[2].normal.y,e.faces[2].normal.z);n.invert();var a=new m["w"](-t,-t,-t),r=a.applyMatrix3(n),o=new d["g"](r.x,r.y,r.z);return Object(g["a"])(e.faces.every((function(e){return Math.abs(e.normal.dot(o)+t)<1e-6})),"rounding"),e.point.vadd(o)})),l=Object(v["a"])(e.edges);try{for(l.s();!(o=l.n()).done;)for(var s=o.value,u=i[e.vertices.indexOf(s.vertices[0])],p=i[e.vertices.indexOf(s.vertices[1])],h=(new d["f"]).setFromVectors(s.faces[0].normal,s.faces[0].normal),w=(new d["f"]).setFromVectors(s.faces[0].normal,s.faces[1].normal),b=new d["f"],y=h.vmult(d["g"].UNIT_X),x=w.vmult(d["g"].UNIT_X),j=(Math.acos(y.dot(x)),u.vsub(p).length(),function(e){h.slerp(w,e/n,b);var a=u.vadd(b.vmult(s.faces[0].normal.scale(t))),r=p.vadd(b.vmult(s.faces[0].normal.scale(t))),o=b.vmult(s.faces[0].normal);h.slerp(w,(e+1)/n,b);var i=u.vadd(b.vmult(s.faces[0].normal.scale(t))),l=p.vadd(b.vmult(s.faces[0].normal.scale(t))),f=b.vmult(s.faces[0].normal);h.slerp(w,(e+.5)/n,b);var v=b.vmult(s.faces[0].normal),d=[a,r,l,i],g=[o,o,f,f],y=r.vsub(a).cross(i.vsub(a));y.dot(v)<0&&(d.reverse(),g.reverse()),c.push(d.map((function(e,t){return[e,g[t],new m["v"]]})))}),M=0;M<n;++M)j(M)}catch(E){l.e(E)}finally{l.f()}for(var O=function(n){var a,o=e.faces[n].vertices.map((function(a){return i[e.vertices.indexOf(a)].vadd(e.faces[n].normal.scale(t))})),l=r(o,e.faces[n].normal),s=new d["g"],u=Object(v["a"])(l);try{for(u.s();!(a=u.n()).done;){var f=a.value;s.vadd(f,s)}}catch(E){u.e(E)}finally{u.f()}s.scale(1/l.length,s);var p,h=l[1].vsub(s).unit(),g=h.cross(e.faces[n].normal),w=l.map((function(e){var t=e.vsub(s),n=t.dot(g),a=t.dot(h);return[e,new m["v"](n,a)]})),b=w.reduce((function(e,t){return new m["v"](Math.min(e.x,t[1].x),Math.min(e.y,t[1].y))}),new m["v"]),y=w.reduce((function(e,t){return new m["v"](Math.max(e.x,t[1].x),Math.max(e.y,t[1].y))}),new m["v"]),x=Math.max(-b.x,-b.y,y.x,y.y),j=Object(v["a"])(w);try{for(j.s();!(p=j.n()).done;){var M=p.value;M[1].multiplyScalar(1/x),M[1].x=(M[1].x/2+.5+n)/e.faces.length,M[1].y=M[1].y/2+.5}}catch(E){j.e(E)}finally{j.f()}c.push(w.map((function(t){return[t[0],e.faces[n].normal,t[1]]})))},I=0;I<e.faces.length;++I)O(I);for(var T=[],S=[],A=[],_=[],q=0;q<c.length;++q){var C,P=S.length/3,z=Object(v["a"])(c[q]);try{for(z.s();!(C=z.n()).done;){var U=Object(f["a"])(C.value,3),F=U[0],N=U[1],k=U[2];S.push(F.x,F.y,F.z),T.push(k.x,k.y),A.push(N.x,N.y,N.z)}}catch(E){z.e(E)}finally{z.f()}_.push(P,P+1,P+2),c[q].length>=4&&_.push(P+2,P+3,P+0),c[q].length>=5&&_.push(P+3,P+4,P+0)}var V=[],R=new m["c"];R.setAttribute("position",new m["b"](new Float32Array(S),3)),R.setAttribute("normal",new m["b"](new Float32Array(A),3)),R.setAttribute("uv",new m["b"](new Float32Array(T),2)),R.setIndex(_),V.push(R);var Y,Z=Object(v["a"])(i);try{for(Z.s();!(Y=Z.n()).done;){var B=Y.value,G=new m["s"](t);G.translate(B.x,B.y,B.z);var X=new m["j"];X.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),G.attributes.uv.applyMatrix4(X),V.push(G)}}catch(E){Z.e(E)}finally{Z.f()}return V}}function x(e){return new d["c"]({vertices:e.vertices.map((function(e){return e.point})),normals:e.faces.map((function(e){return e.normal})),faces:e.faces.map((function(t){return t.vertices.map((function(t){return e.vertices.indexOf(t)}))}))})}function j(e,t){for(var n=t(1),a=Object(p["a"])(n),r=a[0],o=a.slice(1),c=[],i=[],l=[],u=0;u<r.length;++u){var m={point:r[u],edges:[],faces:[]};c.push(m);for(var w=function(e){var t=c[e],n=m.point.vsub(t.point);if(o.some((function(e){return Math.abs(e-n.length())<1e-6}))){var a={vertices:[m,t],faces:[]};m.edges.push(a),t.edges.push(a),i.push(a)}},b=0;b<u;++b)w(b)}function y(e,t,n){var a=[],r=[[t,[]]];while(r.length>0){var o,c=r.pop(),i=Object(f["a"])(c,2),l=i[0],u=i[1],d=Object(v["a"])(l.edges);try{for(d.s();!(o=d.n()).done;){var m=o.value,p=s.otherVertex(m,l);u.includes(m)||(p==e?a.push([].concat(Object(h["a"])(u),[m])):u.length+1<n&&r.push([p,[].concat(Object(h["a"])(u),[m])]))}}catch(g){d.e(g)}finally{d.f()}}return a}for(var x=2*i.length/e,j=[],M=0,O=c;M<O.length;M++){var I=O[M];j.push.apply(j,Object(h["a"])(y(I,I,x)))}for(var T=function(){var e,t=A[S],n=new Set,a=Object(v["a"])(t);try{for(a.s();!(e=a.n()).done;){var r,o=e.value,c=Object(v["a"])(o.vertices);try{for(c.s();!(r=c.n()).done;){var i=r.value;n.add(i)}}catch(I){c.e(I)}finally{c.f()}}}catch(I){a.e(I)}finally{a.f()}var s=Object(h["a"])(n),u=s[1].point.vsub(s[0].point).cross(s[2].point.vsub(s[0].point)).unit();if(l.find((function(e){return e.normal.almostEquals(u)})))return"continue";var f,m=new d["g"],p=Object(v["a"])(s);try{for(p.s();!(f=p.n()).done;){var g=f.value;m.vadd(g.point,m)}}catch(I){p.e(I)}finally{p.f()}if(m.scale(1/s.length,m),m.dot(u)<0)return"continue";var w,b={normal:u,edges:t,vertices:s},y=Object(v["a"])(s);try{for(y.s();!(w=y.n()).done;){var x=w.value;x.faces.push(b)}}catch(I){y.e(I)}finally{y.f()}var j,M=Object(v["a"])(t);try{for(M.s();!(j=M.n()).done;){var O=j.value;O.faces.push(b)}}catch(I){M.e(I)}finally{M.f()}l.push(b)},S=0,A=j;S<A.length;S++)T();return Object(g["a"])(i.every((function(e){return 2==e.faces.length})),"valid die"),{vertices:c,edges:i,faces:l}}function M(e,t){return function(){var n=document.createElement("canvas");n.width=512*e.faces.length,n.height=512;var a=n.getContext("2d");Object(g["a"])(null!=a,"context"),a.clearRect(0,0,512*e.faces.length,512),a.fillStyle="#eee",a.textAlign="center",a.textBaseline="middle",t(a,(function(e,t,n,r){a.translate(256+512*t,256),a.rotate(n*Math.PI),a.translate(0,r),a.fillText(e,0,0),a.resetTransform()}));var r=new m["d"](n);return r}}function O(e,t,n,a,r){return function(o,c){var i=n(),l=a(o,c);return{model:e,shape:t,texture:i,geometry:l,results:r}}}(function(e){function t(e,t){return e.vertices[1]==t?e.vertices[0]:e.vertices[1]}e.otherVertex=t})(s||(s={})),function(e){function t(e){var t=new m["l"]({map:e.texture,visible:!0,roughness:.5,metalness:.1,reflectivity:1});t.onBeforeCompile=function(e,t){e.vertexShader="varying vec3 mPosition;\n"+e.vertexShader,e.fragmentShader="varying vec3 mPosition;\n"+w+e.fragmentShader,e.vertexShader=e.vertexShader.replace("void main() {","void main() {\n  mPosition = position;"),e.fragmentShader=e.fragmentShader.replace("#include <map_fragment>","vec4 texelColor = texture2D( map, vUv ); texelColor = mapTexelToLinear( texelColor ); vec4 mfroColor = mfroColorMap(); diffuseColor.a = texelColor.a + mfroColor.a * (1.0 - texelColor.a); diffuseColor.rgb = (mfroColor.rgb * (1.0 - texelColor.a) + texelColor.rgb * texelColor.a) / diffuseColor.a;")};var n=new m["g"];return n.add.apply(n,Object(h["a"])(e.geometry.map((function(e){var n=new m["k"](e,t);return n.castShadow=!0,n})))),n}function n(e){return new d["a"]({mass:1,shape:e.shape})}function a(e){var a=n(e),r=t(e);return{die:e,body:a,object:r}}function r(e,t){e.body.position=t.position.clone(),e.body.quaternion=t.orientation.clone(),e.body.velocity=t.velocity.clone(),e.body.angularVelocity=t.angularVelocity.clone()}function o(e){e.object.position.set(e.body.position.x,e.body.position.y,e.body.position.z),e.object.quaternion.set(e.body.quaternion.x,e.body.quaternion.y,e.body.quaternion.z,e.body.quaternion.w)}function c(e){var t=e.body.angularVelocity.lengthSquared(),n=e.body.velocity.lengthSquared(),a=e.die.model.faces.findIndex((function(t){return e.body.quaternion.vmult(t.normal).dot(d["g"].UNIT_Y)<-.99}));return(e.body.type==d["a"].STATIC||t<1e-4&&n<1e-4)&&void 0!==a?e.die.results[a]:null}e.createObject=t,e.createBody=n,e.create=a,e.initRoll=r,e.update=o,e.resolve=c}(u||(u={}));var I=j(4,(function(e){var t=20*e/16,n=(new d["f"]).setFromAxisAngle(d["g"].UNIT_Z,-Math.acos(-1/3)),a=(new d["f"]).setFromAxisAngle(d["g"].UNIT_Y,2*Math.PI/3).mult(n),r=(new d["f"]).setFromAxisAngle(d["g"].UNIT_Y,2*-Math.PI/3).mult(n),o=d["g"].UNIT_Y.scale(t*Math.sqrt(6)/4),c=[o,n.vmult(o),a.vmult(o),r.vmult(o)];return[c,t]})),T=x(I),S=M(I,(function(e,t){e.font="bold 130px Roboto",t("1",0,0,-125),t("2",0,2/3,-125),t("3",0,4/3,-125),t("1",1,0,-125),t("4",1,4/3,-125),t("3",1,2/3,-125),t("1",2,0,-125),t("4",2,2/3,-125),t("2",2,4/3,-125),t("4",3,0,-125),t("2",3,4/3,-125),t("3",3,2/3,-125)})),A=y(I),_=[4,2,3,1],q=O(I,T,S,A,_),C=j(6,(function(e){for(var t=e,n=[],a=0;a<8;++a)n.push(new d["g"](1&a?t/2:-t/2,2&a?t/2:-t/2,4&a?t/2:-t/2));return[n,t]})),P=x(C),z=M(C,(function(e,t){e.font="bold 240px Roboto",t("1",0,3/4,20),t("2",2,1/4,20),t("3",1,7/4,20),t("4",3,1/4,20),t("5",5,7/4,20),t("6",4,1/4,20)})),U=y(C),F=[6,4,5,3,1,2],N=O(C,P,z,U,F),k=j(8,(function(e){var t=18.5*e/16,n=t/Math.SQRT2,a=[new d["g"](+n,0,0),new d["g"](-n,0,0),new d["g"](0,+n,0),new d["g"](0,-n,0),new d["g"](0,0,+n),new d["g"](0,0,-n)];return[a,t]})),V=x(k),R=M(k,(function(e,t){e.font="bold 200px Roboto",t("1",0,4/3,0),t("2",1,4/3,0),t("3",2,2/3,0),t("4",3,2/3,0),t("5",5,4/3,0),t("6",4,4/3,0),t("7",6,2/3,0),t("8",7,2/3,0)})),Y=y(k),Z=[8,7,6,5,3,4,2,1],B=O(k,V,R,Y,Z),G=j(10,(function(e){var t=e,n=2*Math.PI/5,a=.27*Math.PI,r=Math.sin(a)*t,o=Math.cos(a)*t,c=Math.cos(n/2)*r,i=Math.atan(c/o),l=Math.PI-a-i,s=t/Math.sin(i),u=s*Math.sin(l),f=Math.sqrt(u*u/4+t*t-u*t*Math.cos(a)),v=Math.asin(t*Math.sin(a)/f),m=Math.PI/2-v,p=(new d["f"]).setFromAxisAngle(d["g"].UNIT_Y,n),h=(new d["f"]).setFromAxisAngle(d["g"].UNIT_Z,m),g=d["g"].UNIT_Y.scale(u/2),w=d["g"].UNIT_X.scale(f),b=[g,h.vmult(w),p.vmult(h.vmult(w)),p.vmult(p.vmult(h.vmult(w))),p.vmult(p.vmult(p.vmult(h.vmult(w)))),p.vmult(p.vmult(p.vmult(p.vmult(h.vmult(w))))),g.negate(),h.vmult(w.negate()),p.vmult(h.vmult(w.negate())),p.vmult(p.vmult(h.vmult(w.negate()))),p.vmult(p.vmult(p.vmult(h.vmult(w.negate())))),p.vmult(p.vmult(p.vmult(p.vmult(h.vmult(w.negate())))))];return[b,b[1].vsub(b[0]).length(),b[7].vsub(b[3]).length()]})),X=x(G),E=M(G,(function(e,t){e.font="bold 160px Roboto",t("1",0,0,0),t("2",8,1,0),t("3",4,0,0),t("4",5,1,0),t("5",2,0,0),t("6",9,1,0),t("7",1,0,0),t("8",7,1,0),t("9",3,0,0),t("10",6,1,0)})),L=y(G),J=[10,4,6,2,8,7,1,3,9,5],Q=O(G,X,E,L,J),D=j(12,(function(e){for(var t=.5*e,n=(1+Math.sqrt(5))/2,a=[new d["g"](1,1,1),new d["g"](-1,1,1),new d["g"](1,-1,1),new d["g"](1,1,-1),new d["g"](-1,-1,1),new d["g"](1,-1,-1),new d["g"](-1,1,-1),new d["g"](-1,-1,-1),new d["g"](0,n,1/n),new d["g"](0,-n,1/n),new d["g"](0,n,-1/n),new d["g"](0,-n,-1/n),new d["g"](1/n,0,n),new d["g"](1/n,0,-n),new d["g"](-1/n,0,n),new d["g"](-1/n,0,-n),new d["g"](n,1/n,0),new d["g"](-n,1/n,0),new d["g"](n,-1/n,0),new d["g"](-n,-1/n,0)],r=0,o=a;r<o.length;r++){var c=o[r];c.scale(t*n/2,c)}return[a,t]})),K=x(D),H=y(D),W=M(D,(function(e,t){e.font="bold 240px Roboto",t("1",0,0,20),t("2",2,1.6,20),t("3",1,.4,20),t("4",7,0,20),t("5",6,1.2,20),t("6",5,1.2,20),t("7",3,1.6,20),t("8",8,1.6,20),t("9",4,.8,20),t("10",10,.8,20),t("11",9,1.6,20),t("12",11,1.2,20)})),$=[12,10,11,6,4,7,8,9,5,2,3,1],ee=O(D,K,W,H,$),te=j(20,(function(e){for(var t=.8*e,n=(1+Math.sqrt(5))/2,a=[new d["g"](0,1,n),new d["g"](0,-1,n),new d["g"](0,1,-n),new d["g"](0,-1,-n),new d["g"](1,n,0),new d["g"](-1,n,0),new d["g"](1,-n,0),new d["g"](-1,-n,0),new d["g"](n,0,1),new d["g"](n,0,-1),new d["g"](-n,0,1),new d["g"](-n,0,-1)],r=0,o=a;r<o.length;r++){var c=o[r];c.scale(t/2,c)}return[a,20,t]})),ne=x(te),ae=y(te),re=M(te,(function(e,t){e.font="bold 180px Roboto",t("1",0,0,35),t("2",12,0,35),t("3",1,2/3,35),t("4",13,2/3,35),t("5",10,0,35),t("6",7,0,35),t("7",2,4/3,35),t("8",18,2/3,35),t("9",6,2/3,35),t("10",16,0,35),t("11",19,0,35),t("12",9,4/3,35),t("13",17,4/3,35),t("14",14,2/3,35),t("15",11,0,35),t("16",5,0,35),t("17",3,4/3,35),t("18",8,2/3,35),t("19",4,2/3,35),t("20",15,0,35)})),oe=[20,18,14,4,2,5,12,15,3,9,16,6,19,17,7,1,11,8,13,10],ce=O(te,ne,re,ae,oe);function ie(){return{d4:q(.05,5),d6:N(.09,5),d8:B(.09,5),d10:Q(.09,5),d12:ee(.09,5),d20:ce(.09,5)}}function le(e){var t=b(Math.random),n=Math.random()*Math.PI*2,a=new d["g"](Math.cos(n),0,Math.sin(n)).scale(3).vadd(new d["g"](8,0,0)),r=b(Math.random),o=r.vmult(d["g"].UNIT_Y.scale(30));return{position:e,orientation:t,velocity:a,angularVelocity:o}}function se(e){var t=new m["q"],n=new m["m"](-e.width/300,e.width/300,e.height/300,-e.height/300);n.position.set(0,100,0),n.lookAt(0,0,0);var a=new m["x"]({canvas:e,alpha:!0,antialias:!0});a.shadowMap.enabled=!0,a.shadowMap.type=m["n"];var r=new m["a"](16777215,.4);t.add(r);var o=Math.sqrt(n.right*n.right+n.top*n.top),c=new m["e"](16777215,.6);c.position.set(2,4,-1),c.shadow.mapSize.width=4*e.width,c.shadow.mapSize.height=4*e.height,c.shadow.camera.near=-2*o,c.shadow.camera.far=2*o,c.shadow.camera.top=o,c.shadow.camera.bottom=-o,c.shadow.camera.left=-o,c.shadow.camera.right=o,c.castShadow=!0,t.add(c);var i=new m["o"](2*n.right,2*n.top),l=new m["r"]({opacity:.5}),s=new m["k"](i,l);return s.rotateX(-Math.PI/2),s.castShadow=!1,s.receiveShadow=!0,t.add(s),{scene:t,camera:n,renderer:a}}function ue(e){var t=new d["h"]({gravity:new d["g"](0,-30,0)}),n=new d["d"],a=new d["d"],r=new d["a"]({type:d["a"].STATIC,shape:new d["e"],position:new d["g"](0,0,0),quaternion:(new d["f"]).setFromVectors(d["g"].UNIT_Z,d["g"].UNIT_Y),material:a}),o=[new d["a"]({type:d["a"].STATIC,shape:new d["e"],position:new d["g"](-e.x/2,0,0),quaternion:(new d["f"]).setFromVectors(d["g"].UNIT_Z,d["g"].UNIT_X),material:n}),new d["a"]({type:d["a"].STATIC,shape:new d["e"],position:new d["g"](+e.x/2,0,0),quaternion:(new d["f"]).setFromVectors(d["g"].UNIT_Z,d["g"].UNIT_X.negate()),material:n}),new d["a"]({type:d["a"].STATIC,shape:new d["e"],position:new d["g"](0,0,-e.y/2),quaternion:(new d["f"]).setFromVectors(d["g"].UNIT_Z,d["g"].UNIT_Z),material:n}),new d["a"]({type:d["a"].STATIC,shape:new d["e"],position:new d["g"](0,0,+e.y/2),quaternion:(new d["f"]).setFromVectors(d["g"].UNIT_Z,d["g"].UNIT_Z.negate()),material:n})];t.addBody(r);for(var c=0,i=o;c<i.length;c++){var l=i[c];t.addBody(l)}return t.addContactMaterial(new d["b"](t.defaultMaterial,n,{friction:0})),t.addContactMaterial(new d["b"](t.defaultMaterial,a,{friction:.04})),t.addContactMaterial(new d["b"](t.defaultMaterial,t.defaultMaterial,{friction:0})),{world:t,walls:o,floor:r}}function fe(e,t){var n=ie(),a=e.getBoundingClientRect();e.width=a.width,e.height=a.height;var r=se(e),o=r.scene,c=r.camera,i=r.renderer,l=new m["v"](2*c.right,2*c.top),s=ue(l),p=s.world,h=s.floor,g=s.walls,w=[],b=Reflect.ownKeys(n).map((function(e){return n[e]})),y=b.map((function(e,t){var n=new m["v"](-l.x/2+.5,1*(t+.5-b.length/2)),a=u.createObject(e);a.position.set(n.x,10,n.y),a.scale.set(.6,.6,.6);var r,c=(new m["p"]).setFromUnitVectors(new m["w"](e.model.faces[0].normal.x,e.model.faces[0].normal.y,e.model.faces[0].normal.z),new m["w"](0,-1,0)),i=new d["g"],s=Object(v["a"])(e.model.faces[0].vertices);try{for(s.s();!(r=s.n()).done;){var f=r.value;i.vadd(f.point,i)}}catch(g){s.e(g)}finally{s.f()}i.scale(1/e.model.faces[0].vertices.length,i);var p=new m["w"];p.copy(e.model.faces[0].vertices[1].point),p.sub(i),p.normalize(),p.applyQuaternion(c);var h=new m["p"];return 6==e.model.faces.length?h.setFromAxisAngle(new m["w"](0,1,0),5*Math.PI/4):8==e.model.faces.length&&h.setFromAxisAngle(new m["w"](0,1,0),2*Math.PI/3),h.multiply((new m["p"]).setFromUnitVectors(p,new m["w"](0,0,1))),h.multiply(c),h.normalize(),a.quaternion.copy(h),o.add(a),{die:e,object:a,position:n,orientation:h,rotation:0}}));function x(t,n){var a,r=new m["v"]((t/e.width-.5)*l.x,(n/e.height-.5)*l.y),o=new m["v"],c=Object(v["a"])(y);try{for(c.s();!(a=c.n()).done;){var i=a.value;if(o.copy(r),o.sub(i.position),o.length()<.5)return i}}catch(s){c.e(s)}finally{c.f()}return null}function j(e,t){var n=u.create(e);w.push(n),o.add(n.object),p.addBody(n.body);var a=le(t);u.initRoll(n,a),u.update(n)}var M=null;function O(e){M=x(e.offsetX,e.offsetY)}e.addEventListener("mouseenter",O),e.addEventListener("mouseleave",O),e.addEventListener("mousemove",O),e.addEventListener("click",(function(e){var n=x(e.offsetX,e.offsetY);if(null!=n){if(!I){var a,r=Object(v["a"])(w);try{for(r.s();!(a=r.n()).done;){var c=a.value;o.remove(c.object),p.removeBody(c.body)}}catch(i){r.e(i)}finally{r.f()}w.length=0,t.value=null}I=!0,j(n.die,new d["g"](n.object.position.x,5,n.object.position.z))}}));var I=!1;function T(){e.style.cursor=M?"pointer":"default";var n,a=new m["w"](3,1,-3).normalize(),r=Object(v["a"])(y);try{for(r.s();!(n=r.n()).done;){var l=n.value;if(l==M||l.rotation%50!=0){l==M?l.rotation+=1:l.rotation>45||l.rotation<5?l.rotation=0:l.rotation<25?l.rotation-=5:l.rotation+=5,l.rotation%=50;var s=(new m["p"]).setFromAxisAngle(a,l.rotation*Math.PI/25);s.multiply(l.orientation),s.normalize(),l.object.quaternion.copy(s)}else l.object.quaternion.copy(l.orientation);l.object.updateMatrix()}}catch(P){r.e(P)}finally{r.f()}if(I){p.step(1/60);var b,x=Object(v["a"])(w);try{for(x.s();!(b=x.n()).done;){var j=b.value;u.update(j),u.resolve(j)&&(j.body.type=d["a"].STATIC)}}catch(P){x.e(P)}finally{x.f()}var O,S=[],A=p.contacts.map((function(e){return[e.bi,e.bj]})),_=Math.min(150,40*p.time),q=Object(v["a"])(A);try{var C=function(){var e=Object(f["a"])(O.value,2),t=e[0],n=e[1];if(t==h||n==h)return"continue";if(S.some((function(e){return t==e[0]&&n==e[1]||n==e[0]&&t==e[1]})))return"continue";if(S.push([t,n]),g.includes(t)||g.includes(n)){var a=g.includes(t)?[n,t]:[t,n],r=Object(f["a"])(a,2),o=r[0],c=r[1],i=c.quaternion.vmult(d["g"].UNIT_Z);o.applyForce(i.scale(_))}else{var l=t.position.vsub(n.position).unit();t.applyForce(l.scale(_/2)),n.applyForce(l.scale(-_/2))}};for(q.s();!(O=q.n()).done;)C()}catch(P){q.e(P)}finally{q.f()}I=w.some((function(e){return e.body.type!=d["a"].STATIC})),I||(t.value=w.map((function(e){return u.resolve(e)})))}i.render(o,c),requestAnimationFrame(T)}requestAnimationFrame(T)}var ve={name:"dnd-dice",setup:function(e){var t=Object(a["j"])(null),n=Object(a["j"])("complete"==document.readyState),r=Object(a["j"])(null);return n.value||window.addEventListener("load",(function(){return n.value=!0})),Object(a["l"])([t,n],(function(e){var t=Object(f["a"])(e,2),n=t[0],a=t[1];a&&n&&fe(n,r)})),{canvas:t,results:r}}},de=(n("f2d9"),n("e643"),n("6b0d")),me=n.n(de);const pe=me()(ve,[["render",l],["__scopeId","data-v-24ec25aa"]]);var he=pe,ge=Object(a["b"])(he);ge.mount("#app")},e643:function(e,t,n){"use strict";n("033f")},f1e2:function(e,t,n){},f2d9:function(e,t,n){"use strict";n("f1e2")}});
//# sourceMappingURL=index.1eed2d8f.js.map