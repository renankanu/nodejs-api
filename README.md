# pass.in


O pass.in é uma aplicação de **gestao de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma pagina pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan de credencial de participante para permitir a entrada no evento.

## Requisitos

## Requisitos funcionais

- [ ] O organizador deve poder cadastrar um novo evento;
- [ ] O organizador deve poder visualizar dados de um evento;
- [ ] O organizador deve poder visualizar a lista de participantes;
- [ ] O Participante deve poder se inscrever em um evento;
- [ ] O Participante deve poder visualizar seu crachá de inscrição;
- [ ] O Participante deve poder fazer check-in no evento;

## Regras de negócio

- [ ] O participante só pode se inscrever em um evento uma única vez;
- [ ] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ ] O participante só pode fazer check-in no evento se estiver inscrito e uma única vez;

## Requisitos não funcionais

- [ ] O check-in no evento será realizado através de um QRCode;