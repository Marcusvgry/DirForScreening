var timeline = [];
var dataAlreadySaved = false;

function saveExperimentData(filenameSuffix = "") {
  if (dataAlreadySaved) return;
  const suffix = filenameSuffix || "";

  try {
    const vpnForm =
      jsPsych.data.get().filter({ form_id: "vpn" }).last(1).values()[0] ||
      jsPsych.data
        .get()
        .filter({ trial_type: "survey-html-form" })
        .first(1)
        .values()[0];

    const responses = vpnForm && vpnForm.response ? vpnForm.response : null;
    const hasVpn = responses && responses["Participant-ID"];
    const baseName = hasVpn
      ? `DirFor1_VP${responses["Participant-ID"]}`
      : "DirFor1_NoVPN";
    const filename = `${baseName}${suffix}.csv`;
    jsPsych.data.get().localSave("csv", filename);
  } catch (error) {
    console.error("Error while saving data:", error);
    jsPsych.data.get().localSave("csv", `DirFor1_Error${suffix}.csv`);
  } finally {
    dataAlreadySaved = true;
  }
}

const jsPsych = initJsPsych({
  use_webaudio: false,
  override_safe_mode: true,
  on_finish: function () {
    saveExperimentData();
  },
});

function createTimeline() {
  timeline.length = 0;
  timeline.push(
    {
      ...CBC_VPNNummer,
      data: { ...(CBC_VPNNummer.data || {}), form_id: "vpn" },
    },
    demographics_block
  );
}

function startExperiment() {
  createTimeline();
  jsPsych.run(timeline);
}
