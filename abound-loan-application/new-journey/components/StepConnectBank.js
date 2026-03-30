import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-fade-slide-in flex flex-col gap-10">
    
    <!-- Header Section -->
    <div class="flex flex-col gap-2">
      <h2 class="text-[13px] font-bold text-brand uppercase tracking-widest">{{ content.header }}</h2>
      <h1 class="text-[32px] font-black text-charcoal tracking-tight leading-tight">{{ content.title }}</h1>
    </div>

    <div class="flex flex-col gap-8">
      <p class="text-[17px] text-charcoal/70 leading-relaxed font-medium">
        {{ content.description }}
      </p>

      <div class="flex flex-col gap-6 bg-white border-1.5 border-charcoal/5 rounded-large p-6">
        <div v-for="prop in content.props" :key="prop.title" class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand flex-shrink-0">
            <i :class="prop.icon" class="text-lg"></i>
          </div>
          <div class="flex flex-col gap-0.5">
            <h3 class="text-[15px] font-bold text-charcoal">{{ prop.title }}</h3>
            <p class="text-[13px] text-charcoal/50 leading-snug">
              {{ prop.detail }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="pt-4 flex flex-col gap-4">
        <abound-button @click="submitStep">
          {{ content.cta }}
        </abound-button>
        <p class="text-[13px] text-charcoal/40 leading-relaxed text-center italic">
          UK Open Banking standards apply.
        </p>
      </div>
    </div>
  </div>
`;

export default {
  template,
  emits: ['next-step'],
  setup(props, { emit }) {
    const content = JOURNEY_CONTENT.stepConnectBank;

    const submitStep = () => {
      emit('next-step', { step: 'connect-bank' });
    };

    return {
      content,
      submitStep
    };
  }
};
