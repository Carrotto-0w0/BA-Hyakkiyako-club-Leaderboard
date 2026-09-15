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


const spiritEffect =
    document.getElementById(
        "spiritEffect"
    );


/* =====================================================
   CANVAS
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
   AMBIENT PARTICLES
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
            * 1.8
            + 0.4;


        this.speed =
            Math.random()
            * 0.45
            + 0.15;


        this.opacity =
            Math.random()
            * 0.55
            + 0.1;


        this.wave =
            Math.random()
            * Math.PI
            * 2;


        this.waveSpeed =
            Math.random()
            * 0.025
            + 0.008;


        this.waveAmount =
            Math.random()
            * 0.7
            + 0.2;

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
            "#25DFFF";


        ctx.shadowBlur =
            9;


        ctx.shadowColor =
            "#00CFFF";


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
    i < 80;
    i++
) {

    ambientParticles.push(

        new AmbientParticle()

    );

}


/* =====================================================
   BOTTOM PARTICLES
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

                : height + 15;


        this.size =
            Math.random()
            * 2.3
            + 0.5;


        this.speed =
            Math.random()
            * 0.8
            + 0.25;


        this.opacity =
            Math.random()
            * 0.65
            + 0.15;


        this.wave =
            Math.random()
            * Math.PI
            * 2;


        this.waveSpeed =
            Math.random()
            * 0.025
            + 0.008;


        this.waveAmount =
            Math.random()
            * 1.2
            + 0.3;


        /*
            บางเม็ดเล็กมาก
        */

        if (
            Math.random() < 0.25
        ) {

            this.size *=
                0.45;

        }

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
            12;


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
   CREATE BOTTOM PARTICLES
===================================================== */

for (
    let i = 0;
    i < 65;
    i++
) {

    bottomParticles.push(

        new BottomParticle()

    );

}


/* =====================================================
   LOGO DISSOLVE PARTICLES
===================================================== */

class LogoParticle {

    constructor(x, y) {

        this.x = x;

        this.y = y;


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
            ทำให้บางส่วนลอยขึ้น
            คล้ายเปลวไฟ
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


        this.vx *=
            0.985;


        this.vy *=
            0.985;


        this.x +=
            Math.sin(
                this.wave
            )
            * 0.35;


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
        ตรวจสอบว่า PNG โหลดสำเร็จ
    */

    if (
        !logo.complete ||
        logo.naturalWidth === 0
    ) {

        createFallbackParticles();

        return;

    }


    /*
        Temporary Canvas
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
        จำกัดขนาด
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
        วาด Logo
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
        ระยะ Sampling

        เลขน้อย =
        Particle เยอะ

        เลขมาก =
        Particle น้อย
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


            /*
                เฉพาะ Pixel ที่เห็น
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
        ป้องกันกรณี PNG
        อ่าน Pixel ไม่ได้
    */

    if (
        logoParticles.length === 0
    ) {

        createFallbackParticles();

    }

}


/* =====================================================
   FALLBACK
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
   EXTRA PARTICLE BURST
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
   TRANSITION
===================================================== */

let isTransitioning =
    false;


function startTransition() {

    if (
        isTransitioning
    ) {

        return;

    }


    isTransitioning =
        true;


    /*
        ปิดปุ่ม
    */

    viewButton.style.opacity =
        "0";


    viewButton.style.pointerEvents =
        "none";


    /*
        ปิด Spirit Effect
        พร้อมกับ Logo
    */

    if (
        spiritEffect
    ) {

        spiritEffect.style.transition =
            "opacity 0.3s ease";

        spiritEffect.style.opacity =
            "0";

    }


    /*
        สร้าง Particle
        จาก Pixel ของ Logo
    */

    createLogoParticles();


    /*
        Logo เริ่มสลาย
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
        Burst
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
   BACK
===================================================== */

function goBack() {

    leaderboardScreen.classList.remove(
        "active"
    );


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
            Spirit กลับมา
        */

        if (
            spiritEffect
        ) {

            spiritEffect.style.opacity =
                "1";

        }


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
   MAIN ANIMATION
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
        Ambient Particles
    */

    for (
        const particle
        of ambientParticles
    ) {

        particle.update();

        particle.draw();

    }


    /*
        Bottom Floating Particles
    */

    for (
        const particle
        of bottomParticles
    ) {

        particle.update();

        particle.draw();

    }


    /*
        Logo Dissolve Particles
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
        Next Frame
    */

    requestAnimationFrame(
        animate
    );

}


/* =====================================================
   START
===================================================== */

animate();
