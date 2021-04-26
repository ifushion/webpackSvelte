// import $ from 'jquery'
import Color from 'color';
import './assets/css/index.scss'
import 'bootstrap/dist/css/bootstrap.css'

function colorTransform(color, opacity) {
  const sourceColor = {
    ...Color(color).object(),
    a: opacity,
  }
  const targetColor = {};
  const BGcolor = 255 // 255：白色，0：黑色
  targetColor.r = BGcolor * (1 - sourceColor.a) + sourceColor.r * sourceColor.a;
  targetColor.g = BGcolor * (1 - sourceColor.a) + sourceColor.g * sourceColor.a;
  targetColor.b = BGcolor * (1 - sourceColor.a) + sourceColor.b * sourceColor.a;
  return Color(targetColor).hex()
}

const colors = [
  '#0A5FF0',
  '#457CFF',
  '#0F0AAF',
  '#FA5050',
  '#1EC8FF',
]

const arr1 = [100, 80, 60, 40, 20, 10, 0];

const box = document.querySelector('.box1');
colors.forEach(color => {
  const colorWrap = document.createElement('div');
  colorWrap.setAttribute('class', 'colorWrap');
  for (let i = 0; i < arr1.length; i++) {
    const colorDiv = document.createElement('div');
    const bgColor = colorTransform(color, arr1[i] / 100);
    colorDiv.setAttribute('class', 'item')
    colorDiv.setAttribute('style', `background: ${bgColor}`);
    colorDiv.innerText = bgColor;
    colorWrap.appendChild(colorDiv);
  }
  box.appendChild(colorWrap);
})

