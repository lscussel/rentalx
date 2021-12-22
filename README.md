Legenda
**RF** => Requisitos Funcionais
**RNF** => Requisitos Não Funcionais
**RN** => Regras de Negócio

# Carro

**RF**
[x] Deve ser possível cadastrar um novo carro
[x] Deve ser possível listar todos os carros disponíveis
[x] Deve ser possível listar todos os carros disponíveis por categoria
[x] Deve ser possível listar todos os carros disponíveis por marca
[x] Deve ser possível listar todos os carros disponíveis pelo nome do carro


**RN**
[x] Não deve ser possível cadastrar um carro com uma placa já existente
[ ] Não deve ser possível alterar a placa de um carro já cadastrado
[x] Todo carro recém cadastrado deve conter a sinalização padrão sim para disponibilidade (available)
[x] Somente um usuário administrador poderá fazer o cadastramento de um carro
[ ] O usuário não precisa estar logado no sistema para ver a listagem de carros


# Especificação do Carro

**RF**
[ ] Deve ser possível cadastrar uma especificação para um carro
[ ] Deve ser possível listar todas as especificações
[ ] Deve ser possível listar todos os carros

**RN**
[ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrador
[ ] Não deve ser possível cadastrar uma especificação repetida para o mesmo carro
[ ] Somente um usuário administrador poderá fazer o cadastramento de um carro


# Imagens do Carro

**RF**
[ ] Deve ser possível cadastrar a imagem do carro
[ ] Deve ser possível cadastrar mais de uma imagem para o mesmo carro

**RNF**
[ ] Utilizar o multer para upload dos arquivos

**RN**
[ ] Somente um usuário administrador poderá fazer o cadastramento de um carro


# Aluguel

**RF**
[ ]  Deve ser possível realizar uma locação

**RN**
[ ]  O usuário deve estar logado na aplicação
[ ]  O aluguel deve ter duração mínima de 24 horas
[ ]  Um usuário não pode locar mais de um veículo simultaneamente
[ ]  Não deve ser possível alugar simultaneamente o mesmo carro
[ ]  Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível


# Devolução de carro

**RF**
[ ]  Deve ser possível realizar a devolução de um locação

**RN**
[ ]  O usuário deve estar logado na aplicação
[ ]  Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa
[ ]  Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
[ ]  Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
[ ]  Ao realizar a devolução, deverá ser calculado o total do aluguel
[ ]  Caso o horário de devolução seja superior ao horário previsto de entrega,
     deverá ser cobrado multa proporcional aos dias de atraso
[ ]  Caso haja multa, deverá ser somado ao total do aluguel


# Listagem de Aluguéis para Usuário

**RF**
[ ] Deve ser possível realizar a busca de todos os aluguéis para o usuário

**RN**
[ ] O usuário deve estar logado na aplicação