import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-10">
    
    <!-- Branding Header -->
    <div class="flex flex-col gap-2">
      <h2 class="text-[13px] font-bold text-brand uppercase tracking-widest">{{ content.header }}</h2>
      <h1 class="text-[32px] font-black text-charcoal tracking-tight leading-tight">{{ content.title }}</h1>
    </div>

    <div class="flex flex-col gap-12">
      <!-- Questions List -->
      <div v-for="(q, idx) in content.questions" :key="q.id" class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <h3 class="text-[17px] font-bold text-charcoal leading-snug">
            {{ q.text }}
          </h3>
          <p class="text-[14px] text-charcoal/50 leading-relaxed italic">
            {{ q.detail }}
          </p>
        </div>

        <!-- Yes/No Action Row -->
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="opt in q.options" 
            :key="opt.value"
            @click="selectOption(q.id, opt.value)"
            class="h-14 rounded-[14px] border-1.5 flex items-center justify-center font-bold text-[15px] transition-all"
            :class="[
              selections[q.id] === opt.value 
                ? 'bg-brand text-white border-brand' 
                : 'bg-white text-charcoal/60 border-charcoal/10 hover:border-brand/30'
            ]"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <div class="pt-4">
        <abound-button 
          @click="submitStep" 
          :disabled="!isComplete"
        >
          Continue
        </abound-button>
      </div>
    </div>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepFinance;

    // Selections state
    const selections = ref({
      upcoming_changes: null,
      debt_solution: null
    });

    const isComplete = computed(() => {
      return selections.value.upcoming_changes !== null && selections.value.debt_solution !== null;
    });

    const selectOption = (qid, val) => {
      selections.value[qid] = val;
    };

    const submitStep = () => {
      emit('next-step', { step: 'finance', payload: { ...selections.value } });
    };

    return {
      content,
      selections,
      isComplete,
      selectOption,
      submitStep
    };
  }
};
