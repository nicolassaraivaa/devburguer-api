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
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        })
    }
    
}

// Exporta o modelo Product para uso em outras partes da aplicação
export default Product;
