// =============================
// Biterate Technologies
// Premium Core JavaScript
// =============================

document.addEventListener("DOMContentLoaded", () => {

    // 1. Sticky Header & Header Shadow
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav");

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("mobile-active");
            mobileMenuBtn.classList.toggle("active");
            document.body.classList.toggle("menu-open", nav.classList.contains("mobile-active"));
        });

        // Close mobile menu on click outside
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove("mobile-active");
                mobileMenuBtn.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });

        // Close on link click
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("mobile-active");
                mobileMenuBtn.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });

        // Keep the layout clean when switching between mobile and desktop widths.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 992) {
                nav.classList.remove("mobile-active");
                mobileMenuBtn.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Scroll Reveal Animation (IntersectionObserver)
    const revealElements = document.querySelectorAll(".feature-card, .table-row, .hero-content, .hero-image, .about-left, .about-right, .mission-card, .project-card, .stat-card, .testimonial-card, .contact-info, .contact-form, .info-box");

    if (revealElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.classList.add("hidden");
            observer.observe(el);
        });
    }

    // 5. Card Hover 3D Tilt Effect
    document.querySelectorAll(".feature-card, .project-card, .mission-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y - rect.height / 2) / 25;
            const rotateY = (x - rect.width / 2) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        });
    });

    // 6. Button Ripple Effect
    document.querySelectorAll("button, .join-btn, .btn, .filter-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const circle = document.createElement("span");
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const rect = this.getBoundingClientRect();

            circle.style.width = circle.style.height = diameter + "px";
            circle.style.left = (e.clientX - rect.left - diameter / 2) + "px";
            circle.style.top = (e.clientY - rect.top - diameter / 2) + "px";
            circle.classList.add("ripple");

            // Remove existing ripple spans if any
            const existingRipple = this.querySelector(".ripple");
            if (existingRipple) existingRipple.remove();

            this.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        });
    });

    // 7. Hero Typing Effect (Safe check!)
    const heading = document.querySelector(".hero h1");
    if (heading && heading.innerText.trim().length > 0) {
        const text = heading.innerText;
        heading.innerText = "";
        let i = 0;

        function typing() {
            if (i < text.length) {
                heading.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 80);
            }
        }
        typing();
    }

    // 8. Stats Animated Counter (Animated on scroll into view)
    const counters = document.querySelectorAll("[data-count]");
    if (counters.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = Number(counter.dataset.count);
                    let value = 0;
                    const step = Math.max(1, Math.ceil(target / 60));

                    const timer = setInterval(() => {
                        value += step;
                        if (value >= target) {
                            value = target;
                            clearInterval(timer);
                        }
                        counter.innerText = value;
                    }, 25);

                    countObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(c => countObserver.observe(c));
    }

    // 9. Floating Background Bubbles
    document.querySelectorAll(".bubble").forEach((bubble, index) => {
        let pos = 0;
        setInterval(() => {
            pos += 0.05;
            bubble.style.transform = `translateY(${Math.sin(pos + index) * 15}px)`;
        }, 30);
    });

    // 10. Navigation Active Link Detection
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });

    // 11. Scroll Progress Bar
    let progress = document.querySelector(".progress-bar");
    if (!progress) {
        progress = document.createElement("div");
        progress.className = "progress-bar";
        document.body.appendChild(progress);
    }

    window.addEventListener("scroll", () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0) {
            const scrolled = (window.scrollY / height) * 100;
            progress.style.width = scrolled + "%";
        }
    });

    // 12. Back To Top Button
    let topBtn = document.querySelector(".top-btn");
    if (!topBtn) {
        topBtn = document.createElement("button");
        topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        topBtn.className = "top-btn";
        topBtn.setAttribute("aria-label", "Back to top");
        document.body.appendChild(topBtn);
    }

    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("visible");
        } else {
            topBtn.classList.remove("visible");
        }
    });

    // 13. Create & Inject Search Modal
    injectSearchModal();

    // 14. Contact Form Handling
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            if (submitBtn) {
                const origText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert("Thank you! Your message has been received. Our team will get back to you shortly.");
                    contactForm.reset();
                    submitBtn.innerHTML = origText;
                    submitBtn.disabled = false;
                }, 1200);
            }
        });
    }
});

