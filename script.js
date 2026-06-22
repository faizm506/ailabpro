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

    
    // --- 6. LAUNCH TELEMETRY COUNTDOWN ---
    // Set your target launch date here (Format: Year, Month Index (0-11), Day, Hour, Min, Sec)
    // Note: July is month index 6.
    const launchDate = new Date(2026, 6, 10, 9, 0, 0).getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display results with leading zeros if needed
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("launch-timer").innerHTML = "<div class='text-accent fw-bold fs-3 mt-3'>IGNITION ACTIVE</div>";
        }
    }, 1000);