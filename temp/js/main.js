const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");

async function showPosts() {
  try {
    const res = await fetch("http://localhost:8080/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    output.innerHTML = ""; // 기존 내용 초기화

    posts.forEach((post) => {
      const div = document.createElement("div");
      div.textContent = post.title;
      output.appendChild(div);
    });
  } catch (error) {
    console.error("Catched Error", error);
  }
}

// Submit new post
async function addPost(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error("Faild to add new post");

    // 서버에 포스트글 리스트의 재요청없이 바로 데이터를 추가
    // const newPost = await res.json();
    // const div = document.createElement("div");
    // div.textContent = newPost.title;
    // output.appendChild(div);

    // 서버에 포스트글 리스트의 재요청
    showPosts();
  } catch (error) {
    console.error("Catched Error", error);
  }
}

button.addEventListener("click", showPosts);
form.addEventListener("submit", addPost);
