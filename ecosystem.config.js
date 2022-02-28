module.exports = {
   apps: [
      {
         script: "server.js",
         cwd: "./backend",
         watch: true,
         name: "Backend Game Educacional",
         ignore_watch: [
            './resources/items/database.json',
            './resources/pets/database.json',
            './resources/scenes/database.json',
            './resources/users/database.json',
            'node_modules', 
            '.git'
         ],
         env: {
            "NODE_ENV": "development",
         },
         env_production: {
            "NODE_ENV": "production",
        }
      },
      {
         script: "server.js",
         cwd: "./frontend",
         watch: true,
         name: "Frontend Game Educacional",
         ignore_watch: ['node_modules', '.git'],
         env: {
            "NODE_ENV": "development",
            "HOST_API": "http://localhost:3333"
         },
         env_production: {
            "NODE_ENV": "production",
            "HOST_API": "https://apigameeducacional.andersonferreiraalves.com"
        }
      }
   ]
}