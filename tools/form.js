/**
 * 判断整数num是否等于0
 * 
 * @param num
 * @return
 * @author jiqinlin
 */
var form={};


form.isIntEqZero= function(num) {
	return num == 0;
}

/**
 * 判断整数num是否大于0
 * 
 * @param num
 * @return
 * @author jiqinlin
 */
 form.isIntGtZero=function (num) {
	return num > 0;
}

/**
 * 判断整数num是否大于或等于0
 * 
 * @param num
 * @return
 * @author jiqinlin
 */
 form.isIntGteZero= function (num) {
	return num >= 0;
}


/**
 * 判断是否为空
 *  
 */
form.isNum= function(num) {
	let i;
	if (num) {
		num = true;
	} else {
		num = false
	}
	return num;
}

/**
 * 判断浮点数num是否等于0
 * 
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
form.isFloatEqZero= function(num) {
	return num == 0;
}

/**
 * 判断浮点数num是否大于0
 * 
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
form.isFloatGtZero= function(num) {
	return num > 0;
}

/**
 * 判断浮点数num是否大于或等于0
 * 
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
form.isFloatGteZero = function(num) {
	return num >= 0;
}

/**
 * 匹配Email地址
 */
 form.isEmai= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	if (result == null) return false;
	return true;
}

/**
 * 判断数值类型，包括整数和浮点数
 */
 form.isNumber=function(str) {
	if (isDouble(str) || isInteger(str)) return true;
	return false;
}

/**
 * 只能输入数字[0-9]
 */
 form.isDigits= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^\d+$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配money
 */
 form.isMoney= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^(([1-9]\d*)|(([0-9]{1}|[1-9]+)\.[0-9]{1,2}))$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配phone
 */
form.isPhone=function(str) {
	if (str == null || str == "") return false; 
	 if(!(/^1[3456789]\d{9}$/.test(str))){  
	        return false; 
	 }else{
		return true;  
	 }  
}

/**
 * 匹配mobile
 */
form.isMobile= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((13\d{9})|(15\d{9})|(18\d{9}))$/);
	if (result == null) return false;
	return true;
}

/**
 * 联系电话(手机/电话皆可)验证   
 */
form.isTel =function(text) {
	if (form.isMobile(text) || form.isPhone(text)) return true;
	return false;
}

/**
 * 匹配qq
 */
 form.isQq= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[1-9]\d{4,12}$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配english
 */
form.isEnglish=function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[A-Za-z]+$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配integer
 */
form.isInteger=function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[-\+]?\d+$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配double或float
 */
form.isDouble= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[-\+]?\d+(\.\d+)?$/);
	if (result == null) return false;
	return true;
}


/**
 * 匹配邮政编码
 */
form.isZipCode=function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[0-9]{6}$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配URL
 */
form.isUrl= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
 */
form.isPwd=function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[a-zA-Z]\\w{6,12}$/);
	if (result == null) return false;
	return true;
}

/**
 * 判断是否为合法字符(a-zA-Z0-9-_)
 */
form.isRightfulString= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[A-Za-z0-9_-]+$/);
	if (result == null) return false;
	return true;
}
 
/**
 * 匹配身份证号码
 */
form.isIdCardNo= function(idcode) {
	 // 加权因子
	    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
	    // 校验码
	    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2']; 
	    var code = idcode + ""; 
	    var last = idcode[17];//最后一位 
	    var seventeen = code.substring(0,17); 
	    var arr = seventeen.split("");
	    var len = arr.length;
	    var num = 0;
	    for(var i = 0; i < len; i++){
	        num = num + arr[i] * weight_factor[i];
	    } 
	    var resisue = num%11;
	    var last_no = check_code[resisue]; 
	    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
	    var format = idcard_patter.test(idcode);
	    return last === last_no && format ? true : false;  
}

/**
 * 匹配汉字
 */
form.isChinese =function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[\u4e00-\u9fa5]+$/);
	if (result == null) return false;
	return true;
}

/**
 * 匹配中文(包括汉字和字符)
 */
form.isChineseChar= function(str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[\u0391-\uFFE5]+$/);
	if (result == null) return false;
	return true;
}

/**
 * 字符验证，只能包含中文、英文、数字、下划线等字符。
 */
form.stringCheck= function (str) {
	if (str == null || str == "") return false;
	var result = str.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
	if (result == null) return false;
	return true;
}

/**
 * 过滤中英文特殊字符，除英文"-_"字符外
 */
form.stringFilter=function (str) {
	var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
	var rs = "";
	for (var i = 0; i < str.length; i++) {
		rs = rs + str.substr(i, 1).replace(pattern, '');
	}
	return rs;
}

/**
 * 判断是否包含中英文特殊字符，除英文"-_"字符外
 */
form.isContainsSpecialChar=function(str) {
	if (str == null || str == "") return false;
	var reg = RegExp(
		/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/
	);
	return reg.test(str);
}
 
// 身份证号：isIdCardNo 
// 电话号： isTel
// 为空：isNum
// 邮箱：isEmai
module.exports = form;