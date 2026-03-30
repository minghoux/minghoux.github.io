import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-fade-slide-in flex flex-col gap-10">
    
    <!-- Branding Header -->
    <div class="flex flex-col gap-2">
      <h2 class="text-[13px] font-bold text-brand uppercase tracking-widest">{{ content.header }}</h2>
    </div>

    <div class="flex flex-col gap-10 px-1">
      <div class="flex flex-col gap-4">
        <h1 class="text-[28px] font-black text-charcoal tracking-tight leading-tight">{{ content.title }}</h1>
        <div class="flex flex-col gap-2">
          <div class="text-[20px] font-bold text-brand">{{ content.email }}</div>
          <p class="text-[15px] text-charcoal/60 leading-relaxed max-w-[320px]">
            {{ content.description }}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <a href="#" class="text-brand font-bold text-[15px] hover:underline decoration-brand/20 underline-offset-4">
          {{ content.updateLink }}
        </a>
        <abound-button @click="submitStep">
          {{ content.cta }}
        </abound-button>
      </div>
    </div>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepVerifyEmail;

    const submitStep = () => {
      emit('next-step', { step: 'verify-email', payload: { email: content.email } });
    };

    return {
      content,
      submitStep
    };
  }
};
