sentenceCtor(wordDict);
import { tenseSuffixer } from "./tenseSuffixer.js";
import { wordDict } from "./wordDict.js";
import { caseSuffixer } from "./caseSuffixer.js";
import { vowelChecker } from "./caseSuffixer.js";
import { tensesArrayFormatter } from "./tensesArrayFormatter.js";
import { argsArrayFormatter } from "./argsArrayFormatter.js";

function sentenceCtor (wordDict) {
    // we need to be receiving a tenses array, an args array, a pre verb alterations array, and a post verb alterations array (whenver we figure out how to do that)
    let sentenceArray = [];
    let sentenceString;
    let argsArray = ["timing", "locative", "instrumental", "indirobj", "destination", "vocative", "dirobj", "subject"];
    // call argsArrayFormatter, get our args, verb, and verb type
    // then filter() into miniDict
    let verbType = 3;
    let miniDict;
    let argsDict;
    let currArg;
    let targetIndex;
    let word;
    let usedArgs = [];
    let usedArgsIndex = 0;
    let sentenceArrayIndex = 0;
    let tensesArray = ["imperative"];
    let isNonTemporal;
    let preVAlters = ["compound"];
    let postVAlters = ["sentence-final particle"];
    let altersDict = [];
    let alterIndex;
    // let rnd = Math.floor(Math.random() * 2) + 1;

    // regarding config:
    // we should write to global variables, as decided previously
    // with the checkboxes, we will use onclick="checkboxVar = this.checked"
    // then we will read from global variables instead of needing to use getElementById every time
    // o7

    // TODO:
    // change to replace subject marker with focus marker (use rnd for this)
    // also, don't store rnd in a variable? i don't think that's necessary. i think we can just write the randomisation
    // and then use it in an if statement
    // like if (math.rnd == 1) {do} else {not}

    // reformat other generators to work with these new systems

    // update the github

    // tidy the variables a bit, i believe that we can have less than this

    // port and fix for website

    // implement pei and its tensing

    // tensing for daka, haga, and paga

    // extended questions w/ angsa types (i.e "how red is artificer", "how much / what kind of fruit does watcher have")

    // force args config option that actually removes verbs w/o the arg from the pool (how?)
    // or rather how to do that without having to loop over a verb's entire args
    // i know how to do this!
    // 1. in argsArrayFormatter, create a new array, bannedVerbs
    // 2. if forcing is active, when we get a verb, we check that all of its arg values are equal to the corresponding
    // argBox.checked value (i.e wordDict[targetIndex].args.subject == subjBox.checked)
    // hmm no i wonder if we can do that better
    // because it means that, say, if destination isn't checked, only verbs that can NEVER have destination will show up
    // when we dont care if destination is true or false because it's not checked
    // so ... we don't wanna have to do a loop
    // but i want to be able to ONLY check for checked args when forcing
    // in theory we can just add the forced args to an array, but then there's not really a difference between looping
    // over every arg

    // we're adding an "aliases" array to word objs like "-wa" so that people can search for them without needing
    // to guess what specifically they need to search for.
    // this is also going to be useful in the case of yangsa, so we need to add that functionality to the actual
    // verb-getting / searching parts

    // bannedTenses array for certain things
    // i recall thinking this was a good idea, but not the specific things it would be good for
    // iirc, just random non-temporal tenses?
    // ahh right i rember. "ma" shouldn't be used with the imperative ("hanitae ho laniyo ma")
    // can ma be used with other stuff...? yes
    // so i'm going to make it not an array for now


    console.log(`LOG: sentenceCtor awake. Calling tensesArrayFormatter.`);
    tensesArray = tensesArrayFormatter(tensesArray);
    console.log(`LOG: tensesArray now ${tensesArray}. Checking temporal.`);
    // if tensesarray does not include present, past, future, or habitual, it is considered to have zero temporal tenses
    isNonTemporal = !(tensesArray.includes("present") || tensesArray.includes("past") || tensesArray.includes("future") || tensesArray.includes("habitual"));
    console.log(`LOG: isNonTemporal is ${isNonTemporal}.`)
    // we need isNonTemporal to check validity of certain sentence-final particles and words

    console.log(`LOG: Now calling argsArrayFormatter.`);
    argsArray = argsArrayFormatter(argsArray, tensesArray, verbType);
    console.log(`LOG: argsArray now ${argsArray}. Proceed to arg writing loop.`)


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
        // from the list of all valid words, get all words that can be the current argument for this verb type & that we haven't already used in the sentence
        // we can't run includes() on something that isn't an array, so we should
        // write -1 into every word that cannot be a specific argument
        targetIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
        // select a random word from the list
        word = argsDict[targetIndex].word;
        // and get its word parameter
        console.log(`sentenceCtor LOG: got word ${word} from argsDict:`);
        console.groupCollapsed("argsDict");
        console.dir(argsDict);
        console.groupEnd();
        if (argsArray[i] == "dirobj" && verbType == 0) {
            console.log(`LOG: desc angsa dirobj detected, checking animReq`);
            if (argsDict[targetIndex].animateReq == true && sentenceArray[sentenceArray.findIndex(obj => {return obj.arg == "subject"})].animate == true) {console.log(`LOG: animateReq is true, but subject is animate, do nothing`)}
            if (argsDict[targetIndex].animateReq == true && sentenceArray[sentenceArray.findIndex(obj => {return obj.arg == "subject"})].animate == false) {console.log(`LOG: animateReq is true but subject is not animate, re-roll`);
                argsDict = miniDict.filter((obj) => Array.from(obj.args[argsArray[i]]).includes(verbType) && usedArgs.includes(obj.word) == false && argsDict.animateReq == false);
                targetIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                word = argsDict[targetIndex].word} else
            if (argsDict[targetIndex].animateReq == false || argsDict[targetIndex].animateReq == undefined || argsDict[targetIndex.animateReq == null]) {console.log(`LOG: animReq is ${argsDict[targetIndex].animateReq}, word is ${argsDict[targetIndex].word}, do nothing`)}
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
        // because of the way compounds work, they need sentenceObjs to not be case suffixed
        // but it's inconvenient, so if we don't need to worry about that, then we just suffix now
        sentenceArray[sentenceArrayIndex] = { word: currArg, arg: argsArray[i], legalAlters: argsDict[targetIndex].legalAlters, animate: argsDict[targetIndex].animate }
        console.log(`sentenceCtor LOG: sentenceArray now:`);
        console.groupCollapsed("sentenceArray");
        console.dir(sentenceArray);
        console.groupEnd();
        sentenceArrayIndex += 1;
        // write the current word (suffixed) into the array, and also some extra info that we need later for things like adjectives
        // then increase the index by 1
        usedArgs[usedArgsIndex] = argsDict[targetIndex].word;
        console.log(`sentenceCtor LOG: word ${argsDict[targetIndex].word} was added to usedArgs at ${usedArgsIndex}`);
        console.log(`sentenceCtor LOG: usedArgs is now ${usedArgs}`);
        usedArgsIndex += 1;
        // also add the word to the used args list and increase the index at which we write into used args
    }
    console.log(`sentenceCtor LOG: exited loop. Writing verb.`);
    sentenceArray[sentenceArrayIndex] = {word: argsArray[0].word, arg: "verb", legalAlters: argsArray[0].legalAlters};
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
    altersDict = sentenceArray.filter((obj) => obj.legalAlters.includes(preVAlters[i]));
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
                sentenceArray.splice(0, 0, {word: altersDict[targetIndex].word, arg: altersDict[targetIndex].arg, legalAlters: ["none"]});
                sentenceArray.splice(1, 0, {word: "yong", arg: "negation", legalAlters: ["none"]});
                // put the negated word and yong at the start of the sentence
                console.log(`LOG: items moved. sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                console.log(`LOG: now removing old target item.`);
                sentenceArray.splice(sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                }), 1);
                // remove the negated word from its old position in the sentence
                console.log(`LOG: item removed. sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                break;

            case "possessed":
                console.log(`LOG: possession was detected, doing genitive stuff`);
                argsDict = miniDict.filter((obj) => obj.args.genitive == true && usedArgs.includes(obj.word) == false);
                alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                // get a word that can be used as the genitive
                console.log(`LOG: alterObj is:`);
                console.groupCollapsed("alterObj");
                console.dir(argsDict[alterIndex]);
                console.groupEnd();
                sentenceArray.splice(sentenceArray.findIndex(obj => {
                     return obj.word == altersDict[targetIndex].word && obj.legalAlters.includes(preVAlters[i])
                }), 0, {word: caseSuffixer(argsDict[alterIndex].word, "gen", argsDict[alterIndex].animate, false), arg: preVAlters[i], legalAlters: ["none"]})
                // casesuffix it and put it in the sentence
                sentenceArray[sentenceArray.findIndex(obj => {
                     return obj.word == altersDict[targetIndex].word && obj.legalAlters.includes(preVAlters[i])})].legalAlters = ["none"];
                // edit the object we targeted in order to prevent it from being modified again
                // (which can break stuff and be ungrammatical)
                console.log(`LOG: spliced, sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
                break;

            case "compound":
                console.log(`LOG: compound was detected. Init variables.`);
                let compoundTypeArray = miniDict[miniDict.findIndex(obj => {return obj.word == altersDict[targetIndex].word})].compoundTypes;
                let compoundType = compoundTypeArray[Math.floor(Math.random() * (compoundTypeArray.length - 1 + 1))];
                let compoundPosition = miniDict[miniDict.findIndex(obj => {return obj.word == altersDict[targetIndex].word})].compoundPart.find((string) => string.startsWith(compoundType + "-") == true);
                // do a bunch of shenanigans to get a compoundType and the selected word's compount position
                // in the case of "kip cho", "kip" is the dependent and "cho" is the head
                console.log(`LOG: selected compoundType is ${compoundType}, corresponding compoundPosition is ${compoundPosition}.`);
                if (compoundPosition == compoundType + "-head") {
                    console.log(`LOG: word is a head, find dependents`);
                    argsDict = miniDict.filter((obj) => obj.compoundTypes != undefined && obj.compoundTypes.includes(compoundType) && usedArgs.includes(obj.word) == false && obj.compoundPart.includes(compoundType + "-dependent"));
                    alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                    // get a word that can be used as the dependent
                    console.log(`LOG: alterObj is:`);
                    console.groupCollapsed("alterObj");
                    console.dir(argsDict[alterIndex]);
                    console.groupEnd();
                    sentenceArray.splice(sentenceArray.findIndex(object => {
                        return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                    }), 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"]})
                    // insert the dependent before the target word
                    console.dir(`LOG: sentenceArray now ${sentenceArray}`);
                } else
                if (compoundPosition == compoundType + "-dependent") {
                    console.log(`LOG: word is a dependent, find heads`)
                    argsDict = miniDict.filter((obj) => obj.compoundTypes != undefined && obj.compoundTypes.includes(compoundType) && usedArgs.includes(obj.word) == false && obj.compoundPart.includes(compoundType + "-head"));
                    alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                    // get a word that can be used as the head
                    console.log(`LOG: alterObj is:`);
                    console.groupCollapsed("alterObj");
                    console.dir(argsDict[alterIndex]);
                    console.groupEnd();
                    targetIndex = sentenceArray.findIndex(object => {
                        return object.word == altersDict[targetIndex].word && !object.legalAlters.includes("none")
                    });
                    sentenceArray.splice(targetIndex + 1, 0, {word: argsDict[alterIndex].word, arg: sentenceArray[targetIndex].arg, legalAlters: ["none"]});
                    sentenceArray[targetIndex].arg = "compound"
                    console.dir(`LOG: sentenceArray now ${sentenceArray}`);
                    // insert the head after the target word
                }
                break;

            case "adjective":
            case "adverb":
                console.log(`LOG: adj or adverb was detected, inserting immediately before`);
                // get a word with the same type as our current alteration that hasn't been used in the sentence
                argsDict = miniDict.filter((obj) => obj.type == preVAlters[i] && usedArgs.includes(obj.word) == false);
                alterIndex = Math.floor(Math.random() * (argsDict.length - 1 + 1));
                console.log(`LOG: alterObj is:`);
                console.dir(argsDict[alterIndex]);
                if (argsDict[alterIndex].animateReq == true) {sentenceArray.splice(sentenceArray.findIndex(object => {
                     return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i]) && object.animate == true
                }), 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"]})} else
                {sentenceArray.splice(sentenceArray.findIndex(object => {
                     return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i])
                }), 0, {word: argsDict[alterIndex].word, arg: preVAlters[i], legalAlters: ["none"]})}
                // find the index of an object with the same word as our selected word, which is legal to alter
                // and insert our word immediately before it
                // we know for a fact that all adjectives and adverbs will have some animateReq definition
                console.log(`LOG: spliced at ${sentenceArray.findIndex(object => {
                    return object.word == altersDict[targetIndex].word && object.legalAlters.includes(preVAlters[i])
                })} sentenceArray now:`);
                console.groupCollapsed("sentenceArray");
                console.dir(sentenceArray);
                console.groupEnd();
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
    } else
    {console.log(`LOG: postVAlters has non-1 length, do nothing`)}

    // post-verb alters will always have a length of 1. this means we can always check index 0
    // for our current alter
    // (if it doesn't have a length of 1, it meant no post-verb alteration was selected at all)
    // post-verb alterations include converbs, sentence-final particles like -tto or ma, and pei

    console.log(`LOG: tensing verb`);
    word = tenseSuffixer(argsArray[0].word, argsArray[0].rootLength, tensesArray);
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
            sentenceArray[i].word = caseSuffixer(sentenceArray[i].word, sentenceArray[i].arg, sentenceArray[i].animate, argsArray[0].dirobjThem, argsArray[0].word == "angsa")
        }
    }

    sentenceString = sentenceArray.map(function(elem){return elem.word}).join(" ");
    console.log(`LOG: sentenceString is "${sentenceString}"`);
    console.log(`LOG: now adding post-verb alter`);
    if (postVAlters.length == 1 && argsDict.length != 0)
    {sentenceString += argsDict[targetIndex].joinWith + argsDict[targetIndex].word}
    // joinWith is a property that only post-v alters have
    // because things like -tto or -dakanei need to be suffixed onto the verb, but ma and pei shouldn't be
    console.log(`LOG: sentenceString now "${sentenceString}", return`);
    return sentenceString;
}