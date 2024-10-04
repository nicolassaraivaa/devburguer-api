import * as Yup from 'yup' // Importa todas as funcionalidades da biblioteca Yup e as agrupa sob o nome Yup
import User from '../models/User' // Importa o modelo User
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
    async store(req, res) {
        // Define um esquema de validação com Yup
        const schema = Yup.object({
            email: Yup.string().email().required(), // O campo email deve ser uma string no formato de email e é obrigatório
            password: Yup.string().min(6).required() // O campo password deve ser uma string com no mínimo 6 caracteres e é obrigatório
        })

        // Verifica se o corpo da requisição segue o esquema de validação definido
        const isValid = await schema.isValid(req.body)

        // Função para retornar uma mensagem de erro caso o email ou senha estejam incorretos
        const emailOrPasswordIncorrect = () => {
            return res
                .status(401)
                .json({ error: 'make sure your email or password are correct' }) // Mensagem de erro personalizada
        }

        // Se a validação falhar, retorna o erro de email ou senha incorretos
        if (!isValid) {
            return emailOrPasswordIncorrect()
        }

        // Extrai o email e password do corpo da requisição
        const { email, password } = req.body

        // Busca o usuário no banco de dados com base no email fornecido
        const user = await User.findOne({
            where: {
                email, // Procura um usuário que corresponda ao email fornecido
            }
        })

        // Se o usuário não for encontrado, retorna a mensagem de erro
        if (!user) {
            return emailOrPasswordIncorrect()
        }

        // Verifica se a senha fornecida é igual à senha armazenada no banco de dados
        const isSamePassword = await user.checkPassword(password)

        // Se a senha estiver incorreta, retorna a mensagem de erro
        if (!isSamePassword) {
            return emailOrPasswordIncorrect()
        }

        // Retorna os dados do usuário autenticado, sem a senha
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            // Gera um token JWT (JSON Web Token) para autenticação do usuário
            token: jwt.sign({ id: user.id }, authConfig.secret, {
                // O payload do token inclui o id do usuário
                // A chave secreta é usada para assinar o token e garantir sua integridade
                expiresIn: authConfig.expiresIn // Define o tempo de expiração do token, após o qual será necessário um novo login
            })

        })
    }
}

export default new SessionController() // Exporta a instância da classe SessionController
