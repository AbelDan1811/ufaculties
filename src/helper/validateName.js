module.exports = async (fullName) => {
    if (!fullName) 
        return {} 
        
    const words = fullName.split(' ')
    const firstName = words.pop()
    const lastName = words.join(' ')
    
    if (firstName || lastName)
        return { firstName , lastName }
}