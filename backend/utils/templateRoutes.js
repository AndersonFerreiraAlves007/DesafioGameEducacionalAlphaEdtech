const express = require('express');

const { driveDatabase: Database } = require('./driveDatabase')

function validateCreate() {
  return true
}

function validateUpdate() {
  return true
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

  router.get('/:id', async (req, res) => {
    const database = new Database(pathDatabase)
    const id = parseInt(req.params.id, 10)
    const items = await database.getResources({ id })
    res.json(items.length > 0 ? items[0] : null)
  })

  router.get('/', async (req, res) => {
    const database = new Database(pathDatabase)
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {}
    const items = await database.getResources(filters)
    res.json(items)
  })

  router.post('/', async (req, res) => {
    const database = new Database(pathDatabase, props)
    const itemNew = await database.addResource(req.body)
    res.json(itemNew)
  })

  router.put('/:id', async (req, res) => {
    const database = new Database(pathDatabase, props)
    const id = parseInt(req.params.id, 10)
    const itemNew = await database.updateResource(id, req.body)
    res.json(itemNew)
  })

  router.delete('/:id', async (req, res) => {
    const database = new Database(pathDatabase)
    const id = parseInt(req.params.id, 10)
    const itemNew = await database.deleteResource(id)
    res.json(itemNew)
  })

  return router

}

module.exports = {
  makeRouter
};
