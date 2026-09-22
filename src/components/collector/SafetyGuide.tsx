import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  BatteryCharging,
  Tv,
  AlertTriangle,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  Eye,
  Footprints,
  Sparkles,
} from 'lucide-react';
import { SAFETY_TOPICS } from '../../services/database';
import { translations } from '../../localization/translations';
import { speechService } from '../../services/speech';
import { AppLanguage } from '../../types';

interface SafetyGuideProps {
  language: AppLanguage;
}

const TOPIC_TRANSLATIONS: Record<AppLanguage, Record<string, {
  category: string;
  title: string;
  dos: string[];
  donts: string[];
}>> = {
  en: {
    safe_cables: {
      category: 'Copper & PVC Cables',
      title: 'Do NOT Burn Cables',
      dos: [
        'Use mechanical wire stripping tools or manual blades with gloves.',
        'Sell insulated cables directly to authorized recyclers with granulation plants.',
        'Work in open, well-ventilated outdoor shed areas.',
      ],
      donts: [
        'NEVER set fire to cable heaps or plastic insulation.',
        'Burning PVC produces carcinogenic dioxins, furans and black toxic smoke.',
        'Never breathe smoke; it causes severe permanent lung damage.',
      ],
    },
    safe_batteries: {
      category: 'Lead-Acid & Li-Ion Batteries',
      title: 'Do NOT Break Open Batteries',
      dos: [
        'Keep batteries upright on wooden pallets away from water puddles.',
        'Tape open terminals to prevent dead-shorts and fire sparks.',
        'Wash hands immediately with soap if acid touches your skin.',
      ],
      donts: [
        'DO NOT crack battery bodies with hammers or chisels to drain acid.',
        'Sulfuric acid causes severe skin burns and permanent blindness.',
        'Do not throw lithium mobile batteries into regular metal scrap; they explode if punctured.',
      ],
    },
    safe_crt: {
      category: 'Cathode Ray Tubes (CRT Screens)',
      title: 'Do NOT Smash TV Screens',
      dos: [
        'Handle CRT screens by the heavy metal band with two people.',
        'Store indoors in dry boxes to prevent accidental knocking.',
        'Always wear thick safety glasses and heavy leather gloves.',
      ],
      donts: [
        'DO NOT strike the thin glass neck or vacuum funnel with a hammer.',
        'Sudden vacuum collapse causes explosive glass implosion.',
        'Funnel glass contains high levels of toxic lead dust; do not inhale powder.',
      ],
    },
    safe_ppe: {
      category: 'Protective Equipment (PPE)',
      title: 'Always Use Basic Protection',
      dos: [
        'Wear cut-resistant canvas or leather gloves while handling circuit boards.',
        'Wear sturdy closed shoes or boots to prevent nail and glass punctures.',
        'Use an N95 dust mask when sweeping scrap warehouse areas.',
      ],
      donts: [
        'Do not dismantle electronics barefoot or in rubber slippers.',
        'Do not eat, chew tobacco, or drink tea with unwashed scrap-handling hands.',
      ],
    },
  },
  hi: {
    safe_cables: {
      category: 'तांबा और पीवीसी तार',
      title: 'तारों को कभी न जलाएं',
      dos: [
        'दस्ताने पहनकर तार छीलने वाले औजार या चाकू का उपयोग करें।',
        'इंसुलेटेड तार सीधे अधिकृत रिसाइक्लर को बेचें।',
        'खुली, हवादार जगह में काम करें।',
      ],
      donts: [
        'तारों या प्लास्टिक में कभी आग न लगाएं।',
        'पीवीसी जलाने से जहरीला काला धुआं निकलता है जो फेफड़ों को खराब करता है।',
        'धुएं में सांस न लें; यह गंभीर बीमारी का कारण बनता है।',
      ],
    },
    safe_batteries: {
      category: 'लेड-एसिड और लिथियम बैटरी',
      title: 'बैटरी को कभी न तोड़ें',
      dos: [
        'बैटरियों को हमेशा लकड़ी के पटिये पर सीधा रखें, पानी से दूर।',
        'शॉर्ट सर्किट रोकने के लिए बैटरी के सिरों पर टेप लगाएं।',
        'तेजाब लगने पर तुरंत साबुन और पानी से धोएं।',
      ],
      donts: [
        'तेजाब निकालने के लिए हथौड़े से बैटरी कभी न फोड़ें।',
        'सल्फ्यूरिक एसिड से त्वचा जलती है और आंखें खराब हो सकती हैं।',
        'मोबाइल बैटरी को कभी सामान्य धातु में न फेंकें; वे फट सकती हैं।',
      ],
    },
    safe_crt: {
      category: 'सीआरटी टीवी और मॉनिटर स्क्रीन',
      title: 'टीवी स्क्रीन को कभी न फोड़ें',
      dos: [
        'सीआरटी स्क्रीन को दो लोग मिलकर धातु के घेरे से उठाएं।',
        'सूखे बक्से में सुरक्षित रखें ताकि कोई ठोकर न लगे।',
        'हमेशा मोटे चश्मे और चमड़े के दस्ताने पहनें।',
      ],
      donts: [
        'हथौड़े से शीशे की गर्दन या वैक्यूम फनल पर वार न करें।',
        'वैक्यूम टूटने से शीशा चारों तरफ जोर से फटता है।',
        'इसमें जहरीला लेड पाउडर होता है; पाउडर को सांस में न लें।',
      ],
    },
    safe_ppe: {
      category: 'सुरक्षा उपकरण (पीपीई)',
      title: 'हमेशा बुनियादी सुरक्षा उपकरण पहनें',
      dos: [
        'सर्किट बोर्ड उठाते समय मोटे दस्ताने पहनें।',
        'कांच और कीलों से बचने के लिए मजबूत जूते पहनें।',
        'कबाड़ गोदाम की सफाई करते समय मास्क लगाएं।',
      ],
      donts: [
        'नंगे पैर या चप्पल में इलेक्ट्रॉनिक्स कबाड़ न तोड़ें।',
        'कबाड़ छूने के बाद बिना हाथ धोए खाना, चाय या तंबाकू न लें।',
      ],
    },
  },
  mr: {
    safe_cables: {
      category: 'तांबे आणि पीव्हीसी वायर',
      title: 'वायरी कधीही जाळू नका',
      dos: [
        'हातमोजे घालून वायर सोलण्याच्या हत्यारांचा वापर करा.',
        'इंसुलेटेड वायर थेट अधिकृत रिसायकलर्सना विका.',
        'मोकळ्या आणि हवेशीर जागेत काम करा.',
      ],
      donts: [
        'वायरींना किंवा प्लास्टिकला कधीही आग लावू नका.',
        'पीव्हीसी जाळल्याने विषारी काळा धूर निघतो जो फुफ्फुसांना हानी करतो.',
        'धुरामध्ये श्वास घेऊ नका; यामुळे कायमस्वरूपी आजार होऊ शकतात.',
      ],
    },
    safe_batteries: {
      category: 'लेड-अ‍ॅसिड आणि लिथियम बॅटरी',
      title: 'बॅटरी हातोड्याने फोडू नका',
      dos: [
        'बॅटरी लाकडी फळीवर नेहमी सरळ ठेवा, पाण्यापासून दूर.',
        'शॉर्ट सर्किट टाळण्यासाठी बॅटरीच्या टोकांवर पट्टी लावा.',
        'अ‍ॅसिड अंगावर पडल्यास ताबडतोब साबणाने धुवा.',
      ],
      donts: [
        'अ‍ॅसिड काढण्यासाठी हातोड्याने बॅटरी कधीही फोडू नका.',
        'सल्फ्यूरिक अ‍ॅसिडमुळे त्वचा भाजते आणि डोळे निकामी होऊ शकतात.',
        'मोबाईलच्या बॅटरी भंगारात टाकू नका; छिद्र पडल्यास स्फोट होतो.',
      ],
    },
    safe_crt: {
      category: 'सीआरटी टीव्ही स्क्रीन',
      title: 'टीव्ही स्क्रीन फोडू नका',
      dos: [
        'सीआरटी स्क्रीन दोन व्यक्तींनी मिळून धातूच्या कडेने उचलावी.',
        'कोरड्या खोक्यात सुरक्षित ठेवा जेणेकरून धक्का लागणार नाही.',
        'नेहमी चष्मा आणि जाड चामड्याचे हातमोजे वापरा.',
      ],
      donts: [
        'हातोड्याने काचेच्या नळीवर कधीही मारू नका.',
        'व्हॅक्यूम अचानक फुटल्याने काचा उडतात.',
        'यात विषारी शिशाची भुकटी असते; ती नाकात जाऊ देऊ नका.',
      ],
    },
    safe_ppe: {
      category: 'संरक्षक उपकरणे (पीपीई)',
      title: 'नेहमी प्राथमिक सुरक्षा वापरा',
      dos: [
        'सर्किट बोर्ड हाताळताना जाड हातमोजे वापरा.',
        'काचा आणि खिळ्यांपासून संरक्षणासाठी बूट वापरा.',
        'गोदाम स्वच्छ करताना धूळ प्रतिबंधक मास्क वापरा.',
      ],
      donts: [
        'उघड्या पायांनी किंवा चपलांवर काम करू नका.',
        'हात स्वच्छ धुतल्याशिवाय खाऊ किंवा चहा घेऊ नका.',
      ],
    },
  },
};

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ language }) => {
  const t = translations[language];
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const handleAudioPlay = (topic: typeof SAFETY_TOPICS[0]) => {
    if (activeSpeechId === topic.id) {
      speechService.stop();
      setActiveSpeechId(null);
      return;
    }

    setActiveSpeechId(topic.id);
    let speechText = topic.audioScriptKey;
    if (language === 'hi') {
      if (topic.id === 'safe_cables') {
        speechText = 'तार सुरक्षा: तांबे के तार कभी न जलाएं। तार जलाने से जहरीला धुआं निकलता है जो फेफड़ों को नुकसान पहुंचाता है। तार को चाकू से छीलें।';
      } else if (topic.id === 'safe_batteries') {
        speechText = 'बैटरी सुरक्षा: बैटरी को हथौड़े से कभी न तोड़ें। इसके अंदर तेजाब होता है जो आंखों की रोशनी छीन सकता है और त्वचा जला सकता है।';
      } else if (topic.id === 'safe_crt') {
        speechText = 'सीआरटी टीवी सुरक्षा: टीवी स्क्रीन की काच को कभी न फोड़ें। इसमें वैक्यूम होता है और जोर का धमाका हो सकता है।';
      } else {
        speechText = 'व्यक्तिगत सुरक्षा: कबाड़ उठाते समय हमेशा मोटे दस्ताने और जूते पहनें। खाने से पहले हाथ साबुन से धोएं।';
      }
    } else if (language === 'mr') {
      if (topic.id === 'safe_cables') {
        speechText = 'वायर सुरक्षा: तांब्याची वायर कधीही जाळू नका. प्लास्टिक जाळल्याने विषारी वायू बाहेर पडतो जो फुफ्फुसांना हानी पोहोचवतो.';
      } else if (topic.id === 'safe_batteries') {
        speechText = 'बॅटरी सुरक्षा: बॅटरी हातोड्याने कधीही फोडू नका. त्यातील ऍसिड डोळे आणि त्वचेला गंभीर इजा करू शकते.';
      } else if (topic.id === 'safe_crt') {
        speechText = 'टीव्ही काच सुरक्षा: जुन्या टीव्हीची काच फोडू नका. व्हॅक्यूममुळे मोठा स्फोट होऊ शकतो.';
      } else {
        speechText = 'सुरक्षा साधने: भंगार हाताळताना जाड हातमोजे आणि बूट वापरा. खाण्यापूर्वी हात स्वच्छ धुवा.';
      }
    }

    speechService.speak(speechText, language);

    const checkInterval = setInterval(() => {
      if (!speechService.getIsSpeaking()) {
        setActiveSpeechId(null);
        clearInterval(checkInterval);
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-white" />
          <h1 className="text-xl font-extrabold">{t.safetyTitle}</h1>
        </div>
        <p className="text-xs text-white/90 font-medium">{t.safetySubtitle}</p>
        <div className="pt-2 text-xs font-semibold text-blue-100">
          * {t.safetyAlertDesc}
        </div>
      </div>

      {/* Safety Topic Cards */}
      <div className="space-y-4">
        {SAFETY_TOPICS.map((topic) => {
          const isPlaying = activeSpeechId === topic.id;
          const loc = TOPIC_TRANSLATIONS[language]?.[topic.id] || {
            category: topic.category,
            title: topic.titleKey,
            dos: topic.dosKey,
            donts: topic.dontsKey,
          };

          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs space-y-3"
            >
              {/* Card Header with Icon and Audio button */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 border border-blue-200">
                    {topic.icon === 'Flame' && <Flame className="w-6 h-6" />}
                    {topic.icon === 'BatteryCharging' && <BatteryCharging className="w-6 h-6" />}
                    {topic.icon === 'Tv' && <Tv className="w-6 h-6" />}
                    {topic.icon === 'ShieldAlert' && <ShieldAlert className="w-6 h-6" />}
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                      {loc.category}
                    </span>
                    <h3 className="text-base font-extrabold text-blue-950 mt-0.5">
                      {loc.title}
                    </h3>
                  </div>
                </div>

                {/* Voice button */}
                <button
                  onClick={() => handleAudioPlay(topic)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shrink-0 ${
                    isPlaying
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  }`}
                  title="Listen in your language"
                >
                  {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isPlaying ? t.stopAudio : t.listenGuide}</span>
                </button>
              </div>

              {/* Do's & Don'ts Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* DOs */}
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 space-y-1.5">
                  <div className="text-xs font-extrabold text-blue-900 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>{t.dos}</span>
                  </div>
                  <ul className="text-xs text-blue-950 space-y-1 font-medium pl-1">
                    {loc.dos.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONTs */}
                <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1.5">
                  <div className="text-xs font-extrabold text-blue-950 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-blue-600" />
                    <span>{t.donts}</span>
                  </div>
                  <ul className="text-xs text-blue-900 space-y-1 font-medium pl-1">
                    {loc.donts.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
