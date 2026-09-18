/* =====================================================
   HYAKKIYAKO CLUB
   Main JavaScript
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const menuScreen =
    document.getElementById("menuScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const izunaScreen =
    document.getElementById("izunaScreen");

const logoContainer =
    document.getElementById("logoContainer");

const mainLogo =
    document.getElementById("mainLogo");

const leaderboardButton =
    document.getElementById("leaderboardButton");

const patButton =
    document.getElementById("patButton");

const leaderboardBackButton =
    document.getElementById("leaderboardBackButton");

const izunaBackButton =
    document.getElementById("izunaBackButton");

const modeToggle =
    document.getElementById("modeToggle");

const modeIcon =
    document.getElementById("modeIcon");

const modeText =
    document.getElementById("modeText");

const leaderboardList =
    document.getElementById("leaderboardList");

const seasonButtons =
    document.querySelectorAll(".season-option");

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");

const izunaArea =
    document.getElementById("izunaArea");

const izunaStatic =
    document.getElementById("izunaStatic");

const izunaPet =
    document.getElementById("izunaPet");

const petSeconds =
    document.getElementById("petSeconds");

const petInstruction =
    document.getElementById("petInstruction");


/* =====================================================
   LEADERBOARD DATA
===================================================== */

/*
    Kurokage data is based on the supplied
    "Kurokage rank.pdf".

    #N/A is intentionally preserved.
*/

const kuroKageData = [

    {
        rank: 1,
        name: "Yayus",
        score: "21"
    },

    {
        rank: 2,
        name: "Polygon363",
        score: "363"
    },

    {
        rank: 3,
        name: "「SH」Messi",
        score: "427"
    },

    {
        rank: 4,
        name: "「SH」DedeMiku",
        score: "486"
    },

    {
        rank: 5,
        name: "「SH」雨息",
        score: "545"
    },

    {
        rank: 6,
        name: "「SH」Yura",
        score: "610"
    },

    {
        rank: 7,
        name: "「SH」Carrotic",
        score: "798"
    },

    {
        rank: 8,
        name: "「SH」Velloz",
        score: "888"
    },

    {
        rank: 9,
        name: "「SH」Keen",
        score: "994"
    },

    {
        rank: 10,
        name: "Derain",
        score: "1029"
    },

    {
        rank: 11,
        name: "แควมวย (Ebimiso)",
        score: "1058"
    },

    {
        rank: 12,
        name: "ⓋFOXSNOW✿࿐",
        score: "1317"
    },

    {
        rank: 13,
        name: "Kargvee",
        score: "1504"
    },

    {
        rank: 14,
        name: "Relax",
        score: "1926"
    },

    {
        rank: 15,
        name: "「SH」nero",
        score: "1993"
    },

    {
        rank: 16,
        name: "「SH」Nahima",
        score: "2169"
    },

    {
        rank: 17,
        name: "Geeao",
        score: "2652"
    },

    {
        rank: 18,
        name: "ไอ๊หยาา",
        score: "2907"
    },

    {
        rank: 19,
        name: "Nezunanda",
        score: "3207"
    },

    {
        rank: 20,
        name: "Vannesith",
        score: "3346"
    },

    {
        rank: 21,
        name: "「SH」SkyRish☆",
        score: "3529"
    },

    {
        rank: 22,
        name: "Demornato",
        score: "3557"
    },

    {
        rank: 23,
        name: "「SH」Lunari",
        score: "4158"
    },

    {
        rank: 24,
        name: "S_Chainzer",
        score: "4298"
    },

    {
        rank: 25,
        name: "「SH」Xyren",
        score: "4488"
    },

    {
        rank: 26,
        name: "j4k4l41238325",
        score: "4662"
    },

    /*
        หมายเหตุ:
        PDF extraction มีบรรทัดของ #27/#28
        ติดกันเป็น
        "NW2M 656628 「SH」Fournier6655"

        จึงแยกเป็นค่าที่อ่านได้จาก source:
        #27 NW2M 6566
        #28 「SH」Fournier 6655
    */

    {
        rank: 27,
        name: "NW2M",
        score: "6566"
    },

    {
        rank: 28,
        name: "「SH」Fournier",
        score: "6655"
    },

    {
        rank: 29,
        name: "Rui",
        score: "6901"
    },

    {
        rank: 30,
        name: "Helheim",
        score: "7102"
    },

    {
        rank: 31,
        name: "CallMeGarr",
        score: "7315"
    },

    {
        rank: 32,
        name: "Uncle.POM",
        score: "7529"
    },

    {
        rank: 33,
        name: "kondee",
        score: "7709"
    },

    {
        rank: 34,
        name: "WhoTao",
        score: "8711"
    },

    {
        rank: 35,
        name: "Astra",
        score: "9693"
    },

    {
        rank: 36,
        name: "「SH」Ronaldo",
        score: "10054"
    },

    {
        rank: 37,
        name: "EmptyCup",
        score: "11446"
    },

    {
        rank: 38,
        name: "Mthanh",
        score: "12874"
    },

    {
        rank: 39,
        name: "「SH」Miyuki",
        score: "#N/A"
    },

    {
        rank: 40,
        name: "Kiralya",
        score: "#N/A"
    },

    {
        rank: 41,
        name: "5M0K3>.<",
        score: "#N/A"
    },

    {
        rank: 42,
        name: "ผมหิวข้าว",
        score: "#N/A"
    },

    {
        rank: 43,
        name: "coretta",
        score: "#N/A"
    },

    {
        rank: 44,
        name: "「SH」DiPa",
        score: "#N/A"
    }

];


