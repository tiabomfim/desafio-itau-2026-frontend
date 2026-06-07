# Desafio Técnico - Cadastro de Pessoas (Front-end)

[![Status](https://img.shields.io/badge/status-concluído-brightgreen)]()
[![Angular](https://img.shields.io/badge/Angular-21-red)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)]()
[![Angular Material](https://img.shields.io/badge/Angular_Material-UI-purple)]()

Aplicação SPA desenvolvida para o processo seletivo de **Engenharia de Software Jr.** O projeto foi construído com foco em experiência do usuário, validações robustas, autenticação segura e integração com uma API REST desenvolvida em Java/Spring Boot.

---

## 🏗 Arquitetura do Sistema

O projeto foi estruturado seguindo boas práticas de desenvolvimento Front-end para garantir escalabilidade, organização e manutenção simplificada.

* **Framework:** Angular 21
* **Linguagem:** TypeScript
* **UI Framework:** Angular Material
* **Arquitetura:** Standalone Components
* **Gerenciamento de Estado:** Angular Signals
* **Formulários:** Reactive Forms
* **Segurança:** JWT (JSON Web Token)
* **Comunicação:** HTTP Client + REST API

### Estrutura do Projeto

```text
src/
├── app/
│   ├── core/
│   │   ├── guard/
│   │   ├── interceptor/
│   │   └── service/
│   │
│   ├── features/
│   │   ├── login/
│   │   ├── register/
│   │   ├── home/
│   │   └── form-pessoa-modal/
│   │
│   ├── app.routes.ts
│   ├── auth.routes.ts
│   └── home.routes.ts
│
└── assets/
```

---

## 🚀 Funcionalidades

### 🔐 Autenticação

- Login com JWT
- Armazenamento seguro do token
- Controle de acesso por Auth Guard
- Logout seguro

### 👤 Cadastro de Usuários

- Cadastro dividido em etapas (Stepper)
- Dados pessoais
- Endereço
- Credenciais de acesso

### 📍 Integração com ViaCEP

- Consulta automática do CEP
- Preenchimento automático de:
  - Cidade
  - UF
  - Endereço

### 📄 Gestão de Pessoas

- Cadastro
- Edição
- Exclusão
- Pesquisa por nome
- Paginação
- Ordenação

### ✅ Validações

- CPF obrigatório
- CEP obrigatório
- E-mail válido
- Senha mínima de 6 caracteres
- Campos obrigatórios com feedback visual

### 🎨 Interface

- Angular Material
- Layout responsivo
- Feedback visual com SnackBars
- Modais para cadastro e edição

---

## 🛠 Como Executar

### Pré-requisitos

- Node.js 22+ ou superior
- Angular CLI

Instalação da CLI:

```bash
npm install -g @angular/cli
```

---

## ▶ Executando o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-repositorio.git
```

### 2. Acesse a pasta

```bash
cd frontend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
ng serve
```

ou

```bash
npm start
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

## 🔗 Integração com API

O sistema consome uma API REST disponível em:

```text
http://localhost:8080
```

### Endpoints Utilizados

| Método | Endpoint | Descrição |
|----------|----------|------------|
| POST | /api/auth/login | Autenticação |
| POST | /api/auth/register | Cadastro de usuário |
| GET | /api/pessoas | Listagem paginada |
| GET | /api/pessoas/{id} | Busca por ID |
| POST | /api/pessoas | Novo cadastro |
| PUT | /api/pessoas/{id} | Atualização |
| DELETE | /api/pessoas/{id} | Remoção |

---

## 🔒 Segurança

O projeto implementa autenticação baseada em JWT.

### Fluxo

1. Usuário realiza login.
2. API retorna o token JWT.
3. Token é armazenado localmente.
4. Interceptor adiciona automaticamente o token nas requisições.
5. Auth Guard protege rotas privadas.

---

## 🧪 Qualidade e Diferenciais

### Código

- TypeScript Strict Mode
- Standalone Components
- Angular Signals
- Reactive Forms
- Clean Code
- Separação de responsabilidades

### Experiência do Usuário

- Máscaras para CPF e CEP
- Mensagens amigáveis de erro
- Feedback visual instantâneo
- Navegação intuitiva

### Arquitetura

- Organização por Features
- Serviços desacoplados
- Rotas protegidas
- Componentes reutilizáveis

---

### Cenários Testados

- Login
- Cadastro de Usuário
- Consulta ViaCEP
- Cadastro de Pessoa
- Edição de Pessoa
- Exclusão de Pessoa
- Paginação
- Ordenação
- Validações

---

## 👤 Autora

**Rafaela Bomfim**

- GitHub: https://github.com/tiabomfim
- LinkedIn: https://linkedin.com/in/rafaelabomfim

---

### Tecnologias Utilizadas

- Angular 21
- TypeScript
- Angular Material
- RxJS
- JWT
- HTML5
- CSS3

---

*Desenvolvido para o desafio técnico de Engenharia de Software Jr., aplicando boas práticas de desenvolvimento Front-end, arquitetura moderna Angular e integração com APIs REST.*
