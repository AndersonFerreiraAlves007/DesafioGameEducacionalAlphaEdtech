module.exports = {
   apps: [
      {
         script: "server.js",
         cwd: "./backend",
         watch: true,
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
         script: "server.js",
         cwd: "./frontend",
         watch: true,
         name: "Frontend Game Educacional",
         ignore_watch: ['node_modules', '.git'],
      }
   ]
}