// Bibliotecas e Framework
const supertest = require('supertest')

const petId = 294030001

// Em JavaScript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL

    // Funções ou Métodos: Its
    it('POST Pet', () => {

        // Atributos, Campos, Características, Configurações
        const pet = require('../../vendors/json/pet.json')

        // Função de teste em si 
        return request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.name).toBe('Thor')
                expect(res.body.category.name).toBe('dog')
                expect(res.body.tags[0].name).toBe('vaccined')
            })
        // ---> Voltaremos 21:29

    }) // Final do método POST

    it('GET Pet', () => {
        return request
            // .get('/pet/' + petID) // tradicional
            .get(`/pet/${petId}`) // moderno: template literals
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.status).toBe('available')
            })
    })

    it('PUT Pet', () => {
        const pet = require('../../vendors/json/petput.json')

        return request
            .put('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.name).toEqual('Marks')
                expect(res.body.status).toEqual('sold')
            })

    })

    it('DELETE Pet', () => {
        //const petId2 = 294030002
        return request
            .delete(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.message).toBe(petId.toString())
            })
    })
    it('GET Pet after DELETE', () => {
        return request
            .get(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toBe(404); // Espera-se que o recurso não seja encontrado
            });
    });


    // Oi
}) // termina a describe
