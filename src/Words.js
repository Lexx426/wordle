
import wordBank from "./wordle-bank.txt";
export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
];

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) =>{
            const wordArray = result.split("\n");
            // console.log(wordArray + "-----")
            // wordArray prints
            todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)]
            // console.log(todaysWord + "''''''''''''''''")
            // todaysWord prints
            wordSet = new Set(wordArray)
            // console.log(wordSet + " ======")
            // wordSet prints out [object set]
        });
    return { wordSet, todaysWord};
}