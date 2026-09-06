export interface FaqItem {
  question: string
  answer: string
}

export const salaryFaqs: FaqItem[] = [
  {
    question: 'How accurate is the Philippine salary calculator?',
    answer:
      'It provides an estimate using the contribution and tax tables stored in this site, then shows each deduction separately. Actual payroll can differ because of taxable allowances, bonuses, prior-period adjustments, company cutoffs, loans, or other deductions that the calculator does not know about.'
  },
  {
    question: 'Are the 2026 SSS, PhilHealth, Pag-IBIG, and BIR rates official?',
    answer:
      'The figures are transcribed from published reference tables, but this site has not yet individually cross-checked every bracket against every primary 2026 circular. Treat the result as a planning estimate and verify it against the latest agency issuance or your payroll team before making a payroll or compliance decision.'
  },
  {
    question: 'Why is my actual take-home pay different from the result?',
    answer:
      'Your payslip may include overtime, night differential, holiday pay, taxable allowances, loans, absences, or company-specific cutoff adjustments. The calculator estimates the statutory items from the amount and pay frequency you enter; it cannot reproduce deductions that are not entered.'
  },
  {
    question: 'Does Sahod Calculator save my salary?',
    answer:
      'No. The calculation runs in your browser and the site does not send the salary amount you enter to an application server. Advertising or hosting providers may still receive ordinary technical data such as your IP address and browser information, as explained in the Privacy Policy.'
  }
]

export const sssFaqs: FaqItem[] = [
  {
    question: 'How accurate is this SSS contribution calculator?',
    answer:
      'It matches the monthly compensation you enter to the salary-credit schedule stored in the site and separates the employee, employer, and Employees’ Compensation shares. Use it as an estimate because payroll timing, membership category, and later SSS circulars can change the amount actually posted.'
  },
  {
    question: "How much is SSS if I'm self-employed?",
    answer:
      'A self-employed member pays the full contribution applicable to the declared monthly earnings, rather than having an employer pay a separate share. This employee-oriented calculator shows an employee/employer split, so a self-employed member should confirm the self-employed schedule and generate a Payment Reference Number in My.SSS before paying.'
  },
  {
    question: 'What happens if I miss an SSS voluntary contribution?',
    answer:
      'For voluntary members, an unpaid month generally becomes a gap and cannot be filled by a retroactive payment. You may continue prospectively, but a gap can matter when a benefit or loan requires a minimum number of posted contributions within a specific period.'
  },
  {
    question: 'Who remits SSS contributions for an employee?',
    answer:
      'The employer deducts the employee share from payroll, adds the employer share and Employees’ Compensation amount, and remits the total to SSS. Check My.SSS periodically so you can raise missing postings with your employer while records are still easy to trace.'
  }
]

export const philhealthFaqs: FaqItem[] = [
  {
    question: 'How accurate is this PhilHealth contribution calculator?',
    answer:
      'It applies the rate, salary floor, salary ceiling, and equal employee-employer split currently stored in the project. Your actual premium can differ if PhilHealth issues a new schedule, your declared income differs from the amount entered, or your employer makes a payroll adjustment.'
  },
  {
    question: 'How do self-employed people pay PhilHealth?',
    answer:
      'Update your membership category to Self-Earning Individual, declare your monthly income, and generate the required Statement of Premium Account before payment. PhilHealth allows eligible self-paying members to use its portal and accredited collection channels, with payment schedules subject to current agency rules.'
  },
  {
    question: 'Does my employer pay half of my PhilHealth premium?',
    answer:
      'For members in formal employment, the monthly premium is generally shared equally by the employee and employer. The employer deducts your share, adds its share, and reports and remits both through PhilHealth’s employer system.'
  },
  {
    question: 'Can I use PhilHealth if I have missed premiums?',
    answer:
      'Universal Health Care rules and current PhilHealth circulars determine entitlement and how unpaid self-paying premiums are settled. Do not assume that a calculator result proves eligibility; check your Member Data Record and contribution history, then ask PhilHealth about any missed periods before a planned treatment.'
  }
]

