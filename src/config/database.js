module.exports = {
    // Define o banco de dados que será utilizado, neste caso o PostgreSQL
    dialect: 'postgres',

    // Especifica o endereço do servidor onde o banco de dados está rodando
    host: 'localhost',

    // Porta padrão do PostgreSQL
    port: 5432,

    // Nome de usuário para acessar o banco de dados
    username: 'postgres',

    // Senha para o usuário do banco de dados
    password: 'postgres',

    // Nome do banco de dados que será utilizado
    database: 'devburger',

    // Configurações adicionais para a criação de tabelas
    define: {
        // Cria automaticamente os campos `created_at` e `updated_at` em cada tabela
        timestamps: true,

        // Utiliza snake_case (underline) em vez de camelCase para os nomes de colunas e tabelas
        underscored: true,
        
        // Aplica a regra de snake_case para nomes de atributos e associações
        underscoredAll: true,
    }
};
