function vowelChecker (word) {
    let finalChar = word.slice(-1);
    let hFinalChar = word.slice(-2);
    console.log(`vowelChecker running with word ${word} finalChar ${finalChar} hFinalChar ${hFinalChar}`)
    switch (finalChar) {
        case "h":
            return hFinalChar == "ah" || hFinalChar == "oh" || hFinalChar == "ih" || hFinalChar == "uh" || hFinalChar == "eh";

        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
            return true;

        default:
            return false;
    }
};
