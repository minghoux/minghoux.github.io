import { ref, computed } from 'vue';
import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h1 class="text-[28px] font-black text-[var(--color-charcoal)] tracking-tighter leading-snug">{{ content.title }}</h1>
      <p class="text-[14px] text-neutral-500 leading-relaxed">{{ content.description }}</p>
    </div>

    <form @submit.prevent="submitStep" class="flex flex-col gap-5">
      <div v-for="(field, key) in content.fields" :key="key" :class="field.gridClass || ''">
        <label class="abound-label" :for="key">{{ field.label }}</label>
        <input
          :type="field.type || 'text'"
          :id="key"
          v-model="formData[key]"
          class="abound-input"
          :class="field.inputClass || ''"
          :placeholder="field.placeholder"
        >
      </div>

      <!-- Privacy Checkbox — cleaner, less boxed -->
      <div class="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="privacy"
          v-model="formData.privacy"
          class="mt-0.5 w-5 h-5 rounded cursor-pointer shrink-0"
          style="accent-color: #0E4533;"
        >
        <label for="privacy" class="text-[12px] font-medium text-neutral-500 leading-relaxed cursor-pointer select-none">
          {{ content.privacyLabel }}
          <a href="#" class="text-brand font-semibold hover:underline">{{ content.privacyLinkText }}</a>
          {{ content.privacySuffix }}
        </label>
      </div>

      <button type="submit" class="abound-btn mt-4">
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
