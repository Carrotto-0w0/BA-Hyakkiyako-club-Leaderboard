/* =====================================================
   HYAKKIYAKO CLUB
   MAIN SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");


const menuScreen =
    document.getElementById("menuScreen");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const izunaScreen =
    document.getElementById("izunaScreen");


const logo =
    document.getElementById("logo");

const logoContainer =
    document.getElementById("logoContainer");


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


const ta85Button =
    document.getElementById("ta85Button");

const ga33Button =
    document.getElementById("ga33Button");


const leaderboardContent =
    document.getElementById("leaderboardContent");


const izunaArea =
    document.getElementById("izunaArea");

const izunaStatic =
    document.getElementById("izunaStatic");

const izunaPet =
    document.getElementById("izunaPet");

const petSeconds =
    document.getElementById("petSeconds");


/* =====================================================
   CANVAS SIZE
===================================================== */

let width = 0;
let height = 0;


function resizeCanvas() {

    width = window.innerWidth;

    height = window.innerHeight;

    canvas.width = width;

    canvas.height = height;
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================================
   PARTICLE ARRAYS
===================================================== */

const fallingPetals = [];

const logoParticles = [];

const burstParticles = [];


/* =====================================================
   FALLING SAKURA PETAL
   กลีบเดี่ยวเท่านั้น
===================================================== */

class FallingPetal {

    constructor() {
        this.reset(true);
    }


    reset(first = false) {

        this.x =
            Math.random() * width;

        this.y =
            first
                ? Math.random() * height
                : -30 - Math.random() * 100;

        this.size =
            Math.random() * 5 + 4;

        this.speed =
            Math.random() * 0.75 + 0.45;

        this.wave =
            Math.random() *
            Math.PI *
            2;

        this.waveSpeed =
            Math.random() * 0.018 + 0.008;

        this.waveAmount =
            Math.random() * 1.1 + 0.45;

        this.rotation =
            Math.random() *
            Math.PI *
            2;

        this.rotationSpeed =
            Math.random() * 0.025 - 0.0125;

        this.alpha =
            Math.random() * 0.35 + 0.45;
    }


    update() {

        this.y += this.speed;

        this.wave += this.waveSpeed;

        this.x +=
            Math.sin(this.wave) *
            this.waveAmount;

        this.rotation +=
            this.rotationSpeed;


        if (
            this.y >
            height + 30
        ) {
            this.reset();
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
            "#ff9dcc";


        ctx.shadowBlur =
            6;


        ctx.shadowColor =
            "#ff69b4";


        const s =
            this.size;


        /*
            Sakura petal เดี่ยว
        */

        ctx.beginPath();


        ctx.moveTo(
            0,
            -s
        );


        ctx.bezierCurveTo(
            s * 0.75,
            -s * 0.8,

            s * 0.95,
            s * 0.15,

            s * 0.35,
            s * 0.75
        );


        ctx.bezierCurveTo(
            0,
            s * 1.05,

            -s * 0.65,
            s * 0.75,

            -s * 0.45,
            0
        );


        ctx.bezierCurveTo(
            -s * 0.55,
            -s * 0.55,

            -s * 0.25,
            -s * 0.9,

            0,
            -s
        );


        ctx.closePath();

        ctx.fill();


        ctx.restore();
    }
}


/* =====================================================
   CREATE FALLING PETALS
===================================================== */

for (
    let i = 0;
    i < 45;
    i++
) {

    fallingPetals.push(
        new FallingPetal()
    );
}


/* =====================================================
   LOGO DISSOLVE PARTICLE
===================================================== */

class LogoParticle {

    constructor(
        x,
        y
    ) {

        this.x = x;

        this.y = y;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            3.5 +
            0.8;


        this.vx =
            Math.cos(angle) *
            speed;


        this.vy =
            Math.sin(angle) *
            speed;


        this.vy -=
            Math.random() *
            1.4;


        this.size =
            Math.random() *
            2 +
            0.6;


        this.life = 1;


        this.decay =
            Math.random() *
            0.018 +
            0.006;


        this.wave =
            Math.random() *
            Math.PI *
            2;


        this.waveSpeed =
            Math.random() *
            0.08 +
            0.02;
    }


    update() {

        this.wave +=
            this.waveSpeed;


        this.x +=
            this.vx;


        this.y +=
            this.vy;


        this.vx *=
            0.985;


        this.vy *=
            0.985;


        this.x +=
            Math.sin(
                this.wave
            ) *
            0.35;


        this.life -=
            this.decay;


        return (
            this.life > 0
        );
    }


    draw() {

        ctx.save();


        ctx.globalAlpha =
            this.life;


        ctx.fillStyle =
            "#ffb0d8";


        ctx.shadowBlur =
            12;


        ctx.shadowColor =
            "#ff69b4";


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


/* =====================================================
   CREATE LOGO DISSOLVE
===================================================== */

function createLogoParticles() {

    logoParticles.length = 0;


    if (
        !logo.complete ||
        logo.naturalWidth === 0
    ) {

        createFallbackLogoParticles();

        return;
    }


    const rect =
        logo.getBoundingClientRect();


    const tempCanvas =
        document.createElement("canvas");


    const tempCtx =
        tempCanvas.getContext("2d");


    const logoWidth =
        Math.max(
            1,
            Math.floor(rect.width)
        );


    const ratio =
        logo.naturalHeight /
        logo.naturalWidth;


    const logoHeight =
        Math.max(
            1,
            Math.floor(
                logoWidth * ratio
            )
        );


    tempCanvas.width =
        logoWidth;


    tempCanvas.height =
        logoHeight;


    tempCtx.drawImage(
        logo,
        0,
        0,
        logoWidth,
        logoHeight
    );


    const pixels =
        tempCtx.getImageData(
            0,
            0,
            logoWidth,
            logoHeight
        ).data;


    const sample = 5;


    for (
        let y = 0;
        y < logoHeight;
        y += sample
    ) {

        for (
            let x = 0;
            x < logoWidth;
            x += sample
        ) {

            const index =
                (
                    y *
                    logoWidth +
                    x
                ) * 4;


            const alpha =
                pixels[index + 3];


            if (
                alpha > 80 &&
                Math.random() > 0.2
            ) {

                logoParticles.push(
                    new LogoParticle(
                        rect.left + x,
                        rect.top + y
                    )
                );
            }
        }
    }


    if (
        logoParticles.length === 0
    ) {

        createFallbackLogoParticles();
    }
}


/* =====================================================
   FALLBACK LOGO PARTICLES
===================================================== */

function createFallbackLogoParticles() {

    const rect =
        logo.getBoundingClientRect();


    for (
        let i = 0;
        i < 300;
        i++
    ) {

        const x =
            rect.left +
            Math.random() *
            rect.width;


        const y =
            rect.top +
            Math.random() *
            rect.height;


        logoParticles.push(
            new LogoParticle(
                x,
                y
            )
        );
    }
}


/* =====================================================
   SAKURA BURST
   จุดกำเนิด = กึ่งกลาง Logo จริง
===================================================== */

class BurstPetal {

    constructor(
        x,
        y
    ) {

        this.x = x;

        this.y = y;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const force =
            Math.random() *
            5 +
            2;


        this.vx =
            Math.cos(angle) *
            force;


        this.vy =
            Math.sin(angle) *
            force;


        this.size =
            Math.random() *
            5 +
            3;


        this.rotation =
            Math.random() *
            Math.PI *
            2;


        this.rotationSpeed =
            Math.random() *
            0.08 -
            0.04;


        this.life =
            Math.random() *
            35 +
            40;
    }


    update() {

        this.x += this.vx;

        this.y += this.vy;


        this.vx *= 0.985;

        this.vy *= 0.985;


        this.vy += 0.025;


        this.rotation +=
            this.rotationSpeed;


        this.life -= 1;


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
            Math.max(
                0,
                this.life / 75
            );


        ctx.fillStyle =
            "#ff9dcc";


        ctx.shadowBlur =
            9;


        ctx.shadowColor =
            "#ff69b4";


        const s =
            this.size;


        ctx.beginPath();


        ctx.moveTo(
            0,
            -s
        );


        ctx.bezierCurveTo(
            s * 0.75,
            -s * 0.8,

            s * 0.95,
            s * 0.15,

            s * 0.35,
            s * 0.75
        );


        ctx.bezierCurveTo(
            0,
            s * 1.05,

            -s * 0.65,
            s * 0.75,

            -s * 0.45,
            0
        );


        ctx.bezierCurveTo(
            -s * 0.55,
            -s * 0.55,

            -s * 0.25,
            -s * 0.9,

            0,
            -s
        );


        ctx.closePath();

        ctx.fill();


        ctx.restore();
    }
}


/* =====================================================
   CREATE BURST FROM LOGO
===================================================== */

function createBurst() {

    burstParticles.length = 0;


    const rect =
        logo.getBoundingClientRect();


    /*
        Canvas เป็น fixed 100vw x 100vh
        ดังนั้นตำแหน่ง Logo ใช้กับ Canvas ได้ตรง ๆ
    */

    const burstX =
        rect.left +
        rect.width / 2;


    const burstY =
        rect.top +
        rect.height / 2;


    for (
        let i = 0;
        i < 150;
        i++
    ) {

        burstParticles.push(
            new BurstPetal(
                burstX,
                burstY
            )
        );
    }
}


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(
    screen
) {

    menuScreen.classList.remove(
        "active"
    );

    leaderboardScreen.classList.remove(
        "active"
    );

    izunaScreen.classList.remove(
        "active"
    );


    screen.classList.add(
        "active"
    );
}


/* =====================================================
   INITIAL MENU
===================================================== */

menuScreen.classList.add(
    "active"
);


/* =====================================================
   DAY / NIGHT
===================================================== */

let isNight = false;


modeToggle.addEventListener(
    "click",
    () => {

        isNight =
            !isNight;


        document.body.classList.toggle(
            "night-mode",
            isNight
        );


        modeIcon.style.opacity =
            "0";


        modeText.style.opacity =
            "0";


        setTimeout(
            () => {

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


                modeIcon.style.opacity =
                    "1";


                modeText.style.opacity =
                    "1";

            },
            180
        );

    }
);


/* =====================================================
   TRANSITION STATE
===================================================== */

let isTransitioning = false;


/* =====================================================
   GO TO LEADERBOARD
===================================================== */

function openLeaderboard() {

    if (
        isTransitioning
    ) {

        return;
    }


    isTransitioning = true;


    const menuButtons =
        document.getElementById(
            "menuButtons"
        );


    menuButtons.style.opacity =
        "0";


    menuButtons.style.pointerEvents =
        "none";


    /*
        สร้าง Logo dissolve
    */

    createLogoParticles();


    /*
        Sakura burst
        เริ่มจากตำแหน่ง Logo จริง
    */

    setTimeout(
        () => {

            createBurst();

        },
        180
    );


    /*
        Fade Logo
    */

    setTimeout(
        () => {

            logoContainer.style.opacity =
                "0";


            logoContainer.style.transform =
                "scale(1.06)";


            logoContainer.style.filter =
                "blur(6px)";

        },
        50
    );


    /*
        เปิด Leaderboard
    */

    setTimeout(
        () => {

            showScreen(
                leaderboardScreen
            );

        },
        900
    );


    setTimeout(
        () => {

            isTransitioning =
                false;

        },
        1200
    );
}


/* =====================================================
   GO TO IZUNA
===================================================== */

function openIzuna() {

    showScreen(
        izunaScreen
    );
}


/* =====================================================
   BACK TO MENU
===================================================== */

function goBackToMenu() {

    leaderboardScreen.classList.remove(
        "active"
    );


    izunaScreen.classList.remove(
        "active"
    );


    setTimeout(
        () => {

            menuScreen.classList.add(
                "active"
            );


            logoContainer.style.opacity =
                "1";


            logoContainer.style.transform =
                "scale(1)";


            logoContainer.style.filter =
                "none";


            const menuButtons =
                document.getElementById(
                    "menuButtons"
                );


            menuButtons.style.opacity =
                "1";


            menuButtons.style.pointerEvents =
                "auto";


            logoParticles.length =
                0;


            burstParticles.length =
                0;


            isTransitioning =
                false;

        },
        300
    );
}


/* =====================================================
   BUTTON EVENTS
===================================================== */

leaderboardButton.addEventListener(
    "click",
    openLeaderboard
);


patButton.addEventListener(
    "click",
    openIzuna
);


leaderboardBackButton.addEventListener(
    "click",
    goBackToMenu
);


izunaBackButton.addEventListener(
    "click",
    goBackToMenu
);


/* =====================================================
   LEADERBOARD DATA
===================================================== */

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
   RANK NAME
===================================================== */

function rankNameHTML(
    player
) {

    const name =
        escapeHTML(
            player.name
        );


    if (
        player.score === "#N/A"
    ) {

        return `

            <span>
                ${name}
            </span>

            <span
                class="rank-warning"
                title="RANKING DATA UNAVAILABLE"
            >
                !
            </span>

        `;
    }


    return name;
}


/* =====================================================
   HERO CARD
===================================================== */

function createHeroCard(
    player
) {

    const isNA =
        player.score === "#N/A";


    let crown = "";


    if (
        player.rank === 1
    ) {

        crown =
            `<div class="hero-crown">♛</div>`;
    }


    return `

        <div class="hero-card">

            ${crown}

            <div class="hero-rank">
                #${player.rank}
            </div>

            <div class="hero-name">
                ${rankNameHTML(player)}
            </div>

            <div
                class="hero-score ${isNA ? "hero-na" : ""}"
            >
                ${escapeHTML(player.score)}
            </div>

        </div>

    `;
}


/* =====================================================
   NORMAL ROW
===================================================== */

function createRankRow(
    player
) {

    return `

        <div class="rank-row">

            <div class="rank-number">
                #${player.rank}
            </div>

            <div class="rank-name">
                ${rankNameHTML(player)}
            </div>

            <div class="rank-score">
                ${escapeHTML(player.score)}
            </div>

        </div>

    `;
}


/* =====================================================
   RENDER KUROKAGE
===================================================== */

function renderKurokage() {

    const topThree =
        kuroKageData.slice(
            0,
            3
        );


    const remaining =
        kuroKageData.slice(
            3
        );


    leaderboardContent.innerHTML = `

        <div class="hero-rankings">

            ${topThree
                .map(
                    createHeroCard
                )
                .join("")}

        </div>


        <div class="ranking-list">

            ${remaining
                .map(
                    createRankRow
                )
                .join("")}

        </div>

    `;
}


/* =====================================================
   RENDER TA85
===================================================== */

function renderTA85() {

    leaderboardContent.innerHTML = `

        <div class="wip-panel">

            <div class="wip-title">
                TA85 / KAITEN
            </div>

            <div class="wip-text">
                RANKING DATA WILL APPEAR HERE
            </div>

        </div>

    `;
}


/* =====================================================
   BOSS BUTTONS
===================================================== */

function activateBoss(
    activeButton
) {

    ta85Button.classList.remove(
        "active"
    );

    ga33Button.classList.remove(
        "active"
    );


    activeButton.classList.add(
        "active"
    );
}


ta85Button.addEventListener(
    "click",
    () => {

        activateBoss(
            ta85Button
        );

        renderTA85();

    }
);


ga33Button.addEventListener(
    "click",
    () => {

        activateBoss(
            ga33Button
        );

        renderKurokage();

    }
);


/* =====================================================
   INITIAL LEADERBOARD
===================================================== */

renderKurokage();


/* =====================================================
   IZUNA PET SYSTEM
===================================================== */

let petStartTime =
    null;

let totalPetTime =
    0;

let isPetting =
    false;

let lastPointerX =
    0;

let lastPointerY =
    0;

let lastRubTime =
    0;


const HEAD_ZONE = {

    left: 0.25,

    right: 0.75,

    top: 0.02,

    bottom: 0.58

};


const MIN_RUB_DISTANCE =
    1.5;


const PET_IDLE_DELAY =
    220;


/* =====================================================
   CHECK HEAD
===================================================== */

function isPointerOnHead(
    event
) {

    const rect =
        izunaArea.getBoundingClientRect();


    const x =
        (event.clientX - rect.left)
        / rect.width;


    const y =
        (event.clientY - rect.top)
        / rect.height;


    return (

        x >= HEAD_ZONE.left &&

        x <= HEAD_ZONE.right &&

        y >= HEAD_ZONE.top &&

        y <= HEAD_ZONE.bottom

    );
}


/* =====================================================
   START PET
===================================================== */

function startPetting(
    event
) {

    if (
        !isPointerOnHead(event)
    ) {

        return;
    }


    isPetting =
        true;


    if (
        petStartTime === null
    ) {

        petStartTime =
            performance.now();
    }


    lastPointerX =
        event.clientX;


    lastPointerY =
        event.clientY;


    lastRubTime =
        performance.now();


    izunaArea.classList.add(
        "petting"
    );
}


/* =====================================================
   UPDATE PET
===================================================== */

function updatePetting(
    event
) {

    if (
        !isPetting
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
        distance >=
        MIN_RUB_DISTANCE
    ) {

        lastRubTime =
            performance.now();
    }
}


/* =====================================================
   STOP PET
===================================================== */

function stopPetting() {

    if (
        !isPetting
    ) {

        return;
    }


    if (
        petStartTime !== null
    ) {

        totalPetTime +=
            performance.now() -
            petStartTime;
    }


    petStartTime =
        null;


    isPetting =
        false;


    izunaArea.classList.remove(
        "petting"
    );
}


/* =====================================================
   POINTER EVENTS
===================================================== */

izunaArea.addEventListener(
    "pointerdown",
    startPetting
);


izunaArea.addEventListener(
    "pointermove",
    updatePetting
);


izunaArea.addEventListener(
    "pointerup",
    stopPetting
);


izunaArea.addEventListener(
    "pointercancel",
    stopPetting
);


izunaArea.addEventListener(
    "pointerleave",
    stopPetting
);


/* =====================================================
   PET TIMER
===================================================== */

function updatePetTimer() {

    let current =
        totalPetTime;


    if (
        petStartTime !== null &&
        isPetting
    ) {

        current +=
            performance.now() -
            petStartTime;
    }


    const seconds =
        current / 1000;


    petSeconds.textContent =
        seconds.toFixed(1);


    requestAnimationFrame(
        updatePetTimer
    );
}


updatePetTimer();


/* =====================================================
   MAIN ANIMATION
===================================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
        Falling Sakura

        สำคัญ:
        ทำงานทุก frame ตลอดเวลา
    */

    for (
        const petal
        of fallingPetals
    ) {

        petal.update();

        petal.draw();
    }


    /*
        Logo dissolve
    */

    for (
        let i =
            logoParticles.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            logoParticles[i];


        if (
            particle.update()
        ) {

            particle.draw();

        } else {

            logoParticles.splice(
                i,
                1
            );
        }
    }


    /*
        Sakura burst
    */

    for (
        let i =
            burstParticles.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            burstParticles[i];


        if (
            particle.update()
        ) {

            particle.draw();

        } else {

            burstParticles.splice(
                i,
                1
            );
        }
    }


    requestAnimationFrame(
        animate
    );
}


animate();
