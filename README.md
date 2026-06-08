# 📊 Angular Finance Dashboard

Este projeto é uma aplicação de **Painel de Finanças Pessoais** desenvolvida como parte do aprendizado prático de desenvolvimento frontend com **Angular v19**. A aplicação engloba as melhores práticas modernas do framework, incluindo componentes autônomos, reatividade nativa e design responsivo de alta qualidade.

---

## 🌟 Funcionalidades e Conceitos do Angular Aplicados

Este projeto foi estruturado para demonstrar de forma didática e profissional os principais pilares do Angular moderno:

| Funcionalidade / Conceito | Descrição e Implementação |
| :--- | :--- |
| **Componentes Standalone** | Componentes totalmente independentes, dispensando o uso de módulos globais e importando dependências diretamente no decorador `@Component`. |
| **Reatividade com Signals** | Gerenciamento de estado moderno usando `signal` para dados dinâmicos e `computed` para valores derivados (cálculo automático de saldos e filtros). |
| **Modern Control Flow** | Manipulação do DOM no template utilizando a nova sintaxe nativa `@if`, `@for` e o bloco utilitário `@empty`. |
| **Reactive Forms** | Captura de dados de novas transações com tratamento em tempo real de erros, focando no estado via TypeScript. |
| **Roteamento SPA** | Navegação rápida e limpa entre páginas sem recarregar o navegador através do `RouterModule` e `<router-outlet>`. |
| **Route Guards** | Proteção de acesso de rotas usando Guards funcionais (`CanActivateFn`) para interceptação de requisições de navegação. |
| **Pipes Customizados** | Transformação dinâmica de exibição de dados com parâmetros (formatação de moeda Real R$ com indicação visual de receitas/despesas). |
| **Diretivas de Atributo** | Manipulação segura de estilos e classes no DOM usando `Renderer2` e `ElementRef` baseado no estado do componente. |

---

## 📁 Estrutura de Pastas do Projeto

A organização de diretórios do projeto segue boas práticas de mercado para escalabilidade:

```text
src/
├── app/
│   ├── app.config.ts          # Configurações globais (roteamento, provedores)
│   ├── app.routes.ts          # Definição e proteção de rotas da aplicação
│   ├── app.component.ts       # Componente inicial raiz
│   ├── core/                  # Serviços globais e guards de segurança
│   │   ├── services/          # Gerenciamento de estado (Signals)
│   │   └── guards/            # Proteção de acesso a rotas
│   ├── shared/                # Recursos e utilitários reutilizáveis
│   │   ├── pipes/             # Transformadores de dados customizados
│   │   └── directives/        # Manipuladores de DOM customizados
│   └── pages/                 # Componentes principais que agem como páginas
│       ├── dashboard/         # Tela principal de visualização de saldos e filtros
│       └── transaction-form/  # Tela com formulário reativo de transações
├── styles.css                 # Estilos globais e definição do Tema Escuro Premium
└── index.html                 # Arquivo HTML principal do projeto
```

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Clonar ou Acessar a Pasta do Projeto
Abra a pasta do projeto no seu terminal ou editor favorito (como o VS Code).

### 2. Instalar as Dependências
Instale todos os pacotes necessários especificados no `package.json`:
```bash
npm install
```

### 3. Rodar o Servidor de Desenvolvimento
Inicie a aplicação localmente:
```bash
npx ng serve
```

### 4. Acessar no Navegador
Abra o navegador e acesse:
👉 **[http://localhost:4200/](http://localhost:4200/)**

---

## 🛠️ Comandos Úteis do Angular CLI

Gerencie e compile o projeto facilmente com os comandos CLI embutidos:

* **Gerar novo Componente:** `npx ng generate component pasta/nome-do-componente`
* **Gerar novo Serviço:** `npx ng generate service core/services/nome-do-servico`
* **Gerar novo Pipe:** `npx ng generate pipe shared/pipes/nome-do-pipe`
* **Gerar nova Diretiva:** `npx ng generate directive shared/directives/nome-da-diretiva`
* **Compilar para Produção (Build):** `npx ng build`

---

## 🎨 Design System e Estilo Visual

A aplicação possui um **Premium Dark Theme** com técnicas de visualização limpas e profissionais:
* **Tipografia:** Fonte *Inter* importada do Google Fonts, proporcionando máxima legibilidade.
* **Cores:** Fundo gradiente profundo (`#0f172a` a `#1e1b4b`) com elementos utilizando efeito de *Glassmorphism* (fundo translúcido com `backdrop-filter`).
* **Responsividade:** Uso de *Flexbox*, *CSS Grid* e *Media Queries* para adaptação automática a celulares, tablets e computadores.
