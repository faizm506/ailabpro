document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 2. MOUSE TRACKING GLOW EFFECT (Vercel Style) ---
    const cardsContainer = document.getElementById("cards-container");
    const cards = document.querySelectorAll(".glow-card");

    if (cardsContainer) {
        cardsContainer.addEventListener("mousemove", (e) => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect(),
                      x = e.clientX - rect.left,
                      y = e.clientY - rect.top;
    
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        });
    }

    // --- 3. PARALLAX BACKGROUND MESH ---
    // Makes the background blobs move subtly opposite to the user's scroll
    const blob1 = document.getElementById('blob1');
    const blob2 = document.getElementById('blob2');
    const blob3 = document.getElementById('blob3');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Use requestAnimationFrame for smooth performance
        window.requestAnimationFrame(() => {
            if(blob1) blob1.style.transform = `translateY(${scrolled * 0.1}px)`;
            if(blob2) blob2.style.transform = `translateY(${scrolled * -0.15}px)`;
            if(blob3) blob3.style.transform = `translateY(${scrolled * 0.08}px)`;
        });
    });

});
// --- 4. FAQ ACCORDION LOGIC ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other open FAQs (Optional: makes it feel cleaner)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle the clicked FAQ
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px"; // Smoothly expands to exact height needed
            }
        });
    });

    
// --- 6. CINEMATIC TERMINAL TYPING ANIMATION ---
    const terminalContainer = document.getElementById('typewriter-container');
    const bootContainer = document.getElementById('boot-sequence');
    const revealBox = document.getElementById('terminal-reveal');
    const terminalWrapper = document.querySelector('.cyber-terminal');
    const cursor = document.querySelector('.typing-cursor');

    // Fast boot sequence lines
    const bootLines = [
        "> Establishing secure connection to SpaceCode Server...",
        "> Initializing Cognitive Architecture Engine v2.0...",
        "> Loading student parameters... OK",
        "> Workspace environment ready. Executing protocol.<br><br>"
    ];

    // The Emotional Code
    const codeLines = [
        "<span class='code-comment'># Phase 1: Establish Logical Foundation</span>",
        "<span class='code-keyword'>import</span> <span class='code-variable'>potential</span> <span class='code-keyword'>from</span> <span class='code-function'>student</span>",
        "<span class='code-keyword'>import</span> <span class='code-variable'>architecture</span> <span class='code-keyword'>from</span> <span class='code-function'>spacecode</span>",
        "<br>",
        "<span class='code-comment'># Phase 3: AI Integration & Global Deployment</span>",
        "<span class='code-variable'>student</span>.<span class='code-function'>train_logic</span>(focus=<span class='code-keyword'>True</span>, resilience=<span class='code-keyword'>True</span>)",
        "<span class='code-variable'>student</span>.<span class='code-function'>build_application</span>(type=<span class='code-string'>'Artificial Intelligence'</span>)",
        "<span class='code-variable'>student</span>.<span class='code-function'>deploy_to_world</span>()",
        "<br>"
    ];

    let isTypingStarted = false;

    // 1. Run the fast boot sequence
    function runBootSequence(callback) {
        let i = 0;
        function flashLine() {
            if (i < bootLines.length) {
                bootContainer.innerHTML += bootLines[i] + "<br>";
                i++;
                setTimeout(flashLine, 150); // Fast, hacker-like speed
            } else {
                setTimeout(callback, 500); // Pause before real typing
            }
        }
        flashLine();
    }

    // 2. Type out the Python Code
    function typeCode() {
        let currentLine = 0;
        
        function typeNextLine() {
            if (currentLine < codeLines.length) {
                let lineHTML = codeLines[currentLine];
                terminalContainer.innerHTML += lineHTML + (lineHTML === "<br>" ? "" : "<br>");
                currentLine++;
                
                // Random typing speed (300ms to 700ms)
                let typingSpeed = Math.floor(Math.random() * 400) + 300;
                setTimeout(typeNextLine, typingSpeed);
            } else {
                // 3. Trigger the grand finale
                cursor.style.display = 'none';
                terminalWrapper.classList.add('success-glow'); // Shifts terminal border to green
                
                setTimeout(() => {
                    revealBox.classList.remove('d-none');
                    revealBox.classList.add('reveal', 'active'); // Fade up
                }, 400);
            }
        }
        typeNextLine();
    }

    // Intersection Observer triggers on scroll
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Trigger when 40% of the terminal is visible
            if (entry.isIntersecting && !isTypingStarted) {
                isTypingStarted = true;
                setTimeout(() => {
                    runBootSequence(typeCode);
                }, 500);
            }
        });
    }, { threshold: 0.4 });

    if (terminalContainer) {
        terminalObserver.observe(document.getElementById('breakthrough'));
    }

    // --- 7. APPLE-STYLE 3D TILT CARDS ---
    // We only run this on desktop. Mobile users just get nice static cards.
   // --- 7. APPLE-STYLE 3D TILT CARDS (Glitch-Free) ---
    if (window.innerWidth >= 992) {
        // 1. We select the STATIC wrapper, not the moving card
        const wrappers = document.querySelectorAll('.tilt-card-wrapper');

        wrappers.forEach(wrapper => {
            const card = wrapper.querySelector('.tilt-card');
            const glare = card.querySelector('.card-glare');

            wrapper.addEventListener('mousemove', (e) => {
                // 2. Calculate mouse position relative to the static wrapper
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // 3. Smooth rotation math (max 10 degrees to keep it elegant)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                // 4. Apply transformation to the inner card
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // 5. Move the glare
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 50%)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                // 6. Smoothly snap back to flat when mouse leaves the wrapper
                card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                glare.style.opacity = '0';
            });

            wrapper.addEventListener('mouseenter', () => {
                // 7. Remove CSS transition while hovering so it tracks the mouse instantly
                card.style.transition = 'none';
                glare.style.opacity = '1';
            });
        });
    }