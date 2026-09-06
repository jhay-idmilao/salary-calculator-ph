<script setup lang="ts">
defineProps<{
  title: string
  id?: string
}>()
</script>

<template>
  <section :id="id" class="scroll-mt-20">
    <h2 class="section-title mb-3">{{ title }}</h2>
    <div class="space-y-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
      <slot />
    </div>
  </section>
</template>
