    function hagaTenseSuffixer (tensesArray) {
      console.groupCollapsed("hagaTenseSuffixer")
      let useIrregular = !(tensesArray.includes("plain") ||
              tensesArray.includes("abilitative") ||
              tensesArray.includes("desiderative") ||
              tensesArray.includes("imperative") ||
              tensesArray.includes("polite") ||
              tensesArray.includes("habitual"))
      let suffix = "";
      let verb = "haga";
      let cutVerb = "hag";
      let cutFirst;
      let cutLast;
      let useCutVerb = true;
      // if it includes only present, past, future, hypothetical, or negation, it uses irregular
      // singular hypothetical will be written as sagaen
      // and singular negation will be written as sayong

      switch (useIrregular) {
        case true:
          console.log(`LOG: using irregular. tensesArray is ${tensesArray}`)

          for (i = 0; i < tensesArray.length; i++) {

            switch (tensesArray[i]) {

              case "present":
                suffix += "go";
                break;

              case "hypothetical":
                if (i - 1 == -1) {
                  suffix += "gogaen"
                } else {
                  suffix += "gaen"
                }
                break;

              case "negation":
                if (i != 0 && tensesArray[i - 1] == "hypothetical") {
                  suffix += " yong"
                } else if (i - 1 == -1) {
                  suffix += "goyong"
                } else {
                  suffix += "yong"
                }
                break;

              case "past":
                if (i - 1 == -1) {
                  suffix += "goda"
                } else
                if (i != 0 && tensesArray[i - 1] == "present")
                {
                  suffix += "sada"
                } else {
                  suffix += "da"
                }
                break;

              case "future":
                if (i != 0 && tensesArray[i - 1] == "hypothetical") {
                  suffix += "'go"
                } else if (i == 0) {
                  suffix += "gogo"
                } else
                if (i != 0 && tensesArray[i - 1] == "present")
                {
                  suffix += "sago"
                } else {
                  suffix += "go"
                }
                break;

            }

          }

          break;

        case false:
          console.log(`LOG: not using irregular. tensesArray is ${tensesArray}`)

          for (i = 0; i < tensesArray.length; i++) {

            switch (tensesArray[i]) {
              case "present":
                suffix += "sa";
                break;

              case "plain":
                useCutVerb = false;
                // do nothing
                break;

              case "abilitative":
              case "abil":
                cutFirst = i - 1 != -1 && tensesArray[i - 1] == "present";
                cutLast = i + 1 > tensesArray.length == false && (
                        tensesArray[i + 1] == "desiderative" ||
                        tensesArray[i + 1] == "habitual" ||
                        tensesArray[i + 1] == "past" ||
                        tensesArray[i + 1] == "future")

                if (cutFirst && cutLast) {
                  suffix += "k"
                } else if (cutFirst && !cutLast) {
                  suffix += "ka"
                } else if (!cutFirst && cutLast) {
                  suffix += "ik"
                } else {
                  suffix += "ika"
                }
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
                } else if (cutFirst && !cutLast) {
                  suffix += "ma"
                } else if (!cutFirst && cutLast) {
                  suffix += "im"
                } else {
                  suffix += "ima"
                }
                break;

              case "imperative":
              case "imp": {
                suffix += "iyo"
              }
                break;


              case "hypothetical":
              case "hyp":
                if (i - 1 != -1 && tensesArray[i - 1] == "desiderative") {
                  suffix += " gaen"
                } else {
                  suffix += "gaen"
                }

                if (i - 1 == -1) {
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
                if (i - 1 == -1) {
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
                } else if (cutFirst && !addApostrophe) {
                  suffix += "go"
                } else {
                  suffix += "igo"
                }
                break;
            }
            break;

          }
      }

      console.groupEnd();

      if (useIrregular) {return suffix} else
      if (useCutVerb) {return cutVerb + suffix} else {
        return verb + suffix
      }
    }