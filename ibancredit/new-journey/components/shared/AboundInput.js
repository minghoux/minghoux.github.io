/** AboundInput.js - Standard Styled Input */
export default {
  props: {
    modelValue: [String, Number],
    id: String,
    label: String,
    labelUpperCase: { type: Boolean, default: true },
    type: { type: String, default: 'text' },
    placeholder: String,
    inputClass: String
  },
  emits: ['update:modelValue'],
  template: `
    <div class="flex flex-col gap-2">
      <label 
        v-if="label" 
        :for="id" 
        class="text-sm font-bold text-charcoal/60 px-1"
        :class="{ 'uppercase tracking-widest text-[11px]': labelUpperCase }"
      >
        {{ label }}
      </label>
      <input 
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full h-[52px] px-4 bg-white border border-[#E4E7EC] rounded-[14px] text-base text-[#201F1D] focus:outline-none focus:border-[#0E4533] focus:ring-4 focus:ring-[#0E4533]/5 transition-all duration-200"
        :class="inputClass"
        :placeholder="placeholder"
      >
    </div>
  `
};
