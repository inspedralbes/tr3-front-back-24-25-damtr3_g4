<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
    <!-- Stadium Background -->
    <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center" style="background-image: url('/stadium.jpg');">
    </div>

    <canvas ref="fireCanvas" class="absolute inset-0 z-10 w-full h-full"></canvas>

    <!-- Navbar -->
    <nav class="p-6 bg-gray-800/90 backdrop-blur-md fixed w-full z-50">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition duration-300">
          Football Game
        </div>
        <div class="space-x-6 hidden md:flex">
          <a href="#features" class="hover:text-yellow-400 transition duration-300">Features</a>
          <a href="#about" class="hover:text-yellow-400 transition duration-300">About</a>
          <a href="#contact" class="hover:text-yellow-400 transition duration-300">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="flex items-center justify-center h-screen relative z-20">
      <div class="text-center px-4">
        <h1 class="text-6xl font-bold mb-6 animate-fade-in">
          Experience the Ultimate <span class="text-yellow-400">2D Football</span> Game
        </h1>
        <p class="text-xl mb-8 text-gray-300 animate-fade-in delay-100">
          Dive into the action-packed world of 2D football. Compete, strategize, and win!
        </p>
        <a href="#download"
          class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 animate-bounce">
          Play Now
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-800/90 relative z-20">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12 animate-fade-in">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="text-center bg-gray-700/50 p-8 rounded-lg hover:bg-gray-700/70 transition duration-300 animate-fade-in delay-200">
            <div class="text-5xl mb-4">⚽</div>
            <h3 class="text-2xl font-bold mb-4">Realistic Gameplay</h3>
            <p class="text-gray-300">Experience smooth and realistic 2D football mechanics.</p>
          </div>
          <div
            class="text-center bg-gray-700/50 p-8 rounded-lg hover:bg-gray-700/70 transition duration-300 animate-fade-in delay-300">
            <div class="text-5xl mb-4">🏆</div>
            <h3 class="text-2xl font-bold mb-4">Compete Globally</h3>
            <p class="text-gray-300">Challenge players from around the world in real-time matches.</p>
          </div>
          <div
            class="text-center bg-gray-700/50 p-8 rounded-lg hover:bg-gray-700/70 transition duration-300 animate-fade-in delay-400">
            <div class="text-5xl mb-4">🎮</div>
            <h3 class="text-2xl font-bold mb-4">Easy Controls</h3>
            <p class="text-gray-300">Intuitive controls designed for both casual and competitive players.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section id="download" class="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative z-20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8 animate-fade-in">Ready to Play?</h2>
        <p class="text-xl mb-8 text-gray-300 animate-fade-in delay-100">
          Join the fun and start your football journey today!
        </p>
        <a href="#"
          class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 animate-bounce">
          Download Now
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="p-6 bg-gray-800/90 backdrop-blur-md text-center relative z-20">
      <p class="text-gray-400">© 2023 Football Game. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const fireCanvas = ref(null);

onMounted(() => {
  const canvas = fireCanvas.value;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  // Particle Class for Fire
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = `hsl(${Math.random() * 20 + 10}, 100%, 50%)`; // Warm colors (red, orange, yellow)
      this.velocity = {
        x: (Math.random() - 0.5) * 0.5, // Slight horizontal movement
        y: -(Math.random() * 2 + 1), // Upward movement
      };
      this.radius = Math.random() * 10 + 5; // Random size
      this.opacity = 1;
      this.life = Math.random() * 100 + 50; // Lifespan of the particle
    }

    // Update particle position and opacity
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.opacity -= 0.01; // Fade out over time
      this.life--; // Reduce lifespan
    }

    // Draw particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1; // Reset opacity
    }
  }

  // Create particles at the bottom of the screen
  function createParticles() {
    const x = Math.random() * canvas.width; // Random horizontal position
    const y = canvas.height; // Bottom of the screen
    for (let i = 0; i < 5; i++) { // Create multiple particles at once
      particles.push(new Particle(x, y));
    }
  }

  // Animate particles
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update particles
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();

      // Remove particles that have faded out or reached the end of their lifespan
      if (particle.opacity <= 0 || particle.life <= 0) {
        particles.splice(index, 1);
      }
    });

    // Continuously create new particles
    createParticles();
  }

  // Resize canvas on window resize
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Event listeners
  window.addEventListener('resize', resizeCanvas);

  // Start animation
  animate();

  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
  });
});
</script>

<style scoped>
/* Custom Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}
</style>