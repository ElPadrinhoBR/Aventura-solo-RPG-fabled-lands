/**
 * MOTOR DE ÁUDIO PROCEDURAL E EFEITOS SONOROS (SFX)
 * Web Audio API nativa - Leve, reativa e sem dependências externas
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.4;
    this.currentTheme = "exploration"; // 'sea', 'exploration', 'mystery', 'combat'
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.noiseNode = null;
  }

  // Inicializa o contexto de áudio após interação do usuário
  init() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(e => console.log("Audio resume err:", e));
      }
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    // Master Gain (volume mais audível e nítido)
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Music Gain
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    // SFX Gain
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(e => console.log("Audio resume on init:", e));
    }

    this.startProceduralMusic();
  }

  // Ativa o contexto se estiver suspenso ou não criado
  resume() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(e => console.log("Audio resume:", e));
    }
    if (!this.isPlayingMusic && this.ctx) {
      this.startProceduralMusic();
    }
  }

  // ==========================================
  // EFEITOS SONOROS (SFX)
  // ==========================================

  // Som de clique de pergaminho / botão
  playClick() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // Som de rolagem de dados
  playDiceRoll() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const impacts = [0, 0.04, 0.09, 0.15, 0.22, 0.30];

      impacts.forEach((delay, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        const t = now + delay;
        const freq = 200 + Math.random() * 180;
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.04);

        const vol = 0.35 + (idx / impacts.length) * 0.25;
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.05);
      });
    } catch (e) {}
  }

  // Som de golpe de espada
  playSwordHit() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;

      // Componente metálico
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.14);

      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.16);

      // Impacto grave
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(200, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);

      subOsc.start(now);
      subOsc.stop(now + 0.2);
    } catch (e) {}
  }

  // Som de ferimento / dano sofrido
  playHurt() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.28);

      gain.gain.setValueAtTime(0.75, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  // Som de fuga veloz
  playFlee() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.08, 0.16, 0.25].forEach((d, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        const t = now + d;
        osc.frequency.setValueAtTime(280 - i * 30, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.06);

        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.07);
      });
    } catch (e) {}
  }

  // Fanfarra triunfal de vitória
  playVictoryFanfare() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // Dó, Mi, Sol, Dó alto
    const durations = [0.12, 0.12, 0.15, 0.4];

    let timeAcc = now;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, timeAcc);

      gain.gain.setValueAtTime(0.35, timeAcc);
      gain.gain.exponentialRampToValueAtTime(0.001, timeAcc + durations[idx]);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(timeAcc);
      osc.stop(timeAcc + durations[idx]);

      timeAcc += durations[idx] * 0.85;
    });
  }

  // ==========================================
  // MÚSICA PROCEDURAL ADAPTATIVA
  // ==========================================

  setTheme(theme) {
    if (this.currentTheme === theme) return;
    this.currentTheme = theme;
  }

  startProceduralMusic() {
    if (this.isPlayingMusic || !this.ctx) return;
    this.isPlayingMusic = true;

    // Escalas musicais medievais melódicas
    const dorianScale = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25];
    const seaScale = [174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00];
    const mysteryScale = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63];
    const battleBass = [73.42, 82.41, 87.31, 98.00, 110.00, 130.81];

    let step = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic || !this.ctx) {
        this.musicTimer = setTimeout(playNextNote, 1000);
        return;
      }

      if (this.isMuted) {
        this.musicTimer = setTimeout(playNextNote, 800);
        return;
      }

      try {
        const now = this.ctx.currentTime;
        let delay = 700;

        if (this.currentTheme === "combat") {
          // COMBATE: Tambores de guerra enérgicos + pulso grave
          delay = 340;
          this.synthesizeDrum(now, step % 4 === 0 ? "heavy" : "snare");
          if (step % 2 === 0) {
            const note = battleBass[Math.floor(Math.random() * battleBass.length)];
            this.synthesizeHarpNote(now, note, 0.35, 0.45);
          }
        } else if (this.currentTheme === "mystery") {
          // MISTÉRIO: Drones sombrios e notas isoladas de sino
          delay = 1100;
          if (step % 3 === 0) {
            const droneNote = mysteryScale[step % 3];
            this.synthesizeAtmosphericDrone(now, droneNote, 2.2, 0.25);
          }
          const note = mysteryScale[Math.floor(Math.random() * mysteryScale.length)];
          this.synthesizeHarpNote(now, note * 2, 0.9, 0.3);
        } else if (this.currentTheme === "sea") {
          // MAR: Brisa marinha + harpa costeira melodiosa
          delay = 750;
          if (step % 4 === 0) {
            this.synthesizeSeaWave(now);
          }
          const note = seaScale[Math.floor(Math.random() * seaScale.length)];
          this.synthesizeHarpNote(now, note, 1.1, 0.35);
        } else {
          // EXPLORAÇÃO: Alaúde medieval alegre e envolvente
          delay = 620;
          if (step % 4 === 0) {
            this.synthesizeAtmosphericDrone(now, 146.83, 1.8, 0.2); // Drone Ré
          }
          const note = dorianScale[Math.floor(Math.random() * dorianScale.length)];
          this.synthesizeHarpNote(now, note, 0.85, 0.38);
        }

        step++;
      } catch (err) {}

      this.musicTimer = setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  synthesizeHarpNote(time, freq, duration, volume) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  synthesizeAtmosphericDrone(time, freq, duration, volume) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(volume, time + duration * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  synthesizeDrum(time, type) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === "heavy") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, time);
      osc.frequency.exponentialRampToValueAtTime(35, time + 0.16);
      gain.gain.setValueAtTime(0.65, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, time);
      osc.frequency.exponentialRampToValueAtTime(60, time + 0.09);
      gain.gain.setValueAtTime(0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    }

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  synthesizeSeaWave(time) {
    // Ruído suave de onda
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(55, time);
    osc.frequency.linearRampToValueAtTime(75, time + 1.2);
    osc.frequency.linearRampToValueAtTime(45, time + 2.4);

    gain.gain.setValueAtTime(0.01, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2.5);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 2.6);
  }

  // ==========================================
  // CONTROLES DE VOLUME E MUDO
  // ==========================================

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.resume();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

// Instância global do motor de áudio (exposta em window para acesso cross-script)
window.soundEngine = new SoundEngine();
