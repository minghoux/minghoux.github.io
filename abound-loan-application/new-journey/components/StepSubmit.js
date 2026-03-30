import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-fade-slide-in flex flex-col gap-10">
    
    <!-- Header Section -->
    <div class="flex flex-col gap-2">
      <h2 class="text-[13px] font-bold text-brand uppercase tracking-widest">{{ content.header }}</h2>
      <h1 class="text-[32px] font-black text-charcoal tracking-tight leading-tight">{{ content.title }}</h1>
    </div>

    <div class="flex flex-col gap-8">
      <!-- Loan Summary Module -->
      <div class="bg-brand border-1.5 border-brand/10 rounded-large p-8 flex flex-col gap-8 text-white">
        <h3 class="text-[11px] font-bold uppercase tracking-widest text-white/50 text-center">
          {{ content.summaryTitle }}
        </h3>
        
        <div class="grid grid-cols-2 gap-8 divide-x divide-white/10">
          <div class="flex flex-col items-center gap-1">
            <div class="text-[32px] font-black leading-none tabular-nums font-sans">£5,000</div>
            <div class="text-[10px] font-bold uppercase tracking-widest text-white/40">Amount</div>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="text-[32px] font-black leading-none tabular-nums font-sans">36</div>
            <div class="text-[10px] font-bold uppercase tracking-widest text-white/40">Months</div>
          </div>
        </div>

        <div class="flex flex-col items-center gap-1 bg-white/5 py-4 rounded-[14px]">
          <div class="text-[28px] font-black leading-none tabular-nums font-sans text-lime">£193.51</div>
          <div class="text-[10px] font-bold uppercase tracking-widest text-white/40">Monthly Payment</div>
        </div>
      </div>

      <!-- Legal Disclosure -->
      <div class="flex flex-col gap-4 px-2">
        <p class="text-[14px] text-charcoal/70 leading-relaxed max-w-[340px] font-medium">
          {{ content.legalDisclosure }}
        </p>
        <p class="text-[13px] text-charcoal/40 leading-relaxed font-normal">
          {{ content.dataSharing }}
        </p>
      </div>

      <div class="pt-2">
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
    const content = JOURNEY_CONTENT.stepSubmit;

    const submitStep = () => {
      emit('next-step', { step: 'submit' });
    };

    return {
      content,
      submitStep
    };
  }
};
