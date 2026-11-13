function tenseSuffixer(tensesArray, verb, rootLength) {
    console.groupCollapsed("tenseSuffixer");
    let suffix = "";
    let cutFirst;
    let cutLast;
    let cutVerb = verb.slice(0, verb.length - 1);
    let useCutVerb = true;

     if (verb == "anga") {
        console.groupEnd();
        return angaTenseSuffixer(tensesArray)
     } else if (verb == "haga") {
        console.groupEnd();
        return hagaTenseSuffixer(tensesArray)
     } else if (verb.slice(verb.length - 4) == "daka" && verb != "daka") {
        console.groupEnd();
        return dakaTenseSuffixer(tensesArray, verb)
     }


    for (i = 0; i < tensesArray.length; i++) {

        switch (tensesArray[i]) {

            case "present":
                if (rootLength == 3) {useCutVerb = false}
                suffix += "sa";
                break;

            case "plain":
                useCutVerb = false;
                // do nothing
                break;

            case "abilitative":
            case "abil":
                cutFirst = i - 1 != -1 && tensesArray[i - 1] == "present" || verb.slice(0, verb.length - 1).endsWith("ng");
                cutLast = i + 1 > tensesArray.length == false && (
                    tensesArray[i + 1] == "desiderative" ||
                    tensesArray[i + 1] == "habitual" ||
                    tensesArray[i + 1] == "past" ||
                    tensesArray[i + 1] == "future")

                if (cutFirst && cutLast) {
                    suffix += "k"
                } else
                if (cutFirst && !cutLast) {
                    suffix += "ka"
                } else
                if (!cutFirst && cutLast) {
                    suffix += "ik"
                } else {
                    suffix += "ika"
                }

                // yuck. but it's probably better than the grossness we had before
                break;

            case "desiderative":
            case "des":
                cutFirst = i - 1 != -1 && tensesArray[i - 1] == "present"
                cutLast = i + 1 > tensesArray.length == false && (
                    tensesArray[i + 1] == "habitual" ||
                    tensesArray[i + 1] == "past" ||
                    tensesArray[i + 1] == "future"
                )

                if (cutFirst && cutLast) {
                    suffix += "m"
                } else
                if (cutFirst && !cutLast) {
                    suffix += "ma"
                } else
                if (!cutFirst && cutLast) {
                    suffix += "im"
                } else {
                    suffix += "ima"
                }
                break;

            case "imperative":
            case "imp":
                if (verb.endsWith("ya")) {
                    suffix += "eiyo"
                } else
                {
                    suffix += "iyo"
                }
                break;

            // i am so unbelievably tired
            // and swore to perihelion i would go to bed on time
            // good luck and good night

            case "hypothetical":
            case "hyp":
                if (i - 1 != -1 && tensesArray[i - 1] == "desiderative") {
                    suffix += " gaen"
                } else {
                    suffix += "gaen"
                }
                if (i - 1 != -1 && rootLength == 3) {
                    useCutVerb = false
                }
                break;

            case "negation":
            case "neg":
                if (i - 1 != -1 && tensesArray[i - 1] == "desiderative" || i - 1 != -1 && tensesArray[i - 1] == "hypothetical") {
                    suffix += " yong"
                } else {
                    suffix += "yong"
                }
                if (i - 1 != -1 && rootLength == 3) {
                    useCutVerb = false
                }
                break;

            case "habitual":
            case "habit":
            case "hab":
                if (i - 1 != -1 && tensesArray[i - 1] == "present" || i - 1 != -1 && tensesArray[i - 1] == "negation") {
                    suffix += "gil"
                } else {
                    suffix += "il"
                }
                break;

            case "polite":
                useCutVerb = false;
                suffix += " yaso"
                break;

            case "past":
                cutFirst = i - 1 != -1 && (
                    tensesArray[i - 1] == "present" ||
                    tensesArray[i - 1] == "negation" ||
                    tensesArray[i - 1] == "hypothetical" ||
                    tensesArray[i - 1] == "habitual" ||
                    tensesArray[i - 1] == "future"
                )
                if (cutFirst) {
                    suffix += "da"
                } else {
                    suffix += "ida"
                }
                break;

            case "future":
                cutFirst = i - 1 != -1 && (
                    tensesArray[i - 1] == "present" ||
                    tensesArray[i - 1] == "negation" ||
                    tensesArray[i - 1] == "hypothetical" ||
                    tensesArray[i - 1] == "habitual" ||
                    tensesArray[i - 1] == "past"
                )
                let addApostrophe = i - 1 != -1 && tensesArray[i - 1] == "hypothetical"
                if (cutFirst && addApostrophe) {
                    suffix += "'go"
                } else
                if (cutFirst && !addApostrophe) {
                    suffix += "go"
                } else {
                    suffix += "igo"
                }
                break;


        }

    }


    console.groupEnd();
    if (useCutVerb) {return cutVerb + suffix} else {return verb + suffix}

}