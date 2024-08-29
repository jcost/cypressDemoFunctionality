import { map } from "cypress/types/bluebird"

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

describe('Cypress question', () => {
    //This reverses the strings the simplest way and makes them both lowercase.
    it('Reverse String', () => {
      stringsToReverse.forEach((arrayValue) => {
        expect(reverseString(arrayValue).toLowerCase()).to.equal(arrayValue.toLowerCase())
      })
    })
    //This reverses the strings by using an object of strings.
    it('Reverse String Using Object of Strings', () => {
        stringsToReverseObject.forEach((stringElement) => {
            stringElement.shouldMatch ?
            expect(reverseString(stringElement.stringToReverse).toLowerCase()).to.equal(stringElement.stringToReverse.toLowerCase()) :
            expect(reverseString(stringElement.stringToReverse).toLowerCase()).to.not.equal(stringElement.stringToReverse.toLowerCase())
          })
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
})

//This is to reverse the string by splitting, reversing, then rejoining.
function reverseString(str: string): string {
    return str.split('').reverse().join('')
}