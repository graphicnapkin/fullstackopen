//https://fullstackopen.com/en/part5/end_to_end_testing

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      'username': 'graphicnapkin',
      'name': 'jc',
      'password': 'badpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function(){
    cy.contains('login').click()
    cy.get('#username').type('graphicnapkin')
    cy.get('#password').type('badpassword')
    cy.get('#login-button').click()

    cy.contains('jc')
  })

  describe('when logged in', function () {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('graphicnapkin')
      cy.get('#password').type('badpassword')
      cy.get('#login-button').click()
    })

    // it('user can log out', function() {
    //   cy.contains('logout').click()
    //   cy.contains('login')
    // })

    it('user can create a new blog', function() {
      newBlog()
      cy.contains('test title')
    })

    it('user can view a blogs details', function() {
      newBlog()
      cy.contains('view').click()
      cy.contains('hide')
    })

    it('user can like a blogs', function() {
      newBlog()
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('user can delete a blog', function() {
      newBlog()
      const blog = cy.contains('test title')
      blog.contains('view').click()
      blog.contains('remove').click()
    })

  })
})

function newBlog(){
  cy.contains('new blog').click()
  cy.get('#title').type('test title')
  cy.get('#author').type('test author')
  cy.get('#url').type('test url')
  cy.get('#submit-button').click()
}
//https://fullstackopen.com/en/part5/end_to_end_testing