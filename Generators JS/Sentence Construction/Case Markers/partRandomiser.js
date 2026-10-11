function partRandomiser(type, min, max) {
        console.groupCollapsed("partRandomiser");
        console.log(`LOG; type is ${type}, min is ${min}, max is ${max}`)
        let devMode = document.getElementById("devBox").checked;
        let finalArray = [];
        let tempArray;
        // tempArray takes an array from the checked boxes of a given class
        let holderArray = [];
        // holderArray gets the values of those boxes pushed into it
        // the values are the actual things we want to write, like subjectBox's value is "subject"
        // this is so that we don't need a separate function just to translate "subjectBox" into "subject"
        let amnt;
        let targetIndex;

        switch (type) {
            case "arg":
                finalArray = ["subject"]
                tempArray = Array.from(document.querySelectorAll('input[class="argBox"]:checked'))
                console.log(`tempArray is ${tempArray.join(", ")}`);
                break;

          case "tense":
                tempArray = Array.from(document.querySelectorAll('input[class="tenseBox"]:checked'));
                break;

            case "verbType":
                // We need a way to tell which verbtypes are permitted.
                // I'm just going to assume a global value, for now.
                if (generatorId === "cases") {
                    tempArray = [0, 1, 2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10]
                } else
                    if (generatorId === "tenses") {
                        tempArray = [0, 1, 2, 3, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 5, 6, 7, 8, 9, 10, 11, 12];
                    } else
                    {
                        tempArray = [0, 1, 2, 3, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 5, 6, 7, 8, 9, 10, 11, 12];
                    }
                return tempArray[Math.floor(Math.random() * (tempArray.length))];

            case "preVAlters":
                tempArray = Array.from(document.querySelectorAll('input[class="preAltersBox"]:checked'));
                break;

            case "postVAlters":
                tempArray = Array.from(document.querySelectorAll('input[class="postAltersBox"]:checked'));
                break;
        }

        console.log(`LOG: tempArray now ${tempArray}`)

    for (let i = 0; i < tempArray.length; i++) {
          holderArray.push(tempArray[i].value);
         }

    console.log(`LOG: holderArray now ${holderArray}`)

    amnt = Math.floor(Math.random() * (max - min) + min)
    if (amnt < min) {amnt = min}

    if (type == "postVAlters") {
      amnt = Math.floor(Math.random() * (3))
      console.log(`LOG: amnt is ${amnt}`)
      if (amnt != 1) {amnt = 0}
    }

    console.log(`LOG: amnt now ${amnt}`)

    for (; amnt > 0; amnt--) {
         targetIndex = Math.floor(Math.random() * (holderArray.length));
         finalArray.push(holderArray[targetIndex]);
         holderArray.splice(targetIndex, 1);
         }

        if (finalArray.includes("")) {
          finalArray.splice(finalArray.indexOf(""), 1)
        }

         console.log(`LOG: finalArray now ${finalArray}.`);
         console.groupEnd();
         return finalArray;
}
