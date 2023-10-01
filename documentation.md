# Documentação do projeto

## FitApp
 
### 🔑 Descrição do projeto
Aplicativo para auxiliar na prática de exercícios físicos, com o objetivo de criar uma rotina de treinos totalmente personalizada para o usuário, com base em seus objetivos e necessidades.

### 💡 Tecnologias utilizadas
- NodeJs
- Fastify
- MySQL
- Prisma
- Docker
- Flutter

### 🚀 Como rodar o projeto
- Clone o repositório
- Instale as dependências com `npm install` ou `yarn install`
- Crie um arquivo `.env` na raiz do projeto e preencha com as variáveis de ambiente necessárias
- Subir o banco de dados com `docker-compose up -d`
- Rode o projeto com `npm dev-start` ou `yarn dev-start`

### 📚 Definição do projeto
- [x] Criar um usuário
    > **Campos do usuário:**
    > - Nome **
    > - E-mail **
    > - Senha **
    > - Data de nascimento
    > - Peso
    > - Altura
    > - Foto de perfil
    > - Acesso ao aplicativo

     ** Campos obrigatórios
<br>
- [ ] Atualizar um usuário
    > **Campos que podem ser atualizados:**
    > - Nome
    > - Senha
    > - Data de nascimento
    > - Peso
    > - Altura
    > - Foto de perfil

    Acesso ao aplicativo e E-mail (Somente permissão de administrador)
<br>
- [ ] Deletar um usuário

- [ ] Login(Com e-mail e senha)

- [ ] Criar treinos personalizados

- [ ] Listar treinos de exemplo

- [ ] Criar exercícios(Somente permissão de administrador)

- [ ] Listar exercícios

- [ ] Atualizar data de nascimento, peso e altura do usuário para calcular _Taxa Metabólica Basal(TMB)_ e _Índice de Massa Corporal (IMC)_

⚠️ **OBS:** Documentação em construção
