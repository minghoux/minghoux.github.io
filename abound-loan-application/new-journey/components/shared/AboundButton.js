/** AboundButton.js - Standard Premium CTA with 14px Radius */
export default {
  props: {
    type: { type: String, default: 'button' },
    disabled: Boolean,
    primary: { type: Boolean, default: true },
    loading: Boolean
  },
  template: `
    <button 
      :type="type"
      :disabled="disabled || loading"
      class="w-full h-[64px] bg-brand text-white font-black text-[17px] rounded-standard transition-all hover:bg-brand-hover active:bg-brand-pressed disabled:opacity-100 disabled:bg-[#E2E8E2] disabled:text-[#9CA89C] disabled:border-charcoal/10 transition-all"
    >
      <span v-if="loading" class="animate-spin mr-2">
        <i class="fa-solid fa-spinner"></i>
      </span>
      <slot />
    </button>
  `
};
