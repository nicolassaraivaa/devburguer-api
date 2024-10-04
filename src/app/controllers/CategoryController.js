import * as Yup from 'yup'
import Category from '../models/Category'

class categoryController{
    async store(req, res){
        const schema =  Yup.object({
            name: Yup.string().required(),
        })

        try{
            schema.validateSync(req.body, {abortEarly:false})
        } catch (err) {
            return res.status(400).json({error: err.errors})
        }

        const {name} = req.body

        const existCategory = await Category.findOne({
            where: {
                name, // Procura um usuário que corresponda ao email fornecido
            }
        })

        if (existCategory) {
            return res.status(401).json({error: 'this category is exist'})
        }

        const category = await Category.create({
            name,
        })
     
        return res
        .status(201)
        .json({
            id: category.id,
            name
        })
    }

    async index(req,res){
        const categories = await Category.findAll()

        return res.json(categories)
    }

    
}

export default new categoryController ()