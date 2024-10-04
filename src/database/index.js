// Importa a biblioteca Sequelize
import Sequelize from "sequelize";

// Importa as configurações do banco de dados a partir do arquivo de configuração
import configDatabase from '../config/database';

// Importa o modelo de usuário que foi definido anteriormente
import User from '../app/models/User';
import Product from "../app/models/Products";
import Category from "../app/models/Category";


// Cria um array para armazenar todos os modelos que você deseja inicializar
const models = [User, Product, Category];

// Classe que gerencia a conexão com o banco de dados
class Database {
    constructor() {
        // Chama o método de inicialização da conexão
        this.init();
    }

    // Método que inicializa a conexão com o banco de dados
    init() {
        // Cria uma nova instância do Sequelize usando as configurações do banco de dados
        this.connection = new Sequelize(configDatabase);

        // Para cada modelo no array, inicializa o modelo com a conexão do banco de dados
        models.map(model => model.init(this.connection))
        .map(
            (model) => model.associate && model.associate(this.connection.models)
        )
    }
}

// Exporta a instância da classe Database
export default new Database();
    