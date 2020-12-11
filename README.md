# buggy-listener-express
Essa biblioteca foi feita em conjunto com a plataforma [Buggy](https://buggy.demasi.dev) para monitoramento de erros nas aplicações que usam Node.js + Express. O buggy é um sistema de bug tracking (rastreamento de falhas), e a responsabilidade do `buggy-listener-express` é capturar qualquer erro que aconteça na sua aplicação Node e enviar ao sistema principal do Buggy.

## Como instalar?
Usando yarn  
`yarn add buggy-listener-express`  
  
Usando NPM  
`npm install buggy-listener-express`

## Como usar?
Só adicionar os módulos `init` e `requestError` junto com a declaração do seu express. O `init` precisa vir antes do requestError, e este precisa ser o primeiro middleware após as declarações das rotas e o primeiro ErrorHandler que possa ter na sua aplicação.
```javascript
import express from 'express';
import * as buggyListener from 'buggy-listener-express';

import routes from './routes';

const app = express();

buggyListener.init(
  // OPCIONAL (você pode inserir a chave DSN por variável ambiente)
  {
    dsn: 'CHAVE-DSN'
  }
);

app.use('/', routes);
app.use(buggyListener.requestError());

app.listen(8080);
```
**Como eu obtenho uma chave DSN?**   
[Registre-se no Buggy](https://buggy.demasi.dev/register), crie seu primeiro projeto, e então nas configurações do mesmo, você vai encontrar uma chave única para ser usada)

## Objetivos futuros
 * [ ] Aprimorar a detecção de erro, como conseguir definir melhor a causa e o caminho até o erro acontecer
 * [ ] Permitir integração com demais ferramentas de gerência, como Trello, Asana, etc.
 * [ ] Lançar outros módulos para detecção de erros em mais ambientes (ex: React)
 
 ## Licença
 [MIT](https://github.com/brunodmsi/buggy-listener-express/blob/main/LICENSE)
