### Instale as Dependências:
``` npm install ```
### Execute o Servidor de Desenvolvimento:
``` npm run dev ```
O aplicativo será aberto automaticamente no seu navegador em http://localhost:5173/ (ou em uma porta similar, indicada pelo Vite).

### Vue Tasks Project: Gerenciador de Tarefas com Pinia e Vue 3
O Vue Tasks é uma aplicação de gerenciamento de tarefas (To-Do List) desenvolvida com Vue 3. Este projeto foi concebido para demonstrar a utilização de boas práticas de arquitetura, centralizando o estado da aplicação através do Pinia para um gerenciamento de dados eficiente e desacoplado da interface.

### Funcionalidades Principais
Este projeto oferece um conjunto completo de ferramentas para gerenciar tarefas:

CRUD Completo: Permite a criação, leitura, edição e exclusão de tarefas, garantindo um ciclo de vida completo para cada item.

Marcação de Status: Tarefas podem ser facilmente marcadas como concluídas, com a contagem atualizada em tempo real na interface.

Layout Adaptável (Responsivo): A interface utiliza Tailwind CSS para se ajustar perfeitamente, exibindo um layout em coluna em dispositivos móveis e um layout de painel duplo (formulário e lista lado a lado) em telas maiores.

Notificações Toast: Integrado ao Pinia Store, o sistema de notificação Toast fornece feedback visual (sucesso, erro, info) para cada ação de CRUD (adicionar, editar, excluir).

Persistência de Dados: Todas as tarefas são salvas no LocalStorage do navegador, garantindo que os dados permaneçam após o recarregamento da página.

### Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes ferramentas e frameworks modernos:

Vue.js 3: Framework JavaScript principal, utilizando a Composition API (com a sintaxe <script setup>) para melhor organização e reatividade.

Pinia: A biblioteca de gerenciamento de estado global recomendada para o Vue 3.

Tailwind CSS: Framework CSS utility-first para desenvolvimento rápido e design responsivo.

Vite: Ferramenta de build e servidor de desenvolvimento otimizado e de alta performance.
### Arquitetura do Projeto
A arquitetura do projeto é fortemente baseada no padrão de Gerenciamento de Estado Centralizado (Pinia), que separa a lógica de negócios da camada de apresentação (componentes Vue).

1. Gerenciamento de Estado (useTaskStore Pinia)
O módulo useTaskStore é o coração da aplicação. Ele encapsula o estado e toda a lógica de negócio (as regras de manipulação das tarefas):

State: Contém o estado reativo central, como a lista de tarefas (tasks), a tarefa atualmente em edição (editingTask) e o estado da notificação (toast).

Getters: Funções que calculam dados derivados do estado, como o totalTasks (número total de tarefas) e o completedTasksCount (tarefas concluídas).

Actions: Funções responsáveis por toda a lógica de modificação do estado, incluindo as operações de CRUD (addTask, updateTask, removeTask, toggleTask), a persistência no LocalStorage e a função showToast para notificação.

2. Componentes Vue
Os componentes focam-se em consumir o estado do Pinia e renderizar a interface, mantendo-se simples e de fácil manutenção:

App.vue: Atua como o Root Component. Ele inicializa e consome o useTaskStore, e é responsável por montar a estrutura de layout principal (cabeçalho, formulário e seção de lista).

Form.vue: Componente responsável pela criação e edição de tarefas. Os dados são controlados localmente e, ao submeter, ele emite um evento que o App.vue utiliza para chamar as Actions do Pinia (addTask ou updateTask).

TasksSection.vue: Componente que exibe a contagem de tarefas concluídas e renderiza o container para a lista de tarefas.

TaskItem.vue: Representa um item individual da lista. Inclui o título, descrição, checkbox de status e botões de ação (editar/excluir), com um modal de confirmação para exclusão.

ToastNotification.vue: Eexibe as notificações para o usuário.
