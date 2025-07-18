document.addEventListener('DOMContentLoaded', () => {
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