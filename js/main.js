$(document).ready(function(){
	//旋转角度
	var angles;
	//旋转次数
	var rotNum = 0;
	//中奖内容
	var notice = null;
	//转盘初始化
	
//	var picList = [];
//	$.getJSON('data.php?callback=?',function(jsondata){
//		
//	})
//	$.ajax({
//	   url: "data.json",//json文件位置
//	   type: "GET",//请求方式为get
//	   dataType: "jsonp", //返回数据格式为json
//	   success: function(data) {//请求成功完成后要执行的方法 
//	       //each循环 使用$.each方法遍历返回的数据date
//	       alert("请求成功");
//	       $.each(data.test, function(i, item) {
//	            picList.push(item.pic)
//	       })
//	   },
//	   error : function(){
//	   	alert("提交失败")
//	   }
//	   
//	})
	
	
	var color = ["#f4b92f","#f3d943"];
	var info = ["0元获得198话费"," ofo小黄车优惠券","京东优惠券","麦当劳优惠券","优酷会员7折","谢谢参与，擦券而过"];
	var info1 = ["img/test.png"]
	var picList=["img/telMoney.png","img/jd.png","img/ofo.png"]
	canvasRun();
	$('.Btn').on('click',function(){
		//获取转盘当前的随机数
		var getNum = prize();
		//转盘旋转
		runCup();
		//转盘旋转过程“立即抽奖”按钮无法点击
		$('.Btn').attr("disabled", true);
		//旋转次数加一
		rotNum = rotNum + 1;
		//设置一个定时器等转盘结束再运行
		setTimeout(function(){
				//判断是否是奖品弹窗
				if(getNum==0 ||getNum==4 || getNum==5){
					$('.back-bg').css({
						"background":"rgba(0,0,0,.7)",
						"z-index":"99"
					});
					$('#window').animate({
						  top:'20%'		  
					},800);
				}
				//若不是直接弹窗文字提示
				else{
					alert(notice)
				}

				$('.Btn').removeAttr("disabled", true);
		},6000);
	})
	
	//转盘旋转
	function runCup(){
		var degValue = 'rotate('+angles+'deg'+')';
		$('#myCanvas').css('-o-transform',degValue);           //Opera
		$('#myCanvas').css('-ms-transform',degValue);          //IE浏览器
		$('#myCanvas').css('-moz-transform',degValue);         //Firefox
		$('#myCanvas').css('-webkit-transform',degValue);      //Chrome和Safari
		$('#myCanvas').css('transform',degValue);
	}
	
	//转盘对应奖品和角度
	function prize(){
		//获取随机数
		let num = parseInt(6*Math.random());
		switch(num)
		{
			case 0 :
				angles = 2160 * rotNum + 1800;
				notice = info[0];
				$('.getPic').attr('src',picList[0]);
				break;
			case 1 :
				angles = 2160 * rotNum + 1860;
				notice = info[5];
				break;
			case 2 :
				angles = 2160 * rotNum + 1920;
				notice = info[4];
				break;
			case 3 :
				angles = 2160 * rotNum + 1980;
				notice = info[3];
				break;
			case 4 :
				angles = 2160 * rotNum + 2040;
				notice = info[2];
				$('.getPic').attr('src',picList[1]);
				break;
			case 5 :
				angles = 2160 * rotNum + 2100;
				notice = info[1];
				$('.getPic').attr('src',picList[2]);
				break;
		}
		return num;
	}
	
	
	//绘制转盘
	function canvasRun(){
		var canvas = document.getElementById('myCanvas');
		var ctx=canvas.getContext('2d');
		createCircle();
		createCirText()
//		initPoint();
		
		//外圆
		function createCircle(){
	        var startAngle = 0;//扇形的开始弧度
	        var endAngle = 0;//扇形的终止弧度
	        //画一个6等份扇形组成的圆形
	        for (var i = 0; i< 6; i++){
	            startAngle = Math.PI*(i/3-1/3);
	            endAngle = startAngle+Math.PI*(1/3);
	            ctx.save();
	            ctx.beginPath(); 
	            ctx.arc(150,150,100, startAngle, endAngle, false);
	            ctx.lineWidth = 100;
	            if (i%2 == 0) {
	            	ctx.strokeStyle =  color[0];
	            }else{
	            	ctx.strokeStyle =  color[1];
	            }
	            ctx.stroke();
	            ctx.restore();
	        } 
	    }
		
		//各奖项
	    function createCirText(){	 
		    ctx.textAlign='start';
		    var step = 2*Math.PI/6;
		    for ( var i = 0; i < 6; i++) {
		    	ctx.save();
		    	ctx.beginPath();
		        ctx.translate(150,150);
		        ctx.rotate(i*step);
		        var imgObj = new Image();
		        imgObj.src = info1[0];
		        imgObj.onload= function(){
		        	ctx.drawImage(this,12,10,276,279)
		        }
//				ctx.font = " 12px Microsoft YaHei";
//		        ctx.fillText(info[i],-30,-75,60);
		        ctx.closePath();
		        ctx.restore();
		    }
		}
	}

	
	//弹窗关闭事件
	$('.close').bind('click',function(){
		$('.back-bg').css({
			"background":"none",
			"z-index":"-1"
		});
		$('#window').css({
			"top":"-60%"
		})
	})
	
	//领取奖品事件
	$('.get').bind('click',function(){
		$('#window').css({
			"top":"-60%"
		});
		$('#form').animate({
			"left":"10%"
		});
	})
	
	//领取奖品的关闭事件
	function close(){
		$('.back-bg').css({
			"background":"none",
			"z-index":"-1"
		});
		$('#form').css({
			"left":"-80%"
		})
	}
	$('.close-text').on('click',function(){
		close()
	})
	
	//提交手机号码信息
	$('#submit').on('click',function(){
		var vals = $('#tel').val()
		var reg = new RegExp(/^1[3456789]\d{9}$/)
		if(reg.test(vals)==true){
				alert("领取奖品成功");
				close()	
		}
		else{
			alert("请输入正确的手机号码")
		}
		return false
	})
})