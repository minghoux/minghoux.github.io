/** AboundButton.js - Standard Premium Button */
export default {
  props: {
    type: { type: String, default: 'button' },
    disabled: Boolean,
    primary: { type: Boolean, default: true }
  },
  template: `
    <button 
      :type="type"
      :disabled="disabled"
      class="abound-btn"
      :class="{ 'opacity-50 blur-[1px]': disabled }"
    >
      <slot />
    </button>
  `
};
