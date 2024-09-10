import { map } from "cypress/types/bluebird"
import { round } from "cypress/types/lodash"

//Making an arrauy.
let stringsToReverse: string[]  = [
    'ollo', 'anna', 'racecar', 'ttytt', 'Racecar'
]

//Making an object of type string, boolean.
let stringsToReverseObject: MyStringObject[] = [
    { stringToReverse: 'hello', shouldMatch: false },
    { stringToReverse: 'anna', shouldMatch: true },
    { stringToReverse: 'racecar', shouldMatch: true },
    { stringToReverse: 'Racecar', shouldMatch: true },
    { stringToReverse: 'test', shouldMatch: false },
]

//Create interface of objects to ensure structure and reusability.
interface MyStringObject {
    stringToReverse: string,
    shouldMatch: boolean
}

//This is a map of strings.
let mapStringsToReverse = new Map<string, boolean>()

let arrayOfNumbersToRoundUpToNextMultiple: number[] = [
    1,2,3,4,5,6,7,10,19,21
]

describe('Cypress question', () => {
    //This reverses the strings the simplest way and makes them both lowercase.
    it('Reverse String', () => {
      stringsToReverse.forEach((arrayValue) => {
        expect(reverseString(arrayValue).toLowerCase()).to.equal(arrayValue.toLowerCase())
      })
    })
    let arrayOfStringsToCheckPalindrome: string[] = ['anna', 'troy', 'Troy', 'Anna']

    arrayOfStringsToCheckPalindrome.forEach((str) => {
    it.only(`Find out if String ${str} is Palindrome without using .reverse`, () => {

        let stringSplitArray = str.toLowerCase().split('')
        let newWord = ''
        for(let i = stringSplitArray.length - 1; i >= 0; i--) {
            newWord += stringSplitArray[i]
        }

        if(newWord === str.toLowerCase()) {
            cy.log('Word is a palindrome')
        }
        else {
            cy.log('Word is NOT a palindrome')
        }
    })
    })
    //This reverses the strings by using an object of strings and then checks if it's a palindrome.
    it('Is String a Palindrome', () => {
        stringsToReverseObject.forEach((stringElement) => {
            stringElement.shouldMatch ?
            expect(reverseString(stringElement.stringToReverse).toLowerCase()).to.equal(stringElement.stringToReverse.toLowerCase()) :
            expect(reverseString(stringElement.stringToReverse).toLowerCase()).to.not.equal(stringElement.stringToReverse.toLowerCase())
          })
    })
    it('How do you calculate the number of numerical digits in a string?', () => {
        let stringOfNumbersAndLetters: string = 't0e.sting123'
        let count = 0

        //This is a way to count the digits.
        stringOfNumbersAndLetters.split('').forEach((c) => {
            if(+c >= 0) {
                count += 1
            }
        })

        expect(count).to.equal(4)

        //This is a way to count the digits using regex.
        expect(countDigits(stringOfNumbersAndLetters)).to.equal(4)
    })
    it('How do you find the count for the occurrence of a particular character in a string?', () => {
        let stringOfSpecificCharacters = 'testingt'
        let count = 0
        let characterToCheckFor = 't'
        let char: string

        //This is a way to count a specific character using split.
        stringOfSpecificCharacters.split('').forEach((c) => {
            if(c === characterToCheckFor) {
                count += 1
            }
        })
        expect(count).to.equal(3)
    })

    const countDigits = ((stringToCount): number => {
        return (stringToCount.match(/\d/g) || []).length
    })

    //This is to use a map to compare string values.
    it('Using Map to compare string values after reversing', () => {

        //Setting the map values.
        mapStringsToReverse.set('hello', false)
        mapStringsToReverse.set('anna', true)
        mapStringsToReverse.set('racecar', true)
        mapStringsToReverse.set('Racecar', true)
        mapStringsToReverse.set('test', false)
        mapStringsToReverse.set('test123', false)

        cy.log('map value: ' + mapStringsToReverse.get("hello"))
        expect(mapStringsToReverse.has("anna")).to.be.true

        mapStringsToReverse.delete('test')

        mapStringsToReverse.forEach((value, key) => {
            cy.log(value.toString(), key)
            value ?
            expect(reverseString(key).toLowerCase()).to.equal(key.toLowerCase()) :
            expect(reverseString(key).toLowerCase()).to.not.equal(key.toLowerCase())
        })
    })
    arrayOfNumbersToRoundUpToNextMultiple.forEach((numberToRoundUpTo) => {
    it(`Round ${numberToRoundUpTo} to next multiple`, () => {
        cy.log('number: ' + numberToRoundUpTo + ' roundedUptoNumber: ' + roundNumberToNextMultiple(numberToRoundUpTo, 5))
        cy.log('number: ' + numberToRoundUpTo + ' roundedUptoNumber: ' + roundNumberToNextMultipleOldFormat(numberToRoundUpTo, 10))
    })
    })
    it('Resursive function to sum an array of 10 numbers', () => {
        let sumOfNumbers = recursivelySumNumbers(arrayOfNumbers)
        cy.log('sum: ' + sumOfNumbers)
    })
})

//This is to reverse the string by splitting, reversing, then rejoining.
function reverseString(str: string): string {
    return str.split('').reverse().join('')
}
function roundNumberToNextMultipleOldFormat(numberToRound: number, multipleToRoundUpTo: number): number {
    return Math.ceil(numberToRound / multipleToRoundUpTo) * multipleToRoundUpTo;
}

const roundNumberToNextMultiple = (numberToRound: number, multipleToRoundUpTo: number): number => {
    return Math.ceil(numberToRound / multipleToRoundUpTo) * multipleToRoundUpTo;
}

const arrayOfNumbers: number[] = [ 10,0,0,0,0,10,10,10,10,10 ]
let sum = 0
const recursivelySumNumbers = (numberArrayToSum: number[], index: number = 0): number => {
    if(index < numberArrayToSum.length) {
        sum += numberArrayToSum[index]
        recursivelySumNumbers(numberArrayToSum, index + 1)
    }
    return sum
}