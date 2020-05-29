const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;
//执行函数
breathAnimation();

function breathAnimation(){
	text.innerText = "吸气";
	container.className = "container grow";
	
	setTimeout(() => {
	  text.innerText = "保持";
	
	  setTimeout(() => {
	    text.innerText = "吐气";
	    container.className = "container shrink";
	  }, holdTime);
	}, breatheTime);
}


setInterval(breathAnimation, totalTime);