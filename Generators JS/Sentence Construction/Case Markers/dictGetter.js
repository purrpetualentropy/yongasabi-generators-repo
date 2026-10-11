function dictGetter (verbType, arg, type) {
    console.groupCollapsed("dictGetter");
    let devMode = document.getElementById("devBox").checked;
    let miniDict;
    let isTemporal = globalTensesArray.includes("present") || globalTensesArray.includes("past") || globalTensesArray.includes("future") || globalTensesArray.includes("habitual");
    if (devMode) {
        console.log(`LOG: dictGetter init with verbtype ${verbType} arg ${arg} type ${type} bannedWords ${bannedWords}`);

    }

    // switch on type
    // if it's some null value, ignore it and just use verbtype and arg
    // otherwise only use type and verbtype

    // Here's a sneaky thing I'm going to do.
    // To prevent myself from having to do a bunch of stuff, I'm going to hijack arg and type for compounds.

    if (arg === "compound") {

        if (devMode) {
            console.log(`LOG: arg compound was detected. Hide.`)
        }

        miniDict = wordDict.filter((obj) => obj.compoundTypes && obj.compoundTypes.includes(type) && !bannedWords.includes(obj.word));
        miniDict = miniDict.filter((obj) => obj.aliases == undefined || obj.aliases && !bannedWords.some(item => obj.aliases.includes(item)))
        miniDict = miniDict.filter((obj) => (globalTensesArray.includes(obj.temporalTense) || obj.temporalTense == "any") &&
                (globalTensesArray.includes(obj.bannedTense) == false || obj.bannedTense == "none") &&
                (obj.nonTemporalTenses == true) || isTemporal == true && obj.nonTemporalTenses == false)

        // probably works

        console.groupEnd();
        return miniDict;

    }

    switch (type) {
      case 0:
            if (devMode) {
                console.log(`LOG: type case 0 detected, type is ${type}. get dict from args`)
            }
            miniDict = wordDict.filter((obj) => Array.from(obj.args[arg]).includes(verbType) && !bannedWords.includes(obj.word) && obj.type != "verb");
            miniDict = miniDict.filter((obj) => obj.aliases == undefined || obj.aliases && !bannedWords.some(item => obj.aliases.includes(item)))
            miniDict = miniDict.filter((obj) => (globalTensesArray.includes(obj.temporalTense) || obj.temporalTense == "any") &&
                  (globalTensesArray.includes(obj.bannedTense) == false || obj.bannedTense == "none") &&
                  (obj.nonTemporalTenses == true) || isTemporal == true && obj.nonTemporalTenses == false)
            // Get a list of words that have verbType in their arg, and the word itself isn't in bannedWords
            // Then re-filter that list so that either the objects have no alias, or they have aliases and bannedWords
            // doesn't include any of its aliases;
            // then re-filter again so that we're respecting tense requirements.
            // I'm wondering if this'll ever cause issues with overlap.
            // Like lamlan is used for Rivulet, but if we ever want to implement it as a standalone position word
            // we might have issues.
            // Anyway, it doesn't matter. We have the dict.

            if (devMode) {
                console.log(`LOG: miniDict is:`);
                console.dir(miniDict)
            }
            console.groupEnd();
            return miniDict;



      default:
            if (devMode) {
                console.log(`LOG: type case non-0 detected, type is ${type}. get dict from type`)
            }

            miniDict = wordDict.filter((obj) => obj.type == type && !bannedWords.includes(obj.word));
            miniDict = miniDict.filter((obj) => obj.aliases == undefined || obj.aliases && !bannedWords.some(item => obj.aliases.includes(item)))
            miniDict = miniDict.filter((obj) => (globalTensesArray.includes(obj.temporalTense) || obj.temporalTense == "any") &&
                  (globalTensesArray.includes(obj.bannedTense) == false || obj.bannedTense == "none") &&
                  (obj.nonTemporalTenses == true) || isTemporal == true && obj.nonTemporalTenses == false)
            // Get a word that matches the type, and that isn't in bannedWords
            // and then make sure aliases don't introduce duplicates.
            // Also respect tenses.

            if (devMode) {
                console.log(`LOG: miniDict is:`);
                console.dir(miniDict)
            }
            console.groupEnd();
            return miniDict;

        // It does make me a little nervous that the *default* is filtering for type.
        // I know we're always going to have control over what it's called with, but I worry about
        // a weird call that returns a fucked up word.
    }
}
