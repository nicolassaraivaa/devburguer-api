import * as Yup from 'yup'
import Order from '../schemas/Order'
import Product from '../models/Products'
import Category from '../models/Category'
import User from '../models/User'

class OrderController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required()
                })
            ),
        })

        try {
            schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const {products}  = req.body

        const productsIds = products.map((product) => product.id)

        const findProducts = await Product.findAll({
            where: {
                id: productsIds
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })

        const formattedProducts = findProducts.map(product =>{
            const producIndex = products.findIndex((item) => item.id === product.id)

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[producIndex].quantity

            }

            return newProduct
        })

        const order = {
            user: {
                id: req.userId,
                name: req.userName
            },
            products: formattedProducts,
            status: 'Pedido realizado'
        }

        const createdOrder = await Order.create(order)

        return res
            .status(201)
            .json(createdOrder)
    }

    async index (req, res){
        const orders = await Order.find()

        return res.json(orders)
    }

    async update (req, res){
        const schema = Yup.object({
            status: Yup.string().required()
        })

        try {
            schema.validate(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const {admin:isAdmin} = await User.findByPk(req.userId)

        if(!isAdmin){
            return res.status(401).json()
        }

        const {id} = req.params
        const {status} = req.body

        try {
            await Order.updateOne({_id: id}, {status})
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }


        return res.json({message: 'Status update sucessfuly'})
    }
}

export default new OrderController()