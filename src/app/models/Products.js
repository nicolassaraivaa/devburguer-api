import Sequelize, { Model } from "sequelize";

// Define a classe Product, que herda da classe Model do Sequelize
class Product extends Model {
    // Método estático para inicializar o modelo
    static init(sequelize) {
        // Chama o método init da classe pai (Model)
        super.init(
            {
                // Define os atributos do modelo Product
                name: Sequelize.STRING, // Nome do produto, do tipo STRING
                price: Sequelize.INTEGER, // Preço do produto, do tipo INTEGER
                path: Sequelize.STRING, // Caminho do arquivo do produto, do tipo STRING
                offer: Sequelize.BOOLEAN,
                url: {
                    // Atributo virtual que não é armazenado no banco de dados
                    type: Sequelize.VIRTUAL,
                    get() {
                        // Retorna a URL completa do arquivo baseado no caminho (path)
                        return `http://localhost:3001/products-file/${this.path}`;
                    }
                }
            },
            {
                sequelize, // Referência ao objeto sequelize para a conexão com o banco de dados
            }
        );

        return this
    }

    static associate(models) {
        // Define a associação entre o modelo Product e o modelo Category
        this.belongsTo(models.Category, {
            foreignKey: 'category_id', // Define a chave estrangeira 'category_id' que referencia a tabela 'categories'
            as: 'category', // Nome da associação, permitindo referir-se à categoria como 'category' em consultas
        })
    }

}

// Exporta o modelo Product para uso em outras partes da aplicação
export default Product;

// Explicação detalhada:
// 1. `belongsTo` estabelece uma relação de "pertence a", indicando que cada produto pertence a UMA categoria específica.
// 2. A chave estrangeira 'category_id' no modelo 'Product' é um campo que armazena o 'id' da categoria à qual o produto pertence.
// 3. O campo 'category_id' só pode conter um único valor por produto, ou seja, um produto só pode estar associado a uma categoria por vez.
// 4. O alias 'category' define o nome da associação. Isso significa que, em consultas do Sequelize, você pode usar 'category' para se referir à categoria associada ao produto.
// 5. Essa configuração impede que um produto tenha duas categorias simultâneas, já que o 'category_id' é um campo único no banco de dados, permitindo apenas uma associação por produto.
// 6. Se fosse necessário que um produto tivesse múltiplas categorias, seria necessário usar uma relação de "muitos para muitos" com uma tabela intermediária.