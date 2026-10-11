function caseSuffixer (word, gramCase, animate, themFlag) {
    let vowelCheckerOutput = vowelChecker(word); // should output true or false
    console.groupCollapsed("caseSuffixer");
    console.log(`LOG: vowelChecker returned ${vowelCheckerOutput} on word ${word}`);
    console.log(`LOG: word ${word} gramCase ${gramCase} animate ${animate} themFlag ${themFlag}`)
    let fixedCase = gramCase.toLowerCase();
    let suffixedWord = word;
    let themRnd = Math.floor(Math.random() * 2) + 1;

// subj, timing, loc, abl, instr, indirobj, dest, dirobj, gen, voc
// 'ag, wa, wa, mok, sang, 'im, 'im, 'o (or pei if vom), la, ho
    switch (fixedCase) {

        case "focus":
            console.log("LOG: Case focus was detected!");
            suffixedWord += "hei";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "subj":
        case "subject":
            console.log("LOG: Case subject was detected!");
            if (vowelCheckerOutput == true) {suffixedWord += "ga"} else {suffixedWord += "'ag"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "timing":
            console.log(`LOG: case timing was detected!`);
            suffixedWord += "wa";
            console.log(`LOG: word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "loc":
        case "locative":
            console.log("LOG: Case loc was detected!");
            if (animate == true) {suffixedWord += " jattowa"} else {suffixedWord += "wa"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "abl":
        case "ablative":
            console.log("LOG: Case abl was detected!");
            suffixedWord += "mok";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "instr":
        case "instrumental":
            console.log("LOG: Case instr was detected!");
            suffixedWord += "sang";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "dest":
        case "destination":
        case "indirobj":
            console.log("LOG: Case indirobj or dest was detected!");
            if (vowelCheckerOutput) {suffixedWord += "m"} else {suffixedWord += "'im"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "dirobj":
            console.log("LOG: Case dirobj was detected!");
            if (themFlag) {
                console.log(`LOG: thematic flag is true. Randomising ...`);
                if (themRnd == 1) {console.log(`LOG: themRnd is 1, using thematic`); suffixedWord += "pei"} else
                {console.log(`LOG: themRnd is ${themRnd}, using accusative`)
                    if (vowelCheckerOutput) {suffixedWord += "do"} else {suffixedWord += "'o"}}
            } else
            if (vowelCheckerOutput) {suffixedWord += "do"} else {suffixedWord += "'o"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "gen":
        case "genitive":
            console.log("LOG: Case gen was detected!");
            suffixedWord += "la";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "voc":
        case "vocative":
            console.log("LOG: Case voc was detected!");
            suffixedWord += " ho,";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            break;

        case "negation":
        case "possessed":
        case "compound":
        case "adjective":
        case "adverb":
        case "nomark":
        case "no mark":
        case "none":
            console.log(`LOG: Case ${fixedCase} was detected, don't mark`);
            suffixedWord = word;
            break;

        default:
            console.log(`LOG: Case ${fixedCase} could not be found!`);
            return "caseSuffixer failed, see consolelog";
    }

    console.groupEnd();
    return suffixedWord;
}
