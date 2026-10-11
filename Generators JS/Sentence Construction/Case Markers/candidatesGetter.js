// gets candidate arguments for taking alters

function candidatesGetter (argsArray, sentenceObj, alter) {
    console.groupCollapsed("candidatesGetter");
    let devMode = document.getElementById("devBox").checked;
    let candidatesArray = [];
    if (devMode) {
        console.log(`candidatesGetter awake with argsArray ${argsArray} alter ${alter} sentenceObj:`);
        console.dir(sentenceObj)
    }

    for (let i = 0; i < argsArray.length; i++) {
        if (devMode) {
            console.log(`LOG: loop top with i ${i} argsArray[i] ${argsArray[i]}`)
        }

        if (sentenceObj[argsArray[i]]) {
            if (sentenceObj[argsArray[i]].legalAlters.includes(alter)) {
                candidatesArray.push(argsArray[i])
            }
        }
    }

    if (devMode) {
        console.log(`LOG: loop exited. candidatesArray now ${candidatesArray}`)
    }
    console.groupEnd();
    return candidatesArray;
}