// Search Modal Functionality (Globally Available)
function injectSearchModal() {
    if (document.getElementById("globalSearchModal")) return;

    const modalHTML = `
    <div id="globalSearchModal" class="search-modal">
        <div class="search-modal-content">
            <button class="close-search-btn" onclick="closeSearch()">&times;</button>
            <h3>Search BiteRate Technologies</h3>
            <div class="search-input-wrap">
                <i class="fa-solid fa-magnifying-glass search-field-icon"></i>
                <input type="text" id="globalSearchInput" placeholder="Search services, products, tech stack..." onkeyup="performSearch(event)">
                <button onclick="searchPage()" class="search-action-btn">Search</button>
            </div>
            <div id="searchResults" class="search-results-list"></div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function toggleSearch() {
    const modal = document.getElementById("globalSearchModal");
    if (modal) {
        modal.classList.add("active");
        setTimeout(() => {
            const input = document.getElementById("globalSearchInput");
            if (input) input.focus();
        }, 100);
    }
}

function closeSearch() {
    const modal = document.getElementById("globalSearchModal");
    if (modal) {
        modal.classList.remove("active");
    }
}

function searchPage() {
    const input = document.getElementById("globalSearchInput");
    if (!input) return;
    const query = input.value.trim().toLowerCase();
    const resultsContainer = document.getElementById("searchResults");
    if (!resultsContainer) return;

    if (!query) {
        resultsContainer.innerHTML = "<p class='search-empty'>Please enter a search keyword.</p>";
        return;
    }

    const pages = [
        { title: "Home Page", url: "index.html", desc: "Empowering businesses with software solutions, web, cloud & AI." },
        { title: "Services", url: "services.html", desc: "Web Development, Mobile Apps, Cloud Solutions, AI & Cybersecurity." },
        { title: "About Us", url: "about.html", desc: "Our mission, vision, core values, and company overview." },
        { title: "AI Solutions", url: "portfolio.html", desc: "Generative AI, intelligent automation, computer vision, predictive analytics, and AI security." },
        { title: "Contact Us", url: "contact.html", desc: "Get in touch with our tech team in Maharashtra, India." },
        { title: "Get Started / Register", url: "register.html", desc: "Create a new account with BiteRate Technologies." },
        { title: "Login", url: "login.html", desc: "Sign in to your Biterate Technologies account." }
    ];

    const matches = pages.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));

    if (matches.length > 0) {
        resultsContainer.innerHTML = matches.map(m => `
            <a href="${m.url}" class="search-result-item">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                <div>
                    <h4>${m.title}</h4>
                    <p>${m.desc}</p>
                </div>
            </a>
        `).join("");
    } else {
        resultsContainer.innerHTML = `<p class='search-empty'>No matching pages found for "<strong>${query}</strong>". Try searching for 'web', 'ai', 'cloud', or 'mobile'.</p>`;
    }
}

function performSearch(event) {
    if (event.key === "Enter") {
        searchPage();
    }
}

// Close search modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSearch();
    }
});
// Light/dark theme toggle, persisted across pages.
(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('biterate-theme');
    let theme = savedTheme === 'light' ? 'light' : 'dark';
    root.dataset.theme = theme;

    const syncThemeButtons = () => {
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            const dark = theme === 'dark';
            button.setAttribute('aria-pressed', String(dark));
            button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
            const icon = button.querySelector('i');
            const label = button.querySelector('.theme-label');
            if (icon) icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            if (label) label.textContent = dark ? 'Light' : 'Dark';
        });
    };

    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            root.dataset.theme = theme;
            localStorage.setItem('biterate-theme', theme);
            syncThemeButtons();
        });
    });
    syncThemeButtons();
})();
// Contact reference form interactions.
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById('contactStatus');
    if (status) status.textContent = 'Thank you — we will be in touch soon.';
    form.reset();
    const counter = document.getElementById('charactersLeft');
    if (counter) counter.textContent = '500';
}

document.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('contactMessage');
    const counter = document.getElementById('charactersLeft');
    if (message && counter) {
        const updateCounter = () => { counter.textContent = String(500 - message.value.length); };
        message.addEventListener('input', updateCounter);
        updateCounter();
    }
});