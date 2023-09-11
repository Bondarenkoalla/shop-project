const button = document.getElementById('arrow-button');
const info = document.getElementById('info')
const container = document.getElementById('info-container')

function infoToggle() {
    info.classList.toggle('hidden')
    button.classList.toggle('rotate-180')
}

container.addEventListener('click', infoToggle)