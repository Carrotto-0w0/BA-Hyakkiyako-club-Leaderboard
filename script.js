/* =========================================================
   HYAKKIYAKO CLUB
   PARTICLE + TRANSITION SYSTEM
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");


const logo =
    document.getElementById("logo");


const logoContainer =
    document.getElementById("logoContainer");


const viewButton =
    document.getElementById("viewButton");


const leaderboardScreen =
    document.getElementById("leaderboardScreen");


const backButton =
    document.getElementById("backButton");


/* =========================================================
   CANVAS SIZE
========================================================= */

let width =
    window.innerWidth;

let height =
    window.innerHeight;


function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;


    canvas.width =
        width;

    canvas.height =
        height;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   BOTTOM PARTICLES
========================================================= */

const bottomParticles = [];


/* =========================================================
   LOGO PARTICLES
========================================================= */

const logoParticles = [];


/* =========================================================
   BOTTOM PARTICLE CLASS
========================================================= */

class BottomParticle {


    constructor() {

        this.reset(true);

    }


    reset(firstSpawn = false) {


        /*
         * แนวนอน
         */

        this.x =
            Math.random() * width;


        /*
         * จำกัด Particle
         * ให้อยู่ด้านล่าง
         */

        if (firstSpawn) {

            this.y =

                height -
                Math.random()
                * height
                * 0.32;

        }
        else {

            this.y =
                height + 15;

        }


        /*
         * ขนาด
         */

        this.size =

            Math.random()
            * 1.5
            + 0.6;


        /*
         * ความเร็ว
         */

        this.speed =

            Math.random()
            * 0.45
            + 0.18;


        /*
         * ความโปร่งใส
         *
         * ลด Intense ลง
         */

        this.opacity =

            Math.random()
            * 0.32
            + 0.16;


        /*
         * Wave
         */

        this.wave =

            Math.random()
            * Math.PI
            * 2;


        this.waveSpeed =

            Math.random()
            * 0.018
            + 0.006;


        this.waveAmount =

            Math.random()
            * 0.7
            + 0.2;


        /*
         * Twinkle
         */

        this.twinkle =

            Math.random()
            * Math.PI
            * 2;


        this.twinkleSpeed =

            Math.random()
            * 0.025
            + 0.008;

    }


    update() {


        /*
         * ลอยขึ้น
         */

        this.y -=
            this.speed;


        /*
         * Wave ซ้ายขวา
         */

        this.wave +=
            this.waveSpeed;


        this.x +=

            Math.sin(this.wave)
            * this.waveAmount;


        /*
         * กระพริบ
         */

        this.twinkle +=
            this.twinkleSpeed;


        /*
         * จุดบนสุดของ Particle
         *
         * 60% ของจอ
         *
         * ทำให้ Particle
         * ไม่ลอยไปทับ Logo
         */

        const upperLimit =
            height * 0.60;


        /*
         * เมื่อเข้าเขต Logo
         * ให้ค่อย ๆ จาง
         */

        if (this.y < upperLimit) {

            this.opacity -= 0.025;

        }


        /*
         * ถ้าขึ้นสูงเกินไป
         * หรือจางหมด
         * ให้เกิดใหม่ด้านล่าง
         */

        if (
            this.y < upperLimit - 30 ||
            this.opacity <= 0
        ) {

            this.reset(false);

        }

    }


