import Sequelize, { Model } from "sequelize";

class Category extends Model {
    // Método estático para inicializar o modelo
    static init(sequelize) {
        // Chama o método init da classe pai (Model)
        super.init(
            {
                name: Sequelize.STRING,  
                path: Sequelize.STRING,
                url: {
                    // Atributo virtual que não é armazenado no banco de dados
                    type: Sequelize.VIRTUAL,
                    get() {
                        // Retorna a URL completa do arquivo baseado no caminho (path)
                        return `http://localhost:3001/category-file/${this.path}`;
                    }
                }
            },
            {
                sequelize, // Referência ao objeto sequelize para a conexão com o banco de dados
            }
        );
        return this   
    }
}

// Exporta o modelo Product para uso em outras partes da aplicação
export default Category;
