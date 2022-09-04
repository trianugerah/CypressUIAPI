
describe('automation api test', () => {

  it('Get list User', () => {
    cy.request({
      url: 'https://reqres.in/api/users?page=2',
      method: 'GET'
    })
    .then((response) => {
      expect(response).to.have.property('status', 200)
      expect(response.body.data[0]).to.have.keys('id', 'email', 'first_name', 'last_name', 'avatar')
    })
  })

  it('Get Single User', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2'
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data).to.have.keys('id', 'email', 'first_name', 'last_name', 'avatar')
      })
  })

  it('User Not Found', () => {
    cy.request({
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).eq(404)
      })
  })

  it('Get List Resource', () => {
    cy.request({
      url: 'https://reqres.in/api/unknown',
    })
      .then((response) => {
        expect(response.status).eq(200)
        expect(response.body.page).eq(1)
        expect(response.body.per_page).eq(6)
        expect(response.body.total_pages).eq(2)
        expect(response.body.data[0]).to.have.keys('id', 'name', 'year', 'color', 'pantone_value')
      })
  })

  it('Get Single Resource', () => {
    cy.request({
      url: 'https://reqres.in/api/unknown/2',
    })
      .then((response) => {
        expect(response.status).eq(200)
        expect(response.body.data).to.have.keys('id', 'name', 'year', 'color', 'pantone_value')
      })
  })

  it('Single Source Not Found', () => {
    cy.request({
      url: 'https://reqres.in/api/unknown/23',
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).eq(404)
      })
  })

  it('Create Users', ()=> {
    cy.request({
        method : 'POST',
        url : 'https://reqres.in/api/users',
        body: {
            "name": "morpheus",
            "job": "leader"
        }
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.keys('name', 'job', 'id', 'createdAt')
    })
  })

  it('Update Users', ()=> {
    cy.request({
        method : 'PUT',
        url : 'https://reqres.in/api/users/2',
        body: {
            "name": "morpheus",
            "job": "zion resident"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.keys('name', 'job', 'updatedAt')
        expect(response.body).to.have.property('job', 'zion resident')
    })
  })

  it('Update Users use PATCH', ()=> {
    cy.request({
        method : 'PATCH',
        url : 'https://reqres.in/api/users/2',
        body: {
            "name": "morpheus",
            "job": "zion"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.keys('name', 'job', 'updatedAt')
        expect(response.body).to.have.property('job', 'zion')
    })
  })

  it('Delete', ()=> {
    cy.request({
        method : 'DELETE',
        url : 'https://reqres.in/api/users/2',
    }).then((response) => {
        expect(response.status).to.eq(204)
    })
  })

  it('Register Users Successful', ()=> {
    cy.request({
        method : 'POST',
        url : 'https://reqres.in/api/register',
        body: {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.keys('id', 'token')
    })
  })

  it('Register Users Failed', ()=> {
    cy.request({
        method : 'POST',
        url : 'https://reqres.in/api/register',
        failOnStatusCode: false,
        body: {
            "email": "sydney@fife"
        }
    }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', 'Missing password')
    })
  })

  it('Login Success', ()=> {
    cy.request({
        method : 'POST',
        url : 'https://reqres.in/api/login',
        body: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4')
    })
  })

  it('Login Failed', ()=> {
    cy.request({
        method : 'POST',
        url : 'https://reqres.in/api/login',
        failOnStatusCode: false,
        body: {
            "email": "eve.holt@reqres.in"
        }
    }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error', 'Missing password')
    })
  })

  it('Get Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?delay=3'
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.page).eq(1)
        expect(response.body.per_page).eq(6)
        expect(response.body.total).eq(12)
        expect(response.body.total_pages).eq(2)
        expect(response.body.data[0]).to.have.keys('id', 'email', 'first_name', 'last_name', 'avatar')
      })
  })

})