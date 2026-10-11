function sentenceCtor () {
    const startTime = performance.now();

    console.groupCollapsed("sentenceCtor");
    bannedWords = [];
    globalTensesArray = [];
    let devMode = document.getElementById("devBox").checked;
    console.log(`sentenceCtor LOG: devMode is ${devMode}`);

    let verbType;
    let argsArray;
    let tensesArray;
    let preVAlters;
    let postVAlters;
    let verb;

    let miniDict;
    let targetIndex;

    let candidatesArray;

    let sentenceObj = {
        order: ["vocative", "negated", "subject", "timing", "locative", "ablative", "instrumental", "indirobj", "destination", "dirobj", "adverb", "verb", "sentence-final particle"]
        // These are what the property names need to get written as.
    }

    if (document.getElementById("forceArgsBox").checked) {
      miniDict.splice(miniDict.indexOf((obj) => obj.word == "anga"), 1)
      tensesArray = Array.from(document.querySelectorAll('input[class="argBox"]:checked'))
      // using tensesArray here is very weird
      // but i don't want to make a new array var that only ever holds one array
      // i don't nkow if that's more efficient, i'm sure its memory just gets discarded once its use is done
      // but i hate one-use vars

      argsArray = ["subject"];

      for (let i = 0; i < tensesArray.length; i++) {
        argsArray.push(tensesArray[i].value)
      }

      for (let i = 0; i < argsArray.length; i++) {

        if (argsArray[i] == "vocative") {} else {
          miniDict = miniDict.filter((obj) => obj.args[argsArray[i]].includes(-1) === false);
        }
      }

      // this ought to give us some verbs that we can use

      targetIndex = rnd(0, miniDict.length);
      verb = miniDict[targetIndex]

      // this also necessarily means that we can't force a verb with forcedArgs
      // i should include a fix for that at some point, but not right now

    } else {
      miniDict = dictGetter(verbType, "none", "verb");
      targetIndex = rnd(0, miniDict.length);
      verb = miniDict[targetIndex]
    }

    verbType = verb.verbType[rnd(0, verb.verbType.length)];
    sentenceObj.verb = verb.getSentenceObj()

    if (document.getElementById("forceArgsBox").checked != true && document.getElementById("useMaxArgs").checked) {
      argsArray = partRandomiser("arg", 0, document.getElementById("maxArgs").value);
    } else {
        argsArray = partRandomiser("arg", 0, Array.from(document.querySelectorAll('input[class="argBox"]:checked')).length);
    }
    // should work?

    argsArray = argsArrayFormatter(verbType, verb, argsArray);

    tensesArray = partRandomiser("tense", 1, 2)
    if (!tensesArray.includes("present")) {tensesArray.push("present")}

    tensesArray = tensesArrayFormatter(tensesArray)
    globalTensesArray = tensesArray;
    sentenceObj.verb.tensesArray = tensesArray;

    preVAlters = partRandomiser("preVAlters", 0, document.getElementById("maxPreVAlters").value);

    postVAlters = partRandomiser("postVAlters", 0, Array.from(document.querySelectorAll('input[class="postAltersBox"]:checked')).length);

    if (devMode) {
        console.log(`sentenceCtor LOG: Init with verbType ${verbType}, argsArray ${argsArray}, tensesArray ${tensesArray},
        preVAlters ${preVAlters}, postVAlters ${postVAlters}`)
    }

    for (let i = 0; i < argsArray.length; i++) {
        if (devMode) {
            console.log(`LOG: i is ${i}, argsArray[i] is ${argsArray[i]}`)
        }
        miniDict = dictGetter(verbType, argsArray[i], 0);

        if (devMode) {
            console.log(`LOG: miniDict is:`)
            console.dir(miniDict)
        }

        targetIndex = rnd(0, miniDict.length);

        if (devMode) {
            console.log(`LOG: targetIndex is ${targetIndex}, which is:`)
            console.dir(miniDict[targetIndex])
        }

        bannedWords.push(miniDict[targetIndex].word);

        if (devMode) {
            console.log(`LOG: bannedWords is now ${bannedWords}`);
        }

        sentenceObj[argsArray[i]] = miniDict[targetIndex].getSentenceObj();

        if (devMode) {
            console.log(`LOG: sentenceObj is now:`);
            console.dir(sentenceObj)
            // Okay, that works (save for that koddim doesn't have isPerson, so it just returned undefined.)
            // One thing I'm thinking about is about personReq.
            // We don't check for personReq in dictGetter right now, which means that a personReq can get paired
            // with a non-person subject, in a descriptive anga sentence.
            // I guess we can add verb types?
            // god, but it's so fucking painful to add new verb types.
            // In the old one, we were just checking and then re-rolling.
            // One unfortunate thing about using a function to get a dictionary is that we can't really implement
            // custom filter conditions on the fly.
            // Whatever it ends up being is practically set in stone.
            // This needs more discussion.
            // I'm wondering if it's worth it to implement custom logic just for anga types...?

            // No. No.
            // One of my vows for the new version should be that, aside from *actual features* -- like relative clauses
            // we never, ever, ever need to make major changes to the works of it.
            // Like, sure, maybe the whole thing is bugged and we need to scrap a ton of code. But what I mean is that
            // After release. I don't want to have to go back and add logics for verbTypes that we invent
            // for the everything gen.
            // god. Bleh. Bleh!
            // So. We don't, ever, implement specific logics. Including for this. We're going to add a new verb type
            // which accounts for personReq in descriptive anga sentences.

            // Anyway, theoretically we can get sentence objects for any word.
            // We need to add that method to every single word in the dictionary...
            // and we need to write a write() method, too.

            // But, next up is to check preVAlters, write functions for them, and test the functions.
            // Eventually we really should write tests for the ctor.

            // okay. one question i have is how do we prevent things from getting suffixed if they don't
            // need to be?
            // look. i know that caseSuffixer has an isAnga param, but that means the write() needs to
            // run an if statement to check for anga to determine how it should send that.
            // this is specific logic. banned.
            // so what to do?

            // anga needs to own this somehow. when we get anga it needs to do this on its own.
            // that means sentenceObj dirobj needs to be able to exist... or rather that
            // the verb has to get written to sentenceObj after the args
            // so that it can i.e set a flag to false
            // then the write() method just checks that one
        }
    }

    for (let i = 0; i < preVAlters.length; i++) {
        if (devMode) {
            console.log(`LOG: preVAlters loop top. i is ${i}, preVAlters is ${preVAlters}`);
        }

        candidatesArray = candidatesGetter(argsArray, sentenceObj, preVAlters[i])

        if (devMode) {
            console.log(`LOG: candidatesArray is ${candidatesArray}`)
        }

        if (candidatesArray.length != 0) {

            targetIndex = rnd(0, candidatesArray.length);

            if (devMode) {
                console.log(`LOG: targetIndex is ${targetIndex}, which is ${candidatesArray[targetIndex]}`)
            }

            switch (preVAlters[i]) {

                case "adjective":
                case "adj":
                    sentenceObj[candidatesArray[targetIndex]].word = adjGetter(sentenceObj[candidatesArray[targetIndex]], verbType)

                    if (devMode) {
                        console.log(`LOG: sentenceObj word is ${sentenceObj[candidatesArray[targetIndex]].word}`);
                        // AUGH IT'S SO GOOD!!!!!!!!!!!!!!!
                    }
                    sentenceObj[candidatesArray[targetIndex]].legalAlters = ["negation"]

                    break;

                case "genitive":
                    sentenceObj[candidatesArray[targetIndex]].word = genitiveGetter(sentenceObj[candidatesArray[targetIndex]], verbType)

                    if (devMode) {
                        console.log(`LOG: sentenceObj word is ${sentenceObj[candidatesArray[targetIndex]].word}`);
                    }
                    sentenceObj[candidatesArray[targetIndex]].legalAlters = ["negation"]
                    break;

                case "negation":
                    sentenceObj.negated = negatedGetter(sentenceObj[candidatesArray[targetIndex]], candidatesArray[targetIndex]);

                    if (devMode) {
                        console.log(`LOG: sentenceObj negated is now:`);
                        console.log(sentenceObj.negated);
                    }

                    delete sentenceObj[candidatesArray[targetIndex]];
                    // eek
                    break;

                case "compound":
                    sentenceObj[candidatesArray[targetIndex]].word = compoundGetter(sentenceObj[candidatesArray[targetIndex]], verbType);

                    if (devMode) {
                        console.log(`LOG: sentenceObj word is ${sentenceObj[candidatesArray[targetIndex]].word}`)
                    }

                    sentenceObj[candidatesArray[targetIndex]].legalAlters = ["negation"]
                    break;

                case "adverb":
                    sentenceObj.adverb = adverbGetter(verbType)
                    break;
            }

        }
    }

    if (postVAlters[0]) {
        // there;s only ever going to be one thing in it for now
        // so we;re just checking it and then getting ma.
        miniDict = dictGetter(verbType, "none", "sentence-final particle")
        // get by type sentence-final particle

        sentenceObj["sentence-final particle"] = miniDict[0].getSentenceObj();
    }

    let sentenceString = "";

    for (let i = 0; i < sentenceObj.order.length; i++) {

        let arg = sentenceObj.order[i]

        if (devMode) {
            console.log(`LOG top of loop, i is ${i}, order[i] is ${sentenceObj.order[i]}, arg is ${arg}`)
        }

        if (sentenceObj[arg]) {

            if (arg != "negated") {sentenceObj[arg].arg = arg}
              // slightly hacky fix so we can use obj.arg instead of the arg variable
            sentenceString += sentenceObj[arg].writeWord(sentenceObj[arg].arg, sentenceObj.verb.noSuffix.includes(arg), sentenceObj.verb.themFlag) + " "
        }

    }

    sentenceString.trim();

    console.log(`LOG: sentenceString now ${sentenceString}`);
    sentenceString = sentenceFormatter(sentenceString);

    const endTime = performance.now();
    if (endTime - startTime >= 10) {
      console.error(`LOG: took ${endTime - startTime} ms`)
    } else
    {
      console.log(`LOG: took ${endTime - startTime} ms`)
    }

    console.groupEnd();

    document.getElementById("sentenceOutput").innerHTML = sentenceString
    
  }
