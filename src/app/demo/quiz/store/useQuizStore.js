import {create} from 'zustand';
import {questions as base} from '../data/questions';
import {shuffle} from '../utils/shuffle';
import {calculateScore} from '../utils/calculateScore';
export const useQuizStore=create((set,get)=>({
screen:'register',questions:[],answers:{},currentIndex:0,score:0,user:{},
startQuiz:(user)=>set({user,questions:shuffle(base),screen:'quiz'}),
selectAnswer:(i)=>set({answers:{...get().answers,[get().currentIndex]:i}}),
next:()=>set({currentIndex:get().currentIndex+1}),
submit:()=>set({score:calculateScore(get().questions,get().answers),screen:'result'}),
restart:()=>set({screen:'register',answers:{},currentIndex:0})
}));