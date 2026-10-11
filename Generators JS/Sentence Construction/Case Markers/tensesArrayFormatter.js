function tensesArrayFormatter (tensesArray) {
    console.groupCollapsed("tensesArrayFormatter");
    let devMode = document.getElementById("devBox").checked;
    let legalTensesArray = [];
    let formattedTensesArray = [];
    let mode;

    if (tensesArray.includes("imperative") && rnd(1, 2) == 2) {
        mode = 1;
    } else
        if ((tensesArray.includes("polite") || tensesArray.includes("plain")) && rnd(1, 2) == 2) {
            mode = 2;
        } else {
            mode = 3;
        }

    switch (mode) {
        case 1:
            // Imperative.

            for (let i = 0; i < tensesArray.length; i++) {

                if (tensesArray[i] == "imperative" || tensesArray[i] == "neg") {
                    legalTensesArray.push(tensesArray[i])
                }

            }

            break;

        case 2:
            // Polite.

            for (let i = 0; i < tensesArray.length; i++) {

                if (tensesArray[i] == "plain" || tensesArray[i] == "neg" || tensesArray[i] == "polite") {
                    legalTensesArray.push(tensesArray[i])
                }

            }

            break;

        case 3:
            // Normal.

            for (let i = 0; i < tensesArray.length; i++) {

                if (tensesArray[i] != "imperative" || tensesArray[i] != "plain" || tensesArray[i] != "polite") {
                    legalTensesArray.push(tensesArray[i])
                }

            }

            break;

    }

    if (legalTensesArray.includes("present")) {
        formattedTensesArray.push("present")
    }

    if (legalTensesArray.includes("plain")) {
        formattedTensesArray.push("plain")
    }

    if (legalTensesArray.includes("abil")) {
        formattedTensesArray.push("abil")
    }

    if (legalTensesArray.includes("des")) {
        formattedTensesArray.push("des")
    }

    if (legalTensesArray.includes("imperative")) {
        formattedTensesArray.push("imperative")
    }

    if (legalTensesArray.includes("neg")) {
        formattedTensesArray.push("neg")
    }

    if (legalTensesArray.includes("polite")) {
        formattedTensesArray.push("polite")
    }

    if (legalTensesArray.includes("hyp")) {
        formattedTensesArray.push("hyp")
    }

    if (legalTensesArray.includes("habit")) {
        formattedTensesArray.push("habit")
    }

    if (legalTensesArray.includes("past")) {
        formattedTensesArray.push("past")
    }

    if (legalTensesArray.includes("future")) {
        formattedTensesArray.push("future")
    }

    if (formattedTensesArray.includes("past") && formattedTensesArray.includes("future") && rnd(1, 2) == 2) {
        // Swap future and past.
        let pastIndex = formattedTensesArray.indexOf("past");
        let futureIndex = formattedTensesArray.indexOf("future");

        formattedTensesArray[futureIndex] = "past";
        formattedTensesArray[pastIndex] = "future";

    }

    console.groupEnd();
    return formattedTensesArray;

}
