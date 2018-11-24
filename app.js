const fs = require('fs');
const readline = require('readline');

let inputFilePath = './people.csv',
    inputStream = fs.createReadStream(inputFilePath),
    rl = readline.createInterface(inputStream);
var people = [];
rl
  .on('line' , (line)=>{
    people.push(line.split(';'));
  })
  .on('close', () => {
    var fullWeight = 0, fullHeight = 0, male = 0, female = 0;
    var names = {}, country = {};
    people.forEach(function (elem){
        if(elem == people[0]){
          return;
        }
        fullHeight += parseInt(elem[7]);
        fullWeight += parseInt(elem[8]);
        names[elem[1]] = names[elem[1]] == undefined ? 1 : ++names[elem[1]];
        male = (elem[4] == 'Male') ? ++male : male;
        female = (elem[4] == 'Male') ? ++female : female;
        country[elem[6]] = (country[elem[6]] == undefined) ? 1 : ++country[elem[6]];
      });

      output(male, female, fullHeight, fullWeight, people, names, country);
});

function pop(names, country){
  var maxName = 0, maxCountry = 0;
  var popName, popCountry;

  for(key in names){
    if (names[key] > maxName){
      maxName = names[key];
      popName = key;
    }
  }

  for(key in country){
    if (country[key] > maxCountry){
      maxCountry = country[key];
      popCountry = key;
    }
  }
  return {
    'name': popName,
    'country': popCountry
  }
}

function logFullInfo(elem){
  console.log(
    ' ID: ' + elem[0] + '\n',
    'Name: ' + elem[1] + '\n',
    'Surname: ' + elem[2] + '\n',
    'email: '+ elem[3] + '\n',
    'Gender: ' + elem[4] + '\n',
    'Company: ' + elem[5] + '\n',
    'Country: ' + elem[6] + '\n',
    'Height: ' + elem[7] + '\n',
    'Weight: ' + elem[8] + '\n'
  )
}
function output(male, female, fullHeight, fullWeight, people, names, country){
  popResult = pop(names, country);
  console.log('Most popular name: ' + popResult.name);
  console.log('Male: ' + male, ' Female: ' + female);
  console.log('Average weight: ' + (fullWeight / people.length));
  console.log('Average height: ' + (fullHeight / people.length));
  console.log('Most popular country: ' + popResult.country + '\n');
  for(let i = 0; i < people.length; i++){
    if(people[i][1] == popResult.name){
      logFullInfo(people[i]);
      break;
    }
  }
  for(let i = 0; i < people.length; i++){
    if(people[i][6] == popResult.country){
      logFullInfo(people[i]);
      break;
    }
  }
}
