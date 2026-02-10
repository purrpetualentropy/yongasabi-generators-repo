function sentenceCtor(verbType, tensesArray, argsArray, preVAlters, postVAlters) {
    // we need to be receiving a verb type, a tenses array, an args array, a pre verb alterations array, and a post verb alterations array
    // in the website version we won't be receiving wordDict as it'll be global
    let sentenceArray = [];
    let sentenceString;
    let miniDict;
    let argsDict;
    let currArg;
    let targetIndex;
    let word;
    let usedArgs = [];
    let usedArgsIndex = 0;
    let sentenceArrayIndex = 0;
    let isNonTemporal;
    let altersDict = [];
    let alterIndex;
    let sentenceTone = "";

    // regarding config:
    // we should write to global variables, as decided previously
    // with the checkboxes, we will use onclick="checkboxVar = this.checked"
    // then we will read from global variables instead of needing to use getElementById every time
    // o7

    // TODO AFTER PORT:
    // re-implement various currently missing features like focRnd
    // tidy the variables
    // reformat other gens
    // update the github
    // make sure that forced args actually work
    // remember that forced args requires TWO global variables
    // as we need to take the new verbType before getting miniDict


    console.log(`LOG: sentenceCtor awake. Calling tensesArrayFormatter.`);
    console.groupCollapsed("sentenceCtor logs");
    if (argsArray.includes("subject")) {console.log(`LOG: argsArray detected to have subject, do nothing`)} else
    {argsArray.splice(0, 0, "subject")}
    if (negPermitted == true && Math.floor(Math.random() * (2 - 1 + 1)) + 1 == 1) {
      console.log(`LOG: rnd is 1, neg and present`);
      tensesArray = ["present", "neg"]
    } else
    {console.log(`LOG: rnd is not 1 or neg is not permitted, present only`);
    tensesArray = ["present"]}
    tensesArray = tensesArrayFormatter(tensesArray);
    console.log(`LOG: tensesArray now ${tensesArray}. Checking temporal.`);
    // if tensesarray does not include present, past, future, or habitual, it is considered to have zero temporal tenses
    isNonTemporal = !(tensesArray.includes("present") || tensesArray.includes("past") || tensesArray.includes("future") || tensesArray.includes("habitual"));
    console.log(`LOG: isNonTemporal is ${isNonTemporal}.`);
    // we need isNonTemporal to check validity of certain sentence-final particles and words

    console.log(`LOG: Now calling argsArrayFormatter.`);
    argsArray = argsArrayFormatter(argsArray, tensesArray, verbType);
    console.log(`LOG: argsArray now ${argsArray}. Proceed to arg writing loop.`);

    console.log(`LOG: checking forceArgs ...`);
    if (forceArgs == true) {console.log(`LOG: forceArgs is true, fix verbType, forceArgs is ${forceArgs}`);
    verbType = globVerbType;
    console.log(`LOG: verbType now ${verbType}`)} else
    {console.log(`LOG: forceArgs not true, do nothing`)}

    miniDict = wordDict.filter((obj) => obj.legalVTypes.includes(verbType) && obj.type != "verb" && (obj.temporalTense == "any" || tensesArray.includes(obj.temporalTense) || isNonTemporal == obj.nonTemporalTenses) && (obj.bannedTense == "none" || tensesArray.includes(obj.bannedTense) == false));
    // create a list of all words that we can use with this verb & current tenses
    console.log(`miniDict is:`);
    console.groupCollapsed("miniDict");
    console.dir(miniDict);
    console.groupEnd();
    for (let i = 1; i < argsArray.length; i++) {
        // we begin the loop at 1 because the verb chosen is written in argsArray[0]
        // and we can't use it to write an argument
        console.log(`argsArray[i] is ${argsArray[i]} i is ${i} verbType is ${verbType}`);
        argsDict = miniDict.filter((obj) => Array.from(obj.args[argsArray[i]]).includes(verbType) && usedArgs.includes(obj.word) == false);
        argsDict = argsDict.filter((obj) => obj.aliases == undefined || obj.aliases && usedArgs.some(item => obj.aliases.includes(item)))
        // from the list of all valid words, get all words that can be the current argument for this verb type & that we haven't already used in the sentence
        // we can't run includes() on something that isn't an array, so we should
        // write -1 into every word that cannot be a specific argument
        targetIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
        // select a random word from the list
        if (argsDict[targetIndex].aliases == undefined) {console.log(`LOG: has no aliases, use word`); word = argsDict[targetIndex].word} else
        if (argsDict[targetIndex].aliases != undefined && (Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 1) {
            console.log(`LOG: has aliases, use aliases`);
            word = argsDict[targetIndex].aliases[Math.floor(Math.random() * (argsDict[targetIndex].aliases.length - 1 + 1))]} else
        if (argsDict[targetIndex].aliases != undefined && (Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 2)
        {console.log(`LOG: has aliases, use word`); word = argsDict[targetIndex].word}
        // and get its word parameter, or a random alias if it has aliases
        console.log(`sentenceCtor LOG: got word ${word} from argsDict:`);
        console.groupCollapsed("argsDict");
        console.dir(argsDict);
        console.groupEnd();
        if (argsArray[i] == "dirobj" && verbType == 0) {
            console.log(`LOG: desc angsa dirobj detected, checking animReq`);
            if (argsDict[targetIndex].animateReq == true && sentenceArray[sentenceArray.findIndex(obj => {return obj.arg == "subject"})].animate == true  || argsDict[targetIndex].personReq == true && sentenceArray[sentenceArray.findIndex(obj => {return obj.arg == "subject"})].isPerson == true)
            {console.log(`LOG: animateReq / personReq is true, but subject is animate / person, do nothing`)} else
            if (argsDict[targetIndex].animateReq == true && sentenceArray[sentenceArray.findIndex(obj => {return obj.arg == "subject"})].animate == false  || argsDict[targetIndex].personReq == true && sentenceArray[sentenceArray.findIndex(obj => {return obj.arg == "subject"})].isPerson == false)
            {console.log(`LOG: animateReq / personReq is true but subject is not animate / person, re-roll`);
                argsDict = miniDict.filter((obj) => Array.from(obj.args[argsArray[i]]).includes(verbType) && usedArgs.includes(obj.word) == false && obj.animateReq == false && obj.personReq == false);
                targetIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                console.dir(argsDict);
                word = argsDict[targetIndex].word} else
            if (argsDict[targetIndex].animateReq == false || argsDict[targetIndex].animateReq == undefined || argsDict[targetIndex].animateReq == null || argsDict[targetIndex].personReq == false || argsDict[targetIndex].personReq == undefined || argsDict[targetIndex].personReq == null)
            {console.log(`LOG: animReq / personReq is false, do nothing`)}
        }
            // some adjectives cannot be used on inanimate words (i.e jamiyae 'convincing')
            // we check if it's a descriptive angsa sentence (i.e 'hanitaega koddim sa')
            // if it is, and the adjective requires being animate, we check that the subject is animate
            // if subject is animate, we don't re-roll anything
            // if animate is required but the subject isn't animate, we re-roll to make sure the adjectives can be used
            // on inanimate subjects.
        if (preVAlters.includes("compound") == false) {
        if ((verbType == 0 || verbType == 1) && argsArray[i] == "dirobj") {console.log(`sentenceCtor LOG: angsa dirobj detected, no case suffix`); currArg = word} else
        {console.log(`sentenceCtor LOG: angsa dirobj NOT detected, case suffix`); currArg = caseSuffixer(word, argsArray[i], argsDict[targetIndex].animate, argsArray[0].dirobjThem)}} else
        {currArg = word}
        // does this also break negation ...?
        // because of the way compounds work, they need sentenceObjs to not be case suffixed
        // but it's inconvenient, so if we don't need to worry about that, then we just suffix now
        sentenceArray[sentenceArrayIndex] = { word: currArg, arg: argsArray[i], legalAlters: argsDict[targetIndex].legalAlters, animate: argsDict[targetIndex].animate, isPerson: argsDict[targetIndex].isPerson }
        console.log(`sentenceCtor LOG: sentenceArray now:`);
        console.groupCollapsed("sentenceArray");
        console.dir(sentenceArray);
        console.groupEnd();
        sentenceArrayIndex += 1;
        // write the current word (suffixed) into the array, and also some extra info that we need later for things like adjectives
        // then increase the index by 1
        usedArgs[usedArgsIndex] = word;
        console.log(`sentenceCtor LOG: word ${word} was added to usedArgs at ${usedArgsIndex}`);
        console.log(`sentenceCtor LOG: usedArgs is now ${usedArgs}`);
        usedArgsIndex += 1;
        // also add the word to the used args list and increase the index at which we write into used args
        if (argsDict[targetIndex].sentenceTone != undefined) {sentenceTone = argsDict[targetIndex].sentenceTone}
        // if the word should implement a sentence tone (i.e 'ma', the question marker, should use '?') do it now
    }
    console.log(`sentenceCtor LOG: exited loop. Writing verb.`);
    console.dir(argsArray[0])
    if (argsArray[0].aliases == undefined) {console.log(`LOG: has no aliases, use word`); word = argsArray[0].word} else
    if (argsArray[0].aliases != undefined && (Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 1) {
        console.log(`LOG: has aliases, use aliases`);
        word = argsArray[0].aliases[Math.floor(Math.random() * (argsArray[0].aliases.length - 1 + 1))]} else
    if (argsArray[0].aliases != undefined && (Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 2)
    {console.log(`LOG: has aliases, use word`); word = argsArray[0].word}
    sentenceArray[sentenceArrayIndex] = {word: word, arg: "verb", legalAlters: argsArray[0].legalAlters};
    sentenceArrayIndex += 1;
    // add the verb to the last index in the sentence
    console.log(`sentenceCtor LOG: verb written, sentenceArray now:`);
    console.groupCollapsed("sentenceArray");
    console.dir(sentenceArray);
    console.groupEnd();
    console.log(`sentenceCtor LOG: now entering preverb alterations loop.`);

    // pre-verb alterations include the genitive, adjectives, negation of args, compounds like 'hanoltak bak', and adverbs
    // fun stuff!

    for (let i = 0; i < preVAlters.length; i++) {
    console.log(`LOG: top of preVAlters loop. preVAlters is ${preVAlters}, i is ${i}, preVAlters[i] is ${preVAlters[i]}`);
    altersDict = sentenceArray.filter((obj) => obj.legalAlters.includes(preVAlters[i]) && obj.arg != "vocative");
    // get a list of every word in the sentence that can take the current alteration
    console.log(`LOG: altersDict now:`);
    console.groupCollapsed("altersDict");
    console.dir(altersDict);
    console.groupEnd();
    targetIndex = Math.floor(Math.random() * (altersDict.length - 1 + 1));
    console.log(`LOG: targetIndex is ${targetIndex}, which is:`);
    console.dir(altersDict[targetIndex]);
    // and get a random word from that list
    // the length of altersDict will be 0 if no words in the sentence can take that alteration
    if (altersDict.length != 0) {
        console.log(`LOG: altersDict.length is not 0, enter switch`);

        switch (preVAlters[i]) {
            case "negation":
                console.log(`LOG: negation was detected. Negating.`);
                // do not get a word from the dictionary, just write 'yong'

                if (sentenceArray[sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word})].isCompound == undefined) {
                    console.log(`LOG: target word is NOT a compound, do normal`)
                if (argsArray.includes("vocative")) {
                    sentenceArray.splice(sentenceArray.findIndex(object => {
                        return object.arg == "vocative"}) + 1, 0, {word: altersDict[targetIndex].word, arg: altersDict[targetIndex].arg, legalAlters: ["none"], animate: altersDict[targetIndex].animate});
                    sentenceArray.splice(sentenceArray.findIndex(object => {
                        return object.arg == "vocative"}) + 2, 0, {word: "yong", arg: "negation", legalAlters: ["none"]})
                    // place the negated word and yong after the vocative

                    sentenceArray.splice(sentenceArray.findIndex(object => {
                        return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                    }), 1);
                    // and remove the old word
                    console.log(`LOG: sentenceArray now:`);
                    console.groupCollapsed("sentenceArray");
                    console.dir(sentenceArray);
                    console.groupEnd();
                } else
                {sentenceArray.splice(0, 0, {word: altersDict[targetIndex].word, arg: altersDict[targetIndex].arg, legalAlters: ["none"], animate: altersDict[targetIndex].animate});
                    sentenceArray.splice(1, 0, {word: "yong", arg: "negation", legalAlters: ["none"], animate: false})
                    sentenceArray.splice(sentenceArray.findIndex(object => {
                        return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                    }), 1)
                    // if the vocative isn't present, just move it to the start of the sentence
                    console.log(`LOG: sentenceArray now:`);
                    console.groupCollapsed("sentenceArray");
                    console.dir(sentenceArray);
                    console.groupEnd()}}
                else
                if (sentenceArray[sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word})].isCompound == true) {
                    console.log(`LOG: target word IS a compound, do compound stuff`);
                    if (argsArray.includes("vocative")) {
                        console.log(`LOG: voc is present`);
                        sentenceArray.splice(sentenceArray.findIndex(object => {
                            return object.arg == "vocative"}) + 1, 0, {word: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "dependent"})].word, arg: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "dependent"})].arg, legalAlters: ["none"], animate: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "dependent"})].animate});
                        sentenceArray.splice(sentenceArray.findIndex(object => {
                            return object.arg == "vocative"}) + 2, 0, {word: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "head"})].word, arg: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "head"})].arg, legalAlters: ["none"], animate: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "head"})].animate});
                        sentenceArray.splice(sentenceArray.findIndex(object => {
                            return object.arg == "vocative"}) + 3, 0, {word: "yong", arg: "negation", legalAlters: ["none"], animate: false});
                        // do the same as above, except move both parts of the compound
                        // (we can be certain that words with the compoundPart property are the old words and not the negated ones
                        // because we never write that property while negating them; it's not longer necessary, as negated words
                        // cannot take any further alterations)
                        sentenceArray.splice(sentenceArray.findIndex(object => {return object.compoundPart == "dependent"}), 1);
                        sentenceArray.splice(sentenceArray.findIndex(object => {return object.compoundPart == "head"}), 1)
                        // then remove the old words like usual
                        console.log(`LOG: sentenceArray now:`);
                        console.groupCollapsed("sentenceArray");
                        console.dir(sentenceArray);
                        console.groupEnd();
                    } else
                    {
                        console.log(`LOG: voc not present`);
                        sentenceArray.splice(0, 0, {word: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "dependent"})].word, arg: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "dependent"})].arg, legalAlters: ["none"], animate: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "dependent"})].animate});
                        sentenceArray.splice(1, 0, {word: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "head"})].word, arg: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "head"})].arg, legalAlters: ["none"], animate: sentenceArray[sentenceArray.findIndex(object => {return object.compoundPart == "head"})].animate});
                        sentenceArray.splice(2, 0, {word: "yong", arg: "negation", legalAlters: ["none"], animate: false});
                        sentenceArray.splice(sentenceArray.findIndex(object => {return object.compoundPart == "dependent"}), 1);
                        sentenceArray.splice(sentenceArray.findIndex(object => {return object.compoundPart == "head"}), 1)
                        // all the same stuff, but without moving it ahead of the vocative, as the voc isn't present
                        console.log(`LOG: sentenceArray now:`);
                        console.groupCollapsed("sentenceArray");
                        console.dir(sentenceArray);
                        console.groupEnd();

                    }
                }
                console.log(`LOG: items moved and removed. sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                break;

            case "possessed":
                console.log(`LOG: possession was detected, doing genitive stuff`);
                argsDict = miniDict.filter((obj) => obj.args.genitive == true && usedArgs.includes(obj.word) == false);
                argsDict = argsDict.filter((obj) => obj.aliases == undefined || obj.aliases && usedArgs.some(item => obj.aliases.includes(item)))
                alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                // get a word that can be used as the genitive
                console.log(`LOG: alterObj is:`);
                console.groupCollapsed("alterObj");
                console.dir(argsDict[alterIndex]);
                console.groupEnd();
                if (argsDict[targetIndex].aliases == undefined) {console.log(`LOG: has no aliases, use word`); word = argsDict[targetIndex].word} else
                if (argsDict[targetIndex].aliases != undefined && (Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 1) {
                    console.log(`LOG: has aliases, use aliases`);
                    word = argsDict[targetIndex].aliases[Math.floor(Math.random() * (argsDict[targetIndex].aliases.length - 1 + 1))]} else
                if (argsDict[targetIndex].aliases != undefined && (Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 2)
                {console.log(`LOG: has aliases, use word`); word = argsDict[targetIndex].word}
                sentenceArray.splice(sentenceArray.findIndex(obj => {
                     return obj.word == altersDict[targetIndex].word && obj.legalAlters.includes(preVAlters[i])
                }), 0, {word: caseSuffixer(word, "gen", argsDict[alterIndex].animate, false), arg: preVAlters[i], legalAlters: ["none"]})
                // casesuffix it and put it in the sentence
                sentenceArray[sentenceArray.findIndex(obj => {
                     return obj.word == altersDict[targetIndex].word && obj.legalAlters.includes(preVAlters[i])})].legalAlters = ["none"];
                // edit the object we targeted in order to prevent it from being modified again
                // (which can break stuff and be ungrammatical)
                console.log(`LOG: spliced, sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                if (argsDict[alterIndex].sentenceTone != undefined) {sentenceTone = argsDict[alterIndex].sentenceTone}
                // if something should change the puncutation at the end of the sentence
                // from nothing to "?", do that
                break;

            case "compound":
                console.log(`LOG: compound was detected. Init variables.`);
                let compoundTypeArray = miniDict[miniDict.findIndex(obj => {return obj.word == altersDict[targetIndex].word})].compoundTypes;
                let compoundType = compoundTypeArray[Math.floor(Math.random() * (compoundTypeArray.length - 1 + 1))];
                let compoundPosition = miniDict[miniDict.findIndex(obj => {return obj.word == altersDict[targetIndex].word})].compoundPart.find((string) => string.startsWith(compoundType + "-") == true);
                // do a bunch of shenanigans to get a compoundType and the selected word's compound position
                // in the case of "kip cho", "kip" is the dependent and "cho" is the head
                console.log(`LOG: selected compoundType is ${compoundType}, corresponding compoundPosition is ${compoundPosition}.`);
                if (compoundPosition == compoundType + "-head") {
                    console.log(`LOG: word is a head, find dependents`);
                    targetIndex = sentenceArray.findIndex(object => {
                        return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                    })
                    argsDict = miniDict.filter((obj) => obj.compoundTypes != undefined && obj.compoundTypes.includes(compoundType) && usedArgs.includes(obj.word) == false && obj.compoundPart.includes(compoundType + "-dependent") && obj.args[sentenceArray[targetIndex].arg].includes(verbType));
                    alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                    // get a word that can be used as the dependent
                    console.log(`LOG: alterObj is:`);
                    console.groupCollapsed("alterObj");
                    console.dir(argsDict[alterIndex]);
                    console.groupEnd();
                    sentenceArray.splice(targetIndex, 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"], isCompound: true, compoundPart: "dependent"})
                    sentenceArray[targetIndex + 1].isCompound = true;
                    sentenceArray[targetIndex + 1].compoundPart = "head";
                    // insert the dependent before the target word
                    console.dir(`LOG: sentenceArray now ${sentenceArray}`);
                    if (argsDict[alterIndex].sentenceTone != undefined) {sentenceTone = argsDict[alterIndex].sentenceTone}
                    // if something should change the puncutation at the end of the sentence
                    // from nothing to "?", do that
                } else
                if (compoundPosition == compoundType + "-dependent") {
                    console.log(`LOG: word is a dependent, find heads`)
                    targetIndex = sentenceArray.findIndex(object => {
                        return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                    });
                    argsDict = miniDict.filter((obj) => obj.compoundTypes != undefined && obj.compoundTypes.includes(compoundType) && usedArgs.includes(obj.word) == false && obj.compoundPart.includes(compoundType + "-head") && obj.args[sentenceArray[targetIndex].arg].includes(verbType));
                    alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                    // get a word that can be used as the head
                    console.log(`LOG: alterObj is:`);
                    console.groupCollapsed("alterObj");
                    console.dir(argsDict[alterIndex]);
                    console.groupEnd();
                    sentenceArray.splice(targetIndex + 1, 0, {word: argsDict[alterIndex].word, arg: sentenceArray[targetIndex].arg, legalAlters: ["none"], isCompound: true, compoundPart: "head"});
                    sentenceArray[targetIndex].arg = "compound"
                    sentenceArray[targetIndex].isCompound = true;
                    sentenceArray[targetIndex].compoundPart = "dependent";
                    console.log(`sentenceArray now:`);
                    console.dir(sentenceArray)
                    // insert the head after the target word
                    if (argsDict[alterIndex].sentenceTone != undefined) {sentenceTone = argsDict[alterIndex].sentenceTone}
                    // if something should change the puncutation at the end of the sentence
                    // from nothing to "?", do that
                }
                break;

            case "adj":
            case "adjective":
            case "adverb":
                console.log(`LOG: adj or adverb was detected, inserting immediately before`);
                // get a word with the same type as our current alteration that hasn't been used in the sentence
                argsDict = wordDict.filter((obj) => obj.type == preVAlters[i] && usedArgs.includes(obj.word) == false);
                alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                console.dir(argsDict)
                console.log(`LOG: alterObj is:`);
                console.dir(argsDict[alterIndex]);
                console.log(`LOG: checking animate and personReq`);
                if (argsDict[alterIndex].animateReq == true && argsDict[alterIndex].personReq == true) {altersDict = sentenceArray.filter((obj) => obj.legalAlters.includes(preVAlters[i]) && obj.arg != "vocative" && obj.animate == true && obj.isPerson == true)} else
                if (argsDict[alterIndex].animateReq == true && argsDict[alterIndex].personReq == false) {altersDict = sentenceArray.filter((obj) => obj.legalAlters.includes(preVAlters[i]) && obj.arg != "vocative" && obj.animate == true)} else
                {altersDict = sentenceArray.filter((obj) => obj.legalAlters.includes(preVAlters[i]) && obj.arg != "vocative" && obj.arg != "verb")}
                // re-filter for words we can alter (to hopefully prevent it from going before the verb)
                console.log(`LOG: altersDict now:`);
                console.groupCollapsed("altersDict");
                console.dir(altersDict);
                console.groupEnd();
                targetIndex = Math.floor(Math.random() * (altersDict.length - 1 + 1));
                console.log(`LOG: targetIndex is ${targetIndex}, which is:`);
                console.dir(altersDict[targetIndex]);
                // log all that
                if (altersDict != undefined) {
                  if (sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word}) == 0) {
                      sentenceArray.splice((sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word})), 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"]})
                sentenceArray[sentenceArray.findIndex(object => { return object.word == altersDict[targetIndex].word})].legalAlters = ["none"]
                console.log(`LOG: spliced at ${sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i])
                })} sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd()
                if (argsDict[alterIndex].sentenceTone != undefined) {sentenceTone = argsDict[alterIndex].sentenceTone}} else
                    {sentenceArray.splice(sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word}), 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"]})
                
                console.log(`LOG: spliced at ${sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i])
                })} sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                if (argsDict[alterIndex].sentenceTone != undefined) {sentenceTone = argsDict[alterIndex].sentenceTone}}} else
                {console.log(`LOG: altersDict was undefined, do nothing`)}
                // if something should change the puncutation at the end of the sentence
                // from nothing to "?", do that
                break;

            default:
                console.log(`LOG: DEFAULTED. adding before target WITHOUT checking animateReq (presumed undefined). preVAlters[i] is ${preVAlters[i]}.`);
                argsDict = miniDict.filter((obj) => obj.type == preVAlters[i] && usedArgs.includes(obj.word) == false);
                alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                console.log(`LOG: alterObj is:`);
                console.dir(argsDict[alterIndex]);
                sentenceArray.splice(sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i])
                }), 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"]})
                // find the index of an object with the same word as our selected word, which is legal to alter
                // and insert our word immediately before it
                // since this is the default case, we don't know if this word will have animateReq defined or not
                // so we don't check it at all
                console.log(`LOG: spliced at ${sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i])
                })} sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                if (argsDict[alterIndex].sentenceTone != undefined) {sentenceTone = argsDict[alterIndex].sentenceTone}
                break;
        }
    } else {
        console.log(`LOG: altersDict.length is 0, do nothing`)
        // if there are no words that can be altered with this alteration, don't do anything
    }
    }

    console.log(`LOG: exited preverb alterations loop, sentenceArray now:`);
    console.groupCollapsed("sentenceArray");
    console.dir(sentenceArray);
    console.groupEnd();
    console.log(`LOG: now adding post-verb alterations`)

    if (postVAlters.length == 1) {
        console.log(`LOG: postVAlters length was found to be 1, has data! Proceed!`);
        argsDict = miniDict.filter((obj) => obj.type == postVAlters[0])
        targetIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
        console.log(`LOG: targetIndex is ${targetIndex}, which is:`);
        console.dir(argsDict[targetIndex])
        console.log(`LOG: now moving on to sentenceString`)
        if (argsDict[targetIndex] != undefined) {
        if (argsDict[targetIndex].sentenceTone != undefined) {sentenceTone = argsDict[targetIndex].sentenceTone}}
        // if something should change the puncutation at the end of the sentence
        // from nothing to "?", do that
    } else
    {console.log(`LOG: postVAlters has non-1 length, do nothing`)}

    // post-verb alters will always have a length of 1. this means we can always check index 0
    // for our current alter
    // (if it doesn't have a length of 1, it meant no post-verb alteration was selected at all)
    // post-verb alterations include converbs, sentence-final particles like -tto or ma, and pei

    console.log(`LOG: tensing verb`);
    word = tenseSuffixer(sentenceArray[sentenceArray.findIndex(object => {return object.arg == "verb"})].word, argsArray[0].rootLength, tensesArray);
    console.log(`LOG: tensed verb is ${word}, assigning`);
    sentenceArray[sentenceArray.findIndex(object => {return object.arg == "verb"})].word = word;
    console.log(`LOG: should be assigned, sentenceArray is:`);
    console.groupCollapsed("sentenceArray");
    console.dir(sentenceArray);
    console.groupEnd();

    console.log(`LOG: checking case suffixed`);
    if (preVAlters.includes("compound")) {
        console.log(`LOG: preVAlters includes compound. case suffixing`);
        for (let i = 0; i < sentenceArray.findIndex(object => {return object.arg == "verb"}); i++) {
            // enter a for loop where we caseSuffix every single word except the verb
            sentenceArray[i].word = caseSuffixer(sentenceArray[i].word, sentenceArray[i].arg, sentenceArray[i].animate, argsArray[0].dirobjThem, argsArray[0].word == "angsa");
        }
    }

    sentenceString = sentenceArray.map(function(elem){return elem.word}).join(" ");
    console.log(`LOG: sentenceString is "${sentenceString}"`);
    console.log(`LOG: now adding post-verb alter`);
    if (postVAlters.length == 1 && argsDict.length != 0)
    {sentenceString += argsDict[targetIndex].joinWith + argsDict[targetIndex].word}
    sentenceString += sentenceTone;
    // joinWith is a property that only post-v alters have
    // because things like -tto or -dakanei need to be suffixed onto the verb, but ma and pei shouldn't be
    console.log(`LOG: sentenceString now "${sentenceString}", return`);
    console.groupEnd();
    return sentenceString;
};
