/**
 * MOTOR DE ÁUDIO PROCEDURAL E EFEITOS SONOROS (SFX)
 * Web Audio API nativa - Leve, reativa, procedural e sem dependências externas
 * Fabled Lands II: Cidades de Ouro e Glória
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.5;
    this.currentTheme = 'sea'; // 'sea', 'exploration', 'mystery', 'combat'
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.step = 0;
  }

  // Inicializa o AudioContext com salvaguardas para políticas de autoplay
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music Gain (volume musical balanceado)
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // SFX Gain (efeitos sonoros nítidos)
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      this.startProceduralMusic();
    } catch (e) {
      console.warn('Web Audio não suportado ou bloqueado:', e);
    }
  }

  // Reativa o contexto e garante que a música procedural continue tocando
  resume() {
    if (!this.ctx) {
      this.init();
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
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
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

      gain.gain.setValueAtTime(0.4, now);
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
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;
      const impacts = [0, 0.04, 0.09, 0.15, 0.22, 0.29];

      impacts.forEach((delay, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const t = now + delay;
        const freq = 180 + Math.random() * 190;
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.04);

        const vol = 0.25 + (idx / impacts.length) * 0.25;
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.05);
      });
    } catch (e) {}
  }

  // Som de golpe de espada / combate
  playSwordHit() {
    this.resume();
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;

      // Ruído metálico agudo
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.14);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.15);

      // Impacto corporal
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(180, now);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

      subGain.gain.setValueAtTime(0.6, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);

      subOsc.start(now);
      subOsc.stop(now + 0.19);
    } catch (e) {}
  }

  // Som de dano sofrido
  playHurt() {
    this.resume();
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

      gain.gain.setValueAtTime(0.65, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {}
  }

  // Som de fuga veloz
  playFlee() {
    this.resume();
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;
      [0, 0.07, 0.14, 0.22].forEach((d, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const t = now + d;
        osc.frequency.setValueAtTime(260 - i * 30, t);
        osc.frequency.exponentialRampToValueAtTime(85, t + 0.06);

        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.07);
      });
    } catch (e) {}
  }

  // Som de sucesso / descoberta (mapa, tesouro, nível)
  playSuccess() {
    this.resume();
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;
      const chords = [329.63, 392.00, 493.88, 659.25]; // Mi menor 7 / harmonia mística
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.28, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.65);
      });
    } catch (e) {}
  }

  // Fanfarra triunfal de vitória
  playVictoryFanfare() {
    this.resume();
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime + 0.01;
      const notes = [261.63, 329.63, 392.00, 523.25];
      const durations = [0.12, 0.12, 0.15, 0.45];

      let timeAcc = now;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, timeAcc);

        gain.gain.setValueAtTime(0.001, timeAcc);
        gain.gain.linearRampToValueAtTime(0.35, timeAcc + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, timeAcc + durations[idx]);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(timeAcc);
        osc.stop(timeAcc + durations[idx] + 0.05);

        timeAcc += durations[idx] * 0.82;
      });
    } catch (e) {}
  }

  // ==========================================
  // MÚSICA PROCEDURAL ADAPTATIVA
  // ==========================================

  setTheme(theme) {
    if (this.currentTheme === theme) return;
    this.currentTheme = theme;
    this.step = 0;
  }

  startProceduralMusic() {
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
    }
    this.isPlayingMusic = true;

    // Escalas medievais melódicas (Frequências em Hz)
    const dorianScale = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];
    const seaScale = [174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00];
    const mysteryScale = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63];
    const battleBass = [65.41, 73.42, 82.41, 87.31, 98.00, 110.00];

    const playLoop = () => {
      if (!this.isPlayingMusic) return;

      // Se ainda não foi inicializado ou o navegador suspendeu, aguarda e tenta reativar
      if (!this.ctx || this.ctx.state !== 'running') {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        this.musicTimer = setTimeout(playLoop, 600);
        return;
      }

      if (this.isMuted) {
        this.musicTimer = setTimeout(playLoop, 700);
        return;
      }

      let delay = 680;

      try {
        const now = this.ctx.currentTime + 0.04; // Lookahead de 40ms garante estabilidade temporal

        if (this.currentTheme === 'combat') {
          // COMBATE: Tambores de guerra rítmicos + pulso grave
          delay = 340;
          this.synthesizeDrum(now, this.step % 4 === 0 ? 'heavy' : 'snare');
          if (this.step % 2 === 0) {
            const note = battleBass[Math.floor(Math.random() * battleBass.length)];
            this.synthesizeHarpNote(now, note, 0.32, 0.4);
          }
        } else if (this.currentTheme === 'mystery') {
          // MISTÉRIO: Drones sombrios e notas isoladas de sino
          delay = 1050;
          if (this.step % 3 === 0) {
            const droneNote = mysteryScale[this.step % mysteryScale.length];
            this.synthesizeAtmosphericDrone(now, droneNote, 2.2, 0.22);
          }
          const note = mysteryScale[Math.floor(Math.random() * mysteryScale.length)];
          this.synthesizeHarpNote(now, note * 2, 0.9, 0.28);
        } else if (this.currentTheme === 'sea') {
          // MAR: Brisa marinha suave + harpa costeira melodiosa
          delay = 760;
          if (this.step % 4 === 0) {
            this.synthesizeSeaWave(now);
          }
          const note = seaScale[Math.floor(Math.random() * seaScale.length)];
          this.synthesizeHarpNote(now, note, 1.1, 0.32);
        } else {
          // EXPLORAÇÃO: Alaúde medieval alegre e harmônico
          delay = 620;
          if (this.step % 4 === 0) {
            this.synthesizeAtmosphericDrone(now, 146.83, 1.8, 0.18); // Drone Ré
          }
          const note = dorianScale[Math.floor(Math.random() * dorianScale.length)];
          this.synthesizeHarpNote(now, note, 0.85, 0.32);
        }

        this.step++;
      } catch (err) {
        // Recuperação transparente de qualquer micro-erro temporal
      }

      this.musicTimer = setTimeout(playLoop, delay);
    };

    playLoop();
  }

  synthesizeHarpNote(time, freq, duration, volume) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.05);
    } catch (e) {}
  }

  synthesizeAtmosphericDrone(time, freq, duration, volume) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(volume, time + duration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.05);
    } catch (e) {}
  }

  synthesizeDrum(time, type) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'heavy') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.15);
        gain.gain.setValueAtTime(0.65, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.17);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, time);
        osc.frequency.exponentialRampToValueAtTime(60, time + 0.09);
        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      }

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 0.18);
    } catch (e) {}
  }

  synthesizeSeaWave(time) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, time);
      osc.frequency.linearRampToValueAtTime(75, time + 1.2);
      osc.frequency.linearRampToValueAtTime(45, time + 2.4);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.14, time + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 2.5);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + 2.6);
    } catch (e) {}
  }

  // ==========================================
  // CONTROLES DE VOLUME E MUDO
  // ==========================================

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime + 0.01;
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, t);
    }
  }

  toggleMute() {
    this.resume();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime + 0.01;
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, t);
    }
    return this.isMuted;
  }
}

// Instância global única exposta para o jogo
window.soundEngine = new SoundEngine();
