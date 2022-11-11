const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://root:rootpwd@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'carrent';

var user_collection;
var car_collection;

async function main() {
  await client.connect();
  console.log('conectado com sucesso ao mongoDB');
  const db = client.db(dbName);
  user_collection = db.collection('user');
  car_collection = db.collection('car');
   
  return '.';
}

main()
  .then(console.log)
  .catch(console.error);
//   .finally(() => client.close());


// Users
async function getUsers() {
    console.log('dentro do getUsers')
    const findResult = await user_collection.find().toArray();
    console.log('usuarios: ', findResult);
    return findResult;
}

async function saveUser(user){
  const result = await user_collection.insertOne(user)
  console.log('Repository - saveUser - Inserted user')
  console.log(result)
  return result;
  }

// Cars
async function getCars() {
    console.log('dentro do getCars')
    const findResult = await car_collection.find().toArray();
    console.log('carros: ', findResult);
    return findResult;
}
/*async function getProdsByUser(user) {
  console.log('getProdsByUser - Username param:', user.username)
  
  const query = { "createdBy.username": user.username };
  const findResult = await product_collection.find(query).toArray();
  console.log('Repository - getProdsByUser - Found documents =>', findResult);
  return findResult;
}*/

/*async function getProds() {
  console.log('getProds -')
  
  const findResult = await product_collection.find().toArray();
  console.log('Repository - getProds - Found documents =>', findResult);
  return findResult;
}*/


// Exportacoes
exports.getUsers = getUsers;
exports.getCars = getCars;
exports.saveUser = saveUser;
//exports.getProdsByUser = getProdsByUser;
//exports.getProds = getProds;