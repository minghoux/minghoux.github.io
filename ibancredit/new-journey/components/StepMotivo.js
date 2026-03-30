import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] flex flex-col gap-8">
    <h1 class="text-3xl font-black text-charcoal tracking-tighter leading-tight">{{ content.title }}</h1>

    <form @submit.prevent="submitStep" class="flex flex-col gap-8">
      <!-- Selection Grid -->
      <div class="grid grid-cols-2 gap-3">
        <button 
          v-for="opt in content.options" 
          :key="opt.id"
          type="button"
          @click="selectOption(opt.id)"
          class="flex flex-col items-center justify-center gap-4 p-5 border-2 rounded-2xl transition-all duration-200 group h-36 bg-white"
          :class="selectedId === opt.id ? 'border-brand bg-brand/5' : 'border-neutral-200 hover:border-neutral-300' "
        >
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200"
              :class="selectedId === opt.id ? 'bg-brand text-white' : 'bg-neutral-200 text-neutral-500 group-hover:bg-neutral-300'"
            >
               <i :class="opt.icon" class="text-xl"></i>
            </div>
          
          <span class="text-xs font-black text-center tracking-tight leading-tight uppercase px-1" :class="selectedId === opt.id ? 'text-brand' : 'text-neutral-600'">
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
