const db= require('../database/dbConfig.js');
const bcrypt= require('bcryptjs');

module.exports= {
    fetchBy,
    fetchById,
    register,
};

function fetchById(id){
    return db('users')
        .select('id', 'username')
        .where('id', id)
        .first();
};

function fetchBy(filter){
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
};

async function register(user){
   // hash the password with a time complexity of 14 
   user.password= await bcrypt.hash(user.password, 14);

   const [id]= await db('users').insert(user);
   return fetchById(id);
};