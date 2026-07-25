export type Section = 'Rozgrzewka' | 'Siła i stabilizacja' | 'Cardio' | 'Wyciszenie';
export type Exercise = { id:string; name:string; section:Section; sets:number; reps:string; tempo:string; rest:number; cue:string; load?:string };
export type Workout = { day:number; title:string; focus:string; duration:string; cardio:string; exercises:Exercise[] };
export type ExerciseLog = { done:boolean; load:string };
export type Session = { id:string; day:number; date:string; difficulty:number; notes:string; exercises:Record<string,ExerciseLog>; duration:number };
export type AppState = { logs:Record<string,ExerciseLog>; notes:Record<number,string>; difficulty:Record<number,number>; sessions:Session[]; startedAt:Record<number,number> };
