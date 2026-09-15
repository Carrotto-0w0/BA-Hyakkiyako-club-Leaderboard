/* =====================================================
   ELEMENTS
===================================================== */

const canvas =
    document.getElementById(
        "particleCanvas"
    );

const ctx =
    canvas.getContext("2d");


const logo =
    document.getElementById(
        "logo"
    );


const logoContainer =
    document.getElementById(
        "logoContainer"
    );


const viewButton =
    document.getElementById(
        "viewButton"
    );


const leaderboardScreen =
    document.getElementById(
        "leaderboardScreen"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


/* =====================================================
   CANVAS SIZE
===================================================== */

let width = 0;

let height = 0;


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


/* =====================================================
   PARTICLE ARRAYS
===================================================== */

const ambientParticles = [];

const bottomParticles = [];

const logoParticles = [];


/* =====================================================
   AMBIENT PARTICLE
   Particle เล็ก ๆ ทั่วจอ
===================================================== */

class AmbientParticle {

    constructor() {

        this.reset(true);

    }


    reset(firstSpawn = false) {

        this.x =
            Math.random()
            * width;


        this.y =

            firstSpawn

                ? Math.random()
                  * height

                : height + 20;


        this.size =
            Math.random()
            * 1.5
            + 0.35;


        this.speed =
            Math.random()
            * 0.35
            + 0.1;


        this.opacity =
            Math.random()
            * 0.45
            + 0.08;


        this.wave =
            Math.random()
            * Math.PI
            * 2;


        this.waveSpeed =
            Math.random()
            * 0.02
            + 0.006;


        this.waveAmount =
            Math.random()
            * 0.55
            + 0.15;

    }


    update() {

        this.y -=
            this.speed;


        this.wave +=
            this.waveSpeed;


        this.x +=

            Math.sin(
                this.wave
            )
            * this.waveAmount;


        if (
            this.y < -20
        ) {

            this.reset();

        }

    }


    draw() {

        ctx.save();


        ctx.globalAlpha =
            this.opacity;


        ctx.fillStyle =
            "#20DFFF";


        ctx.shadowBlur =
            7;


        ctx.shadowColor =
            "#00BFFF";


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
   CREATE AMBIENT PARTICLES
===================================================== */

for (
    let i = 0;
    i < 95;
    i++
) {

    ambientParticles.push(

        new AmbientParticle()

    );

}


/* =====================================================
   BOTTOM PARTICLE
   Particle หลักที่ลอยขึ้นจากด้านล่าง
===================================================== */

class BottomParticle {

    constructor() {

        this.reset(true);

    }


    reset(firstSpawn = false) {

        this.x =
            Math.random()
            * width;


        this.y =

            firstSpawn

                ? height
                  + Math.random()
                  * height

                : height + 20;


        /*
            ขนาด Particle
            ส่วนใหญ่เล็ก
            บางส่วนใหญ่กว่า
        */

        const sizeRoll =
            Math.random();


        if (
            sizeRoll < 0.65
        ) {

            this.size =
                Math.random()
                * 1.6
                + 0.5;

        }

        else if (
            sizeRoll < 0.9
        ) {

            this.size =
                Math.random()
                * 2.2
                + 1.2;

        }

        else {

            this.size =
                Math.random()
                * 2.5
                + 2;

        }


        /*
            ความเร็ว
        */

        this.speed =
            Math.random()
            * 0.9
            + 0.3;


        /*
            ความสว่าง
        */

        this.opacity =
            Math.random()
            * 0.65
            + 0.2;


        /*
            การส่าย
        */

        this.wave =
            Math.random()
            * Math.PI
            * 2;


        this.waveSpeed =
            Math.random()
            * 0.035
            + 0.008;


        this.waveAmount =
            Math.random()
            * 1.4
            + 0.3;


        /*
            Particle บางเม็ด
            มีการกระพริบ
        */

        this.twinkle =
            Math.random()
            * Math.PI
            * 2;


        this.twinkleSpeed =
            Math.random()
            * 0.05
            + 0.015;

    }


    update() {

        /*
            ลอยขึ้น
        */

        this.y -=
            this.speed;


        /*
            ส่ายซ้ายขวา
        */

        this.wave +=
            this.waveSpeed;


        this.x +=

            Math.sin(
                this.wave
            )
            * this.waveAmount;


        /*
            กระพริบ
        */

        this.twinkle +=
            this.twinkleSpeed;


        /*
            ถ้าหลุดด้านบน
            ให้เกิดใหม่ด้านล่าง
        */

        if (
            this.y < -25
        ) {

            this.reset();

        }

    }


    draw() {

        /*
            Twinkle
        */

        const pulse =

            0.75
            +
            Math.sin(
                this.twinkle
            )
            * 0.25;


        ctx.save();


        ctx.globalAlpha =
            this.opacity
            * pulse;


        /*
            สีฟ้า
        */

        ctx.fillStyle =
            "#27E4FF";


        /*
            Glow
        */

        ctx.shadowBlur =
            this.size > 2.5
                ? 18
                : 11;


        ctx.shadowColor =
            "#00BFFF";


        /*
            จุด Particle
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


/* =====================================================
   CREATE BOTTOM PARTICLES
===================================================== */

/*
   110 particles
   เพิ่มจาก Version ก่อน
*/

for (
    let i = 0;
    i < 110;
    i++
) {

    bottomParticles.push(

        new BottomParticle()

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


        /*
            สุ่มทิศทาง
        */

        const angle =

            Math.random()
            * Math.PI
            * 2;


        const speed =

            Math.random()
            * 3.5
            + 0.8;


        this.vx =

            Math.cos(angle)
            * speed;


        this.vy =

            Math.sin(angle)
            * speed;


        /*
            ทำให้บาง Particle
            ลอยขึ้น
        */

        this.vy -=

            Math.random()
            * 1.4;


        this.size =

            Math.random()
            * 2
            + 0.6;


        this.life = 1;


        this.decay =

            Math.random()
            * 0.018
            + 0.006;


        this.wave =

            Math.random()
            * Math.PI
            * 2;


        this.waveSpeed =

            Math.random()
            * 0.08
            + 0.02;

    }


    update() {

        this.wave +=
            this.waveSpeed;


        this.x +=
            this.vx;


        this.y +=
            this.vy;


        /*
            ชะลอ
        */

        this.vx *=
            0.985;


        this.vy *=
            0.985;


        /*
            การส่าย
        */

        this.x +=

            Math.sin(
                this.wave
            )
            * 0.35;


        /*
            Fade
        */

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
            "#35E6FF";


        ctx.shadowBlur =
            14;


        ctx.shadowColor =
            "#00BFFF";


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
   CREATE LOGO PARTICLES
===================================================== */

function createLogoParticles() {

    logoParticles.length = 0;


    /*
        ถ้า PNG โหลดไม่ได้
    */

    if (
        !logo.complete ||
        logo.naturalWidth === 0
    ) {

        createFallbackParticles();

        return;

    }


    /*
        Canvas ชั่วคราว
    */

    const tempCanvas =
        document.createElement(
            "canvas"
        );


    const tempCtx =
        tempCanvas.getContext(
            "2d"
        );


    /*
        ตำแหน่ง Logo
    */

    const rect =
        logo.getBoundingClientRect();


    /*
        ขนาด
    */

    const logoWidth =
        Math.floor(
            rect.width
        );


    const ratio =
        logo.naturalHeight /
        logo.naturalWidth;


    const logoHeight =
        Math.floor(
            logoWidth
            * ratio
        );


    tempCanvas.width =
        logoWidth;


    tempCanvas.height =
        logoHeight;


    /*
        วาด PNG
    */

    tempCtx.drawImage(

        logo,

        0,

        0,

        logoWidth,

        logoHeight

    );


    /*
        อ่าน Pixel
    */

    const pixels =
        tempCtx.getImageData(

            0,

            0,

            logoWidth,

            logoHeight

        ).data;


    /*
        Sampling

        5 = รายละเอียดค่อนข้างดี
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
                    y * logoWidth
                    + x
                )
                * 4;


            const alpha =

                pixels[
                    index + 3
                ];


            if (

                alpha > 80

                &&

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


    /*
        Fallback
    */

    if (
        logoParticles.length === 0
    ) {

        createFallbackParticles();

    }

}


/* =====================================================
   FALLBACK PARTICLES
===================================================== */

function createFallbackParticles() {

    const rect =
        logo.getBoundingClientRect();


    for (
        let i = 0;
        i < 350;
        i++
    ) {

        const x =

            rect.left
            +
            Math.random()
            * rect.width;


        const y =

            rect.top
            +
            Math.random()
            * rect.height;


        logoParticles.push(

            new LogoParticle(
                x,
                y
            )

        );

    }

}


/* =====================================================
   TRANSITION BURST
===================================================== */

function createBurst() {

    const centerX =
        width / 2;


    const centerY =
        height / 2;


    for (
        let i = 0;
        i < 120;
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


/* =====================================================
   TRANSITION STATE
===================================================== */

let isTransitioning =
    false;


/* =====================================================
   START TRANSITION
===================================================== */

function startTransition() {

    if (
        isTransitioning
    ) {

        return;

    }


    isTransitioning =
        true;


    /*
        ซ่อนปุ่ม
    */

    viewButton.style.opacity =
        "0";


    viewButton.style.pointerEvents =
        "none";


    /*
        สร้าง Particle
        จาก Logo
    */

    createLogoParticles();


    /*
        Logo fade + dissolve
    */

    setTimeout(() => {

        logoContainer.style.opacity =
            "0";


        logoContainer.style.transform =
            "scale(1.06)";


        logoContainer.style.filter =
            "blur(6px)";

    }, 50);


    /*
        Burst ตรงกลาง
    */

    setTimeout(() => {

        createBurst();

    }, 300);


    /*
        เปิดหน้า Leaderboard
    */

    setTimeout(() => {

        leaderboardScreen.classList.add(
            "active"
        );

    }, 950);

}


/* =====================================================
   BACK
===================================================== */

function goBack() {

    /*
        ปิด Leaderboard
    */

    leaderboardScreen.classList.remove(
        "active"
    );


    /*
        รอ Transition
    */

    setTimeout(() => {


        /*
            Logo กลับมา
        */

        logoContainer.style.opacity =
            "1";


        logoContainer.style.transform =
            "scale(1)";


        logoContainer.style.filter =
            "none";


        /*
            ปุ่มกลับมา
        */

        viewButton.style.opacity =
            "1";


        viewButton.style.pointerEvents =
            "auto";


        /*
            ล้าง Particle
        */

        logoParticles.length =
            0;


        isTransitioning =
            false;


    }, 700);

}


/* =====================================================
   BUTTON EVENTS
===================================================== */

viewButton.addEventListener(

    "click",

    startTransition

);


backButton.addEventListener(

    "click",

    goBack

);


/* =====================================================
   MAIN ANIMATION LOOP
===================================================== */

function animate() {


    /*
        Clear Canvas
    */

    ctx.clearRect(

        0,

        0,

        width,

        height

    );


    /*
        Ambient particles
    */

    for (
        const particle
        of ambientParticles
    ) {

        particle.update();

        particle.draw();

    }


    /*
        Bottom particles
    */

    for (
        const particle
        of bottomParticles
    ) {

        particle.update();

        particle.draw();

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


        const alive =
            particle.update();


        if (
            alive
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


    /*
        Continue
    */

    requestAnimationFrame(
        animate
    );

}


/* =====================================================
   START ANIMATION
===================================================== */

animate();
