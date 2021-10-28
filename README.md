Legenda
**RF** => Requisitos Funcionais
**RNF** => Requisitos Não Funcionais
**RN** => Regras de Negócio

# Cadastro de carro

**RF**
> Deve ser possível cadastrar um novo carro
> Deve ser possível listar todos os carros disponíveis
> Deve ser possível listar todos os carros disponíveis por categoria
> Deve ser possível listar todos os carros disponíveis por marca
> Deve ser possível listar todos os carros disponíveis pelo nome do carro


**RN**
> Não deve ser possível cadastrar um carro com uma placa já existente
> Não deve ser possível alterar a placa de um carro já cadastrado
> Todo carro recém cadastrado deve conter a sinalização padrão sim para disponibilidade (available)
> Somente um usuário administrador poderá fazer o cadastramento de um carro
> O usuário não precisa estar logado no sistema para ver a listagem de carros


# Cadastro de Especificação do Carro

**RF**
> Deve ser possível cadastrar uma especificação para um carro
> Deve ser possível listar todas as especificações
> Deve ser possível listar todos os carros

**RN**
> Não deve ser possível cadastrar uma especificação para um carro não cadastrador
> Não deve ser possível cadastrar uma especificação repetida para o mesmo carro
> Somente um usuário administrador poderá fazer o cadastramento de um carro


# Cadastro de Imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível cadastrar mais de uma imagem para o mesmo carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
> Somente um usuário administrador poderá fazer o cadastramento de um carro


# Cadastro de Aluguel

**RF**
> Deve ser possível realizar uma locação

**RN**
> O aluguel deve ter duração mínima de 24 horas
> Um usuário não pode locar mais de um veículo simultaneamente
> Não deve ser possível alugar simultaneamente o mesmo carro