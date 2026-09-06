<template>
  <div class="flex min-h-screen flex-col" style="background-color: var(--md-background)">
    <AppHeader />
    <div class="flex-1">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
