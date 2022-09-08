import { BASE_URL_Midtrans, MidtransPillow, Name, Email, PhoneNo, City, Address, PostalCode, CardNumber,
	ExpirationDate, CVVNumber, Passcode, InvalidCardNumber } from '../../config'
import midTransPage from '../../page-object/website.element'

describe('Automation web Midtrans', () => {
    before(function () {
        cy.visit(BASE_URL_Midtrans)
        cy.viewport
    })

    beforeEach(function () {
        cy.reload()
        cy.viewport(1280, 750)
    })

    after(function () {
        cy.clearCookies({ log: true})
    })

    it('Verify user success create payment', () => {
        midTransPage.buyNowBtn()
        midTransPage.inputMidtransPillow(MidtransPillow)
		midTransPage.inputName()
		midTransPage.inputEmail()
        midTransPage.inputPhoneNo()
        midTransPage.inputCity()
        midTransPage.inputAddress()
        midTransPage.inputPostalCode()
        midTransPage.clickButtonCheckout()
        midTransPage.chooseCreditCard()
        midTransPage.inputDataCard(CardNumber, ExpirationDate, CVVNumber)
        midTransPage.clickPayNowButton()
        midTransPage.inputPasswordCode(Passcode)
        midTransPage.clickOkButton()
        midTransPage.verifyUserSuccessTrx()
    })

    it('Verify user failed validate credit card payment', () => {
        midTransPage.buyNowBtn()
        midTransPage.inputMidtransPillow(MidtransPillow)
		midTransPage.inputName()
		midTransPage.inputEmail()
        midTransPage.inputPhoneNo()
        midTransPage.inputCity()
        midTransPage.inputAddress()
        midTransPage.inputPostalCode()
        midTransPage.clickButtonCheckout()
        midTransPage.chooseCreditCard()
        midTransPage.inputInvalidCardNumber(InvalidCardNumber)
        midTransPage.verifyInfoInvalidCard()
    })
})
