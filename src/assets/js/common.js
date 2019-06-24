const commonFn = {
	// 获取url参数
	getQueryString(name) {
		var url = window.location.search;
	    var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)','i');
	    var r = url.substr(1).match(reg);
	    if (r != null) return decodeURI(r[2]); return null;
	},
	isEnvironment() {
		var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
        	return 'isAndroid'
        }else if(isiOS){
        	return 'isiOS'
        }
	},
	//图片加载失败
	imgError(type, event) {
		/*if (type == 1) {
			event.target.src = require('@/assets/images/default_one.png');
		} else if (type == 2) {
			event.target.src = require('@/assets/images/userAvatar@2x.png');
		}
		event.srcElement.onerror = null;*/ //控制不要一直跳动
	},
	/*相加运算，避免数据相除小数点后产生多位数和计算精度损失。*/
	andNumber(arg1, arg2) {
		return ((arg1 * 1000) + (arg2 * 1000)) / 1000; //防止丢失精度
	},
	/* 减运算，避免数据相除小数点后产生多位数和计算精度损失。*/
	subtractNumber(arg1, arg2) {
		return (arg1 * 1000 - arg2 * 1000) / 1000; //防止丢失精度
	},
	/* 乘运算，避免数据相除小数点后产生多位数和计算精度损失。*/
	subNumber(arg1, arg2) {
		return (arg1 * 1000) * (arg2 * 1000) / 1000000; //防止丢失精度
	},
	/* 除运算，避免数据相除小数点后产生多位数和计算精度损失。*/
	divideNumber(arg1, arg2) {
		return ((arg1 * 1000) / (arg2 * 1000)); //防止丢失精度
	},
	// 去除两端的空白
	trim(text) {
		const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		return text == null ? null : (text + '').replace(rtrim, '');
	}

}


export default commonFn