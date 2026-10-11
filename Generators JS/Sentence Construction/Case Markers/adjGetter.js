function adjGetter (argObj, verbType) {
    console.groupCollapsed("adjGetter");
    let devMode = document.getElementById("devBox").checked;
    let miniDict = dictGetter(verbType, "none", "adjective", bannedWords);
    let adj;

    if (devMode) {
        console.log(`LOG: miniDict is:`);
        console.dir(miniDict);
        console.log(`LOG: verbType is ${verbType}, bannedWords is ${bannedWords}, argObj is:`);
        console.dir(argObj);
    }

    miniDict = miniDict.filter((obj) => argObj.animate == false && obj.animateReq == false ||
        argObj.animate == true && argObj.isPerson == false && obj.personReq == false ||
        argObj.animate == true && argObj.isPerson == true)

    // If the object isn't animate we need to remove adjectives that require animate.
    // If the object is animate but not a person we need to remove adjectives that require person.
    // If the object is animate and not person, do nothing.

    let targetIndex = rnd(0, miniDict.length)
    if (devMode) {
        console.log(`LOG: targetIndex is ${miniDict[targetIndex].word}`)
    }

    adj = miniDict[targetIndex].getWord()
    bannedWords.push(adj)

    if (devMode) {
        console.log(`LOG: adj is ${adj}, making ${adj} ${argObj.word}`)
    }

    // Now we have our word, and a dictionary of adjectives that can be used on it.
    // We return `${adj} ${word}`.

    console.groupEnd();
    return `${adj} ${argObj.word}`
}
