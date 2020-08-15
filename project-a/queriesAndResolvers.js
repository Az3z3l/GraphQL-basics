const { ApolloServer, gql } = require("apollo-server");
const db = require('./db');


const typeDefs = gql`
  type Query {
    greeting: String
    students:[Student]
    studentById(id:ID!):Student
    college: [College]
    attention(id: ID!): String
    helloTo(name: names ): String
}

  type Student {
    id:ID!
    email:String
    firstName:String
    lastName:String
    password:String
    collegeId:String
    fullName:String
    college: College
  }

  type College {
    id:ID!
    name:String
    location: String
    rating: Float
  }
  enum names {
    jon
    van
    bovi
  }

`;

const resolvers = {
  Query: {
    greeting: () => "hello alien",

    students:() => db.students.list(),
    studentById:(root,args,context,info) => {
      return db.students.get(args.id);
    },
    college:() => db.colleges.list(),
    attention:(root, args, context, info) =>{
      return `hai ${db.students.get(args.id).firstName}`;   // select firstname from students where id = args.id
    },
    helloTo:(root, args, context, info)=>{
      return `hi ${args.name}`;
  } 
  },

  Student: {
    fullName:(root, args, context, info)=>{
      return root.firstName+" "+root.lastName;
    },
    college:(root) => {
      return db.colleges.get(root.collegeId);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url} and ${db.colleges.list()}`));
