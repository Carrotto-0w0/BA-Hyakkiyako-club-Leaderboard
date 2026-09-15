const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

class Particle {

    constructor() {
        this.reset();
    }

    reset() {

        this.x = Math.random() * canvas.width;

        this.y =
            canvas.height +
            Math.random() * 100;

        this.size =
            Math.random() * 2.5 + 0.5;

        this.speed =
            Math.random() * 0.7 + 0.3;

        this.opacity =
            Math.random() * 0.7 + 0.2;

        this.life =
            Math.random() * 200 + 100;

        this.age = 0;

        this.wave =
            Math.random() * Math.PI * 2;

        this.waveSpeed =
            Math.random() * 0.03 + 0.01;

        this.waveAmount =
            Math.random() * 1.5 + 0.5;
    }

    update() {

        this.age++;

        this.y -= this.speed;

        this.wave += this.waveSpeed;

        this.x +=
            Math.sin(this.wave) *
            this.waveAmount;

        if (
            this.y < -20 ||
            this.age > this.life
        ) {
            this.reset();
        }
    }

    draw() {

        ctx.save();

        ctx.globalAlpha = this.opacity;

        ctx.shadowBlur = 12;

        ctx.shadowColor = "#00cfff";

        ctx.fillStyle = "#39e7ff";

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


function createParticles() {

    particles = [];

    const amount =
        Math.floor(
            (canvas.width * canvas.height) / 18000
        );

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }
}


function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (const particle of particles) {

        particle.update();

        particle.draw();

    }

    requestAnimationFrame(animate);
}


createParticles();

animate();