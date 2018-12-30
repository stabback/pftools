export const state = () => ({
  categories: [
    {
      id: 'budget',
      name: 'Budget',
      subtitle: 'Budget & reduce expenses, set realistic goals',
      description: [
        {
          type: 'paragraph',
          content: 'A fundamental of healthy personal finance is budgeting. The first step should then be to create a budget. This will help identify areas where expenses can be reduced in order to have leftover money for the next steps.'
        },
        {
          type: 'unordered-list',
          content: {
            introduction: 'Your budget should help you cover the following essential expenses until you have leftover money:',
            items: [
              {
                type: 'text',
                content: 'Rent/mortgage'
              },
              {
                type: 'text',
                content: 'Groceries'
              },
              {
                type: 'text',
                content: 'Utilities'
              },
              {
                type: 'text',
                content: 'Personal Hygiene and Health'
              },
              {
                type: 'text',
                content: 'Income earning expenses (such as transport)'
              },
              {
                type: 'text',
                content: 'Taxes'
              },
              {
                type: 'text',
                content: 'Minimum payment on all debts'
              },
            ]
          }
        }
      ],
      start: 'create-budget',
      color: '#3D9970'
    },
    {
      id: 'emergency',
      name: 'Emergency Fund',
      subtitle: 'Build an emergency fund',
      description: [
        {
          type: 'paragraph',
          content: 'An emergency fund is an amount of money kept somewhere liquid in a way that it can be accessed at any time, such as a savings account. This money is meant to cover unexpected expenses such as loss of work, car/appliance repairs, unexpected travel, etc. Should you ever use part of your emergency fund, you must come back to this step and replenish it before going back to any further steps.'
        },
        {
          type: 'heading-1',
          content: 'How much money to have in an emergency fund'
        },
        {
          type: 'paragraph',
          content: 'The usual recommendation for most people is 3 to 6 months of expenses. If your income is variable or uncertain, it may be worth having a bigger fund such as 9 to 12 months of expenses.'
        },
        {
          type: 'heading-1',
          content: 'Repaying high-interest debt'
        },
        {
          type: 'paragraph',
          content: 'If you are currently repaying high interest (for example above 10% interest) debt, you should start with a smaller emergency fund of 1 or 2 months of expenses while you pay down the high-interest debt.'
        },
        {
          type: 'heading-1',
          content: 'Where should I put my emergency fund'
        },
        {
          type: 'paragraph',
          content: 'Emergency funds should be put in safe, liquid accounts such as checking or savings accounts. The goal is for the fund to never decrease in value and to be able to retrieve the money very quickly should the need arise.'
        },
        {
          type: 'paragraph',
          content: 'They should not be put in any type of investment as this could result in losses or even in the impossibility to get the money out quickly. As well, a credit card should not be considered an emergency fund because of the high interest, and neither should a line of credit as it can be taken away at any time.'
        }
      ],
      start: 'small-emergency-fund',
      color: '#001F3F'
    },
    {
      id: 'employer',
      name: 'Employer monetary benefits',
      subtitle: 'Maximize and available employer sponsored matching funds',
      description: [
        {
          type: 'paragraph',
          content: "If your employer offers contribution matching in a retirement account, contribute the amount needed to get the full employer match, nothing more. As this is essentially free money, it's important to take advantage of it."
        }
      ],
      start: 'employer-match',
      color: '#0074D9'
    },
    {
      id: 'high-interest-debt',
      name: 'High-interest debt',
      subtitle: 'Clear out any remaining high to moderate interest loans',
      description: [
        {
          type: 'paragraph',
          content: "At this point, you should focus your extra money on paying down high-interest debt. High-interest debt could be defined as debt with an interest rate of 10% or higher."
        },
        {
          type: 'paragraph',
          content: "Once all high-interest debt has been paid off, it might be a good time to bump the emergency fund to a full 3 to 6 months of expenses if you opted with a smaller one first because of the high-interest debt."
        },
        {
          type: 'paragraph',
          content: "Once high-interest debt is paid off and a proper emergency fund is saved, extra money should be focused on paying down moderate-interest debt. Moderate-interest debt is debt with an interest rate of 4-5% or higher, excluding mortgages."
        }, 
      ],
      start: 'high-interest-debt',
      color: '#FF4136'
    },
    {
      id: 'personal-investment',
      name: 'Short-term savings',
      subtitle: "Prepare for life's big things",
      description: [
        {
          type: 'paragraph',
          content: "If you will be required to make a large purchase in the near future such as a car, or a large personal investment such as college, now's the time to save money for that. Money towards that purchase or personal investment should go in a high interest savings account."
        }
      ],
      start: 'retirement-savings',
      color: '#85144B'
    },
    {
      id: 'retirement',
      name: 'Retirement',
      subtitle: 'Get your retirement in order',
      description: [
        {
          type: 'paragraph',
          content: "At this point, you should aim to save and invest at least 15% of your pre-tax income for retirement. This number could be higher if you are behind on retirement savings. With more time before you need the money, you will likely now want to look at investing those savings."
        }
      ],
      start: 'retirement-budget',
      color: '#B10DC9'
    },
    {
      id: 'other-goals',
      name: 'Future',
      subtitle: 'Decide what else to work towards',
      description: [
        {
          type: 'unordered-list',
          content: {
            introduction: "You've now reached personal finance maturity. It's up to you to decide what to do with the leftover money. Some common suggestions could be:",
            items: [
              {
                type: "text",
                content: "Saving for children's education"
              },
              {
                type: "text",
                content: "Saving for property down payment"
              },
              {
                type: "text",
                content: "Saving for vacation"
              },
              {
                type: "text",
                content: "Increasing retirement savings to retire early"
              },
            ]
          }
        }
      ],
      start: 'childrens-education',
      color: 'black'
    }
  ]
})

export const getters = {
  categories: s => s.categories,
  categoryById: s => id => {
    return s.categories.find(c => c.id === id)
  }
}