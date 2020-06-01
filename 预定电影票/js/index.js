const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');
let ticketPrice=+movieSelect.value; //转化number
populateUI();
//座位点击事件
container.addEventListener('click',e=>{
	//e.target.classList.contains('seat')  //是否包含class名为seat的div
	if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied')){ 
		e.target.classList.toggle('selected'); //添加移除class
		undateSeletedCount();
	}
})
//更新座位数及总票价
function undateSeletedCount(){
	const selectedStats=document.querySelectorAll('.row .seat.selected');
	const statsIndex=[...selectedStats].map(seat=>[...seats].indexOf(seat));
	localStorage.setItem('selectedStats',JSON.stringify(statsIndex));
	const selectedCount=selectedStats.length;
	count.innerText=selectedCount;
	total.innerText=selectedCount*ticketPrice
}
//电影下拉框事件监听
movieSelect.addEventListener('change',e=>{
	ticketPrice=+e.target.value;
	setMovieData(e.target.selectedIndex,e.target.value)
	undateSeletedCount();
})
//保存电影索引 票价
function setMovieData(movieIndex,moviePrice){
	localStorage.setItem('selectedMovieIndex',movieIndex);
	localStorage.setItem('selectedMoviePrice',moviePrice)
}
//获取本地数据并渲染样式
function populateUI(){
	const selectedSeats=JSON.parse(localStorage.getItem('selectedStats'))
	if(selectedSeats!==null&&selectedSeats.length>0){
		seats.forEach((item,index)=>{
			if(selectedSeats.indexOf(index)>-1){
				item.classList.add('selected')
			}
		})
	}
	const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
	if(selectedMovieIndex!==null){
		movieSelect.selectedIndex=selectedMovieIndex;
	}
	const selectedMoviePrice=localStorage.getItem('selectedMoviePrice');
	if(selectedMoviePrice!==null){
		ticketPrice=+selectedMoviePrice;
	}
}
//设置初使数据回调
undateSeletedCount();