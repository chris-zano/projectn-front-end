
const getRandomImagePath = () => {
    const imagePaths = [
        'discipleship_0_1.jpg', 'discipleship_0_2.jpg', 'discipleship_0_3.jpg', 'discipleship_0_4.jpg', 
        'discipleship_0_5.jpg', 'discipleship_0_6.jpg', 'discipleship_1_1.jpg', 'discipleship_1_2.jpg', 
        'discipleship_1_3.jpg', 'discipleship_1_4.jpg', 'discipleship_1_5.jpg', 'discipleship_1_6.jpg', 
        'discipleship_1_7.jpg', 'discipleship_2_1.jpg', 'discipleship_2_2.jpg', 'discipleship_2_3.png', 
        'discipleship_3_1.jpg', 'discipleship_3_2.jpg', 'discipleship_3_3.jpg', 'discipleship_3_4.jpg', 
        'discipleship_3_5.jpg', 'discipleship_3_6.jpg', 'discipleship_3_7.jpg', 'discipleship_3_8.jpg', 
        'discipleship_3_9.jpg', 'discipleship_4_1.jpg', 'discipleship_4_2.jpg', 'discipleship_4_3.jpg', 
        'discipleship_4_4.jpg', 'discipleship_4_5.jpg', 'discipleship_4_6.jpg', 'discipleship_4_7.jpg', 
        'discipleship_4_8.jpg', 'discipleship_4_9.jpg', 'discipleship_4_10.jpg'
    ];

    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return `../assets/images/discipleship/${imagePaths[randomIndex]}`;
}
 
const addToFavorites = (button) => {
    const icon = button;
    if (button.getAttribute("data-bookmarked") === "false") {
        // add to bookmarks
        icon.className = "fa-solid fa-bookmark";
        icon.style.color = "#f8913d";

        button.setAttribute("data-bookmarked", "true");
    }
    else {
        // remove from bookmarks
        icon.className = "fa-regular fa-bookmark";
        icon.style.color = "var(--text)";
        button.setAttribute("data-bookmarked", "false");
    }
}
const getCategoryObject = () => {
    const data = localStorage.getItem("read-article");
    if (data) {
        return JSON.parse(data);
    }

    return window.history.back();
}


document.addEventListener("DOMContentLoaded", () => {
    const content = getCategoryObject();
    const {article_title: title, image_path, article_intro: message} = content;

    const randomImage = getRandomImagePath();
    let img;

    if (!image_path) {
        img = randomImage;
    }
    else {
        img = image_path;
    }

    // set appbar title to content title capitalised
    document.getElementById("article-title").innerText = title;
    document.getElementById("chapter_image").setAttribute("src", img);
    document.getElementById("message").innerHTML = message.replace(`\"images`, `\"https://www.noahsproject.org/images`);
    
})