export const mp2Faqs: FaqItem[] = [
  {
    question: 'What is the difference between Pag-IBIG regular savings and MP2?',
    answer:
      'Regular Pag-IBIG savings are the mandatory membership contributions that support long-term savings and access to Pag-IBIG loans. MP2 is a separate voluntary five-year savings program for eligible members, funded with extra contributions and credited with a separately declared dividend rate.'
  },
  {
    question: 'Can I withdraw my MP2 savings early?',
    answer:
      'Pre-termination is allowed under the conditions in Pag-IBIG’s current MP2 terms, including specified serious events. For other reasons, Pag-IBIG’s enrollment terms may reduce the dividends you receive, so check the current rules and required documents before filing a claim.'
  },
  {
    question: 'What happens if I miss a Pag-IBIG MP2 payment?',
    answer:
      'MP2 is voluntary, so you do not incur a monthly late-payment penalty simply because you skip a contribution. Your account remains on its five-year term, but a missed deposit means less money is present to earn dividends; you can contribute again later using your MP2 account number.'
  },
  {
    question: 'Are Pag-IBIG MP2 dividends guaranteed?',
    answer:
      'No. Pag-IBIG declares the dividend rate based on fund performance, so historical rates are not a promise of future returns. This calculator lets you change the assumed annual rate and should be used for scenarios, not as a guaranteed maturity quote.'
  },
  {
    question: 'How do I enroll in and pay Pag-IBIG MP2?',
    answer:
      'Eligible members can enroll through Virtual Pag-IBIG or submit the current MP2 enrollment form through Pag-IBIG. After receiving an MP2 account number, you can pay through Virtual Pag-IBIG, salary deduction when supported, or an accredited collection channel; use the MP2 account number, not only your MID number.'
  }
]

export const thirteenthMonthFaqs: FaqItem[] = [
  {
    question: 'Do I need to pay tax on my 13th month pay?',
    answer:
      'Thirteenth-month pay and other benefits are tax-exempt up to the combined statutory ceiling stored in this calculator, currently ₱90,000. Any amount above the combined ceiling is generally added to taxable compensation, so a separate Christmas bonus can affect how much remains exempt.'
  },
  {
    question: 'Am I entitled to 13th month pay if I resigned?',
    answer:
      'A covered rank-and-file private-sector employee who worked at least one month during the calendar year is generally entitled to a proportionate amount even after resignation or termination. It is based on total basic salary actually earned during that calendar year, divided by 12.'
  },
  {
    question: 'Are overtime and allowances included in 13th month pay?',
    answer:
      'Overtime, night differential, holiday premiums, and allowances are generally excluded from basic salary for this calculation. They may be included if an agreement, company policy, or established practice treats a particular payment as part of basic salary.'
  },
  {
    question: 'When must 13th month pay be released?',
    answer:
      'Covered employers must pay it no later than December 24. An employer may split the payment, but the required balance must still be released by the statutory deadline.'
  }
]

export const withholdingTaxFaqs: FaqItem[] = [
  {
    question: 'Why is no withholding tax shown on my salary?',
    answer:
      'After mandatory employee contributions are deducted, your annualized taxable income may fall within the zero-tax band. A zero result for one pay period does not settle your full-year tax if you later receive bonuses, change employers, or earn other taxable income.'
  },
  {
    question: 'Is withholding tax the same as my final income tax?',
    answer:
      'Not always. Withholding is an advance collection based on payroll estimates; your employer normally annualizes and reconciles it at year-end. Multiple employers, mixed income, or outside earnings can mean you must file and pay or claim a refund separately.'
  },
  {
    question: 'Are SSS, PhilHealth, and Pag-IBIG deducted before tax?',
    answer:
      'The mandatory employee contributions used by the salary calculator reduce compensation income before the withholding-tax estimate is calculated. Voluntary savings, personal loan payments, and many other payroll deductions do not automatically reduce taxable income.'
  },
  {
    question: 'Why does my BIR Form 2316 show a different amount?',
    answer:
      'Form 2316 reflects your employer’s actual year-to-date payroll records, including bonuses, taxable benefits, adjustments, and prior-employer information provided during the year. This calculator only knows the single pay-period amount you enter, so use Form 2316 and official BIR guidance for filing.'
  }
]

