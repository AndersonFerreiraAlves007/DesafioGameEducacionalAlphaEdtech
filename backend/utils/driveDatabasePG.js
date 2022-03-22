const fsPromises = require("fs").promises;
const { listQuery, createQuery, updateQuery, truncateQuery, deleteQuery } = require('../db/queries.js')
const path = require('path')

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

function getTable(pathDatabase) {
  switch (pathDatabase) {
    case 'resources/items/database.json':
      return 'items';
    case 'resources/pets/database.json':
      return 'pets';
    case 'resources/scenes/database.json':
      return 'scenes';
    case 'resources/users/database.json':
      return 'users';
  }
}

class driveDatabase {
  constructor(pathDatabase, props = defaultProps) {
    const { validateCreate, validateUpdate, middlewareAdd } = props
    this.pathDatabase = pathDatabase
    this.middlewareAdd = middlewareAdd
    this.validateCreate = validateCreate
    this.validateUpdate = validateUpdate
    this.table = getTable(pathDatabase)
  }

  async getResources(filters = {}) {

    const filterArray = Object.entries(filters)

    let rows = await listQuery(this.table)

    for (let i = 0; i < filterArray.length; i += 1) {
      const [key, value] = filterArray[i]
      rows = rows.filter(resource => resource[key] === value)
    }

    return rows
  }

  async addResource(body) {
    let rows = await listQuery(this.table)
    const { status, message, bodyValidate } = this.validateCreate(body, rows)
    if (status) {
      const resourceNew = this.middlewareAdd({
        ...bodyValidate
      })

      const resource = await createQuery(this.table, resourceNew)

      // await writeDatabase({
      //   autoIncrement: database.autoIncrement + 1,
      //   rows: [
      //     ...database.rows,
      //     resourceNew
      //   ]
      // }, this.pathDatabase);

      return {
        resource: resource.length > 0 ? resource[0] : null,
        message: 'Sucesso'
      }

    }
    return {
      resource: null,
      message: message
    }
  }

  async updateResource(id, body) {
    let rows = await listQuery(this.table)
    const { status, message, bodyValidate } = this.validateUpdate(id, body, rows)
    if (status) {
      let itemUpdated = null

      rows.forEach(item => {
        if (item.id === id) {
          itemUpdated = item
        }
      })


      if (itemUpdated) {
        const resource = await updateQuery(this.table, bodyValidate, id)
        return {
          resource: resource.length > 0 ? resource[0] : null,
          message: 'Sucesso'
        }
      }

      return {
        resource: null,
        message: 'Id não encontrado!'
      }

    }
    return {
      resource: null,
      message: message
    }
  }

  async deleteResource(id) {
    let rows = await listQuery(this.table)
    let itemDeleted = null

    for (let item of rows) {
      if (item.id === id) {
        itemDeleted = await deleteQuery(this.table, id)
        itemDeleted = itemDeleted.length > 0 ? itemDeleted[0] : null
      }
    }

    return itemDeleted
  }

  async truncate() {
    await truncateQuery()
  }

}

module.exports = { driveDatabase }
