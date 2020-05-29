// 获取节点
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");
//获取当前年份
const currentYear = new Date().getFullYear();
console.log(currentYear)
//获取下一年年份
const newYearTime =new Date(`January 01 ${currentYear + 1} 00:00:00`);
// 创建函数更新倒计时
function updateCountdown() {
	const currentTime=new Date();
	//距离下一年时间差
	const diff=newYearTime-currentTime;
	// 天数
	const d=Math.floor(diff/1000/60/60/24);
	//小时
	const h=Math.floor(diff/1000/60/60)%24;
	//分钟
	const m = Math.floor(diff / 1000 / 60) % 60;
	//秒
	const s = Math.floor(diff / 1000) % 60;
	days.innerHTML = d;
	hours.innerHTML = h < 10 ? "0" + h : h;
	minutes.innerHTML = m < 10 ? "0" + m : m;
	seconds.innerHTML = s < 10 ? "0" + s : s;
}
//年份显示
year.innerText = currentYear + 1;

setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1100);

setInterval(updateCountdown, 1000);