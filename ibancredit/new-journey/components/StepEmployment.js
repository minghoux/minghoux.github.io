import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] flex flex-col gap-8">
    <h1 class="text-3xl font-black text-charcoal tracking-tighter leading-tight">{{ content.title }}</h1>

    <div class="flex flex-col gap-3">
      <button 
        v-for="opt in content.options" 
        :key="opt.id"
        type="button"
        @click="selectOption(opt.id)"
        class="flex items-center gap-4 p-5 border-2 rounded-2xl transition-all duration-200 text-left bg-white"
        :class="selectedId === opt.id ? 'border-brand bg-brand/5' : 'border-neutral-200 hover:border-neutral-300'"
      >
        <div 
          class="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors"
          :class="selectedId === opt.id ? 'bg-brand text-white' : 'bg-neutral-200 text-neutral-500'"
        >
           <i :class="opt.icon" class="text-xl"></i>
        </div>
        <span class="font-black text-sm uppercase tracking-tight" :class="selectedId === opt.id ? 'text-brand' : 'text-neutral-600'">
          {{ opt.label }}
        </span>
        <div v-show="selectedId === opt.id" class="ml-auto text-brand">
           <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        </div>
      </button>
    </div>

    <!-- Footer Help Section -->
    <div class="mt-8 py-8 border-t border-neutral-200 text-center">
      <p class="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">¿Necesitas ayuda?</p>
      <a href="#" class="text-sm font-black text-brand hover:underline">FAQ & Ayuda</a>
    </div>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepEmployment;
    const selectedId = ref(null);

    const selectOption = (id) => {
      selectedId.value = id;
      setTimeout(() => {
        emit('next-step', { 
          step: 'employment', 
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
