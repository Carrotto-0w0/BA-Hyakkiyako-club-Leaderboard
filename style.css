/* =========================================================
   HYAKKIYAKO
   MENU + LOGO PARTICLE TRANSITION + IZUNA PET GAME
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


let particleWidth =
    window.innerWidth;

let particleHeight =
    window.innerHeight;


/* =========================================================
   PARTICLE ARRAYS
========================================================= */

let backgroundParticles = [];

let transitionParticles = [];

let transitionActive = false;


/* =========================================================
   RESIZE
========================================================= */

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
   BACKGROUND PARTICLE
========================================================= */

function createBackgroundParticle() {

    return {

        x:
            Math.random()
            * particleWidth,

        y:
            particleHeight
            + Math.random() * 40,

        size:
            Math.random() * 2.2
            + 0.7,

        speed:
            Math.random() * 0.45
            + 0.25,

        drift:
            (
                Math.random()
                - 0.5
            )
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
        * particleHeight;

    backgroundParticles.push(p);
}


/* =========================================================
   CREATE LOGO PARTICLES
========================================================= */

function createLogoParticles() {

    const rect =
        mainLogo.getBoundingClientRect();


    const particleCount =
        Math.min(
            260,
            Math.max(
                150,
                Math.floor(
                    (rect.width * rect.height)
                    / 4200
                )
            )
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        /*
         * Start particle somewhere inside
         * the visible logo area.
         */

        const x =
            rect.left
            + Math.random()
            * rect.width;

        const y =
            rect.top
            + Math.random()
            * rect.height;


        /*
         * Particle movement.
         */

        const angle =
            (
                Math.random()
                * Math.PI
                * 2
            );

        const force =
            Math.random()
            * 2.5
            + 0.8;


        transitionParticles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle)
                * force,

            vy:
                Math.sin(angle)
                * force
                - (
                    Math.random()
                    * 1.8
                    + 0.6
                ),

            size:
                Math.random()
                * 2.3
                + 0.5,

            alpha:
                Math.random()
                * 0.75
                + 0.25,

            life: 1,

            decay:
                Math.random()
                * 0.008
                + 0.004,

            gravity:
                -0.008
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

        p.y -= p.speed;

        p.x += p.drift;


        /*
         * Respawn.
         */

        if (
            p.y <
            particleHeight * 0.30
        ) {

            Object.assign(
                p,
                createBackgroundParticle()
            );
        }


        /*
         * Horizontal wrap.
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
         * Glow.
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
}


/* =========================================================
   DRAW TRANSITION PARTICLES
========================================================= */

function drawTransitionParticles() {

    if (
        transitionParticles.length === 0
    ) {

        return;
    }


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

        p.x += p.vx;

        p.y += p.vy;

        p.vy += p.gravity;


        /*
         * Slight horizontal damping.
         */

        p.vx *= 0.995;


        /*
         * Fade.
         */

        p.life -= p.decay;


        /*
         * Draw.
         */

        ctx.beginPath();

        ctx.shadowBlur =
            10;

        ctx.shadowColor =
            "rgba(0,220,255,0.9)";


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
        particleWidth,
        particleHeight
    );


    /*
     * Background particles.
     */

    drawBackgroundParticles();


    /*
     * Logo transition particles.
     */

    drawTransitionParticles();


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
         * Create particles
         * BEFORE logo disappears.
         */

        createLogoParticles();


        /*
         * Start logo disappearance.
         */

        logoContainer.classList.add(
            "logo-disappear"
        );


        /*
         * Keep particles visible
         * during transition.
         */

        setTimeout(
            () => {

                /*
                 * Fade menu.
                 */

                menuScreen.style.opacity =
                    "0";

                menuScreen.style.pointerEvents =
                    "none";


                /*
                 * Show leaderboard.
                 */

                leaderboardScreen.classList.add(
                    "active"
                );

            },

            1050
        );


        /*
         * Finish transition.
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
                 * Reset menu.
                 */

                menuScreen.style.opacity =
                    "1";

                menuScreen.style.pointerEvents =
                    "auto";


                /*
                 * Reset logo.
                 */

                logoContainer.classList.remove(
                    "logo-disappear"
                );


                /*
                 * Reset button.
                 */

                viewButton.disabled =
                    false;

                viewButton.style.opacity =
                    "1";

                viewButton.style.pointerEvents =
                    "auto";


                /*
                 * Clear old transition particles.
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
   HEAD ZONE
========================================================= */

/*
 * Percentage of the Izuna game area.
 *
 * Adjust these values if necessary.
 */

const HEAD_ZONE = {

    left: 25,

    right: 75,

    top: 8,

    bottom: 58
};


/* =========================================================
   CHECK HEAD AREA
========================================================= */

function isInsideHead(
    x,
    y
) {

    const rect =
        izunaArea.getBoundingClientRect();


    const px =
        x - rect.left;

    const py =
        y - rect.top;


    const percentX =
        (px / rect.width)
        * 100;

    const percentY =
        (py / rect.height)
        * 100;


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
        - petStartTime;


    isPetting =
        false;


    izunaArea.classList.remove(
        "petting"
    );


    petInstruction.textContent =
        "RUB IZUNA'S HEAD";
}


/* =========================================================
   RESET IDLE TIMER
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
            - petStartTime;
    }


    petSeconds.textContent =
        (
            time / 1000
        ).toFixed(1);
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


        /*
         * Capture pointer so dragging
         * remains active.
         */

        try {

            izunaArea.setPointerCapture(
                event.pointerId
            );

        } catch (error) {

            // Ignore unsupported browsers.

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
         * For mouse:
         * movement must happen over Izuna.
         *
         * For touch:
         * finger must be held down.
         */

        if (
            event.pointerType !== "mouse"
            && !pointerDown
        ) {

            return;
        }


        const dx =
            event.clientX
            - lastPointerX;


        const dy =
            event.clientY
            - lastPointerY;


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
         * Ignore extremely tiny movement.
         */

        if (
            distance < 2
        ) {

            return;
        }


        /*
         * Only count movement
         * over Izuna's head.
         */

        if (
            isInsideHead(
                event.clientX,
                event.clientY
            )
        ) {

            startPetting();

            resetPetIdleTimer();

        } else {

            /*
             * If pointer leaves the head,
             * stop after a short delay.
             */

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

            // Ignore.

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

        /*
         * Mouse only.
         *
         * Touch should remain captured
         * while dragging.
         */

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
