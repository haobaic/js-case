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
	if(username.value===''){
		showError(username,'用户名为必填项');
	}else{
		showSuccess(username)
	}
	if(email.value===''){
		showError(email,'邮箱为必填项');
	}else if(!isValidEmail(email.value)){
		showError(email,'邮箱格式错误');
	}else{
		showSuccess(email)
	}
	if(password.value===''){
		showError(password,'密码为必填项');
	}else{
		showSuccess(password)
	}
	if(password2.value===''){
		showError(password2,'确认密码为必填项');
	}else{
		showSuccess(password2)
	}
})
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
function isValidEmail(email){
	const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(String(email));
}