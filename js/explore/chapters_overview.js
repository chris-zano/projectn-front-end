
const openChapter = (index, offset) => {
    const _chapter = {index, offset};
    localStorage.setItem('read-object', JSON.stringify(_chapter));
    location.href = "./read_chapter.html";
}

const getCategoryObject = () => {
    const data = localStorage.getItem("chapters-object");
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

    const categories = content.chapters;
    for (let [index, category] of categories.entries()) {

        const list_item = document.createElement("li");
        list_item.className = "section-item";
        list_item.innerHTML =
            `
            <div class="r-card-img">
                <img src="../${category['imagePath']}"
                    alt="reading-card-image">
            </div>
            <div class="card-info">
                <div class="rc-title">${category['title']}</div>
                <div class="rc-author-datetime">
                    <div class="rc-datetime">25 min</div>
                </div>
            </div>
            <div class="rc-fav">
                <button type="button" style="background-color: var(--accent);" 
                onclick="openChapter('${index}', '${content.index}')">Read</button>
            </div>
        `;

        document.getElementById("category_sections").append(list_item);
    }
})