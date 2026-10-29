let currentMidiPitch = -1;
let workletNode;
let stream;
let source;
let audioContext;

const startMic = async () => {
  if (stream || ignoreMic) return;

  stream = await navigator.mediaDevices.getUserMedia({audio: true});
  audioContext = new AudioContext();
  const sampleRate = audioContext.sampleRate;

  await audioContext.audioWorklet.addModule("audio_worklet.js");

  workletNode = new AudioWorkletNode(audioContext, "audio_worklet");

  workletNode.port.onmessage = (event) => {
    const {frequency, confidence, volume, allow} = event.data;

    if (confidence > 0.8) {
      currentMidiPitch = Math.round(12 * Math.log2(frequency / 440)) + 69;
    } else {
      currentMidiPitch = -1;
    }
  };

  source = audioContext.createMediaStreamSource(stream);
  source.connect(workletNode);
}

const stopMic = async () => {
    stream?.getTracks().forEach((track) => track.stop());

    workletNode?.disconnect();
    source?.disconnect();

    if (audioContext) {
        await audioContext.close();
    }

    stream = null;
    workletNode = null;
    source = null;
    audioContext = null;
    currentMidiPitch = -1;
};