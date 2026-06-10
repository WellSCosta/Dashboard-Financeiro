# 📊 Angular Finance Dashboard

Este projeto é uma aplicação de **Painel de Finanças Pessoais** desenvolvida como parte do aprendizado prático de desenvolvimento frontend com **Angular v19** (versão estável e moderna). A aplicação engloba as melhores práticas modernas do framework, incluindo componentes autônomos, reatividade nativa e design responsivo de alta qualidade.

---

## 🌟 Funcionalidades e Conceitos do Angular Aplicados

Este projeto foi estruturado para demonstrar de forma didática e profissional os principais pilares do Angular moderno:

| Funcionalidade / Conceito | Descrição e Implementação |
| :--- | :--- |
| **Componentes Standalone** | Componentes totalmente independentes, dispensando o uso de módulos globais e importando dependências diretamente no decorador `@Component`. |
| **Reatividade com Signals** | Gerenciamento de estado moderno usando `signal` para dados dinâmicos e `computed` para valores derivados (cálculo automático de saldos e filtros). |
| **Efeitos Reativos (`effect`)** | Sincronização automática com serviços e bibliotecas externas. Usado para atualizar o gráfico do Chart.js sempre que os dados das transações mudam. |
| **Modern Control Flow** | Manipulação do DOM no template utilizando a nova sintaxe nativa `@if`, `@for` e o bloco utilitário `@empty`. |
| **Reactive Forms & RxJS** | Captura de dados de novas transações com tratamento de erros em tempo real e monitoramento dinâmico de campos (`valueChanges`) para carregar categorias específicas. |
| **Roteamento SPA Dinâmico** | Navegação rápida entre páginas sem recarregar o navegador através do `RouterModule` e `<router-outlet>`, com suporte a parâmetros na URL (ex: `:id` para edição). |
| **Route Guards** | Proteção de acesso de rotas usando Guards funcionais (`CanActivateFn`) para interceptação de requisições de navegação. |
| **Pipes Customizados** | Transformação dinâmica de exibição de dados com parâmetros (formatação de moeda Real R$ com indicação visual de receitas/despesas). |
| **Diretivas de Atributo** | Manipulação segura de estilos e classes no DOM usando `Renderer2` e `ElementRef` baseado no estado do componente. |

---

## 📈 Integração de Gráficos e Detalhamento de Gastos

* **Chart.js:** Gráfico do tipo *Doughnut* (rosca) integrado reativamente por meio de `effect()` do Angular. Ele agrupa e soma dinamicamente os valores de despesas de cada categoria.
* **Category Breakdown:** Legenda customizada premium com barras de progresso horizontais abaixo do gráfico. Exibe o nome da categoria, valor absoluto gasto e a porcentagem correspondente de forma ordenada do maior para o menor gasto.
* **Sincronia de Cores:** As cores do gráfico de rosca coincidem perfeitamente com os indicadores das barras de progresso abaixo dele.

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
│   │   ├── services/          # Gerenciamento de estado (Signals e dados mockados)
│   │   └── guards/            # Proteção de acesso a rotas (AuthGuard)
│   ├── shared/                # Recursos e utilitários reutilizáveis
│   │   ├── pipes/             # Transformadores de dados customizados (CurrencyFormat)
│   │   └── directives/        # Manipuladores de DOM customizados (HighlightAmount)
│   └── pages/                 # Componentes principais que agem como páginas
│       ├── dashboard/         # Visualização de saldos, filtros, tabela e gráfico do Chart.js
│       └── transaction-form/  # Formulário reativo dinâmico (cadastro e edição)
├── styles.css                 # Estilos globais e definição do Tema Escuro Premium
└── index.html                 # Arquivo HTML principal do projeto
```

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Clonar ou Acessar a Pasta do Projeto
Abra a pasta do projeto no seu terminal ou editor favorito (como o VS Code).

### 2. Instalar as Dependências
Instale todos os pacotes necessários especificados no `package.json` (incluindo o Chart.js):
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

A aplicação possui um **Premium Dark Theme** com técnicas de visualização modernas:
* **Tipografia:** Fonte *Inter* importada do Google Fonts, proporcionando máxima legibilidade.
* **Cores:** Fundo gradiente profundo com elementos utilizando efeito de *Glassmorphism* (fundo translúcido com `backdrop-filter`).
* **Responsividade:** Uso de *CSS Grid* e *Media Queries* para adaptação automática a celulares, tablets e computadores, ocultando colunas secundárias em celulares para focar no conteúdo vital.
