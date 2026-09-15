/* =========================================================
   HYAKKIYAKO CLUB
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const menuScreen =
    document.getElementById("menuScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const logoContainer =
    document.getElementById("logoContainer");

const logo =
    document.getElementById("logo");

const viewButton =
    document.getElementById("viewButton");

const backButton =
    document.getElementById("backButton");


/* =========================================================
   IZUNA ELEMENTS
========================================================= */

const izunaContainer =
    document.getElementById("izunaContainer");

const izunaStatic =
    document.getElementById("izunaStatic");

const izunaPet =
    document.getElementById("izunaPet");

const petSeconds =
    document.getElementById("petSeconds");

const petInstruction =
    document.getElementById("petInstruction");


/* =========================================================
   SAFETY CHECK
========================================================= */

if (!canvas || !ctx) {
    console.warn("Particle canvas was not found.");
}


/* =========================================================
   CANVAS SIZE
========================================================= */

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function resizeCanvas() {

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    if (!canvas) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const particles = [];

const MAX_PARTICLES = 90;


/* =========================================================
   RANDOM
========================================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}


/* =========================================================
   AMBIENT PARTICLE
========================================================= */

class AmbientParticle {

    constructor() {

        this.x =
            random(0, canvasWidth);

        this.y =
            random(0, canvasHeight);

        this.size =
            random(0.6, 2.0);

        this.speedY =
            random(-0.18, -0.04);

        this.speedX =
            random(-0.08, 0.08);

        this.alpha =
            random(0.15, 0.55);

        this.life =
            random(0, 1000);

        this.twinkle =
            random(0.01, 0.035);
    }


    update() {

        this.y += this.speedY;

        this.x += this.speedX;

        this.life += 1;

        if (this.y < -10) {

            this.y =
                canvasHeight + 10;

            this.x =
                random(0, canvasWidth);
        }

        if (this.x < -10)
            this.x = canvasWidth + 10;

        if (this.x > canvasWidth + 10)
            this.x = -10;
    }


    draw() {

        if (!ctx) return;

        const pulse =
            Math.sin(this.life * this.twinkle);

        const alpha =
            Math.max(
                0.05,
                this.alpha + pulse * 0.08
            );

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(80,220,255,${alpha})`;

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            "rgba(0,190,255,0.8)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


/* =========================================================
   CREATE AMBIENT PARTICLES
========================================================= */

function createAmbientParticles() {

    particles.length = 0;

    for (
        let i = 0;
        i < MAX_PARTICLES;
        i++
    ) {

        particles.push(
            new AmbientParticle()
        );
    }
}

createAmbientParticles();


/* =========================================================
   LOGO DISSOLVE PARTICLE
========================================================= */

const logoParticles = [];


class LogoParticle {

    constructor(
        x,
        y,
        color
    ) {

        this.x = x;
        this.y = y;

        this.startX = x;
        this.startY = y;

        const angle =
            random(0, Math.PI * 2);

        const speed =
            random(1.0, 4.2);

        this.vx =
            Math.cos(angle) * speed;

        this.vy =
            Math.sin(angle) * speed;

        this.vy -= random(0.2, 1.2);

        this.size =
            random(0.8, 2.5);

        this.alpha = 1;

        this.life = 0;

        this.maxLife =
            random(50, 110);

        this.color = color;
    }


    update() {

        this.x += this.vx;

        this.y += this.vy;

        this.vx *= 0.985;

        this.vy *= 0.985;

        this.vy += 0.018;

        this.life++;

        this.alpha =
            1 -
            this.life /
            this.maxLife;
    }


    draw() {

        if (!ctx) return;

        if (this.alpha <= 0)
            return;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(${this.color},${this.alpha})`;

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            `rgba(${this.color},${this.alpha})`;

        ctx.fill();

        ctx.shadowBlur = 0;
    }


    get dead() {

        return (
            this.life >= this.maxLife
        );
    }
}


/* =========================================================
   CREATE PARTICLES FROM LOGO
========================================================= */

function createLogoParticles() {

    if (!logo || !canvas)
        return;


    const rect =
        logo.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {

        return;
    }


    const tempCanvas =
        document.createElement("canvas");

    const tempCtx =
        tempCanvas.getContext("2d");


    const sampleWidth =
        Math.min(
            260,
            Math.max(
                100,
                Math.floor(rect.width)
            )
        );


    const aspect =
        rect.height /
        rect.width;


    const sampleHeight =
        Math.max(
            1,
            Math.floor(
                sampleWidth * aspect
            )
        );


    tempCanvas.width =
        sampleWidth;

    tempCanvas.height =
        sampleHeight;


    try {

        tempCtx.drawImage(
            logo,
            0,
            0,
            sampleWidth,
            sampleHeight
        );

    } catch (error) {

        console.warn(
            "Unable to sample logo.",
            error
        );

        return;
    }


    const imageData =
        tempCtx.getImageData(
            0,
            0,
            sampleWidth,
            sampleHeight
        );


    const data =
        imageData.data;


    const step = 4;


    for (
        let y = 0;
        y < sampleHeight;
        y += step
    ) {

        for (
            let x = 0;
            x < sampleWidth;
            x += step
        ) {

            const index =
                (y * sampleWidth + x) * 4;


            const alpha =
                data[index + 3];


            if (alpha < 80)
                continue;


            const red =
                data[index];

            const green =
                data[index + 1];

            const blue =
                data[index + 2];


            if (
                red < 15 &&
                green < 15 &&
                blue < 15
            ) {

                continue;
            }


            const px =
                rect.left +
                (x / sampleWidth) *
                rect.width;

            const py =
                rect.top +
                (y / sampleHeight) *
                rect.height;


            logoParticles.push(
                new LogoParticle(
                    px,
                    py,
                    `${red},${green},${blue}`
                )
            );
        }
    }
}


/* =========================================================
   FALLBACK LOGO PARTICLES
========================================================= */

function createFallbackLogoParticles() {

    if (!logo)
        return;


    const rect =
        logo.getBoundingClientRect();


    for (
        let i = 0;
        i < 450;
        i++
    ) {

        logoParticles.push(
            new LogoParticle(
                random(
                    rect.left,
                    rect.right
                ),
                random(
                    rect.top,
                    rect.bottom
                ),
                "80,220,255"
            )
        );
    }
}


/* =========================================================
   BLUE PARTICLE BURST
========================================================= */

function createBurst() {

    if (!canvas)
        return;


    const centerX =
        canvasWidth / 2;

    const centerY =
        canvasHeight / 2;


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const particle =
            new LogoParticle(
                centerX,
                centerY,
                "70,215,255"
            );


        const angle =
            random(
                0,
                Math.PI * 2
            );


        const speed =
            random(2, 7);


        particle.vx =
            Math.cos(angle) * speed;

        particle.vy =
            Math.sin(angle) * speed;


        logoParticles.push(
            particle
        );
    }
}


