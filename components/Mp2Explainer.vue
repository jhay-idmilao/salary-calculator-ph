<script setup lang="ts">
import { MP2_CONFIG, MP2_DIVIDEND_DISCLAIMER } from '~/constants/rates2026'
</script>

<template>
  <p>
    Pag-IBIG MP2 (Modified Pag-IBIG II) is a <strong>voluntary</strong> savings program on top of
    your regular, mandatory Pag-IBIG contribution. It's open to any active Pag-IBIG member, with a
    minimum contribution of ₱{{ MP2_CONFIG.minMonthlyContribution }}/month and no upper limit — you
    decide how much extra you want to save.
  </p>
  <p>
    Each enrollment has a {{ MP2_CONFIG.lockInYears }}-year maturity term. At the end of the term you
    can withdraw your total savings plus dividends, or let it roll over into a new
    {{ MP2_CONFIG.lockInYears }}-year term. Once a year, the Pag-IBIG Fund Board declares a dividend
    rate based on the fund's actual investment performance, and that dividend is credited to each
    member's <em>average monthly balance</em> for the year — so the earlier in the year your money
    is in, the more of that year's dividend it earns. Because credited dividends join your balance,
    they go on to earn dividends themselves in later years too.
  </p>
  <p class="font-medium" style="color: var(--md-on-surface)">{{ MP2_DIVIDEND_DISCLAIMER }}</p>
</template>
