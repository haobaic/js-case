// 获取节点
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const rateEl = document.getElementById("rate");
calculate()
//获取汇率 并实现demo节点更新
function calculate() {
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res => res.json()).then(data=>{
	  const rates=data.rates[currency_two];
	  rateEl.innerText=`1${currency_one}=${rates}${currency_two}`
	  //保留两位小数
	  amountEl_two.value=(amountEl_one.value*rates).toFixed(2);
  })
}

currencyEl_one.addEventListener('change',calculate);
amountEl_one.addEventListener('input',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEl_two.addEventListener('input',calculate);
//点击交换
swap.addEventListener('click',(res)=>{
	const temp=currencyEl_one.value;
	currencyEl_one.value=currencyEl_two.value;
	currencyEl_two.value=temp;
	calculate();
})