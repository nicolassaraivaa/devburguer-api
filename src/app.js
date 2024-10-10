// Importa o módulo express, que é um framework para construir aplicações web em Node.js
import express from 'express'

// Importa a função resolve do módulo node:path para ajudar a resolver caminhos de arquivos
import { resolve } from 'node:path'

// Importa as rotas definidas em outro arquivo
import routes from './routes'

// Importa e inicializa a conexão com o banco de dados
import './database'

// Define a classe App para encapsular a configuração da aplicação
class App {
    constructor() {
        // Inicializa a aplicação express
        this.app = express()

        // Chama o método para configurar os middlewares
        this.middlewares()
        // Chama o método para configurar as rotas
        this.routes()
    }

    // Método para configurar os middlewares da aplicação
    middlewares() {
        // Usa o middleware para interpretar requisições JSON
        this.app.use(express.json())

        // Permite que a aplicação acesse arquivos na pasta 'uploads' através de URLs
        // Quando um usuário acessa a URL '/products-file/nome-do-arquivo', o servidor irá
        // procurar esse arquivo dentro da pasta 'uploads' e retorná-lo para o usuário.
        this.app.use('/products-file', express.static(resolve(__dirname, '..', 'uploads')))

        this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')))
    }

    // Método para definir as rotas da aplicação
    routes() {
        // Usa as rotas definidas no arquivo 'routes.js'
        this.app.use(routes)
    }
}

// Exporta uma nova instância da classe App, acessando a aplicação express
export default new App().app
