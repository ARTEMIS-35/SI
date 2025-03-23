function switchTab(event, formId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.form-container').forEach(form => form.classList.remove('active'));
    document.getElementById(formId).classList.add('active');
}

function handleScroll() {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }
    
    document.addEventListener('scroll', handleScroll);
    handleScroll();

    let index = 0; // Slide actuel
    const slidesContainer = document.querySelector('.slide-container');
    const totalSlides = document.querySelectorAll('.slide-container div').length;

    function updateSlide() {
        slidesContainer.style.transform = `translateX(${-index * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % totalSlides; // Passe au slide suivant
        updateSlide();
    }

    function prevSlide() {
        index = (index - 1 + totalSlides) % totalSlides; // Revient au slide précédent
        updateSlide();
    }

    document.getElementById('droite').addEventListener('click', nextSlide);
    document.getElementById('gauche').addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000);



    
    const R = document.getElementById("open")
    const A= document.getElementById("bar-lat")
    const cl=document.getElementById("close")

        R.addEventListener("click",()=>{
        
            
            A.style.width="20%";
            R.style.display="none";
            cl.style.display="block"
            }) ;
            cl.addEventListener("click",()=>{
        
                A.style.width="3%";
R.style.display="block";
cl.style.display="none"});


        const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 150;
    const maxDistance = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 4 + 1;
            this.dx = (Math.random() - 0.5) * 3;
            this.dy = (Math.random() - 0.5) * 3;
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#6a0dad";
            ctx.fill();
        }
    }

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        ctx.strokeStyle = "rgba(106, 13, 173, 0.5)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(106, 13, 173, ${1 - distance / maxDistance})`;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        drawLines();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });