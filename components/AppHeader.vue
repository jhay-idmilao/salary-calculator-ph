<script setup lang="ts">
/**
 * Site header: logo, a desktop nav row (Home, a "Tools" dropdown for the six
 * calculators, Government Benefits Guide, FAQ, and an external PDF Tool PH
 * link), and a hamburger-triggered panel on narrow viewports that flattens
 * everything into one stacked list instead of cramming it into the bar.
 */
import { PDF_TOOL_PH_URL } from '~/constants/links'

interface NavTool {
  to: string
  icon: string
  title: string
}

// Kept in sync by hand with the tool cards on the hub page (pages/index.vue)
// — the same "list it again where it's needed" pattern already used for
// nitro.prerender.routes and public/sitemap.xml.
const NAV_TOOLS: NavTool[] = [
  { to: '/salary-calculator', icon: '💵', title: 'Salary Calculator' },
  { to: '/13th-month-pay-calculator', icon: '🎁', title: '13th Month Pay Calculator' },
  { to: '/sss-contribution-calculator', icon: '🛡️', title: 'SSS Contribution Calculator' },
  { to: '/philhealth-contribution-calculator', icon: '🏥', title: 'PhilHealth Contribution Calculator' },
  { to: '/pagibig-mp2-calculator', icon: '💰', title: 'Pag-IBIG MP2 Savings Calculator' },
  { to: '/bir-withholding-tax-calculator', icon: '🧾', title: 'BIR Withholding Tax Calculator' }
]

const route = useRoute()
const headerRef = ref<HTMLElement | null>(null)
const isToolsMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)

function closeMenus() {
  isToolsMenuOpen.value = false
  isMobileMenuOpen.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (headerRef.value && !headerRef.value.contains(event.target as Node)) {
    isToolsMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))

// A route change means some nav link was just followed — close whatever menu was open.
watch(() => route.fullPath, closeMenus)
</script>

<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-20 border-b"
    style="background-color: var(--md-surface-container-lowest); border-color: var(--md-outline-variant)"
  >
    <div class="mx-auto flex max-w-4xl items-center justify-between gap-2 px-4 py-3">
      <NuxtLink
        to="/"
        class="shrink-0 rounded-[var(--md-shape-sm)] focus:outline-none focus-visible:ring-2"
        style="--tw-ring-color: var(--md-primary)"
      >
        <AppLogo />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
        <NuxtLink to="/" class="m3-nav-link" active-class="is-active" exact-active-class="is-active">
          Home
        </NuxtLink>

        <div class="relative">
          <button
            v-ripple
            type="button"
            class="m3-nav-link"
            :aria-expanded="isToolsMenuOpen"
            aria-haspopup="true"
            @click="isToolsMenuOpen = !isToolsMenuOpen"
          >
            Tools
            <svg
              class="m3-nav-chevron"
              :class="{ 'is-open': isToolsMenuOpen }"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <Transition name="m3-menu-fade">
            <div v-if="isToolsMenuOpen" class="m3-nav-menu" role="menu" aria-label="Tools">
              <NuxtLink
                v-for="tool in NAV_TOOLS"
                :key="tool.to"
                :to="tool.to"
                class="m3-nav-menu-item"
                role="menuitem"
              >
                <span aria-hidden="true">{{ tool.icon }}</span>
                {{ tool.title }}
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <NuxtLink to="/government-benefits-guide" class="m3-nav-link" active-class="is-active">
          Government Benefits Guide
        </NuxtLink>
        <NuxtLink to="/faq" class="m3-nav-link" active-class="is-active">FAQ</NuxtLink>
        <a :href="PDF_TOOL_PH_URL" target="_blank" rel="noopener noreferrer" class="m3-nav-link">
          PDF Tool PH
          <svg class="m3-nav-external-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17L17 7M9 7h8v8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </nav>

      <!-- Mobile menu toggle -->
      <button
        v-ripple
        type="button"
        class="m3-icon-btn md:hidden"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle menu"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg v-if="!isMobileMenuOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- Mobile nav panel -->
    <Transition name="m3-menu-fade">
      <nav
        v-if="isMobileMenuOpen"
        id="mobile-nav"
        class="border-t px-4 py-3 md:hidden"
        style="border-color: var(--md-outline-variant); background-color: var(--md-surface-container-lowest)"
        aria-label="Primary"
      >
        <NuxtLink to="/" class="m3-nav-link-mobile" active-class="is-active" exact-active-class="is-active">
          Home
        </NuxtLink>

        <p class="mb-1 mt-3 px-3 md-label-large" style="color: var(--md-on-surface-variant)">Tools</p>
        <NuxtLink
          v-for="tool in NAV_TOOLS"
          :key="tool.to"
          :to="tool.to"
          class="m3-nav-link-mobile"
          active-class="is-active"
        >
          <span aria-hidden="true">{{ tool.icon }}</span>
          {{ tool.title }}
        </NuxtLink>

        <div class="my-3 border-t" style="border-color: var(--md-outline-variant)" />

        <NuxtLink to="/government-benefits-guide" class="m3-nav-link-mobile" active-class="is-active">
          Government Benefits Guide
        </NuxtLink>
        <NuxtLink to="/faq" class="m3-nav-link-mobile" active-class="is-active">FAQ</NuxtLink>
        <a :href="PDF_TOOL_PH_URL" target="_blank" rel="noopener noreferrer" class="m3-nav-link-mobile">
          PDF Tool PH ↗
        </a>
      </nav>
    </Transition>
  </header>
</template>
