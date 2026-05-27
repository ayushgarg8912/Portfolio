// script.js - interactive features, typed animation, scroll animations, active navbar, counter
document.addEventListener("DOMContentLoaded", () => {
    // Typing Animation
    const typedWords = ["Java Backend Developer", "Spring Boot Enthusiast", "API Architect", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextSpan = document.getElementById("typed-text");
    const cursorSpan = document.getElementById("cursor");
    
    function typeEffect() {
        const currentWord = typedWords[wordIndex];
        if (isDeleting) {
            typedTextSpan.textContent = currentWord.substring(0, charIndex-1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentWord.substring(0, charIndex+1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1600);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typedWords.length;
            setTimeout(typeEffect, 200);
            return;
        }
        setTimeout(typeEffect, isDeleting ? 70 : 120);
    }
    typeEffect();

    // Skills data + progress bars inject
    const skillsList = [
        { name: "Java", icon: "fab fa-java", percent: 90 },
        { name: "Python", icon: "fab fa-python", percent: 70 },
        { name: "Spring Boot", icon: "fas fa-leaf", percent: 87 },
        { name: "Hibernate", icon: "fas fa-database", percent: 82 },
        { name: "REST APIs", icon: "fas fa-cloud", percent: 88 },
        { name: "MySQL", icon: "fas fa-database", percent: 85 },
        { name: "HTML/CSS/JS", icon: "fab fa-js", percent: 80 },
        { name: "Git & GitHub", icon: "fab fa-github", percent: 86 },
        { name: "DSA", icon: "fas fa-chart-line", percent: 78 },
        { name: "OOP Concepts", icon: "fas fa-cube", percent: 92 },
        { name: "DB Management", icon: "fas fa-server", percent: 84 }
    ];
    const skillsContainer = document.getElementById("skillsGrid");
    function buildSkills() {
        skillsContainer.innerHTML = skillsList.map(skill => `
            <div class="skill-card fade-up">
                <div class="skill-info"><i class="${skill.icon}"></i><strong>${skill.name}</strong></div>
                <div class="progress-bar"><div class="progress-fill" data-percent="${skill.percent}" style="width:0%"></div></div>
            </div>
        `).join("");
    }
    buildSkills();

    // Intersection Observer for fade-up, progress bars and counters
    const fadeElements = document.querySelectorAll(".fade-up, .skill-card, .project-card, .tool-card, .journey-card, .stat-card, .about-text, .timeline-journey");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                // skill progress bar trigger
                if (entry.target.classList.contains("skill-card")) {
                    const fillDiv = entry.target.querySelector(".progress-fill");
                    if (fillDiv) {
    const percent = fillDiv.getAttribute("data-percent");

    setTimeout(() => {
        fillDiv.style.width = percent + "%";
    }, 100); // small delay ensures smooth animation
}
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => { el.classList.add("fade-up"); observer.observe(el); });

    // Stats counter
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const updateCounter = () => {
                    const target = +el.getAttribute("data-target");
                    let current = +el.innerText;
                    const increment = target / 50;
                    if (current < target) {
                        el.innerText = Math.ceil(current + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        el.innerText = target;
                    }
                };
                updateCounter();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // Navbar Active link + smooth scroll, hamburger
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) current = section.getAttribute("id");
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
        });
        const backBtn = document.getElementById("backToTop");
        if (window.scrollY > 600) backBtn.classList.add("show");
        else backBtn.classList.remove("show");
    });
    // smooth scroll for nav & buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            if (navLinks.parentElement.classList.contains("active")) document.getElementById("navLinks").classList.remove("active");
        });
    });
    // Hamburger toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navLinks");
    hamburger.addEventListener("click", () => { navMenu.classList.toggle("active"); });
    // Contact Form Alert
    const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://localhost:8080/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        alert(result || "Message sent successfully!");

        contactForm.reset();

    } catch (error) {
        console.log(error);
        alert("Failed to send message");
    }
});
    // Back to top
    const backBtn = document.getElementById("backToTop");
    backBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
    // Project demo buttons placeholder alerts
    // document.querySelectorAll(".demo, .btn-icon").forEach(btn => {
    //     btn.addEventListener("click", (e) => {
    //         if (btn.classList.contains("demo") || btn.innerText.includes("Live Demo") || btn.innerText.includes("GitHub")) {
    //             e.preventDefault();
    //             alert("🔗 Project repository & demo are available on request. Contact me for live access!");
    //         }
    //     });
    // });
});