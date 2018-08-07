//添加cookie
//参数：
//  键，
// 值，
// 有效期（单位：天）
//返回值：无

function addCookie(key,value,days){
	var d = new Date();
	d.setDate(d.getDate()+days);
	//保存cookie；
	document.cookie = key+"="+escape(value)+";expires="+d.toGMTString();	
}

//获取cookie
//参数：键
//返回值：键对应的值；如果是null：表示没有在cookie中找到键；
//"username=jzm; password=123456; price=12"
function getCookie(key){
	var str=unescape(document.cookie);//"username=jzm; password=123456; price=12"
	
	//1、用split函数分割（; ）
	var arr = str.split("; ");
	//2、循环数组
	for(var i in arr){
		//以key+"="开头的元素就是我们要的元素（键值对）
		if(arr[i].indexOf(key+"=")==0){
			var arrnew = arr[i].split("=");
			return arrnew[1];
		}
	}
	return null;	
}

//删除cookie
//参数：键
//返回值：无

function removeCookie(key){
	addCookie(key,"",-1);
}

//修改cookie
//参数：
//键
//值
//有效期
//返回值：无

function updateCookie(key,value,days){
	addCookie(key,value,days);	
}