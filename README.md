# Controle De Salas - FrontEnd

Este projeto foi gerado com:
- [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.
- [Bootstrap 4.5](https://getbootstrap.com/docs/4.5/getting-started/introduction/);
- Validação de formulário com reactive form;

## Telas do Sistema:

![alt text](https://github.com/consule/ControleDeSalasFront/blob/master/src/assets/salas.png?raw=true "Agendamento de Sala")
![alt text](https://github.com/consule/ControleDeSalasFront/blob/master/src/assets/dashboard.png?raw=true "Painel de Salas Reservadas")
![alt text](https://github.com/consule/ControleDeSalasFront/blob/master/src/assets/agendamentoExistente.png?raw=true "agendamento Existente")
![alt text](https://github.com/consule/ControleDeSalasFront/blob/master/src/assets/agendamentoDeSalas.png?raw=true "Agendamento de Sala")

## Servidor de desenvolvimento

Este projeto é composto de duas partes, sendo esta o frontEnd da aplicação. 
O BackEnd você encontra neste link: (https://github.com/consule/ControleDeSalasBackEnd)

## Executando o projeto

1. Clone o projeto com o comando (https://github.com/consule/ControleDeSalasFront.git) para uma pasta de sua preferencia. 
2. Execute o comando `cd ControleDeSalasFront` para entrar na pasta que acabou de ser clonada
3. Para a instalação dos modulos execute: `npm install` ou apenas `npm i` (Aguarde até que os modulos existenetes sejam instalados automáticamente);
4. Execute `ng serve` para um servidor dev. 
5. Navegue até `http://localhost:4200/`. 

O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Atenção com as Services

Você pode encontrar as services no caminho `ControleDeSalasFront\src\app\services`. Elas são o ponto de entrada  que alimentam a aplicação e exibem os dados. 

Lembre-se sempre de conferir a porta de entrada existente (essa porta é gerada pelo FrontEnd).
Para facilitar existe uma variável em cada um desses arquivos com o nome `const apiUrl`.
