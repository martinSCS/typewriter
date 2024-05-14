class Typewriter {
  constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, typingPauseTime = 2000, deletingPauseTime = 0, loop = true, routeDict = {}, routeMap = {}, additionalFunc = null) {
    this.element = element;
    this.texts = texts.map(text => typeof text === 'string' ? [...text] : text); 
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.typingPauseTime = typingPauseTime;
    this.deletingPauseTime = deletingPauseTime;
    this.routeDict = routeDict;
    this.routeMap = routeMap;
    this.textIndex = 0;
    this.charIndex = 0;
    this.routeIndex = 0;
    this.isDeleting = false;
    this.currentText = [];
    this.currentTextLength = 0;
    this.additionalFunc = additionalFunc;
    this.type();
  }
  type() {
    let currentChar;
    currentChar = this.texts[this.textIndex][this.charIndex];
    const currentCharPosition = this.charIndex + ',' + this.textIndex;
    const routeSelection = this.routeMap[currentCharPosition];
    const routes = this.routeDict[currentChar];
    let route;
    if (routes) {
      if (routes.length === 1) {
        route = routes[0];
      } else if (routeSelection !== undefined) {
        route = routes[routeSelection];
      }
    }
    if (this.isDeleting) {
      this.currentText = this.currentText.slice(0, this.currentText.length - 1);
      this.currentTextLength--;
      if (this.currentTextLength < 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
        this.charIndex = 0;
        setTimeout(() => this.type(), this.deletingPauseTime);
        return;
      }
    } else {
      if (route && this.routeIndex < route.length) {
        this.currentText = this.texts[this.textIndex].slice(0, this.charIndex).concat(route[this.routeIndex]);
        this.routeIndex++;
        if (this.routeIndex >= route.length) {
          this.charIndex++;
          this.routeIndex = 0;
        }
      } else {
        this.charIndex++;
        this.currentText = this.texts[this.textIndex].slice(0, this.charIndex);
      }
      if (this.charIndex > this.texts[this.textIndex].length) {
        this.isDeleting = true;
        this.currentTextLength = this.currentText.length;
        if (this.loop || this.textIndex !== this.texts.length){
          setTimeout(() => this.type(), this.typingPauseTime);
        }
        return;
      }
    }
    if (this.additionalFunc === null) {
      this.element.textContent = this.currentText.join('');
    } else {
      this.element.textContent = this.additionalFunc(this.currentText.join(''));
    }
    setTimeout(() => this.type(), this.isDeleting ? this.deletingSpeed : this.typingSpeed);
  }
}