document.body.style.overflow = 'hidden';
var cToEnter = document.querySelector(".cToEnter");
cToEnter.style.opacity = "0";
window.currView = "music";
window.addEventListener('load', () => {
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
        audios[0].play();
        volInc = setInterval(() => {
            audios[0].volume = audios[0].volume + 0.05;
            if (audios[0].volume > 0.3) {
                audios[0].volume = 0.3
                clearInterval(volInc);
            }

        }, 100);


        //event listener for scroll volume
        window.addEventListener("scroll", () => {

            songTabs.forEach(song => {
                var rect = song.getBoundingClientRect();
                if (scrollY == 0) {
                    song.children[1].volume = 0.3;
                } else {
                    val = 0.3 * ((0.8 - Math.min(Math.abs(((window.innerHeight / 2) - (rect.bottom - (rect.height / 2))) / (window.innerHeight / 2)), 0.8)) / 0.8)
                    song.children[1].volume = val
                    if (val == 0) {
                        song.children[1].pause();
                    } else {
                        song.children[1].play();
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


    });
    setTimeout(() => {
        loaderBox = document.querySelector(".loaderbox");
        loaderBox.style.display = 'none';
        cToEnter.classList.add("fadeIn");

    }, 1000);
});