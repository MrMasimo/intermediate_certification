/// <reference types="cypress" />

context('E2E тест', () => {
  // Зайтина страницу
	beforeEach(() => {
		cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
	})

	it('Выполнение шагов:', () => {
    	// Кликнуть по кнопке “Customer Login”
		cy.get('button[ng-click="customer()"]').click()
    	//В выпадающем списке выбрать Один пункт
		cy.get('#userSelect').should('be.visible')
		cy.get('#userSelect').should('have.value', '')
		cy.get('#userSelect').select(2)
    	// Нажать кнопку Login
		cy.get('#userSelect').parent().next('button').should('be.visible').click()
    	//Кликнуть поэлементу Deposit
		cy.get('button[ng-click="deposit()"]').should('be.visible').click()
    	//Ввести в поле сумму и кликнуть накнопку Deposit
		cy.get('form[ng-submit="deposit()"]').find('input[type="number"]').type('100')
		cy.get('form[ng-submit="deposit()"]').find('button[type="submit"]').click()
    	//Найти на странице надпись “Deposit Successful”
		cy.get('span[ng-show="message"]').should('be.visible').should('have.text', 'Deposit Successful')
    	//Выйти из сеанса (Logout)
		cy.get('button[ng-click="byebye()"]').click()
	})
})
