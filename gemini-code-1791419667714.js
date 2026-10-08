// Web Audio API Synthesizer for Virtual Piano
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Note frequencies map (Hz)
const noteFrequencies = {
  'C4': 261.63,  // دو
  'C#4': 277.18,
  'D4': 293.66,  // ري
  'D#4': 311.13,
  'E4': 329.63,  // مي
  'F4': 349.23,  // فا
  'F#4': 369.99,
  'G4': 392.00,  // صول
  'G#4': 415.30,
  'A4': 440.00,  // لا
  'A#4': 466.16,
  'B4': 493.88,  // سي
  'C5': 523.25   // دو جواب
};

function playTone(freq) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle'; // Piano-like timbre
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.2);
}

// Event Listeners for Touch and Click
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('mousedown', () => {
    const note = key.getAttribute('data-note');
    if (noteFrequencies[note]) {
      playTone(noteFrequencies[note]);
      key.classList.add('active');
    }
  });

  key.addEventListener('mouseup', () => key.classList.remove('active'));
  key.addEventListener('mouseleave', () => key.classList.remove('active'));
  
  // Touch support for mobile devices
  key.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const note = key.getAttribute('data-note');
    if (noteFrequencies[note]) {
      playTone(noteFrequencies[note]);
      key.classList.add('active');
    }
  });
  key.addEventListener('touchend', () => key.classList.remove('active'));
});