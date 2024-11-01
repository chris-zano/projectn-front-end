class BroadcastMedia {

    broadcasts = {
        all: function () {
            // Concatenating all arrays into one
            return [...this.podcasts, ...this.shorts, ...this.videos];
        },
        podcasts: [
            { type: 'podcast', title: 'Live Service [15 Oct 2024]', thumbnail: "../assets/images/image1.jpg", duration: '11:03', releaseDate: '1 hour ago' , audioSrc: "../assets/audio/audio1.mp3"},
            { type: 'podcast', title: 'Live Service [15 Oct 2024]', thumbnail: "../assets/images/discipleship/discipleship_0_1.jpg", duration: '11:03', releaseDate: '1 hour ago' , audioSrc: "../assets/audio/audio1.mp3"},
            { type: 'podcast', title: 'Live Service [15 Oct 2024]', thumbnail: "../assets/images/discipleship/discipleship_0_2.jpg", duration: '11:03', releaseDate: '1 hour ago' , audioSrc: "../assets/audio/audio1.mp3"},
        ],
        shorts: [
            { type: 'short', thumbnail: "../assets/images/image3.jpg", description: 'Quick scripture for today' },
            { type: 'short', thumbnail: "../assets/images/image1.jpg", description: 'Quick scripture for today' },
            { type: 'short', thumbnail: "../assets/images/image2.jpg", description: 'Quick scripture for today' },
            { type: 'short', thumbnail: "../assets/images/discipleship/discipleship_0_4.jpg", description: 'Quick scripture for today' },
        ],
        videos: [
            { type: 'videos', title: 'Sunday Sermon. [The Finishing Grace]', thumbnail: "../assets/images/discipleship/discipleship_1_3.jpg", duration: '11:03', releaseDate: '2 weeks ago', viewCount: "14.1k views" },
            { type: 'videos', title: 'Sunday Sermon. [The Finishing Grace]', thumbnail: "../assets/images/discipleship/discipleship_1_4.jpg", duration: '11:03', releaseDate: '2 weeks ago', viewCount: "14.1k views" },
            { type: 'videos', title: 'Sunday Sermon. [The Finishing Grace]', thumbnail: "../assets/images/discipleship/discipleship_1_5.jpg", duration: '11:03', releaseDate: '2 weeks ago', viewCount: "14.1k views" },
            { type: 'videos', title: 'Sunday Sermon. [The Finishing Grace]', thumbnail: "../assets/images/discipleship/discipleship_1_6.jpg", duration: '11:03', releaseDate: '2 weeks ago', viewCount: "14.1k views" },
            { type: 'videos', title: 'Sunday Sermon. [The Finishing Grace]', thumbnail: "../assets/images/discipleship/discipleship_1_7.jpg", duration: '11:03', releaseDate: '2 weeks ago', viewCount: "14.1k views" },
            { type: 'videos', title: 'Sunday Sermon. [The Finishing Grace]', thumbnail: "../assets/images/discipleship/discipleship_2_2.jpg", duration: '11:03', releaseDate: '2 weeks ago', viewCount: "14.1k views" },
        ]
    };

    constructor() { };

    getMediaList(filter) {
        return filter === "all"
            ? this.broadcasts.all()
            : this.broadcasts[filter]
                ? this.broadcasts[filter]
                : [];

    }
}