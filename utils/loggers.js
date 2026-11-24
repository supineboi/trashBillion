class Loggers {
    static warn(model, method, msg){
        console.warn(`[WARN] ${model} : ${method} :: `, msg)
    }
    static info(model, method, msg){
        console.info(`[INFO] ${model} : ${method} :: `, msg)
    }
    static error(model, method, msg){
        console.error(`[ERROR] ${model} : ${method} :: `, msg)
    }
}

module.exports = Loggers;