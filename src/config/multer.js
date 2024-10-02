import multer from 'multer'; // Importa a biblioteca multer para lidar com uploads de arquivos
import { v4 } from 'uuid'; // Importa a função v4 para gerar IDs únicos
import { extname, resolve } from 'node:path'; // Importa funções para manipulação de caminhos

export default {
    // Configura o armazenamento do multer
    storage: multer.diskStorage({
        // Define o destino onde os arquivos enviados serão armazenados
        destination: resolve(__dirname, '..', '..', 'uploads'), // Resolve o caminho absoluto para a pasta 'uploads'
        
        // Define o nome do arquivo que será salvo
        filename: (req, file, callback) => 
            // Gera um ID único e adiciona a extensão original do arquivo (ex:jpeg,png...)
            callback(null, v4() + extname(file.originalname)) // Chama o callback passando o novo nome do arquivo
    })
}
