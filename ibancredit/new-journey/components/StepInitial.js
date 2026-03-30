import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-black text-charcoal tracking-tighter leading-tight">{{ content.title }}</h1>
      <p class="text-neutral-500 text-base leading-relaxed">
        {{ content.description }}
      </p>
    </div>

    <form @submit.prevent="submitStep" class="flex flex-col gap-6">
      <div v-for="(field, key) in content.fields" :key="key" :class="field.gridClass || ''" class="flex flex-col gap-2">
        <label class="text-sm font-bold text-charcoal/60 uppercase tracking-widest px-1" :for="key">{{ field.label }}</label>
        <input 
          :type="field.type || 'text'" 
          :id="key" 
          v-model="formData[key]" 
          class="abound-input" 
          :class="field.inputClass || ''"
          :placeholder="field.placeholder"
        >
      </div>

      <!-- Privacy Checkbox -->
      <div class="flex items-start gap-4 mt-4 bg-white p-6 rounded-2xl border border-neutral-200/50 shadow-sm shadow-neutral-100">
        <div class="relative flex items-center mt-1">
          <input type="checkbox" id="privacy" v-model="formData.privacy" class="w-6 h-6 border-2 border-neutral-200 rounded-lg text-brand focus:ring-brand focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer accent-brand">
        </div>
        <label for="privacy" class="text-xs font-medium text-neutral-500 leading-relaxed cursor-pointer select-none">
          {{ content.privacyLabel }} 
          <a href="#" class="text-brand font-bold hover:underline">{{ content.privacyLinkText }}</a> 
          {{ content.privacySuffix }}
        </label>
      </div>

      <button type="submit" class="abound-btn mt-8">
        {{ content.cta }}
      </button>
    </form>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepInitial;
    const formData = ref({
      nombre: '',
      dni: '',
      postal: '',
      fecha: '',
      telefono: '',
      email: '',
      privacy: false
    });

    const isFormValid = computed(() => {
      return true; // Bypass validation
    });

    const submitStep = () => {
      // Allow progression regardless of form state for easy prototyping
      emit('next-step', { step: 'initial', payload: formData.value });
    };

    return {
      content,
      formData,
      isFormValid,
      submitStep
    };
  }
};
