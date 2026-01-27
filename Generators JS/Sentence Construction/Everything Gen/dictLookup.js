function dictLookup (word, searchType) {
    word = word.trim();
    console.log(`LOG: dictLookup got word ${word} searchType ${searchType}`);
    let i = 0;
    let fullDef = "";
    let shortDef;
    let miniDict = [];

    switch (searchType) {

        case "word":
            console.log(`LOG: switch searchType word`);
            miniDict = wordDict.filter((obj) => obj.word == word || (obj.aliases != undefined && obj.aliases.includes(word)))
            // get all dict objects with this word as their word, or otherwise containing this word in their aliases
            console.log(`LOG: miniDict is:`);
            console.dir(miniDict);
            if (miniDict.length == 0) {
                console.log(`LOG: miniDict length is 0, return error`)
                fullDef = "Couldn't find the word <b>'" + word + "'</b> in the local dictionary. You may find it in the <a target='_blank' href='https://docs.google.com/document/d/1Tll7H4qqslsbk1-U1rFnhHs5Au3Lawn3nLowXDmk6AY/edit?pli=1&tab=t.0'>Yongasabi Dictionary</a> instead."} else
            // if we can't find any words, don't write anything
            if (miniDict.length == 1) {
                console.log(`LOG: miniDict length is 1, check index 0`)
                fullDef = "<b>" + word + "</b>" + "<br>" + "<i>" + miniDict[0].type + "</i> | <i>" + miniDict[0].root + "</i><br>" + miniDict[0].definition.join("<br>");
                if (miniDict[0].aliases != undefined) {fullDef += "<br><i>aliases: " + miniDict[0].aliases.join(", ") + "</i>"}
                console.log(`LOG: fullDef now ${fullDef}`)
                // if we found only one word, just check index 0 to make things easy
            } else
            if (miniDict.length > 1) {
                console.log(`LOG: miniDict length exceeds 1!`);
                fullDef = "<details><summary>Found more than one word.</summary>"
                for (i = 0; i < miniDict.length; i++) {
                    shortDef = "<br><br><b>" + miniDict[i].word + "</b>" + "<br>" + "<i>" + miniDict[i].type + "</i> | <i>" + miniDict[i].root + "</i><br>" + miniDict[i].definition.join("<br>");
                    if (miniDict[i].aliases != undefined) {shortDef += "<br><i>aliases: " + miniDict[i].aliases.join(", ") + "</i>"}
                    console.log(`LOG: shortDef now ${shortDef}, write`);
                    fullDef += shortDef
                }
                fullDef += "</details>";
                console.log(`LOG: fullDef now ${fullDef}`);
                // if we found more than one word (very possible w/ aliases!) put them under a details and return all words
                // (requiring a loop over the whole array)
            }
            break;

        case "root":
            fullDef = "<details><summary><b>" + word + "</b> words</summary>";
            miniDict = wordDict.filter((obj) => obj.root == word);
            // filter() for every word that has this root
            if (miniDict.length == 0) {
                console.log(`LOG: miniDict length is 0, return error`)
                fullDef = "Couldn't find any words with the root <b>'" + word + "'</b> in the local dictionary. You may find it in the <a target='_blank' href='https://docs.google.com/document/d/1Tll7H4qqslsbk1-U1rFnhHs5Au3Lawn3nLowXDmk6AY/edit?pli=1&tab=t.0'>Yongasabi Dictionary</a> instead."} else
                // if we can't find any words, don't write anything
            {for (i = 0; i < miniDict.length; i++) {
                shortDef = "<br><br><b>" + miniDict[i].word + "</b>" + "<br>" + "<i>" + miniDict[i].type + "</i> | <i>" + miniDict[i].root + "</i><br>" + miniDict[i].definition.join("<br>");
                if (miniDict[i].aliases != undefined) {shortDef += "<br><i>aliases: " + miniDict[i].aliases.join(", ") + "</i>"}
                console.log(`LOG: shortDef now ${shortDef}, write`);
                fullDef += shortDef
            }}
            fullDef += "</details>";
            // write it all into a details menu
            console.log(`LOG: fullDef now ${fullDef}`)
            break;

        case "noun":
            fullDef = "<details><summary><b>Nouns</b></summary>";
            miniDict = wordDict.filter((obj) => obj.type == searchType);
            // filter() for every word that has this type
            if (miniDict.length == 0) {
                console.log(`LOG: miniDict length is 0, return error`)
                fullDef = "Couldn't find any words with the type <b>'" + searchType + "'</b> in the local dictionary. You may find it in the <a target='_blank' href='https://docs.google.com/document/d/1Tll7H4qqslsbk1-U1rFnhHs5Au3Lawn3nLowXDmk6AY/edit?pli=1&tab=t.0'>Yongasabi Dictionary</a> instead."} else
                // if we can't find any words, don't write anything
            {for (i = 0; i < miniDict.length; i++) {
                shortDef = "<br><br><b>" + miniDict[i].word + "</b>" + "<br>" + "<i>" + miniDict[i].type + "</i> | <i>" + miniDict[i].root + "</i><br>" + miniDict[i].definition.join("<br>");
                if (miniDict[i].aliases != undefined) {shortDef += "<br><i>aliases: " + miniDict[i].aliases.join(", ") + "</i>"}
                console.log(`LOG: shortDef now ${shortDef}, write`);
                fullDef += shortDef
            }}
            fullDef += "</details>";
            // write it all into a details menu
            console.log(`LOG: fullDef now ${fullDef}`)
            break;

        case "adj":
            fullDef = "<details><summary><b>Adjectives</b></summary>";
            miniDict = wordDict.filter((obj) => obj.type == searchType);
            // filter() for every word that has this type
            if (miniDict.length == 0) {
                console.log(`LOG: miniDict length is 0, return error`)
                fullDef = "Couldn't find any words with the type <b>'" + searchType + "'</b> in the local dictionary. You may find it in the <a target='_blank' href='https://docs.google.com/document/d/1Tll7H4qqslsbk1-U1rFnhHs5Au3Lawn3nLowXDmk6AY/edit?pli=1&tab=t.0'>Yongasabi Dictionary</a> instead."} else
                // if we can't find any words, don't write anything
            {for (i = 0; i < miniDict.length; i++) {
                shortDef = "<br><br><b>" + miniDict[i].word + "</b>" + "<br>" + "<i>" + miniDict[i].type + "</i> | <i>" + miniDict[i].root + "</i><br>" + miniDict[i].definition.join("<br>");
                if (miniDict[i].aliases != undefined) {shortDef += "<br><i>aliases: " + miniDict[i].aliases.join(", ") + "</i>"}
                console.log(`LOG: shortDef now ${shortDef}, write`);
                fullDef += shortDef
            }}
            fullDef += "</details>";
            // write it all into a details menu
            console.log(`LOG: fullDef now ${fullDef}`)
            break;

        case "verb":
            fullDef = "<details><summary><b>Verbs</b></summary>";
            miniDict = wordDict.filter((obj) => obj.type == searchType);
            // filter() for every word that has this type
            if (miniDict.length == 0) {
                console.log(`LOG: miniDict length is 0, return error`)
                fullDef = "Couldn't find any words with the type <b>'" + searchType + "'</b> in the local dictionary. You may find it in the <a target='_blank' href='https://docs.google.com/document/d/1Tll7H4qqslsbk1-U1rFnhHs5Au3Lawn3nLowXDmk6AY/edit?pli=1&tab=t.0'>Yongasabi Dictionary</a> instead."} else
                // if we can't find any words, don't write anything
            {for (i = 0; i < miniDict.length; i++) {
                shortDef = "<br><br><b>" + miniDict[i].word + "</b>" + "<br>" + "<i>" + miniDict[i].type + "</i> | <i>" + miniDict[i].root + "</i><br>" + miniDict[i].definition.join("<br>");
                if (miniDict[i].aliases != undefined) {shortDef += "<br><i>aliases: " + miniDict[i].aliases.join(", ") + "</i>"}
                console.log(`LOG: shortDef now ${shortDef}, write`);
                fullDef += shortDef
            }}
            fullDef += "</details>";
            // write it all into a details menu
            console.log(`LOG: fullDef now ${fullDef}`)
            break;

        case "rootLength":
            word = Number(word);
            fullDef = "<details><summary><b>Words with root length " + word + "</b></summary>";
            miniDict = wordDict.filter((obj) => obj.rootLength == word);
            // filter() for every word that has rootLength
            if (miniDict.length == 0) {
                console.log(`LOG: miniDict length is 0, return error`)
                fullDef = "Couldn't find any words with the root length <b>'" + word + "'</b> in the local dictionary. You may find it in the <a target='_blank' href='https://docs.google.com/document/d/1Tll7H4qqslsbk1-U1rFnhHs5Au3Lawn3nLowXDmk6AY/edit?pli=1&tab=t.0'>Yongasabi Dictionary</a> instead."} else
                // if we can't find any words, don't write anything
            {for (i = 0; i < miniDict.length; i++) {
                shortDef = "<br><br><b>" + miniDict[i].word + "</b>" + "<br>" + "<i>" + miniDict[i].type + "</i> | <i>" + miniDict[i].root + "</i><br>" + miniDict[i].definition.join("<br>");
                if (miniDict[i].aliases != undefined) {shortDef += "<br><i>aliases: " + miniDict[i].aliases.join(", ") + "</i>"}
                console.log(`LOG: shortDef now ${shortDef}, write`);
                fullDef += shortDef
            }}
            fullDef += "</details>";
            // write it all into a details menu
            console.log(`LOG: fullDef now ${fullDef}`)
            break;

    }

  //  document.getElementById("dictLookupReturnZone").innerHTML = fullDef;

    // it would be nice to do multiple searches...
    // i.e, rootlength + word type
    // or word + word type
    // or root + prefix, or prefix + word type, or prefix + root length?
}
