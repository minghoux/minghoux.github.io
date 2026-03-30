import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-6">

    <!-- Loan Summary Strip — refined, no bottom-border hack -->
    <div class="loan-summary-strip">
      <div class="loan-summary-stat">
        <span class="stat-label">Importe</span>
        <span class="stat-value">3.000€</span>
      </div>
      <div class="divider"></div>
      <div class="loan-summary-stat">
        <span class="stat-label">Plazos</span>
        <span class="stat-value">36</span>
      </div>
      <div class="divider"></div>
      <div class="loan-summary-stat">
        <span class="stat-label">Cuota</span>
        <span class="stat-value">136,63€</span>
      </div>
    </div>

    <div class="flex flex-col gap-1.5">
      <h1 class="text-[28px] font-black text-charcoal tracking-tighter leading-snug">{{ content.title }}</h1>
      <a href="#" class="text-brand font-semibold text-sm hover:underline">{{ content.howItWorksText }}</a>
    </div>

    <div class="flex flex-col gap-5">
      <!-- Search bar -->
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          class="abound-input pl-12"
          :placeholder="content.searchPlaceholder"
        >
        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <!-- Bank Grid — rounded-square icons, consistent with Motivo -->
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="bank in filteredBanks"
          :key="bank.id"
          @click="selectBank(bank.id)"
          class="flex flex-col items-center justify-center gap-3 p-4 border-[1.5px] rounded-2xl h-[108px] transition-all bg-white"
          :class="selectedBank === bank.id ? 'border-brand/40 bg-brand/[0.03]' : 'border-[#E2E8E2] hover:border-[#C5D3C5]'"
        >
          <div
            class="select-icon-square"
            :class="selectedBank === bank.id ? 'active' : 'idle'"
          >
            <i class="fa-solid fa-building-columns"></i>
          </div>
          <span
            class="text-[11px] font-semibold text-center px-1"
            :class="selectedBank === bank.id ? 'text-brand' : 'text-neutral-600'"
          >{{ bank.name }}</span>
        </button>
      </div>
    </div>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepBancos;
    const searchQuery = ref('');
    const selectedBank = ref(null);

    const filteredBanks = computed(() => {
      return content.banks.filter(b => b.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });

    const selectBank = (id) => {
      selectedBank.value = id;
      setTimeout(() => {
        emit('next-step', { step: 'bancos', payload: { bank: id } });
      }, 300);
    };

    return {
      content,
      searchQuery,
      selectedBank,
      filteredBanks,
      selectBank
    };
  }
};
