/* =========================================================
   HYAKKIYAKO
   MENU + LOGO PARTICLE TRANSITION + IZUNA
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuScreen =
    document.getElementById("menuScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const logoContainer =
    document.getElementById("logoContainer");

const mainLogo =
    document.querySelector(".main-logo");

const viewButton =
    document.getElementById("viewButton");

const backButton =
    document.getElementById("backButton");

const izunaArea =
    document.getElementById("izunaArea");

const petSeconds =
    document.getElementById("petSeconds");

const petInstruction =
    document.getElementById("petInstruction");


/* =========================================================
   CANVAS
========================================================= */

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");


let canvasWidth =
    window.innerWidth;

let canvasHeight =
    window.innerHeight;


let backgroundParticles = [];

let transitionParticles = [];


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;

    canvas.width =
        canvasWidth;

    canvas.height =
        canvasHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   BACKGROUND PARTICLE
========================================================= */

function createBackgroundParticle() {

    return {

        x:
            Math.random()
            *
            canvasWidth,

        y:
            canvasHeight
            +
            Math.random() * 40,

        size:
            Math.random() * 1.6
            + 0.5,

        speed:
            Math.random() * 0.4
            + 0.25,

        drift:
            (
                Math.random()
                - 0.5
            )
            * 0.18,

        alpha:
            Math.random() * 0.35
            + 0.20,

        glow:
            Math.random() * 4
            + 3

    };

}


/* =========================================================
   INITIAL BACKGROUND PARTICLES
========================================================= */

for (
    let i = 0;
    i < 45;
    i++
) {

    const p =
        createBackgroundParticle();

    p.y =
        Math.random()
        *
        canvasHeight;

    backgroundParticles.push(p);

}


/* =========================================================
   CREATE LOGO PARTICLES
========================================================= */

function createLogoParticles() {

    const rect =
        mainLogo.getBoundingClientRect();


    const width =
        rect.width * 0.72;

    const height =
        rect.height * 0.68;


    const left =
        rect.left
        +
        (
            rect.width
            -
            width
        ) / 2;


    const top =
        rect.top
        +
        (
            rect.height
            -
            height
        ) / 2;


    const count =
        115;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        transitionParticles.push({

            x:
                left
                +
                Math.random()
                *
                width,

            y:
                top
                +
                Math.random()
                *
                height,

            vx:
                (
                    Math.random()
                    - 0.5
                )
                * 0.65,

            vy:
                -(
                    Math.random()
                    * 0.9
                    + 0.15
                ),

            size:
                Math.random()
                * 1.8
                + 0.5,

            alpha:
                Math.random()
                * 0.55
                + 0.30,

            life: 1,

            decay:
                Math.random()
                * 0.018
                + 0.012

        });

    }

}


/* =========================================================
   DRAW BACKGROUND PARTICLES
========================================================= */

function drawBackgroundParticles() {

    for (
        const p
        of backgroundParticles
    ) {

        p.y -=
            p.speed;

        p.x +=
            p.drift;


        if (
            p.y <
            canvasHeight * 0.25
        ) {

            Object.assign(
                p,
                createBackgroundParticle()
            );

        }


        if (
            p.x < -10
        ) {

            p.x =
                canvasWidth + 10;

        }


        if (
            p.x >
            canvasWidth + 10
        ) {

            p.x = -10;

        }


        ctx.beginPath();


        ctx.shadowBlur =
            p.glow;


        ctx.shadowColor =
            "rgba(0,220,255,0.65)";


        ctx.fillStyle =
            `rgba(
                0,
                210,
                255,
                ${p.alpha}
            )`;


        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fill();

    }

}


/* =========================================================
   DRAW TRANSITION PARTICLES
========================================================= */

function drawTransitionParticles() {

    for (
        let i =
            transitionParticles.length - 1;

        i >= 0;

        i--
    ) {

        const p =
            transitionParticles[i];


        p.x +=
            p.vx;

        p.y +=
            p.vy;


        p.vy -=
            0.004;


        p.life -=
            p.decay;


        ctx.beginPath();


        ctx.shadowBlur =
            7;

        ctx.shadowColor =
            "rgba(0,225,255,0.85)";


        ctx.fillStyle =
            `rgba(
                10,
                220,
                255,
                ${p.alpha * p.life}
            )`;


        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fill();


        if (
            p.life <= 0
        ) {

            transitionParticles.splice(
                i,
                1
            );

        }

    }

}


/* =========================================================
   PARTICLE LOOP
========================================================= */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    drawBackgroundParticles();

    drawTransitionParticles();


    ctx.shadowBlur =
        0;


    requestAnimationFrame(
        drawParticles
    );

}


drawParticles();


/* =========================================================
   VIEW BUTTON
========================================================= */

