/* ==========================================================================
   WETCOAL Main Script
   Handles navigation, scroll animations, form processing, and interactive logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Loader Fade-Out Transition
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
      }, 700); // Gentle preloader delay to showcase clean entrance
    });
    // Safety fallback for slow connections
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 2500);
  }

  // 1b. Scroll Progress Indicator Logic
  const scrollProgressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0) {
      const scrolledPercentage = (window.scrollY / windowHeight) * 100;
      if (scrollProgressBar) {
        scrollProgressBar.style.width = scrolledPercentage + '%';
      }
    }
  });

  // 1c. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Navbar Scroll Behavior (Sticky to Solid Background transition)
  const navbar = document.getElementById('navbar');
  const handleScrollNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollNavbar);
  handleScrollNavbar(); // Initial run on load

  // 4. Mobile Menu Hamburger Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link a');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when a link is clicked (useful for single-page navigations)
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 5. Scroll Active Section Link Highlighter & Reveal-on-Scroll Animations
  const sections = document.querySelectorAll('section');
  const navLinksList = document.querySelectorAll('.nav-link');
  const reveals = document.querySelectorAll('.reveal');

  // Intersection Observer for highlighting menu based on active section
  const sectionOptions = {
    root: null,
    threshold: 0.25, // Trigger when 25% of section is visible
    rootMargin: "-80px 0px 0px 0px" // Adjusted for fixed navbar height
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.querySelector('a').getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, sectionOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Intersection Observer for slide-in/fade-in animations (Reveal effects)
  const revealOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  // Staggered child reveals and count-up animator triggers
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        container.classList.add('active');
        
        // Stagger visual entrance of cards/steps inside grids
        const cardsToStagger = container.querySelectorAll('.stat-card, .product-card, .service-card, .serve-card, .founder-card, .support-logo-card');
        cardsToStagger.forEach((card, index) => {
          card.style.transitionDelay = `${index * 120}ms`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });

        // Trigger count-up numbers if visible
        const countElements = container.querySelectorAll('.stat-num');
        countElements.forEach(animateCountUp);

        revealObserver.unobserve(container);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // 5a. Count-Up Statistics Animation Logic
  function animateCountUp(el) {
    const originalText = el.textContent;
    const numberMatch = originalText.match(/^([\d,]+)(.*)$/);
    if (!numberMatch) return; // Skip non-numeric values like "Pat."
    
    const targetVal = parseInt(numberMatch[1].replace(/,/g, ''), 10);
    const suffixText = numberMatch[2];
    const durationTime = 1600; // Animation duration in milliseconds
    const startTime = performance.now();
    
    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationTime, 1);
      
      // Ease out quad equation
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.floor(easedProgress * targetVal);
      
      const formattedVal = targetVal >= 1000 ? currentVal.toLocaleString() : currentVal;
      el.textContent = formattedVal + suffixText;
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = originalText; // Re-align to exact final formatting
      }
    }
    requestAnimationFrame(step);
  }

  // 5b. Technology Flowchart Sequential Lighting Animation
  const flowchart = document.getElementById('flowchart-container');
  if (flowchart) {
    const flowchartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const step1 = flowchart.querySelector('.step-1');
          const step2 = flowchart.querySelector('.step-2');
          const outputs = flowchart.querySelector('.step-outputs');
          
          // Trigger timeline animations in sequence
          setTimeout(() => {
            if (step1) step1.classList.add('active-sequence');
          }, 100);
          
          setTimeout(() => {
            if (step2) step2.classList.add('active-sequence');
          }, 900);
          
          setTimeout(() => {
            if (outputs) outputs.classList.add('active-sequence');
          }, 1700);
          
          flowchartObserver.unobserve(flowchart);
        }
      });
    }, { threshold: 0.15 });
    flowchartObserver.observe(flowchart);
  }

  // 5b. Hero Video Player Controls & Fallback
  const heroVideo = document.getElementById('hero-video');
  const videoContainer = document.getElementById('video-container');
  const muteBtn = document.getElementById('video-mute-btn');

  if (heroVideo && videoContainer) {
    // Handle volume toggle
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
        if (heroVideo.muted) {
          muteBtn.innerHTML = '<i data-lucide="volume-x"></i>';
        } else {
          muteBtn.innerHTML = '<i data-lucide="volume-2"></i>';
        }
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    }

    // Handle stream error - replace with Google Drive Preview Iframe
    heroVideo.addEventListener('error', () => {
      console.warn('Native video stream failed or was blocked. Falling back to Google Drive preview player.');
      videoContainer.innerHTML = `
        <iframe src="https://drive.google.com/file/d/1GnLWlgOV33awIRI7Q2A0GtURtNQMKOKE/preview?autoplay=1&mute=1" 
                class="hero-video-iframe"
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
        </iframe>`;
    });

    // Autoplay safety fallback: trigger play programmatically
    heroVideo.play().catch(() => {
      console.log("Autoplay prevented by browser security. Playback requires interaction or mute state.");
    });
  }

  // 6. Gmail Compose Redirection Handler
  // Desktop clicks route to web Gmail compose page. Mobile clicks trigger native mailto protocol.
  const gmailLink = document.getElementById('gmail-compose-link');
  if (gmailLink) {
    gmailLink.addEventListener('click', (e) => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        e.preventDefault();
        const composeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=info.wetcoal@gmail.com&su=Inquiry%20to%20WETCOAL&body=Hello%20WETCOAL%20Team,';
        window.open(composeUrl, '_blank');
      }
    });
  }

  // 7. Contact Form Handling and Validation
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form fields
      const name = document.getElementById('form-name').value.trim();
      const org = document.getElementById('form-org').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const role = document.getElementById('form-role').value;
      const message = document.getElementById('form-message').value.trim();

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Simple phone validation regex (digits, spaces, hyphens, plus)
      const phoneRegex = /^[0-9\s\-+]{7,15}$/;

      // Form validation logic
      if (!name || !org || !email || !phone || !role || !message) {
        showFormMessage(formError, 'All fields are required. Please check your inputs.');
        hideFormMessage(formSuccess);
        return;
      }

      if (!emailRegex.test(email)) {
        showFormMessage(formError, 'Please enter a valid email address.');
        hideFormMessage(formSuccess);
        return;
      }

      if (!phoneRegex.test(phone)) {
        showFormMessage(formError, 'Please enter a valid phone number.');
        hideFormMessage(formSuccess);
        return;
      }

      // If valid, hide error message and process request
      hideFormMessage(formError);

      /* ==========================================================================
         TODO: Connect form handler
         You can wire this form to a backend service like Formspree or EmailJS.
         
         Example (Formspree Fetch integration):
         
         fetch("https://formspree.io/f/YOUR_FORM_ID", {
           method: "POST",
           body: JSON.stringify({
             name: name,
             organization: org,
             email: email,
             phone: phone,
             role: role,
             message: message
           }),
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           }
         })
         .then(response => {
           if (response.ok) {
             showSuccessState();
           } else {
             showFormMessage(formError, 'Oops! There was a problem submitting your form.');
           }
         })
         .catch(error => {
           showFormMessage(formError, 'Network error. Please try again later.');
         });
         ========================================================================== */

      // Simulation of submission (Fallback local behavior)
      console.log('--- WETCOAL Form Inquiry Received ---');
      console.log(`Name: ${name}`);
      console.log(`Organization: ${org}`);
      console.log(`Email: ${email}`);
      console.log(`Phone: ${phone}`);
      console.log(`Role: ${role}`);
      console.log(`Message: ${message}`);

      // Transition visual states
      showFormMessage(formSuccess, 'Thank you! Your inquiry was submitted. The WETCOAL team will get in touch with you shortly.');
      contactForm.reset();
    });
  }

  // Helper functions for messages
  function showFormMessage(element, text) {
    element.textContent = text;
    element.style.display = 'block';
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFormMessage(element) {
    element.style.display = 'none';
  }

  // 6. Dark / Light Theme Toggle Behavior
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    // Check user preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const userPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && userPrefersLight)) {
      document.body.classList.add('light-theme');
    }
    
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
    });
  }
});
