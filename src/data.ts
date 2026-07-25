import type { Exercise, Workout, Section } from './types';

let n = 0;
const e = (name:string, section:Section, sets:number, reps:string, tempo:string, rest:number, cue:string, load=''):Exercise =>
  ({ id:`home-${++n}`, name, section, sets, reps, tempo, rest, cue, load });
const warm = (name:string) => e(name, 'Rozgrzewka', 1, '7–8 min', 'spokojnie', 0, 'Ruszaj się w komfortowym zakresie i oddychaj swobodnie.');
const move = (name:string, sets:number, reps:string, cue:string, load='masa ciała', rest=60) =>
  e(name, 'Siła i stabilizacja', sets, reps, '3–1–2', rest, cue, load);
const cardio = (name:string, minutes:string) =>
  e(name, 'Cardio', 1, minutes, 'strefa 2', 0, 'Równe tempo bez zadyszki — możesz mówić pełnymi zdaniami.');
const cool = (name:string) =>
  e(name, 'Wyciszenie', 1, '5 min', '30 s / pozycję', 0, 'Bez sprężynowania i bólu. Rozluźnij brzuch i spokojnie oddychaj.');

export const workouts:Workout[] = [
  {
    day:1, title:'Domowy start', focus:'Całe ciało • masa własna', duration:'35–40 min', cardio:'Marsz w miejscu 8 min',
    exercises:[
      warm('Marsz w miejscu + krążenia barków i bioder'),
      move('Wstawanie z krzesła',2,'8','Stopy pod kolanami. Wstań z wydechem, a usiądź powoli.'),
      move('Pompka przy ścianie',2,'8','Ciało w jednej linii, dłonie na wysokości klatki. Wydech przy odepchnięciu.'),
      move('Uginanie nogi stojąc',2,'10 / strona','Przytrzymaj krzesło. Pięta zmierza do pośladka bez ruchu bioder.','lekkie obciążniki na kostki'),
      move('Unoszenie ramion w bok',2,'8','Ręce tylko do komfortowej wysokości, barki daleko od uszu.','lekkie obciążniki na nadgarstki'),
      move('Ściskanie piłki między dłońmi',2,'8 × 5 s','Piłka przed klatką. Nacisk delikatny, bez napinania brzucha.','duża piłka'),
      cardio('Marsz w miejscu lub po mieszkaniu','8 min'),
      cool('Łydki przy ścianie + otwarcie klatki')
    ]
  },
  {
    day:2, title:'Piłka i postawa', focus:'Plecy • barki • mobilność', duration:'35–40 min', cardio:'Kroki boczne 8 min',
    exercises:[
      warm('Marsz + toczenie piłki dłońmi po ścianie'),
      move('Przysiad do piłki przy ścianie',2,'8','Piłka między plecami a ścianą. Zejdź płytko, kolana kieruj nad stopy.','duża piłka'),
      move('Aniołki przy ścianie',2,'8','Plecy oparte, prowadź ręce tylko w bezbolesnym zakresie.'),
      move('Odwodzenie nogi stojąc',2,'10 / strona','Trzymaj oparcie krzesła. Miednica nieruchomo, palce stopy do przodu.','lekkie obciążniki na kostki'),
      move('Toczenie piłki po ścianie',2,'8','Dłonie na piłce, zatocz małe koła bez unoszenia barków.','duża piłka'),
      move('Wspięcia na palce',2,'12','Lekko oprzyj dłonie o krzesło, unoś i opuszczaj pięty powoli.'),
      cardio('Kroki boczne + spokojny marsz','8 min'),
      cool('Barki + tył uda w siadzie na krześle')
    ]
  },
  {
    day:3, title:'Nogi bez pośpiechu', focus:'Pośladki • kolana • równowaga', duration:'38–43 min', cardio:'Marsz 10 min',
    exercises:[
      warm('Marsz + krążenia stóp + płytkie ugięcia kolan'),
      move('Wstawanie z krzesła z pauzą',3,'8','Zatrzymaj się na sekundę nad siedziskiem. Kolana pozostają nad stopami.'),
      move('Wyprost kolana w siadzie',2,'10 / strona','Usiądź wysoko i wyprostuj nogę bez blokowania kolana.','lekkie obciążniki na kostki'),
      move('Odwodzenie nogi w leżeniu bokiem',2,'10 / strona','Głowa podparta, biodra jedno nad drugim, mały kontrolowany ruch.','bez lub lekki obciążnik na kostkę'),
      move('Półprzysiad z piłką przed sobą',2,'8','Trzymaj piłkę lekko, biodra cofnij jak do krzesła.','duża piłka'),
      move('Balans przy krześle',2,'20 s / strona','Jedna dłoń blisko oparcia. Stań na jednej nodze bez wstrzymywania oddechu.'),
      cardio('Marsz po mieszkaniu','10 min'),
      cool('Łydki + przód uda stojąc z podparciem')
    ]
  },
  {
    day:4, title:'Góra ciała lekko', focus:'Ramiona • klatka • łopatki', duration:'35–40 min', cardio:'Kroki z pracą rąk 8 min',
    exercises:[
      warm('Marsz + krążenia barków + otwieranie ramion'),
      move('Pompka przy ścianie — wolno',3,'8','Trzy sekundy do ściany, wydech podczas odepchnięcia.'),
      move('Unoszenie ramion przodem',2,'8','Łokcie miękkie, ręce nie wyżej niż barki.','lekkie obciążniki na nadgarstki'),
      move('Ściąganie łopatek w siadzie',2,'10 × 3 s','Usiądź na krześle. Cofnij łopatki delikatnie, nie wypychaj żeber.'),
      move('Przekładanie piłki z dłoni do dłoni',2,'10 / strona','Piłka blisko tułowia, ruch spokojny bez skręcania brzucha.','duża piłka'),
      move('Uginanie ramion stojąc',2,'10','Łokcie przy tułowiu, nadgarstki proste.','lekkie obciążniki na nadgarstki'),
      cardio('Marsz w miejscu z łagodną pracą ramion','8 min'),
      cool('Klatka przy ścianie + szyja i barki')
    ]
  },
  {
    day:5, title:'Stabilność przy piłce', focus:'Biodra • kontrola • równowaga', duration:'38–43 min', cardio:'Marsz 10 min',
    exercises:[
      warm('Marsz + toczenie piłki po podłodze'),
      move('Siad i wstawanie z piłką przy ścianie',2,'10','Piłka podpiera plecy. Zakres płytki i całkowicie komfortowy.','duża piłka'),
      move('Toczenie piłki stopą w siadzie',2,'8 kół / strona','Usiądź stabilnie i zataczaj małe koła stopą na piłce.','duża piłka'),
      move('Prostowanie nogi w tył stojąc',2,'10 / strona','Trzymaj krzesło. Noga idzie lekko w tył bez wyginania pleców.','lekkie obciążniki na kostki'),
      move('Pompka przy blacie',2,'8','Wysokie, stabilne podparcie. Ciało w linii, wydech przy odepchnięciu.'),
      move('Przenoszenie ciężaru z nogi na nogę',2,'10 / strona','Stopy szerzej niż biodra, przesuwaj ciężar spokojnie bez głębokiego ugięcia.'),
      cardio('Marsz ze zmianą kierunku','10 min'),
      cool('Biodra + łydki + spokojny oddech żebrowy')
    ]
  },
  {
    day:6, title:'Tył nóg i pośladki', focus:'Pośladki • tył uda', duration:'38–43 min', cardio:'Kroki boczne 10 min',
    exercises:[
      warm('Marsz + zawias biodrowy przy ścianie'),
      move('Zawias biodrowy do ściany',3,'8','Stań krok od ściany i cofnij biodra do lekkiego dotknięcia. Plecy neutralne.'),
      move('Uginanie nóg stojąc',3,'10 / strona','Kolana obok siebie, ruch bez kołysania tułowiem.','lekkie obciążniki na kostki'),
      move('Most biodrowy — niski zakres',2,'8','Unieś biodra tylko jeśli brzuch i blizna są całkowicie komfortowe.'),
      move('Ściskanie piłki kolanami w siadzie',2,'8 × 5 s','Nacisk bardzo delikatny. Oddychaj przez cały czas.','duża piłka'),
      move('Wspięcia na palce z pauzą',3,'10','Pauza sekundę u góry, opuszczaj pięty powoli.'),
      cardio('Kroki boczne + marsz','10 min'),
      cool('Tył uda na krześle + pośladek w siadzie')
    ]
  },
  {
    day:7, title:'Domowa regeneracja', focus:'Mobilność • oddech • lekki ruch', duration:'30–35 min', cardio:'Swobodny spacer 12 min',
    exercises:[
      warm('Spokojny marsz + oddech do boków żeber'),
      move('Toczenie piłki po ścianie góra–dół',2,'8','Nie unoś barków. Zatrzymaj ruch przed dyskomfortem.','duża piłka',45),
      move('Koci grzbiet przy ścianie',2,'6','Dłonie na ścianie, delikatnie zaokrąglij i wyprostuj górę pleców.','masa ciała',45),
      move('Rotacja odcinka piersiowego w siadzie',2,'6 / strona','Ręce na barkach, skręt mały; biodra zostają nieruchomo.','masa ciała',45),
      move('Wstawanie z wysokiego krzesła',2,'8','Pomóż sobie dłońmi, jeśli dzięki temu ruch jest swobodny.','masa ciała',45),
      cardio('Spacer w domu lub na zewnątrz','12 min'),
      cool('Całe ciało + 5 spokojnych oddechów')
    ]
  },
  {
    day:8, title:'Drugi tydzień', focus:'Całe ciało • mała progresja', duration:'40–45 min', cardio:'Marsz 10 min',
    exercises:[
      warm('Marsz + mobilizacja barków, bioder i kostek'),
      move('Przysiad do krzesła z piłką',3,'8','Piłkę trzymaj przed sobą bez ściskania. Dotknij siedziska i wstań z wydechem.','duża piłka'),
      move('Pompka przy blacie — wolno',3,'8','Stabilny blat, łokcie około 45° od tułowia.'),
      move('Odwodzenie nogi stojąc',3,'10 / strona','Miednica poziomo, ruch prowadzi bok pośladka.','lekkie obciążniki na kostki'),
      move('Unoszenie ramion bokiem',2,'10','Zatrzymaj ręce poniżej barków, nie unoś ramion do uszu.','lekkie obciążniki na nadgarstki'),
      move('Balans z dotknięciem piłki',2,'8 / strona','Przytrzymaj krzesło jedną ręką, drugą lekko dotykaj piłki ustawionej obok.','duża piłka'),
      cardio('Marsz ze zmianą tempa','10 min'),
      cool('Klatka + biodra + łydki')
    ]
  },
  {
    day:9, title:'Postawa domowa', focus:'Łopatki • barki • biodra', duration:'38–43 min', cardio:'Kroki w cztery strony 10 min',
    exercises:[
      warm('Marsz + aniołki przy ścianie'),
      move('Aniołki przy ścianie',3,'8','Żebra spokojnie, ręce pracują tylko w komfortowym zakresie.'),
      move('Pulsowanie ramion w tył',2,'10','Ręce wzdłuż ciała, mały ruch z łopatek.','lekkie obciążniki na nadgarstki'),
      move('Prostowanie nogi w tył stojąc',3,'10 / strona','Pośladek pracuje, lędźwie pozostają spokojne.','lekkie obciążniki na kostki'),
      move('Toczenie piłki po ścianie w koło',2,'6 kół / kierunek','Koła małe i płynne, barki rozluźnione.','duża piłka'),
      move('Wykrok w tył — dotknięcie palcami',2,'8 / strona','Tylko cofnij i dotknij podłogi palcami. Trzymaj krzesło dla równowagi.'),
      cardio('Kroki przód–tył i bok–bok','10 min'),
      cool('Barki + zginacze bioder przy krześle')
    ]
  },
  {
    day:10, title:'Silniejsze nogi', focus:'Nogi • pośladki • kontrola', duration:'42–47 min', cardio:'Marsz 12 min',
    exercises:[
      warm('Marsz + płytkie przysiady przy krześle'),
      move('Wstawanie z krzesła',3,'10','Równy nacisk obu stóp, wydech podczas wstawania.'),
      move('Przysiad z piłką przy ścianie',3,'10','Płytki zakres, kolana nad stopami, piłka podpiera plecy.','duża piłka'),
      move('Wyprost kolana w siadzie',3,'10 / strona','Wyprostuj, zatrzymaj sekundę i powoli opuść.','lekkie obciążniki na kostki'),
      move('Odwodzenie nogi w leżeniu bokiem',2,'12 / strona','Nie roluj biodra do tyłu.','bez lub lekki obciążnik na kostkę'),
      move('Wspięcia na palce',3,'12','Lekki chwyt krzesła, pełna kontrola w dół.'),
      cardio('Marsz po mieszkaniu','12 min'),
      cool('Przód uda + łydki + tył uda')
    ]
  },
  {
    day:11, title:'Ramiona i łopatki', focus:'Góra ciała • spokojny oddech', duration:'38–43 min', cardio:'Marsz z pracą rąk 10 min',
    exercises:[
      warm('Marsz + krążenia barków i nadgarstków'),
      move('Pompka przy blacie',3,'10','Blat musi być stabilny. Wydech przy odepchnięciu.'),
      move('Uginanie ramion',3,'10','Łokcie przy bokach, ruch bez bujania.','lekkie obciążniki na nadgarstki'),
      move('Unoszenie ramion w literę V',2,'8','Ręce prowadź po skosie tylko do komfortowej wysokości.','lekkie obciążniki na nadgarstki'),
      move('Ściskanie piłki przed klatką',2,'10 × 4 s','Nacisk 30–40%, bez parcia i bez zatrzymywania oddechu.','duża piłka'),
      move('Ściąganie łopatek przy ścianie',3,'10','Łokcie przy ścianie, delikatnie zbliż łopatki.'),
      cardio('Marsz z łagodnym ruchem ramion','10 min'),
      cool('Klatka + triceps + szyja')
    ]
  },
  {
    day:12, title:'Balans i biodra', focus:'Jedna noga • pewność ruchu', duration:'40–45 min', cardio:'Kroki boczne 12 min',
    exercises:[
      warm('Marsz + przenoszenie ciężaru między stopami'),
      move('Balans przy krześle',3,'25 s / strona','Palce dłoni mogą dotykać oparcia. Wzrok skieruj w jeden punkt.'),
      move('Wejście na niski stopień',2,'8 / strona','Użyj najniższego stabilnego stopnia i poręczy. Zejdź powoli.'),
      move('Odwodzenie nogi stojąc',3,'12 / strona','Tułów pionowo, stopa skierowana do przodu.','lekkie obciążniki na kostki'),
      move('Toczenie piłki stopą w siadzie',2,'10 / strona','Ruch w przód i w tył, siedź stabilnie.','duża piłka'),
      move('Półprzysiad z podparciem',2,'10','Trzymaj krzesło, cofnij biodra i zachowaj komfortowy zakres.'),
      cardio('Kroki boczne + marsz','12 min'),
      cool('Biodra + stopy + łydki')
    ]
  },
  {
    day:13, title:'Domowy obwód', focus:'Płynność • całe ciało', duration:'42–47 min', cardio:'Obwód marszowy 12 min',
    exercises:[
      warm('Marsz + mobilizacja całego ciała'),
      move('Wstawanie z krzesła z piłką',3,'10','Trzymaj piłkę blisko tułowia, bez ściskania.','duża piłka'),
      move('Pompka przy ścianie',3,'12','Płynny ruch i wydech przy odepchnięciu.'),
      move('Uginanie nogi stojąc',3,'12 / strona','Biodra nieruchomo, kontroluj opuszczanie.','lekkie obciążniki na kostki'),
      move('Unoszenie ramion w bok',3,'10','Lekki ciężar, szyja rozluźniona.','lekkie obciążniki na nadgarstki'),
      move('Zawias biodrowy do ściany',3,'10','Biodra cofają się, brzuch pozostaje miękki i oddech swobodny.'),
      cardio('1 min marszu + 30 s kroków bocznych','12 min'),
      cool('Całe ciało + spokojny oddech')
    ]
  },
  {
    day:14, title:'Finał w domu', focus:'Całe ciało • jakość techniki', duration:'42–47 min', cardio:'Ulubiony marsz 12 min',
    exercises:[
      warm('Marsz + ulubiona mobilizacja z planu'),
      move('Przysiad do krzesła z piłką',3,'10','RPE maksymalnie 5–6. Wstań z wydechem.','duża piłka'),
      move('Pompka przy blacie lub ścianie',3,'10','Wybierz wysokość, przy której brzuch pozostaje komfortowy.'),
      move('Odwodzenie nogi stojąc',3,'12 / strona','Prowadź ruch pośladkiem, bez przechylania tułowia.','lekkie obciążniki na kostki'),
      move('Uginanie i unoszenie ramion',2,'8 + 8','Najpierw uginanie, potem lekkie uniesienie przodem.','lekkie obciążniki na nadgarstki'),
      move('Balans z piłką przy ścianie',2,'25 s / strona','Jedna dłoń lekko stabilizuje piłkę na ścianie; druga blisko krzesła.','duża piłka'),
      cardio('Marsz w ulubionym rytmie','12 min'),
      cool('Ulubione rozciąganie z planu + 5 oddechów')
    ]
  }
];

export const safety = [
  'Ból, pieczenie lub ciągnięcie blizny → przerwij ćwiczenie',
  'Nie wstrzymuj oddechu; wydech w fazie wysiłku',
  'Zostań przy RPE 5–6/10 i zachowaj 3–4 powtórzenia w zapasie',
  'Obciążniki zakładaj lekko i zacznij od najniższej dostępnej masy',
  'Piłkę opieraj o ścianę i ćwicz z dala od śliskiej podłogi',
  'Ból kolana powyżej 3/10 → skróć zakres albo pomiń ruch'
];
