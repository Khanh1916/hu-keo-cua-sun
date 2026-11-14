window.AudioManager = (() => {
  const STORAGE_KEY = "hu_keo_audio_enabled";
  let ctx = null;
  let enabled = false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      enabled = saved === "1";
    }
  } catch {}
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

  // Lunar New Year (Tết Âm Lịch): "Ngày Tết Quê Em" music-box rendition
  const tetSteps = [
    // "Tết Tết Tết Tết đến rồi"
    N.G4, N.G4, N.G4, N.G4, null, N.E4, null, N.G4, null, null,
    // "Tết Tết Tết Tết đến rồi"
    N.G4, N.G4, N.G4, N.G4, null, N.E4, null, N.G4, null, null,
    // "Tết đến trong tim mọi người"
    N.C5, null, N.C5, null, N.B4, N.A4, null, N.G4, null, null, null, null,
    // "Mừng ngày Tết trên khắp quê tôi"
    N.E4, null, N.G4, null, N.A4, N.A4, null, N.G4, null, N.E4, null, N.D4, null, null,
    // "Người ra Trung ra Bắc vô Nam"
    N.D4, null, N.E4, null, N.G4, N.G4, null, N.E4, null, N.D4, null, N.C4, null, null,
    // "Dù đi đâu ai cũng nhớ"
    N.C4, null, N.D4, null, N.E4, null, N.G4, null, N.A4, null, N.C5, null,
    // "Về chung vui bên gia đình"
    N.A4, null, N.G4, null, N.E4, null, N.D4, null, N.C4, null, null, null, null, null
  ];

  // Christmas Noel: "Jingle Bells" festive 8-bit chime melody
  const noelSteps = [
    // "Jingle bells, jingle bells, jingle all the way"
    N.E4, N.E4, N.E4, null, N.E4, N.E4, N.E4, null,
    N.E4, N.G4, N.C4, N.D4, N.E4, null, null, null,
    // "Oh what fun it is to ride in a one-horse open sleigh, hey!"
    N.F4, N.F4, N.F4, N.F4, N.F4, N.E4, N.E4, N.E4,
    N.E4, N.D4, N.D4, N.E4, N.D4, null, N.G4, null,
    // "Jingle bells, jingle bells, jingle all the way"
    N.E4, N.E4, N.E4, null, N.E4, N.E4, N.E4, null,
    N.E4, N.G4, N.C4, N.D4, N.E4, null, null, null,
    // "Oh what fun it is to ride in a one-horse open sleigh!"
    N.F4, N.F4, N.F4, N.F4, N.F4, N.E4, N.E4, N.E4,
    N.G4, N.G4, N.F4, N.D4, N.C4, null, null, null
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

  function triggerHaptic(pattern = 15) {
    // 1. Android & browsers with HTML5 Vibration API
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }

    // 2. iOS Safari & WebKit PWA (Taptic Engine tick via switch label trick)
    try {
      const label = document.getElementById("hapticSwitchLabel");
      if (label) {
        label.click();
        if (Array.isArray(pattern) && pattern.length > 2) {
          setTimeout(() => {
            try { label.click(); } catch {}
          }, Math.min(120, pattern[1] || 60));
        }
      }
    } catch {}
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
    if (currentTheme === "tet") return { steps: tetSteps, tempoMs: 250 };
    if (currentTheme === "noel") return { steps: noelSteps, tempoMs: 240 };
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

  const api = {
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
      try {
        localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
      } catch {}
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
      try {
        localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
      } catch {}
      if (enabled) {
        ensureContext();
        startBGM();
      } else {
        stopBGM();
      }
    },

    playClick() {
      triggerHaptic(10);
      playTone(620, 0.07, "triangle", 0.05, 740);
    },

    playHug() {
      triggerHaptic([20, 50, 30]);
      playTone(523.25, 0.14, "sine", 0.06, null, 0);
      playTone(659.25, 0.16, "sine", 0.06, null, 0.09);
      playTone(783.99, 0.24, "sine", 0.07, null, 0.18);
    },

    playMeow() {
      triggerHaptic([15, 35, 15]);
      playTone(680, 0.14, "triangle", 0.06, 920, 0);
      playTone(920, 0.18, "triangle", 0.05, 620, 0.13);
    },

    playCandy() {
      triggerHaptic(20);
      playTone(784, 0.08, "square", 0.03, null, 0);
      playTone(1046.5, 0.14, "square", 0.03, null, 0.07);
    },

    playCombo(combo = 1) {
      triggerHaptic([15, 25, 20]);
      const pentatonic = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
      const base = pentatonic[Math.min(pentatonic.length - 1, Math.max(0, combo - 1))];
      playTone(base, 0.11, "triangle", 0.055, base * 1.12, 0);
    },

    playPowerup() {
      triggerHaptic([20, 30, 25, 30, 35]);
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, idx) => {
        playTone(f, 0.12, "sine", 0.06, null, idx * 0.055);
      });
    },

    playFlap() {
      triggerHaptic(10);
      playTone(360, 0.08, "sine", 0.045, 540);
    },

    playBonk() {
      triggerHaptic(40);
      playTone(220, 0.18, "sawtooth", 0.045, 110);
    },

    playNote() {
      triggerHaptic(16);
      playTone(587.33, 0.12, "sine", 0.05, null, 0);
      playTone(880, 0.22, "sine", 0.05, null, 0.08);
    },

    playLevelUp() {
      triggerHaptic([30, 45, 35, 45, 60]);
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, idx) => playTone(n, 0.18, "triangle", 0.06, null, idx * 0.09));
    },

    playCelebration() {
      triggerHaptic([25, 35, 25, 35, 50]);
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach((n, idx) => playTone(n, 0.2, "triangle", 0.065, null, idx * 0.08));
    },

    playVinylChill() {
      triggerHaptic([18, 28, 18]);
      // Warm lofi chords inspired by MCK 99% / Chìm Sâu
      const chillNotes = [
        { f: 311.13, d: 0.25, delay: 0 },      // Eb4
        { f: 392.00, d: 0.26, delay: 0.09 },   // G4
        { f: 466.16, d: 0.28, delay: 0.18 },   // Bb4
        { f: 587.33, d: 0.38, delay: 0.27 },   // D5 (Maj7 sweet touch)
        { f: 523.25, d: 0.32, delay: 0.42 },   // C5
        { f: 466.16, d: 0.50, delay: 0.56 }    // Bb4 cozy sustain
      ];
      chillNotes.forEach(n => {
        playTone(n.f, n.d, "triangle", 0.05, null, n.delay);
      });
    },

    haptic: triggerHaptic,

    suspendForMic() {
      stopBGM();
      if (ctx && ctx.state === "running") {
        ctx.suspend().catch(() => {});
      }
    },

    resumeAfterMic() {
      if (enabled) {
        ensureContext();
        startBGM();
      }
    }
  };

  // Mobile WebAudio autoplay unlock on first gesture
  function unlockOnGesture() {
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    if (enabled && !bgmTimer) {
      ensureContext();
      startBGM();
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("pointerdown", unlockOnGesture, { passive: true });
    window.addEventListener("touchstart", unlockOnGesture, { passive: true });
    window.addEventListener("click", unlockOnGesture, { passive: true });
    window.addEventListener("keydown", unlockOnGesture, { passive: true });
  }

  return api;
})();
