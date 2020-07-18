const lightButton = document.querySelector('.toggle-button')
let mainColor = getComputedStyle(document.body).getPropertyValue('--main-color')
let textColor = getComputedStyle(document.body).getPropertyValue('--main-text-color')
let light = true

lightButton.addEventListener('click', () => {
  if (light === true) {
    document.documentElement.style.setProperty('--main-color', '#000')
    document.documentElement.style.setProperty('--main-text-color', '#fff')
    light = false
  } else if (light === false) {
    document.documentElement.style.setProperty('--main-color', '#fff')
    document.documentElement.style.setProperty('--main-text-color', '#292929')
    light = true
  }
})