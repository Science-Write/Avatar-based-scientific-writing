/// <reference types="@workadventure/iframe-api-typings" />
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { levelUp, quests } from "./quests";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {
  trackNpcInteraction, setupPlayerInteractionTracking,
  setupTracking,
  setupPingTracking,
} from "./worldTracking";
import { setupBotInteractionTracking } from "./botTracking";
import { playRandomNPCSound } from "./huh";

WA.onInit().then(async () => {
  try {
    // Initialize the Scripting API Extra
    await bootstrapExtra();
    WA.controls.disableInviteButton();
    WA.controls.disableMapEditor();
    WA.controls.disableRoomList();
    console.log("Scripting API Extra ready");
  } catch (e) {
    console.error(e);
  }

  // Get chat areas and set up event listeners for entering and leaving them

  WA.onInit().then(async () => {
    // Get chat areas and set up event listeners for entering and leaving them
    const chatAreas = await getChatAreas();
    for (const area of chatAreas) {
      let triggerMessage: any;
      let playerName: string = WA.player.name;
      console.log("Player name:", playerName);
      // When player enters a chat area
      WA.room.area.onEnter(area.name).subscribe(() => {
        playRandomNPCSound(area.npcName);

        triggerMessage = WA.ui.displayActionMessage({
          message: `[LEERTASTE] drücken um mit ${area.npcName} zu sprechen.`,
          callback: () => {
            trackNpcInteraction(area.name);
            WA.chat.sendChatMessage(
              area.chatText.replace("{NameOfPlayer}", playerName),
              area.npcName,
            );
            if (area.triggerQuest) {
              const currentQuest = WA.player.state.currentQuest;
              const requiredQuest = quests.find(
                (q: { questId: string }) => q.questId === area.triggerQuest,
              )?.requireQuest;
              if (currentQuest === requiredQuest) {
                WA.player.state.currentQuest = area.triggerQuest;
              }
            }
          },
        });
        WA.room.area.onLeave(area.name).subscribe(() => {
          WA.chat.close();
        });
      });

      // When player leaves a chat area
      WA.room.area.onLeave(area.name).subscribe(() => {
        if (triggerMessage) {
          triggerMessage.remove();
          WA.chat.close();
        }
      });
    }
  });

  // Event listener for player movement to play footstep sounds
  WA.player.onPlayerMove(async ({ x, y, moving }) => {
    const material = await checkPlayerMaterial({ x, y });
    if (!material) {
      mySound?.stop();
      return;
    }

    if (!moving && !material) {
      mySound?.stop();
      return;
    } else {
      mySound?.stop();
      playRandomSound(material);
    }
  });

  // Event listener for player movement to play footstep sounds
  WA.player.onPlayerMove(async ({ x, y, moving }) => {
    const material = await checkPlayerMaterial({ x, y });
    if (!material) {
      mySound?.stop();
      return;
    }

    if (!moving && !material) {
      mySound?.stop();
      return;
    } else {
      mySound?.stop();
      playRandomSound(material);
    }
  });

  // Display the current quest banner if a quest is active
  const currentQuestId = WA.player.state.currentQuest;
  const currentQuest = quests.find(
    (q: { questId: string }) => q.questId === currentQuestId,
  );
  if (currentQuest) {
    createQuestBanner(currentQuest.questId);
  }

  // Event listener for changes in the current quest
  WA.player.state.onVariableChange("currentQuest").subscribe((newQuestId) => {
    const newQuest = quests.find(
      (q: { questId: string }) => q.questId === newQuestId,
    );
    if (newQuest) {
      createQuestBanner(newQuest.questId);
    }
  });

  // Function to create a quest banner
  function createQuestBanner(questId: string) {
    const quest = quests.find(
      (q: { questId: string }) => q.questId === questId,
    );
    if (quest) {
      WA.ui.banner.openBanner({
        id: quest.questId,
        text: quest.questDescription,
        bgColor: "#1B1B29",
        timeToClose: 0,
        textColor: "#FFFFFF",
        closable: false,
      });
    }
  }
});

WA.onInit().then(async () => {
  if (WA.player.state.currentQuest === "quest16") {
    WA.ui.banner.openBanner({
      id: "quest16a",
      text: "Sprich mit Zirze",
      bgColor: "#1B1B29",
      timeToClose: 0,
      textColor: "#FFFFFF",
      closable: false,
    });
  }
});

