export function createFooter(): string {
  return `
    <div class="bg-white/50 backdrop-blur-sm border-t border-white/20">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center">
          <!-- Instagram Analyzer Info -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Instagram Follower Analyzer</h3>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Analyze your Instagram followers privately and securely. Part of the florenApps ecosystem - 
              privacy-friendly mini apps that solve boring tasks fast.
            </p>
          </div>

          <!-- Privacy highlights -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h4 class="font-medium text-gray-800 mb-1">100% Private</h4>
              <p class="text-sm text-gray-600">All processing in your browser</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-gray-800 mb-1">Detailed Analysis</h4>
              <p class="text-sm text-gray-600">Followers, mutuals, and fans</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h4 class="font-medium text-gray-800 mb-1">Easy Export</h4>
              <p class="text-sm text-gray-600">CSV downloads and clipboard</p>
            </div>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap justify-center items-center gap-6 mb-6 text-sm">
            <a href="https://florenapps.com" class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
              🏠 florenApps Hub
            </a>
            <a href="https://qr.florenapps.online" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              📱 QR Generator
            </a>
            <a href="https://drinkmaster.florenapps.online" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              🍻 DrinkMaster
            </a>
            <a href="https://github.com/floren/florenapps-hub/issues" class="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              💡 Suggest Feature
            </a>
          </div>

          <!-- Privacy Notice -->
          <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
            <div class="flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span class="font-semibold text-green-800">Privacy Guaranteed</span>
            </div>
            <p class="text-sm text-green-700">
              Your Instagram data is processed entirely in your browser. No data is sent to any server. 
              Your privacy is our top priority.
            </p>
          </div>

          <!-- Stats -->
          <div class="flex justify-center items-center gap-8 mb-6 text-xs text-gray-500">
            <span class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Client-Side Only
            </span>
            <span class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
              </svg>
              Lightning Fast
            </span>
            <span class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              Open Source
            </span>
          </div>

          <!-- Copyright -->
          <div class="border-t border-gray-200/50 pt-6">
            <p class="text-xs text-gray-500">
              © 2024 florenApps. Made with ❤️ by 
              <a href="https://github.com/floren" class="text-primary-600 hover:text-primary-700 font-medium">
                Floren
              </a>
              . Privacy-friendly mini apps.
            </p>
            <div class="mt-2 flex justify-center items-center gap-4 text-xs text-gray-400">
              <span>Open Source</span>
              <span>•</span>
              <span>Privacy First</span>
              <span>•</span>
              <span>No Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Footer functions
export function initFooterFunctions(): void {
  // Add any footer-specific interactions here
  // For now, just basic link analytics tracking
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target?.closest('a') as HTMLAnchorElement;
    if (link && link.href && (window as any).va) {
      const linkText = link.textContent?.trim();
      if (linkText && !linkText.includes('github.com')) {
        (window as any).va('track', 'Footer Link Click', { link: linkText });
      }
    }
  });
}
