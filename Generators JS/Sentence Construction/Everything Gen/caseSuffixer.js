export function caseSuffixer (word, gramCase, animate, themFlag, isAngsa) {
    let vowelCheckerOutput = vowelChecker(word); // should output true or false
    console.log(`LOG: vowelChecker returned ${vowelCheckerOutput} on word ${word}`);
    let fixedCase = gramCase.toLowerCase();
    let suffixedWord = word;
    let themRnd = Math.floor(Math.random() * 2) + 1;

// subj, timing, loc, abl, instr, indirobj, dest, dirobj, gen, voc
// 'ag, n/a, wa, mok, sang, 'im, 'im, 'o (or pei if vom), la, ho
    switch (fixedCase) {

        case "focus":
            console.log("LOG: Case focus was detected!");
            suffixedWord += "hei";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "subj":
        case "subject":
            console.log("LOG: Case subject was detected!");
            if (vowelCheckerOutput == true) {suffixedWord += "ga"} else {suffixedWord += "'ag"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "timing":
            console.log(`LOG: case timing was detected!`);
            suffixedWord += "wa";
            console.log(`LOG: word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "loc":
        case "locative":
            console.log("LOG: Case loc was detected!");
            if (animate == true) {suffixedWord += " jattowa"} else if (animate == false) {suffixedWord += "wa"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "abl":
        case "ablative":
            console.log("LOG: Case abl was detected!");
            suffixedWord += "mok";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "instr":
        case "instrumental":
            console.log("LOG: Case instr was detected!");
            suffixedWord += "sang";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "dest":
        case "destination":
        case "indirobj":
            console.log("LOG: Case indirobj or dest was detected!");
            if (vowelCheckerOutput == true) {suffixedWord += "m"} else {suffixedWord += "'im"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "dirobj":
            console.log("LOG: Case dirobj was detected!");
            if (isAngsa) {
                console.log(`LOG: angsa detected, do not suffix`);
                return word;
            }
            if (themFlag) {
                console.log(`LOG: thematic flag is true. Randomising ...`);
                if (themRnd == 1) {console.log(`LOG: themRnd is 1, using thematic`); suffixedWord += "pei"} else
                {console.log(`LOG: themRnd is ${themRnd}, using accusative`)
                    if (vowelCheckerOutput == true) {suffixedWord += "do"} else {suffixedWord += "'o"}}
            } else
            if (vowelCheckerOutput == true) {suffixedWord += "do"} else {suffixedWord += "'o"}
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "gen":
        case "genitive":
            console.log("LOG: Case gen was detected!");
            suffixedWord += "la";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "voc":
        case "vocative":
            console.log("LOG: Case voc was detected!");
            suffixedWord += " ho,";
            console.log(`LOG: Word ${word} was suffixed into ${suffixedWord}!`);
            return suffixedWord;

        case "negation":
        case "possessed":
        case "compound":
        case "adjective":
        case "adverb":
        case "nomark":
        case "no mark":
            console.log(`LOG: Case ${fixedCase} was detected, don't mark`);
            return word;

        default:
            console.log(`LOG: Case ${fixedCase} could not be found!`);
            return "caseSuffixer failed, see consolelog";
    }
}

export function vowelChecker (word) {
    let finalChar = word.slice(-1);
    let hFinalChar = word.slice(-2);
    console.log(`vowelChecker running with word ${word} finalChar ${finalChar} hFinalChar ${hFinalChar}`)
    switch (finalChar) {
        case "h":
            return hFinalChar == "ah" || hFinalChar == "oh" || hFinalChar == "ih" || hFinalChar == "uh" || hFinalChar == "eh";

        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
            return true;

        default:
            return false;
    }
}