WA.onInit().then(async () => {
  if (WA.player.state.Abschlussquiz3 === "solved") {
    WA.room.hideLayer("blockPortals");
  }
});

(WA.onInit().then(async () => {
  // On start: if m3terminal1 is already "correct", update the room colors in the m3terminal1 region.
  if (WA.player.state.m3terminal1 === "correct") {
    const greenTiles: any[] = [];
    const redTiles: any[] = [];
    for (let x = 4; x <= 15; x++) {
      for (let y = 71; y <= 89; y++) {
        greenTiles.push({ x, y, tile: "green", layer: "green" });
        redTiles.push({ x, y, tile: null, layer: "red" });
      }
    }
    WA.room.setTiles(greenTiles);
    WA.room.setTiles(redTiles);
  }
}),
  WA.onInit().then(async () => {
    // On start: if m3terminal2 is already "correct", update the room colors in the m3terminal2 region.
    if (WA.player.state.m3terminal2 === "correct") {
      const greenTiles: any[] = [];
      const redTiles: any[] = [];
      for (let x = 4; x <= 15; x++) {
        for (let y = 47; y <= 70; y++) {
          greenTiles.push({ x, y, tile: "green", layer: "green" });
          redTiles.push({ x, y, tile: null, layer: "red" });
        }
      }
      WA.room.setTiles(greenTiles);
      WA.room.setTiles(redTiles);
    }
  }));

WA.onInit().then(async () => {
  // Listen for terminal-related state changes
  WA.player.state
    .onVariableChange("m3terminal1")
    .subscribe(async (newValue) => {
      // Set module3 to "1" for terminal1.
  WA.player.state.module3 = "1";
  if (newValue === "correct") {
    WA.chat.sendChatMessage(
      "##### 🔍 Weitere Wortschnipsel gefunden!   \n\n \n\n**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   \n\n \n\nDiese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   \n\n🔐 **Merk sie dir gut:**   \n\n \n\n📝 **eine / ist / sie**   \n\n \n\n📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  \n\n",
      "Zirze",
    );
    WA.player.state.currentQuest = "quest21";
    // Change tiles in the m2terminal1 region: from (4,71) to (15,89)
    const greenTiles: any[] = [];
    const redTiles: any[] = [];
    for (let x = 4; x <= 15; x++) {
      for (let y = 71; y <= 89; y++) {
        greenTiles.push({ x, y, tile: "green", layer: "green" });
        redTiles.push({ x, y, tile: null, layer: "red" });
      }
    }
    WA.room.setTiles(greenTiles);
    WA.room.setTiles(redTiles);
    levelUp("bodul_3", 10);
    const cowebsites = await WA.nav.getCoWebSites();
    for (const cowebsite of cowebsites) {
      cowebsite.close();
    }
  }
});

WA.player.state.onVariableChange("m3terminal2").subscribe(async (newValue) => {
  // Set module3 to "2" for terminal2.
  WA.player.state.module3 = "2";
  if (newValue === "correct") {
    WA.player.state.currentQuest = "quest25";
    // Change tiles in the m3terminal2 region: from (4,47) to (15,70)
    const greenTiles: any[] = [];
    const redTiles: any[] = [];
    for (let x = 4; x <= 15; x++) {
      for (let y = 47; y <= 70; y++) {
        greenTiles.push({ x, y, tile: "green", layer: "green" });
        redTiles.push({ x, y, tile: null, layer: "red" });
      }
    }
    WA.room.setTiles(greenTiles);
    WA.room.setTiles(redTiles);
    levelUp("bodul_3", 10);
    const cowebsites = await WA.nav.getCoWebSites();
    for (const cowebsite of cowebsites) {
      cowebsite.close();
    }
  }
});
})

// When module3 changes to "2", update the room colors in the m3terminal2 region.
WA.player.state.onVariableChange("module3").subscribe((newValue) => {
  if (newValue === "2") {
    const greenTiles: any[] = [];
    const redTiles: any[] = [];
    for (let x = 4; x <= 15; x++) {
      for (let y = 71; y <= 89; y++) {
        greenTiles.push({ x, y, tile: "green", layer: "green" });
        redTiles.push({ x, y, tile: null, layer: "red" });
      }
    }
    WA.room.setTiles(greenTiles);
    WA.room.setTiles(redTiles);
    WA.chat.sendChatMessage(
      "##### 🔍 Weitere Wortschnipsel gefunden!   \n\n \n\n**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   \n\n \n\nDiese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   \n\n🔐 **Merk sie dir gut:**   \n\n \n\n📝 **zu / denken / Art**   \n\n",
      "Zirze",
    );
  }
});

