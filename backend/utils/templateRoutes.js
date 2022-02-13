const express = require('express');

const { driveDatabase: Database } = require('./driveDatabase')

const middlewareId = require('../middleware/validateId')

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

const defaultProps = {
  validateCreate,
  validateUpdate,
  middlewareAdd
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

  router.post('/', async (req, res) => {
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
  })

  router.put('/:id', middlewareId, async (req, res) => {
    const database = new Database(pathDatabase, props)
    const id = parseInt(req.params.id, 10)
    const { resource, message } = await database.updateResource(id, req.body)

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
  })

  router.delete('/:id', middlewareId, async (req, res) => {
    const database = new Database(pathDatabase)
    const id = parseInt(req.params.id, 10)
    const itemNew = await database.deleteResource(id)

    if(itemNew) res.json({
      status: true,
      data: itemNew,
      message: "Sucesso"
    })
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
