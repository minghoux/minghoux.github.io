/** AppHeader.js - Shared Branded Header with Progress Bar */
export default {
  props: {
    progress: { type: Number, default: 0 },
    title: { type: String, default: 'Préstamo' }
  },
  template: `
  <header class="sticky top-0 left-0 right-0 z-50 bg-[#0E4533] border-b border-black/10 flex flex-col h-[72px] px-6">
    <div class="flex-1 max-w-[1024px] w-full mx-auto flex items-center justify-center">
      <a href="#" class="no-underline">
        <img src="../../../brand-assest/wordmark.svg" alt="Abound" class="h-6 brightness-0 invert" />
      </a>
    </div>
    <!-- Linear Progress Bar -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
  </header>
  `
};
