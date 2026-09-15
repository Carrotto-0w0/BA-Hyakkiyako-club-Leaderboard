/* =========================================================
   HYAKKIYAKO CLUB
   Particle + Logo Dissolve + Leaderboard Transition
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

const logo = document.getElementById("logo");
const logoContainer = document.getElementById("logoContainer");

const viewButton = document.getElementById("viewButton");

const leaderboardScreen =
    document.getElementById("leaderboardScreen");

const backButton =
    document.getElementById("backButton");


/* =========================================================
   CANVAS
========================================================= */

let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================================================
   PARTICLE ARRAYS
========================================================= */

const bottomParticles = [];
const ambientParticles = [];
const logoParticles = [];


/* =========================================================
   BOTTOM PARTICLE
   Particle สีฟ้าลอยขึ้นจากด้านล่าง
========================================================= */

class BottomParticle {

    constructor() {

        this.reset(true);

    }


    reset(firstSpawn = false) {

        /*
         * กระจายตามแนวนอน
         */

        this.x =
            Math.random() * width;


        /*
         * ตอนเริ่มเว็บ
         * ให้ Particle อยู่ในช่วงล่างของจอ
         * เพื่อให้เห็นทันที
         */

        if (firstSpawn) {

            this.y =
                height -
                Math.random() *
                height *
                0.42;

        } else {

            this.y =
                height + 20;

        }


        /*
         * ขนาด Particle
         */

        const sizeRandom =
            Math.random();

        if (sizeRandom < 0.65) {

            this.size =
                Math.random() * 1.5 + 0.6;

        }
        else if (sizeRandom < 0.9) {

            this.size =
                Math.random() * 2.2 + 1.2;

        }
        else {

            this.size =
                Math.random() * 2.8 + 2;

        }


        /*
         * ความเร็วลอยขึ้น
         */

        this.speed =
            Math.random() * 0.8 + 0.35;


        /*
         * ความสว่าง
         */

        this.opacity =
            Math.random() * 0.6 + 0.3;


        /*
         * การส่าย
         */

        this.wave =
            Math.random() *
            Math.PI *
            2;

        this.waveSpeed =
            Math.random() * 0.025 + 0.008;

        this.waveAmount =
            Math.random() * 1.2 + 0.3;


        /*
         * การกระพริบ
         */

        this.twinkle =
            Math.random() *
            Math.PI *
            2;

        this.twinkleSpeed =
            Math.random() * 0.045 + 0.015;

    }


    update() {

        /*
         * ลอยขึ้น
         */

        this.y -= this.speed;


        /*
         * ส่ายซ้าย-ขวา
         */

        this.wave += this.waveSpeed;

        this.x +=
            Math.sin(this.wave) *
            this.waveAmount;


        /*
         * กระพริบเล็กน้อย
         */

        this.twinkle += this.twinkleSpeed;


        /*
         * ถ้าหลุดด้านบน
         * ให้เกิดใหม่ด้านล่าง
         */

        if (this.y < -30) {

            this.reset(false);

        }

    }


