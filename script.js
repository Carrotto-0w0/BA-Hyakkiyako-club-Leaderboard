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

const logoParticles = [];


/* =====================================================
   AMBIENT PARTICLE
===================================================== */

class AmbientParticle {

    constructor() {

        this.reset(true);

    }


    reset(firstSpawn = false) {

        this.x =
            Math.random() * width;

        this.y =
            firstSpawn

                ? Math.random() * height

                : height + 20;


        this.size =
            Math.random() * 2 + 0.5;


        this.speed =
            Math.random() * 0.55 + 0.2;


        this.opacity =
            Math.random() * 0.6 + 0.15;


        this.wave =
            Math.random() *
            Math.PI * 2;


        this.waveSpeed =
            Math.random() * 0.025
            + 0.008;


        this.waveAmount =
            Math.random() * 0.8
            + 0.2;

    }


    update() {

        this.y -=
            this.speed;


        this.wave +=
            this.waveSpeed;


        this.x +=
            Math.sin(this.wave)
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
            "#27dfff";


        ctx.shadowBlur =
            10;


        ctx.shadowColor =
            "#00cfff";


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


/* Create background particles */

for (
    let i = 0;
    i < 100;
    i++
) {

    ambientParticles.push(
        new AmbientParticle()
    );

}


/* =====================================================
   LOGO PARTICLE
===================================================== */

class LogoParticle {

    constructor(x, y) {

        this.x = x;

        this.y = y;


        /*
            Random direction
        */

        const angle =
            Math.random()
            * Math.PI * 2;


        const speed =
            Math.random() * 3.5
            + 0.8;


        this.vx =
            Math.cos(angle)
            * speed;


        this.vy =
            Math.sin(angle)
            * speed;


        /*
            ทำให้บางส่วน
            ลอยขึ้นเหมือนควัน
        */

        this.vy -=
            Math.random() * 1.4;


        this.size =
            Math.random() * 2
            + 0.6;


        this.life = 1;


        this.decay =
            Math.random() * 0.018
            + 0.006;


        this.wave =
            Math.random()
            * Math.PI * 2;


        this.waveSpeed =
            Math.random()
            * 0.08
            + 0.02;

    }


    update() {

        this.wave +=
            this.waveSpeed;


        /*
            Movement
        */

        this.x +=
            this.vx;


        this.y +=
            this.vy;


        /*
            Friction
        */

        this.vx *=
            0.985;


        this.vy *=
            0.985;


        /*
            Spirit-like movement
        */

        this.x +=
            Math.sin(this.wave)
            * 0.35;


        /*
            Slowly disappear
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
            "#35e6ff";


        ctx.shadowBlur =
            14;


        ctx.shadowColor =
            "#00bfff";


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

    /*
        ล้าง Particle เก่าก่อน
    */

    logoParticles.length = 0;


    /*
        ถ้า PNG ยังโหลดไม่เสร็จ
        ให้ใช้ Particle รอบ Logo แทน
    */

    if (
        !logo.complete ||
        logo.naturalWidth === 0
    ) {

        createFallbackParticles();

        return;

    }


    /*
        สร้าง Canvas ชั่วคราว
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
        ขนาดจริงของ Logo
    */

    const rect =
        logo.getBoundingClientRect();


    const logoWidth =
        Math.min(
            Math.floor(rect.width),
            900
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


    /*
        วาด PNG ลง Canvas
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

        5 = Particle จำนวนปานกลาง
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
                ) * 4;


            const alpha =
                pixels[
                    index + 3
                ];


            /*
                เฉพาะ Pixel
                ที่ไม่โปร่งใส
            */

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
        ถ้าอ่าน Pixel ไม่ได้
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
        i < 300;
        i++
    ) {

        const x =
            rect.left
            + Math.random()
            * rect.width;


        const y =
            rect.top
            + Math.random()
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
   TRANSITION
===================================================== */

let isTransitioning = false;


function startTransition() {

    if (
        isTransitioning
    ) {

        return;

    }


    isTransitioning = true;


    /*
        ปิดปุ่ม
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
        Logo เริ่มสลาย
    */

    setTimeout(() => {

        logoContainer.style.opacity =
            "0";


        logoContainer.style.transform =
            "scale(1.05)";


        logoContainer.style.filter =
            "blur(5px)";

    }, 50);


    /*
        เพิ่ม Particle burst
    */

    setTimeout(() => {

        createBurst();

    }, 300);


    /*
        เปิด Leaderboard
    */

    setTimeout(() => {

        leaderboardScreen.classList.add(
            "active"
        );

    }, 950);

}


/* =====================================================
   PARTICLE BURST
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
   BACK TO MENU
===================================================== */

function goBack() {

    leaderboardScreen.classList.remove(
        "active"
    );


    /*
        รอ Panel หาย
    */

    setTimeout(() => {

        logoContainer.style.opacity =
            "1";


        logoContainer.style.transform =
            "scale(1)";


        logoContainer.style.filter =
            "none";


        viewButton.style.opacity =
            "1";


        viewButton.style.pointerEvents =
            "auto";


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
        Clear canvas
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
        Logo particles
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


    requestAnimationFrame(
        animate
    );

}


animate();
