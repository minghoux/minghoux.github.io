import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] mt-4 md:mt-8">
    
    <div class="mb-6 flex items-center md:hidden">
        <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest">Calculadora</span>
    </div>

    <!-- Surface Card -->
    <div class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-neutral-200 w-full relative overflow-hidden">
      
      <!-- Header -->
      <div class="flex flex-col gap-2 mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">{{ content.title }}</h1>
        <a href="#" class="text-brand font-semibold text-sm hover:underline">{{ content.howItWorksText }}</a>
      </div>

      <form @submit.prevent="submitStep" class="flex flex-col gap-8">
        
        <!-- Slider Section -->
        <div>
          <label class="block text-sm font-semibold text-charcoal mb-4">{{ content.amountLabel }}</label>
          
          <div class="flex justify-center items-baseline gap-1 mb-6">
            <span class="text-5xl font-black text-brand tracking-tighter">{{ formatCurrencyDisplay(amount) }}</span>
          </div>

          <input 
            type="range" 
            v-model.number="amount"
            :min="content.amountMin" 
            :max="content.amountMax" 
            :step="content.amountStep"
            class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand"
          >
          <div class="flex justify-between text-xs font-semibold text-neutral-400 mt-2 px-1">
            <span>{{ formatCurrency(content.amountMin) }}</span>
            <span>{{ formatCurrency(content.amountMax) }}</span>
          </div>
        </div>

        <!-- Term Length Selection -->
        <div>
          <label class="block text-sm font-semibold text-charcoal mb-1.5">{{ content.termLabel }}</label>
          <div class="relative">
            <select v-model.number="termMonths" class="abound-input appearance-none pr-10 font-bold text-lg bg-neutral-50 border-neutral-200 focus:bg-white focus:ring-4 focus:ring-brand/10 transition-shadow transition-colors">
              <option v-for="opt in content.termOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </div>
          </div>
        </div>

        <!-- Calculation Display Box -->
        <div class="bg-success-bg border border-success/20 rounded-xl p-5 flex items-center justify-between shadow-inner">
          <div class="text-sm font-bold text-success">{{ content.calculationLabel }}</div>
          <div class="text-2xl font-black text-success">{{ formatCurrency(monthlyPayment) }}</div>
        </div>

        <button type="submit" class="abound-btn mt-2">
          {{ content.cta }}
        </button>

      </form>
    </div>
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
