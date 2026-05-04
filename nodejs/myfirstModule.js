exports.myDateTime = function() {
    const date = new Date()
    const daily = date.getFullYear() 
    return (
        daily
    )
}
exports.greating = (name, age,skill)=>{
    const great = `My name is ${name}, I am ${age} year old, Am into  ${skill}.`
    return(
        great
    )
}
exports.calculate = (operator1,operator,  operator2) =>{
    let result;
    if(operator==="+"){
         result = operator1 + operator2
    }
    else if(operator==="-"){
        result= operator1 - operator2
    }
    else if(operator==="*"){
        result = operator1 * operator2
    }
    else if(operator==="/"){
        if(operator1<operator2){
            result=`${operator1} cannot be didvided by ${operator2}`
        }
        else{
            result= operator1 /operator2
        }
    }
    else {
        result = "invalid"
    }
    return(
        result
    )
}