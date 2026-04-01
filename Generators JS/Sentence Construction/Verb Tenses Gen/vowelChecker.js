function vowelChecker (word) {
  // vowelChecker VERSION: 1.0.0
  
let finalChar = word.slice(-1);
let hFinalChar = word.slice(-2);
console.log(`vowelChecker running with word ${word} finalChar ${finalChar} hFinalChar ${hFinalChar}`)
switch (finalChar) {
  case "h":
    if (hFinalChar == "ah" || hFinalChar == "oh" || hFinalChar == "ih" || hFinalChar == "uh" || hFinalChar == "eh") {return true} else {return false}
    break;

  case "a":
    return true;
    break;

  case "e":
    return true;
    break;

  case "i":
    return true;
    break;

  case "o":
    return true;
    break;

  case "u":
    return true;
    break;

  default:
    return false;
    break;
};
}
