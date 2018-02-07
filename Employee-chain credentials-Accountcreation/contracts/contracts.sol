pragma solidity ^0.4.6;

contract Check_OnlyOne
{
    struct Account{
        string Name;
        uint Phone;
        uint Timestamp;
        string Password;
    }
    
    mapping(uint => Account) Total;
    uint8 Count=0;

    function addNewAccount(uint Phone, string Name, string Password)
    {
        Account memory newAccount;
        newAccount.Name = Name;
        newAccount.Phone= Phone;
        newAccount.Password= Password;
        newAccount.Timestamp = now;
      
        Total[Count] = newAccount;
        Count++;
    }
    function GetCount() returns(uint8){
        return Count;
    }

    function getAccount(uint8 CountNo) returns (string,uint,uint,string)
    {
        return (Total[CountNo].Name, Total[CountNo].Phone, Total[CountNo].Timestamp,Total[CountNo].Password);
    }
}