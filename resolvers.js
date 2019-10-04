var Book  = require('./app/model/Book');


var resolvers = {
    Query: {
        getMessage: async function (_,{id}) {
           var bookdb = await Book.findOne({id})
        //    console.log(bookdb)
           if (bookdb.length === 0) {
                throw new Error("not_found")
           } else {
               return bookdb
           }
          },
          getAll: function() {
            var bookdb = Book.find(function(err, books) {
                if (err)
                    res.send(err);
                return books.map(book=>({id:book.id,content:book.content,author:book.author}))
            });
            return bookdb
          },

    },
    Mutation:{
        createMessage: async function (_,{input}) {
            // console.log('create')
            // Create a random id for our "database".
            var id = require('crypto').randomBytes(10).toString('hex');
                
            //database
            var book = new Book();      // create a new instance of the Bear model
            book.id = id;  // set the bears name (comes from the request)
            book.content = input.content
            book.author = input.author
            // save the bear and check for errors
            var bookdb = await book.save();
            var hasil = {id:bookdb.id,content:bookdb.content,author:bookdb.author}
            return (hasil)        
            // return new Message(id, input);
          },
          updateMessage: async function (_,{id, input}) {
            var bookdb = await Book.findOneAndUpdate({id},
                {author:input.author,content:input.content})
            if(bookdb===null){
                throw new Error('ID_NOT_FOUND')
            } 
            else{
                return 'UPDATED!'
            }
        }
            
    }
}

  module.exports = resolvers