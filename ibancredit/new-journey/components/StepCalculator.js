import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] flex flex-col gap-8">
    
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-black text-charcoal tracking-tighter leading-tight">{{ content.title }}</h1>
      <a href="#" class="text-brand font-bold text-sm hover:underline">{{ content.howItWorksText }}</a>
    </div>

    <form @submit.prevent="submitStep" class="flex flex-col gap-10">
      <!-- Slider Section -->
      <div>
        <label class="block text-sm font-black text-neutral-400 uppercase tracking-widest mb-6">{{ content.amountLabel }}</label>
        
        <div class="flex justify-center items-baseline gap-1 mb-10">
          <span class="text-6xl font-black text-brand tracking-tighter">{{ formatCurrencyDisplay(amount) }}</span>
        </div>

        <input 
          type="range" 
          v-model.number="amount"
          :min="content.amountMin" 
          :max="content.amountMax" 
          :step="content.amountStep"
          class="w-full h-3 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-brand"
        >
        <div class="flex justify-between text-xs font-black text-neutral-300 mt-4 px-1 uppercase tracking-widest">
          <span>{{ formatCurrency(content.amountMin) }}</span>
          <span>{{ formatCurrency(content.amountMax) }}</span>
        </div>
      </div>

      <!-- Term Length Selection -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-black text-neutral-400 uppercase tracking-widest px-1">{{ content.termLabel }}</label>
        <div class="relative">
          <select v-model.number="termMonths" class="abound-input appearance-none pr-10 font-black text-xl">
            <option v-for="opt in content.termOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }} meses
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
          </div>
        </div>
      </div>

      <!-- Calculation Display Box -->
      <div class="bg-success/5 border border-success/10 rounded-2xl p-6 flex flex-col gap-1 items-center shadow-inner">
        <div class="text-xs font-black text-success uppercase tracking-[0.2em]">{{ content.calculationLabel }}</div>
        <div class="text-4xl font-black text-success tracking-tighter">{{ formatCurrency(monthlyPayment) }}</div>
      </div>

      <button type="submit" class="abound-btn mt-4">
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
