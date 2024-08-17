// Bibliotecas e Framework
const supertest = require('supertest')

const petId = 294030001

// Em JavaScript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    const massa1 = require('../../vendors/json/massaPet')


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
    })// final do post

    // METODO POST QUE LE E CRIA 3 REGISTROS

    it.each(massa1.array.map(elemento => [
        elemento.nomePet,
        elemento.idPet,
        elemento.nomeCategoria,
        elemento.idCategoria
    ]))
        ('POST Pet Data Driven Simples: %s', (nomePet, idPet, nomeCategoria, idCategoria) => {

            // Atributos, Campos, Características, Configurações
            const pet = require('../../vendors/json/pet.json')

            // substituimos os campos que queremos personalizar atraves da massa

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            // Função de teste em si 
            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe('vaccined')
                })

        }) // Final do método POST

    // Metodo GET, Put, e Delete Simples

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
            })
    })

    // Testes Data Driven doo CRUD(POST, GET, PUT e Delete)

    massa1.array.forEach(({ nomePet, idPet, nomeCategoria, idCategoria }) => {
        it(`Post Pet Data Driven ForEach - ${nomePet}`, () => {

            // Atributos, Campos, Caracteristicas, Configuracoes

            const pet = require('../../vendors/json/pet.json')

            // substituimos os campos que queremos personalizar atraves da massa

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            // Função de teste em si 
            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe('vaccined')
                })


        }) //termina o post

        it(`Get Pet Data Driven ForEach - ${nomePet}`, () => {
            return request
                // .get('/pet/' + petID) // tradicional
                .get(`/pet/${idPet}`) // moderno: template literals
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.status).toBe('available')
                })
        })

        it(`Put Pet Data Driven ForEach - ${nomePet}`, () => {
            const pet = require('../../vendors/json/petput.json')

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .put('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.name).toEqual(nomePet)
                    expect(res.body.status).toEqual('sold')
                })

        })

        it(`Delete Pet Data Driven ForEach - ${nomePet}`, () => {
            return request
                .delete(`/pet/${idPet}`)
                .then((res) => {
                    expect(res.statusCode).toEqual(200)
                    expect(res.body.code).toEqual(200)
                    expect(res.body.message).toBe(idPet.toString())
                })
        })
        it(`Get Pet after DELETE Data Driven ForEach - ${nomePet}`, () => {
            return request
                .get(`/pet/${idPet}`)
                .then((res) => {
                    expect(res.statusCode).toBe(404); // Espera-se que o recurso não seja encontrado
                })
        })

    })// Termina o For Each da massa

}) // termina a describe
