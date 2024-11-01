class Loader {
    constructor(loaderId, minDuration = 500) {
        this.loaderElement = document.getElementById(loaderId);
        this.minDuration = minDuration; // Minimum duration to show the loader
        this.showTimeout = null;
    }

    start() {
        // Clear any existing timeouts to avoid overlapping loaders
        clearTimeout(this.showTimeout);

        // Set timeout to make sure loader shows for at least `minDuration`
        this.showTimeout = setTimeout(() => {
            this.loaderElement.classList.add('active');
        }, this.minDuration);
    }

    stop() {
        // Clear the timeout and hide the loader immediately
        clearTimeout(this.showTimeout);
        this.loaderElement.classList.remove('active');
    }
}