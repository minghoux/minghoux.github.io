import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_200ms_ease-out_both] mt-4 md:mt-8">
    <!-- Surface Card -->
    <div class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-neutral-200 w-full relative overflow-hidden">
      <h1 class="text-2xl md:text-3xl font-bold text-charcoal mb-2 tracking-tight">{{ content.title }}</h1>
      <p class="text-neutral-500 text-sm mb-8 leading-relaxed max-w-[400px]">
        {{ content.description }}
      </p>

      <form @submit.prevent="submitStep" class="flex flex-col gap-5">
        <div v-for="(field, key) in content.fields" :key="key" :class="field.gridClass || ''">
          <label class="block text-sm font-semibold text-charcoal mb-1.5" :for="key">{{ field.label }}</label>
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
        <div class="flex items-start gap-3 mt-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
          <div class="relative flex items-center mt-0.5">
            <input type="checkbox" id="privacy" v-model="formData.privacy" class="w-5 h-5 border-2 border-neutral-300 rounded text-brand focus:ring-brand focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer">
          </div>
          <label for="privacy" class="text-xs text-neutral-600 leading-relaxed cursor-pointer select-none">
            {{ content.privacyLabel }} 
            <a href="#" class="text-brand font-semibold hover:underline">{{ content.privacyLinkText }}</a> 
            {{ content.privacySuffix }}
          </label>
        </div>

        <button type="submit" class="abound-btn mt-6">
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
