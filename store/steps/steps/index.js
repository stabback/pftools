export const state = () => ({
  steps: [
    {
      id: 'create-budget',
      title: 'Create Budget',
      country: 'canada',
      category: 'budget',
      content:
        'Fundamental to a sound financial footing is knowing where your money is going.  Budgeting helps you see your sources of income less your expenses.  Before you take any further action with existing money, ensure you take the time to create a budget.',
      next: [
        {
          prompt: 'Done',
          id: 'pay-rent-mortgage'
        }
      ]
    },
    {
      id: 'pay-rent-mortgage',
      title: 'Pay Rent / Mortgage',
      country: 'canada',
      category: 'budget',
      content: 'Make sure you have a place to stay.  This comes before any other needs.  If required, include your renters / homeowners insurance.',
      next: [
        {
          prompt: 'Done',
          id: 'buy-food-groceries'
        }
      ]
    },
    {
      id: 'buy-food-groceries',
      title: 'Buy Food / Groceries',
      country: 'canada',
      category: 'budget',
      content:
        'Depending on the severity of your situation and needs, you may wish to prioritize utilities before this step.',
      next: [
        {
          prompt: 'Done',
          id: 'pay-essential-items'
        }
      ]
    },
    {
      id: 'pay-essential-items',
      title: 'Pay Essential Items',
      country: 'canada',
      category: 'budget',
      content: 'Power, water, heat, toiletries, etc.  Things you need to live.',
      next: [
        {
          prompt: 'Done',
          id: 'pay-income-earning-expenses'
        }
      ]
    },
    {
      id: 'pay-income-earning-expenses',
      title: 'Pay Income Earning Expenses',
      country: 'canada',
      category: 'budget',
      content:
        'Make sure you can continue to make money.  This includes transportation expenses, internet / phone if required.',
      next: [
        {
          prompt: 'Done',
          id: 'pay-taxes'
        }
      ]
    },
    {
      id: 'pay-taxes',
      title: 'Pay Taxes',
      country: 'canada',
      category: 'budget',
      content: 'The government is your most powerful creditor, pay them first.',
      next: [
        {
          prompt: 'Done',
          id: 'make-minimum-payments'
        }
      ]
    },
    {
      id: 'make-minimum-payments',
      title: 'Make Minimum Payments on all Debts & Loans',
      country: 'canada',
      category: 'budget',
      content: 'Keep the rest of your creditors happy.',
      next: [
        {
          prompt: 'Done',
          id: 'small-emergency-fund'
        }
      ]
    },
    {
      id: 'small-emergency-fund',
      title: 'Build Small Emergency Fund',
      country: 'canada',
      category: 'emergency',
      content:
        "Put $1,000 or one month's worth of expenses aside, whichever is greater.  Use a chequing or a savings account to keep this accessible.",
      next: [
        {
          prompt: 'Done',
          id: 'non-essential-bills'
        }
      ]
    },
    {
      id: 'non-essential-bills',
      title: 'Pay non-essential bills in full',
      country: 'canada',
      category: 'emergency',
      content:
        "Pay off any cable, internet, cellphone etc bills.",
      next: [
        {
          prompt: 'Done',
          id: 'employer-match'
        }
      ]
    },
    {
      id: 'employer-match',
      title: 'Employer match programs',
      country: 'canada',
      category: 'employer',
      content: 'Does your employer offer a retirement account with an employer match?',
      next: [
        {
          prompt: 'Yes',
          id: 'maximize-employer-match-program'
        },
        {
          prompt: 'No',
          id: 'high-interest-debt'
        },
      ]
    },
    {
      id: 'maximize-employer-match-program',
      title: 'Maximize the program',
      country: 'canada',
      category: 'employer',
      content: 'Contribute the amount needed to get the full employer match, but nothing above that amount.',
      next: [
        {
          prompt: 'Done',
          id: 'high-interest-debt'
        }
      ]
    },
    {
      id: 'high-interest-debt',
      title: 'Do you have any high interest debt?',
      country: 'canada',
      category: 'high-interest-debt',
      content: 'This includes any loans with an interest rate of 10% or higher.',
      next: [
        {
          prompt: 'Yes',
          id: 'pay-high-interest-debt'
        },
        {
          prompt: 'No',
          id: 'increase-emergency-fund'
        }
      ]
    },
    {
      id: 'pay-high-interest-debt',
      title: 'Pay off all high interest debt',
      country: 'canada',
      category: 'high-interest-debt',
      content: 'Evaluate the merits of the "Avalanche" - https://www.nerdwallet.com/blog/finance/what-is-a-debt-avalanche/ and "Snowball" - https://www.nerdwallet.com/blog/finance/what-is-a-debt-snowball/ methods and their advantages in your personal financial / psychological situation and apply accordingly to pay off these debts.',
      next: [
        {
          prompt: 'Done',
          id: 'increase-emergency-fund'
        }
      ]
    },
    {
      id: 'increase-emergency-fund',
      title: 'Increase your emergency fund',
      country: 'canada',
      category: 'high-interest-debt',
      content: 'Increase your emergency fund to match 3-6 months of your living expenses.  Use a separate savings or chequings account to separate the emergency fund from the accounts you use on a daily basis.',
      next: [
        {
          prompt: 'Done',
          id: 'moderate-interest-debt'
        }
      ]
    },
    {
      id: 'moderate-interest-debt',
      title: 'Do you have any moderate interest debt?',
      country: 'canada',
      category: 'high-interest-debt',
      content: 'This includes debt over 4-5% interest rate, excluding your mortgage.',
      next: [
        {
          prompt: 'Yes',
          id: 'pay-moderate-interest-debt'
        },
        {
          prompt: 'No',
          id: 'retirement-savings'
        }
      ]
    },
    {
      id: 'pay-moderate-interest-debt',
      title: 'Pay off your moderate interest debt in full.',
      country: 'canada',
      category: 'high-interest-debt',
      content: 'Evaluate the merits of the "Avalanche" - https://www.nerdwallet.com/blog/finance/what-is-a-debt-avalanche/ and "Snowball" - https://www.nerdwallet.com/blog/finance/what-is-a-debt-snowball/ methods and their advantages in your personal financial / psychological situation and apply accordingly to pay off these debts.',
      next: [
        {
          prompt: 'Done',
          id: 'retirement-savings'
        }
      ]
    },
    {
      id: 'retirement-savings',
      title: 'Pay yourself up to 15% of your pre-tax income for retirement',
      country: 'canada',
      category: 'personal-investment',
      content: 'Evaluate the merits of a TFSA vs RRSP in the context of your personal financial situation and contribute up to 15% of your pre-tax income for retirement.',
      next: [
        {
          prompt: 'Done',
          id: 'expected-large-purchases'
        }
      ]
    },
    {
      id: 'expected-large-purchases',
      title: 'Are you expecting any large required purchases soon?',
      country: 'canada',
      category: 'personal-investment',
      content: 'These may include college tuitions, professional certifications, a vehicle, etc.  However, it does not include purchases like vacations.',
      next: [
        {
          prompt: 'Yes',
          id: 'save-for-expected-large-purchases'
        },
        {
          prompt: 'No',
          id: 'retirement-budget'
        }
      ]
    },
    {
      id: 'save-for-expected-large-purchases',
      title: 'Put money aside for large purchases',
      country: 'canada',
      category: 'personal-investment',
      content: 'Save the money needed for those large purchases.',
      next: [
        {
          prompt: 'Done',
          id: 'retirement-budget'
        }
      ]
    },
    {
      id: 'retirement-budget',
      title: 'Are you expecting any large required purchases soon?',
      country: 'canada',
      category: 'retirement',
      content: 'If you are saving less than 15%, top up the amount you are saving to the full 15%.  Note that this includes employer-matched funds.',
      next: [
        {
          prompt: 'Yes',
          id: 'childrens-education'
        },
        {
          prompt: 'No',
          id: 'top-up-retirement'
        }
      ]
    },
    {
      id: 'top-up-retirement',
      title: 'Increase contributions',
      country: 'canada',
      category: 'retirement',
      content: 'Increase your annual contributions to available TFSAs and RRSPs, prioritizing the accounts to which best suit your personal financial situation.  If maxed, consider taxable investments.',
      next: [
        {
          prompt: 'Done',
          id: 'childrens-education'
        }
      ]
    },
    {
      id: 'childrens-education',
      title: 'Childrens Education',
      country: 'canada',
      category: 'other-goals',
      content: 'Do you have children and wish to help pay for some or all of their college expenses?',
      next: [
        {
          prompt: 'Yes',
          id: 'save-for-childrens-education'
        },
        {
          prompt: 'No',
          id: 'personal-goals'
        }
      ]
    },
    {
      id: 'save-for-childrens-education',
      title: 'Childrens Education',
      country: 'canada',
      category: 'other-goals',
      content: 'Evaluate available savings / investment options, such as an RESP, and contribute accordingly',
      next: [
        {
          prompt: 'Done',
          id: 'personal-goals'
        }
      ]
    },
    {
      id: 'personal-goals',
      title: 'Dealers choice',
      country: 'canada',
      category: 'other-goals',
      content: 'At this point, you have some options on how to proceed.  It is completely up to you and your perosnal goals and desires.  Would you prefer retiring early, or saving for more immediate but larger expenses like home ownership or travel?',
      next: [
        {
          prompt: 'Retire early',
          id: 'retire-early'
        },
        {
          prompt: 'Immediate goals',
          id: 'immediate-goals'
        },
      ]
    },
    {
      id: 'retire-early',
      title: 'Retire early',
      country: 'canada',
      category: 'other-goals',
      content: 'Max out any leftover TFSA, RRSP, or other sponsored accounts.  After this, use a taxable account.',
      next: []
    },
    {
      id: 'immediate-goals',
      title: 'Immediate Goals',
      country: 'canada',
      category: 'other-goals',
      content: 'Use your savings account for goals sooner than 3-5 years out.  Use a conservative mix of stocks and bonds for goals more than 3-5 years away.',
      next: []
    },
  ]
})

export const getters = {
  stepById: s => id => {
    return s.steps.find(step => step.id === id)
  },

  stepsByCategory: s => category =>  {
    return s.steps.filter(step => step.category === category)
  },

  stepsByCountry: s => country =>  {
    return s.steps.filter(step => step.country === country)
  },
}
