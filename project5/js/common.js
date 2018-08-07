/*
	通过ID获取DOM元素
*/
function $(id) {
	return document.getElementById(id);
}
/*
	缓冲运动函数
*/
function bufferMove(obj, target, fn, ratio = 8) {
	// 清除定时器
	clearInterval(obj.timer);

	// 开启新的定时器
	obj.timer = setInterval(function () {

		// 假设所有的属性均已运动完毕
		var btn = true;
		// 遍历对象
		for(var attr in target) {

			// 获取属性的当前值
			var cur = 0;
			if(attr === 'opacity') {
				cur = getStyle(obj, 'opacity') * 100;
			} else {
				cur = parseFloat( getStyle(obj, attr) ) || 0;
			}

			// 计算速度
			var speed = (target[attr] - cur) / ratio;

			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


			// 计算下一次的值
			var next = cur + speed;

			// 赋值
			if(attr === 'opacity') {
				obj.style.opacity = next / 100;
				obj.style.filter  = 'alpha(opacity=' + next + ')';
			} else {
				obj.style[attr] = next + 'px';
			}


			if(next !== target[attr]) {
				btn = false;
			}
		}

		if(btn === true) {
			clearInterval(obj.timer);

			// 执行回调函数
			// fn && fn();
			if(fn) {
				fn();
			}
		}
	}, 40);
}

/*
	获取元素样式值
*/
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

/*t b c d
t current time   :nTime-sTime
b begining value :curr
c chang in value :变化量end-curr
d duration       :持续时间 time */
var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;   //  t/d = prop;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
           s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};

/*
	时间版运动框架
*/
function timeMove(obj, target, times, fx, fn) {
	// 清除上一个定时器
	clearInterval(obj.timer);


	// 获取运动属性的当前值
	var cur = {};
	// for(var attr in target) {
	// 	cur[attr] = parseFloat(getStyle(obj, attr)) || 0;
	// }

	Object.keys(target).forEach(v => {
		if(v === 'opacity') {
			cur[v] = parseFloat(getStyle(obj, v)) * 100;
		} else {
			cur[v] = parseFloat(getStyle(obj, v)) || 0;
		}
	});

	// 记录一下开始做动画的时间
	var starttime = new Date().getTime();

	// 开启新的定时器
	obj.timer = setInterval(function () {
		// 记录当前时间
		var changetime = new Date().getTime() - starttime;

		// 清除定时器
		if(changetime >= times) {
			changetime = times;
			clearInterval(obj.timer);
		}
		for(var attr in target) {
			var next = Tween[fx](changetime, cur[attr], target[attr] - cur[attr], times);
			
			if(attr === 'opacity') {
				obj.style.opacity = next / 100;
				obj.style.filter = 'alpha(opacity=' + next +')';
			} else {
				obj.style[attr] = next + 'px';
			}
		}

		if(changetime === times) {
			fn && fn();
		}
	}, 30);
}