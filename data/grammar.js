// GENERATED FILE - do not edit by hand. Run `python3 build_data.py` instead.
//
// Projected from grammar/curriculum.md (the lesson roadmap) and the authored
// lesson files in grammar/lessons/*.json.
//
//   GRAMMAR.curriculum : every planned lesson, in curriculum order, each with
//                        status "done" (its lesson file exists) or "todo".
//   GRAMMAR.lessons    : slug -> { rules, cases, cards } for built lessons only.
//
// Three levels of structure, and the distinction matters: a RULE is a family
// (a heading in the review list), a CASE is one specific pattern with its own
// one-line note, and a CARD drills a case. Several cards share a case, several
// cases share a rule. Cards carry `case`, not their own prose, so a note lives
// in exactly one place.
var GRAMMAR = {
  "curriculum": [
    {
      "n": 1,
      "slug": "waar-staat-het-werkwoord",
      "title": "waar staat het werkwoord?",
      "phase": 1,
      "covers": "V2 and inversion in main clauses; verb-final in subordinate clauses; the end cluster",
      "card_types": [
        "produce",
        "transform",
        "errorfix"
      ],
      "introduces": [],
      "depends": [],
      "status": "done"
    },
    {
      "n": 2,
      "slug": "scheidbare-werkwoorden",
      "title": "scheidbare werkwoorden",
      "phase": 1,
      "covers": "split form in main clauses (bel ... op); rejoined in subclauses (dat ik je opbel); the participle wedge (opgebeld); om je op te bellen",
      "card_types": [
        "produce",
        "transform",
        "errorfix"
      ],
      "introduces": [],
      "depends": [
        "waar-staat-het-werkwoord"
      ],
      "status": "done"
    },
    {
      "n": 3,
      "slug": "te-of-geen-te",
      "title": "te of geen te",
      "phase": 1,
      "covers": "om ... te and verbs that require te; bare infinitive after modals, laten, zien, horen",
      "card_types": [
        "produce",
        "transform",
        "errorfix",
        "choice"
      ],
      "introduces": [],
      "depends": [
        "waar-staat-het-werkwoord"
      ],
      "status": "done"
    },
    {
      "n": 4,
      "slug": "hebben-of-zijn",
      "title": "hebben of zijn",
      "phase": 2,
      "covers": "perfect auxiliary choice (motion and change of state take zijn); participles without ge- after be-, ver-, ont-, her-",
      "card_types": [
        "choice",
        "transform"
      ],
      "introduces": [],
      "depends": [
        "waar-staat-het-werkwoord"
      ],
      "status": "todo"
    },
    {
      "n": 5,
      "slug": "imperfectum-of-perfectum",
      "title": "imperfectum of perfectum",
      "phase": 2,
      "covers": "when Dutch prefers the simple past: narrative sequences, states, was/had/kon",
      "card_types": [
        "choice"
      ],
      "introduces": [],
      "depends": [
        "hebben-of-zijn"
      ],
      "status": "todo"
    },
    {
      "n": 6,
      "slug": "lijdende-vorm",
      "title": "de lijdende vorm",
      "phase": 2,
      "covers": "worden (process) versus zijn (state); the door-agent; passive inside a subclause; agentless passive with expletive er",
      "card_types": [
        "transform"
      ],
      "introduces": [],
      "depends": [
        "hebben-of-zijn",
        "waar-staat-het-werkwoord"
      ],
      "status": "todo"
    },
    {
      "n": 7,
      "slug": "er-als-onderwerp",
      "title": "er als onderwerp",
      "phase": 3,
      "covers": "er as existential and dummy subject (er is, er zijn, er wordt gebeld); er of quantity (ik heb er drie)",
      "card_types": [
        "transform",
        "choice"
      ],
      "introduces": [],
      "depends": [
        "lijdende-vorm"
      ],
      "status": "todo"
    },
    {
      "n": 8,
      "slug": "er-plus-voorzetsel",
      "title": "er + voorzetsel",
      "phase": 3,
      "covers": "er + preposition and what splits them (ik denk eraan, er vaak aan, er niet aan); erop, ermee, erover, ervoor",
      "card_types": [
        "transform",
        "cloze"
      ],
      "introduces": [
        "eraan",
        "erop",
        "ermee",
        "erover",
        "ervoor",
        "erdoor",
        "waarmee",
        "waarop",
        "waarvan",
        "waaraan"
      ],
      "depends": [
        "er-als-onderwerp"
      ],
      "status": "todo"
    },
    {
      "n": 9,
      "slug": "modale-werkwoorden",
      "title": "modale werkwoorden",
      "phase": 4,
      "covers": "meaning shifts across kunnen, mogen, moeten, willen, zullen; hoeven niet versus moeten niet",
      "card_types": [
        "choice",
        "transform"
      ],
      "introduces": [],
      "depends": [
        "te-of-geen-te"
      ],
      "status": "todo"
    },
    {
      "n": 10,
      "slug": "als-ik-het-had-geweten",
      "title": "als ik het had geweten",
      "phase": 4,
      "covers": "zou + infinitive; als ... zou; had ik het geweten; zou hebben gedaan clusters",
      "card_types": [
        "transform"
      ],
      "introduces": [],
      "depends": [
        "hebben-of-zijn",
        "waar-staat-het-werkwoord"
      ],
      "status": "todo"
    },
    {
      "n": 11,
      "slug": "niet-en-geen",
      "title": "niet en geen",
      "phase": 4,
      "covers": "placement and scope of niet; geen versus niet; niets, niemand, nergens",
      "card_types": [
        "transform",
        "errorfix"
      ],
      "introduces": [],
      "depends": [
        "waar-staat-het-werkwoord"
      ],
      "status": "todo"
    },
    {
      "n": 12,
      "slug": "vaste-voorzetsels",
      "title": "vaste voorzetsels",
      "phase": 5,
      "covers": "fixed verb + preposition pairs (wachten op, denken aan, rekenen op, klagen over); adjective + preposition pairs",
      "card_types": [
        "cloze"
      ],
      "introduces": [],
      "depends": [],
      "status": "todo"
    },
    {
      "n": 13,
      "slug": "die-of-dat",
      "title": "die of dat",
      "phase": 5,
      "covers": "relative pronouns by gender and number; waar-compounds for prepositions; met wie",
      "card_types": [
        "choice",
        "transform"
      ],
      "introduces": [
        "waarmee",
        "waarop",
        "waarvan",
        "waaraan"
      ],
      "depends": [
        "waar-staat-het-werkwoord"
      ],
      "status": "todo"
    },
    {
      "n": 14,
      "slug": "de-e-regel",
      "title": "de -e regel",
      "phase": 5,
      "covers": "adjective inflection; the het + indefinite exception; deze, die, dit, dat",
      "card_types": [
        "cloze",
        "choice"
      ],
      "introduces": [],
      "depends": [],
      "status": "todo"
    },
    {
      "n": 15,
      "slug": "reflexieve-werkwoorden",
      "title": "reflexieve werkwoorden",
      "phase": 5,
      "covers": "zich with reflexive verbs and where it sits in the mid-field",
      "card_types": [
        "transform"
      ],
      "introduces": [],
      "depends": [
        "waar-staat-het-werkwoord"
      ],
      "status": "todo"
    }
  ],
  "lessons": {
    "waar-staat-het-werkwoord": {
      "rules": [
        {
          "id": "v2",
          "title": "Werkwoord op plaats 2",
          "intro": "In a main clause the finite verb is always the second element. Whatever you put first, the verb keeps slot two, so the subject moves behind it."
        },
        {
          "id": "eind",
          "title": "Werkwoord aan het eind",
          "intro": "A subordinating conjunction (omdat, dat, als, terwijl, toen, voordat) sends the finite verb to the end of its own clause. want does not: it is coordinating."
        },
        {
          "id": "cluster",
          "title": "De eindgroep",
          "intro": "When a clause has more than one verb, the extra verbs gather at the end. In a main clause the finite one still holds slot two; in a subclause the whole group sits at the end."
        }
      ],
      "cases": [
        {
          "id": "1a",
          "rule": "v2",
          "title": "Onderwerp eerst",
          "note": "The default: subject first, finite verb second.",
          "examples": [
            [
              "[1 Ik] [2 ga] straks naar de stad.",
              "I'm going to town shortly."
            ],
            [
              "[1 Wij] [2 eten] om acht uur.",
              "We eat at eight o'clock."
            ],
            [
              "[1 Hij] [2 komt] morgen naar het feest.",
              "He's coming to the party tomorrow."
            ]
          ]
        },
        {
          "id": "1b",
          "rule": "v2",
          "title": "Tijdsbepaling vooraan",
          "note": "Front a time adverbial and the subject moves behind the verb.",
          "examples": [
            [
              "[1 Straks] [2 ga] ik naar de stad.",
              "Shortly I'm going to town."
            ],
            [
              "[1 Morgen] [2 fietsen] we naar het dorp.",
              "Tomorrow we're cycling to the village."
            ],
            [
              "[1 Gisteren] [2 was] ik ziek.",
              "Yesterday I was ill."
            ]
          ]
        },
        {
          "id": "1c",
          "rule": "v2",
          "title": "Object vooraan",
          "note": "Any fronted element causes it, including an object. English word order cannot ask for this, so it is drilled by transformation only.",
          "examples": [
            [
              "[1 Die man] [2 ken] ik niet.",
              "That man I don't know."
            ],
            [
              "[1 Die koek] [2 eet] ik niet.",
              "That biscuit I'm not eating."
            ],
            [
              "[1 Dat boek] [2 heb] ik al [g gelezen].",
              "That book I've already read."
            ]
          ]
        },
        {
          "id": "1d",
          "rule": "v2",
          "title": "Vraagwoord vooraan",
          "note": "A question word is the first element, so the verb comes straight after it.",
          "examples": [
            [
              "[1 Wanneer] [2 ga] je naar de stad?",
              "When are you going to town?"
            ],
            [
              "[1 Waarom] [2 woont] ze in dit dorp?",
              "Why does she live in this village?"
            ],
            [
              "[1 Waar] [2 is] de apotheek?",
              "Where is the pharmacy?"
            ]
          ]
        },
        {
          "id": "1e",
          "rule": "v2",
          "title": "Bijzin vooraan",
          "note": "A whole subclause counts as one first element, so the main verb follows it directly. The marking shows it: the entire clause sits under a single slot-1 tick.",
          "examples": [
            [
              "[1 Omdat het regent,] [2 blijf] ik thuis.",
              "Because it's raining, I'm staying home."
            ],
            [
              "[1 Als het droog is,] [2 gaan] we fietsen.",
              "If it's dry, we'll go cycling."
            ],
            [
              "[1 Toen ik jong was,] [2 woonde] ik hier.",
              "When I was young, I lived here."
            ]
          ]
        },
        {
          "id": "2a",
          "rule": "eind",
          "title": "Onderschikkend: werkwoord achteraan",
          "note": "omdat, dat and als send the finite verb to the end of its clause. Careful: if nothing follows the verb (omdat het regent) both orders look identical, so judge the rule on longer clauses.",
          "examples": [
            [
              "[1 Ik] [2 blijf] thuis [c omdat] ik geen tijd [e heb].",
              "I'm staying home because I have no time."
            ],
            [
              "[1 Ze] [2 belt] niet [c omdat] ze te veel werk [e heeft].",
              "She isn't calling because she has too much work."
            ],
            [
              "[1 Hij] [2 zegt] [c dat] hij morgen naar de stad [e gaat].",
              "He says that he's going to town tomorrow."
            ]
          ]
        },
        {
          "id": "2b",
          "rule": "eind",
          "title": "Want: gewone woordorde",
          "note": "want is coordinating, so normal V2 order follows it: subject, then verb.",
          "points": [
            "omdat opens a subclause and throws its verb to the end. want does not: after it a normal main clause starts again.",
            "So in the diagram a want clause gets its own 1 and 2, while an omdat clause gets a bracket instead.",
            "The difference is only visible over a long clause. Say it with omdat and the verb travels past everything; with want it stays put.",
            "English uses 'because' for both, so no English prompt can ask for this. It is drilled by transformation only."
          ],
          "compare": {
            "labelA": "omdat",
            "labelB": "want",
            "pairs": [
              [
                "[1 Ik] [2 blijf] vanavond thuis [c omdat] ik morgen een belangrijk examen [e heb].",
                "[1 Ik] [2 blijf] vanavond thuis [c want] [1 ik] [2 heb] morgen een belangrijk examen.",
                "I'm staying home tonight because I have an important exam tomorrow."
              ],
              [
                "[1 Hij] [2 komt] niet naar het feest [c omdat] hij al de hele week ziek [e is].",
                "[1 Hij] [2 komt] niet naar het feest [c want] [1 hij] [2 is] al de hele week ziek.",
                "He isn't coming to the party because he's been ill all week."
              ],
              [
                "[1 We] [2 gaan] nu naar huis [c omdat] de laatste trein over tien minuten [e vertrekt].",
                "[1 We] [2 gaan] nu naar huis [c want] [1 de laatste trein] [2 vertrekt] over tien minuten.",
                "We're going home now because the last train leaves in ten minutes."
              ]
            ]
          }
        },
        {
          "id": "2e",
          "rule": "eind",
          "drill": false,
          "title": "Uitzondering: voorzetselgroep mag erna",
          "note": "Exception to verb-final: a voorzetselgroep may stand behind the verb group. Both orders are correct.",
          "points": [
            "The rule so far: in a subclause nothing comes after the verbs at the end. A voorzetselgroep is the one thing that may.",
            "A voorzetselgroep is a preposition plus its noun: op de bus, met de trein. It is the pill in the diagram.",
            "The verbs do not move. In both lines the bracket closes on the same verb group; only the pill changes side.",
            "So 'dat ze is gegaan met de trein' is correct Dutch, not a slip. Recognise it; you never have to produce it."
          ],
          "compare": {
            "labelA": "in het midden",
            "labelB": "achteraan",
            "pairs": [
              [
                "[1 Ik] [2 weet] [c dat] hij lang [p op de bus] [e heeft] [g gewacht].",
                "[1 Ik] [2 weet] [c dat] hij lang [e heeft] [g gewacht] [p op de bus].",
                "I know that he waited a long time for the bus."
              ],
              [
                "[1 Ze] [2 zegt] [c dat] ze [p met de trein] [e is] [g gegaan].",
                "[1 Ze] [2 zegt] [c dat] ze [e is] [g gegaan] [p met de trein].",
                "She says that she went by train."
              ]
            ]
          }
        },
        {
          "id": "3a",
          "rule": "cluster",
          "title": "Perfectum: deelwoord achteraan",
          "note": "Perfect tense: the auxiliary takes slot two, the participle goes last.",
          "examples": [
            [
              "[1 Ik] [2 heb] mijn moeder [g bezocht].",
              "I visited my mother."
            ],
            [
              "[1 We] [2 hebben] de rekening [g betaald].",
              "We paid the bill."
            ],
            [
              "[1 Ze] [2 heeft] de keuken [g schoongemaakt].",
              "She cleaned the kitchen."
            ]
          ]
        },
        {
          "id": "3b",
          "rule": "cluster",
          "title": "Modaal werkwoord + infinitief",
          "note": "With a modal, the infinitive moves to the end.",
          "examples": [
            [
              "[1 Hij] [2 wil] naar het werk [g fietsen].",
              "He wants to cycle to work."
            ],
            [
              "[1 Ik] [2 moet] vandaag [g studeren].",
              "I have to study today."
            ],
            [
              "[1 We] [2 kunnen] morgen [g beginnen].",
              "We can start tomorrow."
            ]
          ]
        },
        {
          "id": "3c",
          "rule": "cluster",
          "title": "Eindgroep in een bijzin",
          "note": "In a subclause the whole cluster moves to the end together.",
          "points": [
            "The eindgroep is the same in both clause types. What changes is whether the finite verb stays up front in slot two or drops back to join the rest.",
            "So in a main clause the group is split (heb … bezocht, with the object in between) and in a subclause it closes up (heb bezocht).",
            "The participle is last either way. It is the finite verb that moves."
          ],
          "compare": {
            "labelA": "hoofdzin",
            "labelB": "bijzin",
            "pairs": [
              [
                "[1 Ik] [2 heb] mijn moeder [g bezocht].",
                "[1 Ik] [2 weet] [c dat] ik mijn moeder [e heb] [g bezocht].",
                "I visited my mother. / I know that I visited my mother."
              ],
              [
                "[1 We] [2 hebben] de rekening [g betaald].",
                "[1 Hij] [2 zegt] [c dat] we de rekening [e hebben] [g betaald].",
                "We paid the bill. / He says that we paid the bill."
              ]
            ]
          },
          "examples": [
            [
              "[1 Ze] [2 denkt] [c dat] ik te veel [e heb] [g gewerkt].",
              "She thinks that I worked too much."
            ]
          ]
        },
        {
          "id": "3d",
          "rule": "cluster",
          "title": "Drie werkwoorden",
          "note": "Three verbs stack at the end: finite verb first, then the others. In a main clause the finite one stays in slot two, in a subclause it joins the stack.",
          "examples": [
            [
              "[1 Ik] [2 heb] het [g moeten] [g doen].",
              "I had to do it."
            ],
            [
              "[1 Ik] [2 weet] [c dat] ik het [e heb] [g moeten] [g doen].",
              "I know that I had to do it."
            ],
            [
              "[1 Ze] [2 denkt] [c dat] ik het [e heb] [g kunnen] [g doen].",
              "She thinks that I was able to do it."
            ],
            [
              "[1 Hij] [2 zegt] [c dat] hij niet [e heeft] [g willen] [g komen].",
              "He says that he didn't want to come."
            ]
          ]
        }
      ],
      "cards": [
        {
          "type": "produce",
          "case": "1a",
          "level": 1,
          "front": "I'm going to town shortly.",
          "back": "[1 Ik] [2 ga] straks naar de stad."
        },
        {
          "type": "errorfix",
          "case": "1a",
          "level": 1,
          "front": "Ik straks ga naar de stad.",
          "back": "[1 Ik] [2 ga] straks naar de stad."
        },
        {
          "type": "produce",
          "case": "1b",
          "level": 1,
          "front": "Tomorrow we're cycling to the village.",
          "back": "[1 Morgen] [2 fietsen] we naar het dorp."
        },
        {
          "type": "transform",
          "case": "1b",
          "level": 1,
          "op": "zet 'straks' vooraan",
          "front": "Ik ga straks naar de apotheek.",
          "back": "[1 Straks] [2 ga] ik naar de apotheek."
        },
        {
          "type": "transform",
          "case": "1c",
          "level": 1,
          "op": "begin met 'die man'",
          "front": "Ik ken die man niet.",
          "back": "[1 Die man] [2 ken] ik niet."
        },
        {
          "type": "transform",
          "case": "1c",
          "level": 1,
          "op": "begin met 'die koek'",
          "front": "Ik eet die koek niet.",
          "back": "[1 Die koek] [2 eet] ik niet."
        },
        {
          "type": "produce",
          "case": "1d",
          "level": 1,
          "front": "When are you going to town?",
          "back": "[1 Wanneer] [2 ga] je naar de stad?"
        },
        {
          "type": "transform",
          "case": "1d",
          "level": 1,
          "op": "maak een vraag met 'waarom'",
          "front": "Ze woont in dit dorp.",
          "back": "[1 Waarom] [2 woont] ze in dit dorp?"
        },
        {
          "type": "produce",
          "case": "1e",
          "level": 2,
          "front": "Because it's raining, I'm staying home.",
          "back": "[1 Omdat het regent,] [2 blijf] ik thuis."
        },
        {
          "type": "transform",
          "case": "1e",
          "level": 2,
          "op": "zet de als-zin vooraan",
          "front": "We gaan fietsen als het droog is.",
          "back": "[1 Als het droog is,] [2 gaan] we fietsen."
        },
        {
          "type": "produce",
          "case": "2a",
          "level": 2,
          "front": "I'm staying home because I have no time.",
          "back": "[1 Ik] [2 blijf] thuis [c omdat] ik geen tijd [e heb]."
        },
        {
          "type": "transform",
          "case": "2a",
          "level": 2,
          "op": "verbind met 'omdat'",
          "front": "Ze belt niet. Ze heeft geen tijd.",
          "back": "[1 Ze] [2 belt] niet [c omdat] ze geen tijd [e heeft]."
        },
        {
          "type": "transform",
          "case": "2b",
          "level": 2,
          "op": "zeg hetzelfde met 'want'",
          "front": "Ik blijf vanavond thuis omdat ik morgen een belangrijk examen heb.",
          "back": "[1 Ik] [2 blijf] vanavond thuis [c want] [1 ik] [2 heb] morgen een belangrijk examen."
        },
        {
          "type": "transform",
          "case": "2b",
          "level": 2,
          "op": "zeg hetzelfde met 'want'",
          "front": "Hij komt niet naar het feest omdat hij al de hele week ziek is.",
          "back": "[1 Hij] [2 komt] niet naar het feest [c want] [1 hij] [2 is] al de hele week ziek."
        },
        {
          "type": "transform",
          "case": "2b",
          "level": 2,
          "op": "zeg hetzelfde met 'want'",
          "front": "We gaan nu naar huis omdat de laatste trein over tien minuten vertrekt.",
          "back": "[1 We] [2 gaan] nu naar huis [c want] [1 de laatste trein] [2 vertrekt] over tien minuten."
        },
        {
          "type": "produce",
          "case": "2a",
          "level": 2,
          "front": "I think he's coming tomorrow.",
          "back": "[1 Ik] [2 denk] [c dat] hij morgen [e komt]."
        },
        {
          "type": "errorfix",
          "case": "2a",
          "level": 2,
          "front": "Ze zegt dat ze gaat straks.",
          "back": "[1 Ze] [2 zegt] [c dat] ze straks [e gaat]."
        },
        {
          "type": "produce",
          "case": "2a",
          "level": 2,
          "front": "I'm staying home because I'm ill.",
          "back": "[1 Ik] [2 blijf] thuis [c omdat] ik ziek [e ben]."
        },
        {
          "type": "errorfix",
          "case": "2a",
          "level": 2,
          "front": "Hij komt niet omdat hij is boos.",
          "back": "[1 Hij] [2 komt] niet [c omdat] hij boos [e is]."
        },
        {
          "type": "produce",
          "case": "3a",
          "level": 3,
          "front": "I visited my mother.",
          "back": "[1 Ik] [2 heb] mijn moeder [g bezocht]."
        },
        {
          "type": "transform",
          "case": "3a",
          "level": 3,
          "op": "perfectum",
          "front": "We betalen de rekening.",
          "back": "[1 We] [2 hebben] de rekening [g betaald]."
        },
        {
          "type": "produce",
          "case": "3b",
          "level": 3,
          "front": "He wants to cycle to work.",
          "back": "[1 Hij] [2 wil] naar het werk [g fietsen]."
        },
        {
          "type": "transform",
          "case": "3b",
          "level": 3,
          "op": "met 'moeten'",
          "front": "Ik studeer vandaag.",
          "back": "[1 Ik] [2 moet] vandaag [g studeren]."
        },
        {
          "type": "produce",
          "case": "3c",
          "level": 3,
          "front": "I know that I visited my mother.",
          "back": "[1 Ik] [2 weet] [c dat] ik mijn moeder [e heb] [g bezocht]."
        },
        {
          "type": "transform",
          "case": "3c",
          "level": 3,
          "op": "begin met 'Hij zegt dat…'",
          "front": "We hebben de rekening betaald.",
          "back": "[1 Hij] [2 zegt] [c dat] we de rekening [e hebben] [g betaald]."
        },
        {
          "type": "produce",
          "case": "3d",
          "level": 3,
          "front": "I had to do it.",
          "back": "[1 Ik] [2 heb] het [g moeten] [g doen]."
        },
        {
          "type": "produce",
          "case": "3d",
          "level": 3,
          "front": "I know that I had to do it.",
          "back": "[1 Ik] [2 weet] [c dat] ik het [e heb] [g moeten] [g doen]."
        },
        {
          "type": "errorfix",
          "case": "3d",
          "level": 3,
          "front": "Ik weet dat ik het moeten heb doen.",
          "back": "[1 Ik] [2 weet] [c dat] ik het [e heb] [g moeten] [g doen]."
        }
      ]
    },
    "scheidbare-werkwoorden": {
      "rules": [
        {
          "id": "splitsen",
          "title": "Het werkwoord splitst",
          "intro": "As the finite verb of a main clause a separable verb breaks in two: the stem takes slot 2 and the prefix travels to the very end of the clause. The two halves are still one word and one meaning."
        },
        {
          "id": "heel",
          "title": "Het werkwoord blijft heel",
          "intro": "Everywhere else the two halves are written as one word: at the end of a subclause, and as the infinitive after a modal. Splitting there is the mirror image of the first error."
        },
        {
          "id": "wig",
          "title": "De wig: ge- en te ertussen",
          "intro": "A separable verb has a seam, because its prefix is a piece that can leave: op | bellen. The participle's ge- and the infinitive marker te go INTO that seam rather than in front of the word: opgebeld, op te bellen. A welded-on prefix gives no seam and takes neither treatment: te bespreken, never be te spreken. Which one you have is decided by stress, spelled out under 'Niet elk voorvoegsel splitst'."
        }
      ],
      "cases": [
        {
          "id": "1a",
          "rule": "splitsen",
          "title": "Voorvoegsel achteraan",
          "note": "As finite verb of a main clause the prefix detaches and lands at the end. The interference error is leaving it attached: 'Ik opbel je vanavond'.",
          "examples": [
            [
              "[1 Ik] [2 bel] je vanavond [s op].",
              "I'll call you tonight."
            ],
            [
              "[1 Hij] [2 staat] elke dag vroeg [s op].",
              "He gets up early every day."
            ],
            [
              "[1 We] [2 wassen] na het eten [s af].",
              "We do the dishes after dinner."
            ]
          ]
        },
        {
          "id": "1b",
          "rule": "splitsen",
          "title": "Alles komt ertussen",
          "note": "The prefix waits until everything else has been said: it is the last word, not the next word. 'Ik ruim op mijn kamer' parks it right after the verb, which is the common slip.",
          "examples": [
            [
              "[1 Ik] [2 ruim] mijn kamer morgen na het ontbijt [s op].",
              "I'll tidy my room tomorrow after breakfast."
            ],
            [
              "[1 Ze] [2 haalt] het kind om vier uur van school [s op].",
              "She picks the child up from school at four."
            ],
            [
              "[1 Hij] [2 nodigt] ons voor het feest [s uit].",
              "He's inviting us to the party."
            ]
          ]
        },
        {
          "id": "1c",
          "rule": "splitsen",
          "title": "Ook na inversie",
          "note": "Fronting changes what stands in slot 1, not where the prefix lands: it still ends the clause. Same in a question: 'Bel je me vanavond op?'",
          "examples": [
            [
              "[1 Morgen] [2 haal] ik je van het station [s op].",
              "Tomorrow I'll pick you up from the station."
            ],
            [
              "[1 Vanavond] [2 bel] ik mijn moeder [s op].",
              "Tonight I'm calling my mother."
            ],
            [
              "[1 Wanneer] [2 kom] je bij ons [s aan]?",
              "When do you arrive at our place?"
            ]
          ]
        },
        {
          "id": "1d",
          "rule": "splitsen",
          "drill": false,
          "title": "Niet elk voorvoegsel splitst",
          "note": "be-, ver-, ont- and her- are unstressed: they are part of the verb, not a prefix that can leave it. They never split, in any position.",
          "points": [
            "The rule so far is that a prefix leaves the verb in a main clause. These verbs are the exception: their prefix never leaves.",
            "The test is stress. You say ÓPbellen with the weight on the prefix, and bespréken with the weight on the stem. Only a stressed prefix splits.",
            "They skip the ge- of the participle too: besproken, verkocht, herhaald, not gebesproken.",
            "So there is nothing to produce here. The job is to not over-apply the rule you just learned."
          ],
          "compare": {
            "labelA": "scheidbaar",
            "labelB": "onscheidbaar",
            "pairs": [
              [
                "[1 Ik] [2 zoek] het boek [s op].",
                "[1 Ik] [2 bespreek] het boek.",
                "I look the book up. / I discuss the book."
              ],
              [
                "[1 Ze] [2 warmt] het eten [s op].",
                "[1 Ze] [2 bewaart] het eten.",
                "She heats the food up. / She keeps the food."
              ],
              [
                "[1 Hij] [2 belt] ons elke dag [s op].",
                "[1 Hij] [2 herhaalt] de vraag.",
                "He calls us every day. / He repeats the question."
              ]
            ]
          }
        },
        {
          "id": "2a",
          "rule": "heel",
          "title": "In de bijzin weer aan elkaar",
          "note": "A subclause sends the finite verb to the end, and a separable verb travels there whole: opbel, not bel ... op. The halves only come apart in a main clause.",
          "points": [
            "The main clause is the exception, not the rule: the halves come apart in exactly one position and are one word everywhere else.",
            "So the bracket changes shape. In the main clause it runs from the verb to the stranded prefix; in the subclause it closes on a single word at the end."
          ],
          "compare": {
            "labelA": "hoofdzin",
            "labelB": "bijzin",
            "pairs": [
              [
                "[1 Ik] [2 bel] je vanavond [s op].",
                "[1 Hij] [2 zegt] [c dat] ik je vanavond [e opbel].",
                "I'll call you tonight. / He says that I'll call you tonight."
              ],
              [
                "[1 We] [2 wassen] na het eten [s af].",
                "[1 Ze] [2 weet] [c dat] we na het eten [e afwassen].",
                "We do the dishes after dinner. / She knows that we do the dishes after dinner."
              ]
            ]
          },
          "examples": [
            [
              "[1 Ik] [2 blijf] thuis [c omdat] ik de keuken [e opruim].",
              "I'm staying home because I'm tidying the kitchen."
            ]
          ]
        },
        {
          "id": "2b",
          "rule": "heel",
          "title": "Na een modaal: hele infinitief",
          "note": "After a modal the separable verb is an infinitive at the end of the clause, written as one word: moet opbellen. Splitting it there is the mirror error.",
          "examples": [
            [
              "[1 Ik] [2 moet] je vanavond [g opbellen].",
              "I have to call you tonight."
            ],
            [
              "[1 We] [2 willen] het kind om vier uur [g ophalen].",
              "We want to pick the child up at four."
            ],
            [
              "[1 Hij] [2 kan] de deur niet [g openmaken].",
              "He can't open the door."
            ]
          ]
        },
        {
          "id": "3a",
          "rule": "wig",
          "title": "Voltooid deelwoord: ge- ertussen",
          "note": "A separable verb has a seam and ge- slides into it: op + ge + beld. Putting it in front, 'geopbeld', is the slip. No seam, no wedge: besproken.",
          "points": [
            "Build the participle from the split verb, not from the whole one: take op | bellen, drop ge- into the seam, and you have opgebeld.",
            "So this is the one participle whose ge- is not at the front of the word.",
            "It only applies where there is a seam. bespreken has none, so it takes no ge- at all: besproken, not gebesproken."
          ],
          "examples": [
            [
              "[1 Ik] [2 heb] je gisteren [g opgebeld].",
              "I called you yesterday."
            ],
            [
              "[1 Ze] [2 heeft] de keuken al [g opgeruimd].",
              "She has already tidied the kitchen."
            ],
            [
              "[1 We] [2 zijn] om acht uur [g aangekomen].",
              "We arrived at eight."
            ]
          ]
        },
        {
          "id": "3b",
          "rule": "wig",
          "title": "op te bellen",
          "note": "te wedges into the seam of a separable verb: op te bellen, never te opbellen. No seam, no wedge: te bespreken. After a modal there is no te at all.",
          "points": [
            "te behaves exactly like ge-: into the seam between prefix and stem, not in front of the word.",
            "The difference is that te is written as its own word, so the verb ends up in three pieces: op te bellen.",
            "Which shape you need is decided by the verb in front, not by the separable verb itself: moeten takes none, proberen and vergeten take te."
          ],
          "compare": {
            "labelA": "na een modaal",
            "labelB": "met te",
            "pairs": [
              [
                "[1 Ik] [2 moet] je vanavond [g opbellen].",
                "[1 Ik] [2 probeer] je vanavond [s op] [t te] [g bellen].",
                "I have to call you tonight. / I'm trying to call you tonight."
              ],
              [
                "[1 Ik] [2 moet] altijd de deur [g afsluiten].",
                "[1 Ik] [2 vergeet] altijd de deur [s af] [t te] [g sluiten].",
                "I always have to lock the door. / I always forget to lock the door."
              ]
            ]
          },
          "examples": [
            [
              "[1 Ze] [2 komt] langs [c om] ons [s op] [t te] [g halen].",
              "She's coming by to pick us up."
            ]
          ]
        },
        {
          "id": "3c",
          "rule": "wig",
          "drill": false,
          "title": "Geen naad, geen wig",
          "note": "A verb whose prefix cannot leave has no seam, so nothing wedges into it: te bespreken and besproken, never be te spreken or gebesproken.",
          "points": [
            "One property decides everything above: whether the prefix is a piece that can leave. op can, be- cannot.",
            "A verb with no seam is treated like any plain verb: te stands in front, and the participle takes no ge- at all.",
            "The trap is that bespreken reads as be + spreken, and spreken on its own really does give gesproken. But bespreken is not two pieces, so there is nothing to wedge into."
          ],
          "compare": {
            "labelA": "met naad",
            "labelB": "zonder naad",
            "pairs": [
              [
                "[1 Ik] [2 probeer] je [s op] [t te] [g bellen].",
                "[1 Ik] [2 probeer] het [t te] [g bespreken].",
                "I'm trying to call you. / I'm trying to discuss it."
              ],
              [
                "[1 Ik] [2 heb] je [g opgebeld].",
                "[1 Ik] [2 heb] het [g besproken].",
                "I called you. / I discussed it."
              ]
            ]
          }
        }
      ],
      "cards": [
        {
          "type": "produce",
          "case": "1a",
          "level": 1,
          "front": "I'll call you tonight.",
          "back": "[1 Ik] [2 bel] je vanavond [s op]."
        },
        {
          "type": "errorfix",
          "case": "1a",
          "level": 1,
          "front": "Ik opbel je vanavond.",
          "back": "[1 Ik] [2 bel] je vanavond [s op]."
        },
        {
          "type": "produce",
          "case": "1a",
          "level": 1,
          "front": "He gets up early every day.",
          "back": "[1 Hij] [2 staat] elke dag vroeg [s op]."
        },
        {
          "type": "produce",
          "case": "1b",
          "level": 1,
          "front": "I'll tidy my room tomorrow after breakfast.",
          "back": "[1 Ik] [2 ruim] mijn kamer morgen na het ontbijt [s op]."
        },
        {
          "type": "errorfix",
          "case": "1b",
          "level": 1,
          "front": "Ik schrijf op het adres van de dokter.",
          "back": "[1 Ik] [2 schrijf] het adres van de dokter [s op]."
        },
        {
          "type": "transform",
          "case": "1c",
          "level": 1,
          "op": "zet 'morgen' vooraan",
          "front": "Ik haal je morgen van het station op.",
          "back": "[1 Morgen] [2 haal] ik je van het station [s op]."
        },
        {
          "type": "transform",
          "case": "1c",
          "level": 1,
          "op": "begin met 'vanavond'",
          "front": "Ik bel mijn moeder vanavond op.",
          "back": "[1 Vanavond] [2 bel] ik mijn moeder [s op]."
        },
        {
          "type": "errorfix",
          "case": "1c",
          "level": 1,
          "front": "Vanavond op bel ik mijn moeder.",
          "back": "[1 Vanavond] [2 bel] ik mijn moeder [s op]."
        },
        {
          "type": "transform",
          "case": "2a",
          "level": 2,
          "op": "begin met 'Hij zegt dat…'",
          "front": "Ik bel je vanavond op.",
          "back": "[1 Hij] [2 zegt] [c dat] ik je vanavond [e opbel]."
        },
        {
          "type": "errorfix",
          "case": "2a",
          "level": 2,
          "front": "Ze weet dat we na het eten wassen af.",
          "back": "[1 Ze] [2 weet] [c dat] we na het eten [e afwassen]."
        },
        {
          "type": "produce",
          "case": "2a",
          "level": 2,
          "front": "I'm staying home because I'm tidying the kitchen.",
          "back": "[1 Ik] [2 blijf] thuis [c omdat] ik de keuken [e opruim]."
        },
        {
          "type": "produce",
          "case": "2b",
          "level": 2,
          "front": "I have to call you tonight.",
          "back": "[1 Ik] [2 moet] je vanavond [g opbellen]."
        },
        {
          "type": "errorfix",
          "case": "2b",
          "level": 2,
          "front": "Ik moet je vanavond bel op.",
          "back": "[1 Ik] [2 moet] je vanavond [g opbellen]."
        },
        {
          "type": "produce",
          "case": "2b",
          "level": 2,
          "front": "He can't open the door.",
          "back": "[1 Hij] [2 kan] de deur niet [g openmaken]."
        },
        {
          "type": "produce",
          "case": "3a",
          "level": 3,
          "front": "I called you yesterday.",
          "back": "[1 Ik] [2 heb] je gisteren [g opgebeld]."
        },
        {
          "type": "errorfix",
          "case": "3a",
          "level": 3,
          "front": "Ik heb je gisteren geopbeld.",
          "back": "[1 Ik] [2 heb] je gisteren [g opgebeld]."
        },
        {
          "type": "transform",
          "case": "3a",
          "level": 3,
          "op": "perfectum",
          "front": "Ze ruimt de keuken op.",
          "back": "[1 Ze] [2 heeft] de keuken [g opgeruimd]."
        },
        {
          "type": "transform",
          "case": "3b",
          "level": 3,
          "op": "met 'proberen'",
          "front": "Ik moet je vanavond opbellen.",
          "back": "[1 Ik] [2 probeer] je vanavond [s op] [t te] [g bellen]."
        },
        {
          "type": "errorfix",
          "case": "3b",
          "level": 3,
          "front": "Ik vergeet altijd de deur te afsluiten.",
          "back": "[1 Ik] [2 vergeet] altijd de deur [s af] [t te] [g sluiten]."
        },
        {
          "type": "produce",
          "case": "3b",
          "level": 3,
          "front": "She's coming by to pick us up.",
          "back": "[1 Ze] [2 komt] langs [c om] ons [s op] [t te] [g halen]."
        }
      ]
    },
    "te-of-geen-te": {
      "rules": [
        {
          "id": "kaal",
          "title": "Geen te: de korte lijst",
          "intro": "Dutch puts te in front of an infinitive by default. A short, closed list of verbs does not: the modals, gaan, komen, blijven, laten, and the perception verbs zien and horen. Learn that list and te takes care of itself."
        },
        {
          "id": "wel",
          "title": "Wel te: al de rest",
          "intro": "Every verb outside that list takes te before the infinitive, and te sits at the very end of the clause, immediately in front of it. If you cannot place a verb on the short list, te is the safe default."
        },
        {
          "id": "omte",
          "title": "om ... te",
          "intro": "When the infinitive says WHY something is done, Dutch marks that clause twice: om at the front, te before the infinitive. English does the same job with a bare 'to', which is why the om goes missing."
        }
      ],
      "cases": [
        {
          "id": "1a",
          "rule": "kaal",
          "title": "Na een modaal",
          "note": "Modals take a bare infinitive: moet werken, never 'moet te werken'. English and French agree here, so this half of the list costs you nothing.",
          "compare": {
            "labelA": "geen te",
            "labelB": "wel te",
            "pairs": [
              [
                "[1 Ik] [2 moet] vanavond [g werken].",
                "[1 Ik] [2 probeer] vanavond [t te] [g werken].",
                "I have to work tonight. / I'm trying to work tonight."
              ],
              [
                "[1 We] [2 kunnen] om acht uur [g beginnen].",
                "[1 We] [2 hopen] om acht uur [t te] [g beginnen].",
                "We can start at eight. / We hope to start at eight."
              ]
            ]
          }
        },
        {
          "id": "1b",
          "rule": "kaal",
          "title": "Na gaan, komen, blijven",
          "note": "gaan, komen and blijven take a bare infinitive too. English wants -ing here ('go swimming'), so this is the one spot on the list that does not transfer.",
          "examples": [
            [
              "[1 Ik] [2 ga] elke week [g zwemmen].",
              "I go swimming every week."
            ],
            [
              "[1 Ze] [2 komt] vanavond [g eten].",
              "She's coming to eat tonight."
            ],
            [
              "[1 Hij] [2 blijft] voor de deur [g staan].",
              "He stops in front of the door."
            ]
          ]
        },
        {
          "id": "1c",
          "rule": "kaal",
          "title": "Na laten, zien, horen",
          "note": "laten, zien and horen take a bare infinitive with the object in between: ik hoor haar zingen. English does exactly the same, so trust it.",
          "examples": [
            [
              "[1 Ik] [2 hoor] haar [g zingen].",
              "I hear her singing."
            ],
            [
              "[1 We] [2 zien] de trein [g komen].",
              "We see the train coming."
            ],
            [
              "[1 Hij] [2 laat] me altijd [g wachten].",
              "He always makes me wait."
            ]
          ]
        },
        {
          "id": "2a",
          "rule": "wel",
          "title": "De rest krijgt te",
          "note": "proberen, hopen, vergeten and beginnen are ordinary verbs, so they take te. If a verb is not on the short list, te is the safe default.",
          "examples": [
            [
              "[1 Ik] [2 probeer] je [t te] [g bellen].",
              "I'm trying to call you."
            ],
            [
              "[1 Hij] [2 vergeet] altijd de rekening [t te] [g betalen].",
              "He always forgets to pay the bill."
            ],
            [
              "[1 We] [2 beginnen] om acht uur [t te] [g koken].",
              "We start cooking at eight."
            ]
          ]
        },
        {
          "id": "2b",
          "rule": "wel",
          "title": "te staat vlak voor de infinitief",
          "note": "te and its infinitive close the clause: everything else is said first. 'Ik hoop te zien je morgen' places them far too early.",
          "points": [
            "This is the eindgroep from lesson 1 again, with te glued to the front of the infinitive: the pair travels to the end together.",
            "So the longer the sentence, the further te travels. Say the whole middle first, then te + infinitive.",
            "The bracket shows it: it always closes on the infinitive, never on te."
          ],
          "examples": [
            [
              "[1 Ik] [2 hoop] je morgen in de stad [t te] [g zien].",
              "I hope to see you in town tomorrow."
            ],
            [
              "[1 Ze] [2 probeert] de trein van acht uur nog [t te] [g halen].",
              "She's still trying to catch the eight o'clock train."
            ],
            [
              "[1 We] [2 vergeten] elke week de keuken [t te] [g poetsen].",
              "We forget to clean the kitchen every week."
            ]
          ]
        },
        {
          "id": "2c",
          "rule": "wel",
          "title": "Hij zit te lezen",
          "note": "zitten, staan and liggen + te say an action is ongoing: hij zit te lezen = he is reading. English has no counterpart, so it is drilled by transformation only.",
          "points": [
            "The posture verb is not literal. 'Hij zit te lezen' says he is reading; the sitting is almost beside the point.",
            "It is one of the ways Dutch says what English says with -ing, so you will hear it constantly.",
            "The te is obligatory, which is what puts this in a grammar lesson rather than in a vocabulary list."
          ],
          "examples": [
            [
              "[1 Hij] [2 zit] in de tuin [t te] [g lezen].",
              "He's reading in the garden."
            ],
            [
              "[1 Ze] [2 staat] in de keuken [t te] [g koken].",
              "She's cooking in the kitchen."
            ],
            [
              "[1 De kinderen] [2 liggen] boven [t te] [g slapen].",
              "The children are asleep upstairs."
            ]
          ]
        },
        {
          "id": "2d",
          "rule": "wel",
          "title": "hoeven lijkt een modaal",
          "note": "hoeven behaves like a modal in meaning but takes te: 'je hoeft niet te komen'. It is the one verb the short list will tempt you to get wrong.",
          "points": [
            "hoeven almost always turns up with niet or geen: it is the negative counterpart of moeten.",
            "What that negation means, and how it differs from 'moeten niet', is lesson 9's job. Here it is only the form: hoeven takes te."
          ],
          "compare": {
            "labelA": "modaal: geen te",
            "labelB": "hoeven: wel te",
            "pairs": [
              [
                "[1 Je] [2 moet] morgen [g komen].",
                "[1 Je] [2 hoeft] morgen niet [t te] [g komen].",
                "You have to come tomorrow. / You don't have to come tomorrow."
              ],
              [
                "[1 We] [2 moeten] de rekening [g betalen].",
                "[1 We] [2 hoeven] de rekening niet [t te] [g betalen].",
                "We have to pay the bill. / We don't have to pay the bill."
              ]
            ]
          }
        },
        {
          "id": "3a",
          "rule": "omte",
          "title": "om ... te = doel",
          "note": "A purpose clause needs both halves: om ... te. English says 'to do the shopping' with one word, so om is the half that gets dropped.",
          "examples": [
            [
              "[1 Ik] [2 ga] naar de stad [c om] boodschappen [t te] [g doen].",
              "I'm going to town to do the shopping."
            ],
            [
              "[1 Ze] [2 belt] [c om] de afspraak [t te] [g bespreken].",
              "She's calling to discuss the appointment."
            ],
            [
              "[1 We] [2 komen] vroeg [c om] jullie [t te] [g helpen].",
              "We're coming early to help you."
            ]
          ]
        },
        {
          "id": "3b",
          "rule": "omte",
          "title": "Geen doel, geen om",
          "note": "om marks purpose, not a complement. 'Ik probeer je te bellen' is WHAT you try; 'Ik bel je om het uit te leggen' is WHY you call.",
          "compare": {
            "labelA": "wat je probeert",
            "labelB": "waarom je belt",
            "pairs": [
              [
                "[1 Ik] [2 probeer] je [t te] [g bellen].",
                "[1 Ik] [2 bel] je [c om] het [s uit] [t te] [g leggen].",
                "I'm trying to call you. / I'm calling you to explain it."
              ],
              [
                "[1 We] [2 hopen] je [t te] [g zien].",
                "[1 We] [2 komen] [c om] je [t te] [g zien].",
                "We hope to see you. / We're coming to see you."
              ]
            ]
          }
        },
        {
          "id": "3c",
          "rule": "omte",
          "drill": false,
          "title": "om na proberen: allebei correct",
          "note": "In Belgium 'Ik probeer om je te bellen' is normal and correct; the Netherlands standard leaves the om out. Both are Dutch, so no card here could have one answer.",
          "points": [
            "Purpose always needs om. What varies is only the complement case: after proberen, beginnen and a few others, Belgian Dutch adds an om that Netherlands standard leaves out.",
            "Produce the short form, 'Ik probeer je te bellen'. It is correct everywhere, Belgium included.",
            "Recognise the long form, because in Flanders you will hear it constantly and it is not a mistake.",
            "This is why the case carries no cards: with two correct answers, self-marking has nothing to mark against."
          ],
          "compare": {
            "labelA": "Nederland",
            "labelB": "België",
            "pairs": [
              [
                "[1 Ik] [2 probeer] je vanavond [t te] [g bellen].",
                "[1 Ik] [2 probeer] [c om] je vanavond [t te] [g bellen].",
                "I'm trying to call you tonight."
              ],
              [
                "[1 We] [2 beginnen] de keuken [t te] [g poetsen].",
                "[1 We] [2 beginnen] [c om] de keuken [t te] [g poetsen].",
                "We're starting to clean the kitchen."
              ]
            ]
          }
        }
      ],
      "cards": [
        {
          "type": "choice",
          "case": "1a",
          "level": 1,
          "options": [
            "te",
            "geen te"
          ],
          "front": "Ik moet vanavond ___ werken.",
          "back": "[1 Ik] [2 moet] vanavond [g werken]."
        },
        {
          "type": "errorfix",
          "case": "1a",
          "level": 1,
          "front": "Ik moet vanavond te werken.",
          "back": "[1 Ik] [2 moet] vanavond [g werken]."
        },
        {
          "type": "produce",
          "case": "1a",
          "level": 1,
          "front": "We can start at eight.",
          "back": "[1 We] [2 kunnen] om acht uur [g beginnen]."
        },
        {
          "type": "produce",
          "case": "1b",
          "level": 1,
          "front": "I go swimming every week.",
          "back": "[1 Ik] [2 ga] elke week [g zwemmen]."
        },
        {
          "type": "errorfix",
          "case": "1b",
          "level": 1,
          "front": "Ze komt vanavond te eten.",
          "back": "[1 Ze] [2 komt] vanavond [g eten]."
        },
        {
          "type": "produce",
          "case": "1c",
          "level": 1,
          "front": "I hear her singing.",
          "back": "[1 Ik] [2 hoor] haar [g zingen]."
        },
        {
          "type": "produce",
          "case": "1c",
          "level": 1,
          "front": "He always makes me wait.",
          "back": "[1 Hij] [2 laat] me altijd [g wachten]."
        },
        {
          "type": "produce",
          "case": "2a",
          "level": 2,
          "front": "I'm trying to call you.",
          "back": "[1 Ik] [2 probeer] je [t te] [g bellen]."
        },
        {
          "type": "errorfix",
          "case": "2a",
          "level": 2,
          "front": "We beginnen om acht uur koken.",
          "back": "[1 We] [2 beginnen] om acht uur [t te] [g koken]."
        },
        {
          "type": "choice",
          "case": "2a",
          "level": 2,
          "options": [
            "te",
            "geen te"
          ],
          "front": "Hij vergeet altijd de rekening ___ betalen.",
          "back": "[1 Hij] [2 vergeet] altijd de rekening [t te] [g betalen]."
        },
        {
          "type": "produce",
          "case": "2b",
          "level": 2,
          "front": "I hope to see you in town tomorrow.",
          "back": "[1 Ik] [2 hoop] je morgen in de stad [t te] [g zien]."
        },
        {
          "type": "errorfix",
          "case": "2b",
          "level": 2,
          "front": "Ik hoop te zien je morgen in de stad.",
          "back": "[1 Ik] [2 hoop] je morgen in de stad [t te] [g zien]."
        },
        {
          "type": "transform",
          "case": "2b",
          "level": 2,
          "op": "met 'proberen'",
          "front": "Ze haalt de trein van acht uur nog.",
          "back": "[1 Ze] [2 probeert] de trein van acht uur nog [t te] [g halen]."
        },
        {
          "type": "transform",
          "case": "2c",
          "level": 2,
          "op": "met 'zitten te'",
          "front": "Hij leest in de tuin.",
          "back": "[1 Hij] [2 zit] in de tuin [t te] [g lezen]."
        },
        {
          "type": "transform",
          "case": "2c",
          "level": 2,
          "op": "met 'staan te'",
          "front": "Ze kookt in de keuken.",
          "back": "[1 Ze] [2 staat] in de keuken [t te] [g koken]."
        },
        {
          "type": "errorfix",
          "case": "2c",
          "level": 2,
          "front": "Hij zit in de tuin lezen.",
          "back": "[1 Hij] [2 zit] in de tuin [t te] [g lezen]."
        },
        {
          "type": "produce",
          "case": "2d",
          "level": 2,
          "front": "You don't have to come tomorrow.",
          "back": "[1 Je] [2 hoeft] morgen niet [t te] [g komen]."
        },
        {
          "type": "errorfix",
          "case": "2d",
          "level": 2,
          "front": "We hoeven de rekening niet betalen.",
          "back": "[1 We] [2 hoeven] de rekening niet [t te] [g betalen]."
        },
        {
          "type": "produce",
          "case": "3a",
          "level": 3,
          "front": "I'm going to town to do the shopping.",
          "back": "[1 Ik] [2 ga] naar de stad [c om] boodschappen [t te] [g doen]."
        },
        {
          "type": "errorfix",
          "case": "3a",
          "level": 3,
          "front": "Ik ga naar de stad boodschappen te doen.",
          "back": "[1 Ik] [2 ga] naar de stad [c om] boodschappen [t te] [g doen]."
        },
        {
          "type": "produce",
          "case": "3a",
          "level": 3,
          "front": "We're coming early to help you.",
          "back": "[1 We] [2 komen] vroeg [c om] jullie [t te] [g helpen]."
        },
        {
          "type": "transform",
          "case": "3b",
          "level": 3,
          "op": "maak er één zin van met 'om'",
          "front": "Ik bel je. Ik wil het uitleggen.",
          "back": "[1 Ik] [2 bel] je [c om] het [s uit] [t te] [g leggen]."
        },
        {
          "type": "produce",
          "case": "3b",
          "level": 3,
          "front": "We hope to see you.",
          "back": "[1 We] [2 hopen] je [t te] [g zien]."
        },
        {
          "type": "produce",
          "case": "3b",
          "level": 3,
          "front": "We're coming to see you.",
          "back": "[1 We] [2 komen] [c om] je [t te] [g zien]."
        }
      ]
    }
  }
};
