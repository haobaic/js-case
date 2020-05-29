// 获取节点
const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 10;
let page = 1;

// 获取数据
async function getPosts(){
	const res=await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
	const data=await res.json();
	return data;
}

// 更新节点
async function showPosts() {
	const posts=await getPosts();
	posts.forEach(post => {
	  const postEl = document.createElement("div");
	  postEl.classList.add("post");
	  postEl.innerHTML = `
	      <div class="number">${post.id}</div>
	      <div class="post-info">
	      <h2 class="post-title">${post.title}</h2>
	      <p class="post-body">${post.body}</p>
	      </div>
	      `;
	
	  postsContainer.appendChild(postEl);
	});
}
//滚动加载
window.addEventListener('scroll',()=>{
	/**滚动到底部到视口底部高度
	document.documentElement.scrollTop**/
	/**元素总体高度
	document.documentElement.scrollHeight**/
	/**可视区高度
	document.documentElement.clientHeight**/
	const {scrollTop,scrollHeight,clientHeight}=document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      showLoading();
    }
})
//滚动数据加载
function showLoading(){
	loading.classList.add('show');
	setTimeout(()=>{
		loading.classList.remove('show');
		setTimeout(()=>{
			page++;
			showPosts();
		},300)
	},1000)
}
// 搜索
filter.addEventListener("input", filterPosts);

//过滤搜索
function filterPosts(e){
	//toUpperCase小写转大写
	//获取输入值
	const term=e.target.value.toUpperCase();
	const posts=document.querySelectorAll('.post');
	posts.forEach(item=>{
		const title=item.querySelector('.post-title').innerText.toUpperCase();
		const body=item.querySelector('.post-body').innerText.toUpperCase();
		if(title.indexOf(term)>-1||body.indexOf(term)>-1){
		   item.style.display="flex"; 
		}else{
			item.style.display="none"; 
		}
	})
}
//初始化
showPosts();