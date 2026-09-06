<script setup lang="ts">
import { RATES_YEAR } from '~/constants/rates2026'
</script>

<template>
  <p>
    The Social Security System (SSS) is the state-run social insurance program for private and
    self-employed workers in the Philippines. Every month, a portion of your salary is set aside as
    an SSS contribution, which builds up your eligibility for benefits such as sickness, maternity,
    disability, retirement, and death benefits for your beneficiaries.
  </p>
  <p>
    SSS contributions are not a flat percentage of your exact salary. Instead, your monthly salary is
    matched to a <strong>Monthly Salary Credit (MSC)</strong> bracket — a standardized compensation
    range published by SSS — and the contribution is computed as a percentage of that MSC, not your
    raw pay. For {{ RATES_YEAR }}, the total contribution rate is 15% of MSC, split 5% employee / 10%
    employer, with the MSC bracketed between roughly ₱4,000 and ₱35,000. Employers also shoulder a
    small Employees' Compensation (EC) contribution on top — ₱10/month if your MSC is below
    ₱15,000, or ₱30/month if it's at or above that.
  </p>
  <p>
    This calculator looks up your MSC bracket automatically, so the SSS figure you see above reflects
    the bracket your salary falls into rather than a straight 15% of your exact pay.
  </p>
  <h3 class="md-title-medium">Eligibility and registration</h3>
  <p>
    Private-sector employees are covered through their employer from the start of employment.
    Self-employed workers register or update their membership category and declare earnings; a
    former employee or self-employed member with at least one valid posted contribution may usually
    continue as a voluntary member. Apply for an SS number only once and complete the supporting
    documents needed to make the membership record permanent.
  </p>
  <h3 class="md-title-medium">Who remits the contribution?</h3>
  <p>
    An employer withholds the employee share, adds the employer and EC shares, then reports and
    remits the total. Self-employed members pay the full amount for their category, while voluntary
    members select an allowed MSC and generate a Payment Reference Number through My.SSS or the SSS
    mobile app before paying through an accredited channel.
  </p>
  <p>
    A missed voluntary month generally becomes a contribution gap and cannot be paid retroactively.
    Future payments can continue, but benefit and loan eligibility may depend on how many
    contributions were posted within a required period. This calculator is designed around the
    employee schedule; self-employed users should confirm the separate SSS schedule before payment.
  </p>
</template>
