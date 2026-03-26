# E2E Test Writing Guide

## Selector Priority (most preferred to least)

1. `aria-label` — primary selector for all elements: `cy.get('[aria-label="card"]')`
2. Role-based queries — for dropdowns, options, form elements: `cy.findAllByRole('option')`, `cy.findAllByLabelText('...')`
3. Native attributes — IDs and name attributes: `cy.get('#source')`, `cy.get('select[name="source_account"]')`
4. `data-ref` — for third-party/grid elements: `cy.get('[data-ref="eLabel"]')`
5. DOM traversal — only as last resort: `.parent().siblings().last()`

Never use CSS classes as selectors (`.item-card`, `.btn-create`, etc.).

## Element Selection Patterns

For buttons and text-based elements, always use `cy.get()` then chain `.contains()`:

```ts
// good
cy.get('button').contains('Add Income').click();

// avoid
cy.contains('button', 'Add Income').click();
```

For submit buttons, use the `type="submit"` selector directly:

```ts
// good
cy.get('button[type="submit"]').click();

// avoid
cy.get('button').contains('Add Income').click(); // when it's a submit button
```

## Chaining Pattern

Chain `.contains()` then assert — get the element, find text within, then check existence:

```ts
// good
cy.get('[aria-label="card"]').contains("Salary").should("exist");

// avoid
cy.get('[aria-label="card"]').should("contain", "Salary");
```

## Waiting for API Calls

Always wait for ALL API responses triggered by an action — whether it's a click, select, type, or any interaction. If an action fires multiple requests, wait for every single one:

```ts
// single request
cy.get('button').contains('Add Income').click();
cy.wait('@createIncome');

// multiple concurrent requests — wait for ALL of them
cy.get('button[type="submit"]').click();
cy.wait(['@createIncome', '@getIncomes']);
```

Never proceed to the next step until all triggered requests have resolved.

All intercepts live in a dedicated file (`cypress/support/intercept-commands.ts`) as a single reusable command. This avoids duplicating intercept definitions across test files.

```ts
// cypress/support/intercept-commands.ts
Cypress.Commands.add('interceptAll', () => {
  cy.intercept('POST', '/auth/login').as('login');
  cy.intercept('GET', '/auth/incomes').as('getIncomes');
  cy.intercept('POST', '/auth/create-income').as('createIncome');
  // ... all other intercepts
});
```

Then call it in `beforeEach`:

```ts
beforeEach(() => {
  cy.interceptAll();
});
```

## Assertion Patterns

- Existence: `.should("exist")` / `.should("not.exist")`
- Count: `.should("have.length", 3)`
- Always test both positive and negative cases when filtering:

```ts
cy.findAllByRole('option').contains('Expected').should('exist');
cy.findAllByRole('option').contains('Filtered Out').should('not.exist');
```

## Custom Commands for Repeated Actions

Extract repeated multi-step interactions into custom commands in `commands.ts`:

```ts
Cypress.Commands.add('login', () => { ... });
```

## Navigation

Always start from the home page (`cy.visit('/')`). Never navigate by URL directly. Instead, click the sidebar/tab links to reach the desired page:

```ts
// good
cy.visit('/');
cy.get('a').contains('Income').click();

// avoid
cy.visit('/home/income');
```

## Test Structure

- Use `beforeEach` for intercepts + login + navigation via clicks
- Use comments to separate logical sections within a test
- One `it` block per user flow, not per assertion
- Force click only when necessary: `.click({ force: true })`

## Naming

- Test files: `<feature>.cy.ts`
- Describe block: feature name (e.g., `"Income"`)
- It block: describe the user action (e.g., `"should create an income with..."`)
