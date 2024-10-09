import jwt from 'jsonwebtoken' // Importa a biblioteca jsonwebtoken para manipulação de tokens JWT
import authConfig from '../../config/auth' // Importa as configurações de autenticação, como a chave secreta e a expiração do token

// Middleware de autenticação
function authMiddleware(req, res, next) {
    const authToken = req.headers.authorization // Obtém o token de autorização do cabeçalho da requisição

    // Verifica se o token foi fornecido
    if (!authToken) {
        return res.status(401).json({ error: 'token not provided' }) // Retorna erro 401 se o token não estiver presente
    }

    const token = authToken.split(' ').at(1) // Divide o cabeçalho em partes e obtém o token (geralmente está no formato "Bearer <token>")

    try {
        // Verifica e decodifica o token usando a chave secreta
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error() // Se ocorrer um erro na verificação do token, lança um novo erro. 
            }
            req.userId = decoded.id // Se a verificação for bem-sucedida, armazena o ID do usuário decodificado na requisição
            req.userName = decoded.name

        })
    } catch (err) {
        return res.status(401).json({ error: 'token is invalid' }) // Se um erro ocorrer, retorna erro 401 indicando que o token é inválido
    }

    return next() // Chama a próxima função no middleware se tudo estiver correto
}

export default authMiddleware // Exporta o middleware para ser utilizado em outras partes do aplicativo
