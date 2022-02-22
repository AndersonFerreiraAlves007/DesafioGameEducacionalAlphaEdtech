module.exports = {
   apps: [
      {
         script: "./backend/server.js",
         name: "Backend Game Educacional",
         ignore_watch: [
            'backend/resources/items/database.json',
            'backend/resources/pets/database.json',
            'backend/resources/scenes/database.json',
            'backend/resources/users/database.json',
            'node_modules', 
            '.git'
         ],
      },
      {
         script: "./frontend/server.js",
         name: "Frontend Game Educacional",
         ignore_watch: ['node_modules', '.git'],
      }
   ]
}