function optionMenu(){
    const menuButton = document.getElementById('options-menu-button');
    const closeMenuButton = document.getElementById('button-close-menu');

    menuButton.addEventListener('click', showMenu);

    closeMenuButton.addEventListener('click', ()=>{document.getElementById('menu-area').style.display = 'none'})

    function showMenu(event){
        const menuArea = document.getElementById('menu-area');

        menuArea.style.display = 'flex';
    }
}

export {optionMenu}