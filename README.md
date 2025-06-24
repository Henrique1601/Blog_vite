# Blog
Um blog que eu tive vontade de fazer para praticar meus conhecimentos em React e Node.js, e testando algumas novidades que a IA me trouxe.
Mais funcionalizas mais tarde...

## Funcionalidades

- Sing up
- Sing in
- Salvamento dos dados no MongoDb
- Bcrypt 
- cloudinary(para salvar as imagens online)
- jsonwebtoken
- multer(para salvar as imagens)
- dotenv(para salvar as variáveis de ambiente)
- HASH e SALT 
- Responsividade
- Filtros 
- Criações de posts com imagens URL e Importando
- Edição de posts e delação de posts em breve...
- Importação de imagens salva no https://cloudinary.com/ e na pasta local(por enquanto)
  
## Screenshots
![App Screnshot]()
![App Screnshot]()
![App Screnshot]()

## Variáveis de Ambiente
`Mongo URL = mongodb+srv://user:<db_password>@cluster0.ytlbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 `
`PORT(backend) = 5000`
`PORT(frontend) = 5173) `
`JWT_SECRET =  `
`CLOUDINARY_URL =  `
`CLOUDINARY_CLOUD_NAME = `
`CLOUDINARY_API_KEY = `
`CLOUDINARY_API_SECRET = `

## Rodando localmente
Clone o projeto

```bash
  git clone  https://github.com/Henrique1601/BLOG_VITE
```

Entre no diretório do projeto backend e frontend e Instale as dependências
```bash
  cd backend
  npm i express cloudinary cors mongoose nodemon dotenv bcrypt jsonwebtoken multer
  cd frontend
  npm i react react-dom react-router-dom bootstrap scss react-bootstrap axios 
```

Inicie o backend
```bash
    npm run dev
```

Inicie o frontend
```bash
    npm run dev
```

## Stack utilizada

**Front-end:** HTML, CSS, JavaScript, React, Bootstrap, Scss
**Back-end:** Node.js 
**Banco de dados** MongoDB 


## Autores

- [@HenriqueBezerra](https://github.com/Henrique1601)