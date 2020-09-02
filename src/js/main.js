document.body.style.overflow = 'hidden';
var cToEnter = document.querySelector(".cToEnter");
cToEnter.style.opacity = "0";
window.currView = "music";
var toTop = document.querySelector('.toTop');
toTop.style.opacity = 0;
toTop.style.display = 'none';

//cursor
cursor = document.querySelector(".cursorShell");
fuel = document.querySelector(".fuelDrop");
fuel.remove();
let rotation = 0;
let prevRot = 0;
const grav = 9.81;
let mouseDesk = false;
window.addEventListener("mousemove", e => {
    //cursor rotation and movement physics
    prevRot = rotation;
    rotation = (Math.min(Math.max(((180 * e.movementX) / (Math.PI * cursor.clientHeight) * 1.2), -90), 90) * 3 + prevRot) / 4
    cursor.style.left = `${e.clientX - (cursor.offsetWidth / 2)}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.transform = `rotate(${rotation}deg)`;


});
cursor.addEventListener("mousedown", e => {
    e.preventDefault();
});
// setInterval(() => {
//     fuelD = fuel.cloneNode(true);
//     cursor.parentNode.appendChild(fuelD);
//     fuelD.style.top = `${cursor.offsetTop + cursor.clientHeight}px`;
//     fuelD.style.left = `${((cursor.offsetLeft + (cursor.offsetWidth / 2)) + (Math.random() - 0.5) * 10) - 3}px`;
//     fuelD.style.backgroundColor = "rgb(63.75, 159.375, 175.3125)";
//     fuelD.color = [63.75, 159.375, 175.3125]
//     fuelD.vel = 0.1
//     fuelD.time = 0
// }, 100);

// setInterval(() => {
//     drops = document.querySelectorAll(".fuelDrop");
//     drops.forEach(drop => {
//         drop.time += 1;
//         drop.vel += (grav * drop.time) * 0.00001; //v=u+at
//         drop.style.top = `${drop.offsetTop + (drop.vel * drop.time)}px`
//         drop.color[0] -= -7;
//         drop.color[1] -= 2;
//         drop.color[2] -= -0.5;
//         drop.style.backgroundColor = `rgb(${drop.color[0]},${drop.color[1]}, ${drop.color[2]})`;
//         drop.style.opacity = `${1 - ((drop.vel * drop.time) / (drop.vel * 50))}`
//         if (drop.vel * drop.time >= 50) {
//             drop.remove();
//         }
//     })
// }, 10)

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
var audioMappings = {
    songs: {
        la: {
            name: "la: los angeles",
            ft: "zarion uti",
            url: "la.mp3",
            img: "la.jpeg"
        },
        disintegrate: {
            name: "disintegrate",
            ft: "cruel santino",
            url: "dis.mp3",
            img: "dis.jpeg"
        },
        south: {
            name: "south",
            ft: "zamir",
            url: "south.mp3",
            img: "south.jpg"
        },
        creep: {
            name: "creep",
            ft: "ugly mo$$",
            url: "creep.mp3",
            img: "creep.jpg"
        },
        news: {
            name: "news",
            ft: "",
            url: "news.mp3",
            img: "news.jpg"
        }
    },
    beats: {
        1: {
            url: "all.mp3",
            prod: "tochi"
        },
        2: {
            url: "lol.wav",
            prod: "tochi, john wav"
        },
        3: {
            url: "xM.mp3",
            prod: "tochi, madison"
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
    var songTemplate = document.querySelector(".ordinary");
    var app = document.querySelector(".app");
    songTemplate.remove();
    songKeys = Object.keys(audioMappings["songs"]);
    beatKeys = Object.keys(audioMappings["beats"]);
    for (const key of songKeys) {
        songT = songTemplate.cloneNode(true);
        songT.children[0].children[0].textContent = audioMappings["songs"][key]["name"];
        songT.children[0].children[1].textContent = (audioMappings["songs"][key]["ft"] != "") ? "ft. " + audioMappings["songs"][key]["ft"] : "";
        songT.children[1].src = "./assets/music/" + audioMappings["songs"][key]["url"];
        songT.children[3].src = "./assets/imgs/" + audioMappings["songs"][key]["img"];
        songT.id = audioMappings["songs"][key]["name"];
        ids += 1;

        app.appendChild(songT);

    }
    for (let i = 0; i < beatKeys.length; i++) {
        songT = songTemplate.cloneNode(true);
        songT.children[0].children[0].textContent = emojiMap[i];
        songT.children[0].children[1].textContent = "prod. " + audioMappings["beats"][beatKeys[i]]["prod"];
        songT.children[1].src = "./assets/beats/" + audioMappings["beats"][beatKeys[i]]["url"];
        songT.children[3].remove();
        songT.children[0].children[0].classList.add("beat");
        songT.id = audioMappings["beats"][beatKeys[i]]["url"].slice(0, -4);
        if (i == beatKeys.length - 1) {
            songT.children[2].remove();
        }
        app.appendChild(songT);
    }

    //for scrolling into beatview or song view
    var loadView = (view) => {
        if (view == "music") {
            setTimeout(() => { scrollTo(0, (document.querySelector(".down").parentNode.getBoundingClientRect().height)) }, 300);

        } else if (view == "beats") {
            setTimeout(() => { scrollTo(0, (document.querySelector(".down").parentNode.getBoundingClientRect().height) * (songKeys.length + 1)) }, 300);
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
        scrollTo(0, 0);

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
                scrollBy(0, (down.parentNode.getBoundingClientRect().height));
            })
        })

        //back to Top
        toTop = document.querySelector(".toTop");
        toTop.addEventListener('click', (e) => {
            scrollTo(0, 0);
        })


    });
    setTimeout(() => {
        loaderBox = document.querySelector(".loaderbox");
        loaderBox.style.display = 'none';
        cToEnter.classList.add("fadeIn");

    }, 1000);
});