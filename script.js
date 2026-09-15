/* =========================================================
   HYAKKIYAKO
   MENU
   LOGO PARTICLE TRANSITION
   BACKGROUND PARTICLES
   IZUNA PET GAME
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuScreen =
    document.getElementById(
        "menuScreen"
    );


const leaderboardScreen =
    document.getElementById(
        "leaderboardScreen"
    );


const logoContainer =
    document.getElementById(
        "logoContainer"
    );


const mainLogo =
    document.querySelector(
        ".main-logo"
    );


const viewButton =
    document.getElementById(
        "viewButton"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


const izunaArea =
    document.getElementById(
        "izunaArea"
    );


const petSeconds =
    document.getElementById(
        "petSeconds"
    );


const petInstruction =
    document.getElementById(
        "petInstruction"
    );


/* =========================================================
   CANVAS
========================================================= */

const canvas =
    document.getElementById(
        "particleCanvas"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


let canvasWidth =
    window.innerWidth;


let canvasHeight =
    window.innerHeight;


/* =========================================================
   PARTICLES
========================================================= */

let backgroundParticles = [];

let transitionParticles = [];


/* =========================================================
   STATE
========================================================= */

let transitionActive =
    false;


/* =========================================================
   CANVAS RESIZE
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
            Math.random() * 50,

        size:
            Math.random() * 1.8
            + 0.5,

        speed:
            Math.random() * 0.45
            + 0.25,

        drift:
            (
                Math.random()
                - 0.5
            )
            * 0.20,

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
    i < 50;
    i++
) {

    const p =
        createBackgroundParticle();


    p.y =
        Math.random()
        *
        canvasHeight;


    backgroundParticles.push(
        p
    );

}


/* =========================================================
   CREATE LOGO PARTICLES
========================================================= */

function createLogoParticles() {

    /*
     * Get current logo position.
     * This happens BEFORE the logo disappears.
     */

    const rect =
        mainLogo.getBoundingClientRect();


    /*
     * Smaller particle count.
     */

    const particleCount =
        Math.min(
            150,
            Math.max(
                90,
                Math.floor(
                    (
                        rect.width
                        *
                        rect.height
                    )
                    /
                    8500
                )
            )
        );


    /*
     * Smaller emission area.
     *
     * Instead of the entire logo rectangle,
     * keep particles closer to the center.
     */

    const areaWidth =
        rect.width
        *
        0.78;


    const areaHeight =
        rect.height
        *
        0.72;


    const areaLeft =
        rect.left
        +
        (
            rect.width
            -
            areaWidth
        )
        /
        2;


    const areaTop =
        rect.top
        +
        (
            rect.height
            -
            areaHeight
        )
        /
        2;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {


        /*
         * Position.
         */

        const x =
            areaLeft
            +
            Math.random()
            *
            areaWidth;


        const y =
            areaTop
            +
            Math.random()
            *
            areaHeight;


        /*
         * Mostly upward movement.
         */

        const vx =
            (
                Math.random()
                - 0.5
            )
            *
            1.4;


        const vy =
            -(
                Math.random()
                *
                1.6
                +
                0.35
            );


        transitionParticles.push({

            x: x,

            y: y,

            vx: vx,

            vy: vy,

            size:
                Math.random()
                *
                1.8
                +
                0.5,

            alpha:
                Math.random()
                *
                0.55
                +
                0.35,

            life: 1,

            decay:
                Math.random()
                *
                0.009
                +
                0.005

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

            p.x =
                -10;

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
   DRAW LOGO TRANSITION PARTICLES
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


        /*
         * Movement.
         */

        p.x +=
            p.vx;


        p.y +=
            p.vy;


        /*
         * Slight upward acceleration.
         */

        p.vy -=
            0.006;


        /*
         * Fade.
         */

        p.life -=
            p.decay;


        /*
         * Draw.
         */

        ctx.beginPath();


        ctx.shadowBlur =
            7;


        ctx.shadowColor =
            "rgba(0,225,255,0.85)";


        ctx.fillStyle =
            `rgba(
                15,
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


        /*
         * Remove particle.
         */

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
   VIEW TRANSITION
========================================================= */

viewButton.addEventListener(
    "click",
    () => {


        if (
            transitionActive
        ) {

            return;

        }


        transitionActive =
            true;


        /*
         * Disable button.
         */

        viewButton.disabled =
            true;


        viewButton.style.opacity =
            "0";


        viewButton.style.pointerEvents =
            "none";


        /*
         * -------------------------------------------------
         * STEP 1
         *
         * Logo begins fading.
         * NO transition particles yet.
         * -------------------------------------------------
         */

        logoContainer.classList.add(
            "logo-disappear"
        );


        /*
         * -------------------------------------------------
         * STEP 2
         *
         * Wait until logo is almost completely gone.
         *
         * Logo animation = 700ms
         * Particle starts = 760ms
         * -------------------------------------------------
         */

        setTimeout(
            () => {

                createLogoParticles();

            },

            760
        );


        /*
         * -------------------------------------------------
         * STEP 3
         *
         * Show leaderboard after
         * logo + particle transition.
         * -------------------------------------------------
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

            1150
        );


        /*
         * Transition state ends.
         */

        setTimeout(
            () => {

                transitionActive =
                    false;

            },

            1500
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


                /*
                 * Restore menu.
                 */

                menuScreen.style.opacity =
                    "1";


                menuScreen.style.pointerEvents =
                    "auto";


                /*
                 * Restore logo.
                 */

                logoContainer.classList.remove(
                    "logo-disappear"
                );


                /*
                 * Restore button.
                 */

                viewButton.disabled =
                    false;


                viewButton.style.opacity =
                    "1";


                viewButton.style.pointerEvents =
                    "auto";


                /*
                 * Remove old transition particles.
                 */

                transitionParticles =
                    [];


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
   POINTER
========================================================= */

let pointerDown =
    false;


let lastPointerX =
    0;


let lastPointerY =
    0;


let petIdleTimer =
    null;


/* =========================================================
   HEAD ZONE
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
        x
        -
        rect.left;


    const localY =
        y
        -
        rect.top;


    const percentX =
        (
            localX
            /
            rect.width
        )
        *
        100;


    const percentY =
        (
            localY
            /
            rect.height
        )
        *
        100;


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
   IDLE TIMER
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
   SCORE
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
            time
            /
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

        } catch (error) {

        }

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
            event.clientX
            -
            lastPointerX;


        const dy =
            event.clientY
            -
            lastPointerY;


        const distance =
            Math.sqrt(
                dx * dx
                +
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

        } catch (error) {

        }

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
