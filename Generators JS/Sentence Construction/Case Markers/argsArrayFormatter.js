function argsArrayFormatter (verbType, verb, argsArray) {
    console.groupCollapsed("argsArrayFormatter");
    let devMode = document.getElementById("devBox").checked;
    let formattedArgsArray = [];

    // Loop through argsArray.
    // If an item passes verb[argsArray[i]].includes(verbType) it's pushed to formattedArgsArray.
    // This is because if we splice ... okay, scenario.
    // We're on i == 3. We detect an arg that's illegal and splice it.
    // The arg at 4 moves to 3. This arg happens to be illegal.
    // But we don't check it. We i++. The arg now at 3 stays there, still illegal.
    // So it's better to push rather than splice. That way we can just loop once and be done with it.

    for (let i = 0; i < argsArray.length; i++) {

        if (devMode) {
            console.log(`LOG: top of loop, i is ${i}, argsArray is ${argsArray}, formattedArgsArray is ${formattedArgsArray}`);
        }

        if (argsArray[i] == "vocative" || verb.args[argsArray[i]].includes(verbType)) {
            formattedArgsArray.push(argsArray[i])
        }

    }

    // We don't need to organise the args into a specific order because sentenceObj handles its own order now.

    console.groupEnd();
    return formattedArgsArray;
}
