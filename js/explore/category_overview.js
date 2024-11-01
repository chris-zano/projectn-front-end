
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

const openSectionChapters = (article_id) => {
    getCategoryObject().data.forEach(article => {
        if (article["article_id"].toString() === article_id) {
            console.log(article)
            localStorage.setItem('read-article', JSON.stringify(article))
            location.href = "./read_chapter.html";
        }
    })

}

const getCategoryObject = () => {
    const data = localStorage.getItem("category-articles");
    if (data) {
        return JSON.parse(data);
    }

    return window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
    const content = getCategoryObject();
    console.log(content);

    // set appbar title to content title capitalised
    document.getElementById("appbar-title").innerText = content.title;

    const categories = content.data;
    for (let [index, category] of categories.entries()) {
        const randomImage = getRandomImagePath();
        let img;

        if (!category["image_path"]) {
            img = randomImage;
        }
        else {
            img = category["image_path"];
        }

        const list_item = document.createElement("li");
        list_item.className = "section-item";
        list_item.innerHTML =
            `
            <div class="r-card-img">
                <img src="${img}"
                    alt="reading-card-image">
            </div>
            <div class="card-info">
                <div class="rc-title">${category["article_title"]}</div>
                <div class="rc-fav">
                    <button type="button" style="" onclick="openSectionChapters('${category['article_id']}')">Read</button>
                </div>
            </div>
        `;

        document.getElementById("category_sections").append(list_item);
    }
})