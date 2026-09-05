import { Sound } from "@workadventure/iframe-api-typings";
import { getLayersMap } from "@workadventure/scripting-api-extra/dist";
import { audioConfig, soundFiles } from "./config/footstep.config";
import { MaterialType, SoundArea } from "./models/footstep.model";

let mySound: Sound;
let stepSoundAreas: any[] = [];

function playRandomSound(material: MaterialType) {
  if (!soundFiles[material]) return;

  const randomIndex = Math.floor(Math.random() * soundFiles[material].length);
  mySound = WA.sound.loadSound(
    `https://science-write.github.io/Avatar-based-scientific-writing/sounds/${soundFiles[material][randomIndex]}`
  );
  mySound.play(audioConfig);
}

async function getStepSoundAreas(): Promise<SoundArea[]> {
  try {
    const layers = await getLayersMap();
    const areas = [];

    for (const layer of layers.values()) {
      if (layer.type === "objectgroup") {
        for (const object of layer.objects) {
          if (!object.properties) continue;
          if (
            object.properties.some(
              (prop) => prop.name === "stepSound" && prop.value === true
            )
          ) {
            const material = object.properties.find(
              (prop) => prop.name === "material"
            )?.value as MaterialType;

            if (soundFiles[material]) {
              areas.push({
                name: object.name,
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height,
                material: material,
              });
            }
          }
        }
      }
    }
    console.log("Found step sound areas:", areas);
    return areas;
  } catch (error) {
    console.error("Error while getting step sound areas:", error);
    return [];
  }
}

function isInsideArea(
  playerPosition: { x: number; y: number },
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
) {
  return (
    playerPosition.x >= area.x &&
    playerPosition.x <= area.x + area.width &&
    playerPosition.y >= area.y &&
    playerPosition.y <= area.y + area.height
  );
}

async function checkPlayerMaterial(playerPosition: { x: number; y: number }) {
  try {
    for (const area of stepSoundAreas) {
      if (isInsideArea(playerPosition, area)) {
        return area.material;
      }
    }
    return null;
  } catch (error) {
    console.error("Error while checking player material:", error);
    return null;
  }
}

WA.onInit().then(async () => {
  stepSoundAreas = await getStepSoundAreas();
});

export { checkPlayerMaterial, mySound, playRandomSound };
