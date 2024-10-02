import Sequelize, { Model } from "sequelize";
import bcrypt, { compare } from 'bcrypt'

class User extends Model {
    static init(sequelize) { //aqui em (sequelize) ele esta recebendo this.connection que é as configurações do meu banco de dados (esta na pasta ./database/index.js)
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        )

        // Adiciona um gancho (hook) que será executado antes de salvar um usuário no banco de dados
        this.addHook('beforeSave', async (user) => {
            // Verifica se o campo 'password' foi fornecido na instância do usuário
            if (user.password) {
                // Se a senha foi fornecida, gera um hash seguro da senha usando bcrypt
                // O '10' representa o custo do algoritmo de hash (quantas vezes a função é executada)
                // O valor retornado é armazenado no campo 'password_hash'
                user.password_hash = await bcrypt.hash(user.password, 10);
            }
        });

        return this
    }

     async checkPassword(password) {
      return bcrypt.compare(password, this.password_hash)
    }
}

export default User