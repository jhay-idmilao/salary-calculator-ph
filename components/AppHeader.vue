<script setup lang="ts"></script>

<template>
  <header
    class="sticky top-0 z-20 border-b"
    style="background-color: var(--md-surface-container-lowest); border-color: var(--md-outline-variant)"
  >
    <div class="mx-auto flex max-w-4xl items-center px-4 py-3">
      <NuxtLink to="/" class="rounded-[var(--md-shape-sm)] focus:outline-none focus-visible:ring-2" style="--tw-ring-color: var(--md-primary)">
        <AppLogo />
      </NuxtLink>
    </div>
  </header>
</template>