/* =========================================================
   TRANSITION
========================================================= */

let transitioning = false;


function startTransition() {

    if (transitioning)
        return;

    transitioning = true;


    if (viewButton) {

        viewButton.style.pointerEvents =
            "none";

        viewButton.style.opacity =
            "0";
    }


    /*
       Create particles BEFORE hiding logo
       so the logo can be sampled correctly.
    */

    logoParticles.length = 0;


    try {

        createLogoParticles();

    } catch (error) {

        console.warn(
            "Logo particle generation failed.",
            error
        );
    }


    if (
        logoParticles.length === 0
    ) {

        createFallbackLogoParticles();
    }


    /*
       Fade logo while particles
       are appearing at the same time.
    */

    if (logoContainer) {

        logoContainer.style.opacity =
            "0";

        logoContainer.style.transform =
            "translateY(-4px) scale(1.04)";

        logoContainer.style.filter =
            "blur(5px) drop-shadow(0 0 25px rgba(0,220,255,0.7))";
    }


    /*
       Small blue burst
    */

    setTimeout(
        () => {

            createBurst();

        },
        180
    );


    /*
       Show leaderboard
    */

    setTimeout(
        () => {

            if (menuScreen) {

                menuScreen.style.opacity =
                    "0";

                menuScreen.style.pointerEvents =
                    "none";
            }


            if (leaderboardScreen) {

                leaderboardScreen.classList.add(
                    "active"
                );
            }

        },
        650
    );


    /*
       Finish transition
    */

    setTimeout(
        () => {

            transitioning = false;

        },
        1000
    );
}


/* =========================================================
   BACK TO MENU
========================================================= */

