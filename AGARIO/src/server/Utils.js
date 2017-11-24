export class Utils{
  static randomCoordinates(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomColor() {
    let letters = '0123456789ABCDEF';
    let colorNum = '#';
    for (let i = 0; i < 6; i++) {
      colorNum += letters[Math.floor(Math.random() * 16)];
    }
    return colorNum;
  }
  /*static randomColor() {
    let R = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
    let G = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
    let B = Math.floor(Math.random() * (256 - 1 + 1)) + 1;
    let list = '';
    list = '{' + R + ', ' + G + ', ' + B + '}';
    return list;
  }*/
}
