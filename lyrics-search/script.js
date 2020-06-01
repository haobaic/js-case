// 获取节点
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// 创建searchSongs函数，获得歌曲数据
async function searchSongs(val) {
	const res = await fetch(`${apiURL}/suggest/${val}`);
	const data = await res.json();
	console.log(data);
	showData(data);
}
//渲染页面
function showData(data) {
	/* forEach方法 */
	// let output = '';
	// data.data.forEach(song => {
	// 	output +=
	// 		`
	// 	        <li>
	// 	        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
	// 	        <button class="btn" data-artist ="${song.artist.name}" data-songtitle ="${song.title}">歌词</button>
	// 	        </li>
	// 	        `;
	// })
	// result.innerHTML = `
	//     <ul class="songs">
	//     ${output}
	//     </ul>
	//     `;
	/* map方法 */
	let output = '';
	
	data.data.map(song =>{
		output +="<li>";
		output +="<span><strong>"+song.artist.name+"</strong> - "+song.title+"</span>";
		output +='<button class="btn" data-artist ='+song.artist.name+' data-songtitle ='+song.title+'>歌词</button>';
	}).join("");
	result.innerHTML ='<ul class ="songs">'+output+'</ul>';
	// result.innerHTML = `
	//     <ul class ="songs">${data.data.map(song => `<li>
	// <span><strong>${song.artist.name}</strong> - ${song.title}</span>
	// <button class="btn" data-artist ="${song.artist.name}" data-songtitle ="${song.title}">歌词</button>
	// </li>`).join("")}</ul>`;
	
		if (data.prev || data.next) {
		  more.innerHTML = `${
		    data.prev
		      ? `<button class="btn" onclick = "getMoreSongs('${data.prev}')">上一页</button>`
		      : ""
		  }
		        ${
		          data.next
		            ? `<button class="btn" onclick = "getMoreSongs('${data.next}')">下一页</button>`
		            : ""
		        }
		        `;
		} else {
		  more.innerHTML = "";
		}
}
// 获取上一页&下一页歌曲信息
async function getMoreSongs(url) {
	//fetch代理 否则会出现跨域
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}
// 获取歌词

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <span>${lyrics}</span>`;

  more.innerHTML = "";
}
// 事件监听
form.addEventListener("submit", e => {
	e.preventDefault();
	//清楚空格
	const searchTerm = search.value.trim();

	if (!searchTerm) {
		alert("请输入查询内容");
	} else {
		searchSongs(searchTerm);
	}
});
// 点击btn获得歌词
result.addEventListener("click", e => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});