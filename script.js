/* =========================================================
   ELEMENTS
   ========================================================= */

const particleCanvas =
    document.getElementById("particleCanvas");

const ctx =
    particleCanvas.getContext("2d");


/* Screens */

const menuScreen =
    document.getElementById("menuScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const petScreen =
    document.getElementById("petScreen");


/* Menu */

const logo =
    document.getElementById("logo");

const logoContainer =
    document.getElementById("logoContainer");

const leaderboardButton =
    document.getElementById("leaderboardButton");

const petButton =
    document.getElementById("petButton");


/* Mode */

const dayModeButton =
    document.getElementById("dayModeButton");

const nightModeButton =
    document.getElementById("nightModeButton");

const menuBackground =
    document.getElementById("menuBackground");


/* Leaderboard */

const kaitenButton =
    document.getElementById("kaitenButton");

const kurokageButton =
    document.getElementById("kurokageButton");

const bossPanelTitle =
    document.getElementById("bossPanelTitle");

const bossPanelDescription =
    document.getElementById("bossPanelDescription");

const leaderboardBackButton =
    document.getElementById("leaderboardBackButton");


/* Pet */

const petBackButton =
    document.getElementById("petBackButton");

const izunaArea =
    document.getElementById("izunaArea");

const izunaStatic =
    document.getElementById("izunaStatic");

const izunaPet =
    document.getElementById("izunaPet");

const petSeconds =
    document.getElementById("petSeconds");


/* =========================================================
   SCREEN CONTROL
   ========================================================= */

function showScreen(screen) {

    menuScreen.classList.remove("active");
    leaderboardScreen.classList.remove("active");
    petScreen.classList.remove("active");

    screen.classList.add("active");
}


/* Start on Menu */

showScreen(menuScreen);



/* =========================================================
   BACKGROUND MODE
   ========================================================= */

function setDayMode() {

    menuScreen.classList.add("day-mode");

    dayModeButton.classList.add("active");
    nightModeButton.classList.remove("active");

}


function setNightMode() {

    menuScreen.classList.remove("day-mode");

    dayModeButton.classList.remove("active");
    nightModeButton.classList.add("active");

}


dayModeButton.addEventListener(
    "click",
    setDayMode
);


nightModeButton.addEventListener(
    "click",
    setNightMode
);


/* Default */

setNightMode();



/* =========================================================
   SAKURA PARTICLES
   ========================================================= */

let particles = [];

const PARTICLE_COUNT = 75;


function resizeCanvas() {

    particleCanvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    particleCanvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    particleCanvas.style.width =
        window.innerWidth + "px";

    particleCanvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();



/* =========================================================
   SAKURA PETAL
   ========================================================= */

class SakuraParticle {

    constructor(
        x = Math.random() * window.innerWidth,
        y = Math.random() * window.innerHeight
    ) {

        this.x = x;

        this.y = y;

        this.size =
            2.5 +
            Math.random() * 4.5;

        this.speedY =
            0.25 +
            Math.random() * 0.75;

        this.speedX =
            -0.35 +
            Math.random() * 0.7;

        this.rotation =
            Math.random() * Math.PI * 2;

        this.rotationSpeed =
            -0.015 +
            Math.random() * 0.03;

        this.alpha =
            0.25 +
            Math.random() * 0.6;

        this.wave =
            Math.random() * Math.PI * 2;

        this.waveSpeed =
            0.008 +
            Math.random() * 0.02;

        this.color =
            Math.random() > 0.5
                ? "#FFD1E8"
                : "#FF9FCB";

    }


    update() {

        this.wave +=
            this.waveSpeed;

        this.x +=
            this.speedX +
            Math.sin(this.wave) * 0.35;

        this.y +=
            this.speedY;

        this.rotation +=
            this.rotationSpeed;


        if (
            this.y >
            window.innerHeight + 20
        ) {

            this.y = -20;

            this.x =
                Math.random() *
                window.innerWidth;
        }


        if (
            this.x <
            -30
        ) {

            this.x =
                window.innerWidth + 20;

        }


        if (
            this.x >
            window.innerWidth + 30
        ) {

            this.x = -20;

        }

    }


    draw() {

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.rotation
        );

        ctx.globalAlpha =
            this.alpha;

        ctx.fillStyle =
            this.color;


        /* Sakura petal */

        ctx.beginPath();

        ctx.moveTo(
            0,
            -this.size
        );

        ctx.bezierCurveTo(
            this.size,
            -this.size * 0.7,
            this.size,
            this.size * 0.8,
            0,
            this.size
        );

        ctx.bezierCurveTo(
            -this.size,
            this.size * 0.8,
            -this.size,
            -this.size * 0.7,
            0,
            -this.size
        );

        ctx.fill();


        /* Glow */

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            "#FF9FCB";


        ctx.restore();

    }

}



/* Create particles */

for (
    let i = 0;
    i < PARTICLE_COUNT;
    i++
) {

    particles.push(
        new SakuraParticle()
    );

}



/* =========================================================
   PARTICLE BURST
   ========================================================= */

class BurstParticle {

    constructor(
        x,
        y
    ) {

        this.x = x;
        this.y = y;

        const angle =
            Math.random() *
            Math.PI * 2;

        const speed =
            1 +
            Math.random() * 4;

        this.vx =
            Math.cos(angle) *
            speed;

        this.vy =
            Math.sin(angle) *
            speed;

        this.life = 1;

        this.size =
            1 +
            Math.random() * 3;

    }


    update() {

        this.x +=
            this.vx;

        this.y +=
            this.vy;

        this.vx *= 0.97;
        this.vy *= 0.97;

        this.life -= 0.025;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha =
            Math.max(
                0,
                this.life
            );

        ctx.fillStyle =
            "#FFB6DD";

        ctx.shadowBlur = 14;

        ctx.shadowColor =
            "#FF8FC5";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


let burstParticles = [];



function createBurst(
    x,
    y,
    amount = 70
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        burstParticles.push(
            new BurstParticle(
                x,
                y
            )
        );

    }

}



/* =========================================================
   ANIMATION
   ========================================================= */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    burstParticles =
        burstParticles.filter(
            particle =>
                particle.life > 0
        );


    burstParticles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =========================================================
   LOGO TRANSITION
   ========================================================= */

function logoTransition(
    callback
) {

    const rect =
        logo.getBoundingClientRect();


    createBurst(
        rect.left +
        rect.width / 2,

        rect.top +
        rect.height / 2,

        100
    );


    logoContainer.style.opacity =
        "0";

    logoContainer.style.transform =
        "scale(1.05)";

    logoContainer.style.filter =
        "blur(5px)";


    setTimeout(
        callback,
        550
    );

}



/* =========================================================
   MENU → LEADERBOARD
   ========================================================= */

leaderboardButton.addEventListener(
    "click",
    () => {

        logoTransition(
            () => {

                showScreen(
                    leaderboardScreen
                );

            }
        );

    }
);



/* =========================================================
   MENU → PAT IZUNA
   ========================================================= */

petButton.addEventListener(
    "click",
    () => {

        logoTransition(
            () => {

                showScreen(
                    petScreen
                );

            }
        );

    }
);



/* =========================================================
   RETURN TO MENU
   ========================================================= */

function returnToMenu() {

    stopPetting();

    showScreen(
        menuScreen
    );


    setTimeout(
        () => {

            logoContainer.style.opacity =
                "1";

            logoContainer.style.transform =
                "scale(1)";

            logoContainer.style.filter =
                "blur(0)";

        },
        50
    );

}


leaderboardBackButton.addEventListener(
    "click",
    returnToMenu
);


petBackButton.addEventListener(
    "click",
    returnToMenu
);



/* =========================================================
   BOSS SELECTOR
   ========================================================= */

function selectKaiten() {

    kaitenButton.classList.add(
        "active"
    );

    kurokageButton.classList.remove(
        "active"
    );


    bossPanelTitle.textContent =
        "KAITEN";


    bossPanelDescription.textContent =
        "KAITEN MEMBER SCORE WILL APPEAR HERE";

}


function selectKurokage() {

    kurokageButton.classList.add(
        "active"
    );

    kaitenButton.classList.remove(
        "active"
    );


    bossPanelTitle.textContent =
        "KUROKAGE";


    bossPanelDescription.textContent =
        "KUROKAGE MEMBER SCORE WILL APPEAR HERE";

}


kaitenButton.addEventListener(
    "click",
    selectKaiten
);


kurokageButton.addEventListener(
    "click",
    selectKurokage
);



/* =========================================================
   IZUNA PET SYSTEM
   ========================================================= */

let pointerIsDown = false;

let isPetting = false;

let lastPointerX = 0;

let lastPointerY = 0;

let lastMoveTime = 0;

let totalPetTime = 0;

let petStartTime = 0;


/* Head zone */

const HEAD_ZONE = {

    left: 0.25,

    right: 0.75,

    top: 0.02,

    bottom: 0.58

};


/* Minimum movement */

const MIN_RUB_DISTANCE = 1.5;


/* Stop after idle */

const PET_IDLE_DELAY = 220;



/* =========================================================
   CHECK HEAD
   ========================================================= */

function isPointerOnHead(
    event
) {

    const rect =
        izunaArea.getBoundingClientRect();


    const x =
        (event.clientX -
            rect.left) /
        rect.width;


    const y =
        (event.clientY -
            rect.top) /
        rect.height;


    return (
        x >= HEAD_ZONE.left &&
        x <= HEAD_ZONE.right &&
        y >= HEAD_ZONE.top &&
        y <= HEAD_ZONE.bottom
    );

}



/* =========================================================
   START PETTING
   ========================================================= */

function startPetting() {

    if (isPetting) {
        return;
    }


    isPetting = true;

    petStartTime =
        performance.now();


    izunaArea.classList.add(
        "petting"
    );

}



/* =========================================================
   STOP PETTING
   ========================================================= */

function stopPetting() {

    if (
        isPetting
    ) {

        totalPetTime +=
            performance.now() -
            petStartTime;

    }


    isPetting = false;

    izunaArea.classList.remove(
        "petting"
    );

}



/* =========================================================
   POINTER DOWN
   ========================================================= */

izunaArea.addEventListener(
    "pointerdown",
    event => {

        pointerIsDown = true;

        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;

        lastMoveTime =
            performance.now();


        izunaArea.setPointerCapture(
            event.pointerId
        );

    }
);



/* =========================================================
   POINTER MOVE
   ========================================================= */

izunaArea.addEventListener(
    "pointermove",
    event => {

        if (!pointerIsDown) {
            return;
        }


        const dx =
            event.clientX -
            lastPointerX;


        const dy =
            event.clientY -
            lastPointerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;


        if (
            distance <
            MIN_RUB_DISTANCE
        ) {

            return;

        }


        lastMoveTime =
            performance.now();


        if (
            isPointerOnHead(
                event
            )
        ) {

            startPetting();

        } else {

            stopPetting();

        }

    }
);



/* =========================================================
   POINTER UP
   ========================================================= */

function pointerRelease(
    event
) {

    pointerIsDown = false;

    stopPetting();


    try {

        izunaArea.releasePointerCapture(
            event.pointerId
        );

    } catch (error) {}

}


izunaArea.addEventListener(
    "pointerup",
    pointerRelease
);


izunaArea.addEventListener(
    "pointercancel",
    pointerRelease
);



/* =========================================================
   PET TIMER
   ========================================================= */

function updatePetTimer() {

    let currentTime =
        totalPetTime;


    if (isPetting) {

        currentTime +=
            performance.now() -
            petStartTime;

    }


    petSeconds.textContent =
        (
            currentTime / 1000
        ).toFixed(1);


    if (
        isPetting &&
        performance.now() -
        lastMoveTime >
        PET_IDLE_DELAY
    ) {

        stopPetting();

    }


    requestAnimationFrame(
        updatePetTimer
    );

}


updatePetTimer();
