/* =========================================================
   HYAKKIYAKO MENU + PARTICLE + IZUNA PET GAME
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

const viewButton =
    document.getElementById("viewButton");

const backButton =
    document.getElementById("backButton");

const izunaArea =
    document.getElementById("izunaArea");

const petSeconds =
    document.getElementById("petSeconds");


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");


let particles = [];

let particleWidth =
    window.innerWidth;

let particleHeight =
    window.innerHeight;


function resizeCanvas() {

    particleWidth =
        window.innerWidth;

    particleHeight =
        window.innerHeight;

    canvas.width =
        particleWidth;

    canvas.height =
        particleHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   CREATE PARTICLE
========================================================= */

function createParticle() {

    return {

        x:
            Math.random() *
            particleWidth,

        y:
            particleHeight +
            Math.random() * 40,

        size:
            Math.random() * 2.2
            + 0.7,

        speed:
            Math.random() * 0.45
            + 0.25,

        drift:
            (Math.random() - 0.5)
            * 0.22,

        alpha:
            Math.random() * 0.45
            + 0.35,

        glow:
            Math.random() * 5
            + 4

    };

}


/* =========================================================
   INITIAL PARTICLES
========================================================= */

for (
    let i = 0;
    i < 45;
    i++
) {

    const p =
        createParticle();

    p.y =
        Math.random()
        * particleHeight;

    particles.push(p);

}


/* =========================================================
   DRAW PARTICLES
========================================================= */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        particleWidth,
        particleHeight
    );


    for (
        const p of particles
    ) {


        p.y -= p.speed;

        p.x += p.drift;


        /*
         * Reset when particle
         * reaches upper area
         */

        if (
            p.y <
            particleHeight * 0.30
        ) {

            Object.assign(
                p,
                createParticle()
            );

        }


        /*
         * Keep particles
         * inside screen
         */

        if (
            p.x < -10
        ) {

            p.x =
                particleWidth + 10;

        }


        if (
            p.x >
            particleWidth + 10
        ) {

            p.x = -10;

        }


        /*
         * Draw glow
         */

        ctx.beginPath();

        ctx.shadowBlur =
            p.glow;

        ctx.shadowColor =
            "rgba(0,220,255,0.75)";

        ctx.fillStyle =
            `rgba(0,210,255,${p.alpha})`;

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    ctx.shadowBlur = 0;


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


        /*
         * Prevent double click
         */

        viewButton.disabled =
            true;


        /*
         * Hide button
         */

        viewButton.style.opacity =
            "0";


        viewButton.style.pointerEvents =
            "none";


        /*
         * Logo disappear
         */

        logoContainer.classList.add(
            "logo-disappear"
        );


        /*
         * After logo transition
         */

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

            650
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


/* =========================================================
   START PETTING
========================================================= */

function startPetting() {


    if (isPetting) {

        return;

    }


    isPetting =
        true;


    petStartTime =
        performance.now();


    izunaArea.classList.add(
        "petting"
    );


    /*
     * Change instruction
     */

    document.getElementById(
        "petInstruction"
    ).textContent =
        "PET PET...";


}


/* =========================================================
   STOP PETTING
========================================================= */

function stopPetting() {


    if (!isPetting) {

        return;

    }


    totalPetTime +=

        performance.now()
        - petStartTime;


    isPetting =
        false;


    izunaArea.classList.remove(
        "petting"
    );


    document.getElementById(
        "petInstruction"
    ).textContent =
        "RUB IZUNA'S HEAD";

}


/* =========================================================
   SCORE
========================================================= */

function updateScore() {


    let time =
        totalPetTime;


    if (isPetting) {

        time +=

            performance.now()
            - petStartTime;

    }


    petSeconds.textContent =

        (time / 1000)
        .toFixed(1);

}


setInterval(
    updateScore,
    50
);


/* =========================================================
   DESKTOP MOUSE
========================================================= */

izunaArea.addEventListener(
    "mouseenter",
    () => {

        startPetting();

    }
);


izunaArea.addEventListener(
    "mouseleave",
    () => {

        stopPetting();

    }
);


/* =========================================================
   MOBILE TOUCH
========================================================= */

izunaArea.addEventListener(
    "touchstart",
    (event) => {


        event.preventDefault();


        startPetting();

    },
    {
        passive: false
    }
);


izunaArea.addEventListener(
    "touchmove",
    (event) => {


        event.preventDefault();


        if (!isPetting) {

            startPetting();

        }

    },
    {
        passive: false
    }
);


izunaArea.addEventListener(
    "touchend",
    (event) => {


        event.preventDefault();


        stopPetting();

    },
    {
        passive: false
    }
);


izunaArea.addEventListener(
    "touchcancel",
    () => {

        stopPetting();

    }
);
