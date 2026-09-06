/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { getChatAreas } from "./chatArea";
import { playRandomNPCSound } from "./huh";
import { quests, levelUp } from "./quests";
import {
  trackNpcInteraction, setupPlayerInteractionTracking,
  setupTracking,
  setupPingTracking,
} from "./worldTracking";
import { setupBotInteractionTracking } from "./botTracking";


WA.onInit().then(async () => {
  WA.state.playerName = WA.player.name;
  console.log("loading main.ts");
  WA.controls.disableInviteButton();
  WA.controls.disableMapEditor();
  WA.controls.disableRoomList();

  // Initialize the first quest if not already set
  if (!WA.player.state.currentQuest) {
    WA.player.state.currentQuest = "quest1";
  }
  levelUp("botlog", 0);

  try {
    // Initialize the Scripting API Extra
    await bootstrapExtra();
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

  // Check if the player has solved the notlog quest and is not an admin
  const solvedNotlog = WA.player.state.solvedNotlog;
  const isAdmin = WA.player.tags.includes("admin");
  const mapURL = WA.room.mapURL;

  console.log("solvedNotlog:", solvedNotlog);
  console.log("isAdmin:", isAdmin);
  console.log("mapURL:", mapURL);

  if (
    solvedNotlog === true &&
    !isAdmin &&
    mapURL.includes("notlog") &&
    !mapURL.includes("localhost")
  ) {
    console.log("Map URL: ", mapURL);
    // Teleport the player to the entry named "matrix-hub"
    WA.nav.goToRoom("./bot-hub.tmj");
  }

  // Event listener for entering the notlog area
  WA.room.area.onEnter("notlog").subscribe(() => {
    console.log("Entered notlog area");
    if (solvedNotlog === true && !isAdmin) {
      console.log("Map URL: ", mapURL);
      if (!mapURL.includes("localhost")) {
        // Teleport the player to the entry named "matrix-hub"
        WA.nav.goToRoom("./bot-hub.tmj");
      }
    }
  });

  // Event listener for leaving the notlog area
  WA.room.area.onEnter("leaveNotlog").subscribe(() => {
    console.log("Leaving notlog area");
    WA.player.state.solvedNotlog = true;
    WA.player.state.currentQuest = "quest6";
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
    levelUp("botlog", 1);
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
        textColor: "#FFFFFF",
        timeToClose: 0,
        closable: false,
      });
    }
  }
});

WA.player.state.onVariableChange("Einführungsvideo").subscribe((newValue) => {
  if (newValue === "solved") {
    console.log(`Einführungsvideo" solved. Level up, +10XP`);
    WA.player.state.currentQuest = "quest5";
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