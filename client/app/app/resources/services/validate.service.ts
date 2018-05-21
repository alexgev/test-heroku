import {Injectable} from '@angular/core';

@Injectable()
export class ValidateService {
  getErrorMessage = {
    parent: this,
    required() {
      return 'This field is required'
    },
    pattern(regexp) {
      let answer: any;
      this.parent.patternsDone.forEach((item) => {
        if (item.regexp == regexp) {
          answer = item.error;
        }
      });
      return answer;
    },
    minlength(value) {
      return '\n' + 'The minimum number of characters is ' + value;
    },
    maxlength(value) {
      return 'The maximum number of characters is ' + value;
    }
  }
  patterns = [
    this.validateStringCyrillic(),
    this.validateStringLatin(),
    this.validateString(),
    this.validateStringWithoutNumbersCyrillic(),
    this.validateStringWithoutNumbersLatin(),
    this.validateStringWithoutNumbers(),
    this.validateStringCyrillicStrict(),
    this.validateStringLatinStrict(),
    this.validateStringStrict(),
    this.validateStringWithoutNumbersCyrillicStrict(),
    this.validateStringWithoutNumbersLatinStrict(),
    this.validateStringWithoutNumbersStrict(),
    this.validateWordCyrillic(),
    this.validateWordLatin(),
    this.validateWord(),
    this.validateDoubleWordCyrillic(),
    this.validateDoubleWordLatin(),
    this.validateDoubleWord(),
    this.validateTrippleWordCyrillic(),
    this.validateTrippleWordLatin(),
    this.validateTrippleWord(),
    this.validateFIO(),
    this.validateNumber(),
    this.validateNumberWithDots(),
    this.validateDate(),
    this.validatePhone(),
    this.validateEmail(),
    this.validateUrl(),
  ]
  patternsDone = this.patterns.map((item) => {
    item['regexp'] = '/' + item['regex'] + '/';
    return item;
  });

  constructor() {
  }

  /* Карта описаний регулярных выражений:
  *
  * (рус), (англ), (рус/англ)... - языки, на которых вводятся строки или слова
  * Слово....................... - набор символов, не разделённых пробелом
  * Строка...................... - набор символов, разделённых пробелом
  * ->.......................... - следующие входные данные в рамках одного выражения
  * (необязательно)............. - данные, описанные далее, вводить необязательно
  *
  * */
  validateStringCyrillic() {
    return {
      /*    (рус)
            -> Строка с пробелами, цифрами и спецсимволами*/
      regex: '^[а-яА-ЯёЁ\\d\\W]+$',
      errorRu: "Введите строку на русском языке",
      error: "Enter a string in Russian"
    }
  };

  validateStringLatin() {
    return {
      /*    (англ)
            -> Строка с пробелами, цифрами и спецсимволами*/
      regex: '^[a-zA-Z\\d\\W]+$',
      errorRu: "Введите строку на английском языке",
      error: "Enter a string in Latin characters "
    };
  }

  validateString() {
    return {
      /*    (рус/англ)
            -> Строка с пробелами, цифрами и спецсимволами*/
      regex: '^[а-яА-ЯёЁa-zA-Z\\d\\W]+$',
      errorRu: "Введите строку",
      error: "Enter a string"
    }
  };

  validateStringWithoutNumbersCyrillic() {
    return {
      /*    (рус)
            -> Строка с пробелами и спецсимволами, но без цифр */
      regex: '^[а-яА-ЯёЁ\\W]+$',
      errorRu: "Введите строку без чисел на русском языке",
      error: "Enter a string without numbers in Russian"
    }
  };

  validateStringWithoutNumbersLatin() {
    return {
      /*    (англ)
            -> Строка с пробелами и спецсимволами, но без цифр */
      regex: '^[a-zA-Z\\W]+$',
      errorRu: "Введите строку без чисел на английском языке",
      error: "Enter a string without numbers in Latin characters"
    }
  };

  validateStringWithoutNumbers() {
    return {
      /*    (рус/англ)
            -> Строка с пробелами и спецсимволами, но без цифр */
      regex: '^[а-яА-ЯёЁa-zA-Z\\W]+$',
      errorRu: "Введите строку без чисел",
      error: "Enter a string without numbers"
    }
  };

  validateStringCyrillicStrict() {
    return {
      /*    (рус)
            -> Строка с цифрами, но без спецсимволов */
      regex: '^[а-яА-ЯёЁ\\d\\s]+$',
      errorRu: "Введите строку на русском языке",
      error: "Enter a string in Russian"
    }
  };

  validateStringLatinStrict() {
    return {
      /*    (англ)
            -> Строка с цифрами, но без спецсимволов */
      regex: '^[a-zA-Z\\d\\s]+$',
      errorRu: "Введите строку на английском языке",
      error: "Enter a string in Latin characters "
    };
  }

  validateStringStrict() {
    return {
      /*    (рус/англ)
            -> Строка с цифрами, но без спецсимволов */
      regex: '^[а-яА-ЯёЁa-zA-Z\\d\\s]+$',
      errorRu: "Введите строку",
      error: "Enter a string"
    }
  };

  validateStringWithoutNumbersCyrillicStrict() {
    return {
      /*    (рус)
            -> Строка без чисел и спецсимволов */
      regex: '^[а-яА-ЯёЁ\\s]+$',
      errorRu: "Введите строку без чисел на русском языке",
      error: "Enter a string without numbers in Russian"
    }
  };

  validateStringWithoutNumbersLatinStrict() {
    return {
      /*    (англ)
            -> Строка без чисел и спецсимволов */
      regex: '^[a-zA-Z\\s]+$',
      errorRu: "Введите строку без чисел на английском языке",
      error: "Enter a string without numbers in Latin characters"
    }
  };