function goBack() {

    stopPetting();


    if (leaderboardScreen) {

        leaderboardScreen.classList.remove(
            "active"
        );
    }


    setTimeout(
        () => {

            if (menuScreen) {

                menuScreen.style.opacity =
                    "1";

                menuScreen.style.pointerEvents =
                    "auto";
            }


            if (logoContainer) {

                logoContainer.style.opacity =
                    "1";

                logoContainer.style.transform =
                    "translateY(0) scale(1)";

                logoContainer.style.filter =
                    "blur(0) drop-shadow(0 0 12px rgba(0,200,255,0.45)) drop-shadow(0 0 28px rgba(0,150,255,0.22))";
            }


            if (viewButton) {

                viewButton.style.opacity =
                    "1";

                viewButton.style.pointerEvents =
                    "auto";
            }

        },
        450
    );
}


/* =========================================================
   BUTTON EVENTS
========================================================= */

if (viewButton) {

    viewButton.addEventListener(
        "click",
        startTransition
    );
}


if (backButton) {

    backButton.addEventListener(
        "click",
        goBack
    );
}


/* =========================================================
   IZUNA PET SYSTEM
========================================================= */

let pointerIsDown = false;

let isPetting = false;

let lastPointerX = 0;
let lastPointerY = 0;

let lastRubTime = 0;

let totalPetTime = 0;

let petStartTime = 0;

let petAccumulatedBeforeCurrent =
    0;


/*
   Head hit zone.

   These values represent percentage
   of the Izuna container.

   Left/right:
       25% → 75%

   Top/bottom:
       2% → 58%
*/

const HEAD_ZONE = {

    left: 0.25,

    right: 0.75,

    top: 0.02,

    bottom: 0.58
};


/*
   Minimum movement required
   to count as actual rubbing.
*/

const MIN_RUB_DISTANCE = 1.5;


/*
   If pointer stops moving for this
   amount of time, petting pauses.
*/

const PET_IDLE_DELAY = 220;


/* =========================================================
   GET POINTER POSITION
========================================================= */

function getLocalPointer(
    event
) {

    if (!izunaContainer)
        return null;


    const rect =
        izunaContainer.getBoundingClientRect();


    const x =
        event.clientX -
        rect.left;


    const y =
        event.clientY -
        rect.top;


    return {

        x,

        y,

        width:
            rect.width,

        height:
            rect.height
    };
}


/* =========================================================
   IS POINTER ON HEAD
========================================================= */

function isOnHead(
    event
) {

    const p =
        getLocalPointer(event);


    if (!p)
        return false;


    const nx =
        p.x / p.width;


    const ny =
        p.y / p.height;


    return (

        nx >= HEAD_ZONE.left &&

        nx <= HEAD_ZONE.right &&

        ny >= HEAD_ZONE.top &&

        ny <= HEAD_ZONE.bottom

    );
}


/* =========================================================
   START PETTING
========================================================= */

function startPetting() {

    if (isPetting)
        return;


    isPetting = true;

    petStartTime =
        performance.now();

    lastRubTime =
        performance.now();


    if (izunaContainer) {

        izunaContainer.classList.add(
            "petting"
        );
    }


    if (petInstruction) {

        petInstruction.textContent =
            "PETTING IZUNA...";

        petInstruction.style.color =
            "rgba(90,230,255,0.95)";
    }
}


/* =========================================================
   STOP PETTING
========================================================= */

function stopPetting() {

    if (!isPetting)
        return;


    const now =
        performance.now();


    totalPetTime +=
        (now - petStartTime) /
        1000;


    isPetting = false;


    if (izunaContainer) {

        izunaContainer.classList.remove(
            "petting"
        );
    }


    if (petInstruction) {

        petInstruction.textContent =
            "RUB IZUNA'S HEAD";

        petInstruction.style.color =
            "";
    }


    updatePetScore();
}


/* =========================================================
   UPDATE SCORE
========================================================= */

function updatePetScore() {

    if (!petSeconds)
        return;


    let currentTime =
        totalPetTime;


    if (isPetting) {

        currentTime +=
            (
                performance.now() -
                petStartTime
            ) / 1000;
    }


    petSeconds.textContent =
        currentTime.toFixed(1);
}


/* =========================================================
   POINTER DOWN
========================================================= */

