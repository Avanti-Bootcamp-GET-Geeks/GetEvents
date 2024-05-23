# Plataforma de Gerenciamento de Eventos Culturais (Front-end)

## ℹ️ Sobre

GetEvents é uma **plataforma completa para o gerenciamento de eventos culturais**, projetada para simplificar a organização, visualização e o cadastramento de eventos. Com uma interface intuitiva, fácil de usar e responsiva, a plataforma oferece acesso personalizado para organizadores, visitantes e administradores.

Na página inicial, os usuários podem visualizar todos os eventos cadastrados através de cards que mostram detalhes como localização e horário. A plataforma possui um front-end robusto e um back-end seguro desenvolvido por nossa equipe, garantindo desempenho e segurança.

**Administradores**, via login, podem gerenciar locais, cargos e categorias de eventos, além de criar, editar e excluir eventos. **Organizadores**, após se cadastrarem, podem criar, editar e excluir eventos e locais. **Visitantes** têm acesso à visualização e detalhes dos eventos. A plataforma também permite filtrar eventos por nome do evento, categoria e local.

GetEvents atende às necessidades dos organizadores de eventos culturais, facilitando a gestão de todas as etapas, desde a criação até a promoção dos eventos.

🗓️ O **período de desenvolvimento** deste projeto foi de `11/05/2024` a `22/05/2024` e foi utilizado como parte avaliativa para a conclusão do Avanti Bootcamp.


## 💻 Tecnologias e ferramentas utilizadas
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB "Framework front-end")
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black "Linguagem de programação")
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white "Linguagem de estilização")
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white "Framework CSS")
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white "Versionamento de código")
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white "Versionamento de código")
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white "Utilizado para subir a aplicação em servidor local e para baixar dependências")
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="40" alt="Gerenciador de dependências" title="Gerenciador de dependências" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt='vscode' width="30" alt="IDE vs code" title="IDE vs code" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg"  width="30" alt="IDE intellij" title="IDE intellij" />


## Pré-requisitos para executar a aplicação

Antes de utilizar o projeto, certifique-se de seguir as seguintes etapas:

- [x] **Ter o Git instalado na máquina.**
- [x] **Ter o Node.js instalado.**
- [x] **Ter um editor de código de sua preferência.**
- [x] **Ter clonado e executado o repositório do back-end, disponível [aqui](https://github.com/Avanti-Bootcamp-GET-Geeks/back-end-plataforma-eventos-culturais).**
- [x] **Clonar este repositório com o comando abaixo:**

  ```shell
  git clone https://github.com/Avanti-Bootcamp-GET-Geeks/GetEvents.git
  ```

## ⚙️ Configurações necessárias

Com o repositório clonado, execute os seguintes comandos no diretório do projeto:

- **Para baixar as dependências**:

  ```shell
  npm install
  ```

>[!IMPORTANT]
>
> Antes de iniciar este projeto, todas as configurações da aplicação do back-end devem estar concluídas.

- **Para iniciar a aplicação**:

  ```shell
  npm run dev
  ```

## ✅ Resultados obtidos

### Home Pública
![home-publica.png](src/assets/img/screen/home-publica.png)

### Cadastro
![cadastro.png](src/assets/img/screen/cadastro.png)

### Login
![login.png](src/assets/img/screen/login.png)

### Home Logada
![home.png](src/assets/img/screen/home.png)

## Autenticação de Usuários

### Admin
![admin.png](src/assets/img/screen/admin.png)

### Organizador
![organizador.png](src/assets/img/screen/organizador.png)

### Visitante
![visitante.png](src/assets/img/screen/visitante.png)

## Página Minha Conta

### Administrador
![admin-menu.png](src/assets/img/screen/admin-menu.png)

### Organizador e Visitante
![usuario-minha-conta.png](src/assets/img/screen/usuario-minha-conta.png)

#### Menu Usuários
![usuarios-menu.png](src/assets/img/screen/usuarios-menu.png)

## Eventos 

### Cadastrar Evento
![cadastrar-evento.png](src/assets/img/screen/cadastrar-evento.png)

### Detalhes do Evento
![evento.png](src/assets/img/screen/evento.png)

### Página Meus Eventos
![meus-eventos.png](src/assets/img/screen/meus-eventos.png)

### Página de Edição/ Atualização do Evento
![editar-evento.png](src/assets/img/screen/editar-evento.png)

## Locais

### Página de Local
![locais.png](src/assets/img/screen/locais.png)

### Criar Local
![criar-local.png](src/assets/img/screen/criar-local.png)

### Editar Local
![editar-local.png](src/assets/img/screen/editar-local.png)

### Excluir Local
![confirma-exclusao.png](src/assets/img/screen/confirma-exclusao.png)

#### Não é permitido excluir se um local estiver associado a algum evento.
![local-associado.png](src/assets/img/screen/local-associado.png)

## Categorias

### Página de Categorias
![categorias.png](src/assets/img/screen/categorias.png)

### Criar Categoria
![criar-categoria.png](src/assets/img/screen/criar-categoria.png)

### Editar Categoria
![editar-categoria.png](src/assets/img/screen/editar-categoria.png)

### Excluir Categoria
![exclusao-categoria.png](src/assets/img/screen/exclusao-categoria.png)

#### Não é permitido excluir se uma categoria estiver associado a algum evento.
![categoria-associada.png](src/assets/img/screen/categoria-associada.png)