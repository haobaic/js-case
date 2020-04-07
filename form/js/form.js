//获取demo
const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');

//事件
form.addEventListener('submit',(e)=>{
	//阻止默认事件
	e.preventDefault();
	checkRequired([username,email,password,password2])
	checkLength(username,3,15);
	checkLength(password,6,12);
	checkEmail(email)
	checkPassWord(password,password2)
})
//验证
function checkRequired(inputArr){
	inputArr.forEach((input)=>{
		if(input.value.trim()===""){
			showError(input,`${getKeyWords(input)}必填项`);
		}else{
			showSuccess(input)
		}
	})
}
//验证长度
function checkLength(input,min,max){
	if(input.value.length<min){
		showError(input,`${getKeyWords(input)}至少${min}个字符`)
	}else if(input.value.length>max){
		showError(input,`${getKeyWords(input)}少于${min}个字符`)
	}else{
		showSuccess(input)
	}
}
//提取关键字
function getKeyWords(input){
	return input.placeholder.slice(2)
}
function showError(input,message){
	//获取父元素
	const formControl=input.parentElement;
	formControl.className="form-control error";
	const small=formControl.querySelector("small");
	small.innerText=message;
}
function showSuccess(input){
	//获取父元素
	const formControl=input.parentElement;
	formControl.className="form-control success";
}
//验证邮箱
function checkEmail(input){
	const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(re.test(input.value.trim())){
		showSuccess(input)
	}else{
		showError(input,"邮箱格式错误")
	}
}
//密码匹配
function checkPassWord(password,password2){
	if(password.value!==password2.value){
		showError(password2,"密码不匹配")
	}
}
