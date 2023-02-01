import { promises as fs } from 'fs'
class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(newProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            console.error("Error 1: Verifique campos.");

        } else {
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.code === newProduct.code);

            if (!product) {
                aux.push({ ...newProduct, id: ProductManager.idGenerator() });
                await fs.writeFile(this.path, JSON.stringify(aux))

            } else {
                console.error("Error 2: El producto esta repetido");
            }
        }
    }

    async getProducts() {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        console.log(aux);
    }


    async getProductByID(idProduct) {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if (product) {
            console.log(product);
        } else {
            console.error("Error 3: Producto no encontrado");
        }
    }

    async updateProduct(newProduct, idProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            console.error("Error 1: Verifique campos.")

        } else {
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.id === idProduct);
            if (product) {
                const indice = aux.findIndex(prod => prod.id === idProduct);
                aux[indice] = { ...newProduct, id: idProduct };
                await fs.writeFile(this.path, JSON.stringify(aux));
                console.log(`El producto (id:${idProduct}) ha sido actualizado`);
            } else {
                console.log("Error 3: Producto no encontrado");
            }
        }
    }

    async deleteProduct(idProduct) {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if (product) {
            const newArray = aux.filter(prod => prod.id !== idProduct)
            await fs.writeFile(this.path, JSON.stringify(newArray));
            console.log(`El producto (id:${idProduct}) ha sido eliminado`);
        } else {
            console.log("Error 3: Producto no encontrado");
        }
    }

    static idGenerator() {
        this.generatedID ? this.generatedID++ : this.generatedID = 1;
        return this.generatedID;
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

// Creacion Manager y productos

const manager1 = new ProductManager("./data.json");

const product1 = new Product("Producto prueba", "Producto prueba 1", 100, "Img", "12345", 10);
const product2 = new Product("Producto prueba 2", "Producto prueba 2", 200, "Img", "67890", 15);

const product1Update = new Product("Producto prueba actualizado", "Producto 1 actualizado", 300, "Img", "3112", 20);

// TEST

const test = async () => {
    await fs.writeFile("./data.json", "[]")

    await manager1.getProducts();

    await manager1.addProduct(product1);
    await manager1.addProduct(product2);

    await manager1.getProducts();

    await manager1.getProductByID(2);
    await manager1.getProductByID(5);

    await manager1.updateProduct(product1Update, 1)
    await manager1.getProductByID(1);

    await manager1.deleteProduct(6);
    await manager1.deleteProduct(2);

    await manager1.getProducts();
}

test();