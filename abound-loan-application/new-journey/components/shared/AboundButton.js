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
      class="abound-btn h-[64px] text-[17px] disabled:opacity-100 disabled:bg-[#E2E8E2] disabled:text-[#9CA89C] disabled:border-charcoal/10 transition-all font-bold"
    >
      <span v-if="loading" class="animate-spin mr-2">
        <i class="fa-solid fa-spinner"></i>
      </span>
      <slot />
    </button>
  `
};
