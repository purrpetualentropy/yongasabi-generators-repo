function sentenceFormatter(sentenceString) {
    console.groupCollapsed("sentenceFormatter");
    let devMode = document.getElementById("devBox").checked;
    let useGlyphs = document.getElementById("glyphBox").checked
    let useEng = document.getElementById("engBox").checked

    if (devMode) {
        console.log(`LOG: sentenceFormatter has sentenceString ${sentenceString}, useGlyphs ${useGlyphs}, useEng ${useEng}`)
    }

    if (useGlyphs && useEng) {
        // glyphs and eng

        if (devMode) {
            console.log(`LOG: using glyphs and eng`)
        }
        
        console.groupEnd();
        return `<div class="yongiGlyph">` + sentenceString + `</div><br><div>` + sentenceString + `</div>`

    } else
        if (useGlyphs && useEng == false) {
            // only glyphs

            if (devMode) {
                console.log(`LOG: using only glyphs`)
            }

            console.groupEnd();
            return `<div class="yongiGlyph">` + sentenceString + `</div>`

        } else
        {
            // only eng

            if (devMode) {
                console.log(`LOG: using only eng`)
            }
            console.groupEnd();
            return `<div>` + sentenceString + `</div>`

        }

}
