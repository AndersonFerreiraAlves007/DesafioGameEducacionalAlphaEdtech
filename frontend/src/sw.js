self.addEventListener('install', e => {
  e.waitUntil(
    // depois que o Service Worker estiver instalado,,
    // abra um novo cache
    caches.open('my-pwa-cache').then(cache => {
      // adicione todas as URLs de recursos que queremos armazenar em cache
      return cache.addAll([
        '/',
        '/index.html',
        '/android-chrome-192x192.png',
        '/android-chrome-512x512.png',
        '/apple-touch-icon.png',
        '/browserconfig.xml',
        '/favicon-16x16.png',
        '/favicon-32x32.png',
        '/favicon.ico',
        '/game.html',
        '/main-script.js',
        '/main-styles.css',
        '/manifest.json',
        '/mstile-70x70.png',
        '/mstile-144x144.png',
        '/mstile-150x150.png',
        '/mstile-310x150.png',
        '/mstile-310x310.png',
        '/safari-pinned-tab.svg',
        '/sw.js',
        '/utils/constants.js',
        '/styles/colors-game-styles.css',
        '/styles/jogo-da-memoria-style.css',
        '/styles/jokenpo-style.css',
        '/styles/login-register-style.css',
        '/styles/mine-game.css',
        '/styles/notification-style.css',
        '/modules/mini-games/colors-game.js',
        '/modules/mini-games/jogo-da-memoria.js',
        '/modules/mini-games/jokenpo.js',
        '/modules/_navigation-and-drag.js',
        '/modules/control-game.js',
        '/modules/global-data.js',
        '/modules/list-slimes.js',
        '/modules/login-register-script.js',
        '/modules/main-enviroment.js',
        '/modules/notification.js',
        '/modules/options-menu.js',
        '/modules/server-communication.js',
        '/modules/slime.js',
        '/modules/status-bar.js',
        '/modules/update-status-bar.js',
        '/assets/audios/game-audios/327738__distillerystudio__error-01.wav',
        '/assets/audios/game-audios/476713__ddmyzik__happy-harp-sound-backup.wav',
        '/assets/audios/game-audios/476713__ddmyzik__happy-harp-sound.wav',
        '/assets/audios/469163__hawkeye-sprout__child-hum-02.wav',
        '/assets/audios/535255__yetcop__shower-bath-bucket-being-dragged-cut.wav',
        '/assets/audios/535255__yetcop__shower-bath-bucket-being-dragged.wav',
        '/assets/audios/door-front-opening-medium.mp3',
        '/assets/audios/door-front-opening-short.mp3',
        '/assets/audios/door-front-opening-shorter.mp3',
        '/assets/audios/door-front-opening.wav',
        '/assets/audios/license.txt',
        '/assets/audios/that-nice-bite.mp3',
        '/assets/audios/washing-machine-selector-switch-one.mp3',
        '/assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/1819.eps',
        '/assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/1819.jpg',
        '/assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/License free.txt',
        '/assets/background-images/cartoon-set-of-kitchen-counter-with-appliances-fridge-microwave-oven-kettle-blender/License premium.txt',
        '/assets/background-images/modern-bathroom-interior-with-furniture-cartoon/304.eps',
        '/assets/background-images/modern-bathroom-interior-with-furniture-cartoon/304.jpg',
        '/assets/background-images/modern-bathroom-interior-with-furniture-cartoon/License free.txt',
        '/assets/background-images/modern-bathroom-interior-with-furniture-cartoon/License premium.txt',
        '/assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/1926.eps',
        '/assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/1926.jpg',
        '/assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/License free.txt',
        '/assets/background-images/vector-cartoon-illustration-of-empty-kindergarten-room-with-furniture-and-toys-for-young-children-n/License premium.txt',
        '/assets/bath-icons/cleaning-tools.png',
        '/assets/bath-icons/license bath icons to embed.txt',
        '/assets/bath-icons/plunger.png',
        '/assets/bath-icons/shower.png',
        '/assets/bath-icons/soap.png',
        '/assets/button-icons/close-button.svg',
        '/assets/button-icons/next-arrow-button.png',
        '/assets/button-icons/options-menu.svg',
        '/assets/button-icons/previous-arrow-button.png',
        '/assets/fonts/oleander_cakes/Hi! Read Me Please.txt',
        '/assets/fonts/oleander_cakes/Licenses Info Personal Use.pdf',
        '/assets/fonts/oleander_cakes/Oleander-Cakes Italic.ttf',
        '/assets/fonts/oleander_cakes/Oleander-Cakes-Outline-Italic.ttf',
        '/assets/fonts/oleander_cakes/Oleander-Cakes-Outline.ttf',
        '/assets/fonts/oleander_cakes/Oleander-Cakes.ttf',
        '/assets/food-icons/bread-egg.png',
        '/assets/food-icons/carrot.png',
        '/assets/food-icons/cherries.png',
        '/assets/food-icons/donut.png',
        '/assets/food-icons/french-fries.png',
        '/assets/game-icons/exterior-house-facade-icon/50574.eps',
        '/assets/game-icons/exterior-house-facade-icon/50574.jpg',
        '/assets/game-icons/exterior-house-facade-icon/License free.txt',
        '/assets/game-icons/exterior-house-facade-icon/License premium.txt',
        '/assets/game-icons/—Pngtree—single cartoon house_5714612.png',
        '/assets/game-icons/cartoon-landscape-vector.jpg',
        '/assets/game-icons/hot-air-balloon.png',
        '/assets/game-icons/icon-colors-game.png',
        '/assets/game-icons/icone-jokenpo-01.png',
        '/assets/game-icons/joystick.png',
        '/assets/game-icons/memory.png',
        '/assets/game-icons/rock-paper-scissors.png',
        '/assets/images/game/colors-game/cartoon-landscape-vector.jpg',
        '/assets/images/game/jokenpo/background-infantil-01.jpg',
        '/assets/images/game/jokenpo/background-infantil-02.jpg',
        '/assets/images/game/jokenpo/botao-x.png',
        '/assets/images/game/jokenpo/icone-jokenpo-01.png',
        '/assets/images/game/jokenpo/paper-02.png',
        '/assets/images/game/jokenpo/paper-03.png',
        '/assets/images/game/jokenpo/paper.png',
        '/assets/images/game/jokenpo/rock-02.png',
        '/assets/images/game/jokenpo/rock.png',
        '/assets/images/game/jokenpo/scissors-02.png',
        '/assets/images/game/jokenpo/scissors.png',
        '/assets/images/game/jokenpo/slime-02.svg',
        '/assets/images/game/jokenpo/slime03.png',
        '/assets/images/login/slime-02.svg',
      ]);
    })
  );
 });