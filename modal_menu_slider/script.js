// 获取节点
const toggle=setId('toggle');
const close=setId('close');
const open=setId('open');
const modal=setId('modal');

//点击侧边导航
toggle.addEventListener('click',()=>document.body.classList.toggle("show-nav"))

//登陆点击
open.addEventListener("click", () => modal.classList.add("show-modal"));
// 关闭点击
close.addEventListener("click", () => modal.classList.remove("show-modal"));
//遮罩点击
window.addEventListener("click", e =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);


function setId(val){
	return document.getElementById(val);
}