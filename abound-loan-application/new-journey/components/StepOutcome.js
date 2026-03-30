import JOURNEY_CONTENT from '../content/journey-content.js';

const template = `
  <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-10">
    
    <!-- Success Hero -->
    <div class="bg-brand border-1.5 border-brand/10 rounded-[20px] p-10 flex flex-col items-center gap-6 text-white text-center">
      <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center text-brand text-[40px] animate-[scaleIn_400ms_cubic-bezier(0.16,1,0.3,1)_both]">
        <i class="fa-solid fa-check"></i>
      </div>
      <h1 class="text-[28px] font-black tracking-tight leading-tight px-4 text-white">
        {{ content.title }}
      </h1>
    </div>

    <div class="flex flex-col gap-10">
      <!-- What's next? -->
      <div class="flex flex-col gap-6">
        <h3 class="text-[13px] font-bold text-brand uppercase tracking-widest">{{ content.nextStepsTitle }}</h3>
        <div class="flex flex-col gap-5 bg-white border-1.5 border-charcoal/5 rounded-[20px] p-8">
          <div v-for="item in content.checklist" :key="item.text" class="flex items-start gap-4">
            <span class="text-xl leading-none flex-shrink-0">{{ item.icon }}</span>
            <p class="text-[14px] text-charcoal/60 leading-relaxed font-medium">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- SMS Enrollment -->
      <div class="flex flex-col gap-6 pt-4 border-t-1.5 border-charcoal/5">
        <div class="flex flex-col gap-2">
          <h3 class="text-[17px] font-bold text-charcoal leading-snug">
            {{ content.updates.title }}
          </h3>
          <p class="text-[14px] text-charcoal/50 leading-relaxed">
            {{ content.updates.description }}
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="relative">
            <input 
              type="tel" 
              placeholder="+44" 
              class="abound-input pl-16 font-bold"
            >
            <div class="absolute left-4 inset-y-0 flex items-center pointer-events-none">
              <img src="https://flagcdn.com/w40/gb.png" class="h-4 rounded-sm" alt="UK Flag">
            </div>
          </div>
          <abound-button>
            {{ content.updates.cta }}
          </abound-button>
        </div>
      </div>
    </div>
  </div>
`;

export default {
  template,
  setup() {
    return {
      content: JOURNEY_CONTENT.stepOutcome
    };
  }
};
