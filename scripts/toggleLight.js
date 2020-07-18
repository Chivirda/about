const lightButton = document.querySelector('.toggle-button')
const mainColor = getComputedStyle(document.body).backgroundColor

lightButton.addEventListener('click', () => {
  console.log(mainColor)
})