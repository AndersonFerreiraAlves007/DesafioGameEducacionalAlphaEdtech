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
            "HOST_FRONTEND": "http://localhost:3334",
            "DRIVE_DATABASE": "json", // use "pg" for postgresql or "json" for local db files
            "VERSION": "3.0.0",
            "USER_DB": "postgres",
            "HOST_DB": "192.168.0.105",
            "NAME_DB": "gutiguti_db",
            "PASSWORD_DB": "",
            "PORT_DB": 5432,
            "TIME_UPDATE_STATUS_IN_SECONDS": 30
         },
         env_production: {
            "NODE_ENV": "production",
            "HOST_FRONTEND": "https://gameeducacional.andersonferreiraalves.com",
            "DRIVE_DATABASE": "pg",
            "VERSION": "4.0.0",
            "USER_DB": "postgres",
            "HOST_DB": "localhost",
            "NAME_DB": "gutiguti_db",
            "PASSWORD_DB": "58310502",
            "PORT_DB": 5432,
            "TIME_UPDATE_STATUS_IN_SECONDS": 100
        },
         env_production_alpha: {
            "NODE_ENV": "production",
            "HOST_FRONTEND": "https://gutiguti.alphaedtechprojects.website",
            "DRIVE_DATABASE": "pg",
            "VERSION": "4.0.0",
            "USER_DB": "postgres",
            "HOST_DB": "localhost",
            "NAME_DB": "gutiguti_db",
            "PASSWORD_DB": "gutiguti",
            "PORT_DB": 5432,
            "TIME_UPDATE_STATUS_IN_SECONDS": 45
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
            "HOST_API": "http://localhost:3333",
            "HOST_FRONTEND": "http://localhost:3334",
            "HOST_FRONTEND_PORT": 3334
         },
         env_production: {
            "NODE_ENV": "production",
            "HOST_API": "https://apigameeducacional.andersonferreiraalves.com",
            "HOST_FRONTEND": "https://gameeducacional.andersonferreiraalves.com",
            "HOST_FRONTEND_PORT": 3334
        },
         env_production_alpha: {
            "NODE_ENV": "production",
            "HOST_API": "https://apigutiguti.alphaedtechprojects.website",
            "HOST_FRONTEND": "https://gutiguti.alphaedtechprojects.website",
            "HOST_FRONTEND_PORT": 3334
        }
      },
      {
         script: "server.js",
         cwd: "./frontend",
         watch: true,
         name: "Frontend Game Educacional 2",
         ignore_watch: ['node_modules', '.git'],
         env: {
            "NODE_ENV": "development",
            "HOST_API": "http://localhost:3333",
            "HOST_FRONTEND": "http://localhost:3335",
            "HOST_FRONTEND_PORT": 3335
         },
         env_production: {
            "NODE_ENV": "production",
            "HOST_API": "https://apigameeducacional.andersonferreiraalves.com",
            "HOST_FRONTEND": "http://78.141.224.27",
            "HOST_FRONTEND_PORT": 3335
        },
         env_production_alpha: {
            "NODE_ENV": "production",
            "HOST_API": "https://apigutiguti.alphaedtechprojects.website",
            "HOST_FRONTEND": "http://45.76.3.107",
            "HOST_FRONTEND_PORT": 3335
        }
      }
   ]
}