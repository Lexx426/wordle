
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
            const wordArray = result.split("\r\n");
            console.log(wordArray + "-----")
            todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)]
            console.log(todaysWord + "''''''''''''''''")
            wordSet = new Set(wordArray)
            console.log(wordSet + " ======")
        });
    return { wordSet, todaysWord};
}