import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] flex flex-col gap-10">
    
    <!-- User Branding Header -->
    <div class="flex flex-col items-center text-center gap-4">
       <div class="w-20 h-20 bg-success rounded-full flex items-center justify-center text-white">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
       </div>
       <div>
         <p class="text-xs font-black text-neutral-600 uppercase tracking-[0.2em] mb-2">Hola {{ content.userName }}</p>
         <div class="flex justify-center gap-6 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
            <span>ID: #{{ content.requestId }}</span>
            <span>DNI: {{ content.userDni }}</span>
         </div>
       </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col gap-6 text-center">
      <h1 class="text-4xl font-black text-[var(--color-charcoal)] tracking-tighter leading-tight">
        {{ content.title }}
      </h1>
      
      <p class="text-base font-bold text-[var(--color-success-text)] leading-relaxed bg-success/5 p-6 rounded-2xl border border-success/10">
        {{ content.description }}
      </p>

      <div class="flex flex-col gap-4 mt-4">
        <button class="abound-btn bg-[#25D366] hover:bg-[#128C7E] flex gap-3 shadow-none">
          <i class="fa-brands fa-whatsapp text-2xl"></i>
          {{ content.ctaWhatsapp }}
        </button>
        <button class="abound-btn flex gap-3 shadow-none">
          <i class="fa-solid fa-phone text-lg"></i>
          {{ content.ctaCall }}
        </button>
      </div>
    </div>

    <div class="mt-8 pt-8 border-t border-neutral-200 px-2">
      <h3 class="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-8 text-center">{{ content.summaryTitle }}</h3>
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-end border-b border-neutral-200 pb-4">
          <span class="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Importe</span>
          <span class="text-sm font-black text-[var(--color-charcoal)]">3.000,00 €</span>
        </div>
        <div class="flex justify-between items-end border-b border-neutral-200 pb-4">
          <span class="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Plazos</span>
          <span class="text-sm font-black text-[var(--color-charcoal)]">36 meses</span>
        </div>
        <div class="flex justify-between items-end border-b border-neutral-200 pb-4">
          <span class="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Cuota mensual</span>
          <span class="text-sm font-black text-[var(--color-success-text)]">136,63 €</span>
        </div>
      </div>
    </div>
  </div>
`;

export default {
  template,
  setup() {
    const content = JOURNEY_CONTENT.stepOutcome;
    return { content };
  }
};
