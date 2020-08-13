### Basic Queries:

```graphql
#basic
{
  hello
}
```

```graphql
#get values
{
  students{
	fullName
  }
}
```

```graphql
#use id
{
  studentById(id:"S1001"){
	lastName
	college{
  	name
	}
  }
}
```

```graphql
#user input
query userinput($iidd : ID!){
  studentById(id:$iidd){
	lastName
	college{
  	name
	}
  }
}


#this goes as input{  "iidd" : "S1002"  }
```

```graphql
#alias
{
  a : studentById(id:"S1001"){
	fullName
  }
  b : studentById(id:"S1002"){
	fullName
  }
}
```

```graphql
#fragmentation
{
  a : studentById(id:"S1001"){
	...frag
  }
  b : studentById(id:"S1002"){
	...frag
  }
}

fragment frag on Student{
  fullName
  email
  college{
	name
  }
}
```

```graphql
#directives
{
  studentById(id:"S1003"){
	fullName
	college @include(if:true){
  	name
	}
	college @skip(if:true){
  	location
	}
    }
}
```

```graphql
#new Student
mutation {
   createStudent(collegeId:"col-2",firstName:"bios",lastName:"grahp")
}
```

```graphql
#StudentReturnObj
mutation {
   studentRetObj(collegeId:"col-101",firstName:"Susan",lastName:"George") {
  	id
  	firstName
  	college{
     	id
     	name
  	}
   }
}
```

```graphql
#Validation
mutation dosign($in:SignUpInput){
  signUp(input:$in)  
}

#input values
#{
#   "in":{
#  	"email": "ada",
#  	"password": "pass@1234",
#     	 "firstName":"asdasd"
#   }
#}
```

```graphql
#Mutation + Validation

mutation NewPassword($iidd : passwordmaterial){
  newpassword(input: $iidd)
}

#input
#{
#   "iidd":{
#    	"id": "S1004",
#  	"email": "geniusc00p3r@gmail.com",
#  	"password": "henlo",
#      	"newpass":"pass123"
#   }
#}
```
