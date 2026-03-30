import { ref } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-8">
    <h1 class="text-[28px] font-black text-charcoal tracking-tighter leading-snug">{{ content.title }}</h1>

    <!-- Flat list rows — no heavy icon circles, left-accent border on selection -->
    <div class="flex flex-col gap-2">
      <button
        v-for="opt in content.options"
        :key="opt.id"
        type="button"
        @click="selectOption(opt.id)"
        class="select-row"
        :class="selectedId === opt.id ? 'active' : ''"
      >
        <div class="select-row-icon" :class="selectedId === opt.id ? 'active' : 'idle'">
          <i :class="opt.icon"></i>
        </div>
        <span class="select-row-label" :class="selectedId === opt.id ? 'active' : 'idle'">
          {{ opt.label }}
        </span>
        <div v-show="selectedId === opt.id" class="ml-auto shrink-0">
          <svg class="w-5 h-5 text-brand" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </button>
    </div>

    <!-- Footer Help Section -->
    <div class="pt-6 border-t border-neutral-100 text-center">
      <p class="text-[11px] font-medium text-neutral-400 mb-2">¿Necesitas ayuda?</p>
      <a href="#" class="text-sm font-semibold text-brand hover:underline">FAQ & Ayuda</a>
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
