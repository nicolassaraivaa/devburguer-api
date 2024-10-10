import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'


class categoryController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
        })

        try {
            schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(req.userId)

        if (!isAdmin) {
            return res.status(401).json()
        }

        const { filename: path } = req.file
        const { name } = req.body

        const existCategory = await Category.findOne({
            where: {
                name, // Procura um usuário que corresponda ao email fornecido
            }
        })

        if (existCategory) {
            return res.status(401).json({ error: 'this category is exist' })
        }

        const category = await Category.create({
            name,
            path
        })

        return res
            .status(201)
            .json({
                id: category.id,
                name
            })
    }

    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
        })

        try {
            schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(req.userId)

        if (!isAdmin) {
            return res.status(401).json()
        }

        const { id } = req.params

        const categoryExist = await Category.findByPk(id)

        if (!categoryExist) {
            return res.status(400).json({ message: 'Make sure you category ID is correct' })

        }

        let path
        if (req.file) {
            path = req.file.filename
        }
        const { name } = req.body

        if (!name && !path){
            return res.status(400).json({message: 'update something'})
        }

        if (name) {
            const existNameCategory = await Category.findOne({
                where: {
                    name,
                }
            })

            if (existNameCategory && existNameCategory.id != id) {
                return res.status(401).json({ error: 'this category is exist' })
            }
        }

        await Category.update({
            name,
            path
        }, {
            where: {
                id
            }
        })

        return res.status(200).json()
    }

    async index(req, res) {
        const categories = await Category.findAll()

        return res.json(categories)
    }


}

export default new categoryController()