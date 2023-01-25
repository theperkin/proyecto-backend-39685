class ProductManager {//clase y constructor
    constructor() {
        this.products = []
    }

    addProduct(newProduct) {//Metodo addProduct
        const newProductValues = Object.values(newProduct);
        if (newProductValues.includes("") || newProductValues.includes(null)) {
            console.error("Completar datos.")
        } else {
            const product = this.products.find(prod => prod.code === newProduct.code);
            if (!product) {
                const newID = ProductManager.idGenerator()
                this.products.push({ ...newProduct, id: newID });
            } else {
                console.error("Producto duplicado.");
            }
        }
    }

    getProducts() {
        return this.products;
    }
    getProductByID(idProduct) {
        const product = this.products.find(prod => prod.id === idProduct);
        if (product) {
            return product;
        } else {
            return "Not found.";
        }
    }

    static idGenerator() {//Generador de ID estatico
        this.generatedID ? this.generatedID++ : (this.generatedID = 1);
        return this.generatedID;
    }
}

class Product {//Propiedades de productos
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}