const { ApolloServer, gql } = require("apollo-server");
const db = require('./db');

const typeDefs = gql`
    
    type Query {
        hello: String!
        studentById(id:ID!):Student
        students: [Student]
    }
    
    type Student{
        type: String!
        id:ID!
        email:String!
        firstName:String!
        lastName:String!
        password:String!
        collegeId:String!
        college:College!
        fullName:String!
    }


    type College {
        id:ID!
        name:String
        location: String
        rating: Float
    }

    input SignUpInput {
        email:String!,
        password:String!,
        firstName:String!
    }

    input passwordmaterial{
        id: ID!,
        email: String!,
        password: String!,
        newpass: String!
    }

    type Mutation {
        createStudent(collegeId:ID,firstName:String, lastName:String) : String

        studentRetObj(collegeId:ID,firstName:String, lastName:String) : Student

        signUp(input:SignUpInput):String

        newpassword(input:passwordmaterial):String
        }
`;

const resolvers = {
    Query: {
        hello: () => "Hello World!",
       
        studentById:(root,args,context,info) => {
            return db.students.get(args.id);
            // a=db.students.get(args.id);
            // return a.lastName;
        },
        students:() =>{
            return db.students.list();
        },


    },

    Mutation:{
        createStudent:(root, args, context, info) => {
            return db.students.create({
                collegeId:args.collegeId,
                firstName:args.firstName,
                lastName: args.lastName
            })
        },

        studentRetObj:(root, args, context, info) => {
            const id = db.students.create({
                collegeId:args.collegeId,
                firstName:args.firstName,
                lastName: args.lastName
            })

            return db.students.get(id)
        },

        signUp:(root,args,context,info) => {

            const {email,firstName,password} = args.input;
      
            const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            const isValidEmail =  emailExpression.test(String(email).toLowerCase())
            if(!isValidEmail)
            throw new Error("email not in proper format")
      
            if(firstName.length > 15)
            throw new Error("firstName should be less than 15 characters")
      
            if(password.length < 8 )
            throw new Error("password should be minimum 8 characters")
            
            return "successful";
        },

        newpassword:(root, args, context, info) => {
            const {id, email, password, newpass} = args.input;
            a=db.students.get(args.input.id);
            if (a==undefined){
                throw new Error ("No user with given ID");
            }
            else{
                if(a.email===email && a.password===password){
                     const id =db.students.update({
                        id: args.input.id,
                        email: a.email,
                        firstName: a.firstName,
                        lastName: a.lastName,
                        collegeId: a.collegeId,
                        password: newpass
                    })
                    return a.lastName+", your password is updated.";
                }
                else{
                    throw new Error("wrong name/password")
                }
            
            
            return a.firstName
            }
            

        }
        
      },
      
    Student:{
        fullName:(root) =>{
            return root.firstName+" "+root.lastName;
        },

        college:(root) =>{
            return db.colleges.get(root.collegeId)
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