    draw() {

        const pulse =
            0.75 +
            Math.sin(this.twinkle) * 0.25;


        ctx.save();


        ctx.globalAlpha =
            this.opacity * pulse;


        /*
         * สี Particle
         */

        ctx.fillStyle =
            "#20DFFF";


        /*
         * Glow
         */

        ctx.shadowColor =
            "#00BFFF";


        if (this.size >= 2.5) {

            ctx.shadowBlur = 20;

        } else {

            ctx.shadowBlur = 11;

        }


        /*
         * วาดจุด
         */

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


/* =========================================================
   CREATE BOTTOM PARTICLES
========================================================= */

/*
 * เพิ่มเป็น 150 เม็ด
 */

for (let i = 0; i < 150; i++) {

    bottomParticles.push(
        new BottomParticle()
    );

}


/* =========================================================
   AMBIENT PARTICLE
   Particle เล็ก ๆ ทั่วหน้าจอ
========================================================= */

class AmbientParticle {

    constructor() {

        this.reset();

    }


    reset() {

        this.x =
            Math.random() * width;

        this.y =
            Math.random() * height;


        this.size =
            Math.random() * 1.2 + 0.3;


        this.speed =
            Math.random() * 0.25 + 0.08;


        this.opacity =
            Math.random() * 0.3 + 0.08;


        this.wave =
            Math.random() *
            Math.PI *
            2;

        this.waveSpeed =
            Math.random() * 0.015 + 0.005;

        this.waveAmount =
            Math.random() * 0.5 + 0.1;

    }


    update() {

        this.y -= this.speed;


        this.wave += this.waveSpeed;


        this.x +=
            Math.sin(this.wave) *
            this.waveAmount;


        if (this.y < -20) {

            this.y =
                height + 20;

            this.x =
                Math.random() * width;

        }

    }


    draw() {

        ctx.save();

        ctx.globalAlpha =
            this.opacity;

        ctx.fillStyle =
            "#18CFFF";

        ctx.shadowColor =
            "#00BFFF";

        ctx.shadowBlur = 7;


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


/* =========================================================
   CREATE AMBIENT PARTICLES
========================================================= */

for (let i = 0; i < 70; i++) {

    ambientParticles.push(
        new AmbientParticle()
    );

}


/* =========================================================
   LOGO DISSOLVE PARTICLE
========================================================= */

class LogoParticle {

    constructor(x, y) {

        this.x = x;
        this.y = y;


        /*
         * สุ่มทิศทาง
         */

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() * 3.2 + 0.7;


        this.vx =
            Math.cos(angle) * speed;


        this.vy =
            Math.sin(angle) * speed;


        /*
         * ให้บางส่วนลอยขึ้น
         */

        this.vy -=
            Math.random() * 1.3;


        this.size =
            Math.random() * 2 + 0.5;


        /*
         * อายุ Particle
         */

        this.life = 1;


        this.decay =
            Math.random() * 0.018 + 0.006;


        /*
         * การส่าย
         */

        this.wave =
            Math.random() *
            Math.PI *
            2;

        this.waveSpeed =
            Math.random() * 0.07 + 0.02;

    }


    update() {

        this.wave +=
            this.waveSpeed;


        /*
         * เคลื่อนที่
         */

        this.x += this.vx;

        this.y += this.vy;


        /*
         * ค่อย ๆ ช้าลง
         */

        this.vx *= 0.985;

        this.vy *= 0.985;


        /*
         * ส่ายเล็กน้อย
         */

        this.x +=
            Math.sin(this.wave) * 0.3;


        /*
         * Fade out
         */

        this.life -=
            this.decay;


        return this.life > 0;

    }


    draw() {

        ctx.save();


        ctx.globalAlpha =
            this.life;


        ctx.fillStyle =
            "#35E6FF";


        ctx.shadowColor =
            "#00BFFF";


        ctx.shadowBlur = 14;


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


/* =========================================================
   CREATE PARTICLES FROM LOGO
========================================================= */

function createLogoParticles() {

    logoParticles.length = 0;


    /*
     * ตรวจสอบว่า PNG โหลดแล้วหรือไม่
     */

    if (
        !logo.complete ||
        logo.naturalWidth === 0
    ) {

        createFallbackLogoParticles();

        return;

    }


    /*
     * สร้าง Canvas ชั่วคราว
     */

    const tempCanvas =
        document.createElement("canvas");

    const tempCtx =
        tempCanvas.getContext("2d");


    /*
     * ตำแหน่ง Logo บนหน้าจอ
     */

    const rect =
        logo.getBoundingClientRect();


    const logoWidth =
        Math.floor(rect.width);


    const ratio =
        logo.naturalHeight /
        logo.naturalWidth;


    const logoHeight =
        Math.floor(
            logoWidth * ratio
        );


    tempCanvas.width =
        logoWidth;

    tempCanvas.height =
        logoHeight;


    /*
     * วาด Logo ลง Canvas
     */

    tempCtx.drawImage(
        logo,
        0,
        0,
        logoWidth,
        logoHeight
    );


    /*
     * อ่าน Pixel
     */

    const pixels =
        tempCtx.getImageData(
            0,
            0,
            logoWidth,
            logoHeight
        ).data;


    /*
     * ระยะห่างของ Particle
     *
     * 5 = รายละเอียดสูง
     */

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
                    y * logoWidth +
                    x
                ) * 4;


            const alpha =
                pixels[index + 3];


            /*
             * เฉพาะ Pixel ที่มีภาพ
             */

            if (
                alpha > 80 &&
                Math.random() > 0.18
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


    /*
     * หากไม่มี Particle
     */

    if (
        logoParticles.length === 0
    ) {

        createFallbackLogoParticles();

    }

}


/* =========================================================
   FALLBACK LOGO PARTICLES
========================================================= */

function createFallbackLogoParticles() {

    const rect =
        logo.getBoundingClientRect();


    for (
        let i = 0;
        i < 450;
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


/* =========================================================
   TRANSITION BURST
========================================================= */

function createBurst() {

    const centerX =
        width / 2;

    const centerY =
        height / 2;


    /*
     * Burst เพิ่มเติม
     */

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        logoParticles.push(

            new LogoParticle(
                centerX,
                centerY
            )

        );

    }

}


/* =========================================================
   TRANSITION STATE
========================================================= */

let isTransitioning = false;


/* =========================================================
   VIEW BUTTON
========================================================= */

viewButton.addEventListener(
    "click",
    startTransition
);


/* =========================================================
   START TRANSITION
========================================================= */

function startTransition() {

    if (isTransitioning) {

        return;

    }


    isTransitioning = true;


    /*
     * ปิดปุ่ม
     */

    viewButton.style.opacity = "0";

    viewButton.style.pointerEvents =
        "none";


    /*
     * สร้าง Particle จาก Logo
     */

    createLogoParticles();


    /*
     * เริ่มสลาย Logo
     */

    setTimeout(() => {

        logoContainer.style.opacity =
            "0";


        logoContainer.style.transform =
            "scale(1.06)";


        logoContainer.style.filter =
            "blur(5px)";

    }, 50);


    /*
     * เพิ่ม Burst
     */

    setTimeout(() => {

        createBurst();

    }, 250);


    /*
     * เปิด Leaderboard
     */

    setTimeout(() => {

        leaderboardScreen.classList.add(
            "active"
        );

    }, 900);

}


/* =========================================================
   BACK BUTTON
========================================================= */

backButton.addEventListener(
    "click",
    goBack
);


function goBack() {

    /*
     * ปิด Leaderboard
     */

    leaderboardScreen.classList.remove(
        "active"
    );


    /*
     * รอให้หน้าจอ Fade
     */

    setTimeout(() => {


        /*
         * Logo กลับมา
         */

        logoContainer.style.opacity =
            "1";


        logoContainer.style.transform =
            "scale(1)";


        logoContainer.style.filter =
            "none";


        /*
         * ปุ่มกลับมา
         */

        viewButton.style.opacity =
            "1";


        viewButton.style.pointerEvents =
            "auto";


        /*
         * ล้าง Logo Particle
         */

        logoParticles.length = 0;


        isTransitioning = false;


    }, 700);

}


/* =========================================================
   MAIN ANIMATION LOOP
========================================================= */

function animate() {


    /*
     * Clear Canvas
     */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* -----------------------------------------------
       AMBIENT PARTICLES
    ------------------------------------------------ */

    for (
        const particle
        of ambientParticles
    ) {

        particle.update();

        particle.draw();

    }


    /* -----------------------------------------------
       BOTTOM PARTICLES
    ------------------------------------------------ */

    for (
        const particle
        of bottomParticles
    ) {

        particle.update();

        particle.draw();

    }


    /* -----------------------------------------------
       LOGO DISSOLVE
    ------------------------------------------------ */

    for (
        let i =
            logoParticles.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            logoParticles[i];


        const alive =
            particle.update();


        if (alive) {

            particle.draw();

        }
        else {

            logoParticles.splice(
                i,
                1
            );

        }

    }


    /*
     * Next frame
     */

    requestAnimationFrame(
        animate
    );

}


/* =========================================================
   START
========================================================= */

animate();
