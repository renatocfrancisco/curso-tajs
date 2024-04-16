import crypto from 'node:crypto'
import fs from 'node:fs/promises'

export default class Service{
    #filename
    constructor({filename}){
        this.#filename = filename
    }

    #hashPassword(password){
        const hash = crypto.createHash('sha256')
        hash.update(password)
        return hash.digest('hex')
    }

    create({username, password}){
        const data = JSON.stringify({
            username,
            password: this.#hashPassword(password),
            createdAt: new Date().toISOString()
        }).concat('\n')

        return fs.appendFile(this.#filename, data)
    }
    read() {}
}