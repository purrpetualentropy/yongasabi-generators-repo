
	function dakaTenseSuffixer(tensesArray, verb) {
    console.groupCollapsed("dakaTenseSuffixer");
    let suffix = "";
    let cutVerb = verb.slice(0, verb.length - 4)
    let cutFirst;
    let cutLast;
    let usePlainVerb = false;
    let contractDaka = true;


	console.log(tensesArray);

    for (i = 0; i < tensesArray.length; i++) {

        switch (tensesArray[i]) {
            case "present":
                if (tensesArray.includes("habitual")) {
                    suffix += "sa"
                } else {
                    suffix += "asa"
                }
                break;

            case "plain":
                usePlainVerb = true;
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
                suffix += "iyo"
                break;

            case "hypothetical":
            case "hyp":
                if (i - 1 != -1 && tensesArray[i - 1] == "desiderative") {
                    suffix += " gaen"
                } else {
                    suffix += "gaen"
                }
                if (i - 1 == -1) {
                    usePlainVerb = true
                }
                break;

            case "negation":
            case "neg":
                if (i - 1 != -1 && tensesArray[i - 1] == "desiderative" || i - 1 != -1 && tensesArray[i - 1] == "hypothetical") {
                    suffix += " yong"
                } else {
                    suffix += "yong"
                }
                if (i - 1 == -1) {
                    usePlainVerb = true
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
                usePlainVerb = true
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
	
	console.log(`LOG: usePlainVerb is ${usePlainVerb}, contractDaka is ${contractDaka}`);
	
    console.groupEnd();

    if (usePlainVerb) {return verb + suffix} else
        if (contractDaka) {return cutVerb + "k" + suffix} else
        {return cutVerb + "dak" + suffix}

        // fuckin maybe
}