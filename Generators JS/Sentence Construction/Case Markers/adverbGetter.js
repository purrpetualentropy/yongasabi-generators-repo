function adverbGetter (verbType) {
    console.groupCollapsed("adverbGetter");
    let devMode = document.getElementById("devBox").checked;
    let miniDict = dictGetter(verbType, "none", "adverb")
    let targetIndex = rnd(0, miniDict.length)
    let adverb = miniDict[targetIndex].getSentenceObj();

    if (devMode) {
        console.log(`LOG: adverb is ${adverb}`)
    }

    console.groupEnd();
    return adverb;
    // wow that's simple.
    // hopefully this actually works...

}
