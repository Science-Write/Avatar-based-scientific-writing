import{b as d,c as h,p as m,g,a as A,t as W,q as o,l as p,s as f,d as b,e as y,f as M,m as c}from"./huh-BWLnXIlp.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await d(),console.log("Scripting API Extra ready")}catch(n){console.error(n)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.player.onPlayerMove(async({x:n,y:e,moving:t})=>{const s=await h({x:n,y:e});if(!s){c?.stop();return}if(!t&&!s){c?.stop();return}else c?.stop(),m(s)});WA.onInit().then(async()=>{const n=await g();for(const e of n){let t,s=WA.player.name;console.log("Player name:",s),WA.room.area.onEnter(e.name).subscribe(()=>{A(e.npcName),t=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{if(W(e.name),WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",s),e.npcName),e.triggerQuest){const a=WA.player.state.currentQuest,r=o.find(i=>i.questId===e.triggerQuest)?.requireQuest;a===r&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{t&&(t.remove(),WA.chat.close())})}});const k=WA.player.state.currentQuest,l=o.find(n=>n.questId===k);l&&u(l.questId);WA.player.state.onVariableChange("currentQuest").subscribe(n=>{const e=o.find(t=>t.questId===n);e&&u(e.questId)});function u(n){const e=o.find(t=>t.questId===n);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let n;n=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Du kannst jetzt die gesammelten Codeschnipsel in den Chat eingeben. Für den Fall, dass du sie dir doch nicht notiert hast, sind sie hier nochmal: **sie/ zu / denken / ist / Wissenschaft / eine / mehr / als / Wissenssammlung / ist /eine / Art**. Nutze diese, um den korrekten Satz zu bilden und gib ihn hier im Chat ein!","Zirze"),WA.chat.onChatMessage(async(e,t)=>{if(t.authorId===void 0){const s=e.toLowerCase();s.includes("wissenschaft")&&s.includes("wissenssammlung")&&s.includes("art")&&s.includes("denken")?(WA.chat.sendChatMessage(` 🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze"),await new Promise(a=>setTimeout(a,4e3)),WA.player.state.currentQuest="quest27",p("notlog2",32),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{n&&n.remove(),WA.chat.close()})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage("Die Module sind noch nicht vollständig gelöst. Kehre später zurück.","Zirze")})});WA.onInit().then(()=>{function n(){const e=WA.player.state.module2==="2",t=WA.player.state.module3==="2";if(e&&t){const s=[],a=[];for(let r=0;r<=47;r++)for(let i=0;i<=36;i++)s.push({x:r,y:i,tile:"green",layer:"green"}),a.push({x:r,y:i,tile:"red",layer:"red"});WA.room.setTiles([...s,...a]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else e&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.module2==="2"&&WA.player.state.module3==="2"&&n()});WA.onInit().then(async()=>{if(WA.player.name.toLowerCase()==="bot"||WA.player.tags.includes("bot")){WA.player.setOutlineColor(147,51,234),await f();return}await b(),y(),M()});
//# sourceMappingURL=src-hubMain-DUc0ypGT.js.map
