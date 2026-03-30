/** StepLayout.js - Shared Wrapper for Abound Journey Steps */
export default {
  props: {
    header: String,
    title: String,
    subtitle: String,
    badge: String,
    icon: String,
  },
  template: `
    <div class="w-full animate-[fadeSlideIn_280ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col gap-10">
      
      <!-- Header Section -->
      <div v-if="header || title" class="flex flex-col gap-5">
        <div class="flex justify-between items-start">
          <div class="flex flex-col gap-3">
            <img v-if="icon" :src="icon" alt="Abound" class="h-8 w-8" />
            <h2 v-if="header" class="text-[13px] font-bold text-brand/60 uppercase tracking-widest">
              {{ header }}
            </h2>
          </div>
          <div v-if="badge" class="bg-lime text-brand font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
            {{ badge }}
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h1 v-if="title" class="text-[32px] font-black text-charcoal tracking-tight leading-tight">
            {{ title }}
          </h1>
          <p v-if="subtitle" class="text-[17px] text-charcoal/70 leading-relaxed font-medium">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <!-- Main Step Body -->
      <div class="flex-1 flex flex-col gap-8">
        <slot />
      </div>

      <!-- Footer / Action Area -->
      <div class="flex flex-col gap-4">
        <slot name="footer" />
      </div>

    </div>
  `
};
