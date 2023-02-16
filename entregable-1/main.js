class ProductManager {

    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, stock) {

        if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && stock !== undefined) {
            const product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                code: Math.round(Math.random()*100000),
            }

            this.products.push(product)
        } else {
            console.log("Los campos no pueden estar vacios");
        };

    }
    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productFind = this.products.find((product) => product.code === id)
        if (productFind === undefined) {
            console.log("Not found");
        } else {

            return productFind
        }
    }
}

const productManager = new ProductManager();

const prod1 = productManager.addProduct( "Camisa", "Camisa de algodon", 2222, "https://google.com.ar",  5,);
const prod2 = productManager.addProduct("tv2", "descripcion prod 2", 2500, "url imagen", 45);
const prod3 = productManager.addProduct("tv3", "descripcion prod 3", 3500, "url imagen", 45);


console.log(productManager.getProducts());

console.log("producto filtrado por ID",productManager.getProductById(41913));