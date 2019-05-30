module.exports = (email) =>{
    const [ name , extension ] = email.split('@')
    if (!name || !extension) 
        return false 
    if (extension !== 'vnu.edu.vn') 
        return false 
    if (name.length <= 3) 
        return false 
    return true
}