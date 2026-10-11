function clearDictLookup () {
      let result = confirm("Clear the dictionary lookup results?");
      if (result) {
        document.getElementById("dictLookupReturnZone").innerHTML = ""
      } else {};
    }
