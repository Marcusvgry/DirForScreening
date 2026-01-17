const CBC_VPNNummer = {
  type: jsPsychSurveyHtmlForm,
  preamble: ``,
  html: `
        <style>
          .cbc-form { width: 100%; max-width: 1100px; margin: 0 auto; }
          .cbc-row { display: flex; gap: 16px; flex-wrap: wrap; }
          .cbc-row .field { flex: 1 1 260px; min-width: 220px; }
          .cbc-grid { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr)); gap: 16px; margin-top: 16px; }
          .cbc-grid .title { font-weight: bold; text-align: center; }
          .cbc-grid .cell label { display: block; margin-bottom: 4px; text-align: center; }
          .cbc-grid .cell select { width: 100%; }
        </style>
        <div class="survey-container cbc-form">
    <div class="cbc-row">
      <div class="field">
        <p>Probandennummer</p>
        <input type="number" id="Probandennummer" name="Probandennummer" required class="input-field"/>
      </div>
      <div class="field">
        <p>Heutiges Datum</p>
        <input type="date" id="Heutiges-Datum" name="Heutiges-Datum" required class="input-field"/>
      </div>
      <div class="field">
        <p>Name der Screening-Person</p>
        <input type="text" id="Name-der-Screening-Person" name="Name-der-Screening-Person" required class="input-field"/>
      </div>
    </div>   
</div>
    
`,
};

