const updateXP = require('./updateXP')

module.exports = {
  updateXP: {
    task: updateXP,
    time: parseInt(process.env.TIME_UPDATE_STATUS_IN_SECONDS, 10) * 1000
  }
}
