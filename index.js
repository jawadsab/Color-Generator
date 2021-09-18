const colorCard = document.querySelectorAll(".color-card");
const colorCards = Array.from(colorCard);
const generateBtn = document.querySelector("#generate");
const closePopup = document.querySelector(".fa-times");
const popup = document.querySelector(".popup");


const generateRandomHexColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++){
       const random = Math.random();
       const bit = Math.floor((random * 16));
       color += (bit).toString(16);
    };
    return color;
}

const showPopup = (popup,colorText) => {
    popup.style.transform = "translateY(0%)"
    popup.style.backgroundColor = colorText;
    popup.children[1].innerText = `Color ${colorText} copied to your clipboard`;
}

const copyHex = (colorText) => {
    let tempText = document.createElement("input");
    tempText.value = colorText;
    document.body.appendChild(tempText);
    tempText.select();
    document.execCommand("copy");
    document.body.removeChild(tempText);
    showPopup(popup,colorText)
}

const setColors = (cards) => {
    cards.forEach((card,inex) => {
        const cardDiv = card.children[0];
        const copyIcon = cardDiv.children[0];
        let color = generateRandomHexColor();
        cardDiv.style.backgroundColor = color;
        const cardPara = card.children[1];
        cardPara.innerText = color;
        copyIcon.addEventListener("click",(e) => copyHex(color))
    })
}

setColors(colorCards);


generateBtn.addEventListener("click",() => setColors(colorCards));
window.addEventListener("keypress",(e) => {
    if(e.key === " ") {
        setColors(colorCards);
    }
})
closePopup.addEventListener("click",(e) => {
   const parentNode = e.target.parentNode;
   parentNode.style.transform = "translateY(-110%)"
})