function argsArrayFormatter(argsArray, tensesArray, verbType) {
    let formattedArgsArray = [];
    let verb;
    let verbIndex;
    let miniDict;
    let n = 1;
    let destroyIndex = 0;
    console.groupCollapsed("argsArrayFormatter logs");
    console.log(`LOG: argsArrayFormatter init with argsArray ${argsArray} tensesArray ${tensesArray} verbType ${verbType}. Acquire verb.`);

    if (forceArgs == false) {console.log(`LOG: not doing forced args stuff, forceArgs is ${forceArgs}`); miniDict = wordDict.filter((obj) => obj.type == "verb" && obj.verbType.includes(verbType))} else
    if (forceArgs == true)
    {
        console.log(`LOG: doing forced args stuff, forceArgs is ${forceArgs}`);
        miniDict = wordDict.filter((obj) => obj.type == "verb");
        console.log(`LOG: miniDict now:`);
            console.dir(miniDict);
        for (let i = 0; i < forcedArgsArray.length; i++) {
            console.log(`LOG: forcedArgsArray[i] is ${forcedArgsArray[i]}`);
            miniDict = miniDict.filter((obj) => obj.args[forcedArgsArray[i]].includes(-1) === false);
            console.log(`LOG: miniDict now:`);
            console.dir(miniDict);
        }
    }

    console.log(`LOG: argsArrayFormatter miniDict is:`);
    console.log(miniDict);
    verbIndex = Math.floor(Math.random() * (miniDict.length - 1 + 1));
    verb = miniDict[verbIndex]
    formattedArgsArray[0] = verb;
    console.log(`LOG: argsArrayFormatter got verb ${formattedArgsArray[0].word} from verbIndex ${verbIndex}. formattedArgsArray[0] is ${formattedArgsArray[0]}. Proceed to formatting.`);
    if (forceArgs == true) {
        console.log(`LOG: updating verbType`);
        if (forcedArgsArray.length == 1 && forcedArgsArray.includes("locative") || forcedArgsArray.length == 1 && forcedArgsArray.includes("dirobj")) {
          console.log(`LOG: forcedArgsArray appears ONLY loc or dirobj, angsa remains. forcedArgsArray is ${forcedArgsArray}. Now checking if verb is angsa ...`);
          if (miniDict[verbIndex].word == "angsa") {console.log(`LOG: word is angsa. Forcing verbType.`);
              if (forcedArgsArray.includes("locative")) {verbType = 2} else
              if (forcedArgsArray.includes("dirobj")) {verbType = [0, 1]; verbType = verbType[Math.floor(Math.random() * (verbType.length - 1 + 1))]}
                                                   } else
                                                   {console.log(`LOG: verb is NOT angsa, select rnd verbtype`);
                                                   verbType = verb.verbType[Math.floor(Math.random() * (verb.verbType.length - 1 + 1))]
                                                   }
        } else
        {
          console.log(`LOG: forcedArgsArray doesn't meet angsa conditions, destroy angsa`);
          let angsaIndex = miniDict.map(obj => obj.word).indexOf("angsa");
          console.log(miniDict[angsaIndex]);
          if (angsaIndex == undefined) {console.log(`LOG: angsa was never present anyway`)} else
            if (angsaIndex != -1 && angsaIndex != undefined) {console.log(`LOG: angsaIndex is ${angsaIndex}, destroying`);
                                         miniDict.splice(angsaIndex, 1);
                                         console.log(`LOG: miniDict now:`);
                                         console.dir(miniDict)}
                                         // angsa can take the locative and dirobj, but only with DIFFERENT verb types
                                         // meaning if we use angsa with loc and dirobj forcing, one will be removed bc of the verb typing
                                         // so angsa must be destroyed
        verbIndex = Math.floor(Math.random() * (miniDict.length - 1 + 1));
        verb = miniDict[verbIndex]
        formattedArgsArray[0] = verb;
          console.log(`LOG: miniDict[verbIndex].verbType is ${miniDict[verbIndex].verbType}`)
        verbType = miniDict[verbIndex].verbType[Math.floor(Math.random() * (miniDict[verbIndex].verbType.length - 1 + 1))]
        }
          // verbType = verb.verbType[Math.floor(Math.random() * (verb.verbType.length - 1 + 1))]
        globVerbType = verbType;
        console.log(`LOG: verbType now ${verbType}`);
    }
    // we need to send the verb type to sentenceCtor somehow
    // we'll just do that with a global variable
    // when forceArgs is true, sentenceCtor will check the global and do global stuff

    for (let i = 0; i < argsArray.length + tensesArray.length; i++) {
        if (argsArray.includes("vocative") && formattedArgsArray.includes("vocative") == false) {console.log(`LOG: argsArrayFormatter detected voc at ${argsArray.indexOf("vocative")} OR we detected imperative!`); formattedArgsArray[n] = "vocative"; if (!tensesArray.includes("imperative")) {destroyIndex = argsArray.indexOf("vocative"); argsArray[destroyIndex] = n} n++; console.log(`LOG: after voc formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("subject") && miniDict[verbIndex].args.subject.includes(verbType) == true && !tensesArray.includes("imperative")) {console.log(`LOG: argsArrayFormatter detected subject at ${argsArray.indexOf("subject")} && is true!`); formattedArgsArray[n] = "subject"; destroyIndex = argsArray.indexOf("subject"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after subj formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("subject") && miniDict[verbIndex].args.subject.includes(verbType) == false || argsArray.includes("subject") && tensesArray.includes("imperative")) {console.log(`LOG: argsArrayFormatter detected subject at ${argsArray.indexOf("subject")} && is false OR we detected imperative!`); destroyIndex = argsArray.indexOf("subject"); argsArray[destroyIndex] = n; console.log(`LOG: after subject removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("timing") && miniDict[verbIndex].args.timing.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected timing at ${argsArray.indexOf("timing")} && is true!`); formattedArgsArray[n] = "timing"; destroyIndex = argsArray.indexOf("timing"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after timing formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("timing") && miniDict[verbIndex].args.timing.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected timing at ${argsArray.indexOf("timing")} && is false!`); destroyIndex = argsArray.indexOf("timing"); argsArray[destroyIndex] = n; console.log(`LOG: after timing removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("locative") && miniDict[verbIndex].args.locative.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected loc at ${argsArray.indexOf("locative")} && is true!`); formattedArgsArray[n] = "locative"; destroyIndex = argsArray.indexOf("locative"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after loc formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("locative") && miniDict[verbIndex].args.locative.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected loc at ${argsArray.indexOf("locative")} && is false!`); destroyIndex = argsArray.indexOf("locative"); argsArray[destroyIndex] = n; console.log(`LOG: after loc removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("ablative") && miniDict[verbIndex].args.ablative.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected abl at ${argsArray.indexOf("ablative")} && is true!`); formattedArgsArray[n] = "ablative"; destroyIndex = argsArray.indexOf("ablative"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after abl formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("ablative") && miniDict[verbIndex].args.ablative.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected abl at ${argsArray.indexOf("ablative")} && is false!`); destroyIndex = argsArray.indexOf("ablative"); argsArray[destroyIndex] = n; console.log(`LOG: after abl removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("instrumental") && miniDict[verbIndex].args.instrumental.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected instr at ${argsArray.indexOf("instrumental")} && is true!`); formattedArgsArray[n] = "instrumental"; destroyIndex = argsArray.indexOf("instrumental"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after instr formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("instrumental") && miniDict[verbIndex].args.instrumental.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected instr at ${argsArray.indexOf("instrumental")} && is false!`); destroyIndex = argsArray.indexOf("instrumental"); argsArray[destroyIndex] = n; console.log(`LOG: after instr removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("indirobj") && miniDict[verbIndex].args.indirobj.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected indirobj at ${argsArray.indexOf("indirobj")} && is true!`); formattedArgsArray[n] = "indirobj"; destroyIndex = argsArray.indexOf("indirobj"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after indirobj formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("indirobj") && miniDict[verbIndex].args.indirobj.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected indirobj at ${argsArray.indexOf("indirobj")} && is false!`); destroyIndex = argsArray.indexOf("indirobj"); argsArray[destroyIndex] = n; console.log(`LOG: after indirobj removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("destination") && miniDict[verbIndex].args.destination.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected dest at ${argsArray.indexOf("destination")} && is true!`); formattedArgsArray[n] = "destination"; destroyIndex = argsArray.indexOf("destination"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after dest formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("destination") && miniDict[verbIndex].args.destination.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected dest at ${argsArray.indexOf("destination")} && is false!`); destroyIndex = argsArray.indexOf("destination"); argsArray[destroyIndex] = n; console.log(`LOG: after dest removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else

        if (argsArray.includes("dirobj") && miniDict[verbIndex].args.dirobj.includes(verbType) == true) {console.log(`LOG: argsArrayFormatter detected dirobj at ${argsArray.indexOf("dirobj")} && is true!`); formattedArgsArray[n] = "dirobj"; destroyIndex = argsArray.indexOf("dirobj"); argsArray[destroyIndex] = n; n++; console.log(`LOG: after dirobj formatted argsArray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); } else
        if (argsArray.includes("dirobj") && miniDict[verbIndex].args.dirobj.includes(verbType) == false) {console.log(`LOG: argsArrayFormatter detected dirobj at ${argsArray.indexOf("dirobj")} && is false!`); destroyIndex = argsArray.indexOf("dirobj"); argsArray[destroyIndex] = n; console.log(`LOG: after dirobj removed argsarray now ${argsArray} formattedArgsArray now ${formattedArgsArray} n now ${n}`); }
    }

    console.log(`LOG: argsArray now exited loop. formattedArgsArray is ${formattedArgsArray}. Returning.`);
    console.groupEnd();
    return formattedArgsArray;
};
