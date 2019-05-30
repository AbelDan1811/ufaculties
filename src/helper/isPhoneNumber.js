module.exports = ( numberString ) =>{
    const pattern = /^[0-9]{9,10}$/
    return pattern.test(numberString)
}
