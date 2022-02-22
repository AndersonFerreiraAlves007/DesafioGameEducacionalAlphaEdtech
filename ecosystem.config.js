module.exports = {
   apps: [
      {
         script: "backend/server.js",
         cwd: "backend/",
         name: "Backend Game Educacional",
         ignore_watch: [
            'backend/resources/items/database.json',
            'backend/resources/pets/database.json',
            'backend/resources/scenes/database.json',
            'backend/resources/users/database.json',
         ],
         watch: true
      },
      {
         script: "frontend/server.js",
         cwd: "frontend/",
         name: "Frontend Game Educacional",
         watch: true
      }
   ]
}