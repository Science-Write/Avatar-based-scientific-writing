import{b as W,g as p,a as y,t as g,q as c,c as u,m as i,p as d,l,s as b,d as f,e as v,f as T}from"./huh-BWLnXIlp.js";WA.onInit().then(async()=>{try{await W(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await p();for(const e of t){let a,o=WA.player.name;console.log("Player name:",o),WA.room.area.onEnter(e.name).subscribe(()=>{y(e.npcName),a=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{if(g(e.name),WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",o),e.npcName),e.triggerQuest){const h=WA.player.state.currentQuest,m=c.find(A=>A.questId===e.triggerQuest)?.requireQuest;h===m&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{a&&(a.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:a})=>{const o=await u({x:t,y:e});if(!o){i?.stop();return}if(!a&&!o){i?.stop();return}else i?.stop(),d(o)}),WA.player.onPlayerMove(async({x:t,y:e,moving:a})=>{const o=await u({x:t,y:e});if(!o){i?.stop();return}if(!a&&!o){i?.stop();return}else i?.stop(),d(o)});const r=WA.player.state.currentQuest,s=c.find(t=>t.questId===r);s&&n(s.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{const e=c.find(a=>a.questId===t);e&&n(e.questId)});function n(t){const e=c.find(a=>a.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",timeToClose:0,textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.currentQuest==="quest16"&&WA.ui.banner.openBanner({id:"quest16a",text:"Sprich mit Zirze",bgColor:"#1B1B29",timeToClose:0,textColor:"#FFFFFF",closable:!1})});WA.onInit().then(async()=>{WA.player.state.Abschlussquiz3==="solved"&&WA.room.hideLayer("blockPortals")});WA.onInit().then(async()=>{if(WA.player.state.m3terminal1==="correct"){const r=[],s=[];for(let n=4;n<=15;n++)for(let t=71;t<=89;t++)r.push({x:n,y:t,tile:"green",layer:"green"}),s.push({x:n,y:t,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(s)}}),WA.onInit().then(async()=>{if(WA.player.state.m3terminal2==="correct"){const r=[],s=[];for(let n=4;n<=15;n++)for(let t=47;t<=70;t++)r.push({x:n,y:t,tile:"green",layer:"green"}),s.push({x:n,y:t,tile:null,layer:"red"});WA.room.setTiles(r),WA.room.setTiles(s)}});WA.onInit().then(async()=>{WA.player.state.onVariableChange("m3terminal1").subscribe(async r=>{if(WA.player.state.module3="1",r==="correct"){WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / ist / sie**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

`,"Zirze"),WA.player.state.currentQuest="quest21";const s=[],n=[];for(let e=4;e<=15;e++)for(let a=71;a<=89;a++)s.push({x:e,y:a,tile:"green",layer:"green"}),n.push({x:e,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(n),l("modul_3",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}}),WA.player.state.onVariableChange("m3terminal2").subscribe(async r=>{if(WA.player.state.module3="2",r==="correct"){WA.player.state.currentQuest="quest25";const s=[],n=[];for(let e=4;e<=15;e++)for(let a=47;a<=70;a++)s.push({x:e,y:a,tile:"green",layer:"green"}),n.push({x:e,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(n),l("modul_3",10);const t=await WA.nav.getCoWebSites();for(const e of t)e.close()}})});WA.player.state.onVariableChange("module3").subscribe(r=>{if(r==="2"){const s=[],n=[];for(let t=4;t<=15;t++)for(let e=71;e<=89;e++)s.push({x:t,y:e,tile:"green",layer:"green"}),n.push({x:t,y:e,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(n),WA.chat.sendChatMessage(`##### 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **zu / denken / Art**   

`,"Zirze")}});WA.player.state.onVariableChange("currentQuest").subscribe(r=>{r==="quest26"&&WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen. ","Zirze")});WA.player.state.onVariableChange("Textarten").subscribe(r=>{r==="solved"&&(l("modul_3",10),console.log('Variable "Textarten" solved. Level up, +10XP'),WA.player.state.currentQuest="quest18",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.player.state.onVariableChange("AllgemeineRegeln").subscribe(r=>{r==="solved"&&(l("modul_3",10),console.log('Variable "AllgemeineRegeln" solved. Level up, +10XP'),WA.player.state.currentQuest="quest19",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.player.state.onVariableChange("Sprache").subscribe(r=>{r==="solved"&&(l("modul_3",10),console.log('Variable "Sprache" solved. Level up, +10XP'),WA.player.state.currentQuest="quest20",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.player.state.onVariableChange("Zitieren").subscribe(r=>{r==="solved"&&(l("modul_3",10),console.log('Variable "Zitieren" solved. Level up, +10XP'),WA.player.state.currentQuest="quest22",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.player.state.onVariableChange("Literaturverzeichnis").subscribe(r=>{r==="solved"&&(l("modul_3",10),console.log('Variable "Literaturverzeichnis" solved. Level up, +10XP'),WA.player.state.currentQuest="quest23",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.player.state.onVariableChange("Literaturverwaltung").subscribe(r=>{r==="solved"&&(l("modul_3",10),console.log('Variable "Literaturverwaltung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest24",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.player.state.onVariableChange("Abschlussquiz3").subscribe(r=>{r==="solved"&&(l("modul_3",10),WA.room.hideLayer("blockPortals"),console.log('Variable "finalQuizThree" solved. Level up, +10XP'),WA.player.state.currentQuest="quest26",setTimeout(()=>{try{WA.chat.close()}catch(s){console.error("Failed to close chat:",s)}},6e4))});WA.onInit().then(async()=>{if(WA.player.name.toLowerCase()==="bot"||WA.player.tags.includes("bot")){WA.player.setOutlineColor(147,51,234),await b();return}await f(),v(),T()});
//# sourceMappingURL=src-m3Main-DTldKruv.js.map
