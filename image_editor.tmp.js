/**
 * KineticJS JavaScript Framework v4.3.2
 * http://www.kineticjs.com/
 * Copyright 2013, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Jan 30 2013
 *
 * Copyright (C) 2011 - 2013 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Kinetic={};(function(){Kinetic.version="4.3.2",Kinetic.Filters={},Kinetic.Plugins={},Kinetic.Global={stages:[],idCounter:0,ids:{},names:{},shapes:{},warn:function(a){window.console&&console.warn&&console.warn("Kinetic warning: "+a)},extend:function(a,b){for(var c in b.prototype)c in a.prototype||(a.prototype[c]=b.prototype[c])},_addId:function(a,b){b!==undefined&&(this.ids[b]=a)},_removeId:function(a){a!==undefined&&delete this.ids[a]},_addName:function(a,b){b!==undefined&&(this.names[b]===undefined&&(this.names[b]=[]),this.names[b].push(a))},_removeName:function(a,b){if(a!==undefined){var c=this.names[a];if(c!==undefined){for(var d=0;d<c.length;d++){var e=c[d];e._id===b&&c.splice(d,1)}c.length===0&&delete this.names[a]}}}}})(),function(a,b){typeof exports=="object"?module.exports=b():typeof define=="function"&&define.amd?define(b):a.returnExports=b()}(this,function(){return Kinetic}),function(){Kinetic.Type={_isElement:function(a){return!!a&&a.nodeType==1},_isFunction:function(a){return!!(a&&a.constructor&&a.call&&a.apply)},_isObject:function(a){return!!a&&a.constructor==Object},_isArray:function(a){return Object.prototype.toString.call(a)=="[object Array]"},_isNumber:function(a){return Object.prototype.toString.call(a)=="[object Number]"},_isString:function(a){return Object.prototype.toString.call(a)=="[object String]"},_hasMethods:function(a){var b=[];for(var c in a)this._isFunction(a[c])&&b.push(c);return b.length>0},_isInDocument:function(a){while(a=a.parentNode)if(a==document)return!0;return!1},_getXY:function(a){if(this._isNumber(a))return{x:a,y:a};if(this._isArray(a)){if(a.length===1){var b=a[0];if(this._isNumber(b))return{x:b,y:b};if(this._isArray(b))return{x:b[0],y:b[1]};if(this._isObject(b))return b}else if(a.length>=2)return{x:a[0],y:a[1]}}else if(this._isObject(a))return a;return null},_getSize:function(a){if(this._isNumber(a))return{width:a,height:a};if(this._isArray(a))if(a.length===1){var b=a[0];if(this._isNumber(b))return{width:b,height:b};if(this._isArray(b)){if(b.length>=4)return{width:b[2],height:b[3]};if(b.length>=2)return{width:b[0],height:b[1]}}else if(this._isObject(b))return b}else{if(a.length>=4)return{width:a[2],height:a[3]};if(a.length>=2)return{width:a[0],height:a[1]}}else if(this._isObject(a))return a;return null},_getPoints:function(a){if(a===undefined)return[];if(this._isArray(a[0])){var b=[];for(var c=0;c<a.length;c++)b.push({x:a[c][0],y:a[c][1]});return b}if(this._isObject(a[0]))return a;var b=[];for(var c=0;c<a.length;c+=2)b.push({x:a[c],y:a[c+1]});return b},_getImage:function(a,b){if(!a)b(null);else if(this._isElement(a))b(a);else if(this._isString(a)){var c=new Image;c.onload=function(){b(c)},c.src=a}else if(a.data){var d=document.createElement("canvas");d.width=a.width,d.height=a.height;var e=d.getContext("2d");e.putImageData(a,0,0);var f=d.toDataURL(),c=new Image;c.onload=function(){b(c)},c.src=f}else b(null)},_rgbToHex:function(a,b,c){return((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)},_hexToRgb:function(a){var b=parseInt(a,16);return{r:b>>16&255,g:b>>8&255,b:b&255}},_getRandomColorKey:function(){var a=Math.round(Math.random()*255),b=Math.round(Math.random()*255),c=Math.round(Math.random()*255);return this._rgbToHex(a,b,c)},_merge:function(a,b){var c=this._clone(b);for(var d in a)this._isObject(a[d])?c[d]=this._merge(a[d],c[d]):c[d]=a[d];return c},_clone:function(a){var b={};for(var c in a)this._isObject(a[c])?b[c]=this._clone(a[c]):b[c]=a[c];return b},_degToRad:function(a){return a*Math.PI/180},_radToDeg:function(a){return a*180/Math.PI}}}(),function(){Kinetic.Canvas=function(a,b){this.width=a,this.height=b,this.element=document.createElement("canvas"),this.context=this.element.getContext("2d"),this.setSize(a||0,b||0)};var a=document.createElement("canvas"),b=a.getContext("2d"),c=window.devicePixelRatio||1,d=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1;Kinetic.Canvas.pixelRatio=c/d,Kinetic.Canvas.prototype={clear:function(){var a=this.getContext(),b=this.getElement();a.clearRect(0,0,b.width,b.height)},getElement:function(){return this.element},getContext:function(){return this.context},setWidth:function(a){this.width=a,this.element.width=a*Kinetic.Canvas.pixelRatio,this.element.style.width=a+"px"},setHeight:function(a){this.height=a,this.element.height=a*Kinetic.Canvas.pixelRatio,this.element.style.height=a+"px"},getWidth:function(){return this.width},getHeight:function(){return this.height},setSize:function(a,b){this.setWidth(a),this.setHeight(b)},toDataURL:function(a,b){try{return this.element.toDataURL(a,b)}catch(c){try{return this.element.toDataURL()}catch(c){return Kinetic.Global.warn("Unable to get data URL. "+c.message),""}}},fill:function(a){a.getFillEnabled()&&this._fill(a)},stroke:function(a){a.getStrokeEnabled()&&this._stroke(a)},fillStroke:function(a){var b=a.getFillEnabled();b&&this._fill(a),a.getStrokeEnabled()&&this._stroke(a,a.hasShadow()&&a.hasFill()&&b)},applyShadow:function(a,b){var c=this.context;c.save(),this._applyShadow(a),b(),c.restore(),b()},_applyLineCap:function(a){var b=a.getLineCap();b&&(this.context.lineCap=b)},_applyOpacity:function(a){var b=a.getAbsoluteOpacity();b!==1&&(this.context.globalAlpha=b)},_applyLineJoin:function(a){var b=a.getLineJoin();b&&(this.context.lineJoin=b)},_handlePixelRatio:function(){var a=Kinetic.Canvas.pixelRatio;a!==1&&this.getContext().scale(a,a)},_counterPixelRatio:function(){var a=Kinetic.Canvas.pixelRatio;a!==1&&(a=1/a,this.getContext().scale(a,a))},_applyAncestorTransforms:function(a){var b=this.context;a._eachAncestorReverse(function(a){var c=a.getTransform(),d=c.getMatrix();b.transform(d[0],d[1],d[2],d[3],d[4],d[5])},!0)}},Kinetic.SceneCanvas=function(a,b){Kinetic.Canvas.call(this,a,b)},Kinetic.SceneCanvas.prototype={_fillColor:function(a){var b=this.context,c=a.getFill();b.fillStyle=c,a._fillFunc(b)},_fillPattern:function(a){var b=this.context,c=a.getFillPatternImage(),d=a.getFillPatternX(),e=a.getFillPatternY(),f=a.getFillPatternScale(),g=a.getFillPatternRotation(),h=a.getFillPatternOffset(),i=a.getFillPatternRepeat();(d||e)&&b.translate(d||0,e||0),g&&b.rotate(g),f&&b.scale(f.x,f.y),h&&b.translate(-1*h.x,-1*h.y),b.fillStyle=b.createPattern(c,i||"repeat"),b.fill()},_fillLinearGradient:function(a){var b=this.context,c=a.getFillLinearGradientStartPoint(),d=a.getFillLinearGradientEndPoint(),e=a.getFillLinearGradientColorStops(),f=b.createLinearGradient(c.x,c.y,d.x,d.y);for(var g=0;g<e.length;g+=2)f.addColorStop(e[g],e[g+1]);b.fillStyle=f,b.fill()},_fillRadialGradient:function(a){var b=this.context,c=a.getFillRadialGradientStartPoint(),d=a.getFillRadialGradientEndPoint(),e=a.getFillRadialGradientStartRadius(),f=a.getFillRadialGradientEndRadius(),g=a.getFillRadialGradientColorStops(),h=b.createRadialGradient(c.x,c.y,e,d.x,d.y,f);for(var i=0;i<g.length;i+=2)h.addColorStop(g[i],g[i+1]);b.fillStyle=h,b.fill()},_fill:function(a,b){var c=this.context,d=a.getFill(),e=a.getFillPatternImage(),f=a.getFillLinearGradientStartPoint(),g=a.getFillRadialGradientStartPoint(),h=a.getFillPriority();c.save(),!b&&a.hasShadow()&&this._applyShadow(a),d&&h==="color"?this._fillColor(a):e&&h==="pattern"?this._fillPattern(a):f&&h==="linear-gradient"?this._fillLinearGradient(a):g&&h==="radial-gradient"?this._fillRadialGradient(a):d?this._fillColor(a):e?this._fillPattern(a):f?this._fillLinearGradient(a):g&&this._fillRadialGradient(a),c.restore(),!b&&a.hasShadow()&&this._fill(a,!0)},_stroke:function(a,b){var c=this.context,d=a.getStroke(),e=a.getStrokeWidth(),f=a.getDashArray();if(d||e)c.save(),this._applyLineCap(a),f&&a.getDashArrayEnabled()&&(c.setLineDash?c.setLineDash(f):"mozDash"in c?c.mozDash=f:"webkitLineDash"in c&&(c.webkitLineDash=f)),!b&&a.hasShadow()&&this._applyShadow(a),c.lineWidth=e||2,c.strokeStyle=d||"black",a._strokeFunc(c),c.restore(),!b&&a.hasShadow()&&this._stroke(a,!0)},_applyShadow:function(a){var b=this.context;if(a.hasShadow()&&a.getShadowEnabled()){var c=a.getAbsoluteOpacity(),d=a.getShadowColor()||"black",e=a.getShadowBlur()||5,f=a.getShadowOffset()||{x:0,y:0};a.getShadowOpacity()&&(b.globalAlpha=a.getShadowOpacity()*c),b.shadowColor=d,b.shadowBlur=e,b.shadowOffsetX=f.x,b.shadowOffsetY=f.y}}},Kinetic.Global.extend(Kinetic.SceneCanvas,Kinetic.Canvas),Kinetic.HitCanvas=function(a,b){Kinetic.Canvas.call(this,a,b)},Kinetic.HitCanvas.prototype={_fill:function(a){var b=this.context;b.save(),b.fillStyle="#"+a.colorKey,a._fillFunc(b),b.restore()},_stroke:function(a){var b=this.context,c=a.getStroke(),d=a.getStrokeWidth();if(c||d)this._applyLineCap(a),b.save(),b.lineWidth=d||2,b.strokeStyle="#"+a.colorKey,a._strokeFunc(b),b.restore()}},Kinetic.Global.extend(Kinetic.HitCanvas,Kinetic.Canvas)}(),function(){Kinetic.Tween=function(a,b,c,d,e,f){this._listeners=[],this.addListener(this),this.obj=a,this.propFunc=b,this.begin=d,this._pos=d,this.setDuration(f),this.isPlaying=!1,this._change=0,this.prevTime=0,this.prevPos=0,this.looping=!1,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.name="",this.func=c,this.setFinish(e)},Kinetic.Tween.prototype={setTime:function(a){this.prevTime=this._time,a>this.getDuration()?this.looping?(this.rewind(a-this._duration),this.update(),this.broadcastMessage("onLooped",{target:this,type:"onLooped"})):(this._time=this._duration,this.update(),this.stop(),this.broadcastMessage("onFinished",{target:this,type:"onFinished"})):a<0?(this.rewind(),this.update()):(this._time=a,this.update())},getTime:function(){return this._time},setDuration:function(a){this._duration=a===null||a<=0?1e5:a},getDuration:function(){return this._duration},setPosition:function(a){this.prevPos=this._pos,this.propFunc(a),this._pos=a,this.broadcastMessage("onChanged",{target:this,type:"onChanged"})},getPosition:function(a){return a===undefined&&(a=this._time),this.func(a,this.begin,this._change,this._duration)},setFinish:function(a){this._change=a-this.begin},getFinish:function(){return this.begin+this._change},start:function(){this.rewind(),this.startEnterFrame(),this.broadcastMessage("onStarted",{target:this,type:"onStarted"})},rewind:function(a){this.stop(),this._time=a===undefined?0:a,this.fixTime(),this.update()},fforward:function(){this._time=this._duration,this.fixTime(),this.update()},update:function(){this.setPosition(this.getPosition(this._time))},startEnterFrame:function(){this.stopEnterFrame(),this.isPlaying=!0,this.onEnterFrame()},onEnterFrame:function(){this.isPlaying&&this.nextFrame()},nextFrame:function(){this.setTime((this.getTimer()-this._startTime)/1e3)},stop:function(){this.stopEnterFrame(),this.broadcastMessage("onStopped",{target:this,type:"onStopped"})},stopEnterFrame:function(){this.isPlaying=!1},continueTo:function(a,b){this.begin=this._pos,this.setFinish(a),this._duration!==undefined&&this.setDuration(b),this.start()},resume:function(){this.fixTime(),this.startEnterFrame(),this.broadcastMessage("onResumed",{target:this,type:"onResumed"})},yoyo:function(){this.continueTo(this.begin,this._time)},addListener:function(a){return this.removeListener(a),this._listeners.push(a)},removeListener:function(a){var b=this._listeners,c=b.length;while(c--)if(b[c]==a)return b.splice(c,1),!0;return!1},broadcastMessage:function(){var a=[];for(var b=0;b<arguments.length;b++)a.push(arguments[b]);var c=a.shift(),d=this._listeners,e=d.length;for(var b=0;b<e;b++)d[b][c]&&d[b][c].apply(d[b],a)},fixTime:function(){this._startTime=this.getTimer()-this._time*1e3},getTimer:function(){return(new Date).getTime()-this._time}},Kinetic.Tweens={"back-ease-in":function(a,b,c,d,e,f){var g=1.70158;return c*(a/=d)*a*((g+1)*a-g)+b},"back-ease-out":function(a,b,c,d,e,f){var g=1.70158;return c*((a=a/d-1)*a*((g+1)*a+g)+1)+b},"back-ease-in-out":function(a,b,c,d,e,f){var g=1.70158;return(a/=d/2)<1?c/2*a*a*(((g*=1.525)+1)*a-g)+b:c/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},"elastic-ease-in":function(a,b,c,d,e,f){var g=0;return a===0?b:(a/=d)==1?b+c:(f||(f=d*.3),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f))+b)},"elastic-ease-out":function(a,b,c,d,e,f){var g=0;return a===0?b:(a/=d)==1?b+c:(f||(f=d*.3),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+c+b)},"elastic-ease-in-out":function(a,b,c,d,e,f){var g=0;return a===0?b:(a/=d/2)==2?b+c:(f||(f=d*.3*1.5),!e||e<Math.abs(c)?(e=c,g=f/4):g=f/(2*Math.PI)*Math.asin(c/e),a<1?-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+b:e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*.5+c+b)},"bounce-ease-out":function(a,b,c,d){return(a/=d)<1/2.75?c*7.5625*a*a+b:a<2/2.75?c*(7.5625*(a-=1.5/2.75)*a+.75)+b:a<2.5/2.75?c*(7.5625*(a-=2.25/2.75)*a+.9375)+b:c*(7.5625*(a-=2.625/2.75)*a+.984375)+b},"bounce-ease-in":function(a,b,c,d){return c-Kinetic.Tweens["bounce-ease-out"](d-a,0,c,d)+b},"bounce-ease-in-out":function(a,b,c,d){return a<d/2?Kinetic.Tweens["bounce-ease-in"](a*2,0,c,d)*.5+b:Kinetic.Tweens["bounce-ease-out"](a*2-d,0,c,d)*.5+c*.5+b},"ease-in":function(a,b,c,d){return c*(a/=d)*a+b},"ease-out":function(a,b,c,d){return-c*(a/=d)*(a-2)+b},"ease-in-out":function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},"strong-ease-in":function(a,b,c,d){return c*(a/=d)*a*a*a*a+b},"strong-ease-out":function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b},"strong-ease-in-out":function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b},linear:function(a,b,c,d){return c*a/d+b}}}(),function(){Kinetic.Transform=function(){this.m=[1,0,0,1,0,0]},Kinetic.Transform.prototype={translate:function(a,b){this.m[4]+=this.m[0]*a+this.m[2]*b,this.m[5]+=this.m[1]*a+this.m[3]*b},scale:function(a,b){this.m[0]*=a,this.m[1]*=a,this.m[2]*=b,this.m[3]*=b},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.m[0]*b+this.m[2]*c,e=this.m[1]*b+this.m[3]*c,f=this.m[0]*-c+this.m[2]*b,g=this.m[1]*-c+this.m[3]*b;this.m[0]=d,this.m[1]=e,this.m[2]=f,this.m[3]=g},getTranslation:function(){return{x:this.m[4],y:this.m[5]}},multiply:function(a){var b=this.m[0]*a.m[0]+this.m[2]*a.m[1],c=this.m[1]*a.m[0]+this.m[3]*a.m[1],d=this.m[0]*a.m[2]+this.m[2]*a.m[3],e=this.m[1]*a.m[2]+this.m[3]*a.m[3],f=this.m[0]*a.m[4]+this.m[2]*a.m[5]+this.m[4],g=this.m[1]*a.m[4]+this.m[3]*a.m[5]+this.m[5];this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},invert:function(){var a=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),b=this.m[3]*a,c=-this.m[1]*a,d=-this.m[2]*a,e=this.m[0]*a,f=a*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),g=a*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);this.m[0]=b,this.m[1]=c,this.m[2]=d,this.m[3]=e,this.m[4]=f,this.m[5]=g},getMatrix:function(){return this.m}}}(),function(){Kinetic.Collection=function(){var a=[].slice.call(arguments),b=a.length,c=0;this.length=b;for(;c<b;c++)this[c]=a[c];return this},Kinetic.Collection.prototype=new Array,Kinetic.Collection.prototype.apply=function(a){args=[].slice.call(arguments),args.shift();for(var b=0;b<this.length;b++)Kinetic.Type._isFunction(this[b][a])&&this[b][a].apply(this[b],args)},Kinetic.Collection.prototype.each=function(a){for(var b=0;b<this.length;b++)a.call(this[b],b,this[b])}}(),function(){Kinetic.Filters.Grayscale=function(a,b){var c=a.data;for(var d=0;d<c.length;d+=4){var e=.34*c[d]+.5*c[d+1]+.16*c[d+2];c[d]=e,c[d+1]=e,c[d+2]=e}}}(),function(){Kinetic.Filters.Brighten=function(a,b){var c=b.val||0,d=a.data;for(var e=0;e<d.length;e+=4)d[e]+=c,d[e+1]+=c,d[e+2]+=c}}(),function(){Kinetic.Filters.Invert=function(a,b){var c=a.data;for(var d=0;d<c.length;d+=4)c[d]=255-c[d],c[d+1]=255-c[d+1],c[d+2]=255-c[d+2]}}(),function(){Kinetic.Node=function(a){this._nodeInit(a)},Kinetic.Node.prototype={_nodeInit:function(a){this._id=Kinetic.Global.idCounter++,this.defaultNodeAttrs={visible:!0,listening:!0,name:undefined,opacity:1,x:0,y:0,scale:{x:1,y:1},rotation:0,offset:{x:0,y:0},draggable:!1,dragOnTop:!0},this.setDefaultAttrs(this.defaultNodeAttrs),this.eventListeners={},this.setAttrs(a)},on:function(a,b){var c=a.split(" "),d=c.length;for(var e=0;e<d;e++){var f=c[e],g=f,h=g.split("."),i=h[0],j=h.length>1?h[1]:"";this.eventListeners[i]||(this.eventListeners[i]=[]),this.eventListeners[i].push({name:j,handler:b})}},off:function(a){var b=a.split(" "),c=b.length;for(var d=0;d<c;d++){var e=b[d],f=e,g=f.split("."),h=g[0];if(g.length>1)if(h)this.eventListeners[h]&&this._off(h,g[1]);else for(var e in this.eventListeners)this._off(e,g[1]);else delete this.eventListeners[h]}},remove:function(){var a=this.getParent();a&&a.children&&(a.children.splice(this.index,1),a._setChildrenIndices()),delete this.parent},destroy:function(){var a=this.getParent(),b=this.getStage(),c=Kinetic.DD,d=Kinetic.Global;while(this.children&&this.children.length>0)this.children[0].destroy();d._removeId(this.getId()),d._removeName(this.getName(),this._id),c&&c.node&&c.node._id===this._id&&node._endDrag(),this.trans&&this.trans.stop(),this.remove()},getAttrs:function(){return this.attrs},setDefaultAttrs:function(a){this.attrs===undefined&&(this.attrs={});if(a)for(var b in a)this.attrs[b]===undefined&&(this.attrs[b]=a[b])},setAttrs:function(a){if(a)for(var b in a){var c="set"+b.charAt(0).toUpperCase()+b.slice(1);Kinetic.Type._isFunction(this[c])?this[c](a[b]):this.setAttr(b,a[b])}},getVisible:function(){var a=this.attrs.visible,b=this.getParent();return a&&b&&!b.getVisible()?!1:a},getListening:function(){var a=this.attrs.listening,b=this.getParent();return a&&b&&!b.getListening()?!1:a},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},getZIndex:function(){return this.index},getAbsoluteZIndex:function(){function e(b){var f=[],g=b.length;for(var h=0;h<g;h++){var i=b[h];d++,i.nodeType!=="Shape"&&(f=f.concat(i.getChildren())),i._id===c._id&&(h=g)}f.length>0&&f[0].getLevel()<=a&&e(f)}var a=this.getLevel(),b=this.getStage(),c=this,d=0;return c.nodeType!=="Stage"&&e(c.getStage().getChildren()),d},getLevel:function(){var a=0,b=this.parent;while(b)a++,b=b.parent;return a},setPosition:function(){var a=Kinetic.Type._getXY([].slice.call(arguments));this.setAttr("x",a.x),this.setAttr("y",a.y)},getPosition:function(){var a=this.attrs;return{x:a.x,y:a.y}},getAbsolutePosition:function(){var a=this.getAbsoluteTransform(),b=this.getOffset();return a.translate(b.x,b.y),a.getTranslation()},setAbsolutePosition:function(){var a=Kinetic.Type._getXY([].slice.call(arguments)),b=this._clearTransform();this.attrs.x=b.x,this.attrs.y=b.y,delete b.x,delete b.y;var c=this.getAbsoluteTransform();c.invert(),c.translate(a.x,a.y),a={x:this.attrs.x+c.getTranslation().x,y:this.attrs.y+c.getTranslation().y},this.setPosition(a.x,a.y),this._setTransform(b)},move:function(){var a=Kinetic.Type._getXY([].slice.call(arguments)),b=this.getX(),c=this.getY();a.x!==undefined&&(b+=a.x),a.y!==undefined&&(c+=a.y),this.setPosition(b,c)},_eachAncestorReverse:function(a,b){var c=[],d=this.getParent();b&&c.unshift(this);while(d)c.unshift(d),d=d.parent;var e=c.length;for(var f=0;f<e;f++)a(c[f])},rotate:function(a){this.setRotation(this.getRotation()+a)},rotateDeg:function(a){this.setRotation(this.getRotation()+Kinetic.Type._degToRad(a))},moveToTop:function(){var a=this.index;return this.parent.children.splice(a,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0},moveUp:function(){var a=this.index,b=this.parent.getChildren().length;if(a<b-1)return this.parent.children.splice(a,1),this.parent.children.splice(a+1,0,this),this.parent._setChildrenIndices(),!0},moveDown:function(){var a=this.index;if(a>0)return this.parent.children.splice(a,1),this.parent.children.splice(a-1,0,this),this.parent._setChildrenIndices(),!0},moveToBottom:function(){var a=this.index;if(a>0)return this.parent.children.splice(a,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0},setZIndex:function(a){var b=this.index;this.parent.children.splice(b,1),this.parent.children.splice(a,0,this),this.parent._setChildrenIndices()},getAbsoluteOpacity:function(){var a=this.getOpacity();return this.getParent()&&(a*=this.getParent().getAbsoluteOpacity()),a},moveTo:function(a){Kinetic.Node.prototype.remove.call(this),a.add(this)},toObject:function(){var a=Kinetic.Type,b={},c=this.attrs;b.attrs={};for(var d in c){var e=c[d];!a._isFunction(e)&&!a._isElement(e)&&(!a._isObject(e)||!a._hasMethods(e))&&(b.attrs[d]=e)}return b.nodeType=this.nodeType,b.shapeType=this.shapeType,b},toJSON:function(){return JSON.stringify(this.toObject())},getParent:function(){return this.parent},getLayer:function(){return this.getParent().getLayer()},getStage:function(){return this.getParent()?this.getParent().getStage():undefined},simulate:function(a,b){this._handleEvent(a,b||{})},fire:function(a,b){this._executeHandlers(a,b||{})},getAbsoluteTransform:function(){var a=new Kinetic.Transform;return this._eachAncestorReverse(function(b){var c=b.getTransform();a.multiply(c)},!0),a},getTransform:function(){var a=new Kinetic.Transform,b=this.attrs,c=b.x,d=b.y,e=b.rotation,f=b.scale,g=f.x,h=f.y,i=b.offset,j=i.x,k=i.y;return(c!==0||d!==0)&&a.translate(c,d),e!==0&&a.rotate(e),(g!==1||h!==1)&&a.scale(g,h),(j!==0||k!==0)&&a.translate(-1*j,-1*k),a},clone:function(a){var b=this.shapeType||this.nodeType,c=new Kinetic[b](this.attrs);for(var d in this.eventListeners){var e=this.eventListeners[d],f=e.length;for(var g=0;g<f;g++){var h=e[g];h.name.indexOf("kinetic")<0&&(c.eventListeners[d]||(c.eventListeners[d]=[]),c.eventListeners[d].push(h))}}return c.setAttrs(a),c},toDataURL:function(a){a=a||{};var b=a.mimeType||null,c=a.quality||null,d,e,f=a.x||0,g=a.y||0;return a.width&&a.height?d=new Kinetic.SceneCanvas(a.width,a.height):(d=this.getStage().bufferCanvas,d.clear()),e=d.getContext(),e.save(),d._counterPixelRatio(),(f||g)&&e.translate(-1*f,-1*g),this.drawScene(d),e.restore(),d.toDataURL(b,c)},toImage:function(a){Kinetic.Type._getImage(this.toDataURL(a),function(b){a.callback(b)})},setSize:function(){var a=Kinetic.Type._getSize(Array.prototype.slice.call(arguments));this.setWidth(a.width),this.setHeight(a.height)},getSize:function(){return{width:this.getWidth(),height:this.getHeight()}},getWidth:function(){return this.attrs.width||0},getHeight:function(){return this.attrs.height||0},_get:function(a){return this.nodeType===a?[this]:[]},_off:function(a,b){for(var c=0;c<this.eventListeners[a].length;c++)if(this.eventListeners[a][c].name===b){this.eventListeners[a].splice(c,1);if(this.eventListeners[a].length===0){delete this.eventListeners[a];break}c--}},_clearTransform:function(){var a=this.attrs,b=a.scale,c=a.offset,d={x:a.x,y:a.y,rotation:a.rotation,scale:{x:b.x,y:b.y},offset:{x:c.x,y:c.y}};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scale={x:1,y:1},this.attrs.offset={x:0,y:0},d},_setTransform:function(a){for(var b in a)this.attrs[b]=a[b]},_fireBeforeChangeEvent:function(a,b,c){this._handleEvent("before"+a.toUpperCase()+"Change",{oldVal:b,newVal:c})},_fireChangeEvent:function(a,b,c){this._handleEvent(a+"Change",{oldVal:b,newVal:c})},setId:function(a){var b=this.getId(),c=this.getStage(),d=Kinetic.Global;d._removeId(b),d._addId(this,a),this.setAttr("id",a)},setName:function(a){var b=this.getName(),c=this.getStage(),d=Kinetic.Global;d._removeName(b,this._id),d._addName(this,a),this.setAttr("name",a)},setAttr:function(a,b){if(b!==undefined){var c=this.attrs[a];this._fireBeforeChangeEvent(a,c,b),this.attrs[a]=b,this._fireChangeEvent(a,c,b)}},_handleEvent:function(a,b,c){b&&this.nodeType==="Shape"&&(b.shape=this);var d=this.getStage(),e=this.eventListeners,f=!0;a==="mouseenter"&&c&&this._id===c._id?f=!1:a==="mouseleave"&&c&&this._id===c._id&&(f=!1),f&&(e[a]&&this.fire(a,b),b&&!b.cancelBubble&&this.parent&&(c&&c.parent?this._handleEvent.call(this.parent,a,b,c.parent):this._handleEvent.call(this.parent,a,b)))},_executeHandlers:function(a,b){var c=this.eventListeners[a],d=c.length;for(var e=0;e<d;e++)c[e].handler.apply(this,[b])}},Kinetic.Node.addSetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addSetter(constructor,d)}},Kinetic.Node.addPointSetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addPointSetter(constructor,d)}},Kinetic.Node.addRotationSetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addRotationSetter(constructor,d)}},Kinetic.Node.addGetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addGetter(constructor,d)}},Kinetic.Node.addRotationGetters=function(constructor,a){var b=a.length;for(var c=0;c<b;c++){var d=a[c];this._addRotationGetter(constructor,d)}},Kinetic.Node.addGettersSetters=function(constructor,a){this.addSetters(constructor,a),this.addGetters(constructor,a)},Kinetic.Node.addPointGettersSetters=function(constructor,a){this.addPointSetters(constructor,a),this.addGetters(constructor,a)},Kinetic.Node.addRotationGettersSetters=function(constructor,a){this.addRotationSetters(constructor,a),this.addRotationGetters(constructor,a)},Kinetic.Node._addSetter=function(constructor,a){var b=this,c="set"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(b){this.setAttr(a,b)}},Kinetic.Node._addPointSetter=function(constructor,a){var b=this,c="set"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(){var b=Kinetic.Type._getXY([].slice.call(arguments));b&&b.x===undefined&&(b.x=this.attrs[a].x),b&&b.y===undefined&&(b.y=this.attrs[a].y),this.setAttr(a,b)}},Kinetic.Node._addRotationSetter=function(constructor,a){var b=this,c="set"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(b){this.setAttr(a,b)},constructor.prototype[c+"Deg"]=function(b){this.setAttr(a,Kinetic.Type._degToRad(b))}},Kinetic.Node._addGetter=function(constructor,a){var b=this,c="get"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(b){return this.attrs[a]}},Kinetic.Node._addRotationGetter=function(constructor,a){var b=this,c="get"+a.charAt(0).toUpperCase()+a.slice(1);constructor.prototype[c]=function(){return this.attrs[a]},constructor.prototype[c+"Deg"]=function(){return Kinetic.Type._radToDeg(this.attrs[a])}},Kinetic.Node.create=function(a,b){return this._createNode(JSON.parse(a),b)},Kinetic.Node._createNode=function(a,b){var c;a.nodeType==="Shape"?a.shapeType===undefined?c="Shape":c=a.shapeType:c=a.nodeType,b&&(a.attrs.container=b);var d=new Kinetic[c](a.attrs);if(a.children){var e=a.children.length;for(var f=0;f<e;f++)d.add(this._createNode(a.children[f]))}return d},Kinetic.Node.addGettersSetters(Kinetic.Node,["x","y","opacity"]),Kinetic.Node.addGetters(Kinetic.Node,["name","id"]),Kinetic.Node.addRotationGettersSetters(Kinetic.Node,["rotation"]),Kinetic.Node.addPointGettersSetters(Kinetic.Node,["scale","offset"]),Kinetic.Node.addSetters(Kinetic.Node,["width","height","listening","visible"]),Kinetic.Node.prototype.isListening=Kinetic.Node.prototype.getListening,Kinetic.Node.prototype.isVisible=Kinetic.Node.prototype.getVisible;var a=["on","off"];for(var b=0;b<2;b++)(function(b){var c=a[b];Kinetic.Collection.prototype[c]=function(){var a=[].slice.call(arguments);a.unshift(c),this.apply.apply(this,a)}})(b)}(),function(){Kinetic.Animation=function(a,b){this.func=a,this.node=b,this.id=Kinetic.Animation.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:(new Date).getTime()}},Kinetic.Animation.prototype={isRunning:function(){var a=Kinetic.Animation,b=a.animations;for(var c=0;c<b.length;c++)if(b[c].id===this.id)return!0;return!1},start:function(){this.stop(),this.frame.timeDiff=0,this.frame.lastTime=(new Date).getTime(),Kinetic.Animation._addAnimation(this)},stop:function(){Kinetic.Animation._removeAnimation(this)},_updateFrameObject:function(a){this.frame.timeDiff=a-this.frame.lastTime,this.frame.lastTime=a,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}},Kinetic.Animation.animations=[],Kinetic.Animation.animIdCounter=0,Kinetic.Animation.animRunning=!1,Kinetic.Animation.fixedRequestAnimFrame=function(a){window.setTimeout(a,1e3/60)},Kinetic.Animation._addAnimation=function(a){this.animations.push(a),this._handleAnimation()},Kinetic.Animation._removeAnimation=function(a){var b=a.id,c=this.animations,d=c.length;for(var e=0;e<d;e++)if(c[e].id===b){this.animations.splice(e,1);break}},Kinetic.Animation._runFrames=function(){var a={},b=this.animations;for(var c=0;c<b.length;c++){var d=b[c],e=d.node,f=d.func;d._updateFrameObject((new Date).getTime()),e&&e._id!==undefined&&(a[e._id]=e),f&&f(d.frame)}for(var g in a)a[g].draw()},Kinetic.Animation._animationLoop=function(){var a=this;this.animations.length>0?(this._runFrames(),Kinetic.Animation.requestAnimFrame(function(){a._animationLoop()})):this.animRunning=!1},Kinetic.Animation._handleAnimation=function(){var a=this;this.animRunning||(this.animRunning=!0,a._animationLoop())},RAF=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||Kinetic.Animation.fixedRequestAnimFrame}(),Kinetic.Animation.requestAnimFrame=function(a){var b=Kinetic.DD&&Kinetic.DD.moving?this.fixedRequestAnimFrame:RAF;b(a)};var a=Kinetic.Node.prototype.moveTo;Kinetic.Node.prototype.moveTo=function(b){a.call(this,b)}}(),function(){Kinetic.DD={anim:new Kinetic.Animation,moving:!1,offset:{x:0,y:0}},Kinetic.getNodeDragging=function(){return Kinetic.DD.node},Kinetic.DD._setupDragLayerAndGetContainer=function(a){var b=a.getStage(),c=a.nodeType,d,e;return a._eachAncestorReverse(function(a){a.nodeType==="Layer"?(b.dragLayer.setAttrs(a.getAttrs()),d=b.dragLayer,b.add(b.dragLayer)):a.nodeType==="Group"&&(e=new Kinetic.Group(a.getAttrs()),d.add(e),d=e)}),d},Kinetic.DD._initDragLayer=function(a){a.dragLayer=new Kinetic.Layer,a.dragLayer.getCanvas().getElement().className="kinetic-drag-and-drop-layer"},Kinetic.DD._drag=function(a){var b=Kinetic.DD,c=b.node;if(c){var d=c.getStage().getUserPosition(),e=c.attrs.dragBoundFunc,f={x:d.x-b.offset.x,y:d.y-b.offset.y};e!==undefined&&(f=e.call(c,f,a)),c.setAbsolutePosition(f),b.moving||(b.moving=!0,c.setListening(!1),c._handleEvent("dragstart",a)),c._handleEvent("dragmove",a)}},Kinetic.DD._endDrag=function(a){var b=Kinetic.DD,c=b.node;if(c){var d=c.nodeType,e=c.getStage();c.setListening(!0),d==="Stage"?c.draw():((d==="Group"||d==="Shape")&&c.getDragOnTop()&&b.prevParent&&(c.moveTo(b.prevParent),c.getStage().dragLayer.remove(),b.prevParent=null),c.getLayer().draw()),delete b.node,b.anim.stop(),b.moving&&(b.moving=!1,c._handleEvent("dragend",a))}},Kinetic.Node.prototype._startDrag=function(a){var b=Kinetic.DD,c=this,d=this.getStage(),e=d.getUserPosition();if(e){var f=this.getTransform().getTranslation(),g=this.getAbsolutePosition(),h=this.nodeType,i;b.node=this,b.offset.x=e.x-g.x,b.offset.y=e.y-g.y,h==="Stage"||h==="Layer"?(b.anim.node=this,b.anim.start()):this.getDragOnTop()?(i=b._setupDragLayerAndGetContainer(this),b.anim.node=d.dragLayer,b.prevParent=this.getParent(),setTimeout(function(){b.node&&(c.moveTo(i),b.prevParent.getLayer().draw(),d.dragLayer.draw(),b.anim.start())},0)):(b.anim.node=this.getLayer(),b.anim.start())}},Kinetic.Node.prototype.setDraggable=function(a){this.setAttr("draggable",a),this._dragChange()},Kinetic.Node.prototype.getDraggable=function(){return this.attrs.draggable},Kinetic.Node.prototype.isDragging=function(){var a=Kinetic.DD;return a.node&&a.node._id===this._id&&a.moving},Kinetic.Node.prototype._listenDrag=function(){this._dragCleanup
();var a=this;this.on("mousedown.kinetic touchstart.kinetic",function(b){Kinetic.getNodeDragging()||a._startDrag(b)})},Kinetic.Node.prototype._dragChange=function(){if(this.attrs.draggable)this._listenDrag();else{this._dragCleanup();var a=this.getStage(),b=Kinetic.DD;a&&b.node&&b.node._id===this._id&&b._endDrag()}},Kinetic.Node.prototype._dragCleanup=function(){this.off("mousedown.kinetic"),this.off("touchstart.kinetic")},Kinetic.Node.prototype.isDraggable=Kinetic.Node.prototype.getDraggable,Kinetic.Node.addGettersSetters(Kinetic.Node,["dragBoundFunc","dragOnTop"]);var a=document.getElementsByTagName("html")[0];a.addEventListener("mouseup",Kinetic.DD._endDrag,!0),a.addEventListener("touchend",Kinetic.DD._endDrag,!0)}(),function(){Kinetic.Transition=function(a,b){function e(a,b,d,f){for(var g in a)g!=="duration"&&g!=="easing"&&g!=="callback"&&(Kinetic.Type._isObject(a[g])?(d[g]={},e(a[g],b[g],d[g],f)):c._add(c._getTween(b,g,a[g],d,f)))}var c=this,d={};this.node=a,this.config=b,this.tweens=[],e(b,a.attrs,d,d),this.tweens[0].onStarted=function(){},this.tweens[0].onStopped=function(){a.transAnim.stop()},this.tweens[0].onResumed=function(){a.transAnim.start()},this.tweens[0].onLooped=function(){},this.tweens[0].onChanged=function(){},this.tweens[0].onFinished=function(){var c={};for(var d in b)d!=="duration"&&d!=="easing"&&d!=="callback"&&(c[d]=b[d]);a.transAnim.stop(),a.setAttrs(c),b.callback&&b.callback()}},Kinetic.Transition.prototype={start:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].start()},stop:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].stop()},resume:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].resume()},_onEnterFrame:function(){for(var a=0;a<this.tweens.length;a++)this.tweens[a].onEnterFrame()},_add:function(a){this.tweens.push(a)},_getTween:function(a,b,c,d,e){var f=this.config,g=this.node,h=f.easing;h===undefined&&(h="linear");var i=new Kinetic.Tween(g,function(a){d[b]=a,g.setAttrs(e)},Kinetic.Tweens[h],a[b],c,f.duration);return i}},Kinetic.Node.prototype.transitionTo=function(a){var b=this,c=new Kinetic.Transition(this,a);return this.transAnim||(this.transAnim=new Kinetic.Animation),this.transAnim.func=function(){c._onEnterFrame()},this.transAnim.node=this.nodeType==="Stage"?this:this.getLayer(),c.start(),this.transAnim.start(),this.trans=c,c}}(),function(){Kinetic.Container=function(a){this._containerInit(a)},Kinetic.Container.prototype={_containerInit:function(a){this.children=[],Kinetic.Node.call(this,a)},getChildren:function(){return this.children},removeChildren:function(){while(this.children.length>0)this.children[0].remove()},add:function(a){var b=Kinetic.Global,c=this.children;return a.index=c.length,a.parent=this,c.push(a),this},get:function(a){var b=new Kinetic.Collection;if(a.charAt(0)==="#"){var c=this._getNodeById(a.slice(1));c&&b.push(c)}else if(a.charAt(0)==="."){var d=this._getNodesByName(a.slice(1));Kinetic.Collection.apply(b,d)}else{var e=[],f=this.getChildren(),g=f.length;for(var h=0;h<g;h++)e=e.concat(f[h]._get(a));Kinetic.Collection.apply(b,e)}return b},_getNodeById:function(a){var b=this.getStage(),c=Kinetic.Global,d=c.ids[a];return d!==undefined&&this.isAncestorOf(d)?d:null},_getNodesByName:function(a){var b=Kinetic.Global,c=b.names[a]||[];return this._getDescendants(c)},_get:function(a){var b=Kinetic.Node.prototype._get.call(this,a),c=this.getChildren(),d=c.length;for(var e=0;e<d;e++)b=b.concat(c[e]._get(a));return b},toObject:function(){var a=Kinetic.Node.prototype.toObject.call(this);a.children=[];var b=this.getChildren(),c=b.length;for(var d=0;d<c;d++){var e=b[d];a.children.push(e.toObject())}return a},_getDescendants:function(a){var b=[],c=a.length;for(var d=0;d<c;d++){var e=a[d];this.isAncestorOf(e)&&b.push(e)}return b},isAncestorOf:function(a){var b=a.getParent();while(b){if(b._id===this._id)return!0;b=b.getParent()}return!1},clone:function(a){var b=Kinetic.Node.prototype.clone.call(this,a);for(var c in this.children)b.add(this.children[c].clone());return b},getIntersections:function(){var a=Kinetic.Type._getXY(Array.prototype.slice.call(arguments)),b=[],c=this.get("Shape"),d=c.length;for(var e=0;e<d;e++){var f=c[e];f.isVisible()&&f.intersects(a)&&b.push(f)}return b},_setChildrenIndices:function(){var a=this.children,b=a.length;for(var c=0;c<b;c++)a[c].index=c},draw:function(){this.drawScene(),this.drawHit()},drawScene:function(a){if(this.isVisible()){var b=this.children,c=b.length;for(var d=0;d<c;d++)b[d].drawScene(a)}},drawHit:function(){if(this.isVisible()&&this.isListening()){var a=this.children,b=a.length;for(var c=0;c<b;c++)a[c].drawHit()}}},Kinetic.Global.extend(Kinetic.Container,Kinetic.Node)}(),function(){function a(a){a.fill()}function b(a){a.stroke()}Kinetic.Shape=function(a){this._initShape(a)},Kinetic.Shape.prototype={_initShape:function(c){this.setDefaultAttrs({fillEnabled:!0,strokeEnabled:!0,shadowEnabled:!0,dashArrayEnabled:!0,fillPriority:"color"}),this.nodeType="Shape",this._fillFunc=a,this._strokeFunc=b;var d=Kinetic.Global.shapes,e;for(;;){e=Kinetic.Type._getRandomColorKey();if(e&&!(e in d))break}this.colorKey=e,d[e]=this,Kinetic.Node.call(this,c)},getContext:function(){return this.getLayer().getContext()},getCanvas:function(){return this.getLayer().getCanvas()},hasShadow:function(){return!!(this.getShadowColor()||this.getShadowBlur()||this.getShadowOffset())},hasFill:function(){return!!(this.getFill()||this.getFillPatternImage()||this.getFillLinearGradientStartPoint()||this.getFillRadialGradientStartPoint())},_get:function(a){return this.nodeType===a||this.shapeType===a?[this]:[]},intersects:function(){var a=Kinetic.Type._getXY(Array.prototype.slice.call(arguments)),b=this.getStage(),c=b.hitCanvas;c.clear(),this.drawScene(c);var d=c.context.getImageData(Math.round(a.x),Math.round(a.y),1,1).data;return d[3]>0},enableFill:function(){this.setAttr("fillEnabled",!0)},disableFill:function(){this.setAttr("fillEnabled",!1)},enableStroke:function(){this.setAttr("strokeEnabled",!0)},disableStroke:function(){this.setAttr("strokeEnabled",!1)},enableShadow:function(){this.setAttr("shadowEnabled",!0)},disableShadow:function(){this.setAttr("shadowEnabled",!1)},enableDashArray:function(){this.setAttr("dashArrayEnabled",!0)},disableDashArray:function(){this.setAttr("dashArrayEnabled",!1)},remove:function(){Kinetic.Node.prototype.remove.call(this),delete Kinetic.Global.shapes[this.colorKey]},drawScene:function(a){var b=this.attrs,c=b.drawFunc,a=a||this.getLayer().getCanvas(),d=a.getContext();c&&this.isVisible()&&(d.save(),a._handlePixelRatio(),a._applyOpacity(this),a._applyLineJoin(this),a._applyAncestorTransforms(this),c.call(this,a),d.restore())},drawHit:function(){var a=this.attrs,b=a.drawHitFunc||a.drawFunc,c=this.getLayer().hitCanvas,d=c.getContext();b&&this.isVisible()&&this.isListening()&&(d.save(),c._applyLineJoin(this),c._applyAncestorTransforms(this),b.call(this,c),d.restore())},_setDrawFuncs:function(){!this.attrs.drawFunc&&this.drawFunc&&this.setDrawFunc(this.drawFunc),!this.attrs.drawHitFunc&&this.drawHitFunc&&this.setDrawHitFunc(this.drawHitFunc)}},Kinetic.Global.extend(Kinetic.Shape,Kinetic.Node),Kinetic.Node.addGettersSetters(Kinetic.Shape,["stroke","lineJoin","lineCap","strokeWidth","drawFunc","drawHitFunc","dashArray","shadowColor","shadowBlur","shadowOpacity","fillPatternImage","fill","fillPatternX","fillPatternY","fillLinearGradientColorStops","fillRadialGradientStartRadius","fillRadialGradientEndRadius","fillRadialGradientColorStops","fillPatternRepeat","fillEnabled","strokeEnabled","shadowEnabled","dashArrayEnabled","fillPriority"]),Kinetic.Node.addPointGettersSetters(Kinetic.Shape,["fillPatternOffset","fillPatternScale","fillLinearGradientStartPoint","fillLinearGradientEndPoint","fillRadialGradientStartPoint","fillRadialGradientEndPoint","shadowOffset"]),Kinetic.Node.addRotationGettersSetters(Kinetic.Shape,["fillPatternRotation"])}(),function(){Kinetic.Stage=function(a){this._initStage(a)},Kinetic.Stage.prototype={_initStage:function(a){var b=Kinetic.DD;this.setDefaultAttrs({width:400,height:200}),Kinetic.Container.call(this,a),this._setStageDefaultProperties(),this._id=Kinetic.Global.idCounter++,this._buildDOM(),this._bindContentEvents(),Kinetic.Global.stages.push(this),b&&b._initDragLayer(this)},setContainer:function(a){typeof a=="string"&&(a=document.getElementById(a)),this.setAttr("container",a)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this._resizeDOM()},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this._resizeDOM()},clear:function(){var a=this.children;for(var b=0;b<a.length;b++)a[b].clear()},remove:function(){var a=this.content;Kinetic.Node.prototype.remove.call(this),a&&Kinetic.Type._isInDocument(a)&&this.attrs.container.removeChild(a)},reset:function(){this.removeChildren(),this._setStageDefaultProperties(),this.setAttrs(this.defaultNodeAttrs)},getMousePosition:function(){return this.mousePos},getTouchPosition:function(){return this.touchPos},getUserPosition:function(){return this.getTouchPosition()||this.getMousePosition()},getStage:function(){return this},getContent:function(){return this.content},toDataURL:function(a){function i(d){var e=h[d],j=e.toDataURL(),k=new Image;k.onload=function(){g.drawImage(k,0,0),d<h.length-1?i(d+1):a.callback(f.toDataURL(b,c))},k.src=j}a=a||{};var b=a.mimeType||null,c=a.quality||null,d=a.x||0,e=a.y||0,f=new Kinetic.SceneCanvas(a.width||this.getWidth(),a.height||this.getHeight()),g=f.getContext(),h=this.children;(d||e)&&g.translate(-1*d,-1*e),i(0)},toImage:function(a){var b=a.callback;a.callback=function(a){Kinetic.Type._getImage(a,function(a){b(a)})},this.toDataURL(a)},getIntersection:function(a){var b,c=this.getChildren();for(var d=c.length-1;d>=0;d--){var e=c[d];if(e.isVisible()&&e.isListening()){var f=e.hitCanvas.context.getImageData(Math.round(a.x),Math.round(a.y),1,1).data;if(f[3]===255){var g=Kinetic.Type._rgbToHex(f[0],f[1],f[2]);return b=Kinetic.Global.shapes[g],{shape:b,pixel:f}}if(f[0]>0||f[1]>0||f[2]>0||f[3]>0)return{pixel:f}}}return null},_resizeDOM:function(){if(this.content){var a=this.attrs.width,b=this.attrs.height;this.content.style.width=a+"px",this.content.style.height=b+"px",this.bufferCanvas.setSize(a,b),this.hitCanvas.setSize(a,b);var c=this.children;for(var d=0;d<c.length;d++){var e=c[d];e.getCanvas().setSize(a,b),e.hitCanvas.setSize(a,b),e.draw()}}},add:function(a){return Kinetic.Container.prototype.add.call(this,a),a.canvas.setSize(this.attrs.width,this.attrs.height),a.hitCanvas.setSize(this.attrs.width,this.attrs.height),a.draw(),this.content.appendChild(a.canvas.element),this},getDragLayer:function(){return this.dragLayer},_setUserPosition:function(a){a||(a=window.event),this._setMousePosition(a),this._setTouchPosition(a)},_bindContentEvents:function(){var a=Kinetic.Global,b=this,c=["mousedown","mousemove","mouseup","mouseout","touchstart","touchmove","touchend"];for(var d=0;d<c.length;d++){var e=c[d];(function(){var a=e;b.content.addEventListener(a,function(c){b["_"+a](c)},!1)})()}},_mouseout:function(a){this._setUserPosition(a);var b=Kinetic.DD,c=this.targetShape;c&&(!b||!b.moving)&&(c._handleEvent("mouseout",a),c._handleEvent("mouseleave",a),this.targetShape=null),this.mousePos=undefined},_mousemove:function(a){this._setUserPosition(a);var b=Kinetic.DD,c=this.getIntersection(this.getUserPosition());if(c){var d=c.shape;d&&(!!b&&!!b.moving||c.pixel[3]!==255||!!this.targetShape&&this.targetShape._id===d._id?d._handleEvent("mousemove",a):(this.targetShape&&(this.targetShape._handleEvent("mouseout",a,d),this.targetShape._handleEvent("mouseleave",a,d)),d._handleEvent("mouseover",a,this.targetShape),d._handleEvent("mouseenter",a,this.targetShape),this.targetShape=d))}else this.targetShape&&(!b||!b.moving)&&(this.targetShape._handleEvent("mouseout",a),this.targetShape._handleEvent("mouseleave",a),this.targetShape=null);b&&b._drag(a)},_mousedown:function(a){var b,c=Kinetic.DD;this._setUserPosition(a),b=this.getIntersection(this.getUserPosition());if(b&&b.shape){var d=b.shape;this.clickStart=!0,d._handleEvent("mousedown",a)}c&&this.attrs.draggable&&!c.node&&this._startDrag(a)},_mouseup:function(a){this._setUserPosition(a);var b=this,c=Kinetic.DD,d=this.getIntersection(this.getUserPosition());if(d&&d.shape){var e=d.shape;e._handleEvent("mouseup",a),this.clickStart&&(!c||!c.moving||!c.node)&&(e._handleEvent("click",a),this.inDoubleClickWindow&&e._handleEvent("dblclick",a),this.inDoubleClickWindow=!0,setTimeout(function(){b.inDoubleClickWindow=!1},this.dblClickWindow))}this.clickStart=!1},_touchstart:function(a){var b,c=Kinetic.DD;this._setUserPosition(a),a.preventDefault(),b=this.getIntersection(this.getUserPosition());if(b&&b.shape){var d=b.shape;this.tapStart=!0,d._handleEvent("touchstart",a)}c&&this.attrs.draggable&&!c.node&&this._startDrag(a)},_touchend:function(a){this._setUserPosition(a);var b=this,c=Kinetic.DD,d=this.getIntersection(this.getUserPosition());if(d&&d.shape){var e=d.shape;e._handleEvent("touchend",a),this.tapStart&&(!c||!c.moving||!c.node)&&(e._handleEvent("tap",a),this.inDoubleClickWindow&&e._handleEvent("dbltap",a),this.inDoubleClickWindow=!0,setTimeout(function(){b.inDoubleClickWindow=!1},this.dblClickWindow))}this.tapStart=!1},_touchmove:function(a){this._setUserPosition(a);var b=Kinetic.DD;a.preventDefault();var c=this.getIntersection(this.getUserPosition());if(c&&c.shape){var d=c.shape;d._handleEvent("touchmove",a)}b&&b._drag(a)},_setMousePosition:function(a){var b=a.clientX-this._getContentPosition().left,c=a.clientY-this._getContentPosition().top;this.mousePos={x:b,y:c}},_setTouchPosition:function(a){if(a.touches!==undefined&&a.touches.length===1){var b=a.touches[0],c=b.clientX-this._getContentPosition().left,d=b.clientY-this._getContentPosition().top;this.touchPos={x:c,y:d}}},_getContentPosition:function(){var a=this.content.getBoundingClientRect();return{top:a.top,left:a.left}},_buildDOM:function(){this.content=document.createElement("div"),this.content.style.position="relative",this.content.style.display="inline-block",this.content.className="kineticjs-content",this.attrs.container.appendChild(this.content),this.bufferCanvas=new Kinetic.SceneCanvas,this.hitCanvas=new Kinetic.HitCanvas,this._resizeDOM()},_onContent:function(a,b){var c=a.split(" ");for(var d=0;d<c.length;d++){var e=c[d];this.content.addEventListener(e,b,!1)}},_setStageDefaultProperties:function(){this.nodeType="Stage",this.dblClickWindow=400,this.targetShape=null,this.mousePos=undefined,this.clickStart=!1,this.touchPos=undefined,this.tapStart=!1}},Kinetic.Global.extend(Kinetic.Stage,Kinetic.Container),Kinetic.Node.addGetters(Kinetic.Stage,["container"])}(),function(){Kinetic.Layer=function(a){this._initLayer(a)},Kinetic.Layer.prototype={_initLayer:function(a){this.setDefaultAttrs({clearBeforeDraw:!0}),this.nodeType="Layer",this.beforeDrawFunc=undefined,this.afterDrawFunc=undefined,this.canvas=new Kinetic.SceneCanvas,this.canvas.getElement().style.position="absolute",this.hitCanvas=new Kinetic.HitCanvas,Kinetic.Container.call(this,a)},draw:function(){this.beforeDrawFunc!==undefined&&this.beforeDrawFunc.call(this),Kinetic.Container.prototype.draw.call(this),this.afterDrawFunc!==undefined&&this.afterDrawFunc.call(this)},drawHit:function(){this.hitCanvas.clear(),Kinetic.Container.prototype.drawHit.call(this)},drawScene:function(a){a=a||this.getCanvas(),this.attrs.clearBeforeDraw&&a.clear(),Kinetic.Container.prototype.drawScene.call(this,a)},toDataURL:function(a){a=a||{};var b=a.mimeType||null,c=a.quality||null,d,e,f=a.x||0,g=a.y||0;return a.width||a.height||a.x||a.y?Kinetic.Node.prototype.toDataURL.call(this,a):this.getCanvas().toDataURL(b,c)},beforeDraw:function(a){this.beforeDrawFunc=a},afterDraw:function(a){this.afterDrawFunc=a},getCanvas:function(){return this.canvas},getContext:function(){return this.canvas.context},clear:function(){this.getCanvas().clear()},setVisible:function(a){Kinetic.Node.prototype.setVisible.call(this,a),a?(this.canvas.element.style.display="block",this.hitCanvas.element.style.display="block"):(this.canvas.element.style.display="none",this.hitCanvas.element.style.display="none")},setZIndex:function(a){Kinetic.Node.prototype.setZIndex.call(this,a);var b=this.getStage();b&&(b.content.removeChild(this.canvas.element),a<b.getChildren().length-1?b.content.insertBefore(this.canvas.element,b.getChildren()[a+1].canvas.element):b.content.appendChild(this.canvas.element))},moveToTop:function(){Kinetic.Node.prototype.moveToTop.call(this);var a=this.getStage();a&&(a.content.removeChild(this.canvas.element),a.content.appendChild(this.canvas.element))},moveUp:function(){if(Kinetic.Node.prototype.moveUp.call(this)){var a=this.getStage();a&&(a.content.removeChild(this.canvas.element),this.index<a.getChildren().length-1?a.content.insertBefore(this.canvas.element,a.getChildren()[this.index+1].canvas.element):a.content.appendChild(this.canvas.element))}},moveDown:function(){if(Kinetic.Node.prototype.moveDown.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.canvas.element),a.content.insertBefore(this.canvas.element,b[this.index+1].canvas.element)}}},moveToBottom:function(){if(Kinetic.Node.prototype.moveToBottom.call(this)){var a=this.getStage();if(a){var b=a.getChildren();a.content.removeChild(this.canvas.element),a.content.insertBefore(this.canvas.element,b[1].canvas.element)}}},getLayer:function(){return this},remove:function(){var a=this.getStage(),b=this.canvas,c=b.element;Kinetic.Node.prototype.remove.call(this),a&&b&&Kinetic.Type._isInDocument(c)&&a.content.removeChild(c)}},Kinetic.Global.extend(Kinetic.Layer,Kinetic.Container),Kinetic.Node.addGettersSetters(Kinetic.Layer,["clearBeforeDraw"])}(),function(){Kinetic.Group=function(a){this._initGroup(a)},Kinetic.Group.prototype={_initGroup:function(a){this.nodeType="Group",Kinetic.Container.call(this,a)}},Kinetic.Global.extend(Kinetic.Group,Kinetic.Container)}(),function(){Kinetic.Rect=function(a){this._initRect(a)},Kinetic.Rect.prototype={_initRect:function(a){this.setDefaultAttrs({width:0,height:0,cornerRadius:0}),Kinetic.Shape.call(this,a),this.shapeType="Rect",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext();b.beginPath();var c=this.getCornerRadius(),d=this.getWidth(),e=this.getHeight();c===0?b.rect(0,0,d,e):(b.moveTo(c,0),b.lineTo(d-c,0),b.arc(d-c,c,c,Math.PI*3/2,0,!1),b.lineTo(d,e-c),b.arc(d-c,e-c,c,0,Math.PI/2,!1),b.lineTo(c,e),b.arc(c,e-c,c,Math.PI/2,Math.PI,!1),b.lineTo(0,c),b.arc(c,c,c,Math.PI,Math.PI*3/2,!1)),b.closePath(),a.fillStroke(this)}},Kinetic.Global.extend(Kinetic.Rect,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Rect,["cornerRadius"])}(),function(){Kinetic.Circle=function(a){this._initCircle(a)},Kinetic.Circle.prototype={_initCircle:function(a){this.setDefaultAttrs({radius:0}),Kinetic.Shape.call(this,a),this.shapeType="Circle",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext();b.beginPath(),b.arc(0,0,this.getRadius(),0,Math.PI*2,!0),b.closePath(),a.fillStroke(this)},getWidth:function(){return this.getRadius()*2},getHeight:function(){return this.getRadius()*2},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius(a/2)},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius(a/2)}},Kinetic.Global.extend(Kinetic.Circle,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Circle,["radius"])}(),function(){Kinetic.Wedge=function(a){this._initWedge(a)},Kinetic.Wedge.prototype={_initWedge:function(a){this.setDefaultAttrs({radius:0,angle:0,clickwise:!0}),Kinetic.Shape.call(this,a),this.shapeType="Wedge",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext();b.beginPath(),b.arc(0,0,this.getRadius(),0,this.getAngle(),this.getClockwise()),b.lineTo(0,0),b.closePath(),a.fillStroke(this)},setAngleDeg:function(a){this.setAngle(Kinetic.Type._degToRad(a))},getAngleDeg:function(){return Kinetic.Type._radToDeg(this.getAngle())}},Kinetic.Global.extend(Kinetic.Wedge,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Wedge,["radius","angle","clockwise"])}(),function(){Kinetic.Ellipse=function(a){this._initEllipse(a)},Kinetic.Ellipse.prototype={_initEllipse:function(a){this.setDefaultAttrs({radius:{x:0,y:0}}),Kinetic.Shape.call(this,a),this.shapeType="Ellipse",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext(),c=this.getRadius();b.beginPath(),b.save(),c.x!==c.y&&b.scale(1,c.y/c.x),b.arc(0,0,c.x,0,Math.PI*2,!0),b.restore(),b.closePath(),a.fillStroke(this)},getWidth:function(){return this.getRadius().x*2},getHeight:function(){return this.getRadius().y*2},setWidth:function(a){Kinetic.Node.prototype.setWidth.call(this,a),this.setRadius({x:a/2})},setHeight:function(a){Kinetic.Node.prototype.setHeight.call(this,a),this.setRadius({y:a/2})}},Kinetic.Global.extend(Kinetic.Ellipse,Kinetic.Shape),Kinetic.Node.addPointGettersSetters(Kinetic.Ellipse,["radius"])}(),function(){Kinetic.Image=function(a){this._initImage(a)},Kinetic.Image.prototype={_initImage:function(a){Kinetic.Shape.call(this,a),this.shapeType="Image",this._setDrawFuncs();var b=this;this.on("imageChange",function(a){b._syncSize()}),this._syncSize()},drawFunc:function(a){var b=this.getWidth(),c=this.getHeight(),d,e=this,f=a.getContext();f.beginPath(),f.rect(0,0,b,c),f.closePath(),a.fillStroke(this);if(this.attrs.image){if(this.attrs.crop&&this.attrs.crop.width&&this.attrs.crop.height){var g=this.attrs.crop.x||0,h=this.attrs.crop.y||0,i=this.attrs.crop.width,j=this.attrs.crop.height;d=[this.attrs.image,g,h,i,j,0,0,b,c]}else d=[this.attrs.image,0,0,b,c];this.hasShadow()?a.applyShadow(this,function(){e._drawImage(f,d)}):this._drawImage(f,d)}},drawHitFunc:function(a){var b=this.getWidth(),c=this.getHeight(),d=this.imageHitRegion,e=!1,f=a.getContext();d?(f.drawImage(d,0,0,b,c),f.beginPath(),f.rect(0,0,b,c),f.closePath(),a.stroke(this)):(f.beginPath(),f.rect(0,0,b,c),f.closePath(),a.fillStroke(this))},applyFilter:function(a,b,c){var d=new Kinetic.Canvas(this.attrs.image.width,this.attrs.image.height),e=d.getContext();e.drawImage(this.attrs.image,0,0);try{var f=e.getImageData(0,0,d.getWidth(),d.getHeight());a(f,b);var g=this;Kinetic.Type._getImage(f,function(a){g.setImage(a),c&&c()})}catch(h){Kinetic.Global.warn("Unable to apply filter. "+h.message)}},setCrop:function(){var a=[].slice.call(arguments),b=Kinetic.Type._getXY(a),c=Kinetic.Type._getSize(a),d=Kinetic.Type._merge(b,c);this.setAttr("crop",Kinetic.Type._merge(d,this.getCrop()))},createImageHitRegion:function(a){var b=new Kinetic.Canvas(this.attrs.width,this.attrs.height),c=b.getContext();c.drawImage(this.attrs.image,0,0);try{var d=c.getImageData(0,0,b.getWidth(),b.getHeight()),e=d.data,f=Kinetic.Type._hexToRgb(this.colorKey);for(var g=0,h=e.length;g<h;g+=4)e[g]=f.r,e[g+1]=f.g,e[g+2]=f.b;var i=this;Kinetic.Type._getImage(d,function(b){i.imageHitRegion=b,a&&a()})}catch(j){Kinetic.Global.warn("Unable to create image hit region. "+j.message)}},clearImageHitRegion:function(){delete this.imageHitRegion},_syncSize:function(){this.attrs.image&&(this.attrs.width||this.setWidth(this.attrs.image.width),this.attrs.height||this.setHeight(this.attrs.image.height))},_drawImage:function(a,b){b.length===5?a.drawImage(b[0],b[1],b[2],b[3],b[4]):b.length===9&&a.drawImage(b[0],b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8])}},Kinetic.Global.extend(Kinetic.Image,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Image,["image"]),Kinetic.Node.addGetters(Kinetic.Image,["crop"])}(),function(){Kinetic.Polygon=function(a){this._initPolygon(a)},Kinetic.Polygon.prototype={_initPolygon:function(a){this.setDefaultAttrs({points:[]}),Kinetic.Shape.call(this,a),this.shapeType="Polygon",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext(),c=this.getPoints(),d=c.length;b.beginPath(),b.moveTo(c[0].x,c[0].y);for(var e=1;e<d;e++)b.lineTo(c[e].x,c[e].y);b.closePath(),a.fillStroke(this)},setPoints:function(a){this.setAttr("points",Kinetic.Type._getPoints(a))}},Kinetic.Global.extend(Kinetic.Polygon,Kinetic.Shape),Kinetic.Node.addGetters(Kinetic.Polygon,["points"])}(),function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}Kinetic.Text=function(a){this._initText(a)},Kinetic.Text.prototype={_initText:function(c){this.setDefaultAttrs({fontFamily:"Calibri",text:"",fontSize:12,align:"left",verticalAlign:"top",fontStyle:"normal",padding:0,width:"auto",height:"auto",lineHeight:1}),this.dummyCanvas=document.createElement("canvas"),Kinetic.Shape.call(this,c),this._fillFunc=a,this._strokeFunc=b,this.shapeType="Text",this._setDrawFuncs();var d=["fontFamily","fontSize","fontStyle","padding","align","lineHeight","text","width","height"],e=this;for(var f=0;f<d.length;f++){var g=d[f];this.on(g+"Change.kinetic",e._setTextData)}e._setTextData()},drawFunc:function(a){var b=a.getContext(),c=this.attrs.padding,d=this.attrs.lineHeight*this.getTextHeight(),e=this.textArr;b.font=this.attrs.fontStyle+" "+this.attrs.fontSize+"px "+this.attrs.fontFamily,b.textBaseline="middle",b.textAlign="left",b.save(),b.translate(c,0),b.translate(0,c+this.getTextHeight()/2);for(var f=0;f<e.length;f++){var g=e[f];b.save(),this.attrs.align==="right"?b.translate(this.getWidth()-this._getTextSize(g).width-c*2,0):this.attrs.align==="center"&&b.translate((this.getWidth()-this._getTextSize(g).width-c*2)/2,0),this.partialText=g,a.fillStroke(this),b.restore(),b.translate(0,d)}b.restore()},drawHitFunc:function(a){var b=a.getContext(),c=this.getWidth(),d=this.getHeight();b.beginPath(),b.rect(0,0,c,d),b.closePath(),a.fillStroke(this)},setText:function(a){var b=Kinetic.Type._isString(a)?a:a.toString();this.setAttr("text",b)},getWidth:function(){return this.attrs.width==="auto"?this.getTextWidth()+this.attrs.padding*2:this.attrs.width},getHeight:function(){return this.attrs.height==="auto"?this.getTextHeight()*this.textArr.length*this.attrs.lineHeight+this.attrs.padding*2:this.attrs.height},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},_getTextSize:function(a){var b=this.dummyCanvas,c=b.getContext("2d");c.save(),c.font=this.attrs.fontStyle+" "+this.attrs.fontSize+"px "+this.attrs.fontFamily;var d=c.measureText(a);return c.restore(),{width:d.width,height:parseInt(this.attrs.fontSize,10)}},_setTextData:function(){var a=this.attrs.text.split(""),b=[],c=0,d=!0;this.textWidth=0,this.textHeight=this._getTextSize(this.attrs.text).height;var e=this.attrs.lineHeight*this.textHeight;while(a.length>0&&d&&(this.attrs.height==="auto"||e*(c+1)<this.attrs.height-this.attrs.padding*2)){var f=0,g=undefined;d=!1;while(f<a.length){if(a.indexOf("\n")===f){a.splice(f,1),g=a.splice(0,f).join("");break}var h=a.slice(0,f);if(this.attrs.width!=="auto"&&this._getTextSize(h.join("")).width>this.attrs.width-this.attrs.padding*2){if(f==0)break;var i=h.lastIndexOf(" "),j=h.lastIndexOf("-"),k=Math.max(i,j);if(k>=0){g=a.splice(0,1+k).join("");break}g=a.splice(0,f).join("");break}f++,f===a.length&&(g=a.splice(0,f).join(""))}this.textWidth=Math.max(this.textWidth,this._getTextSize(g).width),g!==undefined&&(b.push(g),d=!0),c++}this.textArr=b}},Kinetic.Global.extend(Kinetic.Text,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Text,["fontFamily","fontSize","fontStyle","padding","align","lineHeight"]),Kinetic.Node.addGetters(Kinetic.Text,["text"])}(),function(){Kinetic.Line=function(a){this._initLine(a)},Kinetic.Line.prototype={_initLine:function(a){this.setDefaultAttrs({points:[],lineCap:"butt"}),Kinetic.Shape.call(this,a),this.shapeType="Line",this._setDrawFuncs()},drawFunc:function(a){var b=this.getPoints(),c=b.length,d=a.getContext();d.beginPath(),d.moveTo(b[0].x,b[0].y);for(var e=1;e<c;e++){var f=b[e];d.lineTo(f.x,f.y)}a.stroke(this)},setPoints:function(a){this.setAttr("points",Kinetic.Type._getPoints(a))}},Kinetic.Global.extend(Kinetic.Line,Kinetic.Shape),Kinetic.Node.addGetters(Kinetic.Line,["points"])}(),function(){Kinetic.Spline=function(a){this._initSpline(a)},Kinetic.Spline._getControlPoints=function(a,b,c,d){var e=a.x,f=a.y,g=b.x,h=b.y,i=c.x,j=c.y,k=Math.sqrt(Math.pow(g-e,2)+Math.pow(h-f,2)),l=Math.sqrt(Math.pow(i-g,2)+Math.pow(j-h,2)),m=d*k/(k+l),n=d*l/(k+l),o=g-m*(i-e),p=h-m*(j-f),q=g+n*(i-e),r=h+n*(j-f);return[{x:o,y:p},{x:q,y:r}]},Kinetic.Spline.prototype={_initSpline:function(a){this.setDefaultAttrs({tension:1}),Kinetic.Line.call(this,a),this.shapeType="Spline"},drawFunc:function(a){var b=this.getPoints(),c=b.length,d=a.getContext(),e=this.getTension();d.beginPath(),d.moveTo(b[0].x,b[0].y);if(e!==0&&c>2){var f=this.allPoints,g=f.length;d.quadraticCurveTo(f[0].x,f[0].y,f[1].x,f[1].y);var h=2;while(h<g-1)d.bezierCurveTo(f[h].x,f[h++].y,f[h].x,f[h++].y,f[h].x,f[h++].y);d.quadraticCurveTo(f[g-1].x,f[g-1].y,b[c-1].x,b[c-1].y)}else for(var h=1;h<c;h++){var i=b[h];d.lineTo(i.x,i.y)}a.stroke(this)},setPoints:function(a){Kinetic.Line.prototype.setPoints.call(this,a),this._setAllPoints()},setTension:function(a){this.setAttr("tension",a),this._setAllPoints()},_setAllPoints:function(){var a=this.getPoints(),b=a.length,c=this.getTension(),d=[];for(var e=1;e<b-1;e++){var f=Kinetic.Spline._getControlPoints(a[e-1],a[e],a[e+1],c);d.push(f[0]),d.push(a[e]),d.push(f[1])}this.allPoints=d}},Kinetic.Global.extend(Kinetic.Spline,Kinetic.Line),Kinetic.Node.addGetters(Kinetic.Spline,["tension"])}(),function(){Kinetic.Blob=function(a){this._initBlob(a)},Kinetic.Blob.prototype={_initBlob:function(a){Kinetic.Spline.call(this,a),this.shapeType="Blob"},drawFunc:function(a){var b=this.getPoints(),c=b.length,d=a.getContext(),e=this.getTension();d.beginPath(),d.moveTo(b[0].x,b[0].y);if(e!==0&&c>2){var f=this.allPoints,g=f.length,h=0;while(h<g-1)d.bezierCurveTo(f[h].x,f[h++].y,f[h].x,f[h++].y,f[h].x,f[h++].y)}else for(var h=1;h<c;h++){var i=b[h];d.lineTo(i.x,i.y)}d.closePath(),a.fillStroke(this)},_setAllPoints:function(){var a=this.getPoints(),b=a.length,c=this.getTension(),d=Kinetic.Spline._getControlPoints(a[b-1],a[0],a[1],c),e=Kinetic.Spline._getControlPoints(a[b-2],a[b-1],a[0],c);Kinetic.Spline.prototype._setAllPoints.call(this),this.allPoints.unshift(d[1]),this.allPoints.push(e[0]),this.allPoints.push(a[b-1]),this.allPoints.push(e[1]),this.allPoints.push(d[0]),this.allPoints.push(a[0])}},Kinetic.Global.extend(Kinetic.Blob,Kinetic.Spline)}(),function(){Kinetic.Sprite=function(a){this._initSprite(a)},Kinetic.Sprite.prototype={_initSprite:function(a){this.setDefaultAttrs({index:0,frameRate:17}),Kinetic.Shape.call(this,a),this.shapeType="Sprite",this._setDrawFuncs(),this.anim=new Kinetic.Animation;var b=this;this.on("animationChange",function(){b.setIndex(0)})},drawFunc:function(a){var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;f&&e.drawImage(f,d.x,d.y,d.width,d.height,0,0,d.width,d.height)},drawHitFunc:function(a){var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext();e.beginPath(),e.rect(0,0,d.width,d.height),e.closePath(),a.fill(this)},start:function(){var a=this,b=this.getLayer();this.anim.node=b,this.interval=setInterval(function(){var b=a.attrs.index;a._updateIndex(),a.afterFrameFunc&&b===a.afterFrameIndex&&(a.afterFrameFunc(),delete a.afterFrameFunc,delete a.afterFrameIndex)},1e3/this.attrs.frameRate),this.anim.start()},stop:function(){this.anim.stop(),clearInterval(this.interval)},afterFrame:function(a,b){this.afterFrameIndex=a,this.afterFrameFunc=b},_updateIndex:function(){var a=this.attrs.index,b=this.attrs.animation;a<this.attrs.animations[b].length-1?this.attrs.index++:this.attrs.index=0}},Kinetic.Global.extend(Kinetic.Sprite,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Sprite,["animation","animations","index"])}(),function(){Kinetic.Star=function(a){this._initStar(a)},Kinetic.Star.prototype={_initStar:function(a){this.setDefaultAttrs({numPoints:0,innerRadius:0,outerRadius:0}),Kinetic.Shape.call(this,a),this.shapeType="Star",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext(),c=this.attrs.innerRadius,d=this.attrs.outerRadius,e=this.attrs.numPoints;b.beginPath(),b.moveTo(0,0-this.attrs.outerRadius);for(var f=1;f<e*2;f++){var g=f%2===0?d:c,h=g*Math.sin(f*Math.PI/e),i=-1*g*Math.cos(f*Math.PI/e);b.lineTo(h,i)}b.closePath(),a.fillStroke(this)}},Kinetic.Global.extend(Kinetic.Star,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.Star,["numPoints","innerRadius","outerRadius"])}(),function(){Kinetic.RegularPolygon=function(a){this._initRegularPolygon(a)},Kinetic.RegularPolygon.prototype={_initRegularPolygon:function(a){this.setDefaultAttrs({radius:0,sides:0}),Kinetic.Shape.call(this,a),this.shapeType="RegularPolygon",this._setDrawFuncs()},drawFunc:function(a){var b=a.getContext(),c=this.attrs.sides,d=this.attrs.radius;b.beginPath(),b.moveTo(0,0-d);for(var e=1;e<c;e++){var f=d*Math.sin(e*2*Math.PI/c),g=-1*d*Math
.cos(e*2*Math.PI/c);b.lineTo(f,g)}b.closePath(),a.fillStroke(this)}},Kinetic.Global.extend(Kinetic.RegularPolygon,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.RegularPolygon,["radius","sides"])}(),function(){Kinetic.Path=function(a){this._initPath(a)},Kinetic.Path.prototype={_initPath:function(a){this.dataArray=[];var b=this;Kinetic.Shape.call(this,a),this.shapeType="Path",this._setDrawFuncs(),this.dataArray=Kinetic.Path.parsePathData(this.attrs.data),this.on("dataChange",function(){b.dataArray=Kinetic.Path.parsePathData(b.attrs.data)})},drawFunc:function(a){var b=this.dataArray,c=a.getContext();c.beginPath();for(var d=0;d<b.length;d++){var e=b[d].command,f=b[d].points;switch(e){case"L":c.lineTo(f[0],f[1]);break;case"M":c.moveTo(f[0],f[1]);break;case"C":c.bezierCurveTo(f[0],f[1],f[2],f[3],f[4],f[5]);break;case"Q":c.quadraticCurveTo(f[0],f[1],f[2],f[3]);break;case"A":var g=f[0],h=f[1],i=f[2],j=f[3],k=f[4],l=f[5],m=f[6],n=f[7],o=i>j?i:j,p=i>j?1:i/j,q=i>j?j/i:1;c.translate(g,h),c.rotate(m),c.scale(p,q),c.arc(0,0,o,k,k+l,1-n),c.scale(1/p,1/q),c.rotate(-m),c.translate(-g,-h);break;case"z":c.closePath()}}a.fillStroke(this)}},Kinetic.Global.extend(Kinetic.Path,Kinetic.Shape),Kinetic.Path.getLineLength=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))},Kinetic.Path.getPointOnLine=function(a,b,c,d,e,f,g){f===undefined&&(f=b),g===undefined&&(g=c);var h=(e-c)/(d-b+1e-8),i=Math.sqrt(a*a/(1+h*h));d<b&&(i*=-1);var j=h*i,k;if((g-c)/(f-b+1e-8)===h)k={x:f+i,y:g+j};else{var l,m,n=this.getLineLength(b,c,d,e);if(n<1e-8)return undefined;var o=(f-b)*(d-b)+(g-c)*(e-c);o/=n*n,l=b+o*(d-b),m=c+o*(e-c);var p=this.getLineLength(f,g,l,m),q=Math.sqrt(a*a-p*p);i=Math.sqrt(q*q/(1+h*h)),d<b&&(i*=-1),j=h*i,k={x:l+i,y:m+j}}return k},Kinetic.Path.getPointOnCubicBezier=function(a,b,c,d,e,f,g,h,i){function j(a){return a*a*a}function k(a){return 3*a*a*(1-a)}function l(a){return 3*a*(1-a)*(1-a)}function m(a){return(1-a)*(1-a)*(1-a)}var n=h*j(a)+f*k(a)+d*l(a)+b*m(a),o=i*j(a)+g*k(a)+e*l(a)+c*m(a);return{x:n,y:o}},Kinetic.Path.getPointOnQuadraticBezier=function(a,b,c,d,e,f,g){function h(a){return a*a}function i(a){return 2*a*(1-a)}function j(a){return(1-a)*(1-a)}var k=f*h(a)+d*i(a)+b*j(a),l=g*h(a)+e*i(a)+c*j(a);return{x:k,y:l}},Kinetic.Path.getPointOnEllipticalArc=function(a,b,c,d,e,f){var g=Math.cos(f),h=Math.sin(f),i={x:c*Math.cos(e),y:d*Math.sin(e)};return{x:a+(i.x*g-i.y*h),y:b+(i.x*h+i.y*g)}},Kinetic.Path.parsePathData=function(a){if(!a)return[];var b=a,c=["m","M","l","L","v","V","h","H","z","Z","c","C","q","Q","t","T","s","S","a","A"];b=b.replace(new RegExp(" ","g"),",");for(var d=0;d<c.length;d++)b=b.replace(new RegExp(c[d],"g"),"|"+c[d]);var e=b.split("|"),f=[],g=0,h=0;for(var d=1;d<e.length;d++){var i=e[d],j=i.charAt(0);i=i.slice(1),i=i.replace(new RegExp(",-","g"),"-"),i=i.replace(new RegExp("-","g"),",-"),i=i.replace(new RegExp("e,-","g"),"e-");var k=i.split(",");k.length>0&&k[0]===""&&k.shift();for(var l=0;l<k.length;l++)k[l]=parseFloat(k[l]);while(k.length>0){if(isNaN(k[0]))break;var m=null,n=[],o=g,p=h;switch(j){case"l":g+=k.shift(),h+=k.shift(),m="L",n.push(g,h);break;case"L":g=k.shift(),h=k.shift(),n.push(g,h);break;case"m":g+=k.shift(),h+=k.shift(),m="M",n.push(g,h),j="l";break;case"M":g=k.shift(),h=k.shift(),m="M",n.push(g,h),j="L";break;case"h":g+=k.shift(),m="L",n.push(g,h);break;case"H":g=k.shift(),m="L",n.push(g,h);break;case"v":h+=k.shift(),m="L",n.push(g,h);break;case"V":h=k.shift(),m="L",n.push(g,h);break;case"C":n.push(k.shift(),k.shift(),k.shift(),k.shift()),g=k.shift(),h=k.shift(),n.push(g,h);break;case"c":n.push(g+k.shift(),h+k.shift(),g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),m="C",n.push(g,h);break;case"S":var q=g,r=h,s=f[f.length-1];s.command==="C"&&(q=g+(g-s.points[2]),r=h+(h-s.points[3])),n.push(q,r,k.shift(),k.shift()),g=k.shift(),h=k.shift(),m="C",n.push(g,h);break;case"s":var q=g,r=h,s=f[f.length-1];s.command==="C"&&(q=g+(g-s.points[2]),r=h+(h-s.points[3])),n.push(q,r,g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),m="C",n.push(g,h);break;case"Q":n.push(k.shift(),k.shift()),g=k.shift(),h=k.shift(),n.push(g,h);break;case"q":n.push(g+k.shift(),h+k.shift()),g+=k.shift(),h+=k.shift(),m="Q",n.push(g,h);break;case"T":var q=g,r=h,s=f[f.length-1];s.command==="Q"&&(q=g+(g-s.points[0]),r=h+(h-s.points[1])),g=k.shift(),h=k.shift(),m="Q",n.push(q,r,g,h);break;case"t":var q=g,r=h,s=f[f.length-1];s.command==="Q"&&(q=g+(g-s.points[0]),r=h+(h-s.points[1])),g+=k.shift(),h+=k.shift(),m="Q",n.push(q,r,g,h);break;case"A":var t=k.shift(),u=k.shift(),v=k.shift(),w=k.shift(),x=k.shift(),y=g,z=h;g=k.shift(),h=k.shift(),m="A",n=this.convertEndpointToCenterParameterization(y,z,g,h,w,x,t,u,v);break;case"a":var t=k.shift(),u=k.shift(),v=k.shift(),w=k.shift(),x=k.shift(),y=g,z=h;g+=k.shift(),h+=k.shift(),m="A",n=this.convertEndpointToCenterParameterization(y,z,g,h,w,x,t,u,v)}f.push({command:m||j,points:n,start:{x:o,y:p},pathLength:this.calcLength(o,p,m||j,n)})}(j==="z"||j==="Z")&&f.push({command:"z",points:[],start:undefined,pathLength:0})}return f},Kinetic.Path.calcLength=function(a,b,c,d){var e,f,g,h=Kinetic.Path;switch(c){case"L":return h.getLineLength(a,b,d[0],d[1]);case"C":e=0,f=h.getPointOnCubicBezier(0,a,b,d[0],d[1],d[2],d[3],d[4],d[5]);for(t=.01;t<=1;t+=.01)g=h.getPointOnCubicBezier(t,a,b,d[0],d[1],d[2],d[3],d[4],d[5]),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;return e;case"Q":e=0,f=h.getPointOnQuadraticBezier(0,a,b,d[0],d[1],d[2],d[3]);for(t=.01;t<=1;t+=.01)g=h.getPointOnQuadraticBezier(t,a,b,d[0],d[1],d[2],d[3]),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;return e;case"A":e=0;var i=d[4],j=d[5],k=d[4]+j,l=Math.PI/180;Math.abs(i-k)<l&&(l=Math.abs(i-k)),f=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],i,0);if(j<0)for(t=i-l;t>k;t-=l)g=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],t,0),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;else for(t=i+l;t<k;t+=l)g=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],t,0),e+=h.getLineLength(f.x,f.y,g.x,g.y),f=g;return g=h.getPointOnEllipticalArc(d[0],d[1],d[2],d[3],k,0),e+=h.getLineLength(f.x,f.y,g.x,g.y),e}return 0},Kinetic.Path.convertEndpointToCenterParameterization=function(a,b,c,d,e,f,g,h,i){var j=i*(Math.PI/180),k=Math.cos(j)*(a-c)/2+Math.sin(j)*(b-d)/2,l=-1*Math.sin(j)*(a-c)/2+Math.cos(j)*(b-d)/2,m=k*k/(g*g)+l*l/(h*h);m>1&&(g*=Math.sqrt(m),h*=Math.sqrt(m));var n=Math.sqrt((g*g*h*h-g*g*l*l-h*h*k*k)/(g*g*l*l+h*h*k*k));e==f&&(n*=-1),isNaN(n)&&(n=0);var o=n*g*l/h,p=n*-h*k/g,q=(a+c)/2+Math.cos(j)*o-Math.sin(j)*p,r=(b+d)/2+Math.sin(j)*o+Math.cos(j)*p,s=function(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1])},t=function(a,b){return(a[0]*b[0]+a[1]*b[1])/(s(a)*s(b))},u=function(a,b){return(a[0]*b[1]<a[1]*b[0]?-1:1)*Math.acos(t(a,b))},v=u([1,0],[(k-o)/g,(l-p)/h]),w=[(k-o)/g,(l-p)/h],x=[(-1*k-o)/g,(-1*l-p)/h],y=u(w,x);return t(w,x)<=-1&&(y=Math.PI),t(w,x)>=1&&(y=0),f===0&&y>0&&(y-=2*Math.PI),f==1&&y<0&&(y+=2*Math.PI),[q,r,g,h,v,y,j,f]},Kinetic.Node.addGettersSetters(Kinetic.Path,["data"])}(),function(){function a(a){a.fillText(this.partialText,0,0)}function b(a){a.strokeText(this.partialText,0,0)}Kinetic.TextPath=function(a){this._initTextPath(a)},Kinetic.TextPath.prototype={_initTextPath:function(c){this.setDefaultAttrs({fontFamily:"Calibri",fontSize:12,fontStyle:"normal",text:""}),this.dummyCanvas=document.createElement("canvas"),this.dataArray=[];var d=this;Kinetic.Shape.call(this,c),this._fillFunc=a,this._strokeFunc=b,this.shapeType="TextPath",this._setDrawFuncs(),this.dataArray=Kinetic.Path.parsePathData(this.attrs.data),this.on("dataChange",function(){d.dataArray=Kinetic.Path.parsePathData(this.attrs.data)});var e=["text","textStroke","textStrokeWidth"];for(var f=0;f<e.length;f++){var g=e[f];this.on(g+"Change",d._setTextData)}d._setTextData()},drawFunc:function(a){var b=this.charArr,c=a.getContext();c.font=this.attrs.fontStyle+" "+this.attrs.fontSize+"pt "+this.attrs.fontFamily,c.textBaseline="middle",c.textAlign="left",c.save();var d=this.glyphInfo;for(var e=0;e<d.length;e++){c.save();var f=d[e].p0,g=d[e].p1,h=parseFloat(this.attrs.fontSize);c.translate(f.x,f.y),c.rotate(d[e].rotation),this.partialText=d[e].text,a.fillStroke(this),c.restore()}c.restore()},getTextWidth:function(){return this.textWidth},getTextHeight:function(){return this.textHeight},setText:function(a){Kinetic.Text.prototype.setText.call(this,a)},_getTextSize:function(a){var b=this.dummyCanvas,c=b.getContext("2d");c.save(),c.font=this.attrs.fontStyle+" "+this.attrs.fontSize+"pt "+this.attrs.fontFamily;var d=c.measureText(a);return c.restore(),{width:d.width,height:parseInt(this.attrs.fontSize,10)}},_setTextData:function(){var a=this,b=this._getTextSize(this.attrs.text);this.textWidth=b.width,this.textHeight=b.height,this.glyphInfo=[];var c=this.attrs.text.split(""),d,e,f,g=-1,h=0,i=function(){h=0;var b=a.dataArray;for(var c=g+1;c<b.length;c++){if(b[c].pathLength>0)return g=c,b[c];b[c].command=="M"&&(d={x:b[c].points[0],y:b[c].points[1]})}return{}},j=function(b,c){var g=a._getTextSize(b).width,j=0,k=0,l=!1;e=undefined;while(Math.abs(g-j)/g>.01&&k<25){k++;var m=j;while(f===undefined)f=i(),f&&m+f.pathLength<g&&(m+=f.pathLength,f=undefined);if(f==={}||d===undefined)return undefined;var n=!1;switch(f.command){case"L":Kinetic.Path.getLineLength(d.x,d.y,f.points[0],f.points[1])>g?e=Kinetic.Path.getPointOnLine(g,d.x,d.y,f.points[0],f.points[1],d.x,d.y):f=undefined;break;case"A":var o=f.points[4],p=f.points[5],q=f.points[4]+p;h===0?h=o+1e-8:g>j?h+=Math.PI/180*p/Math.abs(p):h-=Math.PI/360*p/Math.abs(p),Math.abs(h)>Math.abs(q)&&(h=q,n=!0),e=Kinetic.Path.getPointOnEllipticalArc(f.points[0],f.points[1],f.points[2],f.points[3],h,f.points[6]);break;case"C":h===0?g>f.pathLength?h=1e-8:h=g/f.pathLength:g>j?h+=(g-j)/f.pathLength:h-=(j-g)/f.pathLength,h>1&&(h=1,n=!0),e=Kinetic.Path.getPointOnCubicBezier(h,f.start.x,f.start.y,f.points[0],f.points[1],f.points[2],f.points[3],f.points[4],f.points[5]);break;case"Q":h===0?h=g/f.pathLength:g>j?h+=(g-j)/f.pathLength:h-=(j-g)/f.pathLength,h>1&&(h=1,n=!0),e=Kinetic.Path.getPointOnQuadraticBezier(h,f.start.x,f.start.y,f.points[0],f.points[1],f.points[2],f.points[3])}e!==undefined&&(j=Kinetic.Path.getLineLength(d.x,d.y,e.x,e.y)),n&&(n=!1,f=undefined)}};for(var k=0;k<c.length;k++){j(c[k]);if(d===undefined||e===undefined)break;var l=Kinetic.Path.getLineLength(d.x,d.y,e.x,e.y),m=0,n=Kinetic.Path.getPointOnLine(m+l/2,d.x,d.y,e.x,e.y),o=Math.atan2(e.y-d.y,e.x-d.x);this.glyphInfo.push({transposeX:n.x,transposeY:n.y,text:c[k],rotation:o,p0:d,p1:e}),d=e}}},Kinetic.Global.extend(Kinetic.TextPath,Kinetic.Shape),Kinetic.Node.addGettersSetters(Kinetic.TextPath,["fontFamily","fontSize","fontStyle"]),Kinetic.Node.addGetters(Kinetic.TextPath,["text"])}();

///////////////////////////////////////////////////////////////////////////////
//                            kinetic.prototype.js                           //
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////
//      Kinetic.Stage      //
/////////////////////////////
Kinetic.Stage.prototype.createCopy = function () {
  var copy = [], children = this.getChildren(), i;
  for (i = 0; i < children.length; i++) {
    copy.push(children[i].clone());
  }
  return copy;
};
Kinetic.Stage.prototype.getScaledWidth = function() {
  return Math.ceil(this.getWidth() / this.getScale().x);
};
Kinetic.Stage.prototype.getScaledHeight = function() {
  return Math.ceil(this.getHeight() / this.getScale().y);
};
Kinetic.Stage.prototype.getSaveWidth = function() {
  return this.im.saveWidth;
};
Kinetic.Stage.prototype.getSaveHeight = function() {
  return this.im.saveHeight;
};
Kinetic.Stage.prototype.getTotalDimensions = function() {
  var minY = (this.getSaveHeight() / 2 - this.im.center.y) * this.getScale().y;
  var maxY = minY + this.getHeight() - (this.getSaveHeight() * this.getScale().y);

  var minX = (this.getSaveWidth() / 2 - this.im.center.x) * this.getScale().x;
  var maxX = minX + this.getWidth() - (this.getSaveWidth() * this.getScale().x);

  return {
    min: {
      x: minX,
      y: minY
    },
    max: {
      x: maxX,
      y: maxY
    },
    width:this.getScaledWidth(),
    height:this.getScaledHeight(),
    visibleWidth:Math.max(this.getSaveWidth(),this.getScaledWidth() * 2 - this.getSaveWidth()),
    visibleHeight:Math.max(this.getSaveHeight(),this.getScaledHeight() * 2 - this.getSaveHeight())
  };
};
Kinetic.Stage.prototype.loadCopy = function (copy) {
  var i;
  this.removeChildren();
  for (i = 0; i < copy.length; i++) {
    this.add(copy[i]);
  }
  this.draw();
};

/////////////////////////////
//      Kinetic.Image      //
/////////////////////////////
Kinetic.Image.prototype.getImageData = function() {
  var canvas = new Kinetic.Canvas(this.attrs.image.width, this.attrs.image.height);
  var context = canvas.getContext();
  context.drawImage(this.attrs.image, 0, 0);
  try {
      var imageData = context.getImageData(0, 0, canvas.getWidth(), canvas.getHeight());
      return imageData;
  } catch(e) {
      Kinetic.Global.warn('Unable to get imageData.');
  }
};

/////////////////////////////
//      Kinetic.Layer      //
/////////////////////////////
Kinetic.Layer.prototype._cacheddraw = (new Kinetic.Layer).draw;
Kinetic.Layer.prototype.draw = function() {
  if (typeof im === 'undefined' || typeof im.trigger === 'undefined') {
    return this._cacheddraw();
  }
  im.trigger('beforeredraw',this);
  var draw = this._cacheddraw();
  im.trigger('afterredraw',this);
  return draw;
};

/////////////////////////////
//       Kinetic.Text      //
/////////////////////////////
Kinetic.Text.prototype.rasterize = function(e) {
  var layer = this.parent;
  var me = this;
  this.toImage({
    callback:function(img){
      var rasterizedImage = new Kinetic.Image({image:img,x:me.getPosition().x,y:me.getPosition().y});
      me.remove();
      layer.add(rasterizedImage).draw();
      e.callback(rasterizedImage);
    }
  });
};


///////////////////////////////////////////////////////////////////////////////
//                               imageeditor.js                              //
///////////////////////////////////////////////////////////////////////////////

var ImageEditor = function (settings) {
  "use strict";
  if (settings === undefined) return this;
  var im           = this, x, round = function(float){return Math.round(float)};
  im.width         = settings.width;
  im.height        = settings.height;
  im.saveWidth     = settings.saveWidth || round(im.width / 2);
  im.saveHeight    = settings.saveHeight || round(im.height / 2);
  im.strictSize    = (settings.saveWidth !== undefined ? true : false);
  im.stage         = new Kinetic.Stage(settings);
  im.namespaces    = {};
  im.controlSets   = {};
  im.components    = {};
  im.filters       = {};
  im.scale         = 1;
  im.crosshair     = new Image();
  im.uniqid        = im.stage.getContainer().id;
  im.editorContext = $(im.stage.getContainer()).parent();
  im.domContext    = im.editorContext.parent();

  im.showLoader = $.fn.dialog.showLoader;
  im.hideLoader = $.fn.dialog.hideLoader;
  im.stage.im = im;
  im.stage.elementType = 'stage';
  im.crosshair.src = '/concrete/images/image_editor/crosshair.png';

  im.center = {
    x: Math.round(im.width / 2),
    y: Math.round(im.height / 2)
  };

  im.centerOffset = {
    x: im.center.x,
    y: im.center.y
  };

  var getElem = function(selector) {
    return $(selector, im.domContext);
  },
  log = function() {
    if (settings.debug === true && console !== undefined) {
      var args = arguments;
      if (args.length == 1) args = args[0];
      console.log(args);
    }
  },
  error = function() {
    if (console !== undefined) {
      var args = arguments;
      if (args.length == 1) args = args[0];
      console.error(args);
    }
  };


///////////////////////////////////////////////////////////////////////////////
//                                 history.js                                //
///////////////////////////////////////////////////////////////////////////////
var History = function () {
  var h = this;
  h.history = [];
  h.pointer = -1;
  h.save = function () {
    im.fire('beforehistorysave');
    h.history = h.history.slice(0, h.pointer + 1);
    h.history.push(im.stage.createCopy());
    h.movePointer(1);
    im.fire('historysave');
  };
  h.movePointer = function (diff) {
    h.pointer += diff;
    (h.pointer < 0 && (h.pointer = 0));
    (h.pointer >= h.history.length && (h.pointer = h.history.length - 1));
    return h.pointer;
  };
  h.render = function () {
    im.fire('beforehistoryrender');
    im.stage.loadCopy(h.history[h.pointer]);
    im.fire('historyrender');
  };
  h.undo = function () {
    im.fire('beforehistoryundo');
    h.movePointer(-1);
    h.render();
    im.fire('historyundo');
  };
  h.redo = function () {
    im.fire('beforehistoryredo');
    h.movePointer(1);
    h.render();
    im.fire('historyredo');
  };
};
im.history = new History();


///////////////////////////////////////////////////////////////////////////////
//                                 events.js                                 //
///////////////////////////////////////////////////////////////////////////////
// Handle event binding.
im.bindEvent = im.bind = im.on = function (type, handler, elem) {
  var element = elem || im.stage.getContainer();
  ccm_event.sub(type,handler,element);
};

// Handle event firing
im.fireEvent = im.fire = im.trigger = function (type, data, elem) {
  var element = im.stage.getContainer() || elem;
  ccm_event.pub(type,data,element);
};


///////////////////////////////////////////////////////////////////////////////
//                                elements.js                                //
///////////////////////////////////////////////////////////////////////////////
im.addElement = function(object,type) {
  var layer = new Kinetic.Layer();
  layer.add(object);
  object.setX(im.center.x - Math.round(object.getWidth() / 2));
  object.setY(im.center.y - Math.round(object.getHeight() / 2));

  object.elementType = type;

  object.on('click',function(){
    im.fire('ClickedElement',this);
  });
  im.stage.add(layer);
  im.fire('newObject',{object:object,type:type});
  im.stage.draw();
};
im.setActiveElement = function(element) {
  if (im.activeElement == element) return;

  if (element === im.stage) {
    im.trigger('ChangeActiveAction','ControlSet_Position');
  }
  im.trigger('beforeChangeActiveElement',im.activeElement);
  im.alterCore('activeElement',element);
  im.trigger('changeActiveElement',element);
  im.stage.draw();
};
im.bind('ClickedElement',function(e) {
  if (e.eventData.getWidth() > im.stage.getScaledWidth() || e.eventData.getHeight() > im.stage.getScaledHeight()) {
    im.setActiveElement(im.stage);
    return;
  }

  im.setActiveElement(e.eventData);
});

im.bind('stageChanged',function(e){
  if (im.activeElement.getWidth() > im.stage.getScaledWidth() || im.activeElement .getHeight() > im.stage.getScaledHeight()) {
    im.setActiveElement(im.stage);
  }
});


///////////////////////////////////////////////////////////////////////////////
//                                controls.js                                //
///////////////////////////////////////////////////////////////////////////////
// Zoom
var controlBar = getElem(im.stage.getContainer()).parent().children('.bottomBar');

var zoom = {};

zoom.in = getElem("<span><i class='icon-plus'></i></span>");
zoom.out = getElem("<span><i class='icon-minus'></i></span>");

zoom.in.appendTo(controlBar);
zoom.out.appendTo(controlBar);

zoom.in.click(function(e){im.fire('zoomInClick',e)});
zoom.out.click(function(e){im.fire('zoomOutClick',e)});

var scale = getElem('<span></span>').addClass('scale').text('100%');
im.on('stageChanged',function(e){
  scale.text(Math.round(im.scale * 10000)/100 + "%");
});
scale.appendTo(controlBar);

var minScale = 0, maxScale = 3000, stepScale = 1/4;

im.on('zoomInClick',function(e){

  var adjustment = (im.scale * stepScale);
  im.scale += adjustment;

  if (im.scale > stepScale && (Math.abs(im.scale - Math.round(im.scale)) % 1) < stepScale / 2) im.scale = Math.round(im.scale);
  im.scale = Math.round(im.scale * 1000) / 1000;
  im.alterCore('scale',im.scale);

  im.stage.setScale(im.scale);

  im.stage.setX(im.stage.getX() + (-.5 * adjustment * im.stage.getWidth()));
  im.stage.setY(im.stage.getY() + (-.5 * adjustment * im.stage.getHeight()));
  
  var pos = (im.stage.getDragBoundFunc())({x:im.stage.getX(),y:im.stage.getY()});
  im.stage.setX(pos.x);
  im.stage.setY(pos.y);


  im.fire('stageChanged');
  im.stage.draw();
});
im.on('zoomOutClick',function(e){

  var adjustment = (im.scale * stepScale);
  im.scale -= adjustment;

  if (im.scale > stepScale && (Math.abs(im.scale - Math.round(im.scale)) % 1) < stepScale / 2) im.scale = Math.round(im.scale);
  im.scale = Math.round(im.scale * 1000) / 1000;
  im.alterCore('scale',im.scale);

  im.stage.setScale(im.scale);

  im.stage.setX(im.stage.getX() - (-.5 * adjustment * im.stage.getWidth()));
  im.stage.setY(im.stage.getY() - (-.5 * adjustment * im.stage.getHeight()));
  
  var pos = (im.stage.getDragBoundFunc())({x:im.stage.getX(),y:im.stage.getY()});
  im.stage.setX(pos.x);
  im.stage.setY(pos.y);

  im.fire('stageChanged');
  im.stage.draw();
});

// Save
var saveSize = {};

saveSize.width = getElem('<input/>');
saveSize.height = getElem('<input/>');
saveSize.both = saveSize.height.add(saveSize.width).width(32);

saveSize.area = getElem('<span/>').css({float:'right',margin:'-5px 14px 0 0'});
saveSize.width.appendTo(saveSize.area);
saveSize.area.append(getElem('<span> x </span>'));
saveSize.height.appendTo(saveSize.area);
saveSize.area.appendTo(controlBar);

var saveButton = $('<button/>').addClass('btn').addClass('btn-primary').text('Save');
saveButton.appendTo(saveSize.area);
saveButton.click(function(){im.save()});


if (im.strictSize) {
  saveSize.both.attr('disabled','true');
} else {
  saveSize.both.keydown(function(e){
    log(e.keyCode);
    if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39) return true;

    if (e.keyCode == 38) {
      var newval = parseInt($(this).val()) + 1;
      $(this).val(Math.min(5000,newval)).change();
    }
    if (e.keyCode == 40) {
      var newval = parseInt($(this).val()) - 1;
      $(this).val(Math.max(0,newval)).change();
    }
    var key = String.fromCharCode(e.keyCode);
    if (!key.match(/\d/)) {
      return false;
    }
    var amnt = "" + $(this).val() + key;
    if (amnt > 5000) {
      amnt = 5000;
    }
    $(this).val(amnt).change();

    return false;
  }).keyup(function(e){
    if (e.keyCode == 8) im.fire('editedSize');
  }).change(function(){
    im.fire('editedSize');
  });
}


im.bind('editedSize',function(){
  im.saveWidth = parseInt(saveSize.width.val());
  im.saveHeight = parseInt(saveSize.height.val());

  if (isNaN(im.saveWidth)) im.saveWidth = 0;
  if (isNaN(im.saveHeight)) im.saveHeight = 0;

  im.trigger('saveSizeChange');
  im.buildBackground();
});

im.bind('saveSizeChange',function(){
  saveSize.width.val(im.saveWidth);
  saveSize.height.val(im.saveHeight);
});


///////////////////////////////////////////////////////////////////////////////
//                                  save.js                                  //
///////////////////////////////////////////////////////////////////////////////
im.save = function() {
  im.savers.hide();
  im.background.hide();
  im.stage.setScale(1);

  im.fire('ChangeActiveAction');
  im.fire('changeActiveComponent');

  $(im.stage.getContainer()).hide();

  var startx = Math.round(im.center.x - (im.saveWidth / 2)),
      starty = Math.round(im.center.y - (im.saveHeight / 2)),
      oldx = im.stage.getX(),
      oldy = im.stage.getY(),
      oldwidth = im.stage.getWidth(),
      oldheight = im.stage.getHeight();

  im.stage.setX(-startx);
  im.stage.setY(-starty);
  im.stage.setWidth(Math.max(im.stage.getWidth(),im.saveWidth));
  im.stage.setHeight(Math.max(im.stage.getHeight(),im.saveHeight));
  im.stage.draw();


  im.showLoader('Saving..');
  im.stage.toDataURL({
    width:im.saveWidth,
    height:im.saveHeight,
    callback:function(data){
      var img = $('<img/>').attr('src',data);
      $.fn.dialog.open({element:img});
      im.hideLoader();
      im.savers.show();
      im.background.show();
      im.stage.setX(oldx);
      im.stage.setY(oldy);
      im.stage.setWidth(oldwidth);
      im.stage.setHeight(oldheight);
      im.stage.setScale(im.scale);
      im.stage.draw();
      $(im.stage.getContainer()).show();
    }
  })
};


///////////////////////////////////////////////////////////////////////////////
//                                 extend.js                                 //
///////////////////////////////////////////////////////////////////////////////
im.extend = function(property,value) {
  this[property] = value;
};

im.alterCore = function(property,value) {
  var nim = im, ns = 'core', i;
  if (im.namespace) {
    var ns = nim.namespace;
    nim = im.realIm;
  }
  im[property] = value;
  for (i in im.controlSets){
    im.controlSets[i].im.extend(property,value);
  }
  for (i in im.filters){
    im.filters[i].im.extend(property,value);
  }
  for (i in im.components){
    im.components[i].im.extend(property,value);
  }
};

im.clone = function(namespace) {
  var newim = new ImageEditor(),i;
  newim.realIm = im;
  for (i in im) {
    newim[i] = im[i];
  }
  newim.namespace = namespace;
  return newim;
};


im.addControlSet = function(ns,js,elem) {
  if (jQuery && elem instanceof jQuery) elem = elem[0];
  elem.controlSet = function(im,js) {
    this.im = im;
    try {
      eval(js);
    } catch(e) {
      error(e);
      var pos = e.stack.replace(/[\S\s]+at HTMLDivElement.eval.+?<anonymous>:(\d+:\d+)[\S\s]+/,'$1').split(':');
      var jsstack = js.split("\n");
      var error = "Parse error at line #"+pos[0]+" char #"+pos[1]+" within "+ns;
      error += "\n"+jsstack[parseInt(pos[0])-1];
      error += "\n"+(new Array(parseInt(pos[1])).join(" "))+"^";
      error(error);
    }
    return this;
  };
  var newim = im.clone(ns);
  var nso = elem.controlSet(newim,js);
  im.controlSets[ns] = nso;
  return nso;
};

im.addFilter = function(ns,js) {
  var filter = function(im,js) {
    this.im = im;
    eval(js);
    return this;
  };
  var newim = im.clone(ns);
  var nso = new filter(newim,js);
  im.filters[ns] = nso;
  return nso;
};

im.addComponent = function(ns,js,elem) {
  if (jQuery && elem instanceof jQuery) elem = elem[0];
  elem.component = function(im,js) {
    this.im = im;
    try {
      eval(js);
    } catch(e) {
      error(e);
      var pos = e.stack.replace(/[\S\s]+at HTMLDivElement.eval.+?<anonymous>:(\d+:\d+)[\S\s]+/,'$1').split(':');
      var jsstack = js.split("\n");
      var error = "Parse error at line #"+pos[0]+" char #"+pos[1]+" within "+ns;
      error += "\n"+jsstack[parseInt(pos[0])-1];
      error += "\n"+(new Array(parseInt(pos[1])).join(" "))+"^";
      error(error);
    }
    return this;
  };
  var newim = im.clone(ns);
  var nso = elem.component(newim,js);
  im.components[ns] = nso;
  return nso;
};


///////////////////////////////////////////////////////////////////////////////
//                               background.js                               //
///////////////////////////////////////////////////////////////////////////////
// Set up background
im.background = new Kinetic.Layer();
im.stage.add(im.background);

im.buildBackground = function() {
  var z = im.background.getZIndex();
  im.background.destroy();
  im.background = new Kinetic.Layer();
  im.stage.add(im.background);
  im.background.setZIndex(z);

  var getCoords = function (x, offset) {
    // slope = 1
    return {x: x, y: -x + offset};
  };

  var dimensions = im.stage.getTotalDimensions();
  im.totalBackground = new Kinetic.Rect({
    x:dimensions.max.x + dimensions.width,
    y:dimensions.max.y + dimensions.height,
    width:to,
    height:to,
    fill:'#ccc'
  });

  im.saveArea = new Kinetic.Rect({
    width:im.saveWidth,
    height:im.saveHeight,
    x:Math.floor(im.center.x - (im.saveWidth / 2)),
    y:Math.floor(im.center.y - (im.saveHeight / 2)),
    fill:'white'
  })

  im.background.add(im.totalBackground);
  im.background.add(im.saveArea);
  // Todo, make this more efficient, as this is not a sound algorithm.
  // This should only draw in the visible space.
  if (im.scale < .25) return;
  var to = dimensions.max.x + dimensions.visibleHeight + dimensions.visibleWidth;
  if (im.scale > 1) to *= im.scale;
  for (x = -(dimensions.max.x + dimensions.visibleHeight); x <= to; x += 20) {
    im.background.add(new Kinetic.Line({
      points: [getCoords(-to, x), getCoords(to, x)],
      stroke: '#e3e3e3'
    }));
  }
  im.background.draw();
};
im.buildBackground();

im.on('stageChanged',im.buildBackground);


///////////////////////////////////////////////////////////////////////////////
//                               imagestage.js                               //
///////////////////////////////////////////////////////////////////////////////


im.stage.setDragBoundFunc(function(ret) {


  var dim = im.stage.getTotalDimensions();

  var maxx = Math.max(dim.max.x,dim.min.x)-1,
      minx = Math.min(dim.max.x,dim.min.x)+1,
      maxy = Math.max(dim.max.y,dim.min.y)-1,
      miny = Math.min(dim.max.y,dim.min.y)+1;

  ret.x = Math.floor(ret.x);
  ret.y = Math.floor(ret.y);

  if (ret.x > maxx) ret.x = maxx;
  if (ret.x < minx) ret.x = minx;
  if (ret.y > maxy) ret.y = maxy;
  if (ret.y < miny) ret.y = miny;

  ret.x = Math.floor(ret.x);
  ret.y = Math.floor(ret.y);

  return ret;
});
im.setActiveElement(im.stage);
im.stage.setDraggable(true);


///////////////////////////////////////////////////////////////////////////////
//                                  image.js                                 //
///////////////////////////////////////////////////////////////////////////////
var img = new Image();
img.src = settings.src;
img.onload = function () {
  if (!im.strictSize) {
    im.saveWidth = img.width;
    im.saveHeight = img.height;
    im.buildBackground();
  }
  var center = {
    x: im.center.x - (img.width / 2),
    y: im.center.y - (img.height / 2)
  };
  im.image = new Kinetic.Image({
    image: img,
    x: Math.round(center.x),
    y: Math.round(center.y)
  });
  im.imageData = im.image.getImageData();
  im.fire('imageload');
  im.addElement(im.image,'image');
};


///////////////////////////////////////////////////////////////////////////////
//                                 actions.js                                //
///////////////////////////////////////////////////////////////////////////////
im.bind('imageload',function(){
  var cs = settings.controlsets || {}, filters = settings.filters || {}, namespace, firstcs;
  var running = 0;
  log('Loading ControlSets');
  im.fire('LoadingControlSets');
  for (namespace in cs) {
    var myns = "ControlSet_" + namespace;
    $.ajax(cs[namespace]['src'],{
      dataType:'text',
      cache:false,
      namespace:namespace,
      myns:myns,
      beforeSend:function(){running++;},
      success:function(js){
        running--;
        var nso = im.addControlSet(this.myns,js,cs[this.namespace]['element']);
        log(nso);
        im.fire('controlSetLoad',nso);
        if (0 == running) {
          im.trigger('ControlSetsLoaded');
        }
      },
      error: function(xhr, errDesc, exception) {
        running--;
        if (0 == running) {
          im.trigger('ControlSetsLoaded');
        }
      }
    });
  }
});

im.bind('ControlSetsLoaded',function(){
  im.fire('LoadingComponents');
  var components = settings.components || {}, namespace, running = 0;
  log('Loading Components');
  for (namespace in components) {
    var myns = "Component_" + namespace;
    $.ajax(components[namespace]['src'],{
      dataType:'text',
      cache:false,
      namespace:namespace,
      myns:myns,
      beforeSend:function(){running++;},
      success:function(js){
        running--;
        var nso = im.addComponent(this.myns,js,components[this.namespace]['element']);
        log(nso);
        im.fire('ComponentLoad',nso);
        if (0 == running) {
          im.trigger('ComponentsLoaded');
        }
      },
      error: function(xhr, errDesc, exception) {
        running--;
        if (0 == running) {
          im.trigger('ComponentsLoaded');
        }
      }
    });
  }
});

im.bind('ComponentsLoaded',function(){ // do this when the control sets finish loading.
  log('Loading Filters');
  var filters = settings.filters || {}, namespace, firstf, firstc;
  im.fire('LoadingFilters');
  for (namespace in filters) {
    var myns = "Filter_" + namespace;
    var name = filters[namespace].name;
    if (!firstf) firstf = myns;
    $.ajax(filters[namespace].src,{
      dataType:'text',
      cache:false,
      namespace:namespace,
      myns:myns,
      name:name,
      success:function(js){
        var nso = im.addFilter(this.myns,js);
        nso.name = this.name;
        im.fire('filterLoad',nso);
      }
    });
  }
});
im.bind('ChangeActiveAction',function(e){
  var ns = e.eventData;
  if (ns === im.activeControlSet) return;
  for (var ons in im.controlSets) {
    if (ons !== ns) getElem(im.controlSets[ons]).slideUp();
  }
  im.activeControlSet = ns;
  im.alterCore('activeControlSet',ns);
  if (!ns) return;
  var cs = $(im.controlSets[ns]),
      height = cs.show().height();
  if (cs.length == 0) return;
  cs.hide().height(height).slideDown(function(){$(this).height('')});
});

im.bind('ChangeActiveComponent',function(e){
  var ns = e.eventData;
  if (ns === im.activeComponent) return;
  for (var ons in im.components) {
    if (ons !== ns) getElem(im.components[ons]).slideUp();
  }
  im.activeComponent = ns;
  im.alterCore('activeComponent',ns);
  if (!ns) return;
  var cs = $(im.components[ns]),
      height = cs.show().height();
  if (cs.length == 0) return;
  cs.hide().height(height).slideDown(function(){$(this).height('')});
});

im.bind('ChangeNavTab',function(e) {
  console.log('changenavtab',e);
  im.trigger('ChangeActiveAction',e.eventData);
  im.trigger('ChangeActiveComponent',e.eventData);
  var parent = getElem('div.editorcontrols');
  switch(e.eventData) {
    case 'add':
      parent.children('div.control-sets').hide();
      parent.children('div.components').show();
      break;
    case 'edit':
      parent.children('div.components').hide();
      parent.children('div.control-sets').show();
      break;
  }
});


///////////////////////////////////////////////////////////////////////////////
//                              jquerybinding.js                             //
///////////////////////////////////////////////////////////////////////////////
// End the ImageEditor object.

  
  im.setActiveElement(im.stage);

  window.c5_image_editor = im; // Safe keeping
  window.im = im;
  return im;
};
$.fn.ImageEditor = function (settings) {
  (settings === undefined && (settings = {}));
  settings.imageload = $.fn.dialog.hideLoader;
  var self = $(this);
  settings.container = self[0];
  if (self.height() == 0) {
    setTimeout(function(){
      self.ImageEditor(settings);
    },50);
    return;
  }
  self.height(self.height()-31);
  (settings.width === undefined && (settings.width = self.width()));
  (settings.height === undefined && (settings.height = self.height()));
  $.fn.dialog.showLoader();
  var im = new ImageEditor(settings);

  var context = im.domContext;
  $('div.controls',context).children('ul.nav').children().click(function(){
    if ($(this).hasClass('active')) return false;
    $('div.controls',context).children('ul.nav').children().removeClass('active');
    $(this).addClass('active');
    im.trigger('ChangeNavTab',$(this).text().toLowerCase());
    return false;
  });
  $('div.controlset',context).find('div.control').children('div.contents').slideUp(0)
  .end().end().find('h4').click(function(){
    $('div.controlset',context).find('h4').not($(this)).removeClass('active');
    var ns = $(this).parent().attr('data-namespace');
    im.trigger('ChangeActiveAction',"ControlSet_"+ns);
  });

  $('div.component',context).find('div.control').children('div.contents').slideUp(0).hide()
  .end().end().find('h4').click(function(){
    $('div.component',context).children('h4').not($(this)).removeClass('active');
    var ns = $(this).parent().attr('data-namespace');
    im.trigger('ChangeActiveComponent',"Component_"+ns);
  });
  $('div.components').hide();

  im.bind('imageload', $.fn.dialog.hideLoader);
  return im;
};


///////////////////////////////////////////////////////////////////////////////
//                                 filters.js                                //
///////////////////////////////////////////////////////////////////////////////
ImageEditor.prototype.filter = {};
ImageEditor.prototype.filter.grayscale = Kinetic.Filters.Grayscale;
ImageEditor.prototype.filter.sepia = function (imageData) {
  var i;
  var data = imageData.data;
  for (i = 0; i < data.length; i += 4) {
    data[i]     = (data[i] * 0.393 + data[i + 1] * 0.769 + data[i + 2] * 0.189);
    data[i + 1] = (data[i] * 0.349 + data[i + 1] * 0.686 + data[i + 2] * 0.168);
    data[i + 2] = (data[i] * 0.272 + data[i + 1] * 0.534 + data[i + 2] * 0.131);
  }
};
ImageEditor.prototype.filter.brightness = function (imageData,ob) {
	var adjustment = ob.level;
	var d = imageData.data;
	for (var i=0; i<d.length; i+=4) {
		d[i] += adjustment;
		d[i+1] += adjustment;
		d[i+2] += adjustment;
	}
};
ImageEditor.prototype.filter.restore = function (imageData,ob) {
	var adjustment = ob.level;
  	var d = imageData.data;
  	var g = ob.imageData.data;
	for (var i=0; i<d.length; i+=4) {
		d[i] = g[i];
		d[i+1] = g[i+1];
		d[i+2] = g[i+2];
	}
};
