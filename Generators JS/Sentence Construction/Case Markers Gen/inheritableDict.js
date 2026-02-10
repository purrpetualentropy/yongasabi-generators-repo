  const inheritableDict = [
    { type: "person", // this type attribute is never read
        // it's just so that i know what this is
        // inheritableDict exists because i needed to change maka's verbType
        // and i realised i really did not want to manually edit every single thing
        // on every single person word object
        // it'll come in handy in the future when we're working with gigantic dictionaries though
        index: 0,
        // similarly, index is never read
        // it is also just so that i know which index to point at
        // when inheriting
        legalVTypes: [0, 1, 2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
        legalAlters: ["adjective", "negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        isPerson: true,
        args: {
            vocative: [0, 1, 2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
            genitive: true,
            subject: [0, 1, 2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
            timing: [-1],
            locative: [2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
            ablative: [3, 8],
            instrumental: [3, 4, 4.1, 4.2, 4.3, 5, 7, 8, 9, 10],
            indirobj: [3, 4, 4.1, 4.2, 4.3, 5, 7, 8, 9, 10],
            destination: [3],
            dirobj: [7, 8, 9]
        }
      },
    { type: "lizard",
      index: 1,
      legalVTypes: [0, 2, 3, 4, 4.1, 4.2, 4.3, 6, 8, 9],
      legalAlters: ["adjective", "negation"],
      temporalTense: "any",
      nonTemporalTenses: true,
      bannedTense: "none",
      isPerson: false,
      args: {
        vocative: [-1],
        genitive: true,
        subject: [0, 2, 3, 6],
        timing: [-1],
        locative: [-1],
        ablative: [3],
        instrumental: [3, 6],
        indirobj: [-1],
        destination: [3],
        dirobj: [4, 4.1, 4.2, 4.3, 8, 9]}
    },
    { type: "adjective",
        index: 2,
        legalVTypes: [0],
        legalAlters: ["negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        isPerson: false,
        args: {
            vocative: [-1],
            genitive: [-1],
            subject: [-1],
            timing: [-1],
            locative: [-1],
            ablative: [-1],
            instrumental: [-1],
            indirobj: [-1],
            destination: [-1],
            dirobj: [0]
        }
    },
    {  type: "timing",
        index: 3,
        // as you can see we don't encode tense info in here
        // because it'll differ between timing words, like nakwon "tomorrow" and hagwon "yesterday"
        legalVTypes: [2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
        legalAlters: ["negation"],
        isPerson: false,
        args: {
            vocative: [-1],
            genitive: [-1],
            subject: [-1],
            timing: [2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
            locative: [-1],
            ablative: [-1],
            instrumental: [-1],
            indirobj: [-1],
            destination: [-1],
            dirobj: [-1]
        }
    },
    { type: "angsa possessable",
        index: 4,
        legalVTypes: [0, 1, 8, 10],
        legalAlters: ["adjective", "possessed", "negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        isPerson: false,
        args: {
            vocative: [-1],
            genitive: [-1],
            subject: [0],
            timing: [-1],
            locative: [-1],
            ablative: [-1],
            instrumental: [-1],
            indirobj: [-1],
            destination: [-1],
            dirobj: [1, 8, 10]
        }
    },
    { type: "edible and possessable",
      index: 5,
      legalVTypes: [1, 4.1, 8, 10],
        // words that use this are basically identical to angsa possessable ones
        // execpt for their args, which include maka
        // so only the differences are written here, and they'll inherit from angsa possessable otherwise
        // note that these are "unhuntable". it would include things like huwso "soup"
        // bol'o hanta ... gulay'o hanta...
      isPerson: false,
      args: {
        vocative: [-1],
        genitive: [-1],
        subject: [0],
        timing: [-1],
        locative: [-1],
        ablative: [-1],
        instrumental: [-1],
        indirobj: [-1],
        destination: [-1],
        dirobj: [1, 4.1, 8, 10]
      }},
    { type: "spearable huntable possessable and edible",
        // batfly, eggbug, meal/food, etc
        // this must also include things that are cuttable and spearable
        // so, no soup. it'll inherit from index 5 instead
        // also no bread, as bread is not spearable or huntable
        // unless you live in bugsnax world i guess
      index: 6,
      legalVTypes: [1, 4, 4.1, 4.2, 4.3, 8, 10],
        legalAlters: ["negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        isPerson: false,
      args: {
        vocative: [-1],
          genitive: [-1],
          subject: [0],
          timing: [-1],
          locative: [-1],
          ablative: [-1],
          instrumental: [-1],
          indirobj: [-1],
          destination: [-1],
          dirobj: [1, 4, 4.1, 4.2, 4.3, 8, 10]
      }},
    { type: "UNspearable huntable possessable and edible",
        // stuff like bol, gulay, which can be hunted for and cut and eaten but not speared
        // "she is spearing the vegetables" girl okay calm down a little
        index: 7,
        legalVTypes: [1, 4, 4.1, 4.3, 8, 10],
        legalAlters: ["negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        isPerson: false,
        args: {
            vocative: [-1],
            genitive: [-1],
            subject: [0],
            timing: [-1],
            locative: [-1],
            ablative: [-1],
            instrumental: [-1],
            indirobj: [-1],
            destination: [-1],
            dirobj: [1, 4, 4.1, 4.3, 8, 10]
        }},
    { type: "position words",
    index: 8,
        legalVTypes: [0, 2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
        legalAlters: ["adjective", "negation", "compound"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        isPerson: false,
        args: {
            vocative: [-1],
            genitive: [-1],
            subject: [0],
            timing: [-1],
            locative: [2, 3, 4, 4.1, 4.2, 4.3, 5, 6, 7, 8, 9, 10],
            ablative: [3, 8],
            instrumental: [3],
            indirobj: [-1],
            destination: [3],
            dirobj: [3, 8]
        }
    },
    { type: "vom arguments",
        // one of few cases where verbs inherit!
        // but voms essentially always have the same args, so ... it's fine
    index: 9,
        isPerson: false,
        args: {
        vocative: true,
        genitive: false,
        subject: [3],
        timing: [3],
        locative: [3],
        ablative: [3],
        instrumental: [3],
        indirobj: [3],
        destination: [3],
        dirobj: [3]
        }
    },
    { type: "position word of motion",
      index: 10,
      args: {
        vocative: [-1],
        genitive: [-1],
        subject: [-1],
        timing: [-1],
        locative: [-1],
        ablative: [-1],
        instrumental: [-1],
        indirobj: [-1],
        destination: [-1],
        dirobj: [-1]
      }}
]
