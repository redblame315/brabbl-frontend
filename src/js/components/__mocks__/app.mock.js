export const initialState = {
    app: {
      view: 'list',
      articleId: '123',
      loading: true,
      isDiscussed: false,
      tags: [],
      discussionFilter: null,
    },
    discussion_list: [],
    discussions: [],
    tags: [],
    discussion: null,
    user: null,
    customer: {},
    modal: {
      modal: null,
      hidden: true,
      data: {},
    },
    alert: {
      hidden: true,
      data: {},
    },
    notification: {
      message: '',
    },
  };
  
  export const adminUser = {
    username: 'admin-user',
    permissions: ['add_discussion', 'change_discussion', 'add_discussionlist', 'change_discussionlist'],
  };
  export const wording = [
    {
      "id": 9,
      "words": [
        {
          "name": "Etwas mehr Risiken",
          "value": -1
        },
        {
          "name": "Hält sich die Waage",
          "value": 0
        },
        {
          "name": "Etwas mehr Chancen",
          "value": 1
        },
        {
          "name": "Mehr Chancen",
          "value": 2
        },
        {
          "name": "Deutlich mehr Chancen",
          "value": 3
        },
        {
          "name": "Mehr Risiken",
          "value": -2
        },
        {
          "name": "Deutlich mehr Risiken",
          "value": -3
        }
      ],
      "name": "Chancen/Risiken",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "RISIKEN",
      "list_header_pro": "CHANCEN",
      "header_contra": "Risiko",
      "header_pro": "Chance",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues \"Risiko\"-Argument schreiben",
      "button_new_pro": "Neues \"Chance\"-Argument schreiben",
      "survey_statement": "Antwort",
      "survey_statements": "Antworten",
      "survey_add_answer_button_top": "Neue Antwort",
      "survey_add_answer_button_bottom": "Neue Antwort schreiben",
      "reply_counter": "Antwort",
      "reply_counter_plural": "Antworten",
      "statement_header": "Antwort",
      "statement_list_header": "Antwort"
    },
    {
      "id": 18,
      "words": [
        {
          "name": "No way",
          "value": -3
        },
        {
          "name": "I am not convinced",
          "value": -2
        },
        {
          "name": "I have my doubts",
          "value": -1
        },
        {
          "name": "Neutral",
          "value": 0
        },
        {
          "name": "ok",
          "value": 1
        },
        {
          "name": "I like it",
          "value": 2
        },
        {
          "name": "That's great",
          "value": 3
        }
      ],
      "name": "English - Advantages",
      "description": "",
      "rating_1": "very poor",
      "rating_2": "poor",
      "rating_3": "ok",
      "rating_4": "good",
      "rating_5": "very good",
      "list_header_contra": "Disadvantages",
      "list_header_pro": "Advantages",
      "header_contra": "Disadvantage",
      "header_pro": "Advantage",
      "button_short_new_contra": "Add a 'disadvantage'",
      "button_short_new_pro": "Add an 'advantage'",
      "button_new_contra": "Add a 'disadvantage'",
      "button_new_pro": "Add an 'advantage'",
      "survey_statement": "Answer",
      "survey_statements": "Answers",
      "survey_add_answer_button_top": "Write new answer",
      "survey_add_answer_button_bottom": "Write new answer",
      "reply_counter": "Reaction",
      "reply_counter_plural": "Reactions",
      "statement_header": "",
      "statement_list_header": ""
    },
    {
      "id": 19,
      "words": [
        {
          "name": "Neutral",
          "value": 0
        },
        {
          "name": "No way!",
          "value": -3
        },
        {
          "name": "I don't think so",
          "value": -2
        },
        {
          "name": "I am not convinced",
          "value": -1
        },
        {
          "name": "I kind of agree",
          "value": 1
        },
        {
          "name": "Yes",
          "value": 2
        },
        {
          "name": "I totally agree!",
          "value": 3
        }
      ],
      "name": "English - Advantages - Ideas",
      "description": "",
      "rating_1": "irrelevant",
      "rating_2": "poor argument",
      "rating_3": "ok",
      "rating_4": "good point",
      "rating_5": "very good point",
      "list_header_contra": "Disadvantages",
      "list_header_pro": "Advantages",
      "header_contra": "Disadvantage",
      "header_pro": "Advantage",
      "button_short_new_contra": "Add a 'disadvantage'",
      "button_short_new_pro": "Add an 'advantage'",
      "button_new_contra": "Add a 'disadvantage'",
      "button_new_pro": "Add an 'advantage'",
      "survey_statement": "Idea",
      "survey_statements": "Ideas",
      "survey_add_answer_button_top": "Add new idea",
      "survey_add_answer_button_bottom": "Add new idea",
      "reply_counter": "Reply",
      "reply_counter_plural": "Replies",
      "statement_header": "Idea",
      "statement_list_header": "Ideas"
    },
    {
      "id": 20,
      "words": [
        {
          "name": "No way",
          "value": -3
        },
        {
          "name": "I am not convinced",
          "value": -2
        },
        {
          "name": "I have my doubts",
          "value": -1
        },
        {
          "name": "I don't care",
          "value": 0
        },
        {
          "name": "I kind of agree",
          "value": 1
        },
        {
          "name": "I agree",
          "value": 2
        },
        {
          "name": "I totally agree!",
          "value": 3
        }
      ],
      "name": "English - Degrees of Agreement - Ideas",
      "description": "",
      "rating_1": "irrelevant",
      "rating_2": "doubtful",
      "rating_3": "ok",
      "rating_4": "good point",
      "rating_5": "very good point",
      "list_header_contra": "CONTRA",
      "list_header_pro": "PRO",
      "header_contra": "Contra",
      "header_pro": "Pro",
      "button_short_new_contra": "Add 'contra' argument",
      "button_short_new_pro": "Add 'pro' argument",
      "button_new_contra": "Add 'contra' argument",
      "button_new_pro": "Add 'pro' argument",
      "survey_statement": "Idea",
      "survey_statements": "Ideas",
      "survey_add_answer_button_top": "Add new idea",
      "survey_add_answer_button_bottom": "Add new idea",
      "reply_counter": "Reply",
      "reply_counter_plural": "Replies",
      "statement_header": "Idea",
      "statement_list_header": "Ideas"
    },
    {
      "id": 13,
      "words": [
        {
          "name": "Nicht gut",
          "value": -2
        },
        {
          "name": "Gut",
          "value": 2
        },
        {
          "name": "Sehr gut!",
          "value": 3
        },
        {
          "name": "Gar nicht gut!",
          "value": -3
        },
        {
          "name": "Weniger gut",
          "value": -1
        },
        {
          "name": "Eher gut",
          "value": 1
        },
        {
          "name": "So mittel...",
          "value": 0
        }
      ],
      "name": "Gut - Nicht gut/ Vorschläge",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Nicht gut",
      "list_header_pro": "Gut",
      "header_contra": "Nicht gut",
      "header_pro": "Gut",
      "button_short_new_contra": "Neuer \"Nicht gut\"-Beitrag",
      "button_short_new_pro": "Neuer \"Gut\"-Beitrag",
      "button_new_contra": "Neuer \"Nicht gut\"-Beitrag",
      "button_new_pro": "Neuer \"Gut\"-Beitrag",
      "survey_statement": "Vorschlag",
      "survey_statements": "Vorschläge",
      "survey_add_answer_button_top": "Neuer Vorschlag",
      "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
      "reply_counter": "Reaktion",
      "reply_counter_plural": "Reaktionen",
      "statement_header": "Vorschlag",
      "statement_list_header": "Vorschläge"
    },
    {
      "id": 12,
      "words": [
        {
          "name": "Nein",
          "value": -2
        },
        {
          "name": "Ja",
          "value": 2
        },
        {
          "name": "Ja, unbedingt!",
          "value": 3
        },
        {
          "name": "Nein, auf keinen Fall!",
          "value": -3
        },
        {
          "name": "Eher Nein",
          "value": -1
        },
        {
          "name": "Eher Ja",
          "value": 1
        },
        {
          "name": "Weiß nicht...",
          "value": 0
        }
      ],
      "name": "Ja-Nein / Pro-Contra / Vorschläge",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Contra",
      "list_header_pro": "Pro",
      "header_contra": "Contra Argument",
      "header_pro": "Pro Argument",
      "button_short_new_contra": "Neues Contra Argument",
      "button_short_new_pro": "Neues Pro Argument",
      "button_new_contra": "Neues Contra Argument",
      "button_new_pro": "Neues Pro Argument",
      "survey_statement": "Vorschlag",
      "survey_statements": "Vorschläge",
      "survey_add_answer_button_top": "Neuer Vorschlag",
      "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
      "reply_counter": "Reaktion",
      "reply_counter_plural": "Reaktionen",
      "statement_header": "Vorschlag",
      "statement_list_header": "Vorschlag"
    },
    {
      "id": 11,
      "words": [
        {
          "name": "Nein",
          "value": -2
        },
        {
          "name": "eher Nein",
          "value": -1
        },
        {
          "name": "eher Ja",
          "value": 1
        },
        {
          "name": "Ja",
          "value": 2
        },
        {
          "name": "Ja, unbedingt!",
          "value": 3
        },
        {
          "name": "Nein, auf keinen Fall!",
          "value": -3
        },
        {
          "name": "weiß nicht",
          "value": 0
        }
      ],
      "name": "Ja-Nein / Vorteile-Nachteile / Vorschläge",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Nachteile",
      "list_header_pro": "Vorteile",
      "header_contra": "Nachteil",
      "header_pro": "Vorteil",
      "button_short_new_contra": "Weiterer Nachteil",
      "button_short_new_pro": "Weiterer Vorteil",
      "button_new_contra": "Neuen Nachteil hinzufügen",
      "button_new_pro": "Neuen Vorteil hinzufügen",
      "survey_statement": "Vorschlag",
      "survey_statements": "Vorschläge",
      "survey_add_answer_button_top": "Neuer Vorschlag",
      "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
      "reply_counter": "Reaktion",
      "reply_counter_plural": "Reaktionen",
      "statement_header": "Vorschlag",
      "statement_list_header": "Vorschlag"
    },
    {
      "id": 21,
      "words": [
        {
          "name": "stimme nicht zu",
          "value": -2
        },
        {
          "name": "stimme eher zu",
          "value": 1
        },
        {
          "name": "stimme zu",
          "value": 2
        },
        {
          "name": "stimme voll zu",
          "value": 3
        },
        {
          "name": "stimme keinesfalls zu",
          "value": -3
        },
        {
          "name": "weiß nicht",
          "value": 0
        },
        {
          "name": "stimme eher nicht zu",
          "value": -1
        }
      ],
      "name": "Schule diskutiert - Fachdiskussionen",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Contra",
      "list_header_pro": "Pro",
      "header_contra": "Contra-Argument",
      "header_pro": "Pro-Argument",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues Contra-Argument schreiben",
      "button_new_pro": "Neues Pro-Argument schreiben",
      "survey_statement": "Diskussion",
      "survey_statements": "Diskussionen",
      "survey_add_answer_button_top": "Neue Diskussion",
      "survey_add_answer_button_bottom": "Neue Diskussion hinzufügen",
      "reply_counter": "Reaktion",
      "reply_counter_plural": "Reaktionen",
      "statement_header": "Thema",
      "statement_list_header": "Thema"
    },
    {
      "id": 6,
      "words": [
        {
          "name": "Eher Verlust",
          "value": -1
        },
        {
          "name": "Hält sich die Waage.",
          "value": 0
        },
        {
          "name": "Eher Gewinn",
          "value": 1
        },
        {
          "name": "Gewinn",
          "value": 2
        },
        {
          "name": "Großer Gewinn!",
          "value": 3
        },
        {
          "name": "Verlust",
          "value": -2
        },
        {
          "name": "Großer Verlust!",
          "value": -3
        }
      ],
      "name": "Verlust - Gewinn",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Verlust",
      "list_header_pro": "Gewinn",
      "header_contra": "Verlust",
      "header_pro": "Gewinn",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues \"Verlust\"-Argument schreiben",
      "button_new_pro": "Neues \"Gewinn\"-Argument schreiben",
      "survey_statement": "Antwort",
      "survey_statements": "Antworten",
      "survey_add_answer_button_top": "Neue Antwort",
      "survey_add_answer_button_bottom": "Neue Antwort schreiben",
      "reply_counter": "Antwort",
      "reply_counter_plural": "Antworten",
      "statement_header": "Antwort",
      "statement_list_header": "Antwort"
    },
    {
      "id": 3,
      "words": [
        {
          "name": "sehr unwahrscheinlich",
          "value": -3
        },
        {
          "name": "unwahrscheinlich",
          "value": -2
        },
        {
          "name": "eher nicht",
          "value": -1
        },
        {
          "name": "weiß nicht",
          "value": 0
        },
        {
          "name": "vielleicht",
          "value": 1
        },
        {
          "name": "wahrscheinlich",
          "value": 2
        },
        {
          "name": "sehr wahrscheinlich",
          "value": 3
        }
      ],
      "name": "Wahrscheinlichkeitsbarometer",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "CONTRA",
      "list_header_pro": "PRO",
      "header_contra": "Contra-Argument",
      "header_pro": "Pro-Argument",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues Contra-Argument schreiben",
      "button_new_pro": "Neues Pro-Argument schreiben",
      "survey_statement": "Antwort",
      "survey_statements": "Antworten",
      "survey_add_answer_button_top": "Neue Antwort",
      "survey_add_answer_button_bottom": "Neue Antwort schreiben",
      "reply_counter": "Antwort",
      "reply_counter_plural": "Antworten",
      "statement_header": "Antwort",
      "statement_list_header": "Antwort"
    },
    {
      "id": 8,
      "words": [
        {
          "name": "stimme eher nicht zu",
          "value": -1
        },
        {
          "name": "weiß nicht",
          "value": 0
        },
        {
          "name": "stimme eher zu",
          "value": 1
        },
        {
          "name": "stimme zu",
          "value": 2
        },
        {
          "name": "stimme voll zu",
          "value": 3
        },
        {
          "name": "stimme nicht zu",
          "value": -2
        },
        {
          "name": "stimme keinesfalls zu",
          "value": -3
        }
      ],
      "name": "Zustimmung (Chancen/Risiken)",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "RISIKEN",
      "list_header_pro": "CHANCEN",
      "header_contra": "Risiko",
      "header_pro": "Chance",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues \"Risiko\"-Argument schreiben",
      "button_new_pro": "Neues \"Chance\"-Argument schreiben",
      "survey_statement": "Antwort",
      "survey_statements": "Antworten",
      "survey_add_answer_button_top": "Neue Antwort",
      "survey_add_answer_button_bottom": "Neue Antwort schreiben",
      "reply_counter": "Antwort",
      "reply_counter_plural": "Antworten",
      "statement_header": "Antwort",
      "statement_list_header": "Antwort"
    },
    {
      "id": 7,
      "words": [
        {
          "name": "stimme eher nicht zu",
          "value": -1
        },
        {
          "name": "weiß nicht",
          "value": 0
        },
        {
          "name": "stimme eher zu",
          "value": 1
        },
        {
          "name": "stimme zu",
          "value": 2
        },
        {
          "name": "stimme voll zu",
          "value": 3
        },
        {
          "name": "stimme nicht zu",
          "value": -2
        },
        {
          "name": "stimme keinesfalls zu",
          "value": -3
        }
      ],
      "name": "Zustimmung (Vorteile/Nachteile) ",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "NACHTEILE",
      "list_header_pro": "VORTEILE",
      "header_contra": "Nachteil",
      "header_pro": "Vorteil",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues \"Nachteil\"-Argument schreiben",
      "button_new_pro": "Neues \"Vorteil\"-Argument schreiben",
      "survey_statement": "Antwort",
      "survey_statements": "Antworten",
      "survey_add_answer_button_top": "Neue Antwort",
      "survey_add_answer_button_bottom": "Neue Antwort schreiben",
      "reply_counter": "Antwort",
      "reply_counter_plural": "Antworten",
      "statement_header": "Antwort",
      "statement_list_header": "Antwort"
    },
    {
      "id": 10,
      "words": [
        {
          "name": "stimme nicht zu",
          "value": -2
        },
        {
          "name": "stimm eher nicht zu",
          "value": -1
        },
        {
          "name": "stimme eher zu",
          "value": 1
        },
        {
          "name": "stimme zu",
          "value": 2
        },
        {
          "name": "stimme voll zu",
          "value": 3
        },
        {
          "name": "stimme keinesfalls zu",
          "value": -3
        },
        {
          "name": "weiß nicht",
          "value": 0
        }
      ],
      "name": "Zustimmung / Vorschläge / Pro-Contra",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Contra",
      "list_header_pro": "Pro",
      "header_contra": "Contra-Argument",
      "header_pro": "Pro-Argument",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues Contra-Argument schreiben",
      "button_new_pro": "Neues Pro-Argument schreiben",
      "survey_statement": "Vorschlag",
      "survey_statements": "Vorschläge",
      "survey_add_answer_button_top": "Neuer Vorschlag",
      "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
      "reply_counter": "Reaktion",
      "reply_counter_plural": "Reaktionen",
      "statement_header": "Vorschlag",
      "statement_list_header": "Vorschlag"
    },
    {
      "id": 2,
      "words": [
        {
          "name": "stimme nicht zu",
          "value": -2
        },
        {
          "name": "stimm eher nicht zu",
          "value": -1
        },
        {
          "name": "stimme eher zu",
          "value": 1
        },
        {
          "name": "stimme zu",
          "value": 2
        },
        {
          "name": "stimme voll zu",
          "value": 3
        },
        {
          "name": "stimme keinesfalls zu",
          "value": -3
        },
        {
          "name": "weiß nicht",
          "value": 0
        }
      ],
      "name": "Zustimmungsbarometer",
      "description": "",
      "rating_1": "belanglos",
      "rating_2": "fragwürdig",
      "rating_3": "vertretbar",
      "rating_4": "relevant",
      "rating_5": "überzeugend",
      "list_header_contra": "Contra",
      "list_header_pro": "Pro",
      "header_contra": "Contra-Argument",
      "header_pro": "Pro-Argument",
      "button_short_new_contra": "Neues Argument",
      "button_short_new_pro": "Neues Argument",
      "button_new_contra": "Neues Contra-Argument schreiben",
      "button_new_pro": "Neues Pro-Argument schreiben",
      "survey_statement": "Antwort",
      "survey_statements": "Antworten",
      "survey_add_answer_button_top": "Neue Antwort",
      "survey_add_answer_button_bottom": "Neue Antwort schreiben",
      "reply_counter": "Antwort",
      "reply_counter_plural": "Antworten",
      "statement_header": "Antwort",
      "statement_list_header": "Antwort"
    },
    {
      "id": 4,
      "words": [
        {
          "name": "No way",
          "value": -3
        },
        {
          "name": "I am not convinced",
          "value": -2
        },
        {
          "name": "I have my doubts",
          "value": -1
        },
        {
          "name": "Neutral",
          "value": 0
        },
        {
          "name": "ok",
          "value": 1
        },
        {
          "name": "I like it",
          "value": 2
        },
        {
          "name": "That's great",
          "value": 3
        }
      ],
      "name": "english-default",
      "description": "",
      "rating_1": "very poor",
      "rating_2": "poor",
      "rating_3": "ok",
      "rating_4": "good",
      "rating_5": "very good",
      "list_header_contra": "CONTRA",
      "list_header_pro": "PRO",
      "header_contra": "Contra-Argument",
      "header_pro": "Pro-Argument",
      "button_short_new_contra": "Write new argument",
      "button_short_new_pro": "Write new argument",
      "button_new_contra": "Write new contra argument",
      "button_new_pro": "Write new pro argument",
      "survey_statement": "Answer",
      "survey_statements": "Answers",
      "survey_add_answer_button_top": "Write new answer",
      "survey_add_answer_button_bottom": "Write new answer",
      "reply_counter": "Reaction",
      "reply_counter_plural": "Reactions",
      "statement_header": "",
      "statement_list_header": ""
    }
  ]
  export const statement = {
    "id": 817,
    "discussion_id": "demo-discussion-1",
    "created_by": "dev3",
    "statement": "Let's add great animations on brabbl!",
    "description": "",
    "created_at": "2020-07-09T16:37:43.963275+02:00",
    "arguments": [],
    "barometer": {
      "count": 2,
      "rating": 0,
      "user_rating": -3,
      "count_ratings": {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 1,
        "-3": 1,
        "-2": 0,
        "-1": 0
      },
      "wording": [
        {
          "name": "No way",
          "value": -3
        },
        {
          "name": "I am not convinced",
          "value": -2
        },
        {
          "name": "I have my doubts",
          "value": -1
        },
        {
          "name": "Neutral",
          "value": 0
        },
        {
          "name": "ok",
          "value": 1
        },
        {
          "name": "I like it",
          "value": 2
        },
        {
          "name": "That's great",
          "value": 3
        }
      ]
    },
    "is_editable": true,
    "image": {
      "small": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.64x64_q85_crop.jpg",
      "medium": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.290x200_q85_crop.jpg",
      "big": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.750x518_q85_crop.jpg",
      "large": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.840x580_q85_crop.jpg",
      "original": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg"
    },
    "video": "",
    "thumbnail": "http://localhost:8000/media/images/statements/4b6c9c25-a83.jpg.300x206_q85_crop.jpg",
    "is_deletable": true,
    "status": 1,
    "author": {
      "display_name": "dev3",
      "image": {},
      "id": 1331,
      "username": "dev3+brabbl-dev-customer-1"
    },
    "pdfs": []
  }
  export const customer = {
    "language": "en",
    "default_back_link": "http://localhost:3000/list.html",
    "default_back_title": "Link to list (to be set in django admin)",
    "default_wording": 7,
    "default_has_replies": false,
    "notification_wording": 3,
    "user_info_settings": [
      {
        "key": "postcode",
        "show_in_profile": false,
        "show_in_welcome": false,
        "is_required": false
      },
      {
        "key": "country",
        "show_in_profile": false,
        "show_in_welcome": false,
        "is_required": false
      },
      {
        "key": "city",
        "show_in_profile": false,
        "show_in_welcome": false,
        "is_required": false
      },
      {
        "key": "organization",
        "show_in_profile": false,
        "show_in_welcome": false,
        "is_required": false
      },
      {
        "key": "position",
        "show_in_profile": false,
        "show_in_welcome": false,
        "is_required": false
      },
      {
        "key": "bundesland",
        "show_in_profile": false,
        "show_in_welcome": false,
        "is_required": false
      },
      {
        "key": "first_name",
        "show_in_profile": true,
        "show_in_welcome": true,
        "is_required": false
      },
      {
        "key": "last_name",
        "show_in_profile": true,
        "show_in_welcome": true,
        "is_required": false
      },
      {
        "key": "year_of_birth",
        "show_in_profile": true,
        "show_in_welcome": true,
        "is_required": false
      },
      {
        "key": "gender",
        "show_in_profile": true,
        "show_in_welcome": true,
        "is_required": false
      }
    ],
    "theme": "eyp",
    "displayed_username": 1,
    "data_policy_link": "https://brabbl.com/datenschutz/",
    "is_private": false,
    "invitations_pending": "",
    "public_customer_name": "",
    "customer_representative_name": "",
    "available_wordings": [
      {
        "id": 2,
        "words": [
          {
            "name": "stimme nicht zu",
            "value": -2
          },
          {
            "name": "stimm eher nicht zu",
            "value": -1
          },
          {
            "name": "stimme eher zu",
            "value": 1
          },
          {
            "name": "stimme zu",
            "value": 2
          },
          {
            "name": "stimme voll zu",
            "value": 3
          },
          {
            "name": "stimme keinesfalls zu",
            "value": -3
          },
          {
            "name": "weiß nicht",
            "value": 0
          }
        ],
        "name": "Zustimmungsbarometer",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Contra",
        "list_header_pro": "Pro",
        "header_contra": "Contra-Argument",
        "header_pro": "Pro-Argument",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues Contra-Argument schreiben",
        "button_new_pro": "Neues Pro-Argument schreiben",
        "survey_statement": "Antwort",
        "survey_statements": "Antworten",
        "survey_add_answer_button_top": "Neue Antwort",
        "survey_add_answer_button_bottom": "Neue Antwort schreiben",
        "reply_counter": "Antwort",
        "reply_counter_plural": "Antworten",
        "statement_header": "Antwort",
        "statement_list_header": "Antwort"
      },
      {
        "id": 3,
        "words": [
          {
            "name": "sehr unwahrscheinlich",
            "value": -3
          },
          {
            "name": "unwahrscheinlich",
            "value": -2
          },
          {
            "name": "eher nicht",
            "value": -1
          },
          {
            "name": "weiß nicht",
            "value": 0
          },
          {
            "name": "vielleicht",
            "value": 1
          },
          {
            "name": "wahrscheinlich",
            "value": 2
          },
          {
            "name": "sehr wahrscheinlich",
            "value": 3
          }
        ],
        "name": "Wahrscheinlichkeitsbarometer",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "CONTRA",
        "list_header_pro": "PRO",
        "header_contra": "Contra-Argument",
        "header_pro": "Pro-Argument",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues Contra-Argument schreiben",
        "button_new_pro": "Neues Pro-Argument schreiben",
        "survey_statement": "Antwort",
        "survey_statements": "Antworten",
        "survey_add_answer_button_top": "Neue Antwort",
        "survey_add_answer_button_bottom": "Neue Antwort schreiben",
        "reply_counter": "Antwort",
        "reply_counter_plural": "Antworten",
        "statement_header": "Antwort",
        "statement_list_header": "Antwort"
      },
      {
        "id": 4,
        "words": [
          {
            "name": "No way",
            "value": -3
          },
          {
            "name": "I am not convinced",
            "value": -2
          },
          {
            "name": "I have my doubts",
            "value": -1
          },
          {
            "name": "Neutral",
            "value": 0
          },
          {
            "name": "ok",
            "value": 1
          },
          {
            "name": "I like it",
            "value": 2
          },
          {
            "name": "That's great",
            "value": 3
          }
        ],
        "name": "english-default",
        "description": "",
        "rating_1": "very poor",
        "rating_2": "poor",
        "rating_3": "ok",
        "rating_4": "good",
        "rating_5": "very good",
        "list_header_contra": "CONTRA",
        "list_header_pro": "PRO",
        "header_contra": "Contra-Argument",
        "header_pro": "Pro-Argument",
        "button_short_new_contra": "Write new argument",
        "button_short_new_pro": "Write new argument",
        "button_new_contra": "Write new contra argument",
        "button_new_pro": "Write new pro argument",
        "survey_statement": "Answer",
        "survey_statements": "Answers",
        "survey_add_answer_button_top": "Write new answer",
        "survey_add_answer_button_bottom": "Write new answer",
        "reply_counter": "Reaction",
        "reply_counter_plural": "Reactions",
        "statement_header": "",
        "statement_list_header": ""
      },
      {
        "id": 6,
        "words": [
          {
            "name": "Eher Verlust",
            "value": -1
          },
          {
            "name": "Hält sich die Waage.",
            "value": 0
          },
          {
            "name": "Eher Gewinn",
            "value": 1
          },
          {
            "name": "Gewinn",
            "value": 2
          },
          {
            "name": "Großer Gewinn!",
            "value": 3
          },
          {
            "name": "Verlust",
            "value": -2
          },
          {
            "name": "Großer Verlust!",
            "value": -3
          }
        ],
        "name": "Verlust - Gewinn",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Verlust",
        "list_header_pro": "Gewinn",
        "header_contra": "Verlust",
        "header_pro": "Gewinn",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues \"Verlust\"-Argument schreiben",
        "button_new_pro": "Neues \"Gewinn\"-Argument schreiben",
        "survey_statement": "Antwort",
        "survey_statements": "Antworten",
        "survey_add_answer_button_top": "Neue Antwort",
        "survey_add_answer_button_bottom": "Neue Antwort schreiben",
        "reply_counter": "Antwort",
        "reply_counter_plural": "Antworten",
        "statement_header": "Antwort",
        "statement_list_header": "Antwort"
      },
      {
        "id": 7,
        "words": [
          {
            "name": "stimme eher nicht zu",
            "value": -1
          },
          {
            "name": "weiß nicht",
            "value": 0
          },
          {
            "name": "stimme eher zu",
            "value": 1
          },
          {
            "name": "stimme zu",
            "value": 2
          },
          {
            "name": "stimme voll zu",
            "value": 3
          },
          {
            "name": "stimme nicht zu",
            "value": -2
          },
          {
            "name": "stimme keinesfalls zu",
            "value": -3
          }
        ],
        "name": "Zustimmung (Vorteile/Nachteile) ",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "NACHTEILE",
        "list_header_pro": "VORTEILE",
        "header_contra": "Nachteil",
        "header_pro": "Vorteil",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues \"Nachteil\"-Argument schreiben",
        "button_new_pro": "Neues \"Vorteil\"-Argument schreiben",
        "survey_statement": "Antwort",
        "survey_statements": "Antworten",
        "survey_add_answer_button_top": "Neue Antwort",
        "survey_add_answer_button_bottom": "Neue Antwort schreiben",
        "reply_counter": "Antwort",
        "reply_counter_plural": "Antworten",
        "statement_header": "Antwort",
        "statement_list_header": "Antwort"
      },
      {
        "id": 8,
        "words": [
          {
            "name": "stimme eher nicht zu",
            "value": -1
          },
          {
            "name": "weiß nicht",
            "value": 0
          },
          {
            "name": "stimme eher zu",
            "value": 1
          },
          {
            "name": "stimme zu",
            "value": 2
          },
          {
            "name": "stimme voll zu",
            "value": 3
          },
          {
            "name": "stimme nicht zu",
            "value": -2
          },
          {
            "name": "stimme keinesfalls zu",
            "value": -3
          }
        ],
        "name": "Zustimmung (Chancen/Risiken)",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "RISIKEN",
        "list_header_pro": "CHANCEN",
        "header_contra": "Risiko",
        "header_pro": "Chance",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues \"Risiko\"-Argument schreiben",
        "button_new_pro": "Neues \"Chance\"-Argument schreiben",
        "survey_statement": "Antwort",
        "survey_statements": "Antworten",
        "survey_add_answer_button_top": "Neue Antwort",
        "survey_add_answer_button_bottom": "Neue Antwort schreiben",
        "reply_counter": "Antwort",
        "reply_counter_plural": "Antworten",
        "statement_header": "Antwort",
        "statement_list_header": "Antwort"
      },
      {
        "id": 9,
        "words": [
          {
            "name": "Etwas mehr Risiken",
            "value": -1
          },
          {
            "name": "Hält sich die Waage",
            "value": 0
          },
          {
            "name": "Etwas mehr Chancen",
            "value": 1
          },
          {
            "name": "Mehr Chancen",
            "value": 2
          },
          {
            "name": "Deutlich mehr Chancen",
            "value": 3
          },
          {
            "name": "Mehr Risiken",
            "value": -2
          },
          {
            "name": "Deutlich mehr Risiken",
            "value": -3
          }
        ],
        "name": "Chancen/Risiken",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "RISIKEN",
        "list_header_pro": "CHANCEN",
        "header_contra": "Risiko",
        "header_pro": "Chance",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues \"Risiko\"-Argument schreiben",
        "button_new_pro": "Neues \"Chance\"-Argument schreiben",
        "survey_statement": "Antwort",
        "survey_statements": "Antworten",
        "survey_add_answer_button_top": "Neue Antwort",
        "survey_add_answer_button_bottom": "Neue Antwort schreiben",
        "reply_counter": "Antwort",
        "reply_counter_plural": "Antworten",
        "statement_header": "Antwort",
        "statement_list_header": "Antwort"
      },
      {
        "id": 10,
        "words": [
          {
            "name": "stimme nicht zu",
            "value": -2
          },
          {
            "name": "stimm eher nicht zu",
            "value": -1
          },
          {
            "name": "stimme eher zu",
            "value": 1
          },
          {
            "name": "stimme zu",
            "value": 2
          },
          {
            "name": "stimme voll zu",
            "value": 3
          },
          {
            "name": "stimme keinesfalls zu",
            "value": -3
          },
          {
            "name": "weiß nicht",
            "value": 0
          }
        ],
        "name": "Zustimmung / Vorschläge / Pro-Contra",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Contra",
        "list_header_pro": "Pro",
        "header_contra": "Contra-Argument",
        "header_pro": "Pro-Argument",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues Contra-Argument schreiben",
        "button_new_pro": "Neues Pro-Argument schreiben",
        "survey_statement": "Vorschlag",
        "survey_statements": "Vorschläge",
        "survey_add_answer_button_top": "Neuer Vorschlag",
        "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
        "reply_counter": "Reaktion",
        "reply_counter_plural": "Reaktionen",
        "statement_header": "Vorschlag",
        "statement_list_header": "Vorschlag"
      },
      {
        "id": 11,
        "words": [
          {
            "name": "Nein",
            "value": -2
          },
          {
            "name": "eher Nein",
            "value": -1
          },
          {
            "name": "eher Ja",
            "value": 1
          },
          {
            "name": "Ja",
            "value": 2
          },
          {
            "name": "Ja, unbedingt!",
            "value": 3
          },
          {
            "name": "Nein, auf keinen Fall!",
            "value": -3
          },
          {
            "name": "weiß nicht",
            "value": 0
          }
        ],
        "name": "Ja-Nein / Vorteile-Nachteile / Vorschläge",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Nachteile",
        "list_header_pro": "Vorteile",
        "header_contra": "Nachteil",
        "header_pro": "Vorteil",
        "button_short_new_contra": "Weiterer Nachteil",
        "button_short_new_pro": "Weiterer Vorteil",
        "button_new_contra": "Neuen Nachteil hinzufügen",
        "button_new_pro": "Neuen Vorteil hinzufügen",
        "survey_statement": "Vorschlag",
        "survey_statements": "Vorschläge",
        "survey_add_answer_button_top": "Neuer Vorschlag",
        "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
        "reply_counter": "Reaktion",
        "reply_counter_plural": "Reaktionen",
        "statement_header": "Vorschlag",
        "statement_list_header": "Vorschlag"
      },
      {
        "id": 12,
        "words": [
          {
            "name": "Nein",
            "value": -2
          },
          {
            "name": "Ja",
            "value": 2
          },
          {
            "name": "Ja, unbedingt!",
            "value": 3
          },
          {
            "name": "Nein, auf keinen Fall!",
            "value": -3
          },
          {
            "name": "Eher Nein",
            "value": -1
          },
          {
            "name": "Eher Ja",
            "value": 1
          },
          {
            "name": "Weiß nicht...",
            "value": 0
          }
        ],
        "name": "Ja-Nein / Pro-Contra / Vorschläge",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Contra",
        "list_header_pro": "Pro",
        "header_contra": "Contra Argument",
        "header_pro": "Pro Argument",
        "button_short_new_contra": "Neues Contra Argument",
        "button_short_new_pro": "Neues Pro Argument",
        "button_new_contra": "Neues Contra Argument",
        "button_new_pro": "Neues Pro Argument",
        "survey_statement": "Vorschlag",
        "survey_statements": "Vorschläge",
        "survey_add_answer_button_top": "Neuer Vorschlag",
        "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
        "reply_counter": "Reaktion",
        "reply_counter_plural": "Reaktionen",
        "statement_header": "Vorschlag",
        "statement_list_header": "Vorschlag"
      },
      {
        "id": 13,
        "words": [
          {
            "name": "Nicht gut",
            "value": -2
          },
          {
            "name": "Gut",
            "value": 2
          },
          {
            "name": "Sehr gut!",
            "value": 3
          },
          {
            "name": "Gar nicht gut!",
            "value": -3
          },
          {
            "name": "Weniger gut",
            "value": -1
          },
          {
            "name": "Eher gut",
            "value": 1
          },
          {
            "name": "So mittel...",
            "value": 0
          }
        ],
        "name": "Gut - Nicht gut/ Vorschläge",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Nicht gut",
        "list_header_pro": "Gut",
        "header_contra": "Nicht gut",
        "header_pro": "Gut",
        "button_short_new_contra": "Neuer \"Nicht gut\"-Beitrag",
        "button_short_new_pro": "Neuer \"Gut\"-Beitrag",
        "button_new_contra": "Neuer \"Nicht gut\"-Beitrag",
        "button_new_pro": "Neuer \"Gut\"-Beitrag",
        "survey_statement": "Vorschlag",
        "survey_statements": "Vorschläge",
        "survey_add_answer_button_top": "Neuer Vorschlag",
        "survey_add_answer_button_bottom": "Neuen Vorschlag machen",
        "reply_counter": "Reaktion",
        "reply_counter_plural": "Reaktionen",
        "statement_header": "Vorschlag",
        "statement_list_header": "Vorschläge"
      },
      {
        "id": 18,
        "words": [
          {
            "name": "No way",
            "value": -3
          },
          {
            "name": "I am not convinced",
            "value": -2
          },
          {
            "name": "I have my doubts",
            "value": -1
          },
          {
            "name": "Neutral",
            "value": 0
          },
          {
            "name": "ok",
            "value": 1
          },
          {
            "name": "I like it",
            "value": 2
          },
          {
            "name": "That's great",
            "value": 3
          }
        ],
        "name": "English - Advantages",
        "description": "",
        "rating_1": "very poor",
        "rating_2": "poor",
        "rating_3": "ok",
        "rating_4": "good",
        "rating_5": "very good",
        "list_header_contra": "Disadvantages",
        "list_header_pro": "Advantages",
        "header_contra": "Disadvantage",
        "header_pro": "Advantage",
        "button_short_new_contra": "Add a 'disadvantage'",
        "button_short_new_pro": "Add an 'advantage'",
        "button_new_contra": "Add a 'disadvantage'",
        "button_new_pro": "Add an 'advantage'",
        "survey_statement": "Answer",
        "survey_statements": "Answers",
        "survey_add_answer_button_top": "Write new answer",
        "survey_add_answer_button_bottom": "Write new answer",
        "reply_counter": "Reaction",
        "reply_counter_plural": "Reactions",
        "statement_header": "",
        "statement_list_header": ""
      },
      {
        "id": 19,
        "words": [
          {
            "name": "Neutral",
            "value": 0
          },
          {
            "name": "No way!",
            "value": -3
          },
          {
            "name": "I don't think so",
            "value": -2
          },
          {
            "name": "I am not convinced",
            "value": -1
          },
          {
            "name": "I kind of agree",
            "value": 1
          },
          {
            "name": "Yes",
            "value": 2
          },
          {
            "name": "I totally agree!",
            "value": 3
          }
        ],
        "name": "English - Advantages - Ideas",
        "description": "",
        "rating_1": "irrelevant",
        "rating_2": "poor argument",
        "rating_3": "ok",
        "rating_4": "good point",
        "rating_5": "very good point",
        "list_header_contra": "Disadvantages",
        "list_header_pro": "Advantages",
        "header_contra": "Disadvantage",
        "header_pro": "Advantage",
        "button_short_new_contra": "Add a 'disadvantage'",
        "button_short_new_pro": "Add an 'advantage'",
        "button_new_contra": "Add a 'disadvantage'",
        "button_new_pro": "Add an 'advantage'",
        "survey_statement": "Idea",
        "survey_statements": "Ideas",
        "survey_add_answer_button_top": "Add new idea",
        "survey_add_answer_button_bottom": "Add new idea",
        "reply_counter": "Reply",
        "reply_counter_plural": "Replies",
        "statement_header": "Idea",
        "statement_list_header": "Ideas"
      },
      {
        "id": 20,
        "words": [
          {
            "name": "No way",
            "value": -3
          },
          {
            "name": "I am not convinced",
            "value": -2
          },
          {
            "name": "I have my doubts",
            "value": -1
          },
          {
            "name": "I don't care",
            "value": 0
          },
          {
            "name": "I kind of agree",
            "value": 1
          },
          {
            "name": "I agree",
            "value": 2
          },
          {
            "name": "I totally agree!",
            "value": 3
          }
        ],
        "name": "English - Degrees of Agreement - Ideas",
        "description": "",
        "rating_1": "irrelevant",
        "rating_2": "doubtful",
        "rating_3": "ok",
        "rating_4": "good point",
        "rating_5": "very good point",
        "list_header_contra": "CONTRA",
        "list_header_pro": "PRO",
        "header_contra": "Contra",
        "header_pro": "Pro",
        "button_short_new_contra": "Add 'contra' argument",
        "button_short_new_pro": "Add 'pro' argument",
        "button_new_contra": "Add 'contra' argument",
        "button_new_pro": "Add 'pro' argument",
        "survey_statement": "Idea",
        "survey_statements": "Ideas",
        "survey_add_answer_button_top": "Add new idea",
        "survey_add_answer_button_bottom": "Add new idea",
        "reply_counter": "Reply",
        "reply_counter_plural": "Replies",
        "statement_header": "Idea",
        "statement_list_header": "Ideas"
      },
      {
        "id": 21,
        "words": [
          {
            "name": "stimme nicht zu",
            "value": -2
          },
          {
            "name": "stimme eher zu",
            "value": 1
          },
          {
            "name": "stimme zu",
            "value": 2
          },
          {
            "name": "stimme voll zu",
            "value": 3
          },
          {
            "name": "stimme keinesfalls zu",
            "value": -3
          },
          {
            "name": "weiß nicht",
            "value": 0
          },
          {
            "name": "stimme eher nicht zu",
            "value": -1
          }
        ],
        "name": "Schule diskutiert - Fachdiskussionen",
        "description": "",
        "rating_1": "belanglos",
        "rating_2": "fragwürdig",
        "rating_3": "vertretbar",
        "rating_4": "relevant",
        "rating_5": "überzeugend",
        "list_header_contra": "Contra",
        "list_header_pro": "Pro",
        "header_contra": "Contra-Argument",
        "header_pro": "Pro-Argument",
        "button_short_new_contra": "Neues Argument",
        "button_short_new_pro": "Neues Argument",
        "button_new_contra": "Neues Contra-Argument schreiben",
        "button_new_pro": "Neues Pro-Argument schreiben",
        "survey_statement": "Diskussion",
        "survey_statements": "Diskussionen",
        "survey_add_answer_button_top": "Neue Diskussion",
        "survey_add_answer_button_bottom": "Neue Diskussion hinzufügen",
        "reply_counter": "Reaktion",
        "reply_counter_plural": "Reaktionen",
        "statement_header": "Thema",
        "statement_list_header": "Thema"
      }
    ],
    "are_private_discussions_allowed": false,
    "auto_update_interval_for_admins": 0,
    "auto_update_interval": 0,
    notification_wording: {},
    markdown_wording: {}
  }

  export const discussion = {
    "external_id": "demo-discussion-1",
    "created_by": "devolli",
    "created_at": "2020-07-09T16:29:40.515333+02:00",
    "url": "http://localhost:3000",
    "description": "",
    "tags": [],
    "statement": "What shall we do next?",
    "statements": [
      {
        "id": 817,
        "discussion_id": "demo-discussion-1",
        "created_by": "dev3",
        "statement": "Let's add great animations on brabbl!",
        "description": "",
        "created_at": "2020-07-09T16:37:43.963275+02:00",
        "arguments": [],
        "barometer": {
          "count": 2,
          "rating": 0,
          "user_rating": -3,
          "count_ratings": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 1,
            "-3": 1,
            "-2": 0,
            "-1": 0
          },
          "wording": [
            {
              "name": "No way",
              "value": -3
            },
            {
              "name": "I am not convinced",
              "value": -2
            },
            {
              "name": "I have my doubts",
              "value": -1
            },
            {
              "name": "Neutral",
              "value": 0
            },
            {
              "name": "ok",
              "value": 1
            },
            {
              "name": "I like it",
              "value": 2
            },
            {
              "name": "That's great",
              "value": 3
            }
          ]
        },
        "is_editable": true,
        "image": {
          "small": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.64x64_q85_crop.jpg",
          "medium": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.290x200_q85_crop.jpg",
          "big": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.750x518_q85_crop.jpg",
          "large": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg.840x580_q85_crop.jpg",
          "original": "http://localhost:8000/media/images/statements/4b6c9c25-a83_Ncztcow.jpg"
        },
        "video": "",
        "thumbnail": "http://localhost:8000/media/images/statements/4b6c9c25-a83.jpg.300x206_q85_crop.jpg",
        "is_deletable": true,
        "status": 1,
        "author": {
          "display_name": "dev3",
          "image": {},
          "id": 1331,
          "username": "dev3+brabbl-dev-customer-1"
        },
        "pdfs": []
      }
    ],
    "multiple_statements_allowed": true,
    "user_can_add_replies": false,
    "has_barometer": true,
    "has_arguments": true,
    "has_replies": false,
    "discussion_wording": 4,
    "is_editable": true,
    "is_deletable": true,
    "start_time": null,
    "image": {
      "small": "http://localhost:8000/media/images/discussion/2632b982-498.jpg.64x64_q85_crop.jpg",
      "medium": "http://localhost:8000/media/images/discussion/2632b982-498.jpg.290x200_q85_crop.jpg",
      "big": "http://localhost:8000/media/images/discussion/2632b982-498.jpg.750x518_q85_crop.jpg",
      "large": "http://localhost:8000/media/images/discussion/2632b982-498.jpg.840x580_q85_crop.jpg",
      "original": "http://localhost:8000/media/images/discussion/2632b982-498.jpg"
    },
    "end_time": null,
    "pdfs": [],
    "author": {
      "display_name": "devolli",
      "image": {},
      "id": 1327,
      "username": "devolli"
    },
    "is_private": false,
    "discussion_users": []
  }
  
  export const discussions = [
    {
      'external_id': '2flcu5fjemi',
      'url': 'http://127.0.0.1:3000/artikel1',
      'created_by': 'andreas',
      'created_at': '2016-02-27T18:47:16.073982Z',
      'image_url': '',
      'last_activity': '2016-02-27T19:03:46.755Z',
      'tags': [],
      'multiple_statements_allowed': false,
      'statement': 'Ich bin ein Test-Statement',
      'has_barometer': false,
      'has_arguments': true,
      'discussion_wording': 2,
      'user_can_add_replies': false,
      'argument_count': 0,
      'statement_count': 0,
      'is_editable': false,
      'is_deletable': false,
    },
    {
      'external_id': 'w1xpjhv9529',
      'url': 'http://127.0.0.1:3000/artikel2',
      'created_by': 'andreas',
      'created_at': '2016-02-28T12:00:43.271376Z',
      'image_url': '',
      'last_activity': '2016-02-28T12:07:59.394Z',
      'tags': [],
      'multiple_statements_allowed': true,
      'statement': 'Ich bin eine Umfrage',
      'has_barometer': true,
      'has_arguments': true,
      'discussion_wording': 2,
      'user_can_add_replies': false,
      'argument_count': 1,
      'statement_count': 4,
      'is_editable': false,
      'is_deletable': false,
    },
  ];
  