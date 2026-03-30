import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-8">

    <div class="flex flex-col gap-2">
      <h1 class="text-[28px] font-black text-charcoal tracking-tighter leading-snug">{{ content.title }}</h1>
      <a href="#" class="text-brand font-semibold text-sm hover:underline">{{ content.howItWorksText }}</a>
    </div>

    <form @submit.prevent="submitStep" class="flex flex-col gap-10">
      <!-- Slider Section -->
      <div>
        <label class="abound-label">{{ content.amountLabel }}</label>

        <!-- Large live amount — the hero element of this screen -->
        <div class="flex justify-center items-baseline gap-1 my-8">
          <span class="text-[64px] font-black text-[var(--color-brand)] tracking-tighter leading-none tabular-nums">{{ formatCurrencyDisplay(amount) }}</span>
        </div>

        <input
          type="range"
          v-model.number="amount"
          :min="content.amountMin"
          :max="content.amountMax"
          :step="content.amountStep"
          class="w-full h-2 bg-neutral-100 rounded-full appearance-none cursor-pointer"
          style="accent-color: #0E4533;"
        >
        <div class="flex justify-between mt-3 px-0.5">
          <span class="text-[11px] font-semibold text-neutral-400 tabular-nums">{{ formatCurrency(content.amountMin) }}</span>
          <span class="text-[11px] font-semibold text-neutral-400 tabular-nums">{{ formatCurrency(content.amountMax) }}</span>
        </div>
      </div>

      <!-- Term Length Selection -->
      <div class="flex flex-col gap-2">
        <label class="abound-label">{{ content.termLabel }}</label>
        <div class="relative">
          <select v-model.number="termMonths" class="abound-input appearance-none pr-10 font-bold text-lg">
            <option v-for="opt in content.termOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }} meses
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 20 20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 8l4 4 4-4"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Calculation Display Box — uses brand lime, not generic success green -->
      <div class="calc-result-box">
        <div class="text-[10px] font-bold text-[#3A5A2A] uppercase tracking-[0.18em]">{{ content.calculationLabel }}</div>
        <div class="text-[40px] font-black text-[var(--color-brand)] tracking-tighter leading-none tabular-nums">{{ formatCurrency(monthlyPayment) }}</div>
      </div>

      <button type="submit" class="abound-btn mt-2">
        {{ content.cta }}
      </button>
    </form>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepCalculator;
    
    // State
    const amount = ref(3000);
    const termMonths = ref(36);

    // Helpers
    const formatCurrency = (val) => {
      return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
      }).format(val);
    };

    const formatCurrencyDisplay = (val) => {
      return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(val);
    };

    // Math Engine Simulation (Standard PMT formula base-APR approximation)
    const monthlyPayment = computed(() => {
      const p = amount.value;
      const n = termMonths.value;
      
      // Implicit ~34.9% APR to match the 3000€/36mo = 136.63€ given in screenshots
      const r = content.apr / 12; 
      
      const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return Math.round(payment * 100) / 100; // Round to 2 decimals
    });

    const submitStep = () => {
      emit('next-step', { 
        step: 'calculator', 
        payload: { amount: amount.value, term: termMonths.value, monthlyPayment: monthlyPayment.value } 
      });
    };

    return {
      content,
      amount,
      termMonths,
      monthlyPayment,
      formatCurrency,
      formatCurrencyDisplay,
      submitStep
    };
  }
};
