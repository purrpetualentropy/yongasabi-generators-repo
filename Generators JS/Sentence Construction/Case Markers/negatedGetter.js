function negatedGetter (argObj, arg) {
    console.groupCollapsed("negatedGetter");
    let returnObj = {};
    let devMode = document.getElementById("devBox").checked;

    returnObj.arg = arg;

    let keys = Object.keys(argObj);

    for (let i = 0; i < keys.length; i++) {
        returnObj[keys[i]] = argObj[keys[i]]

        if (devMode) {
            console.log(`LOG: keys[i] is ${keys[i]}, returnObj is:`);
            console.dir(returnObj)
        }
    }

    returnObj.negated = true;

    // is this actually it...?

    console.groupEnd();
    return returnObj;
}
