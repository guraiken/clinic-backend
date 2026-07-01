export const env = {
    chaveAcesso: process.env.CHAVE_ACESSO || "chaveSuperSecreta123456",
    chaveRefresh: process.env.CHAVE_REFRESH || "chaveSuperSecreta123456",
    usuarioDB: process.env.USUARIO,
    senhaDB: process.env.SENHA,
    nomeBanco: process.env.NOME_BANCO
}