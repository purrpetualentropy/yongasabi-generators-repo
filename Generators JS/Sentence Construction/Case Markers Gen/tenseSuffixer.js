function tenseSuffixer(verb, verbLength, tensesArray) {
    let cutVerb = verb.slice(0, verb.length - 1);
    let dakaVerb = verb.slice( verb.length - 4) == "daka";
    let suffixedVerb = "TEMP";
    let currSuffix = "TEMP";
    let prevSuffix = "TEMP";
    let rnd = Math.floor(Math.random() * 2) + 1;

    console.groupCollapsed("tenseSuffixer log begin");
    console.log(`LOG: Found word ${verb} and length ${verbLength}! cutVerb is ${cutVerb}! dakaVerb is ${dakaVerb}!`);

    if (dakaVerb) {
        console.log(`LOG: dakaVerb detected!`);
        for (let i = 0; i < tensesArray.length; i++) {
            currSuffix = tensesArray[i];
            switch (currSuffix) {
                case "present":
                    console.log(`LOG: case present detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (tensesArray.length == 1) {
                        console.log(`LOG: tensesArray has length of 1, writing das`);
                        suffixedVerb = "das";
                        prevSuffix = "present";
                        console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`);
                    } else
                    {console.log(`LOG: tensesArray has non-1 length, writing dasa`);
                    suffixedVerb = "dasa";
                    prevSuffix = "present";
                    console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`)}
                    break;

                case "plain":
                    console.log(`LOG: case plain detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = "daka";
                    prevSuffix = "plain";
                    console.log(`LOG: verb ${verb} suffixed with plain into ${suffixedVerb}`);
                    break;

                case "abil":
                    console.log(`LOG: case abil detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ka`); suffixedVerb += "ka"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix totally`); suffixedVerb = "dika"}
                    prevSuffix = "abil";
                    console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`);
                    break;

                case "des":
                    console.log(`LOG: case des detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "abil") {console.log(`LOG: abil detected in prevSuffix, post-fixing!`);
                        suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1);
                        console.log(`LOG: sliced into ${suffixedVerb}!`);
                        suffixedVerb += "ima";
                    } else
                    if (prevSuffix == "present") {console.log(`LOG: present detected in prevSuffix, suffixing as -ma`);
                    suffixedVerb += "ma"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix totally`); suffixedVerb = "dima"}
                    prevSuffix = "des";
                    console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`)
                    break;

                case "hyp":
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix totally`); suffixedVerb = "daka gaen"} else
                    suffixedVerb += " gaen";
                    prevSuffix = "hyp";
                    console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`);
                    break;

                case "neg":
                    if (prevSuffix == "des" || prevSuffix == "hyp" || prevSuffix == "plain") {console.log(`LOG: des, hyp or plain were detected. adding neg as own word`); suffixedVerb += " yong"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix totally`); suffixedVerb = "dayong"} else
                    {suffixedVerb += "yong"}
                    prevSuffix = "neg";
                    console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`);
                    break;

                case "imperative":
                    console.log(`LOG: case imperative detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "neg") {suffixedVerb += "iyo"} else
                    {suffixedVerb = "diyo"}
                    console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`);
                    prevSuffix = "imperative";
                    break;

                case "polite":
                    console.log(`LOG: case polite detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "TEMP") {suffixedVerb = "daka yaso"} else
                    {suffixedVerb += " yaso"}
                    console.log(`LOG: verb ${verb} suffixed with polite into ${suffixedVerb}`);
                    prevSuffix = "polite";
                    break;

                case "habit":
                    console.log(`LOG: case habit detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg") {console.log(`present or neg detected in prevSuffix`); suffixedVerb += "gil"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: des or abil detected in prevSuffix, post-fixing`);
                        suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1);
                        console.log(`LOG: sliced into ${suffixedVerb}!`);
                        suffixedVerb += "il"} else
                    if (prevSuffix == "hyp") {console.log(`LOG: hyp was detected, suffixing as -il`); suffixedVerb += "il"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix wholly`); suffixedVerb = "dil"} else
                    {suffixedVerb += "gil"}
                    prevSuffix = "habit";
                    console.log(`LOG: verb ${verb} suffixed with habit into ${suffixedVerb}`);
                    break;

                case "past":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || "abil") {console.log(`LOG: des or abil detected in prevSuffix, post-fixing`);
                        suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1);
                        console.log(`LOG: sliced into ${suffixedVerb}!`);
                        suffixedVerb += "ida"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix wholly`); suffixedVerb = "dida"} else
                    {suffixedVerb += "da"}
                    prevSuffix = "past";
                    console.log(`LOG: verb ${verb} suffixed with past into ${suffixedVerb}`);
                    break;

                case "future":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || "abil") {console.log(`LOG: des or abil detected in prevSuffix, post-fixing`);
                        suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1);
                        console.log(`LOG: sliced into ${suffixedVerb}!`);
                        suffixedVerb += "igo"} else
                    if (prevSuffix == "hyp") {console.log(`LOG: hyp detected, separating`); suffixedVerb += "'go"}
                    if (prevSuffix == "TEMP") {console.log(`LOG: prevSuffix is null, suffix wholly`); suffixedVerb = "digo"} else
                    {suffixedVerb += "go"}
                    prevSuffix = "future";
                    console.log(`LOG: verb ${verb} suffixed with past into ${suffixedVerb}`);
                    break;
            }
        }

    if (verb == "daka") {
        console.log(`LOG: verb itself is daka, return normalstyle`);
        console.groupEnd();
        return suffixedVerb;
    } else
    {console.log(`LOG: verb itself is not daka, suffix`);
    suffixedVerb = verb.slice(0, verb.length - 4) + suffixedVerb
    console.log(`LOG: suffixedVerb now ${suffixedVerb}, return`);
    console.groupEnd();
    return suffixedVerb;}
    // once we've finished writing the suffixes, we need to check if the verb itself == daka without cutting
    // if it does, just return suffixedVerb
    // otherwise return verb.slice(0, verb.length - 4) + suffixedVerb
    // to account for angchidaka and stuff
    // obviously if we just returned suffixedVerb angchidaka would become just daka
    } else

    if (verb == "angsa") {console.log(`LOG: angsa was detected. FML`);
        for (let i = 0; i < tensesArray.length; i++) {
            currSuffix = tensesArray[i];
            switch (currSuffix) {
                case "present":
                    console.log(`LOG: case present detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = "sa";
                    console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`);
                    prevSuffix = "present";
                    break;

                case "plain":
                    console.log(`LOG: case plain detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = "angsa";
                    console.log(`LOG: verb ${verb} suffixed with plain into ${suffixedVerb}`);
                    prevSuffix = "plain";
                    break;

                case "abil":
                    console.log(`LOG: case abil detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" && rnd == 1) {console.log(`LOG: abil detected prevSuffix present and rnd 1, destroying present`); suffixedVerb = "angsika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); rnd = Math.floor(Math.random() * 2) + 1; prevSuffix = "abil"} else
                    if (prevSuffix == "present" && rnd == 2) {console.log(`LOG: abil detected prevSuffix present and rnd 1, destroying abil`); rnd = Math.floor(Math.random() * 2) + 1} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: abil detected no previous suffixes, suffixing normalstyle`); suffixedVerb = "angsika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"}
                    break;

                case "des":
                    console.log(`LOG: case des detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "abil") {console.log(`LOG: des detected prevSuffix abil, post-fixing!`); suffixedVerb = "angsikima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    if (prevSuffix == "present" && rnd == 1) {console.log(`LOG: des detected prevSuffix present and rnd 1, destroying present`); suffixedVerb = "angsima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"; rnd = Math.floor(Math.random() * 2) + 1} else
                    if (prevSuffix == "present" && rnd == 2) {console.log (`LOG: des detected prevSuffix present and rnd 2, destroying des`); rnd = Math.floor(Math.random() * 2) + 1} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: des detected no previous suffixed, suffixing normalstyle`); suffixedVerb = "angsima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"}
                    break;

                case "hyp":
                    console.log(`LOG: case hyp detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log (`LOG: prevSuffix is des, own-wording`); suffixedVerb += " gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: temp detected, adding verb`); suffixedVerb = "angsa gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    {suffixedVerb += "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"}
                    break;

                case "neg":
                    console.log(`LOG: case neg detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || prevSuffix == "hyp" || prevSuffix == "plain") {console.log(`LOG: des, hyp or plain were detected. adding neg as own word`); suffixedVerb += " yong"; prevSuffix = "neg"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`)} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: temp detected, adding verb`); suffixedVerb = "angsa yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    {suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"}
                    break;

                case "imperative":
                    console.log(`LOG: case imperative detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "neg") {suffixedVerb += "iyo"} else
                    {suffixedVerb = "angsiyo"}
                    console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`);
                    prevSuffix = "imperative";
                    break;

                case "polite":
                    console.log(`LOG: case polite detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "TEMP") {suffixedVerb = "angsa yaso"} else
                    {suffixedVerb += " yaso"}
                    console.log(`LOG: verb ${verb} suffixed with polite into ${suffixedVerb}`);
                    prevSuffix = "polite";
                    break;

                case "habit":
                    console.log(`LOG: case habit detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: present was detected in prevSuffix`); suffixedVerb = "angsasagil"} else
                    if (prevSuffix == "neg" && tensesArray.includes("present")) {suffixedVerb = "angsasayonggil"} else
                    if (prevSuffix == "neg" && !tensesArray.includes("present")) {suffixedVerb += "gil"} else // is this legal ???
                    if (prevSuffix == "des") {console.log(`LOG: des was detected in prevSuffix, postfixing!`); suffixedVerb = "angsimil"} else
                    if (prevSuffix == "abil") {console.log(`LOG: abil was detected in prevSuffix, postfixing!`); suffixedVerb = "angsikil"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: nothing special detected, suffixing`); suffixedVerb = "angsil"}
                    // i have no idea if any of this is legal
                    console.log(`LOG: verb ${verb} was suffixed with habit into ${suffixedVerb}`);
                    prevSuffix = "habit";
                    break;

                case "past":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: des was detected in prevSuffix`); suffixedVerb = "angsimida"} else
                    if (prevSuffix == "abil") {console.log(`LOG: abil was detected in prevSuffix`); suffixedVerb = "angsikida"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: nothing special detected, suffixing`); suffixedVerb = "sada"} else
                    {suffixedVerb += "da"}
                    console.log(`LOG: verb ${verb} was suffixed with past into ${suffixedVerb}`);
                    prevSuffix = "past";
                    break;

                case "future":
                    console.log(`LOG: case future detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: des was detected in prevSuffix`); suffixedVerb = "angsimigo"} else
                    if (prevSuffix == "abil") {console.log(`LOG: abil was detected in prevSuffix`); suffixedVerb = "angsikigo"} else
                    if (prevSuffix == "hyp") {console.log(`LOG: hyp was detected in prevSuffix, separating`); suffixedVerb += "'go"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: nothing special detected, suffixing`); suffixedVerb = "sago"} else
                    {suffixedVerb += "go"}
                    console.log(`LOG: verb ${verb} was suffixed with future into ${suffixedVerb}`);
                    prevSuffix = "future";
                    break;
            }

        }
        console.log(`LOG: verb ${verb} finished suffixing with tenses ${tensesArray} into ${suffixedVerb}!`);
        console.groupEnd();
        return suffixedVerb;
    } else

    if (verb == "haga") {console.log(`LOG: haga was detected. FML`);
        for (let i = 0; i < tensesArray.length; i++) {
            currSuffix = tensesArray[i];
            switch (currSuffix) {
                case "present":
                    console.log(`LOG: case present detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = "go";
                    console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`);
                    prevSuffix = "present";
                    break;

                case "plain":
                    console.log(`LOG: case plain detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = "haga";
                    console.log(`LOG: verb ${verb} suffixed with plain into ${suffixedVerb}`);
                    prevSuffix = "plain";
                    break;

                case "abil":
                    console.log(`LOG: case abil detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" && rnd == 1) {console.log(`LOG: abil detected prevSuffix present and rnd 1, destroying present`); suffixedVerb = "hagika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); rnd = Math.floor(Math.random() * 2) + 1; prevSuffix = "abil"} else
                    if (prevSuffix == "present" && rnd == 2) {console.log(`LOG: abil detected prevSuffix present and rnd 1, destroying abil`); rnd = Math.floor(Math.random() * 2) + 1} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: abil detected no previous suffixes, suffixing normalstyle`); suffixedVerb = "hagika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"}
                    break;

                case "des":
                    console.log(`LOG: case des detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "abil") {console.log(`LOG: des detected prevSuffix abil, post-fixing!`); suffixedVerb = "hagikima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    if (prevSuffix == "present") {console.log(`LOG: des detected prevSuffix present`); suffixedVerb = "hagsama"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"; rnd = Math.floor(Math.random() * 2) + 1} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: des detected no previous suffixed, suffixing normalstyle`); suffixedVerb = "hagima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"}
                    break;

                case "hyp":
                    console.log(`LOG: case hyp detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log (`LOG: prevSuffix is des, own-wording`); suffixedVerb += " gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: temp detected, adding verb`); suffixedVerb = "haga gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    {suffixedVerb += "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"}
                    break;

                case "neg":
                    console.log(`LOG: case neg detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || prevSuffix == "hyp" || prevSuffix == "plain") {console.log(`LOG: des, hyp or plain were detected. adding neg as own word`); suffixedVerb += " yong"; prevSuffix = "neg"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`)} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: temp detected, adding verb`); suffixedVerb = "haga yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    {suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"}
                    break;

                case "imperative":
                    console.log(`LOG: case imperative detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "neg") {suffixedVerb += "iyo"} else
                    {suffixedVerb = "hagiyo"}
                    console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`);
                    prevSuffix = "imperative";
                    break;

                case "polite":
                    console.log(`LOG: case polite detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "TEMP") {suffixedVerb = "haga yaso"} else
                    {suffixedVerb += " yaso"}
                    console.log(`LOG: verb ${verb} suffixed with polite into ${suffixedVerb}`);
                    prevSuffix = "polite";
                    break;

                case "habit":
                    console.log(`LOG: case habit detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: present was detected in prevSuffix`); suffixedVerb = "hagsagil"} else
                    if (prevSuffix == "neg" && tensesArray.includes("present")) {suffixedVerb = "hagsayonggil"} else
                    if (prevSuffix == "neg" && !tensesArray.includes("present")) {suffixedVerb += "gil"} else // is this legal ???
                    if (prevSuffix == "des") {console.log(`LOG: des was detected in prevSuffix, postfixing!`); suffixedVerb = "hagimil"} else
                    if (prevSuffix == "hyp") {suffixedVerb += "il"} else
                    if (prevSuffix == "abil") {console.log(`LOG: abil was detected in prevSuffix, postfixing!`); suffixedVerb = "hagikil"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: nothing special detected, suffixing`); suffixedVerb = "hagil"}
                    // i have no idea if any of this is legal
                    console.log(`LOG: verb ${verb} was suffixed with habit into ${suffixedVerb}`);
                    prevSuffix = "habit";
                    break;

                case "past":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: des was detected in prevSuffix`); suffixedVerb = "hagimida"} else
                    if (prevSuffix == "abil") {console.log(`LOG: abil was detected in prevSuffix`); suffixedVerb = "hagikida"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: nothing special detected, suffixing`); suffixedVerb = "goda"} else
                    {suffixedVerb += "da"}
                    console.log(`LOG: verb ${verb} was suffixed with past into ${suffixedVerb}`);
                    prevSuffix = "past";
                    break;

                case "future":
                    console.log(`LOG: case future detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: des was detected in prevSuffix`); suffixedVerb = "hagimigo"} else
                    if (prevSuffix == "abil") {console.log(`LOG: abil was detected in prevSuffix`); suffixedVerb = "hagikigo"} else
                    if (prevSuffix == "hyp") {console.log(`LOG: hyp was detected in prevSuffix, separating`); suffixedVerb += "'go"} else
                    if (prevSuffix == "TEMP") {console.log(`LOG: nothing special detected, suffixing`); suffixedVerb = "gogo"} else
                    {suffixedVerb += "go"}
                    console.log(`LOG: verb ${verb} was suffixed with future into ${suffixedVerb}`);
                    prevSuffix = "future";
                    break;
            }

        }
        console.log(`LOG: verb ${verb} finished suffixing with tenses ${tensesArray} into ${suffixedVerb}!`);
        console.groupEnd();
        return suffixedVerb;
    } else

    if (verbLength == 3) {console.log(`LOG: verbLength 3 detected!`);
        for (let i = 0; i < tensesArray.length; i++) {
            currSuffix = tensesArray[i];
            switch (currSuffix) {
                case "present":
                    console.log(`LOG: case present detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = verb + "sa";
                    console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`);
                    prevSuffix = "present";
                    break;

                case "plain":
                    console.log(`LOG: case plain detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = verb;
                    console.log(`LOG: verb ${verb} suffixed with plain into ${suffixedVerb}`);
                    prevSuffix = "plain";
                    break;

                case "abil":
                    console.log(`LOG: case abil detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ka!`); suffixedVerb += "ka"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (cutVerb.slice(cutVerb.length - 2) == "ng" && prevSuffix != "present") {console.log(`LOG: case abil detected ng ending, suffixing as -ka!`); suffixedVerb = cutVerb + "ka"; console.log(`LOG: verb ${verb} cutVerb ${cutVerb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (cutVerb.slice(cutVerb.length - 2) != "ng" && prevSuffix != "present") {console.log(`LOG: case abil detected no special cases, suffixing as -ika!`); suffixedVerb = cutVerb + "ika"; console.log(`LOG: verb ${verb} cutVerb ${cutVerb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "ika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    {console.log(`ERROR: detected case abil somehow failed to suffix? verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "des":
                    console.log(`LOG: case des detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ma!`); suffixedVerb += "ma"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    if (prevSuffix == "abil") {console.log(`LOG: prevSuffix is abil, post-fixing!`); suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -ima!`); suffixedVerb += "ima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    {console.log(`LOG: des detected no special cases, suffixing as -ima!`); suffixedVerb = cutVerb + "ima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}!`); prevSuffix = "des"}
                    break;

                case "imperative":
                    console.log(`LOG: case imperative detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (verb.slice(verb.length - 2) != "ya" && prevSuffix == "TEMP") {suffixedVerb = cutVerb + "iyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    if (verb.slice(verb.length - 2) == "ya" && prevSuffix == "TEMP") {suffixedVerb = cutVerb + "eiyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    if (verb.slice(verb.length - 2) == "ya") {suffixedVerb = cutVerb + "eiyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    {suffixedVerb += "iyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"}
                    break;

                case "hyp":
                    console.log(`LOG: case hyp detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: prevSuffix is des, separating!`); suffixedVerb += " gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = verb + "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    {suffixedVerb += "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"}
                    break;

                case "neg":
                    console.log(`LOG: case neg detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || prevSuffix == "hyp") {console.log(`LOG: prevSuffix is des or hyp, separating!`); suffixedVerb += " yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, post-fixing!`); suffixedVerb = verb; console.log(`LOG: post-fixed suffixedVerb into ${suffixedVerb}! suffixing!`); suffixedVerb += "sayong"; console.log(`LOG: verb ${verb} suffixed with neg present into ${suffixedVerb}!`); prevSuffix = "neg";} else
                    if (prevSuffix == "plain") {console.log(`LOG: prevSuffix is plain!`); suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg plain into ${suffixedVerb}!`); prevSuffix = "neg"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = verb + " yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    {suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"}
                    break;

                case "habit":
                    console.log(`LOG: case habit detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg") {console.log(`LOG: prevSuffix is present or neg, suffixing as -gil!`); suffixedVerb += "gil"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`); suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -il!`); suffixedVerb += "il"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "des" && tensesArray.includes("present")) {console.log(`LOG: detected present des?? suffixing as -gil!`); suffixedVerb += "gil"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "il"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    {console.log(`ERROR: detected case habit somehow failed to suffix? verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "polite":
                    console.log(`LOG: case polite detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix != "TEMP") {suffixedVerb += " yaso"} else
                    {suffixedVerb = verb + " yaso"}
                    prevSuffix = "polite";
                    console.log(`LOG: verb ${verb} suffixed with polite into ${suffixedVerb}`);
                    break;

                case "past":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg" || prevSuffix == "hyp" || prevSuffix == "habit" || prevSuffix == "future") {console.log(`LOG: prevSuffix ${prevSuffix} is present, neg, hyp, habit, or future, suffixing as -da!`); suffixedVerb += "da"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`);  suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -ida!`); suffixedVerb += "ida"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "ida"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    {console.log(`ERROR: detected case past somehow failed to suffix? verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "future":
                    console.log(`LOG: case future detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg" || prevSuffix == "hyp" || prevSuffix == "habit" || prevSuffix == "past") {console.log(`LOG: prevSuffix ${prevSuffix} is present, neg, hyp, habit, or past, suffixing as -go!`); suffixedVerb += "go"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`);  suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -igo!`); suffixedVerb += "igo"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "igo"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    {console.log(`ERROR: detected case future somehow failed to suffix? verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                default:
                    console.log(`ERROR: case ${currSuffix} could not be detected? Did you forget to break;? i = ${i}, verb is ${verb}, verbLength is ${verbLength}, formattedArray is ${tensesArray} suffixedVerb is ${suffixedVerb}, prevSuffix is ${prevSuffix}`);
                    break;
            }}
        console.log(`LOG: verb ${verb} finished suffixing with length ${verbLength} tenses ${tensesArray} into ${suffixedVerb}!`);
        console.groupEnd();
        return suffixedVerb;
    } else
    if (verbLength == 2) {console.log(`LOG: verbLength 2 detected!`);
        for (let i = 0; i < tensesArray.length; i++) {
            currSuffix = tensesArray[i];
            switch (currSuffix) {
                case "present":
                    console.log(`LOG: case present detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = cutVerb + "sa";
                    console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`);
                    prevSuffix = "present";
                    break;

                case "plain":
                    console.log(`LOG: case plain detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = verb;
                    console.log(`LOG: verb ${verb} suffixed with plain into ${suffixedVerb}`);
                    prevSuffix = "plain";
                    break;

                case "abil":
                    console.log(`LOG: case abil detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ka!`); suffixedVerb += "ka"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (cutVerb.slice(cutVerb.length - 2) == "ng" && prevSuffix != "present") {console.log(`LOG: case abil detected ng ending, suffixing as -ka!`); suffixedVerb = cutVerb + "ka"; console.log(`LOG: verb ${verb} cutVerb ${cutVerb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (cutVerb.slice(cutVerb.length - 2) != "ng" && prevSuffix != "present") {console.log(`LOG: case abil detected no special cases, suffixing as -ika!`); suffixedVerb = cutVerb + "ika"; console.log(`LOG: verb ${verb} cutVerb ${cutVerb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "ika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    {console.log(`ERROR: detected case abil somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "des":
                    console.log(`LOG: case des detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ma!`); suffixedVerb += "ma"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    if (prevSuffix == "abil") {console.log(`LOG: prevSuffix is abil, post-fixing!`); suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -ima!`); suffixedVerb += "ima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    {console.log(`LOG: des detected no special cases, suffixing as -ima!`); suffixedVerb = cutVerb + "ima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}!`); prevSuffix = "des"}
                    break;

                case "imperative":
                    console.log(`LOG: case imperative detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (verb.slice(verb.length - 2) != "ya" && prevSuffix == "TEMP") {suffixedVerb = cutVerb + "iyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    if (verb.slice(verb.length - 2) == "ya" && prevSuffix == "TEMP") {suffixedVerb = cutVerb + "eiyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    if (verb.slice(verb.length - 2) == "ya") {suffixedVerb = cutVerb + "eiyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    {suffixedVerb += "iyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"}
                    break;

                case "hyp":
                    console.log(`LOG: case hyp detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: prevSuffix is des, separating!`); suffixedVerb += " gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = verb + "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    {suffixedVerb += "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"}
                    break;

                case "neg":
                    console.log(`LOG: case neg detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || prevSuffix == "hyp") {console.log(`LOG: prevSuffix is des or hyp, separating!`); suffixedVerb += " yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present!`); suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg present into ${suffixedVerb}!`); prevSuffix = "neg";} else
                    if (prevSuffix == "plain") {console.log(`LOG: prevSuffix is plain, post-fixing!`); suffixedVerb = cutVerb + "yong"; console.log(`LOG: verb ${verb} suffixed with neg plain into ${suffixedVerb}!`); prevSuffix = "neg"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = verb + " yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    {suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"}
                    break;

                case "habit":
                    console.log(`LOG: case habit detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg") {console.log(`LOG: prevSuffix is present or neg, suffixing as -gil!`); suffixedVerb += "gil"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`); suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -il!`); suffixedVerb += "il"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "des" && tensesArray.includes("present")) {console.log(`LOG: detected present des?? suffixing as -gil!`); suffixedVerb += "gil"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "il"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    {console.log(`ERROR: detected case habit somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "polite":
                    console.log(`LOG: case polite detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix != "TEMP") {suffixedVerb += " yaso"} else
                    {suffixedVerb = verb + " yaso"}
                    console.log(`LOG: verb ${verb} suffixed with polite into ${suffixedVerb}`);
                    break;

                case "past":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg" || prevSuffix == "hyp" || prevSuffix == "habit" || prevSuffix == "future") {console.log(`LOG: prevSuffix ${prevSuffix} is present, neg, hyp, habit, or future, suffixing as -da!`); suffixedVerb += "da"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`);  suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -ida!`); suffixedVerb += "ida"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "ida"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    {console.log(`ERROR: detected case past somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "future":
                    console.log(`LOG: case future detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg" || prevSuffix == "habit" || prevSuffix == "past") {console.log(`LOG: prevSuffix ${prevSuffix} is present, neg, habit, or past, suffixing as -go!`); suffixedVerb += "go"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`);  suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -igo!`); suffixedVerb += "igo"; console.log(`LOG: verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "hyp") {console.log(`LOG: prevSuffix is hyp, suffixing as 'go!`); suffixedVerb += "'go"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "igo"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    {console.log(`ERROR: detected case future somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                default:
                    console.log(`ERROR: case ${currSuffix} could not be detected? Did you forget to break;? i = ${i}, verb is ${verb}, verbLength is ${verbLength}, formattedArray is ${tensesArray} suffixedVerb is ${suffixedVerb}, prevSuffix is ${prevSuffix}`);
                    break;
            }}
        console.log(`LOG: verb ${verb} finished suffixing with length ${verbLength} tenses ${tensesArray} into ${suffixedVerb}!`);
        console.groupEnd();
        return suffixedVerb;
    } else
    if (verbLength == 1) {console.log(`LOG: verbLength 1 detected!`);
        for (let i = 0; i < tensesArray.length; i++) {
            currSuffix = tensesArray[i];
            switch (currSuffix) {
                case "present":
                    console.log(`LOG: case present detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = cutVerb + "sa";
                    console.log(`LOG: verb ${verb} suffixed with present into ${suffixedVerb}`);
                    prevSuffix = "present";
                    break;

                case "plain":
                    console.log(`LOG: case plain detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    suffixedVerb = verb;
                    console.log(`LOG: verb ${verb} suffixed with plain into ${suffixedVerb}`);
                    prevSuffix = "plain";
                    break;

                case "abil":
                    console.log(`LOG: case abil detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ka!`); suffixedVerb += "ka"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (cutVerb.slice(cutVerb.length - 2) == "ng" && prevSuffix != "present") {console.log(`LOG: case abil detected ng ending, suffixing as -ka!`); suffixedVerb = cutVerb + "ka"; console.log(`LOG: verb ${verb} cutVerb ${cutVerb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (cutVerb.slice(cutVerb.length - 2) != "ng" && prevSuffix != "present") {console.log(`LOG: case abil detected no special cases, suffixing as -ika!`); suffixedVerb = cutVerb + "ika"; console.log(`LOG: verb ${verb} cutVerb ${cutVerb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "ika"; console.log(`LOG: verb ${verb} suffixed with abil into ${suffixedVerb}`); prevSuffix = "abil"} else
                    {console.log(`ERROR: detected case abil somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "des":
                    console.log(`LOG: case des detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present, suffixing as -ma!`); suffixedVerb += "ma"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    if (prevSuffix == "abil") {console.log(`LOG: prevSuffix is abil, post-fixing!`); suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -ima!`); suffixedVerb += "ima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}`); prevSuffix = "des"} else
                    {console.log(`LOG: des detected no special cases, suffixing as -ima!`); suffixedVerb = cutVerb + "ima"; console.log(`LOG: verb ${verb} suffixed with des into ${suffixedVerb}!`); prevSuffix = "des"}
                    break;

                case "imperative":
                    console.log(`LOG: case imperative detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (verb.slice(verb.length - 2) != "ya" && prevSuffix == "TEMP") {suffixedVerb = cutVerb + "iyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    if (verb.slice(verb.length - 2) == "ya" && prevSuffix == "TEMP") {suffixedVerb = cutVerb + "eiyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    if (verb.slice(verb.length - 2) == "ya") {suffixedVerb = cutVerb + "eiyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"} else
                    {suffixedVerb += "iyo"; console.log(`LOG: verb ${verb} suffixed with imperative into ${suffixedVerb}`); prevSuffix = "imperative"}
                    break;

                case "hyp":
                    console.log(`LOG: case hyp detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des") {console.log(`LOG: prevSuffix is des, separating!`); suffixedVerb += " gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = verb + "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"} else
                    {suffixedVerb += "gaen"; console.log(`LOG: verb ${verb} suffixed with hyp into ${suffixedVerb}`); prevSuffix = "hyp"}
                    break;

                case "neg":
                    console.log(`LOG: case neg detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "des" || prevSuffix == "hyp") {console.log(`LOG: prevSuffix is des or hyp, separating!`); suffixedVerb += " yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    if (prevSuffix == "present") {console.log(`LOG: prevSuffix is present!`); suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg present into ${suffixedVerb}!`); prevSuffix = "neg"} else
                    if (prevSuffix == "plain") {console.log(`LOG: prevSuffix is plain, post-fixing!`); suffixedVerb = cutVerb + "yong"; console.log(`LOG: verb ${verb} suffixed with neg plain into ${suffixedVerb}!`); prevSuffix = "neg"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = verb + " yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"} else
                    {suffixedVerb += "yong"; console.log(`LOG: verb ${verb} suffixed with neg into ${suffixedVerb}`); prevSuffix = "neg"}
                    break;

                case "polite":
                    console.log(`LOG: case polite detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix != "TEMP") {suffixedVerb += " yaso"} else
                    {suffixedVerb = verb + " yaso"}
                    console.log(`LOG: verb ${verb} suffixed with polite into ${suffixedVerb}`);
                    break;

                case "habit":
                    console.log(`LOG: case habit detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg") {console.log(`LOG: prevSuffix is present or neg, suffixing as -gil!`); suffixedVerb += "gil"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`); suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -il!`); suffixedVerb += "il"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "des" && tensesArray.includes("present")) {console.log(`LOG: detected present des?? suffixing as -gil!`); suffixedVerb += "gil"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "il"; console.log(`verb ${verb} suffixed with habit into ${suffixedVerb}`); prevSuffix = "habit"} else
                    {console.log(`ERROR: detected case habit somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "past":
                    console.log(`LOG: case past detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg" || prevSuffix == "hyp" || prevSuffix == "habit" || prevSuffix == "future") {console.log(`LOG: prevSuffix ${prevSuffix} is present, neg, hyp, habit, or future, suffixing as -da!`); suffixedVerb += "da"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`);  suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -ida!`); suffixedVerb += "ida"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "ida"; console.log(`verb ${verb} suffixed with past into ${suffixedVerb}`); prevSuffix = "past"} else
                    {console.log(`ERROR: detected case past somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                case "future":
                    console.log(`LOG: case future detected in currSuffix, should be index ${i} of formattedArray ${tensesArray}`);
                    if (prevSuffix == "present" || prevSuffix == "neg" || prevSuffix == "hyp" || prevSuffix == "habit" || prevSuffix == "past") {console.log(`LOG: prevSuffix ${prevSuffix} is present, neg, hyp, habit, or past, suffixing as -go!`); suffixedVerb += "go"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "des" || prevSuffix == "abil") {console.log(`LOG: prevSuffix is des or abil, post-fixing!`);  suffixedVerb = suffixedVerb.slice(0, suffixedVerb.length - 1); console.log(`LOG: post-fixed suffixedVerb now ${suffixedVerb}, suffixing as -igo!`); suffixedVerb += "igo"; console.log(`LOG: verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    if (prevSuffix == "TEMP") {suffixedVerb = cutVerb + "igo"; console.log(`verb ${verb} suffixed with future into ${suffixedVerb}`); prevSuffix = "future"} else
                    {console.log(`ERROR: detected case future somehow failed to suffix?  verb ${verb} verbLength ${verbLength} cutVerb ${cutVerb} suffixedVerb ${suffixedVerb} currSuffix ${currSuffix} prevSuffix ${prevSuffix}`)}
                    break;

                default:
                    console.log(`ERROR: case ${currSuffix} could not be detected? Did you forget to break;? i = ${i}, verb is ${verb}, verbLength is ${verbLength}, formattedArray is ${tensesArray} suffixedVerb is ${suffixedVerb}, prevSuffix is ${prevSuffix}`);
                    break;
            }}
        console.log(`LOG: verb ${verb} finished suffixing with length ${verbLength} tenses ${tensesArray} into ${suffixedVerb}!`);
        console.groupEnd();
        return suffixedVerb;
    } else {console.groupEnd(); console.error(`ERROR: verbLength ${verbLength} couldn't be found. breaking`); return "FAILED, SEE CONSOLELOG"}
};
