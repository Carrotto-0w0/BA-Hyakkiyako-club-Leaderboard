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
   TRANSITION STATE
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
            * canvasWidth,

        y:
            canvasHeight
            +
            Math.random() * 50,

        size:
            Math.random() * 2
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
            Math.random() * 0.40
            + 0.25,

        glow:
            Math.random() * 5
            + 4

    };

}


/* =========================================================
   INITIAL BACKGROUND PARTICLES
========================================================= */

for (
    let i = 0;
    i < 55;
    i++
) {

    const p =
        createBackgroundParticle();


    p.y =
        Math.random()
        * canvasHeight;


    backgroundParticles.push(
        p
    );

}


/* =========================================================
   CREATE LOGO PARTICLES
========================================================= */

function createLogoParticles() {

    const rect =
        mainLogo.getBoundingClientRect();


    /*
     * More particles for
     * stronger logo dissolution.
     */

    const particleCount =
        Math.min(
            420,
            Math.max(
                220,
                Math.floor(
                    (
                        rect.width
                        *
                        rect.height
                    )
                    /
                    3000
                )
            )
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {


        /*
         * Start from logo area.
         */

        const x =
            rect.left
            +
            Math.random()
            *
            rect.width;


        const y =
            rect.top
            +
            Math.random()
            *
            rect.height;


        /*
         * Particle direction.
         *
         * Bias movement upward.
         */

        const angle =
            (
                Math.random()
                *
                Math.PI
                *
                2
            );


        const force =
            Math.random()
            *
            2.8
            +
            0.7;


        transitionParticles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle)
                *
                force,

            vy:
                Math.sin(angle)
                *
                force
                -
                (
                    Math.random()
                    *
                    1.8
                ),

            size:
                Math.random()
                *
                2.6
                +
                0.5,

            alpha:
                Math.random()
                *
                0.7
                +
                0.3,

            life: 1,

            decay:
                Math.random()
                *
                0.007
                +
                0.003,

            gravity:
                -0.012

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


        /*
         * Move upward.
         */

        p.y -=
            p.speed;


        /*
         * Slight horizontal movement.
         */

        p.x +=
            p.drift;


        /*
         * Respawn.
         */

        if (
            p.y <
            canvasHeight * 0.25
        ) {

            Object.assign(
                p,
                createBackgroundParticle()
            );

        }


        /*
         * Wrap horizontal.
         */

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


        /*
         * Draw.
         */

        ctx.beginPath();


        ctx.shadowBlur =
            p.glow;


        ctx.shadowColor =
            "rgba(0,220,255,0.8)";


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

        p.vy +=
            p.gravity;


        /*
         * Slight damping.
         */

        p.vx *=
            0.995;


        /*
         * Fade.
         */

        p.life -=
            p.decay;


        /*
         * Draw particle.
         */

        ctx.beginPath();


        ctx.shadowBlur =
            10;


        ctx.shadowColor =
            "rgba(0,225,255,0.95)";


        ctx.fillStyle =
            `rgba(
                20,
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
         * Remove dead particles.
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


    /*
     * Background.
     */

    drawBackgroundParticles();


    /*
     * Logo transition.
     */

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


        /*
         * Prevent double click.
         */

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
         * IMPORTANT:
         * Capture logo position BEFORE
         * making it disappear.
         */

        createLogoParticles();


        /*
         * Start logo animation.
         */

        logoContainer.classList.add(
            "logo-disappear"
        );


        /*
         * Fade menu after
         * logo transition.
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

            1050
        );


        /*
         * Transition finished.
         */

        setTimeout(
            () => {

                transitionActive =
                    false;

            },

            1600
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
                 * Clear old particles.
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
   POINTER STATE
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
   IZUNA HEAD AREA
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
   PET IDLE TIMER
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
   UPDATE SCORE
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


        /*
         * Touch / pen:
         * must hold pointer.
         *
         * Mouse:
         * movement itself is enough.
         */

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


        /*
         * Ignore tiny movement.
         */

        if (
            distance < 2
        ) {

            return;

        }


        /*
         * Only head movement counts.
         */

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
