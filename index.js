const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using SraphQL schema language
const schema = buildSchema(`
    type Product {
        id: ID!
        name: String
        price: Int
        description: String
    }

    type Query {
        getProduct ( id: ID! ): Product
    }
`);

const products = [{
    id: 1,
    name: '첫 번째 작품',
    price: 2000,
    description: "하하하"
},{
    id: 2,
    name: '두 번째 작품',
    price: 1200,
    description: "호호호"
}]

const root = {
    getProduct : ({id}) => products.find( product => product.id === parseInt(id)),
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => {
   console.log('Running a GraphQL API server at localhost:4000/graphql');
});
