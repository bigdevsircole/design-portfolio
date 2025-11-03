document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksAnchors = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinksAnchors.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Prevent clicks inside the menu from closing it
  navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Loader
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1500);
  
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  });
  
  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.tile-container').forEach(tile => {
    observer.observe(tile);
  });

  // Lazy-load gallery images
  document.querySelectorAll('.tile').forEach(img => {
    try {
      img.loading = 'lazy';
    } catch (e) {
      // Ignore if attribute can't be set
    }
  });

  // Simple lightbox implementation for tiles
  (function setupLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="preview"><span class="close" aria-hidden="true">&times;</span>';
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.close');

    document.querySelectorAll('.tile').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // close when clicking overlay or close button
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lbClose) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  })();
  
  // Contact Form with EmailJS
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.querySelector('.btn-text');
  const btnLoader = document.querySelector('.btn-loader');
  const toast = document.getElementById('toast');

  // Initially hide loader icon
  btnLoader.style.display = 'none';

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    try {
      // Send email using EmailJS
      const response = await emailjs.sendForm(
        'service_jqqfn9q',
        'template_pjyxg1p',
        e.target,
        'y-fZwQR7f20KakfWJ'
      );
      
      // Show success message
      toast.textContent = 'Message sent successfully!';
      toast.classList.add('show');
      
      // Reset form
      contactForm.reset();
      
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.textContent = 'Failed to send message. Please try again.';
      toast.classList.add('show');
    } finally {
      // Reset button state
      btnText.style.display = 'inline-block';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;
      
      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = document.body.classList.contains('light-mode') ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 26, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.backgroundColor = document.body.classList.contains('light-mode') ? 'var(--light)' : 'var(--dark)';
      navbar.style.backdropFilter = 'none';
    }
  });
});