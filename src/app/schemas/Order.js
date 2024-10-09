// Importa a biblioteca mongoose para interagir com o MongoDB
import mongoose from "mongoose";

// Define o esquema para o modelo de pedido (Order)
const OrderSchema = new mongoose.Schema({
    user:  // Define o campo 'user' que contém informações do usuário
    {
        id: {  // ID do usuário
            type: String,  // Tipo de dado: String
            required: true,  // Este campo é obrigatório
        },
        name: {  // Nome do usuário
            type: String,  // Tipo de dado: String
            required: true,  // Este campo é obrigatório
        },
    },
    products: [  // Define um array para armazenar os produtos do pedido
        {
            id: {  // ID do produto
                type: Number,  // Tipo de dado: Number
                required: true,  // Este campo é obrigatório
            },
            name: {  // Nome do produto
                type: String,  // Tipo de dado: String
                required: true,  // Este campo é obrigatório
            },
            price: {  // Preço do produto
                type: Number,  // Tipo de dado: Number
                required: true,  // Este campo é obrigatório
            },
            category: {  // Categoria do produto
                type: String,  // Tipo de dado: String
                required: true,  // Este campo é obrigatório
            },
            quantity: {  // Quantidade do produto
                type: String,  // Tipo de dado: String
                required: true,  // Este campo é obrigatório
            }
        }
    ],
    status: {  // Status do pedido (ex: 'pendente', 'completo', etc.)
        type: String,  // Tipo de dado: String
        required: true  // Este campo é obrigatório
    },
},
    {
        timestamps: true  // Cria campos 'createdAt' e 'updatedAt' automaticamente
    }
);

// Cria e exporta um modelo chamado 'Order' utilizando o esquema OrderSchema
// O nome 'Order' será pluralizado pelo Mongoose para referenciar a coleção 'orders' no MongoDB.
// O OrderSchema define a estrutura dos documentos na coleção, especificando os campos 
// que cada pedido deve ter, os tipos de dados desses campos e se são obrigatórios ou não.
// Ao exportar este modelo, podemos importá-lo em outros módulos para interagir com a 
// coleção 'orders', facilitando operações de criação, leitura, atualização e exclusão 
// de pedidos no banco de dados.
export default mongoose.model('Order', OrderSchema);

