// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ranking {

mapping (uint => string) public burgerRanking;
mapping (uint => string) public cheesecakeRanking;
uint public burgerNumber;
uint public cheesecakeNumber;

function updateBurger (string memory where, uint position) internal {
    string memory current = burgerRanking[position];
    if(position <= burgerNumber) {
        burgerRanking[position] = where;
        updateBurger(current, position+1);
    } 
}

function addBurger (string memory where, uint position) public {
    require(position <= burgerNumber +1, "The position is out of the range");
    burgerNumber++;
    string memory current = burgerRanking[position];
    burgerRanking[position] = where;
    updateBurger(current, position+1);
    }

    function updateCheesecake (string memory where, uint position) internal {
    string memory current = cheesecakeRanking[position];
    if(position <= cheesecakeNumber) {
        cheesecakeRanking[position] = where;
        updateCheesecake(current, position+1);
    } 
}

    function addCheesecake (string memory where, uint position) public {
    require(position <= cheesecakeNumber +1, "The position is out of the range");
    cheesecakeNumber++;
    string memory current = cheesecakeRanking[position];
    cheesecakeRanking[position] = where;
    updateCheesecake(current, position+1);
    }

}