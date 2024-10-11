import {v4} from 'uuid'
import * as Yup from 'yup' //importa todas as funcionalidades da biblioteca Yup e as agrupa sob o nome Yup. Isso permite que você acesse todos os métodos e esquemas de validação fornecidos pelo Yup usando a sintaxe Yup.algo(), como Yup.string(), Yup.number(), etc., para criar esquemas de validação em seu código.

import User from '../models/User'

class UserController {
    async store (req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean()
        })

        try{
            schema.validateSync(req.body, {abortEarly:false})
        } catch (err) {
            return res.status(400).json({error: err.errors})
        }

        const {name, email, password,admin} = req.body

        const userExist = await User.findOne({
            where:{
                email
            }
        })

        if (userExist){
            return res.status(409).json({error:'User already exists'})
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin
        })
        return res.status(201).json({
            id:user.id,
            name,
            email,
            admin
        })
    }
}

export default new UserController()