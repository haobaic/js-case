// 获取节点
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
//获取随机用户并添加
async function getRandomUser() {
	const res=await fetch("https://randomuser.me/api");
	const data=await res.json();
	const user=data.results[0];
	const newUser={
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	}
	addData(newUser);
}
// 添加随机生成对象到data数组
function addData(obj) {
  data.push(obj);
  updateDOM();
}
function updateDOM(providedData = data){
	//清空mian
	main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
    providedData.forEach(item=>{
		const element=document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element);
	})
}
// 转换为货币格式
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//资金翻倍
function doubleMoney(){
	data = data.map(user => {
	  return { ...user, money: user.money * 2 };
	});
	updateDOM();
}
// 财富榜排序
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}
//过滤查询百万富翁
function showMillionaires(){
	data = data.filter(user => user.money > 1000000);
	updateDOM();
}
// calculateWealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  // console.log(formatMoney(wealth));

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
// 事件监听
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);