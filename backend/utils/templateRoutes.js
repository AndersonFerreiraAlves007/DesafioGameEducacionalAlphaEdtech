const express = require('express');

const { driveDatabase: Database } = require('./driveDatabase')

const middlewareId = require('../middleware/validateId')
const authorization = require('../middleware/authorization')

const authorizationNeutro = (req, res, next) => {
  next()
};

function validateCreate(body) {
  return {
    status: true,
    message: '',
    bodyValidate: body
  }
}

function validateUpdate(id, body) {
  return {
    status: true,
    message: '',
    bodyValidate: body
  }
}

function middlewareAdd(resourceAdd) {
  return resourceAdd
}

function middlewareAutorizationCreate(body, user_id, cargo) {
  return true
}

function middlewareAutorizationUpdate(resource, user_id, cargo) {
  return true
}

function middlewareAutorizationDelete(resource, user_id, cargo) {
  return true
}

function middlewareAutorizationTruncate(user_id, cargo) {
  return true
}

const defaultProps = {
  validateCreate,
  validateUpdate,
  middlewareAdd,
  middlewareAutorizationCreate,
  middlewareAutorizationUpdate,
  middlewareAutorizationDelete,
  middlewareAutorizationTruncate,
  isAutorizationCreate: true
}

function makeRouter(pathDatabase, propsInitial = defaultProps) { 

  const props = {
    ...defaultProps,
    ...propsInitial
  }

  const router = express.Router();

  router.get('/:id', middlewareId, async (req, res) => {
    const database = new Database(pathDatabase)
    const id = parseInt(req.params.id, 10)
    const items = await database.getResources({ id })

    if(items.length > 0) res.json({
      status: true,
      data: items[0],
      message: "Sucesso"
    })
    else res.json({
      status: false,
      data: null,
      message: "Id não encontrado"
    })
  })

  router.get('/', async (req, res) => {
    const database = new Database(pathDatabase)
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {}
    const items = await database.getResources(filters)
    res.json({
      status: true,
      data: items,
      message: "Sucesso"
    })
  })

  router.post('/',  props.isAutorizationCreate ? authorization : authorizationNeutro, async (req, res) => {
    if(middlewareAutorizationCreate(req.body, req.user_id, req.cargo)) { 
      const database = new Database(pathDatabase, props)
      const { resource, message } = await database.addResource(req.body)
      if(resource) res.json({
        status: true,
        data: resource,
        message: "Sucesso"
      })
      else res.json({
        status: false,
        data: null,
        message: message
      })
    } else {
      res.json({
        status: false,
        data: null,
        message: 'Você não tem permissão de criar este recurso!!!'
      })
    }
  })

  router.put('/truncate', authorization, async (req, res) => {
    const database = new Database(pathDatabase)
    await database.truncate()

    if(middlewareAutorizationTruncate(req.user_id, req.cargo)) {
      res.json({
        status: true,
        data: '',
        message: "Sucesso"
      })
    } else {
      res.json({
        status: false,
        data: null,
        message: 'Você não tem permissão para resetar esta tabela!!!'
      })
    }
  })

  router.put('/:id', middlewareId, authorization, async (req, res) => {
    const database = new Database(pathDatabase, props)
    const id = parseInt(req.params.id, 10)
    const { resource, message } = await database.updateResource(id, req.body)

    if(resource) {
      if(middlewareAutorizationUpdate(resource, req.user_id, req.cargo)) {
        res.json({
          status: true,
          data: resource,
          message: "Sucesso"
        })
      } else {
        res.json({
          status: false,
          data: null,
          message: 'Você não tem permissão para editar este recurso!'
        })
      }
    }
    else res.json({
      status: false,
      data: null,
      message: message
    })
  })

  router.delete('/:id', middlewareId, authorization, async (req, res) => {
    const database = new Database(pathDatabase)
    const id = parseInt(req.params.id, 10)
    const itemNew = await database.deleteResource(id)

    if(itemNew) {
      if(middlewareAutorizationDelete(itemNew, req.user_id, req.cargo)) {
        res.json({
          status: true,
          data: itemNew,
          message: "Sucesso"
        })
      } else {
        res.json({
          status: false,
          data: null,
          message: "Você não tem permissão para deletar este recurso!!!"
        })
      }
    }
    else res.json({
      status: false,
      data: null,
      message: "Id não encontrado"
    })
  })

  return router

}

module.exports = {
  makeRouter
};
