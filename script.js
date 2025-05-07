document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const themeSelect = document.getElementById('theme');
  const speedSelect = document.getElementById('animation-speed');
  const savePrefsBtn = document.getElementById('save-prefs');
  const animateBtn = document.getElementById('animate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const animatedBox = document.getElementById('animated-box');
  const galleryImages = document.querySelectorAll('.gallery-img');
  
  // Animation types
  const animations = ['bounce', 'spin', 'pulse'];
  let currentAnimationIndex = 0;
  
  // Load saved preferences
  loadPreferences();
  
  // Event listeners
  savePrefsBtn.addEventListener('click', savePreferences);
  animateBtn.addEventListener('click', triggerAnimation);
  resetBtn.addEventListener('click', resetAnimation);
  
  // Add hover effect to gallery images
  galleryImages.forEach(img => {
      img.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.05)';
          img.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
      });
      
      img.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
          img.style.boxShadow = 'none';
      });
      
      // Click animation
      img.addEventListener('click', () => {
          img.classList.add('pulse');
          setTimeout(() => {
              img.classList.remove('pulse');
          }, 1000);
      });
  });
  
  // Function to load preferences from localStorage
  function loadPreferences() {
      const savedTheme = localStorage.getItem('themePreference');
      const savedSpeed = localStorage.getItem('animationSpeed');
      
      if (savedTheme) {
          themeSelect.value = savedTheme;
          document.body.className = savedTheme;
      }
      
      if (savedSpeed) {
          speedSelect.value = savedSpeed;
      }
  }
  
  // Function to save preferences to localStorage
  function savePreferences() {
      const theme = themeSelect.value;
      const speed = speedSelect.value;
      
      localStorage.setItem('themePreference', theme);
      localStorage.setItem('animationSpeed', speed);
      
      // Apply theme immediately
      document.body.className = theme;
      
      // Show confirmation
      alert('Preferences saved!');
  }
  
  // Function to trigger animation
  function triggerAnimation() {
      // Remove any existing animation classes
      animatedBox.className = 'animated-box';
      
      // Get current animation
      const animation = animations[currentAnimationIndex];
      const speed = speedSelect.value;
      
      // Apply animation and speed classes
      animatedBox.classList.add(animation, speed);
      
      // Move to next animation for next click
      currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
  }
  
  // Function to reset animation
  function resetAnimation() {
      animatedBox.className = 'animated-box';
      currentAnimationIndex = 0;
  }
  
  // Apply theme when changed (without saving)
  themeSelect.addEventListener('change', function() {
      document.body.className = this.value;
  });
});