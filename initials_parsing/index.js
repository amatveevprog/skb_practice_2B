import _ from 'lodash';

const regExpForCapitals = /[A-ZА-Я]{1}[a-zа-я]+/u;
const regExpForExtraneousSymbols = /[0-9!@#$%^&*()_+=\/]/;
const regExpForUpperCase = /([A-ZА-Я])+/g;
const regExpForLowerCase = /[a-zа-я]/u;
const MAX_INITIALS_COUNT=3;

export default class InitialsTransformer
{
  constructor(InputString)
  {
    this.initialString=InputString;
    this.result='false';
    this.arrayOfInitials=_.words(InputString);
    //this.testCapitalsPlaceAndCorrect();
  }

  //test if capital letters are on a right places and do a simple correction
  testCapitalsPlaceAndCorrect()
  {
    if((this.arrayOfInitials.some((item)=>regExpForLowerCase.test(item[0])===true))||(this.initialString.match(regExpForUpperCase).length>MAX_INITIALS_COUNT))
    {
      //если хоть в одном элементе массива первая буква - маленькая, то преобразовываем весь массив в нормальный вид
      this.arrayOfInitials = this.arrayOfInitials.map((item)=>this.normalize(item));
    }
  };
  normalize(str)
  {
    str = _.lowerCase(str);
    str = _.upperFirst(str);
    return str;
  };
  //test strings like 'иГоРь аЛексАндРовиЧ сУвороВ'
  testWrongCapitals(string)
  {

  }
  //regular expression test for capital letters in array
  testCapitalInitials()
  {
    return this.arrayOfInitials.some((elem) => regExpForCapitals.test(elem)===false) ? false : true;
  }

  //regular expression test for Extraneous Symbols
  testExtraneousSymbols()
  {
    return this.arrayOfInitials.some((elem) => regExpForExtraneousSymbols.test(elem)===true) ? false : true;
  }

  testInitialStringForExtraneousSymbols()
  {
    return regExpForExtraneousSymbols.test(this.initialString)==true ? false : true;
  }

  //parse function that extracts Surname from Initials and puts it to 1st place, other initials are short, separated by '.' symbol
  parseToResult()
  {
    let outStr = '';
    if((this.arrayOfInitials.length >= 2) && (this.arrayOfInitials.length < 4))
    {
      //last element of an Initials Array: Surname - we write it entirely
      outStr += this.arrayOfInitials[this.arrayOfInitials.length - 1];
      //get previous part of an array and extract first(first two) word(s)
      let slice_arr = _.slice(this.arrayOfInitials,0,this.arrayOfInitials.length-1);
      //cut this part to short initials:
      let short_arr = slice_arr.map((item)=>{
        return item[0];
      });
      outStr+=' ';
      short_arr.forEach((item)=>{
        outStr+=item+'. ';
      });
      //trim end whitespace that has been included in cycle forEach
      outStr = _.trimEnd(outStr);
    }
    else {
      outStr = this.arrayOfInitials[0];
    }
    this.result=outStr;
  }
  testInputArrayCapacity()
  {
    if(this.arrayOfInitials.length>MAX_INITIALS_COUNT)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  //parse for Client connections & handle some errors
  async parse()
  {
    if((this.testCapitalInitials())&&(this.testExtraneousSymbols())&&(this.testInputArrayCapacity())&&(this.testInitialStringForExtraneousSymbols()))
    {
      this.testCapitalsPlaceAndCorrect();
      this.parseToResult();
    }
    else
    {
      this.result='Invalid fullname';
    }
    return this.result;
  }
}



//tests

/*

 const testArray = [
 'Steven Paul Jobs',
 'Илья Валентинович Сегалович',
 'Tinna Gunnlaugsdóttir',
 'Four word full name',
 'Putin',
 'Östin3323',
   'Vladimir Vladimirovich Putin Putin Putin Putin Putin',
   'Vladimir_Vladimirovich_Putin',
   'иГоРь аЛексАндРовиЧ сУвороВ'
 ];


 testArray.forEach((item)=> {
 let IT = new InitialsTransformer(item);
 console.log(IT.parse());
 });
*/


