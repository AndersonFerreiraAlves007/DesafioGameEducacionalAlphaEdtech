# REST API

REST API para um game educacional.

# Truncate

## Resetar todos os bancos de dados

### Request

`PUT /truncate`

    curl -i -H 'Accept: application/json' http://localhost:7000/truncate


### Response

    {
        "status": true,
        "message": "Banco de dados resetado"
    }

# Users

## LOGIN

### Request

`GET /users/login/`

    curl -i -H 'Accept: application/json' http://localhost:7000/login/

### Body

    {
        "username": "anders",
        "password": "oi"
    }

### Response

    {
        "status": false,
        "message": "Senha incorreta!"
    }   // resposta senha incorreta

    {
        "status": true,
        "message": "Logado com sucesso!"
    } // resposta login com sucesso

    {
        "status": false,
        "message": "Usuário não cadastrado!"
    } // resposta usuário inesistente

## Obter lista de usuários

### Request

`GET /users/`

    curl -i -H 'Accept: application/json' http://localhost:7000/users/

### Response

    [
        {
            "username": "anderson",
            "password": "lalala",
            "email": "andersonamericasul07@gmail.com",
            "id": 1
        },
        {
            "username": "anderson2",
            "password": "lalala",
            "email": "andersonamericasul07@gmail.com",
            "id": 2
        },
    ]

    
## Obter usuário

### Request

`GET /users/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/users/1

### Response

    {
        "username": "anderson",
        "password": "lalala",
        "email": "andersonamericasul07@gmail.com",
        "id": 1
    }

## Obter usuário com seus bichinhos

### Request

`GET /users/id/pets`

    curl -i -H 'Accept: application/json' http://localhost:7000/users/1/pets

### Response

    {
        "username": "anderson",
        "password": "lalala",
        "email": "andersonamericasul07@gmail.com",
        "id": 1,
        "pets": [
            {
                "name": "bob",
                "user_id": 1,
                "id": 1,
                "xp_food": 100,
                "xp_fun": 100,
                "xp_hygiene": 100
            },
            {
                "name": "bob",
                "user_id": 1,
                "id": 2,
                "xp_food": 100,
                "xp_fun": 100,
                "xp_hygiene": 100
            }
        ]
    }


## Criar novo usuário

### Request

`POST /users/`

    curl -i -H 'Accept: application/json' http://localhost:7000/users/

### Body

    {
        "username": "anderson3",
        "password": "oi",
        "email": "andersonamericasul07@gmail.com"
    }

### Response

    {
        "username": "anderson3",
        "password": "oi",
        "email": "andersonamericasul07@gmail.com",
        "id": 1
    }

    ou null, caso já exista um usuário com esse mesmo username
    

## Atualizar usuário

### Request

`PUT /users/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/users/1

### Body

    {
        "username": "anderson3",
        "password": "oi",
        "email": "andersonamericasul07@gmail.com"
    } 
    
    ou qualuer subconjunto desse objeto

### Response

    {
        "username": "anderson10",
        "password": "oi",
        "email": "andersonamericasul07@gmail.com",
        "id": 1
    }

    ou null, caso um scene com o id fornecido não seja encontrada ou exista um usuário com esse mesmo username


## Deletar usuário

### Request

`DELETE /users/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/users/1

### Response

    {
        "username": "anderson10",
        "password": "oi",
        "email": "andersonamericasul07@gmail.com",
        "id": 1
    }

    ou null, caso um scene com o id fornecido não seja encontrada

# Pets

## Obter lista de bichinhos

### Request

`GET /pets/`

    curl -i -H 'Accept: application/json' http://localhost:7000/pets/

### Response

    [
        {
            "name": "bob",
            "user_id": 1,
            "id": 1,
            "xp_food": 100,
            "xp_fun": 100,
            "xp_hygiene": 100
        },
        {
            "name": "bob",
            "user_id": 1,
            "id": 2,
            "xp_food": 100,
            "xp_fun": 100,
            "xp_hygiene": 100
        }
    ]

    
## Obter bichinho

### Request

`GET /pets/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/pets/1

### Response

    {
        "name": "bob",
        "user_id": 1,
        "id": 1,
        "xp_food": 100,
        "xp_fun": 100,
        "xp_hygiene": 100
    }


## Criar novo bichinho

### Request

`POST /pets/`

    curl -i -H 'Accept: application/json' http://localhost:7000/pets/

### Body

   {
        "name": "bob",
        "user_id": 1
    }

### Response

    {
        "name": "bob",
        "user_id": 1,
        "id": 1,
        "xp_food": 100,
        "xp_fun": 100,
        "xp_hygiene": 100
    }

## Atualizar bichinho

### Request

`PUT /pets/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/pets/1

### Body

    {
        "name": "bob2",
        "user_id": 1
    }

    ou qualquer subconjunto desse objeto

### Response
    {
        "name": "bob2",
        "user_id": 1,
        "id": 1,
        "xp_food": 100,
        "xp_fun": 100,
        "xp_hygiene": 100
    }

    ou null, caso um pet com o id fornecido não seja encontrado


## Deletar bichinho

### Request

`DELETE /pets/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/pets/1

