import addOrdersToArray from '../../../src/pairtest/lib/utils.js';

describe("test utils", () =>{
it("should add values to the array", () =>{
    let ticketArray = [];
    addOrdersToArray(jsonTicketObject, ticketArray);
    expect(ticketArray.length).toBe(3);
    expect(ticketArray[0].getNoOfTickets()).toBe(9);
    expect(ticketArray[1].getNoOfTickets()).toBe(3);
    expect(ticketArray[2].getNoOfTickets()).toBe(2);
    expect(ticketArray[0].getTicketType()).toBe("ADULT");
    expect(ticketArray[1].getTicketType()).toBe("CHILD");
    expect(ticketArray[2].getTicketType()).toBe("INFANT");

});

it("Throws exception if invalid request", () =>{
    let ticketArray = [];
    expect(() =>{
        addOrdersToArray(null, ticketArray);
       }).toThrow("The request is invalid.")
});

it("Throws exception if invalid request", () =>{
    let emptyArray =[];
    let ticketArray = [];
    expect(() =>{
        addOrdersToArray(emptyArray, ticketArray);
       }).toThrow("The request is invalid.")
});

});

const jsonTicketObject = [
    {
        "type": "ADULT",
        "amount": 9
    },
    {
        "type": "CHILD",
        "amount": 3
    },
    {
        "type": "INFANT",
        "amount": 2
    }
];