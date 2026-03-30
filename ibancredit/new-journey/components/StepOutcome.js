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
         <p class="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Hola {{ content.userName }}</p>
         <div class="flex justify-center gap-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
            <span>ID: #{{ content.requestId }}</span>
            <span>DNI: {{ content.userDni }}</span>
         </div>
       </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col gap-6 text-center">
      <h1 class="text-4xl font-black text-charcoal tracking-tighter leading-tight">
        {{ content.title }}
      </h1>
      
      <p class="text-base font-bold text-success leading-relaxed bg-success/5 p-6 rounded-2xl border border-success/10">
        {{ content.description }}
      </p>

      <div class="flex flex-col gap-4 mt-4">
        <button class="abound-btn bg-[#25D366] hover:bg-[#128C7E] flex gap-3">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.412 2.503 1.112 3.485l-1.145 4.18 4.283-1.124c.937.512 2.011.807 3.156.807 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.766-5.766zm3.328 8.167c-.145.413-.746.762-1.026.812-.28.05-.53.078-1.503-.314-1.228-.496-2.023-1.742-2.084-1.822-.062-.081-.502-.667-.502-1.272 0-.606.314-.903.428-1.027.114-.124.25-.155.333-.155s.166 0 .239.006c.078.005.183-.029.287.22.103.25.353.86.383.921.031.061.05.132.011.211-.039.079-.059.13-.119.199-.061.07-.123.155-.173.209-.061.06-.124.125-.054.246.069.121.311.512.667.828.455.405.84.531.958.589.119.058.188.049.259-.033.07-.082.302-.351.383-.472s.161-.101.272-.059c.112.042.704.332.825.393.121.061.202.091.231.14.03.05.03.228-.115.641z"></path></svg>
          {{ content.ctaWhatsapp }}
        </button>
        <button class="abound-btn">
          {{ content.ctaCall }}
        </button>
      </div>
    </div>

    <div class="mt-8 pt-8 border-t border-neutral-100 px-2">
      <h3 class="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-8 text-center">{{ content.summaryTitle }}</h3>
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-end border-b border-neutral-50 pb-4">
          <span class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Importe</span>
          <span class="text-sm font-black text-charcoal">3.000,00 €</span>
        </div>
        <div class="flex justify-between items-end border-b border-neutral-50 pb-4">
          <span class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Plazos</span>
          <span class="text-sm font-black text-charcoal">36 meses</span>
        </div>
        <div class="flex justify-between items-end border-b border-neutral-50 pb-4">
          <span class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Cuota mensual</span>
          <span class="text-sm font-black text-success">136,63 €</span>
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
