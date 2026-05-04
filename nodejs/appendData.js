
const fs = require("fs")
const todo =[
    "code","read", "play", "eat", "go to church", "wash my cloth", "sleep", "cook"
]
const arrayData = todo.join('\n')
fs.appendFile("todo.txt",arrayData + '\n' , (error) =>{
    if(error){
         throw error
    }})
    console.log("data append")
