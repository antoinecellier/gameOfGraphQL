# Schema preview
`graphqlviz "http://localhost:3000/graphql" | dot -Tpng -o graph.png; eog graph.png`

# List of queries

- List of families
`{
  families{
    name
    stronghold {
      name
    }
    motto
    members {
      firstname
    }
  }
}`

- Family by name
`{
  character(name: "Lannister") {
    name
    members {
      firstname
    }
  }
}`

- Character by firstname with variable
`query($firstname: String){
  characters(firstname: $firstname){
    firstname
    gender
    brothers{
      firstname
      brothers{
        firstname
      }
    }
  }
}`

`{
  "firstname": "Joanna"
}`

- Same with Postman
GET
`http://localhost:3000/graphql?query=query+getFamily($name:String){families(name:$name){name%20members{firstname}}}&variables={"name":"Lannister"}`

- Places (union use case)
`{
  places {
    ... on Stronghold {
      name
      builder
    }
    ... on Region {
      name
      area
      family {
        name
      }
    }
  }
}`

- Families with Postman (http request)
curl -X POST localhost:3000/graphql \
    -H "Content-Type:application/json" \
    -d '{"query": "{characters {name}}"}'

# List of mutations
 - Add region
 `mutation{
   createRegion(family:"Stark", name:"The north", area: 60000){
     name
     family{
       name
       stronghold{
         name
       }
     }
   }
 }`
