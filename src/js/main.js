document.body.style.overflow = 'hidden';
var cToEnter = document.querySelector(".cToEnter");
cToEnter.style.opacity = "0";
window.currView = "music";
var toTop = document.querySelector('.toTop');
toTop.style.opacity = 0;
toTop.style.display = 'none';

//cursor
cursor = document.querySelector(".cursorShell");
cursor.style.opacity = 0;
fuel = document.querySelector(".fuelDrop");
fuel.remove();
let rotation = 0;
let prevRot = 0;
const grav = 9.81;
let mouseDesk = false;
window.addEventListener("mousemove", e => {
    //cursor rotation and movement physics
    cursor.style.opacity = 1;
    prevRot = rotation;
    rotation = (Math.min(Math.max(((180 * e.movementX) / (Math.PI * cursor.clientHeight) * 1.2), -90), 90) * 3 + prevRot) / 4
    cursor.style.left = `${e.clientX - (cursor.offsetWidth / 2)}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.transform = `rotate(${rotation}deg)`;


});
cursor.addEventListener("mousedown", e => {
    e.preventDefault();
});

var emojiMap = [
    "✨",
    "🌱",
    "🌸",
    "🌺",
    "🌻",
    "🌼",
    "🌱",
    "🌲",
    "🌳",
    "🌴",
    "💛",
    "💚",
    "💙",
    "💜",
]
let ids = 0;

var storeLogos = {
    apple: '<i class="fab fa-itunes"></i>',
    spotify: '<i class="fab fa-spotify"></i>',
    soundcloud: '<i class="fab fa-soundcloud"></i>'
}

var audioMappings = {
    release: {
        new: false,
        name: "eternal mob",
        ft: "",
        preview: "vidPack.wav",
        img: "emob.jpeg",
        date: [10, 9, 2020], // dd/mm/yyyy
        links: {
            fanlink: "https://fanlink.to/eternalmob",
            apple: "https://music.apple.com/ng/album/disintegrate-feat-cruel-santino-single/1514637719",
            spotify: "https://open.spotify.com/album/0m8IW3rBHx43t08KwJiDaO",
            soundcloud: "https://soundcloud.com/soundofbedford/disintegrate-feat-santi",
            audiomack: "https://audiomack.com/tochibedford/song/disintegrate"
        }
    },
    songs: {
        eternalmob: {
            name: "eternal mob - EP",
            ft: "",
            url: "vidPack.wav",
            img: "emob.jpeg",
            link: "https://fanlink.to/eternalmob"
        },
        disintegrate: {
            name: "disintegrate",
            ft: "cruel santino",
            url: "dis.mp3",
            img: "dis.jpeg",
            link: "https://fanlik.to/eternalmob"
        },
        la: {
            name: "la: los angeles",
            ft: "zarion uti",
            url: "la.mp3",
            img: "la.jpeg",
            link: "https://fanlik.to/La"
        },
        creep: {
            name: "creep",
            ft: "ugly mo$$",
            url: "creep.mp3",
            img: "creep.jpg",
            link: "https://soundcloud.com/soundofbedford/creep"
        },
        south: {
            name: "south",
            ft: "zamir",
            url: "south.mp3",
            img: "south.jpg",
            link: "https://fanlink.to/tochisouth"
        },
        news: {
            name: "news",
            ft: "",
            url: "news.mp3",
            img: "news.jpg",
            link: "https://fanlink.to/news"
        }
    },
    beats: {
        1: {
            url: "all.mp3",
            prod: "tochi"
        },
        2: {
            url: "lol.mp3",
            prod: "tochi, john wav"
        },
        3: {
            url: "xM.mp3",
            prod: "tochi, madisonLST"
        },
        4: {
            url: "fo.mp3",
            prod: "tochi, veen"
        },
        5: {
            url: "free.mp3",
            prod: "tochi"
        },
        6: {
            url: "crazy.mp3",
            prod: "tochi"
        },
        7: {
            url: "false.mp3",
            prod: "tochi"
        },
        8: {
            url: "milli.mp3",
            prod: "tochi"
        }
    }
}
window.addEventListener('load', () => {
    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
    window.addEventListener('touchstart', () => {
        cursor.remove();
    });
    //loading the audio files song names and images from the audio mappings object
    var releaseTemplate = document.querySelector(".release");
    releaseTemplate.remove();
    var songTemplate = document.querySelector(".ordinary");
    var app = document.querySelector(".app");
    songTemplate.remove();
    songKeys = Object.keys(audioMappings["songs"]);
    beatKeys = Object.keys(audioMappings["beats"]);
    if (audioMappings.release.new) {
        releaseT = releaseTemplate.cloneNode(true);
        releaseT.children[0].children[0].textContent = audioMappings["release"]["name"]
        releaseT.children[0].children[1].textContent = (audioMappings["release"]["ft"] != "") ? "ft. " + audioMappings["release"]["ft"] : "";
        releaseT.children[2].src = "./assets/imgs/" + audioMappings.release.img
        releaseT.children[1].src = "./assets/music/" + audioMappings.release.preview
        releaseT.children[3].children[0].href = audioMappings.release.links.fanlink;
        let difference = null;
        dateR = audioMappings['release']['date'];
        //date calculation
        setInterval(() => {
            releaseDate = new Date(`${dateR[1]}/${dateR[0]}/${dateR[2]}`); // MM/DD/YYYY
            currentDate = new Date();
            days = parseInt((releaseDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
            hours = parseInt((((releaseDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) - days) * 24)
            minutes = (((((releaseDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) - days) * 24) - hours) * 60
            difference = {
                days: days,
                hours: hours,
                minutes: parseInt(minutes)
            };
            if (difference.days <= 0 && difference.hours <= 0 && difference.minutes <= 0) {
                releaseT.children[0].children[2].children[0].textContent = 'OUT NOW';
                releaseT.children[0].children[2].children[0].classList.add("fakeLevitate");
                releaseT.children[0].children[2].children[0].classList.add("increase");
                releaseT.children[0].children[2].children[0].classList.remove("days");
                releaseT.children[0].children[2].children[0].classList.remove("date");
                if (releaseT.children[0].children[2].children[1]) {
                    releaseT.children[0].children[2].children[1].remove();
                    releaseT.children[0].children[2].children[1].remove();
                }
            } else {
                releaseT.children[3].children[0].textContent = "Pre-Save/Pre-Order";
                releaseT.children[0].children[2].children[0].textContent = difference.days;
                releaseT.children[0].children[2].children[1].textContent = difference.hours;
                releaseT.children[0].children[2].children[2].textContent = difference.minutes;
            }
        }, 1000);
        app.insertBefore(releaseT, app.children[0]);

    }
    for (const key of songKeys) {
        songT = songTemplate.cloneNode(true);
        songT.children[0].children[0].textContent = audioMappings["songs"][key]["name"];
        songT.children[0].children[1].textContent = (audioMappings["songs"][key]["ft"] != "") ? "ft. " + audioMappings["songs"][key]["ft"] : "";
        songT.children[1].src = "./assets/music/" + audioMappings["songs"][key]["url"];
        songT.children[2].children[0].href = audioMappings["songs"][key]["link"];
        songT.children[songT.children.length - 1].src = "./assets/imgs/" + audioMappings["songs"][key]["img"];
        songT.id = audioMappings["songs"][key]["name"];
        ids += 1;

        app.appendChild(songT);

    }
    for (let i = 0; i < beatKeys.length; i++) {
        songT = songTemplate.cloneNode(true);
        songT.children[0].children[0].textContent = emojiMap[i];
        songT.children[0].children[1].textContent = "prod. " + audioMappings["beats"][beatKeys[i]]["prod"];
        songT.children[1].src = "./assets/beats/" + audioMappings["beats"][beatKeys[i]]["url"];
        songT.children[2].remove();
        songT.children[songT.children.length - 1].remove();
        songT.children[0].children[0].classList.add("beat");
        songT.id = audioMappings["beats"][beatKeys[i]]["url"].slice(0, -4);
        if (i == beatKeys.length - 1) {
            songT.children[3].remove();
        }
        app.appendChild(songT);
    }

    //share buttons
    shareButtons = document.querySelectorAll(".shareButton");
    shareButtons.forEach(shareButton => {
        shareButton.addEventListener("click", () => {
            var textArea = document.createElement("textarea");
            // textArea.style.display = "none";
            document.body.appendChild(textArea);
            if (navigator.share) {
                // Web Share API is supported
                navigator.share({
                        title: `Share ${shareButton.parentNode.children[0].children[0]} by Tochi Bedford`,
                        url: `${location.origin}/#${shareButton.parentNode.id}`
                    }).then(() => {
                        textArea.value = `${location.origin}/#${shareButton.parentNode.id}`;
                        textArea.focus();
                        textArea.select();
                        var successful = document.execCommand('copy');
                        textArea.remove();
                        location.href = `${location.origin}/#${shareButton.parentNode.id}`
                        alert("link copied to clipboard, thanks for sharing");
                    })
                    .catch(console.error)
            } else {
                // Fallback
                var pageUrl = encodeURIComponent(`${location.origin}/#${shareButton.parentNode.id}`)
                var tweet = encodeURIComponent('Listen to this tochi bedford release')
                var hashtags = encodeURIComponent("tochibedford")
                var left = (screen.width - 570) / 2;
                var top = (screen.height - 570) / 2;
                url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + tweet + "&hashtags=" + hashtags;
                var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
                textArea.value = `${location.origin}/#${shareButton.parentNode.id}`;
                textArea.focus();
                textArea.select();
                var successful = document.execCommand('copy');
                textArea.remove();
                location.href = `${location.origin}/#${shareButton.parentNode.id}`
                window.open(url, "NewWindow", params);
                alert("link copied to clipboard, thanks for sharing");

            }
        })
    })

    //for scrolling into beatview or song view
    var loadView = (view) => {
        if (view == "music") {
            if (audioMappings.release.new) {
                setTimeout(() => { scrollTo({ left: 0, top: (document.querySelector(".down").parentNode.getBoundingClientRect().height) * 2, behavior: 'smooth' }) }, 300);
            } else {
                setTimeout(() => { scrollTo({ left: 0, top: (document.querySelector(".down").parentNode.getBoundingClientRect().height), behavior: 'smooth' }) }, 300);
            }

        } else if (view == "beats") {
            if (audioMappings.release.new) {
                setTimeout(() => { scrollTo({ left: 0, top: (document.querySelector(".down").parentNode.getBoundingClientRect().height) * (songKeys.length + 2), behavior: 'smooth' }) }, 300);
            } else {
                setTimeout(() => { scrollTo({ left: 0, top: (document.querySelector(".down").parentNode.getBoundingClientRect().height) * (songKeys.length + 1), behavior: 'smooth' }) }, 300);
            }
        }
    };

    var navLinks = document.querySelectorAll(".navLink");
    navLinks.forEach(nav => {
        nav.addEventListener("click", (e) => {
            loadView(nav.textContent);
        })
    })

    audios = document.querySelectorAll(".music");
    songTabs = document.querySelectorAll(".song");
    audios.forEach(aud => {
        aud.volume = 0;
        aud.loop = true
    });
    cToEnter.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        var loader = document.querySelector(".loader");
        loader.classList.add("fadeOut");
        setTimeout(() => { loader.style.display = 'none' }, 500)
        scrollTo({ left: 0, top: 0, behavior: 'smooth' });

        location.href == location.origin + "/" ? {} : location.href = location.href;
        audios[0].play();
        volInc = setInterval(() => {
            audios[0].volume = audios[0].volume + 0.05;
            if (audios[0].volume > 0.4) {
                audios[0].volume = 0.4
                clearInterval(volInc);
            }

        }, 100);


        //event listener for scroll volume
        window.addEventListener("scroll", () => {
            if (scrollY > 500) {
                toTop.style.display = 'inline';
                toTop.style.opacity = String(Math.min(scrollY / 1000, 1))
            } else {
                toTop.style.display = 'none';
            }
            songTabs.forEach(song => {
                var rect = song.getBoundingClientRect();
                if (scrollY == 0) {
                    song.children[1].volume = 0.4;
                } else {
                    val = 0.4 * ((0.8 - Math.min(Math.abs(((window.innerHeight / 2) - (rect.bottom - (rect.height / 2))) / (window.innerHeight / 2)), 0.8)) / 0.8)
                    song.children[1].volume = val
                    if (val == 0) {
                        song.children[1].pause();
                    } else {
                        song.children[1].play();
                        window.nowplaying = song.id;
                    }
                }

            });
        })

        //click to scroll down button
        downs = document.querySelectorAll(".down");
        downs.forEach(down => {
            down.addEventListener("click", (e) => {
                scrollBy({ left: 0, top: (down.parentNode.getBoundingClientRect().height), behavior: 'smooth' });
            })
        })

        //back to Top
        toTop = document.querySelector(".toTop");
        toTop.addEventListener('click', (e) => {
            scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        })


    });
    setTimeout(() => {
        loaderBox = document.querySelector(".loaderbox");
        loaderBox.style.display = 'none';
        cToEnter.classList.add("fadeIn");

    }, 1000);
});