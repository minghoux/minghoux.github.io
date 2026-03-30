import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] mt-4 md:mt-8">
    
    <div class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-neutral-200 w-full relative overflow-hidden">
      
      <h1 class="text-2xl md:text-3xl font-bold text-charcoal mb-8 tracking-tight">{{ content.title }}</h1>

      <div class="flex flex-col gap-3">
        <button 
          v-for="opt in content.options" 
          :key="opt.id"
          type="button"
          @click="selectOption(opt.id)"
          class="flex items-center gap-4 p-4 border-2 rounded-xl transition-all duration-200 text-left"
          :class="selectedId === opt.id ? 'border-brand bg-brand/5' : 'border-neutral-50 hover:border-neutral-100 hover:bg-neutral-50 active:scale-[0.99]'"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
            :class="selectedId === opt.id ? 'bg-brand text-white' : 'bg-neutral-100 text-neutral-400'"
          >
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <span class="font-bold text-sm" :class="selectedId === opt.id ? 'text-brand' : 'text-neutral-700'">
            {{ opt.label }}
          </span>
          <div v-show="selectedId === opt.id" class="ml-auto text-brand">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          </div>
        </button>
      </div>

    </div>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepHousing;
    const selectedId = ref(null);

    const selectOption = (id) => {
      selectedId.value = id;
      setTimeout(() => {
        emit('next-step', { 
          step: 'housing', 
          payload: { status: content.options.find(o => o.id === id).label } 
        });
      }, 300);
    };

    return {
      content,
      selectedId,
      selectOption
    };
  }
};
