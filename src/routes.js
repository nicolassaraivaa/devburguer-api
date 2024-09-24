import { Router } from "express"

const routes = new Router()

routes.get('/', (req,res) => {
    return res.status(209).json({message:'Hello World!'})
})

export default routes