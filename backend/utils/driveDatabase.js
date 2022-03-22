const { driveDatabase: driveDatabaseJSON } = require('./driveDatabaseJSON')
const { driveDatabase: driveDatabasePG } = require('./driveDatabasePG')

const exported = {}

switch (process.env.DRIVE_DATABASE) {
  case 'json':
    exported.driveDatabase = driveDatabaseJSON
    break;
  case 'pg':
    exported.driveDatabase = driveDatabasePG
    break;
  default:
    exported.driveDatabase = driveDatabaseJSON
    break;
}

module.exports = exported