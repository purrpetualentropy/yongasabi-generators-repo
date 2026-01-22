export const inheritableDict = [
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
        legalVTypes: [0, 1, 2, 3, 4, 4.1, 5, 6],
        legalAlters: ["adjective", "negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
        args: {
            vocative: [0, 1, 2, 3, 4, 4.1, 5, 6],
            genitive: true,
            subject: [0, 1, 2, 3, 4, 4.1, 5, 6],
            timing: [-1],
            locative: [2, 3, 4, 4.1, 5, 6],
            ablative: [3],
            instrumental: [3, 4, 4.1, 5],
            indirobj: [3, 4, 4.1, 5],
            destination: [3],
            dirobj: [-1]
        }
    },
    { type: "lizard",
      index: 1,
      legalVTypes: [0, 2, 3, 4, 4.1, 6],
      legalAlters: ["adjective", "negation"],
      temporalTense: "any",
      nonTemporalTenses: true,
      bannedTense: "none",
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
        dirobj: [4, 4.1]}
    },
    { type: "adjective",
        index: 2,
        legalVTypes: [0],
        legalAlters: ["negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
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
        legalVTypes: [2, 3, 4, 4.1, 5, 6],
        legalAlters: ["negation"],
        args: {
            vocative: [-1],
            genitive: [-1],
            subject: [-1],
            timing: [2, 3, 4, 4.1, 5, 6],
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
        legalVTypes: [1],
        legalAlters: ["adjective", "possessed", "negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
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
            dirobj: [1]
        }
    },
    { type: "edible and possessable",
      index: 5,
      legalVTypes: [1, 4.1],
        // words that use this are basically identical to angsa possessable ones
        // execpt for their args, which include maka
        // so only the differences are written here, and they'll inherit from angsa possessable otherwise
        // note that these are "unhuntable". it would include things like huwso "soup"
        // bol'o hanta ... gulay'o hanta...
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
        dirobj: [1, 4.1]
      }},
    { type: "spearable huntable possessable and edible",
        // batfly, eggbug, meal/food, etc
        // this must also include things that are cuttable and spearable
        // so, no soup. it'll inherit from index 5 instead
        // also no bread, as bread is not spearable or huntable
        // unless you live in bugsnax world i guess
      index: 6,
      legalVTypes: [1, 4, 4.1, 4.2],
        legalAlters: ["negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
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
          dirobj: [1, 4, 4.1, 4.2]
      }},
    { type: "UNspearable huntable possessable and edible",
        // stuff like bol, gulay, which can be hunted for and cut and eaten but not speared
        // "she is spearing the vegetables" girl okay calm down a little
        index: 7,
        legalVTypes: [1, 4, 4.1],
        legalAlters: ["negation"],
        temporalTense: "any",
        nonTemporalTenses: true,
        bannedTense: "none",
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
            dirobj: [1, 4, 4.1]
        }}
]