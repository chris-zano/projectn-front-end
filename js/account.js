
const toggleDarkMode = () => {
    const root = document.documentElement;

    
    if (root.style.getPropertyValue('--theme-background') === '#010104') {
        // Switch to light theme
        root.style.setProperty('--theme-background', '#f1f3ef');
        root.style.setProperty('--background-light', '#ececec');
        root.style.setProperty('--card-background', '#d4d4d4');
        root.style.setProperty('--modal-background', '#dbdbdb');
        root.style.setProperty('--theme-icon', '#414040');
        root.style.setProperty('--text', '#0a0a10');
        root.style.setProperty('--text-safe-color', '#1d1d1d');
        root.style.setProperty('--primary', '#29db6a');
        root.style.setProperty('--secondary', '#9696e3');
        root.style.setProperty('--accent', '#67d37d');

        localStorage.setItem('theme', 'light')
    } else {
        // Switch to dark theme
        root.style.setProperty('--theme-background', '#010104');
        root.style.setProperty('--background-light', '#0c0b0b');
        root.style.setProperty('--card-background', '#313131');
        root.style.setProperty('--modal-background', '#222222');
        root.style.setProperty('--theme-icon', '#dbd9d9');
        root.style.setProperty('--text', '#efeff5');
        root.style.setProperty('--text-safe-color', '#cecece');
        root.style.setProperty('--primary', '#24d665');
        root.style.setProperty('--secondary', '#1c1c69');
        root.style.setProperty('--accent', '#1e1eae');
        localStorage.setItem('theme', 'dark')
    }
    closeSettingsModal()
};

const clearCache = () => {
    localStorage.clear();
    showSnackbar('Clearing Cache', 2000);
    location.reload();
};

const deleteAccount = () => {
    showSnackbar('Deleting account', 2000);
    console.log('Deleting account');
    closeSettingsModal();
};

const createSettingsModal = (podcast_id) => {
    const SettingsModal = document.createElement("div");
    SettingsModal.id = "settings-modal";
    SettingsModal.className = "podcast-options-modal";

    // Create an overlay
    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "modal-overlay";

    SettingsModal.innerHTML =
        `
       <div class="row-close">
            <i class="fa-solid fa-circle-xmark" onclick="closeSettingsModal(this)"></i>
        </div>
        <ul>
            <li onclick="toggleDarkMode()">
                <div class="li-icon">
                    <i class="fa-solid fa-moon"></i>
                </div>
                <div class="li-text">Toggle Dark Mode</div>
            </li>
            <li  onclick="clearCache()">
                <div class="li-icon">
                    <i class="fa-solid fa-broom"></i>
                </div>
                <div class="li-text">Clear Cache</div>
            </li>
            <li  onclick="deleteAccount()">
                <div class="li-icon">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="li-text">Delete Account</div>
            </li>
        </ul> 
    `;

    // Append modal and overlay to the body
    overlay.appendChild(SettingsModal);
    document.getElementById("container_wrapper_main").appendChild(overlay);

    // Close modal on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeSettingsModal();
        }
    });

    return SettingsModal;
}



const openSettingsModal = (podcast_id) => {
    const openedSettingsModal = document.getElementById("settings-modal");

    if (!openedSettingsModal) {
        const SettingsModal = createSettingsModal(podcast_id);
        document.getElementById("container_wrapper_main").append(SettingsModal);
    }

    else {
        document.getElementById("container_wrapper_main").removeChild(openedSettingsModal);
    }
}

const closeSettingsModal = () => {
    const openedSettingsModal = document.getElementById("settings-modal");
    const overlay = document.getElementById("modal-overlay");

    if (openedSettingsModal) {
        // Remove the modal and overlay from the DOM
        document.getElementById("container_wrapper_main").removeChild(openedSettingsModal);
        document.getElementById("container_wrapper_main").removeChild(overlay);
    }
}

