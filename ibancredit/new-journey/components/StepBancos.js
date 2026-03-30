import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] flex flex-col gap-6">
    
    <!-- Summary Header -->
    <div class="bg-brand text-white rounded-2xl p-6 flex justify-around items-center shadow-lg shadow-brand/10">
      <div class="flex flex-col items-center">
        <span class="text-[10px] uppercase tracking-[0.2em] font-black opacity-60 mb-1">Importe</span>
        <span class="text-sm font-black">3.000€</span>
      </div>
      <div class="w-px h-10 bg-white/10"></div>
      <div class="flex flex-col items-center">
        <span class="text-[10px] uppercase tracking-[0.2em] font-black opacity-60 mb-1">Plazos</span>
        <span class="text-sm font-black">36</span>
      </div>
      <div class="w-px h-10 bg-white/10"></div>
      <div class="flex flex-col items-center">
        <span class="text-[10px] uppercase tracking-[0.2em] font-black opacity-60 mb-1">Cuota</span>
        <span class="text-sm font-black">136,63€</span>
      </div>
    </div>

    <div class="flex flex-col gap-2 mb-2">
      <h1 class="text-3xl font-black text-charcoal tracking-tighter leading-tight">{{ content.title }}</h1>
      <a href="#" class="text-brand font-bold text-xs uppercase tracking-wider hover:underline">{{ content.howItWorksText }}</a>
    </div>

    <div class="space-y-6">
      <!-- Search bar -->
      <div class="relative">
        <input 
          type="text" 
          v-model="searchQuery" 
          class="abound-input pl-12" 
          :placeholder="content.searchPlaceholder"
        >
        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <!-- Bank Grid -->
      <div class="grid grid-cols-2 gap-3">
        <button 
          v-for="bank in filteredBanks" 
          :key="bank.id"
          @click="selectBank(bank.id)"
          class="flex flex-col items-center justify-center p-4 border-2 rounded-2xl h-28 transition-all shadow-sm shadow-neutral-100"
          :class="selectedBank === bank.id ? 'border-brand bg-brand/5' : 'border-neutral-50 hover:bg-neutral-50'"
        >
          <div class="w-14 h-8 bg-neutral-50 rounded mb-3 flex items-center justify-center text-[10px] font-black text-neutral-300 uppercase tracking-tighter">
            {{ bank.name }}
          </div>
          <span class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{{ bank.name }}</span>
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