### Response

    {
        "name": "bob2",
        "user_id": 1,
        "id": 1,
        "xp_food": 100,
        "xp_fun": 100,
        "xp_hygiene": 100
    }

    ou null, caso um pet com o id fornecido não seja encontrado

# Scenes

## Obter lista de cenários

### Request

`GET /scenes/`

    curl -i -H 'Accept: application/json' http://localhost:7000/scenes/

### Response

    [
        {
            "name": "popo",
            "url_image": "kaslasl",
            "id": 1
        },
        {
            "name": "popo2",
            "url_image": "kaslasl",
            "id": 2
        }
    ]

    
## Obter cenário

### Request

`GET /scenes/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/scenes/1

### Response

    {
        "name": "popo",
        "url_image": "kaslasl",
        "id": 1
    }

## Obter cenário com seus itens

### Request

`GET /scenes/id/items`

    curl -i -H 'Accept: application/json' http://localhost:7000/scenes/1/items

### Response

    {
        "name": "popo",
        "url_image": "kaslasl",
        "id": 1,
        "itens": [
            {
                "name": "lala22",
                "url_image": "lala",
                "xp_food_change": 10,
                "xp_fun_change": 10,
                "xp_hygiene_change": 10,
                "scene_id": 1,
                "id": 1
            },
            {
                "name": "lala33",
                "url_image": "lala",
                "xp_food_change": 10,
                "xp_fun_change": 10,
                "xp_hygiene_change": 10,
                "scene_id": 1,
                "id": 4
            }
        ]
    }


## Criar novo cenário

### Request

`POST /scenes/`

    curl -i -H 'Accept: application/json' http://localhost:7000/scenes/

### Body

    {
        "username": "anders",
        "password": "oi"
    }

### Response

    {
        "name": "popo3",
        "url_image": "kaslasl"
    }

    ou null caso já exista um scene com esse mesmo name

## Atualizar cenário

### Request

`PUT /scenes/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/scenes/1

### Body

    {
        "name": "popo8",
        "url_image": "kaslasl"
    }

    ou qualquer subconjunto desse objeto

### Response

    {
        "name": "popo8",
        "url_image": "kaslasl",
        "id": 1
    }

    ou null, caso um scene com o id fornecido não seja encontrada ou exista um scene com esse mesmo name


## Deletar cenário

### Request

`DELETE /scenes/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/scenes/1

### Response

    {
        "name": "popo8",
        "url_image": "kaslasl",
        "id": 1
    }

    ou null, caso um scene com o id fornecido não seja encontrada

# Items

## Obter lista de ietns

### Request

`GET /items/`

    curl -i -H 'Accept: application/json' http://localhost:7000/items/

### Response

    [
        {
            "name": "lala",
            "url_image": "lala",
            "xp_food_change": 10,
            "xp_fun_change": 10,
            "xp_hygiene_change": 10,
            "scene_id": 1,
            "id": 1
        }
    ]

    
## Obter item

### Request

`GET /items/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/items/1

### Response

    {
        "name": "lala",
        "url_image": "lala",
        "xp_food_change": 10,
        "xp_fun_change": 10,
        "xp_hygiene_change": 10,
        "scene_id": 1,
        "id": 1
    }


## Criar novo item

### Request

`POST /items/`

    curl -i -H 'Accept: application/json' http://localhost:7000/items/

### Body

    {
        "name": "lala",
        "url_image": "lala",
        "xp_food_change": 10,
        "xp_fun_change": 10,
        "xp_hygiene_change": 10,
        "scene_id": 1
    }

### Response

    {
        "name": "lala",
        "url_image": "lala",
        "xp_food_change": 10,
        "xp_fun_change": 10,
        "xp_hygiene_change": 10,
        "scene_id": 1,
        "id": 1
    }

## Atualizar item

### Request

`PUT /items/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/items/1

### Body

    {
        "name": "lala",
        "url_image": "lala",
        "xp_food_change": 10,
        "xp_fun_change": 10,
        "xp_hygiene_change": 10,
        "scene_id": 1
    }

    ou qualquer subconjunto desse objeto

### Response

    {
        "name": "uiui",
        "url_image": "lala",
        "xp_food_change": 10,
        "xp_fun_change": 10,
        "xp_hygiene_change": 10,
        "scene_id": 1,
        "id": 1
    }

    ou null, caso um item com o id fornecido não seja encontrado


## Deletar item

### Request

`DELETE /items/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/items/1

### Response

    {
        "name": "uiui",
        "url_image": "lala",
        "xp_food_change": 10,
        "xp_fun_change": 10,
        "xp_hygiene_change": 10,
        "scene_id": 1,
        "id": 1
    }

    ou null, caso um item com o id fornecido não seja encontrado
