const bcrypt = require("bcrypt")
const CustomError = require("./customError")

/**
 * hash data
 * @async
 * @param {string} data - data for hashing
 * @returns {string}  hashed data
 */
exports.createHash = async (data) => {

    const hash = await bcrypt.hash(data, 10)
    if(hash){
        return hash
    }
    else{
        throw new CustomError({type : "Hashing"})
    }
}

/**
 * verify hashed data
 * @async
 * @param {string} hashedData - hashed data to check
 * @param {string} stringData - String to compare
 * @returns {boolean} true or false
 */
exports.verifyHash = async (stringData, hashedData) =>{
    try {
        return await bcrypt.compare(stringData, hashedData)
    } catch (error) {
        throw new CustomError({type : "Hashing"})
    }
}