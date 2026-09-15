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

const menu =
    document.getElementById("menu");

const leaderboard =
    document.getElementById("leaderboard");

const backButton =
    document.getElementById("backButton");


let particles = [];

let logoParticles = [];

let transitioning = false;


/* =====================================================
   CANVAS
===================================================== */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =====================================================
   AMBIENT PARTICLES
===================================================== */

class AmbientParticle {

    constructor() {

        this.reset();

    }


    reset() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            canvas.height +
            Math.random() * 100;

        this.size =
            Math.random() * 2.2
            + 0.5;

        this.speed =
            Math.random() * 0.6
            + 0.25;

        this.opacity =
            Math.random() * 0.6
            + 0.15;

        this.wave =
            Math.random() *
            Math.PI * 2;

        this.waveSpeed =
            Math.random() *
            0.025
            + 0.01;

        this.waveAmount =
            Math.random() * 1.2
            + 0.4;

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
            "#39e7ff";

        ctx.shadowBlur =
            12;

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


/* Create ambient particles */

for (
    let i = 0;
    i < 90;
    i++
) {

    particles.push(
        new AmbientParticle()
    );

}


/* =====================================================
   LOGO PARTICLE
===================================================== */

class LogoParticle {

    constructor(
        x,
        y
    ) {

        this.x = x;

        this.y = y;

        this.startX = x;

        this.startY = y;


        /*
            Particle จะพุ่งออก
            แบบสุ่ม
        */

        const angle =
            Math.random()
            * Math.PI * 2;

        const speed =
            Math.random()
            * 4 + 1;


        this.vx =
            Math.cos(angle)
            * speed;

        this.vy =
            Math.sin(angle)
            * speed;


        /*
            เพิ่มแรงขึ้นด้านบน
            ให้คล้ายควัน / วิญญาณ
        */

        this.vy -=
            Math.random() * 1.5;


        this.size =
            Math.random() * 2.2
            + 0.6;


        this.life = 1;


        this.decay =
            Math.random()
            * 0.012
            + 0.006;


        this.wave =
            Math.random()
            * Math.PI * 2;

    }


    update() {

        this.wave +=
            0.05;


        this.x +=
            this.vx;


        this.y +=
            this.vy;


        /*
            แรงลม
        */

        this.vx *=
            0.985;


        this.vy *=
            0.985;


        this.x +=
            Math.sin(this.wave)
            * 0.5;


        this.life -=
            this.decay;


        /*
            ค่อย ๆ จาง
        */

        return this.life > 0;

    }


    draw() {

        ctx.save();

        ctx.globalAlpha =
            this.life;


        ctx.fillStyle =
            "#42eaff";


        ctx.shadowBlur =
            15;


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


/* =====================================================
   CREATE PARTICLES FROM LOGO
===================================================== */

function createLogoParticles() {

    /*
        สร้าง Canvas ชั่วคราว
        สำหรับอ่าน pixel ของ PNG
    */

    const offCanvas =
        document.createElement("canvas");

    const offCtx =
        offCanvas.getContext("2d");


    const rect =
        logo.getBoundingClientRect();


    /*
        จำกัดขนาดเพื่อไม่ให้
        Particle เยอะเกินไป
    */

    const width =
        Math.min(
            Math.floor(rect.width),
            900
        );


    const ratio =
        logo.naturalHeight /
        logo.naturalWidth;


    const height =
        Math.floor(
            width * ratio
        );


    offCanvas.width =
        width;

    offCanvas.height =
        height;


    offCtx.clearRect(
        0,
        0,
        width,
        height
    );


    offCtx.drawImage(
        logo,
        0,
        0,
        width,
        height
    );


    const imageData =
        offCtx.getImageData(
            0,
            0,
            width,
            height
        );


    /*
        ตำแหน่ง Logo บนจอ
    */

    const startX =
        rect.left;

    const startY =
        rect.top;


    /*
        Sampling

        ยิ่งเลขมาก =
        Particle น้อยลง
    */

    const sample =
        5;


    for (
        let y = 0;
        y < height;
        y += sample
    ) {

        for (
            let x = 0;
            x < width;
            x += sample
        ) {

            const index =
                (y * width + x)
                * 4;


            const alpha =
                imageData.data[
                    index + 3
                ];


            /*
                ถ้า pixel มีความโปร่งใส
                ให้สร้าง Particle
            */

            if (
                alpha > 80
                &&
                Math.random() > 0.25
            ) {

                logoParticles.push(

                    new LogoParticle(
                        startX + x,
                        startY + y
                    )

                );

            }

        }

    }

}


/* =====================================================
   TRANSITION
===================================================== */

function startTransition() {

    if (transitioning)
        return;


    transitioning = true;


    /*
        ปุ่มหายก่อน
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
            "scale(1.08)";

        logoContainer.style.filter =
            "blur(8px)";

    }, 50);


    /*
        เปิด Leaderboard
    */

    setTimeout(() => {

        leaderboard.classList.add(
            "active"
        );

    }, 1150);


}


/* =====================================================
   BUTTON
===================================================== */

viewButton.addEventListener(
    "click",
    startTransition
);


/* =====================================================
   BACK
===================================================== */

backButton.addEventListener(
    "click",
    () => {

        leaderboard.classList.remove(
            "active"
        );


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


            transitioning =
                false;

        }, 700);

    }
);


/* =====================================================
   ANIMATION LOOP
===================================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        Ambient particles
    */

    for (
        const particle
        of particles
    ) {

        particle.update();

        particle.draw();

    }


    /*
        Logo particles
    */

    if (
        logoParticles.length > 0
    ) {

        logoParticles =
            logoParticles.filter(
                particle => {

                    const alive =
                        particle.update();

                    if (alive) {

                        particle.draw();

                    }

                    return alive;

                }
            );

    }


    requestAnimationFrame(
        animate
    );

}


animate();
