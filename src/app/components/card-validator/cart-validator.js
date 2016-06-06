(function () {
  'use strict';


  angular.module('fs')
    .factory('cardValidator', cardValidator);

  //		mc: Mastercard
  //		vi: Visa
  //		ax: American Express
  //		dc: Diners Club
  //		bl: Carte Blanch
  //		di: Discover
  //		jcb: JCB
  //		er: Enroute

  var cards = [
    {
      name: 'mc',
      reg: '5[1-5][0-9]{14}',
      url: '../assets/img/master.jpg'
    },
    {
      name: 'vi',
      reg: '4(?:[0-9]{12}|[0-9]{15})',
      url: '../assets/img/visa.jpg'
    },
    {
      name: 'ax',
      reg: '3[47][0-9]{13}',
      url: '../assets/img/ae.jpg'
    },
    {
      name: 'dc',
      reg: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
      url: '../assets/img/dc.jpg'
    },
    {
      name: 'bl',
      reg: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
      url: '../assets/img/master.jpg'
    },
    {
      name: 'di',
      reg: '6011[0-9]{12}',
      url: '../assets/img/master.jpg'
    },
    {
      name: 'jcb',
      reg: '(?:3[0-9]{15}|(2131|1800)[0-9]{11})',
      url: '../assets/img/master.jpg'
    },
    {
      name: 'er',
      reg: '2(?:014|149)[0-9]{11}',
      url: '../assets/img/master.jpg'
    }

  ];

  function cardValidator() {
    return {
      returnLogoCard: function (cardNumber) {
        var spaceRegExp = new RegExp(/[ ]+/g);
        cardNumber = cardNumber.replace(spaceRegExp, '');
        var url = null;
        for (var i in cards) {

          var regExp = new RegExp(cards[i].reg);
          var result = regExp.test(cardNumber);
          if (result) {
            url = cards[i].url;
            break;
          }
        }
        return url
      }
    }

  }

})();
