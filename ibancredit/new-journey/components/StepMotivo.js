import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] mt-4 md:mt-8">
    
    <div class="mb-6 flex items-center md:hidden">
        <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest">Motivo</span>
    </div>

    <!-- Surface Card -->
    <div class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-neutral-200 w-full relative overflow-hidden">
      
      <h1 class="text-2xl md:text-3xl font-bold text-charcoal mb-8 tracking-tight">{{ content.title }}</h1>

      <form @submit.prevent="submitStep" class="flex flex-col gap-6">
        
        <!-- Selection Grid -->
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="opt in content.options" 
            :key="opt.id"
            type="button"
            @click="selectOption(opt.id)"
            class="flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-2xl transition-all duration-200 group h-32"
            :class="selectedId === opt.id ? 'border-brand bg-brand/5' : 'border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50 active:scale-[0.98]'"
          >
            <!-- Minimal Icon Placeholder (Replacing with unique Abound style SVGs in a real build) -->
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              :class="selectedId === opt.id ? 'bg-brand text-white' : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-500'"
            >
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            
            <span class="text-xs font-bold text-center tracking-tight leading-tight" :class="selectedId === opt.id ? 'text-brand' : 'text-neutral-600'">
              {{ opt.label }}
            </span>
          </button>
        </div>

        <!-- Custom Input Area -->
        <div class="mt-4">
          <label class="block text-sm font-semibold text-charcoal mb-2">{{ content.customLabel }}</label>
          <div class="relative group">
            <input 
              type="text" 
              v-model="customMotivo" 
              class="abound-input pr-12 focus:border-brand transition-colors" 
              placeholder="..."
              @input="selectedId = null"
            >
            <button 
               type="submit" 
               v-show="customMotivo.length > 2"
               class="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>

        <button 
          v-if="selectedId" 
          type="submit" 
          class="abound-btn mt-4 animate-[fadeSlideIn_200ms_linear_both]"
        >
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
    const content = JOURNEY_CONTENT.stepMotivo;
    const selectedId = ref(null);
    const customMotivo = ref('');

    const selectOption = (id) => {
      selectedId.ref = id;
      selectedId.value = id;
      customMotivo.value = '';
    };

    const submitStep = () => {
      if (selectedId.value || customMotivo.value) {
        emit('next-step', { 
          step: 'motivo', 
          payload: { 
            motivo: selectedId.value ? content.options.find(o => o.id === selectedId.value).label : customMotivo.value 
          } 
        });
      }
    };

    return {
      content,
      selectedId,
      customMotivo,
      selectOption,
      submitStep
    };
  }
};
