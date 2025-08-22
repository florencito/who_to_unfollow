export function createHeader(): string {
  return `
    <div class="container mx-auto px-4 py-8 lg:py-12">
      <div class="text-center">
        <!-- Logo and Brand -->
        <div class="flex justify-center items-center mb-6 animate-slide-up">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25 animate-glow">
              <span class="text-white font-bold text-xl md:text-2xl">📊</span>
            </div>
            <div class="text-left">
              <h1 class="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-pink-800 to-purple-900 bg-clip-text text-transparent animate-fade-in">Who to Unfollow</h1>
              <div class="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-slide-up stagger-delay-1"></div>
            </div>
          </div>
        </div>

        <!-- Tagline -->
        <div class="max-w-3xl mx-auto mb-8 animate-slide-up stagger-delay-2">
          <h2 class="heading-secondary mb-4">
            Analyze your Instagram followers privately
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Find who doesn't follow back, discover mutual followers, and identify your fans. 100% client-side processing - your data never leaves your browser.
          </p>
        </div>

        <!-- Feature Pills -->
        <div class="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up stagger-delay-3">
          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            100% Private
          </span>
          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            Easy Export
          </span>
          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
            </svg>
            Lightning Fast
          </span>
          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-pink-100 text-pink-800 border border-pink-200">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
            </svg>
            Instagram Data
          </span>
        </div>

        <!-- Back to Hub Link -->
        <div class="animate-slide-up stagger-delay-4 mb-4">
          <a 
            href="https://florenapps.online" 
            class="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to florenApps
          </a>
        </div>

        <!-- CTA Section -->
        <div class="animate-slide-up stagger-delay-4">
          <p class="text-gray-500 mb-6">Upload your Instagram data export to get started</p>
          <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  `;
}

// Add animation utilities
export function initHeaderAnimations(): void {
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
      }
    });
  }, observerOptions);

  // Observe elements that should animate
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
