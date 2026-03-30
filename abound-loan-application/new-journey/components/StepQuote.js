import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full flex flex-col gap-10">
    
    <!-- Referral Header Transition -->
    <div class="w-full bg-[#FCFCE9] border-1.5 border-[#E7E7D5] rounded-2xl py-3 px-5 flex items-center justify-center gap-3 animate-[fadeSlideIn_400ms_cubic-bezier(0.16,1,0.3,1)_both]">
      <div class="flex items-center gap-1.5 grayscale opacity-70">
        <div class="w-4 h-4 bg-charcoal rounded-[3px] flex items-center justify-center text-[8px] text-white font-bold">C</div>
        <span class="text-[12px] font-bold tracking-tight text-charcoal">ClearScore</span>
      </div>
      <div class="text-charcoal/20">
        <i class="fa-solid fa-arrow-right text-[10px]"></i>
      </div>
      <div class="flex items-center gap-1.5">
        <img src="../../brand-assest/logo.svg" alt="Abound" class="h-4 w-4" />
        <span class="text-[13px] font-black tracking-tight text-brand uppercase">Abound</span>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="animate-[fadeSlideIn_320ms_200ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-10">
      <!-- Header Section -->
      <div class="flex flex-col gap-5">
        <div class="flex justify-between items-start">
          <div class="flex flex-col gap-3">
            <h2 class="text-[13px] font-bold text-brand/60 uppercase tracking-widest">{{ content.header }}</h2>
          </div>
          <div class="bg-lime text-brand font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
            {{ content.badge }}
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="text-[32px] font-black text-charcoal tracking-tight leading-tight">{{ content.title }}</h1>
          <p class="text-[17px] text-charcoal/70 leading-relaxed font-medium">
            {{ content.subtitle }}
          </p>
        </div>
      </div>

    <!-- Calculator Section -->
    <form @submit.prevent="submitStep" class="flex flex-col gap-12">
      <div class="flex flex-col gap-8">
        <div>
          <label class="abound-label text-charcoal/40 mb-3">{{ content.stats.amountLabel }}</label>
          <div class="flex justify-center items-baseline gap-1 mb-8">
            <span class="text-[64px] font-black text-brand tracking-tighter leading-none tabular-nums">
              {{ formatCurrencyDisplay(amount) }}
            </span>
          </div>
          <input
            type="range"
            v-model.number="amount"
            :min="content.amountMin"
            :max="content.amountMax"
            :step="content.amountStep"
            class="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer"
          >
          <div class="flex justify-between mt-4 px-1">
            <span class="text-[12px] font-bold text-charcoal/30 tabular-nums">{{ formatCurrency(content.amountMin) }}</span>
            <span class="text-[12px] font-bold text-charcoal/30 tabular-nums">{{ formatCurrency(content.amountMax) }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="abound-label text-charcoal/40">{{ content.stats.termLabel }}</label>
            <div class="relative">
              <select v-model.number="termMonths" class="abound-input appearance-none pr-10 font-bold text-lg border-charcoal/10">
                <option v-for="opt in content.termOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-charcoal/30">
                <i class="fa-solid fa-chevron-down text-sm"></i>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="abound-label text-charcoal/40">{{ content.stats.monthlyLabel }}</label>
            <div class="abound-input flex items-center bg-brand/5 border-brand/10 font-black text-xl text-brand tabular-nums">
              {{ formatCurrency(monthlyPayment) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Info — Improved contrast against background -->
      <div class="bg-brand/[0.04] border-1.5 border-brand/10 rounded-[14px] p-5 flex flex-col gap-1">
        <label class="abound-label text-brand/60">{{ content.stats.aprLabel }}</label>
        <div class="text-[20px] font-black text-brand">{{ (content.apr * 100).toFixed(1) }}%</div>
      </div>

      <div class="flex flex-col gap-4">
        <p class="text-[12px] text-charcoal/40 leading-relaxed text-center italic">
          {{ content.legal }}
        </p>
        <abound-button type="submit">
          {{ content.cta }}
        </abound-button>
      </div>
    </form>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepQuote;
    
    // State
    const amount = ref(3000);
    const termMonths = ref(36);

    // Helpers
    const formatCurrency = (val) => {
      return new Intl.NumberFormat('en-GB', { 
        style: 'currency', 
        currency: 'GBP',
        maximumFractionDigits: 0
      }).format(val);
    };

    const formatCurrencyDisplay = (val) => {
      return new Intl.NumberFormat('en-GB', { 
        style: 'currency', 
        currency: 'GBP',
        maximumFractionDigits: 0
      }).format(val);
    };

    const monthlyPayment = computed(() => {
      const p = amount.value;
      const n = termMonths.value;
      const r = content.apr / 12; 
      const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return Math.round(payment * 100) / 100;
    });

    const submitStep = () => {
      emit('next-step', { 
        step: 'quote', 
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