/*
    KAITEN

    ยังไม่มีข้อมูลคะแนนจากผู้ใช้
    จึงไม่ใส่ข้อมูลปลอม
*/

const kaitenData = [];


/* =====================================================
   CURRENT SEASON
===================================================== */

let currentSeason =
    "kurokage";


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });

    screen.classList.add("active");
}


/* =====================================================
   MENU -> LEADERBOARD
===================================================== */

leaderboardButton.addEventListener(
    "click",
    () => {

        startLogoTransition(
            () => {

                showScreen(
                    leaderboardScreen
                );

            }
        );

    }
);


/* =====================================================
   MENU -> IZUNA
===================================================== */

patButton.addEventListener(
    "click",
    () => {

        startLogoTransition(
            () => {

                showScreen(
                    izunaScreen
                );

            }
        );

    }
);


/* =====================================================
   BACK
===================================================== */

leaderboardBackButton.addEventListener(
    "click",
    () => {

        stopPetting();

        showScreen(
            menuScreen
        );

        restoreLogo();

    }
);


izunaBackButton.addEventListener(
    "click",
    () => {

        stopPetting();

        showScreen(
            menuScreen
        );

        restoreLogo();

    }
);


/* =====================================================
   LOGO TRANSITION
===================================================== */

function startLogoTransition(callback) {

    logoContainer.classList.add(
        "logo-disappear"
    );

    createSakuraBurst();

    setTimeout(
        () => {

            callback();

        },
        500
    );

}


function restoreLogo() {

    logoContainer.classList.remove(
        "logo-disappear"
    );

}


/* =====================================================
   SEASON BUTTONS
===================================================== */

seasonButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                seasonButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                currentSeason =
                    button.dataset.season;

                renderLeaderboard();

            }
        );

    }
);


/* =====================================================
   RENDER LEADERBOARD
===================================================== */

function renderLeaderboard() {

    leaderboardList.innerHTML = "";

    let data;

    if (
        currentSeason ===
        "kaiten"
    ) {

        data =
            kaitenData;

    } else {

        data =
            kuroKageData;

    }


    /*
        No Kaiten data yet.
    */

    if (
        data.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "rank-row";

        empty.style.display =
            "flex";

        empty.style.justifyContent =
            "center";

        empty.style.textAlign =
            "center";

        empty.innerHTML = `
            <div>
                <div class="rank-name">
                    KAITEN SCORE DATA
                </div>

                <div
                    style="
                    margin-top:6px;
                    color:rgba(255,190,225,.55);
                    font-size:11px;
                    letter-spacing:.12em;
                    "
                >
                    AWAITING SCORE DATA
                </div>
            </div>
        `;

        leaderboardList.appendChild(
            empty
        );

        return;

    }


    /*
        TOP 3
    */

    const topThree =
        document.createElement(
            "div"
        );

    topThree.className =
        "top-three";


    data
        .slice(0, 3)
        .forEach(
            player => {

                const card =
                    createHeroCard(
                        player
                    );

                topThree.appendChild(
                    card
                );

            }
        );


    leaderboardList.appendChild(
        topThree
    );


    /*
        #4 onward
    */

    data
        .slice(3)
        .forEach(
            player => {

                const row =
                    createRankRow(
                        player
                    );

                leaderboardList.appendChild(
                    row
                );

            }
        );

}


