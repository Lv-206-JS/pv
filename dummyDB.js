var _db = [];

_db.push({
  username: 'anti-k',
  password: 'pass',
  email : 'antik@yahoo.com',
  first_name : 'Anton',
  last_name : 'Camino',
  id : '1'
});

var usersCollection = {
  createUser : function(user){
    user.id = _db.length + 1;
    _db.push(user);
    return user;
  },

  getUser : function(id){
    for (var i = 0; i < _db.length; i++) {
      var user = _db[i]; 
      if(user.id == id)
        return user
    };
  },

  getUsers : function(){
    return _db;
  }
}


module.exports = usersCollection