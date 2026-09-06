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
  <h3 class="md-title-medium">How to enroll and contribute</h3>
  <p>
    Eligible members can open an MP2 account through Virtual Pag-IBIG or the current enrollment
    form. Keep the MP2 account number issued for that enrollment: payments may be made through
    supported salary deduction, Virtual Pag-IBIG, or accredited collection channels, and they must
    be credited to the MP2 account rather than only to your regular MID number.
  </p>
  <p>
    Contributions do not have to be identical every month. If you skip a voluntary deposit, the
    account continues toward its original maturity date and you can contribute again later; the
    practical effect is simply that less money was present to earn dividends. Large deposits may
    require proof of source of funds under Pag-IBIG's current rules.
  </p>
  <h3 class="md-title-medium">Maturity and early withdrawal</h3>
  <p>
    At the end of the five-year term, claim the matured savings or enroll in a new MP2 account for a
    new term. Pre-termination is allowed for reasons listed in the current MP2 terms. If you withdraw
    for another reason, Pag-IBIG may pay only part of the dividends or apply a pre-termination fee,
    so confirm the rule and documentary requirements before making plans around an early release.
  </p>
</template>
