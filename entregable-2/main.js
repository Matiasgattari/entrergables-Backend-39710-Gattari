import {
    randomUUID
} from 'crypto'
import fs from 'fs/promises'

class ProductManager {

    constructor(path) {
        this.products;
        this.path = path;
    }

    async getProducts() {
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)
        return this.products
    }
    async addProduct(title, description, price, thumbnail, stock) {

        const productFind = this.products.find((product) => product.title === title)
        if (productFind) {
            console.log('Ya existe un producto con ese titulo');
        }

        if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && stock !== undefined) {
            const product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                code: randomUUID()
            }

            this.products.push(product)
            const jsonProducts = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, jsonProducts)

        } else {
            console.log("Los campos no pueden estar vacios");
        };
    }

    async getProductById(id) {
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)

        const productFind = this.products.find((product) => product.code === id)
        if (productFind === undefined) {
            console.log("Not found");
        } else {

            return productFind
        }
    }

    async changeProduct(id, title, description, price, thumbnail, stock) {
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)

        const productFindIndex = this.products.findIndex((product) => product.code === id)
        if (productFindIndex === -1) {
            console.log("Product not found");
        } else {
            if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && stock !== undefined) {

                const productoModificado = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                    code: id

                }

                this.products[productFindIndex] = productoModificado;

                const jsonProducts = JSON.stringify(this.products, null, 2)
                await fs.writeFile(this.path, jsonProducts)

            } else {
                console.log('Datos incompletos');
            }
        }
    }

    async deleteProduct(id) {
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)

        const productFindIndex = this.products.findIndex((product) => product.code === id)

        if (productFindIndex === -1) {
            console.log("Product Not found");
        } else {
            this.products.splice(productFindIndex, 1)
            console.log('Product deleted');

            const jsonProducts = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, jsonProducts)
        }

    }
}

// const productManager = new ProductManager('./productos.txt');

// const prod1 = productManager.addProduct("Camisa", "Camisa de algodon", 2222, "https://google.com.ar", 5, );
// const prod2 = productManager.addProduct("tv2", "descripcion prod 2", 2500, "url imagen", 45);
// const prod3 = productManager.addProduct("tv3", "descripcion prod 3", 3500, "url imagen", 45);
// const prod4 = productManager.addProduct("tv4", "descripcion prod 3", 3500, "url imagen", 45);
// const prod5 = productManager.addProduct("tv5", "descripcion prod 3", 3500, "url imagen", 45);

// productManager.deleteProduct('6c80a977-dfa6-489a-a8a6-51d6861c26fd')

// console.log('console log de get products',productManager.getProducts());

// console.log("producto filtrado por ID", productManager.getProductById('6c80a977-dfa6-489a-a8a6-51d6861c26fd'));