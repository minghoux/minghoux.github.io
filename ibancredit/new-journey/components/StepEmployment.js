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
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <span class="font-bold text-sm" :class="selectedId === opt.id ? 'text-brand' : 'text-neutral-700'">
            {{ opt.label }}
          </span>
          <div v-show="selectedId === opt.id" class="ml-auto text-brand">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          </div>
        </button>
      </div>

      <!-- Footer Help Section -->
      <div class="mt-10 pt-6 border-t border-neutral-100 text-center">
        <p class="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">¿Necesitas ayuda?</p>
        <a href="#" class="text-sm font-bold text-brand hover:underline">Consulta nuestras Preguntas Frecuentes</a>
      </div>

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
