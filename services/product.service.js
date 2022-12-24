const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

    constructor() {
        this.products = [];
        this.generate();
    };

    // --> Trae o genera todos los elementos
    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            });
        };
    };

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    };

    async find() {
        return this.products;
    };

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Product not found');
        } else if(product.isBlock){
            throw boom.conflict('Product blocked')
        }else {
            return product;
        };
    };

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found!');
        } else {
            const product = this.products[index];
            this.products[index] = {
                ...product,
                ...changes
            };
            return this.products[index];
        };
    };

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Error product not found!')
        } else {
            this.products.splice(index, 1);
            return { message: 'Producto eliminado' }
        };
    };

};

module.exports = ProductsService;