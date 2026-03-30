/** AppHeader.js - Shared Branded Header with Progress Bar */
export default {
  props: {
    progress: { type: Number, default: 0 },
    title: { type: String, default: 'Préstamo' }
  },
  template: `
    <header class="sticky top-0 left-0 right-0 z-50 bg-[#0E4533] shadow-md flex flex-col h-[72px] px-6">
      <div class="flex-1 max-w-[1024px] w-full mx-auto flex items-center justify-between">
        <a href="#" class="flex items-center gap-2 no-underline">
          <img src="../brand-assest/wordmark.svg" alt="Abound" class="h-6 brightness-0 invert" />
        </a>
        <div class="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-white/10 rounded-full text-white/80 border border-white/10 backdrop-blur-md">
          {{ title }}
        </div>
      </div>
      <!-- Linear Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </header>
  `
};
