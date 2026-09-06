<script setup lang="ts">
/**
 * A Material 3 "filled text field" with a floating label — the label sits
 * inside the field until focused or filled, then animates up to the top.
 */
const props = withDefaults(
  defineProps<{
    modelValue: number | null
    id: string
    label: string
    placeholder?: string
    supportText?: string
    required?: boolean
    min?: number
    step?: string
  }>(),
  {
    placeholder: '',
    supportText: '',
    required: false,
    min: 0,
    step: '0.01'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const focused = ref(false)

const isActive = computed(() => focused.value || props.modelValue !== null)

function onInput(event: Event) {
  const raw = (event.target as HTMLInputElement).value
  emit('update:modelValue', raw === '' ? null : Number(raw))
}
</script>

<template>
  <div>
    <div class="m3-field" :class="{ 'is-active': isActive, 'is-focused': focused }">
      <input
        :id="id"
        class="m3-field-control"
        type="number"
        inputmode="decimal"
        :min="min"
        :step="step"
        :placeholder="placeholder || ' '"
        :required="required"
        :value="modelValue ?? ''"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
      />
      <label :for="id" class="m3-field-label">{{ label }}</label>
    </div>
    <p v-if="supportText" class="m3-field-support">{{ supportText }}</p>
  </div>
</template>
