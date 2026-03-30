import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_400ms_ease-out_both] mt-4">
    
    <!-- User Branding Header -->
    <div class="flex flex-col items-center mb-8 text-center">
       <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-success/20">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
       </div>
       <p class="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">Hola {{ content.userName }}</p>
       <div class="flex gap-4 text-[10px] font-bold text-neutral-400">
          <span>Solicitud: #{{ content.requestId }}</span>
          <span>DNI: {{ content.userDni }}</span>
       </div>
    </div>

    <!-- Surface Card -->
    <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200 w-full relative overflow-hidden text-center">
      
      <h1 class="text-2xl md:text-3xl font-black text-charcoal mb-4 tracking-tighter leading-tight">
        {{ content.title }}
      </h1>
      
      <div class="bg-success-bg border border-success/10 rounded-2xl p-6 mb-8">
        <p class="text-sm font-bold text-success leading-relaxed">
          {{ content.description }}
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <button class="abound-btn bg-[#25D366] hover:bg-[#128C7E] flex gap-3">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.412 2.503 1.112 3.485l-1.145 4.18 4.283-1.124c.937.512 2.011.807 3.156.807 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.766-5.766zm3.328 8.167c-.145.413-.746.762-1.026.812-.28.05-.53.078-1.503-.314-1.228-.496-2.023-1.742-2.084-1.822-.062-.081-.502-.667-.502-1.272 0-.606.314-.903.428-1.027.114-.124.25-.155.333-.155s.166 0 .239.006c.078.005.183-.029.287.22.103.25.353.86.383.921.031.061.05.132.011.211-.039.079-.059.13-.119.199-.061.07-.123.155-.173.209-.061.06-.124.125-.054.246.069.121.311.512.667.828.455.405.84.531.958.589.119.058.188.049.259-.033.07-.082.302-.351.383-.472s.161-.101.272-.059c.112.042.704.332.825.393.121.061.202.091.231.14.03.05.03.228-.115.641z"></path></svg>
          {{ content.ctaWhatsapp }}
        </button>
        <button class="abound-btn bg-brand">
          {{ content.ctaCall }}
        </button>
      </div>

      <div class="mt-12 pt-8 border-t border-neutral-100">
        <h3 class="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6">{{ content.summaryTitle }}</h3>
        <div class="grid grid-cols-2 gap-y-4 text-left">
          <div class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Importe</div>
          <div class="text-sm font-bold text-charcoal text-right">3.000,00 €</div>
          <div class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Plazos</div>
          <div class="text-sm font-bold text-charcoal text-right">36 meses</div>
          <div class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Cuota mensual</div>
          <div class="text-sm font-bold text-charcoal text-right">136,63 €</div>
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
