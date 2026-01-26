import { wordDict } from "./wordDict.js";

export function argsArrayFormatter(argsArray, tensesArray, verbType) {
    let formattedArgsArray = [];
    let verb;
    let verbIndex;
    let miniDict;
    let n = 1;
    let destroyIndex = 0;
    console.log(`LOG: argsArrayFormatter init with argsArray ${argsArray} tensesArray ${tensesArray} verbType ${verbType}. Acquire verb.`);

    miniDict = wordDict.filter((obj) => obj.type == "verb" && obj.verbType.includes(verbType));
    console.log(`LOG: argsArrayFormatter miniDict is:`);
    console.dir(miniDict);
    verbIndex = Math.floor(Math.random() * (miniDict.length - 1 + 1));
    verb = miniDict[verbIndex]
    formattedArgsArray[0] = verb;
    console.log(`LOG: argsArrayFormatter got verb ${formattedArgsArray[0].word} from verbIndex ${verbIndex}. formattedArgsArray[0] is ${formattedArgsArray[0]}. Proceed to formatting.`);

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
    return formattedArgsArray;
}