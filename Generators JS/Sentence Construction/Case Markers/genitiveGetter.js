function genitiveGetter (argObj, verbType) {
    console.groupCollapsed("genitiveGetter");
    let devMode = document.getElementById("devBox").checked;
    let miniDict = dictGetter(verbType, "genitive", 0)
    let possessor;

    let targetIndex = rnd(0, miniDict.length)
    if (devMode) {
        console.log(`LOG: targetIndex is ${miniDict[targetIndex].word}`)
    }

    possessor = miniDict[targetIndex].getWord()

    if (devMode) {
        console.log(`LOG: possessor is ${possessor}, making ${possessor} ${argObj.word}`)
    }

    console.groupEnd();
    return `${possessor}la ${argObj.word}`
}