    draw() {


        const pulse =

            0.82 +
            Math.sin(this.twinkle)
            * 0.18;


        ctx.save();


        ctx.globalAlpha =

            this.opacity
            * pulse;


        ctx.fillStyle =
            "#20DFFF";


        /*
         * Glow แบบเบาลง
         */

        ctx.shadowColor =
            "#00BFFF";


        ctx.shadowBlur =
            this.size > 1.7
                ? 9
                : 5;


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
 * ลดจาก 150
 * เหลือ 95
 */

for (
    let i = 0;
    i < 95;
    i++
) {

    bottomParticles.push(

        new BottomParticle()

    );

}


/* =========================================================
   LOGO PARTICLE CLASS
========================================================= */

class LogoParticle {


    constructor(x, y) {


        this.x =
            x;

        this.y =
            y;


        const angle =

            Math.random()
            * Math.PI
            * 2;


        const speed =

            Math.random()
            * 2.7
            + 0.5;


        this.vx =

            Math.cos(angle)
            * speed;


        this.vy =

            Math.sin(angle)
            * speed;


        /*
         * ให้บางส่วนลอยขึ้น
         */

        this.vy -=

            Math.random()
            * 1.0;


        this.size =

            Math.random()
            * 1.8
            + 0.5;


        this.life = 1;


        this.decay =

            Math.random()
            * 0.018
            + 0.007;


        this.wave =

            Math.random()
            * Math.PI
            * 2;

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


        this.wave +=
            0.04;


        this.x +=

            Math.sin(this.wave)
            * 0.25;


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


        ctx.shadowBlur =
            10;


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
   CREATE LOGO PARTICLES
========================================================= */

function createLogoParticles() {


    logoParticles.length =
        0;


    /*
     * ถ้า Logo ยังโหลดไม่เสร็จ
     */

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
        document.createElement(
            "canvas"
        );


    const tempCtx =
        tempCanvas.getContext(
            "2d"
        );


    const logoWidth =
        Math.floor(
            rect.width
        );


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


    /*
     * Particle density
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
                    y *
                    logoWidth +
                    x
                ) * 4;


            const alpha =

                pixels[
                    index + 3
                ];


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

}


/* =========================================================
   FALLBACK LOGO PARTICLES
========================================================= */

function createFallbackLogoParticles() {


    const rect =
        logo.getBoundingClientRect();


    for (
        let i = 0;
        i < 350;
        i++
    ) {


        logoParticles.push(

            new LogoParticle(

                rect.left +
                Math.random()
                * rect.width,

                rect.top +
                Math.random()
                * rect.height

            )

        );

    }

}


/* =========================================================
   EXTRA DISSOLVE BURST
========================================================= */

function createBurst() {


    const rect =
        logo.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    for (
        let i = 0;
        i < 60;
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

let isTransitioning =
    false;


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


    if (
        isTransitioning
    ) {

        return;

    }


    isTransitioning =
        true;


    /*
     * สร้าง Particle
     * จาก Logo
     */

    createLogoParticles();


    /*
     * ซ่อนปุ่ม
     */

    viewButton.style.opacity =
        "0";


    viewButton.style.pointerEvents =
        "none";


    /*
     * Logo เริ่มสลาย
     */

    setTimeout(() => {


        logoContainer.style.opacity =
            "0";


        logoContainer.style.transform =
            "scale(1.05)";


        logoContainer.style.filter =
            "blur(4px)";


    }, 50);


    /*
     * Burst
     */

    setTimeout(() => {

        createBurst();

    }, 180);


    /*
     * เปิด Leaderboard
     */

    setTimeout(() => {


        leaderboardScreen.classList.add(
            "active"
        );


    }, 800);

}


/* =========================================================
   BACK BUTTON
========================================================= */

backButton.addEventListener(
    "click",
    goBack
);


/* =========================================================
   RETURN TO MENU
========================================================= */

function goBack() {


    leaderboardScreen.classList.remove(
        "active"
    );


    setTimeout(() => {


        /*
         * Logo กลับมา
         */

        logoContainer.style.opacity =
            "1";


        logoContainer.style.transform =
            "scale(1)";


        logoContainer.style.filter =
            "blur(0)";


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

        logoParticles.length =
            0;


        isTransitioning =
            false;


    }, 650);

}


/* =========================================================
   ANIMATION LOOP
========================================================= */

function animate() {


    ctx.clearRect(

        0,

        0,

        width,

        height

    );


    /*
     * Bottom Particles
     */

    for (
        const particle
        of bottomParticles
    ) {


        particle.update();


        particle.draw();

    }


    /*
     * Logo Dissolve
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


        }
        else {


            logoParticles.splice(

                i,

                1

            );

        }

    }


    requestAnimationFrame(
        animate
    );

}


/* =========================================================
   START ANIMATION
========================================================= */

animate();
