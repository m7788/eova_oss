function scMemberCard() {
	
		var scCard = document.getElementById("loan_realxinxi").value;
		if (scCard.length != 0) {
			if (!checkCard(scCard)) {
				var red="red";
				document.getElementById("errorxinxi").style.display = "visible";
				$("#errorTips").html("<font  color="+red+">身份证号码格式错误</font>");
			} else {
				document.getElementById("errorxinxi").style.display = "hidden";
				$("#errorTips").html("");
			}
		}

	return false;
}

var vcity = {
	11 : "北京",
	12 : "天津",
	13 : "河北",
	14 : "山西",
	15 : "内蒙古",
	21 : "辽宁",
	22 : "吉林",
	23 : "黑龙江",
	31 : "上海",
	32 : "江苏",
	33 : "浙江",
	34 : "安徽",
	35 : "福建",
	36 : "江西",
	37 : "山东",
	41 : "河南",
	42 : "湖北",
	43 : "湖南",
	44 : "广东",
	45 : "广西",
	46 : "海南",
	50 : "重庆",
	51 : "四川",
	52 : "贵州",
	53 : "云南",
	54 : "西藏",
	61 : "陕西",
	62 : "甘肃",
	63 : "青海",
	64 : "宁夏",
	65 : "新疆",
	71 : "台湾",
	81 : "香港",
	82 : "澳门",
	91 : "国外"
};

checkCard = function(obj) {
	if (isCardNo(obj) === false) {
		return false;
	}
	if (checkProvince(obj) === false) {
		return false;
	}
	if (checkBirthday(obj) === false) {
		return false;
	}
	if (checkParity(obj) === false) {
		return false;
	}
	return true;
}

isCardNo = function(obj) {
	var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	if (reg.test(obj) === false) {
		return false;
	}
	return true;
};

checkProvince = function(obj) {
	var province = obj.substr(0, 2);
	if (vcity[province] == undefined) {
		return false;
	}
	return true;
};
checkBirthday = function(obj) {
	var len = obj.length;
	if (len == '15') {
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		var arr_data = obj.match(re_fifteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date('19' + year + '/' + month + '/' + day);
		return verifyBirthday('19' + year, month, day, birthday);
	}
	if (len == '18') {
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = obj.match(re_eighteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date(year + '/' + month + '/' + day);
		return verifyBirthday(year, month, day, birthday);
	}
	return false;
};
verifyBirthday = function(year, month, day, birthday) {
	var now = new Date();
	var now_year = now.getFullYear();
	if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month
			&& birthday.getDate() == day) {
		var time = now_year - year;
		if (time >= 0 && time <= 130) {
			return true;
		}
		return false;
	}
	return false;
};
checkParity = function(obj) {
	obj = changeFivteenToEighteen(obj);
	var len = obj.length;
	if (len == '18') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
				4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3',
				'2');
		var cardTemp = 0, i, valnum;
		for (i = 0; i < 17; i++) {
			cardTemp += obj.substr(i, 1) * arrInt[i];
		}
		valnum = arrCh[cardTemp % 11];
		if (valnum == obj.substr(17, 1)) {
			return true;
		}
		return false;
	}
	return false;
};
changeFivteenToEighteen = function(obj) {
	if (obj.length == '15') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
				4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3',
				'2');
		var cardTemp = 0, i;
		obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
		for (i = 0; i < 17; i++) {
			cardTemp += obj.substr(i, 1) * arrInt[i];
		}
		obj += arrCh[cardTemp % 11];
		return obj;
	}
	return obj;
};