  validateStringWithoutNumbersStrict() {
    return {
      /*    (рус/англ)
            -> Строка без чисел и спецсимволов */
      regex: '^[а-яА-ЯёЁa-zA-Z\\s]+$',
      errorRu: "Введите строку без чисел",
      error: "Enter a string without numbers"
    }
  };

  validateWordCyrillic() {
    return {
      /*    (рус)
            -> Слово без чисел и спецсимволов */
      regex: '^[а-яА-ЯёЁ]+$',
      errorRu: "Введите одно слово на русском языке",
      error: "Enter one word in Russian"
    }
  };

  validateWordLatin() {
    return {
      /*    (англ)
            -> Слово без чисел и спецсимволов */
      regex: '^[a-zA-Z]+$',
      errorRu: "Введите одно слово на английском языке",
      error: "Enter one word in Latin characters"
    }
  };

  validateWord() {
    return {
      /*    (рус/англ)
            -> Слово без чисел и спецсимволов */
      regex: '^[а-яА-ЯёЁa-zA-Z]+$',
      errorRu: "Введите одно слово",
      error: "Enter one word"
    }
  };

  validateDoubleWordCyrillic() {
    /*    (рус)
          -> Слово
          -> пробел
          -> слово */
    return {
      regex: '^[а-яА-ЯёЁ]+\\s[а-яА-ЯёЁ]+$',
      errorRu: "Введите два слова на русском языке",
      error: "Enter two words in Russian"
    }
  };

  validateDoubleWordLatin() {
    return {
      /*    (англ)
            -> Слово
            -> пробел
            -> слово */
      regex: '^[a-zA-Z]+\\s[a-zA-Z]+$',
      errorRu: "Введите два слова на английском языке",
      error: "Enter two words in Latin characters"
    }
  };

  validateDoubleWord() {
    /*    (рус/англ)
          -> Слово
          -> пробел
          -> слово */
    return {
      regex: '^[а-яА-ЯёЁa-zA-Z]+\\s[а-яА-ЯёЁa-zA-Z]+$',
      errorRu: "Введите два слова",
      error: "Enter two words"
    }
  };

  validateTrippleWordCyrillic() {
    return {
      /*    (рус)
            -> Слово
            -> пробел
            -> слово
            -> пробел
            -> слово  */
      regex: '^[а-яА-ЯёЁ+(\\s[а-яА-ЯёЁ]+){2}$',
      errorRu: "Введите три слова на русском языке",
      error: "Enter three words in Russian"
    }
  };

  validateTrippleWordLatin() {
    return {
      /*    (англ)
            -> Слово
            -> пробел
            -> слово
            -> пробел
            -> слово  */
      regex: '^[a-zA-Z]+(\\s[a-zA-Z]+){2}$',
      errorRu: "Введите три слова на английском языке",
      error: "Enter three words in Latin characters"
    }
  };

  validateTrippleWord() {
    return {
      /*    (рус/англ)
            -> Слово
            -> пробел
            -> слово
            -> пробел
            -> слово  */
      regex: '^[а-яА-ЯёЁa-zA-Z]+(\\s[а-яА-ЯёЁa-zA-Z]+){2}$',
      errorRu: "Введите три слова",
      error: "Enter three words"
    }
  };

  validateFIO() {
    return {

      regex: '^[А-Я][а-яА-Я\\-]{0,}\\s[А-Я][а-яА-Я\\-]{1,}\\s[А-Я][а-яА-Я]{1,}$',
      errorRu: "Введите ФИО",
      error: "Enter Your Name, Middle name and Surname"
    }
  };

  validateNumber() {
    return {

      regex: '^\\-?\\d+([,.]\\d+)?$',
      errorRu: "Введите число",
      error: "Enter a number"
    }
  };

  validateNumberWithDots() {
    return {

      regex: '^\\d{1,3}(\\.\\d{1,3}){0,2}$',
      errorRu: "Введите числа, разделённые точкой",
      error: "Enter numbers separated by dots"
    }
  };

  validateDate() {
    return {

      regex: '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$',
      errorRu: "Введите дату в формате ДД.ММ.ГГГГ",
      error: "Enter date in the «DD.MM.YYYY» format"
    }
  };

  validatePhone() {
    return {
      /*    -> (обязательно) префикс
            -> код через (необязательно) дефис или в кавычках от 3-х до 5-ти символов
            -> 7 цифр или 7 цифр, между которыми два дефиса*/
      regex: '^((8|\\+7)?)((\\-|\\()?\\d{3,5}(\\-|\\))?)?([\\d]{7}|[\\d\\- ]{9})$',
      errorRu: "Введите корректный номер телефона",
      error: "Enter correct telephone number"
    }
  };

  validateEmail() {
    return {
      /*    -> Буквы, цифры, _ или дефис
            -> (необязательно) точка
            -> имя сервера
            -> точка
            -> домен от 2-х до 4-х символов*/
      regex: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$',
      errorRu: "Введите корректный email",
      error: "Enter correct email"
    }
  };

  validateUrl() {
    return {
      /*    -> (необязательно) https или http, двоеточие и 2 слеша
            -> буквы и цифры (необязательно) разделённые точкой или (необязательно) дефисом
            -> точка
            -> домен от 2-х до 6-ти символов
            -> (необязательно) слеш*/
      regex: '^((https?|http)\\:\\/\\/)?([a-z0-9]{1})((\\.[a-z0-9-])|([a-z0-9-]))*\\.([a-z]{2,6})(\\/?)$',
      errorRu: "Введите URL",
      error: "Enter correct URL"
    }
  };
}
