module.exports =  function addNewUser(knex, email, inputPassword) {
    let dummyNum = 400;
    let dummyName = 'Dummy' + dummyNum;

    knex('users')
      .insert({
        name: dummyName,
        email: email,
        password: inputPassword
      })
  }