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
        <p>Name der Messperson</p>
        <input type="text" id="Name-der-Messperson" name="Name-der-Messperson" required class="input-field"/>
      </div>
    </div>   
</div>
    
`,
};

// Screening-Fragebogen mit SurveyJS (jsPsychSurvey) inklusive aller Ausschluss- und Folgefragen.
const screeningElements = [
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
    description: "Nur Teilnehmende zwischen 18 und 35 Jahren sind zugelassen.",
    inputType: "number",
    isRequired: true,
    validators: [
      {
        type: "numeric",
        minValue: 18,
        maxValue: 35,
        text: "Bitte ein Alter zwischen 18 und 35 Jahren angeben.",
      },
    ],
  },
  {
    type: "radiogroup",
    name: "haendigkeit",
    title: "H‰ndigkeit",
    choices: ["Rechtsh‰ndig", "Linksh‰ndig", "Beidh‰ndig"],
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
    title: "Ist Ihre Sehschw‰che damit ausgeglichen?",
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
    title: "Sonstiges (Sehf‰higkeit)",
    placeholder: "Weitere Hinweise zur Sehf‰higkeit",
  },
  {
    type: "radiogroup",
    name: "gesetzliche_betreuung",
    title: "Werden Sie gesetzlich betreut?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "schwangerschaft",
    title: "Schwangerschaft oder mˆgliche Schwangerschaft?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "comment",
    name: "betreuung_sonstiges",
    title: "Sonstiges (Betreuung/Schwangerschaft)",
    placeholder: "Weitere Informationen",
  },
  {
    type: "text",
    name: "zigaretten_gesamt",
    title: "Wie viele Zigaretten haben Sie bisher in Ihrem Leben insgesamt geraucht?",
    inputType: "number",
    min: 0,
  },
  {
    type: "radiogroup",
    name: "rauchen_aktuell",
    title: "Rauchen Sie derzeit mehr als 2 Zigaretten pro Woche?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "alkohol_tage_pro_woche",
    title: "Wie oft nehmen Sie alkoholische Getr‰nke zu sich? (Tage pro Woche)",
    inputType: "number",
    min: 0,
    max: 7,
  },
  {
    type: "text",
    name: "alkohol_glaser",
    title:
      "Wenn Sie alkoholische Getr‰nke zu sich nehmen, wie viel trinken Sie typischerweise an einem Tag? (Anzahl Gl‰ser)",
    description:
      "Ein Standardgetr‰nk (12 g Alkohol) entspricht ca. 0,3 l Bier (5 %), 0,1 l Wein oder Sekt (12,5 %), 2 cl Schnaps (55 %) oder 4 cl Likˆr (30 %).",
    inputType: "number",
    min: 0,
  },
  {
    type: "text",
    name: "alkohol_binge",
    title: "Wie oft trinken Sie 6 oder mehr Gl‰ser Alkohol bei einer Gelegenheit?",
    inputType: "number",
    min: 0,
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
    title: "Wie h‰ufig haben Sie THC konsumiert?",
    visibleIf: "{thc_konsum} = 'Ja'",
  },
  {
    type: "text",
    name: "thc_zeitraum",
    title: "‹ber welchen Zeitraum wurde THC konsumiert?",
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
    title: "Haben Sie andere Drogen konsumiert (z.B. Amphetamine, LSD, Kokain)?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "andere_drogen_was",
    title: "Welche Substanzen wurden konsumiert?",
    visibleIf: "{andere_drogen} = 'Ja'",
  },
  {
    type: "text",
    name: "andere_drogen_haeufigkeit",
    title: "Wie h‰ufig haben Sie diese Substanzen konsumiert?",
    visibleIf: "{andere_drogen} = 'Ja'",
  },
  {
    type: "text",
    name: "andere_drogen_zeitraum",
    title: "‹ber welchen Zeitraum wurden die Substanzen konsumiert?",
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
    title: "Sonstige Informationen zum Drogenkonsum",
  },
  {
    type: "radiogroup",
    name: "psychische_erkrankung",
    title: "Leiden Sie unter einer diagnostizierten psychischen Erkrankung (z.B. Depression, Phobien, Schizophrenie)?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "psychische_erkrankung_details",
    title: "Wenn ja, welche?",
    visibleIf: "{psychische_erkrankung} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "psychische_medikation",
    title: "Nehmen Sie hierf¸r Medikamente regelm‰ﬂig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{psychische_erkrankung} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "psychische_medikation_details",
    title: "Wenn ja, welche und wie viel?",
    visibleIf: "{psychische_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "psychotherapie_aktuell",
    title: "Sind Sie daf¸r derzeit in psychotherapeutischer Behandlung?",
    choices: ["Ja", "Nein"],
    visibleIf: "{psychische_erkrankung} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "koerperliche_chronisch",
    title: "Leiden Sie unter kˆrperlichen chronischen Erkrankungen?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "koerperliche_chronisch_details",
    title: "Wenn ja, welche?",
    visibleIf: "{koerperliche_chronisch} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "koerperliche_chronisch_medikation",
    title: "Nehmen Sie hierf¸r Medikamente regelm‰ﬂig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{koerperliche_chronisch} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "koerperliche_chronisch_medikation_details",
    title: "Wenn ja, welche und wie viel?",
    visibleIf: "{koerperliche_chronisch_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_1",
    title: "Leiden Sie unter weiteren kˆrperlichen oder psychischen Erkrankungen? (1)",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_1_details",
    title: "Wenn ja, welche?",
    visibleIf: "{weitere_erkrankung_1} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_1_medikation",
    title: "Nehmen Sie hierf¸r Medikamente regelm‰ﬂig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{weitere_erkrankung_1} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_1_medikation_details",
    title: "Wenn ja, welche und wie viel?",
    visibleIf: "{weitere_erkrankung_1_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "weitere_erkrankung_2",
    title: "Leiden Sie unter weiteren kˆrperlichen oder psychischen Erkrankungen? (2)",
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
    title: "Nehmen Sie hierf¸r Medikamente regelm‰ﬂig ein?",
    choices: ["Ja", "Nein"],
    visibleIf: "{weitere_erkrankung_2} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "weitere_erkrankung_2_medikation_details",
    title: "Wenn ja, welche und wie viel?",
    visibleIf: "{weitere_erkrankung_2_medikation} = 'Ja'",
    isRequired: true,
  },
  {
    type: "comment",
    name: "krankheiten_sonstiges",
    title: "Sonstige Erkrankungen oder Hinweise",
  },
  {
    type: "radiogroup",
    name: "psychotherapie_je",
    title: "Waren Sie irgendwann in Ihrem Leben in psychiatrischer oder psychotherapeutischer Behandlung?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "psychotherapie_grund",
    title: "Wenn ja, weswegen?",
    visibleIf: "{psychotherapie_je} = 'Ja'",
    isRequired: true,
  },
  {
    type: "text",
    name: "psychotherapie_medikation",
    title: "Wenn ja, welche Medikamente wurden eingenommen?",
    visibleIf: "{psychotherapie_je} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "medikation_6_monate",
    title: "Gab es verschreibungspflichtige Medikamente, die Sie in den letzten 6 Monaten eingenommen haben?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "medikation_6_monate_details",
    title: "Wenn ja, welche?",
    visibleIf: "{medikation_6_monate} = 'Ja'",
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "psychopharmaka_14_tage",
    title: "Wurden Psychopharmaka oder sonstige Ausschluss-Medikamente innerhalb der letzten 14 Tage genommen?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "comment",
    name: "medikation_sonstiges",
    title: "Sonstige Informationen zu Medikamenten",
  },
  {
    type: "radiogroup",
    name: "schlafstoerung",
    title:
      "Leiden Sie unter bekannten Schlafstˆrungen (z.B. Schlafapnoe, Narkolepsie, Restless-Leg-Syndrom, Insomnie)?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "schlafstoerung_details",
    title: "Wenn ja, welche der beschriebenen Erkrankungen?",
    visibleIf: "{schlafstoerung} = 'Ja'",
  },
  {
    type: "radiogroup",
    name: "schichtarbeit",
    title: "Arbeiten Sie im Schichtsystem mit Nachtschichten oder machen Sie Nachtarbeit?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "mittagsschlaf_mehr_als_drei",
    title: "Machen Sie mehr als 3 Mittagschl‰fe pro Woche?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "einschlafzeit_lang",
    title: "Brauchen Sie l‰nger als 60-90 Minuten zum Einschlafen, nachdem Sie sich hingelegt haben?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "einschlafzeit_extrem",
    title: "Schlafen Sie normalerweise vor 21:00 Uhr oder nach 1:00 Uhr ein?",
    description: 'Antwort "Ja" f¸hrt zum sofortigen Ausschluss.',
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "nachts_aufstehen",
    title: "M¸ssen Sie nachts ˆfter als 2 Mal pro Nacht aufstehen und aus dem Bett?",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "radiogroup",
    name: "zeitverschiebung",
    title: "Waren Sie in den letzten Wochen auf Reisen mit mehr als 2 Stunden Zeitverschiebung?",
    description:
      "Faustregel: 1 Woche Erholung pro Stunde Zeitverschiebung (z.B. 3 Stunden Unterschied = mindestens 3 Wochen zur¸ckliegen).",
    choices: ["Ja", "Nein"],
    isRequired: true,
  },
  {
    type: "text",
    name: "zeitverschiebung_wo",
    title: "Wenn ja, wo?",
    visibleIf: "{zeitverschiebung} = 'Ja'",
  },
  {
    type: "comment",
    name: "schlaf_sonstiges",
    title: "Sonstige Informationen zum Schlaf",
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
        title: "Screening",
        elements: screeningElements,
      },
    ],
  },
  data: { form_id: "screening" },
};const instructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p>Willkommen! Vielen Dank, dass Sie an unserer Studie teilnehmen.</p>

<p>In dieser Studie geht es um das selektive Erinnern von konkreten Begriffen.</p>

<p>Die Studie besteht aus mehreren Phasen. Bitte lesen Sie die folgenden Instruktionen gr√ºndlich durch.</p>

<p>Wenn Sie w√§hrend der Studie Fragen haben, k√∂nnen Sie sich jederzeit an die Versuchsleitung wenden.</p>

<p>Lesen Sie weiter mit dem Button.</p>

        </div>`,
    `<div class="instructions">
    <p>Die Studie beginnt mit einer Lernphase.</p>

<p>Dabei sehen Sie eine Reihe von einzelnen W√∂rtern, die nacheinander auf dem Bildschirm erscheinen.</p>

<p>Ihre Aufgabe wird es sein, sich einen Teil der W√∂rter f√ºr einen sp√§teren Ged√§chtnistest zu merken.</p>

<p>Lesen Sie weiter mit dem Button.</p>

        </div>`,
    `<div class="instructions">
        <p>Von den W√∂rtern, die Ihnen gleich in der Lernphase gezeigt werden, sollen nur bestimmte W√∂rter gelernt werden.</p>

<p>Folgt auf ein Wort die Buchstabenkombination <b>EEE</b>, sollen Sie sich das vorangegangene Wort bitte f√ºr den Ged√§chtnistest merken. Die Buchstabenkombination <b>EEE</b> steht hierbei f√ºr "Erinnern".</p>

<p>Erscheint nach einem Wort die Buchstabenkombination <b>VVV</b>, sollen Sie sich das vorangegangene Wort bitte NICHT merken. Sie sollen das Wort dann also vergessen. Die Buchstabenkombination <b>VVV</b> steht hierbei f√ºr "Vergessen".</p>

        </div>`,
    `<div class="instructions">
    <p>Als n√§chstes werden Sie ein Beispiel sehen.</p>

<p>Ein Wort wird auf dem Bildschirm erscheinen. Auf das Wort folgt eine Buchstabenkombination.</p>

<p>Danach sehen Sie dann noch drei weitere W√∂rter, auf welche dann auch wieder eine Buchstabenkombination folgt.</p>

<p> Zusammen mit der Buchstabenkombination wird au√üerdem ein Ton abgespielt. Jeder Ton wird entweder NUR mit der Buchstabenkombination <b>EEE</b> oder NUR mit der Buchstabenkombination <b>VVV</b> abgespielt.</p> 

<p>Dr√ºcken Sie den Button, um das Beispiel zu sehen.</p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  allow_backward: false,
};

const instructions_2 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p>In diesem Beispiel h√§tten Sie sich nur die W√∂rter "Sonne" und "Rose" f√ºr den sp√§teren Ged√§chtnistest merken sollen.</p>
<p>Das andere Wort h√§tten Sie vergessen sollen.</p>
        </div>`,
    `<div class="instructions">
    <p>Zusammenfassung:</p>

<p>Sie sehen gleich eine Reihe von W√∂rtern hintereinander. Von diesen W√∂rtern sollen Sie sich nur die W√∂rter einpr√§gen, auf die die Buchstabenkombination <b>EEE</b> folgt.</p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  allow_backward: false,
};

const instructions_3 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
       <p>Bevor die richtige Lernphase beginnt, folgt nun eine √úbung, in der Sie sich mit Ihrer Aufgabe vertraut machen k√∂nnen.</p>

<p>Dr√ºcken Sie den Button, um die √úbung f√ºr die Lernphase zu starten.</p>
 </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "√úbungsdurchgang beginnen",
  allow_backward: false,
};

const instructions_4 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
    <p> Nun folgt der Ged√§chtnistest. Zun√§chst einmal bitten wir Sie, alle W√∂rter, die Sie auch erinnern sollten, frei aus dem Ged√§chtnis abzurufen. </p>
    <p> Sobald Sie ein Wort eingegeben haben, k√∂nnen Sie Ihre Eingabe mit der Enter-Taste best√§tigen. Sobald Ihnen keine W√∂rter mehr einfallen, k√∂nnen Sie mit dem Fertig-Button fortfahren. Sie m√ºssen dann noch best√§tigen, dass Sie wirklich fortfahren wollen sowie ein weiteres Mal auf den Fertig-Button klicken.</p>
</div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Ged√§chtnistest beginnen",
  allow_backward: false,
};

const instructions_5 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> In der vorherigen Lernphase hatten wir Ihnen 6 W√∂rter pr√§sentiert, die Sie erinnern sollten. <br>
         Wir zeigen Ihnen von diesen W√∂rtern jetzt jeweils die ersten beiden Buchstaben und m√∂chten Sie bitten, das Wort 
         dann entsprechend zu vervollst√§ndigen. <br> Auch wenn sie das Wort eben schon korrekt erinnert haben, sollen Sie es
          trotzdem noch einmal in diesem Test vervollst√§ndigen., </p>
          <p> Ihre Eingabe best√§tigen Sie bitte wieder mit der Enter-Taste. Beim letzten Word erscheint der Fertig-Button, mit dem Sie Fortfahren k√∂nnen. Das Best√§tigen mit der Enter Taste funktioniert beim letzten Wort nicht mehr. Tippen Sie das Wort ein und klicken Sie dann auf den Fertig-Button, Ihre Eingabe wird gespeichert.</p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Vervollst√§ndigungsaufgabe beginnen",
  allow_backward: false,
};

const instructions_unrelatedSound = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p>Bevor Sie mit der eigentlichen Aufgabe beginnen, werden wir Ihnen noch einen Ton pr√§sentieren. Hierbei m√ºssen Sie nichts tun und keine Aufgabe erledigen. Bitte h√∂ren Sie trotzdem aufmerksam zu und schauen Sie auf das Kreuz in der Mitte des Bildschirms.</p>
      </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Beginnen",
  allow_backward: false,
};

const instructions_6 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> Das war der √úbungsdurchgang. </p>
        <p> Bevor wir mit der eigentlichen Lernphase beginnen, werden wir Sie noch mit den T√∂nen vertraut machen, die Sie w√§hrend der Lernphase h√∂ren werden. </p>
        <p> Insgesamt gibt es in der Lernphase vier verschieden T√∂ne. Zwei davon werden nur mit der Buchstabenkombination <b>EEE</b> und zwei nur mit der Buchstabenkombination <b>VVV</b> abgespielt. </p>
        <p> Wenn Sie auf "Weiter" klicken, wird der erste Ton abgespielt. In der Anweisung steht au√üerdem, ob der Ton mit <b>EEE</b> oder <b>VVV</b> abgespielt wird. </p>
        <p> Insgesamt k√∂nnen Sie sich jeden Ton bis zu dreimal anh√∂ren. </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  allow_backward: false,
};

const instructions_7 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> Haben Sie noch Fragen zur Lernphase oder zu Ihrer Aufgabe? </p>
        <p> Falls Sie noch Fragen haben, wenden Sie sich bitte jetzt an die Versuchsleitung. </p>
        <p> Wenn Sie keine Fragen mehr haben, dr√ºcken Sie den Button unten, um die W√∂rter f√ºr den sp√§teren Ged√§chtnistest zu lernen. </p>
        <p> Bitte stellen Sie sich darauf ein, dass Sie jetzt in dieser Lernphase mehr W√∂rter pr√§sentiert bekommen werden als in den √úbungsdurchg√§ngen </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Lernphase beginnen",
  allow_backward: false,
};

