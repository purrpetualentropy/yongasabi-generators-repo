function compoundGetter (argObj, verbType) {
    // EEK.
    console.groupCollapsed("compoundGetter");
    let devMode = document.getElementById("devBox").checked;
    let compoundType = argObj.compoundTypes[rnd(0, argObj.compoundTypes.length)]
    compoundType = compoundType.toString();
    let compoundPart = argObj.compoundPart.find((string) => string.startsWith(compoundType + "-"))


    if (devMode) {
        console.log(`LOG: compoundType is ${compoundType}`)
    }

    let miniDict = dictGetter(verbType, "compound", +compoundType);
    // the compound types are stored as numbers
    // so we need to convert them to a string so that we can use startsWith on them
    // and then convert back to a number in the function call...
    // it would be a lot smarter to make them strings in the original array but i can't be bothered right now
    let targetIndex;

    let returnCompound;

    // We have a "dirty" dict that has words with corresponding compoundTypes, but not corresponding parts.
    // Now we enter if/else hell.

    // First check about being compoundType 3 or decimal thereof.
    // Since we need to look for counter also.
    // Check the compoundPart and get one corresponding by filtering miniDict.
    // Then call dictGetter again, and get the corresponding part.
    // Write and return.

    switch (compoundType.startsWith("3")) {

        case true:
            // EEK. EEK. EEK. EEK. EEK!!!!!!!!!

            if (compoundPart === compoundType + "-head") {
                // get counter and dependent, then write dependent counter word

                miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-counter"));
                targetIndex = rnd(0, miniDict.length);

                let counter = miniDict[targetIndex].getWord();

                miniDict = dictGetter(verbType, "compound", compoundType)
                miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-dependent"));
                targetIndex = rnd(0, miniDict.length);

                let dependent = miniDict[targetIndex].getWord();

                returnCompound = `${dependent} ${counter} ${argObj.word}`

            } else
                if (compoundPart === compoundType + "-counter") {
                    // get head and dependent, then write dependent word head

                    miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-head"));
                    targetIndex = rnd(0, miniDict.length);

                    let head = miniDict[targetIndex].getWord();

                    miniDict = dictGetter(verbType, "compound", compoundType)
                    miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-dependent"));
                    targetIndex = rnd(0, miniDict.length);

                    let dependent = miniDict[targetIndex].getWord();

                    returnCompound = `${dependent} ${argObj.word} ${head}`

                } else
                {
                    // get counter and head, then write word counter head

                    miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-counter"));
                    targetIndex = rnd(0, miniDict.length);

                    let counter = miniDict[targetIndex].getWord();

                    miniDict = dictGetter(verbType, "compound", compoundType)
                    miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-head"));
                    targetIndex = rnd(0, miniDict.length);

                    let head = miniDict[targetIndex].getWord();

                    returnCompound = `${argObj.word} ${counter} ${head}`

                }

            break;

        default:

            if (devMode) {
                console.log(`LOG: compoundPart is ${compoundPart}`)
            }

            if (compoundPart === compoundType + "-head") {
                // Get dependent.
                // Filter miniDict for, uh...
                // compoundPart.includes(compoundType + -dependent)

                miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-dependent"));
                targetIndex = rnd(0, miniDict.length);

                returnCompound = miniDict[targetIndex].getWord() + ` ${argObj.word}`
            } else {

                miniDict = miniDict.filter((obj) => obj.compoundPart.includes(compoundType + "-head"));
                targetIndex = rnd(0, miniDict.length);

                returnCompound = argObj.word + ` ${miniDict[targetIndex].getWord()}`
            }

            break;
    }

    // Otherwise, check if we're a head or dependent.
    // Then filter() miniDict based on the corresponding type,
    // write, and return.

    if (devMode) {
        console.log(`LOG: returnCompound is ${returnCompound}`)
    }

    console.groupEnd();
    return returnCompound;

}