const screeningElements = [
  {
    type: "html",
    name: "heading_allgemein",
    html: "<h3>1. Allgemeine Informationen</h3>",
  },
  {
    type: "radiogroup",
    name: "biologisches_geschlecht",
    title: "Biologisches Geschlecht:",
    choices: ["männlich", "weiblich", "divers", "keine Angabe"],
  },
  {
    type: "radiogroup",
    name: "schulabschluss",
    title: "Höchster erreichter Schulabschluss:",
    choices: [
      "kein Abschluss",
      "Volks-Hauptschule",
      "Mittlere Reife",
      "Abitur/Fachabitur",
    ],
  },
  {
    type: "radiogroup",
    name: "berufsabschluss",
    title: "Erreichter Berufsabschluss:",
    description: "Mindestens Fachhochschulreife",
    choices: [
      "Keine Berufsausbildung",
      "Lehre/Ausbildung",
      "Fachhochschule",
      "Hochschule",
    ],
  },
  {
    type: "radiogroup",
    name: "beschaeftigung",
    title: "Derzeitige Beschäftigung:",
    choices: [
      "ohne Beschäftigung",
      "Hartz-IV/ Bürgergeld",
      "ALG I",
      "Gelegenheitsjob",
      "1€-Job",
      "Zeitarbeitsfirma",
      "feste Anstellung",
      "selbstständig",
      "EU/BU-Rente",
      "Altersrente",
      "Studierend",
    ],
  },
  {
    type: "comment",
    name: "allgemein_sonstiges",
    title: "Sonstiges",
    placeholder: "Sonstige Informationen",
  },
  {
    type: "html",
    name: "heading_alter",
    html: "<h3>2. Alter, Händigkeit und Sehschwäche</h3>",
  },
  {
    type: "text",
    name: "geburtsdatum",
    title: "Geburtsdatum",
    inputType: "date",
    isRequired: true,
  },
  {
    type: "text",
    name: "alter",
    title: "Alter",
    description: "Zwischen 18 und 35 Jahre.",
    inputType: "number",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "haendigkeit",
    title: "Händigkeit",
    choices: ["Rechtshändig", "Linkshändig", "Beidhändig"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "brille_kontaktlinsen",
    title: "Tragen Sie eine Brille oder Kontaktlinsen?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "sehschwaeche_ausgeglichen",
    title: "Ist Ihre Sehschwäche damit ausgeglichen?",
    choices: ["Ja", "Nein"],
    visibleIf: "{brille_kontaktlinsen} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "dioptrien_rechts",
    title: "Dioptrien rechts",
    inputType: "number",
    step: 0.25,
    visibleIf: "{brille_kontaktlinsen} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "dioptrien_links",
    title: "Dioptrien links",
    inputType: "number",
    step: 0.25,
    visibleIf: "{brille_kontaktlinsen} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "dioptrien_unter_6",
    title: "Weniger als 6 Dioptrien?",
    choices: ["Ja", "Nein"],
    visibleIf: "{brille_kontaktlinsen} = 'Ja'",
    isRequired: true,
  },
  {
    type: "comment",
    name: "sehfaehigkeit_sonstiges",
    title: "Sonstiges",
    placeholder: "Sonstige Informationen",
  },
  {
    type: "html",
    name: "heading_betreuung_schwangerschaft",
    html: "<h3>3. Betreuung und Schwangerschaft</h3>",
  },
  {
    type: "radiogroup",
    name: "gesetzliche_betreuung",
    title: "Werden Sie gesetzlich betreut?",
    description: "Wenn ja, sofortiger Ausschluss",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "schwangerschaft",
    title: "Schwangerschaft oder mögliche Schwangerschaft?",
    description: "wenn ja, sofortiger Ausschluss",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "comment",
    name: "betreuung_sonstiges",
    title: "Sonstiges",
    placeholder: "Sonstige Informationen",
  },
  {
    type: "html",
    name: "heading_drogen",
    html: "<h3>4. Drogen</h3>",
  },
  {
    type: "text",
    name: "zigaretten_gesamt",
    title:
      "Wie viele Zigaretten haben Sie bisher in Ihrem Leben insgesamt geraucht?",
    inputType: "number",
    min: 0,
  },
  {
    type: "radiogroup",
    name: "rauchen_aktuell",
    title: "Rauchen Sie derzeit mehr als 2 Zigaretten pro Woche?",
    description: "wenn ja, sofortiger Ausschluss",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "dropdown",
    name: "alkohol_tage_pro_woche",
    title: "Wie oft nehmen Sie alkoholische Getränke zu sich?",
    choices: [
      "nie",
      "1x im Monat oder weniger",
      "2-4x im Monat",
      "2-4x in der Woche",
      "4x oder mehr in der Woche",
    ],
  },
  {
    type: "dropdown",
    name: "alkohol_glaser",
    title:
      "Wenn Sie alkoholische Getränke zu sich nehmen, wie viel trinken Sie typischerweise an einem Tag? (Anzahl Gläser)",
    description:
      "Ein Standardgetränk (12 g Alkohol) entspricht ca. 0,3 l Bier (5 %), 0,1 l Wein oder Sekt (12,5 %), 2 cl Schnaps (55 %) oder 4 cl Likör (30 %).",
    choices: ["nie", "1 oder 2", "3 oder 4", "5 oder 6", "7-9", "10 oder mehr"],
  },
  {
    type: "dropdown",
    name: "alkohol_binge",
    title:
      "Wie oft trinken Sie 6 oder mehr Gläser Alkohol bei einer Gelegenheit?",
    choices: [
      "Nie",
      "Weniger als einmal im Monat",
      "einmal im Monat",
      "einmal in der Woche",
      "täglich oder fast täglich",
    ],
  },
  {
    type: "radiogroup",
    name: "thc_konsum",
    title: "Haben Sie jemals THC konsumiert?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "thc_haeufigkeit",
    title: "Wie häufig haben Sie THC konsumiert?",
    visibleIf: "{thc_konsum} = 'Ja'",
  },
  {
    type: "text",
    name: "thc_zeitraum",
    title: "Über welchen Zeitraum wurde THC konsumiert?",
    visibleIf: "{thc_konsum} = 'Ja'",
  },
  {
    type: "text",
    name: "thc_letzter_konsum",
    title: "Wann fand der letzte THC-Konsum statt? (Datum oder Zeitraum)",
    visibleIf: "{thc_konsum} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "andere_drogen",
    title:
      "Haben Sie andere Drogen konsumiert (z.B. Amphetamine, LSD, Kokain)?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "andere_drogen_was",
    title: "Was haben Sie konsumiert?",
    visibleIf: "{andere_drogen} = 'Ja'",
  },
  {
    type: "text",
    name: "andere_drogen_haeufigkeit",
    title: "Wie häufig haben Sie konsumiert?",
    visibleIf: "{andere_drogen} = 'Ja'",
  },
  {
    type: "text",
    name: "andere_drogen_zeitraum",
    title: "Über welchen Zeitraum wurde die Substanz konsumiert?",
    visibleIf: "{andere_drogen} = 'Ja'",
  },
  {
    type: "text",
    name: "andere_drogen_letzter_konsum",
    title: "Wann fand der letzte Konsum statt? (Datum oder Zeitraum)",
    visibleIf: "{andere_drogen} = 'Ja'",
  },
  {
    type: "comment",
    name: "drogen_sonstiges",
    title: "Sonstige Informationen",
  },
  {
    type: "html",
    name: "heading_medikamente_krankheiten",
    html: "<h3>5. Medikamente & Krankheitsgeschichte</h3>",
  },
  {
    type: "radiogroup",
    name: "psychische_erkrankung",
    title:
      "Leiden Sie unter einer diagnostizierten psychischen Erkrankung (z.B. Depression, Phobien, Schizophrenie)?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "psychische_erkrankung_details",
    title: "Welche?",
    visibleIf: "{psychische_erkrankung} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "psychische_medikation",
    title: "Nehmen Sie hierfür Medikamente regelmäßig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{psychische_erkrankung} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "psychische_medikation_details",
    title: "Welche und wie viel?",
    visibleIf: "{psychische_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "psychotherapie_aktuell",
    title: "Sind Sie dafür derzeit in psychotherapeutischer Behandlung?",
    choices: ["Ja", "Nein"],
    visibleIf: "{psychische_erkrankung} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "koerperliche_chronisch",
    title: "Leiden Sie unter körperlichen chronischen Erkrankungen?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "koerperliche_chronisch_details",
    title: "Welche?",
    visibleIf: "{koerperliche_chronisch} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "koerperliche_chronisch_medikation",
    title: "Nehmen Sie hierfür Medikamente regelmäßig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{koerperliche_chronisch} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "koerperliche_chronisch_medikation_details",
    title: "Welche und wie viel?",
    visibleIf: "{koerperliche_chronisch_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_1",
    title:
      "Leiden Sie unter weiteren körperlichen oder psychischen Erkrankungen? (1)",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_1_details",
    title: "Welche?",
    visibleIf: "{weitere_erkrankung_1} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_1_medikation",
    title: "Nehmen Sie hierfür Medikamente regelmäßig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{weitere_erkrankung_1} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_1_medikation_details",
    title: "Welche und wie viel?",
    visibleIf: "{weitere_erkrankung_1_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_2",
    title:
      "Leiden Sie unter weiteren körperlichen oder psychischen Erkrankungen? (2)",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_2_details",
    title: "Wenn ja, welche?",
    visibleIf: "{weitere_erkrankung_2} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_2_medikation",
    title: "Nehmen Sie hierfür Medikamente regelmäßig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{weitere_erkrankung_2} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_2_medikation_details",
    title: "Welche und wie viel?",
    visibleIf: "{weitere_erkrankung_2_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "comment",
    name: "krankheiten_sonstiges",
    title: "Sonstiges",
    placeholder: "Weitere Erkrankungen oder Sonstiges",
  },
  {
    type: "radiogroup",
    name: "psychotherapie_je",
    title:
      "Waren Sie irgendwann in Ihrem Leben in psychiatrischer oder psychotherapeutischer Behandlung?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "psychotherapie_grund",
    title: "Weswegen? (kurze Beschreibung)",
    visibleIf: "{psychotherapie_je} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "psychotherapie_medikation",
    title: "Welche Medikamente wurden eingenommen?",
    visibleIf: "{psychotherapie_je} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "medikation_6_monate",
    title:
      "Gab es verschreibungspflichtige Medikamente, die Sie in den letzten 6 Monaten eingenommen haben?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "medikation_6_monate_details",
    title: "Welche?",
    visibleIf: "{medikation_6_monate} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "psychopharmaka_14_tage",
    title:
      "Wurden Psychopharmaka oder sonstige Ausschluss-Medikamente innerhalb der letzten 14 Tage genommen?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "comment",
    name: "medikation_sonstiges",
    title: "Sonstiges",
    placeholder: "Sonstige Informationen",
  },
  {
    type: "html",
    name: "heading_schlaf",
    html: "<h3>6. Schlaf</h3>",
  },
  {
    type: "radiogroup",
    name: "schlafstoerung",
    title:
      "Leiden Sie unter bekannten Schlafstörungen wie zum Beispiel Schlaf-apnoe, Narkolepsie, Restless-Leg-Syndrom, Insomnie)?",
    description: "sofortiger Ausschluss bei ja",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "schlafstoerung_details",
    title: "Welche der beschriebenen Erkrankungen?",
    visibleIf: "{schlafstoerung} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "schichtarbeit",
    title:
      "Arbeiten Sie im Schichtsystem mit Nachtschichten oder machen Sie Nachtarbeit?",
    description: "sofortiger Ausschluss bei ja",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "mittagsschlaf_mehr_als_drei",
    title: "Machen Sie mehr als 3 Mittagsschläfe pro Woche?",
    description: "sofortiger Ausschluss bei ja",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "einschlafzeit_lang",
    title:
      "Brauchen Sie länger als 60-90 Minuten zum Einschlafen, nachdem Sie sich hingelegt haben?",
    description: "sofortiger Ausschluss bei ja",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "einschlafzeit_extrem",
    title: "Schlafen Sie normalerweise vor 21:00 Uhr oder nach 1:00 Uhr ein?",
    description: "sofortiger Ausschluss bei ja",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "nachts_aufstehen",
    title:
      "Müssen Sie nachts öfter als 2 Mal pro Nacht aufstehen und aus dem Bett (beispielsweise um auf Toilette zu gehen)?",
    description: "notieren für Messperson",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "zeitverschiebung",
    title:
      "Waren Sie in den letzten Wochen auf Reisen mit mehr als 2 Stunden Zeitverschiebung?",
    description:
      "1 Woche Erholung pro Stunde Zeitverschiebung 1 Woche für 1 Stunde Zeitverschiebung; also wenn Proband:in in einem Land mit 3 Stunden Zeitverschiebung war, muss es mindestens 3 Wochen zurück liegen).",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "zeitverschiebung_wo",
    title: "Wo? (Land eintragen)",
    visibleIf: "{zeitverschiebung} = 'Ja'",
  },
  {
    type: "comment",
    name: "schlaf_sonstiges",
    title: "Sonstiges",
    placeholder: "Sonstige Informationen",
  },
];

const demographics_block = {
  type: jsPsychSurvey,
  survey_json: {
    title: "Screening",
    widthMode: "static",
    showProgressBar: "off",
    showQuestionNumbers: "off",
    pages: [
      {
        title:
          "Einleitungsgespräch: Für Forschungsinteresse bedanken; Inhalte heute: Informationen zur Studie geben; Fragen klären und Studieneignung feststellen. Haben Sie hierfür ca. 20-30 Minuten Zeit? Kurz die Studie erklären und nach Fragen fragen bevor es weiter geht?",
        elements: screeningElements,
      },
    ],
  },
  data: { form_id: "screening" },
};
const instructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p>Willkommen! Vielen Dank, dass Sie an unserer Studie teilnehmen.</p>

<p>In dieser Studie geht es um das selektive Erinnern von konkreten Begriffen.</p>

<p>Die Studie besteht aus mehreren Phasen. Bitte lesen Sie die folgenden Instruktionen gründlich durch.</p>

<p>Wenn Sie während der Studie Fragen haben, können Sie sich jederzeit an die Versuchsleitung wenden.</p>

<p>Lesen Sie weiter mit dem Button.</p>

        </div>`,
    `<div class="instructions">
    <p>Die Studie beginnt mit einer Lernphase.</p>

<p>Dabei sehen Sie eine Reihe von einzelnen Wörtern, die nacheinander auf dem Bildschirm erscheinen.</p>

<p>Ihre Aufgabe wird es sein, sich einen Teil der Wörter für einen späteren Gedächtnistest zu merken.</p>

<p>Lesen Sie weiter mit dem Button.</p>

        </div>`,
    `<div class="instructions">
        <p>Von den Wörtern, die Ihnen gleich in der Lernphase gezeigt werden, sollen nur bestimmte Wörter gelernt werden.</p>

<p>Folgt auf ein Wort die Buchstabenkombination <b>EEE</b>, sollen Sie sich das vorangegangene Wort bitte für den Gedächtnistest merken. Die Buchstabenkombination <b>EEE</b> steht hierbei für "Erinnern".</p>

<p>Erscheint nach einem Wort die Buchstabenkombination <b>VVV</b>, sollen Sie sich das vorangegangene Wort bitte NICHT merken. Sie sollen das Wort dann also vergessen. Die Buchstabenkombination <b>VVV</b> steht hierbei für "Vergessen".</p>

        </div>`,
    `<div class="instructions">
    <p>Als nächstes werden Sie ein Beispiel sehen.</p>

<p>Ein Wort wird auf dem Bildschirm erscheinen. Auf das Wort folgt eine Buchstabenkombination.</p>

<p>Danach sehen Sie dann noch drei weitere Wörter, auf welche dann auch wieder eine Buchstabenkombination folgt.</p>

<p> Zusammen mit der Buchstabenkombination wird außerdem ein Ton abgespielt. Jeder Ton wird entweder NUR mit der Buchstabenkombination <b>EEE</b> oder NUR mit der Buchstabenkombination <b>VVV</b> abgespielt.</p> 

<p>Drücken Sie den Button, um das Beispiel zu sehen.</p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  allow_backward: false,
};
