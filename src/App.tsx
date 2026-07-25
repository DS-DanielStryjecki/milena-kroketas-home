import { useEffect, useMemo, useState } from 'react';
import { Activity, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, CircleAlert, Clock3, Dumbbell, Flame, History, Home, Minus, Pause, Play, Plus, RotateCcw, ShieldCheck, StickyNote, X } from 'lucide-react';
import { safety, workouts } from './data';
import type { AppState, Exercise, ExerciseLog, Section } from './types';

const initial:AppState={logs:{},notes:{},difficulty:{},sessions:[],startedAt:{}};
const STORAGE_KEY='milena-home-v1';
const load=():AppState=>{try{return {...initial,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return initial}};
const sections:Section[]=['Rozgrzewka','Siła i stabilizacja','Cardio','Wyciszenie'];
const key=(day:number,id:string)=>`${day}:${id}`;
const fmt=(s:number)=>`${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

export default function App(){
 const [state,setState]=useState(load); const [tab,setTab]=useState<'today'|'plan'|'exercises'|'history'|'profile'>('today');
 const nextDay=Math.min(14,Math.max(1,state.sessions.length+1)); const [day,setDay]=useState(nextDay);
 const [rest,setRest]=useState(0); const [running,setRunning]=useState(false); const [safetyOpen,setSafetyOpen]=useState(false);
 const [restAfter,setRestAfter]=useState('');
 const workout=workouts[day-1];
 useEffect(()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state)),[state]);
 useEffect(()=>{if(!running||rest<=0)return;const i=setInterval(()=>setRest(v=>{if(v<=1){setRunning(false);return 0}return v-1}),1000);return()=>clearInterval(i)},[running,rest]);
 const completed=workout.exercises.filter(x=>state.logs[key(day,x.id)]?.done).length;
 const streak=useMemo(()=>{const dates=[...new Set(state.sessions.map(s=>s.date.slice(0,10)))].sort().reverse();if(!dates.length)return 0;let count=1;for(let i=1;i<dates.length;i++){const a=new Date(dates[i-1]),b=new Date(dates[i]);if((+a-+b)/86400000===1)count++;else break}return count},[state.sessions]);
 const exerciseLibrary=useMemo(()=>Array.from(new Map(workouts.flatMap(w=>w.exercises).filter(x=>x.section==='Siła i stabilizacja').map(x=>[x.name,x])).values()),[]);
 const logFor=(x:Exercise):ExerciseLog=>state.logs[key(day,x.id)]||{done:false,load:x.load||''};
 const setLog=(x:Exercise,patch:Partial<ExerciseLog>)=>setState(v=>({...v,logs:{...v.logs,[key(day,x.id)]:{...logFor(x),...patch}}}));
 const finish=()=>{if(!confirm('Zapisać trening w historii?'))return;const now=new Date();const duration=state.startedAt[day]?Math.max(1,Math.round((Date.now()-state.startedAt[day])/60000)):0;setState(v=>({...v,sessions:[{id:crypto.randomUUID(),day,date:now.toISOString(),difficulty:v.difficulty[day]||5,notes:v.notes[day]||'',exercises:Object.fromEntries(workout.exercises.map(x=>[x.id,v.logs[key(day,x.id)]||{done:false,load:x.load||''}])),duration},...v.sessions],startedAt:{...v.startedAt,[day]:0}}));setTab('history')};
 const selectDay=(d:number)=>{setDay(d);setTab('today');window.scrollTo({top:0,behavior:'smooth'})};
 return <div className="app">
  <header><div className="brand"><span className="mark"><Home/></span><div><b>MILENA</b><small>HOME • 14</small></div></div><button className="icon safety" onClick={()=>setSafetyOpen(true)} aria-label="Zasady bezpieczeństwa"><ShieldCheck/></button></header>
  <main>
   {tab==='today'&&<>
    <section className="hero"><div className="hero-top"><span className="eyebrow">DZIEŃ {day} Z 14</span><span className="duration"><Clock3/> {workout.duration}</span></div><h1>{workout.title}</h1><p>{workout.focus}</p><div className="progress"><i style={{width:`${completed/workout.exercises.length*100}%`}}/></div><div className="progress-meta"><span>{completed}/{workout.exercises.length} ukończono</span><span>{Math.round(completed/workout.exercises.length*100)}%</span></div></section>
    <section className="readiness"><CircleAlert/><div><b>Dziś liczy się komfort</b><span>Oddychaj swobodnie. Przerwij przy bólu lub ciągnięciu blizny.</span></div></section>
    {!state.startedAt[day]&&<button className="start" onClick={()=>setState(v=>({...v,startedAt:{...v.startedAt,[day]:Date.now()}}))}><Play/> Rozpocznij trening</button>}
    {sections.map(section=><section className="work-section" key={section}><div className="section-title"><span>{section}</span><small>{workout.exercises.filter(x=>x.section===section).length} {section==='Cardio'?'blok':'ćw.'}</small></div>{workout.exercises.filter(x=>x.section===section).map((x,i)=><ExerciseCard key={x.id} x={x} index={i+1} log={logFor(x)} onLog={p=>{setLog(x,p);if(p.done&&x.rest>0){setRestAfter(x.name);setRest(x.rest);setRunning(true)}}} onTimer={()=>{setRestAfter(x.name);setRest(x.rest||75);setRunning(true)}}/>)}</section>)}
    <section className="finish-card"><div><span className="eyebrow">ODCZUCIE PO TRENINGU</span><h2>Jak trudno było?</h2><div className="rating">{[1,2,3,4,5,6,7,8,9,10].map(n=><button className={(state.difficulty[day]||5)===n?'active':''} onClick={()=>setState(v=>({...v,difficulty:{...v.difficulty,[day]:n}}))} key={n}>{n}</button>)}</div><small>Cel na dziś: RPE 5–6/10</small></div><label><StickyNote/> Notatka<textarea value={state.notes[day]||''} onChange={e=>setState(v=>({...v,notes:{...v.notes,[day]:e.target.value}}))} placeholder="Kolano, blizna, samopoczucie, użyte ciężary…"/></label><button className="finish" onClick={finish}><Check/> Zakończ i zapisz trening</button></section>
   </>}
   {tab==='plan'&&<><div className="page-head"><span className="eyebrow">TRENING W DOMU</span><h1>Plan 14 dni</h1><p>Piłka gimnastyczna, obciążniki na rzepy i masa własnego ciała. Bez sprzętu z siłowni.</p></div><div className="plan-grid">{workouts.map(w=>{const done=state.sessions.some(s=>s.day===w.day);return <button onClick={()=>selectDay(w.day)} className="day-card" key={w.day}><span className={`day-number ${done?'done':''}`}>{done?<Check/>:w.day}</span><div><small>DZIEŃ {w.day} • {w.duration}</small><b>{w.title}</b><span>{w.focus}</span></div><ChevronRight/></button>})}</div></>}
   {tab==='exercises'&&<><div className="page-head"><span className="eyebrow">BIBLIOTEKA KROKETASA</span><h1>Lista ćwiczeń</h1><p>Każdy ruch pokazany od pozycji wyjściowej przez fazę A do fazy B.</p></div><div className="exercise-library">{exerciseLibrary.map(x=><ExerciseGuideCard key={x.name} x={x}/>)}</div></>}
   {tab==='history'&&<><div className="page-head"><span className="eyebrow">TWOJA PRACA</span><h1>Historia</h1><p>Każda spokojna sesja przybliża Cię do sprawności.</p></div>{!state.sessions.length?<div className="empty"><History/><h2>Historia jest jeszcze pusta</h2><p>Ukończ pierwszy trening, a pojawi się tutaj.</p><button onClick={()=>setTab('today')}>Przejdź do dnia 1</button></div>:<div className="history-list">{state.sessions.map(s=><article key={s.id}><div className="history-icon"><Check/></div><div><small>{new Date(s.date).toLocaleDateString('pl-PL',{day:'numeric',month:'long',year:'numeric'})}</small><h3>Dzień {s.day} • {workouts[s.day-1].title}</h3><p>RPE {s.difficulty}/10 {s.duration?`• ${s.duration} min`:''} • {Object.values(s.exercises).filter(e=>e.done).length}/{workouts[s.day-1].exercises.length} elementów</p>{s.notes&&<blockquote>{s.notes}</blockquote>}</div></article>)}</div>}</>}
   {tab==='profile'&&<><div className="page-head"><span className="eyebrow">TWÓJ POSTĘP</span><h1>Podsumowanie</h1></div><div className="stats"><div><Flame/><b>{streak}</b><span>dni z rzędu</span></div><div><Dumbbell/><b>{state.sessions.length}</b><span>treningów</span></div><div><CalendarDays/><b>{Math.round(state.sessions.length/14*100)}%</b><span>planu</span></div></div><section className="principles"><h2>Sprzęt domowy</h2><p><ShieldCheck/>Duża piłka gimnastyczna</p><p><ShieldCheck/>Lekkie obciążniki na rzepy: kostki lub nadgarstki</p><p><ShieldCheck/>Stabilne krzesło, ściana i blat jako podparcie</p></section><section className="principles"><h2>Zasady programu</h2>{safety.map(x=><p key={x}><ShieldCheck/>{x}</p>)}</section><button className="reset" onClick={()=>{if(confirm('Usunąć cały lokalny postęp i historię?'))setState(initial)}}><RotateCcw/> Wyzeruj postęp</button></>}
  </main>
  {rest>0&&<div className="timer"><div><small>PRZERWA PO ĆWICZENIU</small><b>{fmt(rest)}</b>{restAfter&&<span>{restAfter}</span>}</div><button aria-label={running?'Wstrzymaj zegar':'Wznów zegar'} onClick={()=>setRunning(v=>!v)}>{running?<Pause/>:<Play/>}</button><button aria-label="Dodaj 15 sekund" onClick={()=>setRest(v=>v+15)}><Plus/>15</button><button aria-label="Pomiń przerwę" onClick={()=>{setRest(0);setRunning(false);setRestAfter('')}}><X/></button></div>}
  <nav>{[['today',Home,'Dzisiaj'],['plan',CalendarDays,'Plan'],['exercises',BookOpen,'Ćwiczenia'],['history',History,'Historia'],['profile',Activity,'Postęp']].map(([t,I,l])=><button key={t as string} className={tab===t?'active':''} onClick={()=>setTab(t as typeof tab)}><I/>{l as string}</button>)}</nav>
  {safetyOpen&&<div className="modal" onClick={()=>setSafetyOpen(false)}><div onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSafetyOpen(false)}><X/></button><ShieldCheck className="modal-shield"/><span className="eyebrow">BEZPIECZEŃSTWO</span><h2>Sygnały ciała są ważniejsze niż plan</h2>{safety.map(x=><p key={x}><Check/>{x}</p>)}<small>Plan nie zastępuje porady lekarza lub fizjoterapeuty. Przy obrzęku, zaczerwienieniu, narastającym bólu albo rozejściu rany przerwij ćwiczenia i skontaktuj się ze specjalistą.</small></div></div>}
 </div>
}

function ExerciseCard({x,index,log,onLog,onTimer}:{x:Exercise;index:number;log:ExerciseLog;onLog:(p:Partial<ExerciseLog>)=>void;onTimer:()=>void}){
 const [open,setOpen]=useState(false);const numeric=parseFloat(log.load);
 const adjust=(d:number)=>onLog({load:Number.isFinite(numeric)?`${Math.max(0,numeric+d)} kg`:d>0?'1 kg':'0 kg'});
 return <article className={`exercise ${log.done?'done':''}`}><button className="check" onClick={()=>onLog({done:!log.done})}>{log.done?<Check/>:<span>{index}</span>}</button><img className="exercise-art" src={exerciseImage(x)} alt={`Kroketas pokazuje: ${x.name}`}/><button className="exercise-main" onClick={()=>setOpen(v=>!v)}><b>{x.name}</b><span>{x.sets} serie • {x.reps} • tempo {x.tempo}</span></button>{x.rest>0&&<button className="rest-btn" onClick={onTimer}><Clock3/><span>{x.rest}s</span></button>}{open&&<div className="details"><p>{x.cue}</p><div className="detail-grid"><span><small>SERIE</small><b>{x.sets}</b></span><span><small>POWT.</small><b>{x.reps}</b></span><span><small>TEMPO</small><b>{x.tempo}</b></span><span><small>PRZERWA</small><b>{x.rest?`${x.rest}s`:'—'}</b></span></div>{x.section==='Siła i stabilizacja'&&<div className="load"><div><small>OBCIĄŻENIE</small><input value={log.load} onChange={e=>onLog({load:e.target.value})} placeholder="np. 5 kg"/></div><button onClick={()=>adjust(-1)}><Minus/></button><button onClick={()=>adjust(1)}><Plus/></button></div>}</div>}</article>
}

function exerciseImage(x:Exercise){
 return `${import.meta.env.BASE_URL}exercises/${exerciseKind(x)}.webp`;
}

function exerciseKind(x:Exercise){
 const name=x.name.toLocaleLowerCase('pl');
 if(x.section==='Rozgrzewka')return 'warmup';
 if(x.section==='Cardio')return 'cardio';
 if(x.section==='Wyciszenie')return 'stretch';
 if(name.includes('piłk'))return 'ball';
 if(name.includes('pompk'))return 'wall-push';
 if(name.includes('krzesł')||name.includes('przysiad')||name.includes('siad i wstawanie'))return 'chair';
 if(name.includes('ramion')||name.includes('bark')||name.includes('łopat')||name.includes('aniołk')||name.includes('klatk'))return 'arms';
 return 'leg';
}

function phaseCopy(kind:string){
 const copy:Record<string,[string,string,string]>={
  warmup:['Stań swobodnie i rozluźnij barki.','Unieś jedno kolano i przeciwną rękę.','Zmień stronę, utrzymując spokojny rytm.'],
  cardio:['Ustaw wysoką, swobodną sylwetkę.','Zrób energiczny krok i pracuj ramionami.','Przenieś krok na drugą nogę bez zadyszki.'],
  stretch:['Stań stabilnie i wydłuż kręgosłup.','Przejdź łagodnie do pierwszej strony.','Wróć przez środek i zmień stronę.'],
  ball:['Ustaw piłkę stabilnie i oprzyj na niej dłonie.','Przetocz piłkę w kontrolowanym zakresie.','Spokojnie wróć do pozycji wyjściowej.'],
  'wall-push':['Oprzyj dłonie o ścianę i ustaw ciało w linii.','Zegnij łokcie i zbliż klatkę do ściany.','Odepchnij się z wydechem, bez napinania brzucha.'],
  chair:['Ustaw stopy pod kolanami przy stabilnym krześle.','Cofnij biodra i kontroluj zejście do siedziska.','Wstań z wydechem i wyprostuj sylwetkę.'],
  arms:['Stań wysoko, ramiona luźno i barki nisko.','Unieś ręce tylko do komfortowej wysokości.','Opuść ręce powoli, bez kołysania tułowiem.'],
  leg:['Stań stabilnie, w razie potrzeby przytrzymaj krzesło.','Wykonaj ruch nogą w komfortowym zakresie.','Wróć powoli bez gwałtownego odkładania ciężaru.']
 };
 return copy[kind]||copy.leg;
}

function ExerciseGuideCard({x}:{x:Exercise}){
 const [open,setOpen]=useState(false);
 const kind=exerciseKind(x);
 const copy=phaseCopy(kind);
 const asset=(phase:string)=>`${import.meta.env.BASE_URL}exercises/phases/${kind}-${phase}.webp`;
 return <article className={`guide-card ${open?'open':''}`}><button className="guide-head" onClick={()=>setOpen(v=>!v)}><img src={asset('a')} alt="Kroketas pokazuje ruch"/><span><small>{x.section}</small><b>{x.name}</b></span><ChevronRight/></button>{open&&<div className="phase-strip">{(['start','a','b'] as const).map((phase,i)=><figure key={phase}><img src={asset(phase)} alt={`${x.name} — ${i===0?'pozycja wyjściowa':`faza ${phase.toUpperCase()}`}`}/><figcaption><b>{i===0?'START':`FAZA ${phase.toUpperCase()}`}</b><span>{copy[i]}</span></figcaption></figure>)}<p className="guide-cue"><ShieldCheck/>{x.cue}</p></div>}</article>
}
