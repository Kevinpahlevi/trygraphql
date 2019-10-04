const {expect} = require('chai')
const gql = require('graphql-tag')
const client = require('./resources/client')
const {app,mongoose} = require('../server')

const insertQl = gql`
mutation insertQl($input: MessageInput){
    createMessage(input: $input){
        id
        content
        author
    }
}
`

const getOneQl = gql`
query getOneQl($id: ID!){
    getMessage(id: $id){
        id
        author
        content
      }
}
`

let server;
describe('create.item', async () => {
    before(()=>{
        try {
           server =  app.listen(8080)
        } catch (error) {
            throw error
        }
    });

    it('insert new item', async () => {
        const {data:{createMessage}} = await client.mutate({
            mutation: insertQl,
            variables: {
                input:{
                    author: "test",
                    content:"test1"
                }
            }
        })
        const create = createMessage
        const idCreate = createMessage.id
        const {data:{getMessage}} = await client.query({
            query: getOneQl,
            variables: {
            id: idCreate
            }
        })
        const get = getMessage
        expect(create.content).to.equal(get.content)
        
    });

    after(()=>{
        server.close()
    });
})
