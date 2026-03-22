# GymTracker

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Selenium](https://img.shields.io/badge/-selenium-%2343B02A?style=for-the-badge&logo=selenium&logoColor=white)

<br>

**GymTracker** é um ecossistema modular full-stack para gestão e acompanhamento de treinos de alta performance, construído com foco em escalabilidade, tipagem forte e segurança de dados.

O projeto soluciona a complexidade de organizar rotinas de treino através de um motor de inteligência que adapta sugestões e automatiza cálculos de volume e intensidade para o usuário final.

<br>

## Funcionalidades Chave

- **Autenticação e Segurança:** Sistema de login completo com autenticação JWT e proteção de rotas privadas no backend.
- **Calendário Integrado:** Gestão visual de treinos e qualidade de sono através de um calendário interativo para controle de frequência.
- **Execução de Exercícios:** Interface dedicada para acompanhamento em tempo real durante o treino, facilitando a marcação de progresso.
- **Coach Engine:** Sistema de Seed Progressivo que injeta treinos específicos (PPL, Arnold Split, Full Body) baseados no nível e foco do usuário.
- **Gestão de Rotinas:** Painel para organização de treinos semanais (A-G) com reordenação dinâmica e descoberta de novos planos.
- **Design Responsivo:** Interface totalmente adaptada para dispositivos mobile, garantindo uma experiência fluida no ambiente de treino.

<br>

## Arquitetura Técnica

O projeto foi desenvolvido seguindo princípios de Clean Code e separação de responsabilidades:

- **Backend (Node.js/Express):** Arquitetura extensível utilizando TypeScript para garantir tipagem forte em controllers, models e middlewares.
- **Frontend (Next.js 14):** Aplicação de componentes modularizados e reutilizáveis, com lógica de estado derivado para otimização de performance.
- **Utilities Padronizados:** Centralização de regras de negócio (cálculos de intensidade e volume) para garantir integridade entre sugestões e logs.
- **Estilização Dinâmica:** UI moderna construída com Tailwind CSS, incluindo suporte a temas e dashboards visuais complexos.

<br>

## Qualidade e Estabilidade (QA)

A confiabilidade do sistema é assegurada por uma pirâmide de testes automatizados:

- **Testes Unitários (Jest):** Validação de funções de utilidade e lógica de negócio isolada.
- **Testes de Ponta a Ponta (Selenium):** Automação de fluxos críticos de usuário (Login, Cadastro de Treino, Calendário) garantindo a integridade da integração.
- **Gestão de Versão:** Fluxo de trabalho baseado em Git Flow com commits semânticos e branches lógicas (feat, fix, test).

<br>

## Como rodar o projeto

O repositório é estruturado em monorepo simples:

**1. Instalação Geral:**
```bash
# Clone o repositório
git clone [https://github.com/eiguinho/gym-tracker.git](https://github.com/eiguinho/gym-tracker.git)
```

**2. Backend:**

```bash
cd backend
npm install
npm run dev
```

**3. Frontend:**

```bash
cd frontend
npm install
npm run dev
```

#Desenvolvido por Igor como parte de um estudo avançado em Engenharia de Software Full-stack.
