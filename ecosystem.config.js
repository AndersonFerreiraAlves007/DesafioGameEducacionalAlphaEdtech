module.exports = {
  apps: [
     {
        script: "backend/server.js",
        cwd: "backend/",
        name: "Backend Game Educacional",
        watch: true
     },
     {
        script: "frontend/server.js",
        cwd: "frontend/",
        name: "Frontend  Game Educacional",
        watch: true
     }
  ]
}