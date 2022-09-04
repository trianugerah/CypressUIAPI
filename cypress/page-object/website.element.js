require('cypress-xpath')
require('cypress-iframe')


export default class midTransPage {
    static buyNowBtn() {
        cy.get('.btn.buy').should('have.text','BUY NOW')
        cy.get('.btn.buy').click()
        cy.wait(2000)
    }

    static inputMidtransPillow(midTransPillow) {
        cy.get('.text-right').find('[type="number"]').clear()
        .type(midTransPillow)
		cy.wait(2000)
	}

	static inputName(name) {
        cy.get('[value="Budi"]').clear().type(name)
        cy.get('[value=Budi]').should('have.value', name)
		cy.wait(2000)
	}

	static inputEmail(email) {
        cy.get('[value="budi@utomo.com"]').clear().type(email)
        cy.get('[type="email"]').should('have.value',email)
		cy.wait(2000)
	}

    static inputPhoneNo(phoneNo) {
        cy.get('[value="081808466410"]').clear().type(phoneNo)
        cy.get('[value="081808466410"]').should('have.value', phoneNo)
		cy.wait(2000)
	}

	static inputCity(City) {
        cy.get('[value="Jakarta"]').clear().type(City)
        cy.get('[value="Jakarta"]').should('have.value', City)
		cy.wait(2000)
	}

	static inputAddress(Address) {
		cy.get('textarea').clear().type(Address)
		cy.wait(2000)
	}

	static inputPostalCode(postalCode) {
        cy.get('[value="10220"]').clear().type(postalCode)
        cy.get('[value="10220"]').should('have.value', postalCode)
		cy.wait(2000)
	}

    static clickButtonCheckout() {
        cy.get('.cart-checkout').should('have.text', 'CHECKOUT')
        cy.get('.cart-checkout').click()
		cy.wait(2000)
	}

	static chooseCreditCard() {
        cy.frameLoaded('#snap-midtrans')
        cy.get('#snap-midtrans')
        .its('0.contentDocument.body')
        .should('be.visible')
        .contains('Credit/debit card').click()
		cy.wait(2000)
	}

    static inputDataCard(cardNumber, expDate, cvvNumber) {
        cy.frameLoaded('#snap-midtrans')
        //Input Card Number
        cy.iframe().xpath("//input[@autocomplete='cc-number']")
        .type(cardNumber)
        .should('have.value', '4811 1111 1111 1114')
        .wait(1000)
        
        //Input Expired date
        cy.iframe().xpath("//input[@id='card-expiry']")
        .type(expDate)
        .should('have.value', '02/23')
        .wait(1000)

        //Input cvv number
        cy.iframe().xpath('//*[@id="card-cvv"]')
        .type(cvvNumber)
        .should('have.value', '123')
        .wait(1000)
    }

    static inputInvalidCardNumber(CardNumber) {
		cy.get('#snap-midtrans')
		.its('0.contentDocument.body')
		.xpath("//input[@autocomplete='cc-number']")
		.type(CardNumber)
		.should('have.value', '4811 1111 1111 1111');
	  	cy.wait(1000)
	}

    static verifyInfoInvalidCard(){
        cy.get('#snap-midtrans')
		.its('0.contentDocument.body')
        .contains('Make sure your card number are correct.')
    }

    static clickPayNowButton() {
        cy.get('#snap-midtrans')
        .its('0.contentDocument.body')
        .contains('Pay now')
        .click()
        .wait(2000)
    }

	static inputPasswordCode(passwordCode) {
		cy.frameLoaded('#snap-midtrans')
		cy.iframe()
		.find('#app')
		.find('.iframe-3ds')
		.its('0.contentDocument.body')
		.xpath('//*[@id="PaRes"]')
		.type(passwordCode)
        .wait(1000)
        cy.iframe().find('#app').find('.iframe-3ds').its('0.contentDocument.body').contains('OK').click()
	}

    static clickOkButton() {
		cy.iframe()
        .find('#app')
        .find('.iframe-3ds')
        .its('0.contentDocument.body')
        .contains('OK').click()
	}

    static verifyUserSuccessTrx() {
        cy.frameLoaded('#snap-midtrans')
		cy.iframe().contains('Your transaction is being processed')
		cy.iframe().contains("Back to merchant's web").click()
		cy.wait(1000)
        cy.contains('Thank you for your purchase.')
		cy.contains('Get a nice sleep.')
    }

}