import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-10">

    <!-- Success identity block — lime background check, brand-anchored -->
    <div class="flex flex-col items-center text-center gap-4">
      <!-- Lime check: uses the brand accent color, not a generic success green -->
      <div
        class="w-20 h-20 rounded-[20px] flex items-center justify-center"
        style="background: var(--color-lime);"
      >
        <svg class="w-9 h-9" fill="none" stroke="#0E4533" viewBox="0 0 24 24" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <p class="text-[13px] font-semibold text-neutral-500 mb-1">Hola {{ content.userName }}</p>
        <div class="flex justify-center gap-5 text-[11px] font-medium text-neutral-400">
          <span>ID: #{{ content.requestId }}</span>
          <span>·</span>
          <span>DNI: {{ content.userDni }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col gap-5 text-center">
      <h1 class="text-[30px] font-black text-[var(--color-charcoal)] tracking-tighter leading-snug">
        {{ content.title }}
      </h1>

      <!-- Description uses lime tint — on-brand, warm, not clinical green -->
      <p
        class="text-[14px] font-medium leading-relaxed p-5 rounded-2xl"
        style="background: rgba(212,241,155,0.3); color: #2D5016; border: 1.5px solid rgba(212,241,155,0.8);"
      >
        {{ content.description }}
      </p>

      <div class="flex flex-col gap-3 mt-2">
        <button class="abound-btn" style="background: #25D366;" onmouseover="this.style.background='#128C7E'" onmouseout="this.style.background='#25D366'">
          <i class="fa-brands fa-whatsapp text-xl"></i>
          {{ content.ctaWhatsapp }}
        </button>
        <button class="abound-btn">
          <i class="fa-solid fa-phone text-base"></i>
          {{ content.ctaCall }}
        </button>
      </div>
    </div>

    <!-- Summary — cleaner row style, consistent label hierarchy -->
    <div class="pt-8 border-t border-neutral-100">
      <p class="abound-label text-center mb-6">{{ content.summaryTitle }}</p>
      <div class="flex flex-col divide-y divide-neutral-100">
        <div class="flex justify-between items-center py-3.5">
          <span class="text-[12px] font-medium text-neutral-500">Importe</span>
          <span class="text-[14px] font-bold text-[var(--color-charcoal)]">3.000,00 €</span>
        </div>
        <div class="flex justify-between items-center py-3.5">
          <span class="text-[12px] font-medium text-neutral-500">Plazos</span>
          <span class="text-[14px] font-bold text-[var(--color-charcoal)]">36 meses</span>
        </div>
        <div class="flex justify-between items-center py-3.5">
          <span class="text-[12px] font-medium text-neutral-500">Cuota mensual</span>
          <span class="text-[14px] font-bold text-brand">136,63 €</span>
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
