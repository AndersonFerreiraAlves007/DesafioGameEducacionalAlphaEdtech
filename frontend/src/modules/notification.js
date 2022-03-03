let idTimeout;


function getTitle(type) {
  switch (type) {
    case 'error':
      return {
        title: 'Erro',
        color: 'red'
      }
    case 'warning':
      return {
        title: 'Aviso',
        color: 'yellow'
      }
    case 'success':
      return {
        title: 'Sucesso',
        color: 'green'
      }
    default:
      return {
        title: 'Sucesso',
        color: 'green'
      }
  }
}

function sendNotification(type, message, duration = 3) {
  const { title, color } = getTitle(type)
  const notificationElement = document.getElementById('dialog-notification')
  notificationElement.style.display = 'flex'
  notificationElement.innerHTML = `
    <h2 class="notification__title" style="color: ${color};">${title}</h2>
    <p class="notification__body">${message}</p>
  `
  clearTimeout(idTimeout)
  idTimeout = setTimeout(() => {
    notificationElement.style.display = 'none'
  }, duration * 1000)
}

export {
  sendNotification
}
