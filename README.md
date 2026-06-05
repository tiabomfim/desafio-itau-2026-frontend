# Cadastro de Pessoas

Aplicação frontend em Angular para autenticação de usuários e gerenciamento de pessoas. O projeto oferece fluxo de login, cadastro de conta, listagem paginada de pessoas e operações de criação, edição e remoção por meio de integração com uma API HTTP.

## Visão Geral

Este projeto foi construído com Angular standalone components e Angular Material. A aplicação consome um backend local em `http://localhost:8080`, usa autenticação baseada em token e protege a área principal com guarda de rota.

Fluxo principal:

1. O usuário acessa `/login`.
2. Faz login ou cria uma conta em `/login/register`.
3. Após autenticar, é redirecionado para `/home`.
4. Em `/home`, pode pesquisar, paginar, ordenar, cadastrar, editar e excluir pessoas.

## Stack

- Angular 21
- TypeScript 5
- Angular Material
- RxJS
- Vitest
- Prettier

## Funcionalidades

- Login com validação de formulário
- Cadastro de usuário
- Proteção de rota com `authGuard`
- Interceptor HTTP para envio automático do token JWT
- Listagem paginada de pessoas
- Filtro por nome
- Ordenação por coluna
- Cadastro e edição em modal
- Exclusão com confirmação
- Feedback visual com `MatSnackBar`

## Rotas da Aplicação

| Rota | Descrição | Proteção |
| --- | --- | --- |
| `/login` | Tela de autenticação | Não |
| `/login/register` | Tela de cadastro de usuário | Não |
| `/home` | Listagem e gestão de pessoas | Sim |

## Integração com Backend

O frontend depende de uma API rodando localmente em `http://localhost:8080`.

### Endpoints de autenticação

Base URL: `http://localhost:8080/api/auth`

- `POST /login`
- `POST /register`

Payload esperado no login:

```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

Resposta esperada:

```json
{
  "token": "jwt-ou-token-equivalente"
}
```

### Endpoints de pessoas

Base URL: `http://localhost:8080/api/pessoas`

- `GET /api/pessoas?page=0&size=10&sort=nome,asc&nome=abc`
- `GET /api/pessoas/{id}`
- `POST /api/pessoas`
- `PUT /api/pessoas/{id}`
- `DELETE /api/pessoas/{id}`

Formato esperado da listagem:

```json
{
  "content": [
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "login": "maria.silva",
      "cep": "01001000"
    }
  ],
  "totalElements": 1
}
```

## Autenticação

O token retornado no login é salvo no `localStorage` com a chave `access_token`.

Comportamento atual:

- O `authGuard` bloqueia acesso à rota `/home` quando não há token salvo.
- O `authInterceptor` adiciona o header `Authorization: Bearer <token>` em requisições autenticadas.
- O logout remove o token local e redireciona para `/login`.

## Estrutura do Projeto

```text
src/
  app/
    app.config.ts
    app.ts
    core/
      guard/
      interceptor/
      service/
    features/
      form-pessoa-modal/
      home/
      login/
      register/
    routes/
      app.routes.ts
      auth.routes.ts
      home.routes.ts
  main.ts
  material-theme.scss
  styles.css
```

## Componentes e Responsabilidades

### `src/app/features/login`

- Tela de login
- Validação de e-mail e senha
- Chamada ao `AuthService.login`
- Redirecionamento para `/home`

### `src/app/features/register`

- Cadastro de usuário
- Validação de nome, e-mail e senha
- Chamada ao `AuthService.register`
- Redirecionamento para `/login`

### `src/app/features/home`

- Tela principal autenticada
- Busca por nome
- Paginação
- Ordenação
- Exclusão de registro
- Abertura de modal para cadastro e edição

### `src/app/features/form-pessoa-modal`

- Formulário de criação e edição de pessoa
- Máscara de CPF e CEP
- Persistência via `PessoaService`

### `src/app/core/service/auth.service.ts`

- Login
- Registro
- Logout
- Consulta do token
- Estado simples de autenticação

### `src/app/core/service/pessoas.service.ts`

- Listagem paginada
- Busca por ID
- Cadastro
- Atualização
- Exclusão

## Pré-requisitos

- Node.js LTS
- npm

Versão recomendada:

- Node.js `22.x` ou `24.x`

Evite usar versões ímpares do Node em ambiente local de build, porque o Angular CLI pode apresentar comportamento instável fora das versões LTS.

## Instalação

```bash
npm install
```

## Execução em Desenvolvimento

```bash
npm start
```

Depois, acesse:

```text
http://localhost:4200
```

## Build

```bash
npm run build
```

Build de desenvolvimento com watch:

```bash
npm run watch
```

## Testes

```bash
npm test
```

## Configurações Relevantes

### `angular.json`

- Builder de aplicação: `@angular/build:application`
- Entry point: `src/main.ts`
- Styles globais:
  - `src/material-theme.scss`
  - `src/styles.css`

### `tsconfig.json`

O projeto usa configuração estrita, incluindo:

- `strict`
- `noImplicitOverride`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `noPropertyAccessFromIndexSignature`

Isso significa que mudanças em formulários, templates e tipagem devem respeitar regras mais rígidas de compilação.

## Padrões do Projeto

- Componentes standalone
- Lazy loading de rotas
- Services para acesso a dados
- Guard para proteção de navegação
- Interceptor para autenticação
- Signals do Angular para estado simples de UI

## Campos do Cadastro de Pessoa

O modal de pessoa trabalha com os seguintes campos:

- `nome`
- `cpf`
- `email`
- `dataNascimento`
- `cep`
- `numero`
- `complemento`

Regras de validação atuais:

- Nome: obrigatório, mínimo de 3 caracteres, máximo de 150
- CPF: obrigatório, aceita com ou sem máscara
- E-mail: obrigatório e válido
- Data de nascimento: obrigatória
- CEP: obrigatório, aceita com ou sem máscara
- Número: obrigatório
- Complemento: opcional

## Observações Importantes

- O frontend está acoplado a URLs locais fixas no código para autenticação e pessoas.
- Não existe, neste momento, uso de arquivo de ambiente para trocar `baseUrl`.
- O projeto depende de o backend retornar mensagens de erro em `err.error.mensagem` para exibição amigável.

## Melhorias Recomendadas

- Externalizar a URL da API para `environment`
- Tipar melhor as respostas da API
- Padronizar modelos/interfaces de domínio
- Adicionar testes unitários para services, guard e interceptor
- Adicionar tratamento global de erro HTTP
- Implementar refresh token, se necessário

## Scripts Disponíveis

```bash
npm start
npm run build
npm run watch
npm test
```

## Licença

Uso interno ou conforme a política definida pelo mantenedor do projeto.
