<?php
	header("Content-type: text/html; charset=utf-8");
	//1、接收客户端的数据
	$call = $_POST['call'];
	$reg = $_POST['reg'];
	$call1 = $_POST['call1'];
	$reg1= $_POST['reg1'];
	//2、处理数据
	//1）、搭桥（连接数据库）
	$conn = mysql_connect("localhost","root","xiaozheng");
	if(!$conn){
		die("数据库连接失败：".mysql_error());
	}else{
		//2）、选择目的地（选择操作的数据库）
		mysql_select_db("zyf",$conn);
		//3）、运输数据（执行SQL语句，传输数据）
		$sqlstr="select * from flls where callnum='".$call."' and vippass='".$reg."'";
		$sqlstr1="select * from flls where callnum='".$call1."' and vippass='".$reg1."'";
		$call."' and vippass='".$reg."'";
		$sqlstr2="insert into flls(call1,reg1) values('".$call1."','".$reg1."')'";
		//echo $sqlstr;
		//函数mysql_query()里面执行的查询语句，所以，它的返回值是表格
		$result = mysql_query($sqlstr,$conn);
		$result1 = mysql_query($sqlstr1,$conn);
		mysql_query($sqlstr1,$conn);
		$rowCount = mysql_num_rows($result);
		$rowCount1 = mysql_num_rows($result1);
		//4）、拆桥（关闭数据库）
		mysql_close($conn);
		
		//3、响应
//		echo $rowCount;
		if($rowCount==1){
			echo "1";		
		}else{
			echo "0";
		}
		if($rowCount1==1){
			echo "2";		
		}else{
			echo "3";
		}
	}
?>