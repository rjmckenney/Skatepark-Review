const db = require ('./conn');


class Park {
    constructor(name, address, street, city, state){
        this.name = name;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
    
    }
    static async getAll(){
        try{
            const response = await db.any(`SELECT * FROM parks`);
            console.log('response', response);
            return response;
           }catch(error) {
               return error.message
           }
    }
    static async getById(id) {
        try {
            const response = await db.one(
                `SELECT * FROM parks WHERE id = $1;`,
                [id]
            );
            return response;
        } catch (error) {
            return error.message;
        }
    }
    
}

module.exports = Park;