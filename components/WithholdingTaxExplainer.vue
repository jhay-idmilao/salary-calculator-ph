<template>
  <p>
    Withholding tax on compensation is income tax that your employer deducts from your pay in
    advance, on behalf of the Bureau of Internal Revenue (BIR), based on your projected annual
    income. Under the TRAIN law, individuals earning a taxable income of ₱250,000 or less per year
    pay no income tax at all.
  </p>
  <p>
    To compute it, your <em>taxable income</em> — gross pay minus your SSS, PhilHealth, and Pag-IBIG
    employee contributions — for the current pay period is projected out to a full year (annualized),
    run through the BIR's progressive tax brackets below, and the resulting annual tax is then
    divided back down to your pay period.
  </p>
  <div class="overflow-x-auto rounded-[var(--md-shape-md)]" style="border: 1px solid var(--md-outline-variant)">
    <table class="w-full min-w-[420px] text-left text-sm">
      <thead
        class="md-label-large uppercase tracking-wide"
        style="color: var(--md-on-surface-variant); background-color: var(--md-surface-container-low)"
      >
        <tr>
          <th class="px-4 py-2 font-semibold">Annual taxable income</th>
          <th class="px-4 py-2 font-semibold">Tax</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-top: 1px solid var(--md-outline-variant)">
          <td class="px-4 py-2">₱250,000 and below</td>
          <td class="px-4 py-2">Exempt (0%)</td>
        </tr>
        <tr style="border-top: 1px solid var(--md-outline-variant)">
          <td class="px-4 py-2">₱250,001 – ₱400,000</td>
          <td class="px-4 py-2">15% of the excess over ₱250,000</td>
        </tr>
        <tr style="border-top: 1px solid var(--md-outline-variant)">
          <td class="px-4 py-2">₱400,001 – ₱800,000</td>
          <td class="px-4 py-2">₱22,500 + 20% of the excess over ₱400,000</td>
        </tr>
        <tr style="border-top: 1px solid var(--md-outline-variant)">
          <td class="px-4 py-2">₱800,001 – ₱2,000,000</td>
          <td class="px-4 py-2">₱102,500 + 25% of the excess over ₱800,000</td>
        </tr>
        <tr style="border-top: 1px solid var(--md-outline-variant)">
          <td class="px-4 py-2">₱2,000,001 – ₱8,000,000</td>
          <td class="px-4 py-2">₱402,500 + 30% of the excess over ₱2,000,000</td>
        </tr>
        <tr style="border-top: 1px solid var(--md-outline-variant)">
          <td class="px-4 py-2">Over ₱8,000,000</td>
          <td class="px-4 py-2">₱2,202,500 + 35% of the excess over ₱8,000,000</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
