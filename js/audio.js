window.AudioManager = (() => {
  let ctx = null;
  let enabled = false;
  let bgmTimer = null;
  let stepIndex = 0;
  let currentTheme = "normal"; // "normal" | "birthday" | "anniversary"

  const N = {
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
    B5: 987.77
  };

  // Normal: Cozy Cmaj7 -> Am7 -> Fmaj7 -> G6 music-box arpeggio
  const normalSteps = [
    N.C5, N.E5, N.G5, N.B5, N.G5, N.E5,
    N.A4, N.C5, N.E5, N.G5, N.E5, N.C5,
    349.23, N.A4, N.C5, N.E5, N.C5, N.A4,
    N.G4, N.B4, N.D5, N.E5, N.D5, N.B4
  ];

  // Birthday: "Happy Birthday To You" warm music-box melody
  const birthdaySteps = [
    N.G4, N.G4, N.A4, null, N.G4, null, N.C5, null, N.B4, null, null, null,
    N.G4, N.G4, N.A4, null, N.G4, null, N.D5, null, N.C5, null, null, null,
    N.G4, N.G4, N.G5, null, N.E5, null, N.C5, null, N.B4, N.A4, null, null,
    N.F5, N.F5, N.E5, null, N.C5, null, N.D5, null, N.C5, null, null, null
  ];

  // Anniversary (11/02): "My Love" (Westlife) chorus music-box rendition
  const anniversarySteps = [
    // "So I say a little prayer"
    N.C5, N.D5, N.E5, null, N.E5, N.D5, N.C5, N.A4, null, null,
    // "And hope my dreams will take me there"
    N.A4, N.C5, N.D5, null, N.D5, N.C5, N.A4, N.G4, null, null,
    // "Where the skies are blue, to see you once again, my love"
    N.G4, N.A4, N.C5, N.D5, N.C5, N.E5, N.D5, null, N.C5, N.D5, N.C5, N.A4, N.G4, null, null, null,
    // "Over seas from coast to coast"
    N.C5, N.D5, N.E5, null, N.E5, N.D5, N.C5, N.A4, null, null,
    // "To find the place I love the most"
    N.A4, N.C5, N.D5, null, N.D5, N.C5, N.A4, N.G4, null, null,
    // "Where the fields are green, to see you once again, my love"
    N.G4, N.A4, N.C5, N.D5, N.C5, N.E5, N.D5, null, N.C5, N.A4, N.G4, N.C5, null, null, null, null
  ];

  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playTone(freq, duration, type = "sine", volume = 0.06, slideTo = null, delay = 0) {
    if (!enabled) return;
    const ac = ensureContext();
    if (!ac) return;

    const now = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function getActivePattern() {
    if (currentTheme === "birthday") return { steps: birthdaySteps, tempoMs: 265 };
    if (currentTheme === "anniversary") return { steps: anniversarySteps, tempoMs: 280 };
    return { steps: normalSteps, tempoMs: 390 };
  }

  function startBGM() {
    if (bgmTimer) return;
    const { steps, tempoMs } = getActivePattern();
    bgmTimer = setInterval(() => {
      if (!enabled) return;
      const freq = steps[stepIndex % steps.length];
      if (freq) {
        playTone(freq, currentTheme === "normal" ? 0.42 : 0.48, "sine", 0.036);
        if (stepIndex % 6 === 0) {
          playTone(freq * 0.5, 0.85, "triangle", 0.024);
        }
      }
      stepIndex++;
    }, tempoMs);
  }

  function stopBGM() {
    if (bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
    }
  }

  return {
    isEnabled: () => enabled,

    setTheme(theme) {
      const next = theme || "normal";
      if (next === currentTheme) return;
      currentTheme = next;
      stepIndex = 0;
      if (enabled) {
        stopBGM();
        startBGM();
      }
    },

    getTheme: () => currentTheme,

    toggle() {
      enabled = !enabled;
      if (enabled) {
        ensureContext();
        startBGM();
        this.playClick();
      } else {
        stopBGM();
      }
      return enabled;
    },

    setEnabled(val) {
      enabled = Boolean(val);
      if (enabled) {
        ensureContext();
        startBGM();
      } else {
        stopBGM();
      }
    },

    playClick() {
      playTone(620, 0.07, "triangle", 0.05, 740);
    },

    playHug() {
      playTone(523.25, 0.14, "sine", 0.06, null, 0);
      playTone(659.25, 0.16, "sine", 0.06, null, 0.09);
      playTone(783.99, 0.24, "sine", 0.07, null, 0.18);
    },

    playMeow() {
      playTone(680, 0.14, "triangle", 0.06, 920, 0);
      playTone(920, 0.18, "triangle", 0.05, 620, 0.13);
    },

    playCandy() {
      playTone(784, 0.08, "square", 0.03, null, 0);
      playTone(1046.5, 0.14, "square", 0.03, null, 0.07);
    },

    playCombo(combo = 1) {
      const pentatonic = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
      const base = pentatonic[Math.min(pentatonic.length - 1, Math.max(0, combo - 1))];
      playTone(base, 0.11, "triangle", 0.055, base * 1.12, 0);
    },

    playPowerup() {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, idx) => {
        playTone(f, 0.12, "sine", 0.06, null, idx * 0.055);
      });
    },

    playFlap() {
      playTone(360, 0.08, "sine", 0.045, 540);
    },

    playBonk() {
      playTone(220, 0.18, "sawtooth", 0.045, 110);
    },

    playNote() {
      playTone(587.33, 0.12, "sine", 0.05, null, 0);
      playTone(880, 0.22, "sine", 0.05, null, 0.08);
    },

    playLevelUp() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, idx) => playTone(n, 0.18, "triangle", 0.06, null, idx * 0.09));
    }
  };
})();
