/*
    title : Custom Error
    author : MHRS
    date : 13/07/2023
*/


/**
 * CustomError for controlling error log and response
 */

class CustomError {

    /**
   * Create a new CustomError instance.
   * @param {object} options - Error options.
   * @param {string} options.type - Error type.
   * @param {boolean} options.res - Return Response.
   * @param {number} options.status - Response status code.
   * @param {string} options.data - Error description.
   * @param {string} options.log - Error log.
   * @param {Color} options.color - Color object.
   */

    constructor(options){
        this.type = options?.type,
        this.res = options?.res || true,
        this.status = options?.status,
        this.description = options?.data,
        this.log = options?.log || true,
        this.source = options?.source
    }
    color = {
        Reset : "\x1b[0m",
        Bright : "\x1b[1m",
        Dim : "\x1b[2m",
        Underscore : "\x1b[4m",
        Blink : "\x1b[5m",
        Reverse : "\x1b[7m",
        Hidden : "\x1b[8m",
    
        FgBlack : "\x1b[30m",
        FgRed : "\x1b[31m",
        FgGreen : "\x1b[32m",
        FgYellow : "\x1b[33m",
        FgBlue : "\x1b[34m",
        FgMagenta : "\x1b[35m",
        FgCyan : "\x1b[36m",
        FgWhite : "\x1b[37m",
        FgGray : "\x1b[90m",
    
        BgBlack : "\x1b[40m",
        BgRed : "\x1b[41m",
        BgGreen : "\x1b[42m",
        BgYellow : "\x1b[43m",
        BgBlue : "\x1b[44m",
        BgMagenta : "\x1b[45m",
        BgCyan : "\x1b[46m",
        BgWhite : "\x1b[47m",
        BgGray : "\x1b[100m",
    }
    printLog(){
        const logData = {
            type : this.type,
            status : this.status,
            description : this.description,
            source : this.source
            
            }
        console.log(
            this.color.FgRed +
            JSON.stringify(logData, null, 2)
            + this.color.Reset
        )
    }
}

module.exports = CustomError