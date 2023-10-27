# Sobre o trabalho
Integrantes: Rafael M. de Vargas, Kaua Vieira, Leonardo Gomes

O intuito do projeto é fazer um sistema de classificação de filmes
#
# Projeto Final de Programação 3

### Definição
Em grupos formados por até 4 pessoas, vocês devem desenvolver um sistema que, de alguma forma, será um clone do Tinder. Porém, o que será avaliado pelas pessoas que o utilizarão será de escolha dos grupos. Algumas sugestões são jogos, séries, filmes, artistas, etc. De forma objetiva, o sistema deve apresentar para pessoas logadas itens que devem ser classificados e a classificação deve gerar um ranking.

### Requisitos Funcionais
O sistema deve possuir dois papéis para as pessoas que vão o utilizar com permissões distintas: pessoa usuária e gerente. Abaixo vocês podem conferir quais são as atividades que podem/devem ser realizadas por cada papel.

#### Pessoa usuária
- [ ] Criar e editar informações de pessoa usuária (e-mail, senha, nome)
- [ ] Fazer login e logout no sistema
- [ ] Classificar itens (Indicar se gosta de uma série, se comeria uma comida, etc).
- [ ] Visualizar rankings dos itens classificados como mais queridos
- [ ] Visualizar rankings dos itens classificados como menos queridos
- [ ] Ordenar de forma crescente ou decrescente os rankings de classificações

#### Gerente
- [ ] A pessoa que será gerente deve ser cadastrada no banco previamente (user: admin e password: senha123)
- [ ] Fazer login e logout no sistema
- [ ] Visualizar ranking dos itens classificados
- [ ] Ordenar de forma crescente ou decrescente o ranking de classificações
- [ ] Listar, adicionar, editar e excluir itens

### Regras de negócio
Abaixo são especificadas regras que incidem sobre o usuo do sistema:
- [ ] A pessoa usuária não pode alterar seu e-mail
- [ ] O e-mail da pessoa usuária deve ser do domínio @aluno.feliz.ifrs.edu.br
- [ ] Um item consiste em uma imagem de algo
- [ ] O ranking deve ser ordenado pelo número de avaliações positivas ou negativas
- [ ] O sistema deve iniciar com pelo menos 15 itens cadastrados

### Instruções fundamentais
- A entrega do projeto será realizada via repositório do github.
- Uma pessoa do grupo (que é quem fará a entrega) deve criar um fork deste repositório para a entrega
- As funcionalidades e regras implementadas devem aparecer no readme do repositório com um checked (basta incluir [x])
- No readme do projeto deve aparecer o nome das pessoas do grupo e uma breve descrição da temática escolhida

### Cronograma
- 26/10 - Esquema do banco de dados
- 16/11 - Apresentação do papel Gerente (todas as funcionalidades, regras e design) (Peso 10)
- 07/12 - Apresentação do papel Pessoa usuária (todas as funcionalidades, regras e design) (Peso 10)
- 14/12 - Reavaliação do sistema a partir das avaliações anteriores

### Avaliação
- As apresentações serão realizadas para o professor
- Ainda que o trabalho seja do grupo, a avaliação será individual
- Cada apresentação resultará em uma nota da N3
- O sistema será avaliado nos seguintes critérios:
  - Implementação dos requisitos funcionais e regras de negócio (6 pontos)
  - Design (4 pontos)
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
>>>>>>> master
