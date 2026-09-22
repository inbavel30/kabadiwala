import { AppLanguage } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private activeListeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (speaking: boolean) => void) {
    this.activeListeners.push(listener);
    return () => {
      this.activeListeners = this.activeListeners.filter((l) => l !== listener);
    };
  }

  private notify(speaking: boolean) {
    this.isSpeaking = speaking;
    this.activeListeners.forEach((l) => l(speaking));
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.notify(false);
  }

  public speak(text: string, lang: AppLanguage = 'en') {
    if (!this.synth) {
      console.warn('Speech synthesis not supported on this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate locale
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    // Try finding matching voice
    const voices = this.synth.getVoices();
    const targetLangCode = lang === 'hi' ? 'hi' : lang === 'mr' ? 'mr' : 'en';
    const matchedVoice = voices.find((v) => v.lang.startsWith(targetLangCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95; // slightly slower for maximum clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
    };

    utterance.onerror = () => {
      this.notify(false);
    };

    this.synth.speak(utterance);
  }

  public speakPrice(
    materialName: string,
    price: number,
    unit: string,
    trend: 'up' | 'down' | 'stable',
    lang: AppLanguage
  ) {
    let script = '';
    if (lang === 'hi') {
      const trendText = trend === 'up' ? 'भाव बढ़ रहा है' : trend === 'down' ? 'भाव घट रहा है' : 'भाव स्थिर है';
      script = `${materialName} का भाव: ${price} रुपये प्रति ${unit} है। ${trendText}।`;
    } else if (lang === 'mr') {
      const trendText = trend === 'up' ? 'दर वाढत आहे' : trend === 'down' ? 'दर कमी होत आहे' : 'दर स्थिर आहे';
      script = `${materialName}चा भाव: ${price} रुपये प्रति ${unit} आहे। ${trendText}।`;
    } else {
      const trendText = trend === 'up' ? 'Trend is rising' : trend === 'down' ? 'Trend is falling' : 'Price is steady';
      script = `${materialName} price: ${price} rupees per ${unit}. ${trendText}.`;
    }
    this.speak(script, lang);
  }

  public speakSafety(title: string, rule: string, lang: AppLanguage) {
    let script = `${title}. ${rule}`;
    this.speak(script, lang);
  }
}

export const speechService = new SpeechService();
