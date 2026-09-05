/// <reference types="@workadventure/iframe-api-typings" />

const npcSounds: Record<string, string[]> = {
  "Zitierende Zirze": [
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_1.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_2.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_3.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_4.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/Zirze_5.wav",
  ],

  "Prof. Sake": [
    "https://science-write.github.io/Avatar-based-scientific-writing/sake_1.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/sake_2.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/sake_3.wav",
  ],

  "Mumblecore": [
    "https://science-write.github.io/Avatar-based-scientific-writing/mumblecore_1.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/mumblecore_2.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/mumblecore_3.wav",
  ],

  "Prof. McDongle": [
    "https://science-write.github.io/Avatar-based-scientific-writing/dongagle_1.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/dongagle_2.wav",
    "https://science-write.github.io/Avatar-based-scientific-writing/dongagle_3.wav",
  ],
};

const soundConfig = {
  volume: 0.5,
  loop: false,
  rate: 1,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};

function playRandomNPCSound(npcName: string) {
  const sounds = npcSounds[npcName];

  if (!sounds || sounds.length === 0) {
    console.log(`No sounds configured for NPC: ${npcName}`);
    return;
  }

  const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

  const sound = WA.sound.loadSound(randomSound);
  sound.play(soundConfig);

  console.log(`Playing sound for NPC "${npcName}":`, randomSound);
}

export { playRandomNPCSound };
