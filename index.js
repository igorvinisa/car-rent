const express = require('express')
//const cookieSession = require('cookie-session')
const app = express()
const port = 8080

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Middlewares
//  - Coockies
/*app.use(cookieSession({
  name: 'cookieName',
  keys: ['cookieKey'],
  maxAge: 60 * 1000
}))

app.use((req, res, next) => {
  if(req.path == '/'){
    if(req.session.user)
      res.redirect('/home')
    else next()
  } else next()
});*/

const mongoRepository = require('./repository/mongo-repository')

app.listen(port, () => {
    console.log(`sistema rodando na porta ${port}`)
  })  


// metodos GET
app.get('/', (req, res) => {
  mongoRepository.getCars().then((carros) => {
    res.render('home', {dbcar: carros})
  })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})


app.get('/signin', (req, res) => {
  res.render('signin');
});

app.get('/loja', (req, res) => {
    res.render('loja');
});

app.get('/loja/alugar', (req, res) => {
  res.render('alugar');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/loja/aluguel', (req, res) => {
  res.render('aluguel');
});


// metodos POST

app.post('/user/signUp', (req, res) => {
  console.log('entrou aqui')
  console.log(req.body)
  let newClient = req.body
  console.log(newClient)
  if(req.body.senha == req.body.confirmSenha){
  newClient.senha = req.body.senha
  }
  let newAux = {
  nome: newClient.nome,
  dataNasc: newClient.dataNasc,
  genero:newClient.genero,
  telefone:newClient.telefone,
  email: newClient.email,
  senha: newClient.senha
  }
  
  console.log(newAux)
  console.log(newClient)
  
  mongoRepository.saveUser(newAux).then((insertedUser) => {
  console.log('Inserted Product')
  console.log(insertedUser)
  //res.redirect('/prod/list')
  })
});

app.post('/car/new', (req, res) => {
  let carro = req.body

  mongoRepository.saveCar(carro).then((result) => {
    res.render('home', {dbcar: result})
  })
})