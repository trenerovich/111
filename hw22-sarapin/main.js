const API_URL = "https://jsonplaceholder.typicode.com";

const searchBtn = document.getElementById("searchBtn");
const postIdInput = document.getElementById("postId");
const postContainer = document.getElementById("postContainer");
const commentsContainer = document.getElementById("commentsContainer");

searchBtn.addEventListener("click", () => {
    const postId = postIdInput.value;
    if (postId < 1 || postId > 100) {
        alert("Введите id поста от 1 до 100");
        return;
    }

    fetch(`${API_URL}/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные поста");
            }
            return response.json();
        })
        .then(post => {
            postContainer.innerHTML = `<h2>${post.title}</h2>
                                       <p>${post.body}</p>
                                       <button id="commentsBtn">Комментарии</button>`;

            const commentsBtn = document.getElementById("commentsBtn");
            commentsBtn.addEventListener("click", () => {
                fetch(`${API_URL}/posts/${postId}/comments`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Не удалось загрузить комментарии");
                        }
                        return response.json();
                    })
                    .then(comments => {
                        commentsContainer.innerHTML = `<h3>Комментарии</h3>
                                                       <ul>${comments.map(comment => `<li>${comment.body}</li>`).join("")}</ul>`;
                    })
                    .catch(error => {
                        console.error(error);
                        alert(error.message);
                    });
            });
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});
