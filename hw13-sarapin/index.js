
const inputLinkBtn = document.getElementById("input-link-btn");
const redirectBtn = document.getElementById("redirect-btn");

inputLinkBtn.addEventListener("click", () => {
    let link = prompt("Введите ссылку:");
    if (link) {
        localStorage.setItem("link", link);
    }
});

redirectBtn.addEventListener("click", () => {
    let link = localStorage.getItem("link");
    if (link) {
        if (!link.startsWith("http://") && !link.startsWith("https://")) {   // Проверяем, есть ли в начале "http://" или "https://"
            window.location.href = "https://" + link;
        } else {
            window.location.href = link;
        }
    } else {
        alert("Ссылка не была введена!");
    }
});



