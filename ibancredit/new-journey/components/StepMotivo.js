import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-8">
    <h1 class="text-[28px] font-black text-charcoal tracking-tighter leading-snug">{{ content.title }}</h1>

    <form @submit.prevent="submitStep" class="flex flex-col gap-8">
      <!-- Selection Grid — rounded-square icons, not circles -->
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="opt in content.options"
          :key="opt.id"
          type="button"
          @click="selectOption(opt.id)"
          class="flex flex-col items-center justify-center gap-3 p-5 border-[1.5px] rounded-2xl transition-all duration-200 h-[136px] bg-white"
          :class="selectedId === opt.id ? 'border-brand/40 bg-brand/[0.03]' : 'border-[#E2E8E2] hover:border-[#C5D3C5]'"
        >
          <!-- Rounded-square container — more intentional than a generic circle -->
          <div
            class="select-icon-square"
            :class="selectedId === opt.id ? 'active' : 'idle'"
          >
            <i :class="opt.icon"></i>
          </div>

          <span
            class="text-[11px] font-semibold text-center leading-snug px-1"
            :class="selectedId === opt.id ? 'text-brand' : 'text-neutral-600'"
          >{{ opt.label }}</span>
        </button>
      </div>

      <!-- Custom Input Area -->
      <div>
        <label class="abound-label">{{ content.customLabel }}</label>
        <div class="relative">
          <input
            type="text"
            v-model="customMotivo"
            class="abound-input pr-14"
            placeholder="..."
            @input="selectedId = null"
          >
          <button
            type="submit"
            v-show="customMotivo.length > 2"
            class="absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center bg-brand text-white rounded-xl hover:bg-[#0A3325] transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>

      <button
        v-if="selectedId"
        type="submit"
        class="abound-btn animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both]"
      >{{ content.cta }}</button>

    </form>
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