/* =====================================================
   HERO CARD
===================================================== */

function createHeroCard(
    player
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "hero-card";


    let decoration =
        "✦";

    if (
        player.rank === 1
    ) {

        decoration =
            "♛";

    } else if (
        player.rank === 2
    ) {

        decoration =
            "✦";

    } else if (
        player.rank === 3
    ) {

        decoration =
            "✧";

    }


    const isNA =
        player.score === "#N/A";


    card.innerHTML = `

        <div class="hero-decoration">
            ${decoration}
        </div>

        <div class="hero-rank">
            #${player.rank}
        </div>

        <div class="hero-name">
            ${escapeHTML(player.name)}

            ${
                isNA
                ?
                `
                <span
                    class="na-warning"
                    title="Ranking data unavailable"
                >
                    !
                </span>
                `
                :
                ""
            }
        </div>

        <div class="hero-score">
    ${escapeHTML(player.score)}
</div>

    `;

    return card;

}


/* =====================================================
   NORMAL RANK ROW
===================================================== */

function createRankRow(
    player
) {

    const row =
        document.createElement(
            "article"
        );

    row.className =
        "rank-row";


    const isNA =
        player.score === "#N/A";


    row.innerHTML = `

        <div class="rank-number">
            #${player.rank}
        </div>

        <div class="rank-name">

            <span class="rank-name-text">
                ${escapeHTML(player.name)}
            </span>

            ${
                isNA
                ?
                `
                <span
                    class="na-warning"
                    title="Ranking data unavailable"
                >
                    !
                </span>
                `
                :
                ""
            }

        </div>

        <div class="rank-score">
            ${escapeHTML(player.score)}
        </div>

    `;

    return row;

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   DAY / NIGHT MODE
===================================================== */

let isNight =
    false;


modeToggle.addEventListener(
    "click",
    () => {

        isNight =
            !isNight;

        document.body.classList.toggle(
            "night-mode",
            isNight
        );


        if (isNight) {

            modeIcon.textContent =
                "☾";

            modeText.textContent =
                "NIGHT";

        } else {

            modeIcon.textContent =
                "☀";

            modeText.textContent =
                "DAY";

        }

    }
);


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


/* =====================================================
   SAKURA BURST PARTICLE
===================================================== */

class SakuraParticle {

    constructor(
        x,
        y
    ) {

        this.x =
            x;

        this.y =
            y;

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random() *
            5 +
            1.5;

        this.vx =
            Math.cos(angle) *
            speed;

        this.vy =
            Math.sin(angle) *
            speed;

        this.size =
            Math.random() *
            3 +
            1;

        this.life =
            1;

        this.decay =
            Math.random() *
            0.018 +
            0.012;

        this.rotation =
            Math.random() *
            Math.PI *
            2;

        this.rotationSpeed =
            Math.random() *
            0.08 -
            0.04;

    }


    update() {

        this.x +=
            this.vx;

        this.y +=
            this.vy;

        this.vx *=
            0.985;

        this.vy *=
            0.985;

        this.vy +=
            0.025;

        this.rotation +=
            this.rotationSpeed;

        this.life -=
            this.decay;

        return (
            this.life > 0
        );

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
            this.life;

        ctx.fillStyle =
            "#ff9ed3";

        ctx.shadowBlur =
            14;

        ctx.shadowColor =
            "#ff55b5";

        /*
            Small Sakura petal
        */

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            this.size * 1.5,
            this.size,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


/* =====================================================
   SAKURA BURST
===================================================== */

function createSakuraBurst() {

    const centerX =
        width / 2;

    const centerY =
        height / 2;


    for (
        let i = 0;
        i < 150;
        i++
    ) {

        sakuraParticles.push(
            new SakuraParticle(
                centerX,
                centerY
            )
        );

    }

}


/* =====================================================
   PARTICLE LOOP
===================================================== */

function particleLoop() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
        Falling Sakura
    */

    updateSakura();


    /*
        Sakura burst ตอนเปลี่ยนหน้า
    */

    for (
        let i =
            sakuraParticles.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            sakuraParticles[i];

        if (
            !particle.update()
        ) {

            sakuraParticles.splice(
                i,
                1
            );

            continue;

        }

        particle.draw();

    }


    requestAnimationFrame(
        particleLoop
    );

}

particleLoop();


/* =====================================================
   IZUNA PETTING
===================================================== */

let pointerIsDown =
    false;

let isPetting =
    false;

let petStartTime =
    0;

let totalPetTime =
    0;

let lastPointerX =
    0;

let lastPointerY =
    0;

let lastRubTime =
    0;


/*
    Head zone.

    Relative coordinates:

    x 0.25 - 0.75
    y 0.02 - 0.58
*/

const HEAD_ZONE = {

    left: 0.25,

    right: 0.75,

    top: 0.02,

    bottom: 0.58

};


/*
    Minimum movement required
    to count as rubbing.
*/

const MIN_RUB_DISTANCE =
    1.5;


/*
    If movement stops for this
    duration, petting stops.
*/

const PET_IDLE_DELAY =
    220;


/* =====================================================
   POINTER DOWN
===================================================== */

izunaArea.addEventListener(
    "pointerdown",
    event => {

        pointerIsDown =
            true;

        lastPointerX =
            event.clientX;

        lastPointerY =
            event.clientY;

        lastRubTime =
            performance.now();

        /*
            Important:
            pointerdown alone does NOT
            start the timer.
        */

        try {

            izunaArea.setPointerCapture(
                event.pointerId
            );

        } catch (error) {
            // Ignore
        }

    }
);


/* =====================================================
   POINTER MOVE
===================================================== */

izunaArea.addEventListener(
    "pointermove",
    event => {

        if (
            !pointerIsDown
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


        /*
            No movement =
            no petting.
        */

        if (
            distance <
            MIN_RUB_DISTANCE
        ) {

            return;

        }


        const rect =
            izunaArea.getBoundingClientRect();


        const x =
            (
                event.clientX -
                rect.left
            ) /
            rect.width;


        const y =
            (
                event.clientY -
                rect.top
            ) /
            rect.height;


        const insideHead =
            x >= HEAD_ZONE.left &&
            x <= HEAD_ZONE.right &&
            y >= HEAD_ZONE.top &&
            y <= HEAD_ZONE.bottom;


        if (
            insideHead
        ) {

            if (
                !isPetting
            ) {

                startPetting();

            }

            lastRubTime =
                performance.now();

        } else {

            /*
                Moving outside head
                stops the current pet.
            */

            stopPetting();

        }

    }
);


/* =====================================================
   POINTER UP / CANCEL
===================================================== */

izunaArea.addEventListener(
    "pointerup",
    () => {

        pointerIsDown =
            false;

        stopPetting();

    }
);


izunaArea.addEventListener(
    "pointercancel",
    () => {

        pointerIsDown =
            false;

        stopPetting();

    }
);


izunaArea.addEventListener(
    "lostpointercapture",
    () => {

        pointerIsDown =
            false;

        stopPetting();

    }
);


/* =====================================================
   START PETTING
===================================================== */

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

    lastRubTime =
        performance.now();

    izunaArea.classList.add(
        "petting"
    );

    petInstruction.textContent =
        "PETTING IZUNA ♥";

}


/* =====================================================
   STOP PETTING
===================================================== */

function stopPetting() {

    if (
        !isPetting
    ) {

        return;

    }


    const now =
        performance.now();


    totalPetTime +=
        now -
        petStartTime;


    isPetting =
        false;


    izunaArea.classList.remove(
        "petting"
    );

    petInstruction.textContent =
        "RUB IZUNA'S HEAD";

}


/* =====================================================
   PET TIMER
===================================================== */

function updatePetTimer() {

    /*
        Automatically stop if
        rubbing becomes idle.
    */

    if (
        isPetting
    ) {

        const now =
            performance.now();

        if (
            now -
            lastRubTime >
            PET_IDLE_DELAY
        ) {

            stopPetting();

        }

    }


    let displayedTime =
        totalPetTime;


    if (
        isPetting
    ) {

        displayedTime +=
            performance.now() -
            petStartTime;

    }


    petSeconds.textContent =
        (
            displayedTime /
            1000
        ).toFixed(1);


    requestAnimationFrame(
        updatePetTimer
    );

}


updatePetTimer();


/* =====================================================
   DISABLE IMAGE DRAGGING
===================================================== */

[
    izunaStatic,
    izunaPet,
    mainLogo
].forEach(
    image => {

        if (!image) {
            return;
        }

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    }
);


/* =====================================================
   INITIAL RENDER
===================================================== */

renderLeaderboard();
