const fsPromises = require("fs").promises;
const path = require('path')

async function readDatabase(pathDatabase) {
  const data = await fsPromises.readFile(path.resolve(__dirname, '..',pathDatabase));
  let database = JSON.parse(data);
  return database;
}

async function writeDatabase(database, pathDatabase) {
  const data = JSON.stringify(database);
  await fsPromises.writeFile(path.resolve(__dirname, '..', pathDatabase), data);
}

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

class driveDatabase {
  constructor(pathDatabase, props = defaultProps) {
    const { validateCreate, validateUpdate, middlewareAdd } = props
    this.pathDatabase = pathDatabase
    this.middlewareAdd = middlewareAdd
    this.validateCreate = validateCreate
    this.validateUpdate = validateUpdate
  }

  async getResources(filters = {}) {
    const database = await readDatabase(this.pathDatabase)
    const filterArray = Object.entries(filters)

    let rows = database.rows

    for(let i = 0; i < filterArray.length; i+=1) {
      const [key, value] = filterArray[i]
      rows = rows.filter(resource => resource[key] === value)
    }

    return rows
  }

  async addResource(body) {
    const database = await readDatabase(this.pathDatabase)
    const { status, message, bodyValidate } = this.validateCreate(body, database.rows)
    if(status) {
      const resourceNew = this.middlewareAdd({
        ...bodyValidate,
        id: database.autoIncrement + 1
      })

      await writeDatabase({
        autoIncrement: database.autoIncrement + 1,
        rows: [
          ...database.rows, 
          resourceNew
        ]
      }, this.pathDatabase);

      return {
        resource: resourceNew,
        message: 'Sucesso'
      }

    }
    return {
      resource: null,
      message: message
    }
  }
  
  async updateResource(id, body) {
    const database = await readDatabase(this.pathDatabase)
    const { status, message, bodyValidate } = this.validateUpdate(id, body, database.rows)
    if(status) {
      let itemUpdated = null

      const rows = database.rows.map(item => {
        if(item.id !== id ) return item
        itemUpdated = item
        return {
          ...item,
          ...bodyValidate
        }
      })

      await writeDatabase({
        autoIncrement: database.autoIncrement,
        rows
      }, this.pathDatabase);

      if(itemUpdated) {
        return {
          resource: {
            ...itemUpdated,
            ...bodyValidate
          },
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
    const database = await readDatabase(this.pathDatabase)
    let itemDeleted = null

    const rows = database.rows.filter(item => {
      if(item.id !== id ) return true
      itemDeleted = item
      return false
    })

    await writeDatabase({
      autoIncrement: database.autoIncrement,
      rows
    }, this.pathDatabase);

    return itemDeleted
  }

  async truncate() {
    await writeDatabase({
      autoIncrement: 0,
      rows: []
    }, this.pathDatabase);
  }

}

module.exports = {
  driveDatabase
}
