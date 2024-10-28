/*java script para ejecutar el popver en el register*/

const popover = document.querySelector("#id_del_popover");
const form = document.querySelector('form');

form. addEventListener('submit', (event)=>{
    event.preventDefault();
    popover.showPopover();
});