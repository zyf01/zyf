
function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}

//获取随机的颜色值
function getColor(){
	var str="#";
	for(var i=0;i<6;i++){
		//1、获取0-16（不包括）的数
		var temp = parseInt(Math.random()*16).toString(16);
		//2、拼接
		str+=temp;
	}
	return str;
}