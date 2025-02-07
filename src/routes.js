import { Router } from "express" // Importa o Router do Express para definir as rotas da aplicação
import multer from 'multer' // Importa a biblioteca multer para manipulação de uploads de arquivos
import multerConfig from './config/multer' // Importa as configurações do multer, que definem como os arquivos serão armazenados
import authMiddleware from "./app/middlewares/auth" // Importa o middleware de autenticação para proteger rotas

// Importa os controladores que gerenciam a lógica de negócio
import UserController from "./app/controllers/UserController"
import ProductController from './app/controllers/ProductController'
import SessionController from './app/controllers/SessionController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderContoller'
import CreatePaymentIntentController from './app/controllers/strip/CreatePaymentIntentController'

const routes = new Router()

// Configura o multer com as configurações definidas
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store )

// Aplica o middleware de autenticação para as próximas rotas
routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store )
routes.get('/products', ProductController.index )
routes.put('/products/:id', upload.single('file'), ProductController.update )

routes.post('/categories', upload.single('file'),  CategoryController.store )
routes.get('/categories', CategoryController.index )
routes.put('/categories/:id', upload.single('file'), CategoryController.update )

routes.post('/orders', OrderController.store )
routes.get('/orders', OrderController.index )
routes.put('/orders/:id', OrderController.update )

routes.post("/create-payment-intent", CreatePaymentIntentController.store)

export default routes