WA.player.state.onVariableChange("currentQuest").subscribe((newQuest) => {
  if (newQuest === "quest26") {
    WA.chat.sendChatMessage(
      "Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen. ",
      "Zirze",
    );
  }
});

// Hardcoded subscriptions for each event variable key in the required order

WA.player.state.onVariableChange("Textarten").subscribe((newValue) => {
  if (newValue === "solved") {
    levelUp("bodul_3", 10);
    console.log(`Variable "Textarten" solved. Level up, +10XP`);
    WA.player.state.currentQuest = "quest18";
    setTimeout(() => {
      try {
        WA.chat.close();
      } catch (e) {
        console.error("Failed to close chat:", e);
      }
    }, 60000);
  }
});

WA.player.state.onVariableChange("AllgemeineRegeln").subscribe((newValue) => {
  if (newValue === "solved") {
    levelUp("bodul_3", 10);
    console.log(`Variable "AllgemeineRegeln" solved. Level up, +10XP`);
    WA.player.state.currentQuest = "quest19";
    setTimeout(() => {
      try {
        WA.chat.close();
      } catch (e) {
        console.error("Failed to close chat:", e);
      }
    }, 60000);
  }
});

WA.player.state.onVariableChange("Sprache").subscribe((newValue) => {
  if (newValue === "solved") {
    levelUp("bodul_3", 10);
    console.log(`Variable "Sprache" solved. Level up, +10XP`);
    WA.player.state.currentQuest = "quest20";
    setTimeout(() => {
      try {
        WA.chat.close();
      } catch (e) {
        console.error("Failed to close chat:", e);
      }
    }, 60000);
  }
});

WA.player.state.onVariableChange("Zitieren").subscribe((newValue) => {
  if (newValue === "solved") {
    levelUp("bodul_3", 10);
    console.log(`Variable "Zitieren" solved. Level up, +10XP`);
    WA.player.state.currentQuest = "quest22";
    setTimeout(() => {
      try {
        WA.chat.close();
      } catch (e) {
        console.error("Failed to close chat:", e);
      }
    }, 60000);
  }
});

WA.player.state
  .onVariableChange("Literaturverzeichnis")
  .subscribe((newValue) => {
    if (newValue === "solved") {
      levelUp("bodul_3", 10);
      console.log(`Variable "Literaturverzeichnis" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest23";
      setTimeout(() => {
        try {
          WA.chat.close();
        } catch (e) {
          console.error("Failed to close chat:", e);
        }
      }, 60000);
    }
  });

WA.player.state
  .onVariableChange("Literaturverwaltung")
  .subscribe((newValue) => {
    if (newValue === "solved") {
      levelUp("bodul_3", 10);
      console.log(`Variable "Literaturverwaltung" solved. Level up, +10XP`);
      WA.player.state.currentQuest = "quest24";
      setTimeout(() => {
        try {
          WA.chat.close();
        } catch (e) {
          console.error("Failed to close chat:", e);
        }
      }, 60000);
    }
  });

WA.player.state.onVariableChange("Abschlussquiz3").subscribe((newValue) => {
  if (newValue === "solved") {
    levelUp("bodul_3", 10);
    WA.room.hideLayer("blockPortals");
    console.log(`Variable "finalQuizThree" solved. Level up, +10XP`);
    WA.player.state.currentQuest = "quest26";
    setTimeout(() => {
      try {
        WA.chat.close();
      } catch (e) {
        console.error("Failed to close chat:", e);
      }
    }, 60000);
  }
});

// Tracking script

WA.onInit().then(async () => {
 if (WA.player.name.toLowerCase() === "bot" || WA.player.tags.includes("bot")) {
   WA.player.setOutlineColor(147, 51, 234); // purple

   await setupBotInteractionTracking();

   return;
 };

await 
setupTracking();
setupPingTracking(); // default 3 minutes
setupPlayerInteractionTracking();
});
export {};