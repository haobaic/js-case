// 获取节点
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// 歌曲名称
const songs = ["hey", "summer", "ukulele","everywhere"];

// 创建下标追踪歌曲
let songIndex = 2;

//初始化页面时加载歌曲到DEMO节点中
loadsong(songs[songIndex]);

function loadsong(item){
	title.innerText=item;
	audio.src=`music/${item}.mp3`;
	cover.src=`images/${item}.jpg`;
}

//播放
function playSong(){
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}
// 暂停
function pauseSong(){
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	audio.pause();
}
//事件监听
playBtn.addEventListener('click',()=>{
	const isPlaying=musicContainer.classList.contains('play');
	if(isPlaying){
		pauseSong();
	}else{
		playSong();
	}
})
// 上一首
function prevSong(){
	songIndex--;
	if(songIndex<0){
		songIndex=songs.length-1;
	}
	loadsong(songs[songIndex]);
	playSong();
}
//下一首
function nextSong(){
	songIndex++;
	if(songIndex>songs.length-1){
		songIndex=0;
	}
	loadsong(songs[songIndex]);
	playSong();
}
//更新进度条
function updateProgress(e){
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}
//点击进度条
function setProgress(e){
	//获取当前点击宽度
	const width=this.clientWidth;
	//点击位置
	const clickX = e.offsetX;
	//获取时长
    const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

//切换歌曲
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
//设置进度条
audio.addEventListener("timeupdate", updateProgress);
// 点击进度条容器，更新歌曲播放
progressContainer.addEventListener("click", setProgress);
// 播放结束自动切换
audio.addEventListener("ended", nextSong);