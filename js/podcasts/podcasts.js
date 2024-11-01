
const audio = new Audio();

const audioHasSrc = () => audio.src ? true : false;

const playEpisode = (target) => {
    const playStatus = target.getAttribute("data-is-playing");
    const audioSrc = target.getAttribute("data-src");

    // set target's audio source to the audio source
    audio.pause();
    audio.src = audioSrc;
    audio.play();

    // set target's title to media player controller title section
    const episode_title = target.querySelector('.episode-title').textContent;
    const marqueeTitle = document.createElement("marquee");
    marqueeTitle.direction = "left";
    marqueeTitle.behavior = "scroll";
    marqueeTitle.innerText = episode_title
    document.getElementById("current-playing-marquee").innerHTML = "";
    document.getElementById("current-playing-marquee").append(marqueeTitle);

    // set the play icon to pause icon to indicaate the audio is playing and can be paused.
    document.getElementById("play-pause-btn").className = "fa-solid fa-pause";
    target.setAttribute("data-is-playing", "true");

    document.getElementById("play-pause-btn").setAttribute("data-in-play", target.id);
}

const playPause = (target) => {
    const inPlay = target.getAttribute("data-in-play");

    if (inPlay === "episode-null") {
        const first_episode = Array.from(document.getElementsByClassName("episode"))[0];
        playEpisode(first_episode)
    }

    else if(inPlay !== "episode-null" && audioHasSrc()) {

        if (audio.paused) {
            audio.play();
            target.className = "fa-solid fa-pause"
        }
        else {
            audio.pause();
            target.className = "fa-solid fa-play"
        }
    }
}