viewButton.addEventListener(
    "click",
    () => {

        viewButton.disabled =
            true;

        viewButton.style.opacity =
            "0";

        viewButton.style.pointerEvents =
            "none";


        createLogoParticles();


        logoContainer.classList.add(
            "logo-disappear"
        );


        setTimeout(
            () => {

                menuScreen.style.opacity =
                    "0";

                menuScreen.style.pointerEvents =
                    "none";

                leaderboardScreen.classList.add(
                    "active"
                );

            },

            950
        );

    }
);


/* =========================================================
   BACK BUTTON
========================================================= */

backButton.addEventListener(
    "click",
    () => {

        leaderboardScreen.classList.remove(
            "active"
        );


        setTimeout(
            () => {

                menuScreen.style.opacity =
                    "1";

                menuScreen.style.pointerEvents =
                    "auto";


                logoContainer.classList.remove(
                    "logo-disappear"
                );


                viewButton.disabled =
                    false;

                viewButton.style.opacity =
                    "1";

                viewButton.style.pointerEvents =
                    "auto";


                transitionParticles = [];

            },

            500
        );

    }
);


/* =========================================================
   IZUNA PET GAME
========================================================= */

let isPetting =
    false;

let petStartTime =
    0;

let totalPetTime =
    0;


let pointerDown =
    false;

let lastPointerX =
    0;

let lastPointerY =
    0;

let petIdleTimer =
    null;


/* =========================================================
   HEAD AREA
========================================================= */

const HEAD_ZONE = {

    left: 25,

    right: 75,

    top: 5,

    bottom: 58

};


/* =========================================================
   CHECK HEAD
========================================================= */

function isInsideHead(
    x,
    y
) {

    const rect =
        izunaArea.getBoundingClientRect();


    const localX =
        x -
        rect.left;


    const localY =
        y -
        rect.top;


    const percentX =
        (
            localX /
            rect.width
        ) * 100;


    const percentY =
        (
            localY /
            rect.height
        ) * 100;


    return (

        percentX >=
        HEAD_ZONE.left

        &&

        percentX <=
        HEAD_ZONE.right

        &&

        percentY >=
        HEAD_ZONE.top

        &&

        percentY <=
        HEAD_ZONE.bottom

    );

}


/* =========================================================
   START PETTING
========================================================= */

function startPetting() {

    if (
        isPetting
    ) {

        return;

    }


    isPetting =
        true;


    petStartTime =
        performance.now();


    izunaArea.classList.add(
        "petting"
    );


    petInstruction.textContent =
        "PET PET...";

}


/* =========================================================
   STOP PETTING
========================================================= */

function stopPetting() {

    if (
        !isPetting
    ) {

        return;

    }


    totalPetTime +=

        performance.now()
        -
        petStartTime;


    isPetting =
        false;


    izunaArea.classList.remove(
        "petting"
    );


    petInstruction.textContent =
        "RUB IZUNA'S HEAD";

}


/* =========================================================
   IDLE
========================================================= */

function resetPetIdleTimer() {

    clearTimeout(
        petIdleTimer
    );


    petIdleTimer =
        setTimeout(
            () => {

                stopPetting();

            },

            220
        );

}


/* =========================================================
   SCORE UPDATE
========================================================= */

function updateScore() {

    let time =
        totalPetTime;


    if (
        isPetting
    ) {

        time +=

            performance.now()
            -
            petStartTime;

    }


    petSeconds.textContent =

        (
            time /
            1000
        )
        .toFixed(1);

}


setInterval(
    updateScore,
    50
);


/* =========================================================
   POINTER DOWN
========================================================= */

izunaArea.addEventListener(
    "pointerdown",
    (event) => {

        event.preventDefault();


        pointerDown =
            true;


        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;


        try {

            izunaArea.setPointerCapture(
                event.pointerId
            );

        } catch (error) {}

    }
);


/* =========================================================
   POINTER MOVE
========================================================= */

izunaArea.addEventListener(
    "pointermove",
    (event) => {

        event.preventDefault();


        if (
            event.pointerType !== "mouse"
            &&
            !pointerDown
        ) {

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
            distance < 2
        ) {

            return;

        }


        if (
            isInsideHead(
                event.clientX,
                event.clientY
            )
        ) {

            startPetting();

            resetPetIdleTimer();

        }

    }
);


/* =========================================================
   POINTER UP
========================================================= */

izunaArea.addEventListener(
    "pointerup",
    (event) => {

        event.preventDefault();


        pointerDown =
            false;


        clearTimeout(
            petIdleTimer
        );


        stopPetting();


        try {

            izunaArea.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {}

    }
);


/* =========================================================
   POINTER CANCEL
========================================================= */

izunaArea.addEventListener(
    "pointercancel",
    () => {

        pointerDown =
            false;


        clearTimeout(
            petIdleTimer
        );


        stopPetting();

    }
);


/* =========================================================
   MOUSE LEAVE
========================================================= */

izunaArea.addEventListener(
    "pointerleave",
    (event) => {

        if (
            event.pointerType === "mouse"
        ) {

            clearTimeout(
                petIdleTimer
            );

            stopPetting();

        }

    }
);
