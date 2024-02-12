let range = document.querySelector("#range"),
    colorPicker = document.querySelector("#colorPicker"),
    colorSelectedByPicker = "black"
    rangeDisplay = document.querySelector("#range-display"),
    grid = document.querySelector("#grid"),
    gridScreen = document.querySelector(".gridWaitingScreen"),
    modeSelected = "colorSelected"
    selectedColorButton = document.querySelector("#colorMode"),
    rainbowColorsButton = document.querySelector("#rainbowMode"),
    eraserButton = document.querySelector("#eraser"),
    clearAllButton = document.querySelector("#clearAll")
    isMousePressed = false;

grid.addEventListener("mousedown", () => {
  isMousePressed = true;
})

document.body.addEventListener("mouseup", () => {
  isMousePressed = false;
})

function changeGridSize() {
  rangeValue = range.value;
  rangeDisplay.innerHTML = `${rangeValue} x ${rangeValue}`

  grid.innerHTML = ""

  grid.setAttribute("style", `grid-template-columns: repeat(${rangeValue}, 1fr);
                              grid-template-rows: repeat(${rangeValue}, 1fr);`);

                              
  for (let i = 0; i < rangeValue * rangeValue; i++) {
    let gridElement = document.createElement("div");
  
    gridElement.setAttribute("class", "gridElement");
    gridElement.addEventListener("mousedown", () => {
      isMousePressed = true;
      buttonSelected(gridElement)
    })
    gridElement.addEventListener("mousemove", () =>{
      if (isMousePressed === true) {
        buttonSelected(gridElement)
      }
    })
    gridElement.addEventListener("mouseup", () => {
      isMousePressed = false;
    })

    grid.appendChild(gridElement)
  }
}

function buttonSelected (element) {
  if (modeSelected === "colorSelected") element.setAttribute("style", `background-color: ${colorSelectedByPicker}`)
  if (modeSelected === "rainbowColors") getRandomColor(element)
  if (modeSelected === "eraser") element.setAttribute("style", "background-color: #fff")
}

function getRandomColor(element) {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return element.style.backgroundColor = color;
}


colorPicker.addEventListener("input", () =>{
  let selectedColor = colorPicker.value;

  colorSelectedByPicker = selectedColor
})

selectedColorButton.addEventListener("click", () =>{
  modeSelected = "colorSelected"
})

rainbowColorsButton.addEventListener("click", () =>{
  modeSelected = "rainbowColors"
})

eraserButton.addEventListener("click", () => {
  modeSelected = "eraser"
})

clearAllButton.addEventListener("click", () =>{
  let allGridElements = document.querySelectorAll(".gridElement")

  allGridElements.forEach(element => {
    element.setAttribute("style", "background-color: #fff;")
  })
})

range.addEventListener("input", () => {
  gridScreen.setAttribute("style", `opacity: 0;
                                    transition: opacity 0.25s ease-out;`);
  setTimeout(changeGridSize,250);
})