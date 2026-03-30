/** StepLayout.js - Shared Wrapper for all Journey Steps */
export default {
  props: {
    title: String,
    description: String
  },
  template: `
    <div class="w-full animate-fade-slide-in flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <h1 v-if="title" class="text-3xl font-black text-[var(--color-charcoal)] tracking-tighter leading-tight">
          {{ title }}
        </h1>
        <p v-if="description" class="text-neutral-600 text-base leading-relaxed">
          {{ description }}
        </p>
        <slot name="header-extra" />
      </div>

      <div class="flex-1">
        <slot />
      </div>

      <slot name="footer" />
    </div>
  `
};