function pointerDown(event) {

    if (!izunaContainer)
        return;


    /*
       Important:

       Pointer down alone DOES NOT
       start petting.

       The user must actually move
       over Izuna's head.
    */

    pointerIsDown = true;


    lastPointerX =
        event.clientX;

    lastPointerY =
        event.clientY;

    lastRubTime =
        performance.now();


    try {

        izunaContainer.setPointerCapture(
            event.pointerId
        );

    } catch (error) {
        // Ignore unsupported pointer capture
    }


    event.preventDefault();
}


/* =========================================================
   POINTER MOVE
========================================================= */

function pointerMove(event) {

    if (!pointerIsDown)
        return;


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


    /*
       Ignore tiny/no movement.
    */

    if (
        distance <
        MIN_RUB_DISTANCE
    ) {

        return;
    }


    /*
       Actual rubbing requires:
       1. Pointer is held down
       2. Pointer is moving
       3. Pointer is inside head zone
    */

    if (
        isOnHead(event)
    ) {

        if (!isPetting) {

            startPetting();
        }


        lastRubTime =
            performance.now();

    } else {

        /*
           Moving outside head
           pauses petting.
        */

        stopPetting();
    }


    event.preventDefault();
}


/* =========================================================
   POINTER UP
========================================================= */

function pointerUp(event) {

    pointerIsDown = false;

    stopPetting();


    if (
        izunaContainer &&
        event &&
        event.pointerId !== undefined
    ) {

        try {

            izunaContainer.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {
            // Ignore
        }
    }
}


/* =========================================================
   POINTER CANCEL
========================================================= */

function pointerCancel() {

    pointerIsDown = false;

    stopPetting();
}


/* =========================================================
   IZUNA EVENTS
========================================================= */

if (izunaContainer) {

    izunaContainer.addEventListener(
        "pointerdown",
        pointerDown,
        { passive: false }
    );


    izunaContainer.addEventListener(
        "pointermove",
        pointerMove,
        { passive: false }
    );


    izunaContainer.addEventListener(
        "pointerup",
        pointerUp,
        { passive: false }
    );


    izunaContainer.addEventListener(
        "pointercancel",
        pointerCancel,
        { passive: false }
    );


    izunaContainer.addEventListener(
        "lostpointercapture",
        () => {

            if (pointerIsDown) {

                pointerIsDown = false;

                stopPetting();
            }
        }
    );
}


/* =========================================================
   GLOBAL POINTER UP
========================================================= */

window.addEventListener(
    "pointerup",
    () => {

        if (pointerIsDown) {

            pointerIsDown = false;

            stopPetting();
        }
    }
);


/* =========================================================
   ANIMATION LOOP
========================================================= */

function animate() {

    if (ctx) {

        ctx.clearRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );


        /*
           Ambient particles
        */

        for (
            const particle of particles
        ) {

            particle.update();

            particle.draw();
        }


        /*
           Logo transition particles
        */

        for (
            let i =
                logoParticles.length - 1;

            i >= 0;

            i--
        ) {

            const particle =
                logoParticles[i];


            particle.update();

            particle.draw();


            if (particle.dead) {

                logoParticles.splice(
                    i,
                    1
                );
            }
        }
    }


    /*
       Update pet score continuously
       while the user is rubbing.
    */

    if (isPetting) {

        const now =
            performance.now();


        /*
           Safety:
           if movement stops, automatically
           pause the timer.
        */

        if (
            now - lastRubTime >
            PET_IDLE_DELAY
        ) {

            stopPetting();

        } else {

            updatePetScore();
        }
    }


    requestAnimationFrame(
        animate
    );
}


animate();


/* =========================================================
   INITIAL STATE
========================================================= */

if (leaderboardScreen) {

    leaderboardScreen.classList.remove(
        "active"
    );
}


if (menuScreen) {

    menuScreen.style.opacity =
        "1";

    menuScreen.style.pointerEvents =
        "auto";
}


if (viewButton) {

    viewButton.style.opacity =
        "1";

    viewButton.style.pointerEvents =
        "auto";
}


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "%cHyakkiyako Club loaded successfully.",
    "color:#50eaff;font-weight:bold;"
);

console.log(
    "Izuna element:",
    izunaContainer
);

console.log(
    "Particle canvas:",
    canvas
);
