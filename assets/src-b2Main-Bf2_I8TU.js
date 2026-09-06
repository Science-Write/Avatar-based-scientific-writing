import{b as y,g as p,p as m,t as g,q as c,c as u,a as W,l as o,s as b,d as f,e as v,f as T,m as i}from"./huh-C_Dg-9IV.js";WA.onInit().then(async()=>{try{await y(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await p();for(const e of t){let a,l=WA.player.name;console.log("Player name:",l),WA.room.area.onEnter(e.name).subscribe(()=>{m(e.npcName),a=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{if(g(e.name),WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",l),e.npcName),e.triggerQuest){const d=WA.player.state.currentQuest,h=c.find(A=>A.questId===e.triggerQuest)?.requireQuest;d===h&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{a&&(a.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:a})=>{const l=await u({x:t,y:e});if(!l){i?.stop();return}if(!a&&!l){i?.stop();return}else i?.stop(),W(l)}),WA.onInit().then(async()=>{WA.player.state.Abschlussquiz2==="solved"&&WA.room.hideLayer("blockPortals")});const n=WA.player.state.currentQuest,s=c.find(t=>t.questId===n);s&&r(s.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{const e=c.find(a=>a.questId===t);e&&r(e.questId)});function r(t){const e=c.find(a=>a.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",timeToClose:0,closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM2Quests").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")}),WA.room.area.onLeave("fromMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest8"&&(WA.player.state.currentQuest="quest9")})});WA.player.onPlayerMove(async({x:n,y:s,moving:r})=>{const t=await u({x:n,y:s});if(!t){i?.stop();return}if(!r&&!t){i?.stop();return}else i?.stop(),W(t)});WA.onInit().then(async()=>{if(WA.player.state.m2terminal1==="correct"){const n=[],s=[];for(let r=4;r<=15;r++)for(let t=71;t<=89;t++)n.push({x:r,y:t,tile:"green",layer:"green"}),s.push({x:r,y:t,tile:null,layer:"red"});WA.room.setTiles(n),WA.room.setTiles(s)}}),WA.onInit().then(async()=>{if(WA.player.state.m2terminal2==="correct"){const n=[],s=[];for(let r=4;r<=15;r++)for(let t=47;t<=70;t++)n.push({x:r,y:t,tile:"green",layer:"green"}),s.push({x:r,y:t,tile:null,layer:"red"});WA.room.setTiles(n),WA.room.setTiles(s)}});WA.onInit().then(async()=>{WA.player.state.onVariableChange("m2terminal1").subscribe(async n=>{if(WA.player.state.module2="1",n==="correct"){WA.chat.sendChatMessage(`##### 🔍 Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast die ersten **verlorenen Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **ist / Wissenschaft / mehr**   

 

📢 Halte weiter Ausschau nach fehlenden Fragmenten – die Rettung unserer Universität hängt davon ab!    

 `,"Zirze"),WA.player.state.currentQuest="quest12a";const s=[],r=[];for(let e=4;e<=15;e++)for(let a=71;a<=89;a++)s.push({x:e,y:a,tile:"green",layer:"green"}),r.push({x:e,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(r),o("bodul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("m2terminal2").subscribe(async n=>{if(WA.player.state.module2="2",n==="correct"){WA.player.state.currentQuest="quest15";const s=[],r=[];for(let e=4;e<=15;e++)for(let a=47;a<=70;a++)s.push({x:e,y:a,tile:"green",layer:"green"}),r.push({x:e,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(r),WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / als / Wissenssammlung**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

  `,"Zirze"),o("bodul_2",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}})});WA.player.state.onVariableChange("PlanungSelbstmanagement").subscribe({next:n=>{n==="solved"&&(o("bodul_2",10),console.log('Variable "PlanungSelbstmanagement" solved. Level up, +10XP'),WA.player.state.currentQuest="quest10",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("ThemenfindungGliederung").subscribe({next:n=>{n==="solved"&&(o("bodul_2",10),console.log('Variable "ThemenfindungGliederung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest11",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Lesen").subscribe({next:n=>{n==="solved"&&(o("bodul_2",10),console.log('Variable "Lesen" solved. Level up, +10XP'),WA.player.state.currentQuest="quest14",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Literaturrecherche").subscribe({next:n=>{n==="solved"&&(o("bodul_2",10),console.log('Variable "Literaturrecherche" solved. Level up, +10XP'),WA.player.state.currentQuest="quest13",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.player.state.onVariableChange("Abschlussquiz2").subscribe({next:n=>{n==="solved"&&(WA.room.hideLayer("blockPortals"),o("bodul_2",10),console.log('Variable "finalQuizTwo" solved. Level up, +10XP'),WA.player.state.currentQuest="quest16",setTimeout(()=>{try{WA.chat&&typeof WA.chat.close=="function"&&WA.chat.close()}catch(s){console.error("Error closing chat:",s)}},6e4))}});WA.onInit().then(async()=>{if(WA.player.name.toLowerCase()==="bot"||WA.player.tags.includes("bot")){WA.player.setOutlineColor(147,51,234),await b();return}await f(),v(),T()});
//# sourceMappingURL=src-b2Main-Bf2_I8TU.js.map
