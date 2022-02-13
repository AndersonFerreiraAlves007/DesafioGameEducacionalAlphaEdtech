const fsPromises = require("fs").promises;

async function readDatabase(pathDatabase) {
  const data = await fsPromises.readFile(pathDatabase);
  let database = JSON.parse(data);
  return database;
}

async function writeDatabase(database, pathDatabase) {
  const data = JSON.stringify(database);
  await fsPromises.writeFile(pathDatabase, data);
}

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

class driveDatabase {
  constructor(pathDatabase, props = defaultProps) {
    const { validateCreate, validateUpdate, middlewareAdd } = props
    this.pathDatabase = pathDatabase
    this.middlewareAdd = middlewareAdd
    this.validateCreate = validateCreate
    this.validateUpdate = validateUpdate
  }

  async getResources(filters) {
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
    if(this.validateCreate(body, database.rows)) {
      const resourceNew = this.middlewareAdd({
        ...body,
        id: database.autoIncrement + 1
      })

      await writeDatabase({
        autoIncrement: database.autoIncrement + 1,
        rows: [
          ...database.rows, 
          resourceNew
        ]
      }, this.pathDatabase);

      return resourceNew

    }
    return null
  }
  
  async updateResource(id, body) {
    const database = await readDatabase(this.pathDatabase)
    if(this.validateUpdate(id, body, database.rows)) {
      let itemUpdated = null

      const rows = database.rows.map(item => {
        if(item.id !== id ) return item
        itemUpdated = item
        return {
          ...item,
          ...body
        }
      })

      await writeDatabase({
        autoIncrement: database.autoIncrement,
        rows
      }, this.pathDatabase);

      if(itemUpdated) {
        return {
          ...itemUpdated,
          ...body
        }
      }

      return null

    }
    return null
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
  driveDatabase,
  readDatabase,
  writeDatabase
}
