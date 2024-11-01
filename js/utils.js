
const showSnackbar = (message, duration = 3000) => {
    // Create the snackbar element
    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.innerText = message;

    // Append it to the body
    document.body.appendChild(snackbar);

    // Set a timeout to remove the snackbar after the duration
    setTimeout(() => {
        snackbar.classList.add('hide');
        // Remove from DOM after the animation
        snackbar.addEventListener('transitionend', () => snackbar.remove());
    }, duration);
}


const goBack = () => {
    console.log("clicked")
    window.history.back();
}

const gotoPodcasts = (url = "./podcasts.html") => {
    location.href = url;
}

const openVideoShorts = (button, url = "./watch_shorts.html") => {
    window.location.href = url;
}

const toggleDrawer = () => {
    document.querySelector('.drawer-overlay').classList.toggle('drawer-active');

}

const _root = document.documentElement;

if (localStorage.getItem('theme') == 'light') {
    // Switch to light theme
    _root.style.setProperty('--theme-background', '#f1f3ef');
    _root.style.setProperty('--background-light', '#ececec');
    _root.style.setProperty('--card-background', '#d4d4d4');
    _root.style.setProperty('--modal-background', '#dbdbdb');
    _root.style.setProperty('--theme-icon', '#414040');
    _root.style.setProperty('--text', '#0a0a10');
    _root.style.setProperty('--text-safe-color', '#1d1d1d');
    _root.style.setProperty('--primary', '#29db6a');
    _root.style.setProperty('--secondary', '#9696e3');
    _root.style.setProperty('--accent', '#67d37d');

} else {
    // Switch to dark theme
    _root.style.setProperty('--theme-background', '#010104');
    _root.style.setProperty('--background-light', '#0c0b0b');
    _root.style.setProperty('--card-background', '#313131');
    _root.style.setProperty('--modal-background', '#222222');
    _root.style.setProperty('--theme-icon', '#dbd9d9');
    _root.style.setProperty('--text', '#efeff5');
    _root.style.setProperty('--text-safe-color', '#cecece');
    _root.style.setProperty('--primary', '#24d665');
    _root.style.setProperty('--secondary', '#1c1c69');
    _root.style.setProperty('--accent', '#1e1eae');
}