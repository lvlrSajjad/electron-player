self.addEventListener(
  'message',
  function(e) {
    console.log(e);
    if (e.data.func === 'fetchData') {
      fetchData(e.data.files);
    } else if (e.data.func === 'firstLoop') {
      firstLoop(e.data.files);
    }
  },
  false
);


let db = null;
const Datastore = require('nedb');
if (db === null) {
  db = new Datastore({ filename: 'movies.db' });
}

function fetchData(files) {

  db.loadDatabase((err) => {    // Callback is optional
    // Now commands will be executed
    // this.setState({
    //   isDataLoading: true
    // });
    let pLooped = 0;
    let moviesArray = [...files];
    for (let i = 0, len = moviesArray.length; i < len; i++) {
      let movie = moviesArray[i];
      db.findOne(
        {
          $where: function() {
            if (movie.year !== undefined && !isNaN(parseInt(movie.year))) {
              return this.title.replace(':', '').replace(/'/, '').replace(/ - /, ' ').replace(/-/, ' ').toLowerCase().includes(movie.name[0].replace(/'/, '').trim().toLowerCase()) && this.year === movie.year.trim();
            } else {
              return this.title.replace(':', '').replace(/'/, '').replace(/ - /, ' ').replace(/-/, ' ').toLowerCase().includes(movie.name[0].replace(/'/, '').trim().toLowerCase());
            }
          }
        }, async (err, result) => {
          if (result !== null && result !== undefined) {
            moviesArray[i] = { ...movie, ...result };
          }
          pLooped++;
          checkPromise(pLooped, len, this, moviesArray);
        });
    }
  });
}

function checkPromise(looped, size, ctx, array) {
  self.postMessage({
    msg: 'onPercent', data: {
      fetchedPercent: (looped / size) * 100,
      mappedFilesOrg: array,
      mappedFiles: array,
    }
  });
  // ctx.setState({
  //   fetchedPercent: (looped / size) * 100
  // });
  if (looped === size) {
    self.postMessage({
      msg: 'fetchingFinished', data: {
        isDataLoading: false
      }
    });
  }
}

function firstLoop(items) {
  for (let i = 0, len = items.length; i < len; i++) {
    const x = items[i];
    const ext = x.substr(x.length - 3);
    const nameObj = fileNameCorrector(x, ext);
    items[i] = {
      name: nameObj,
      path: x,
      ext: ext,
      year: nameObj[1],
      resolution: x.match(/\d{3,4}p/) !== null && x.match(/\d{3,4}p/) !== undefined ? x.match(/\d{3,4}p/)[0] : '',
      cast: [], genres: [], rating: '', director: ''
    };
  }
  self.postMessage({
    msg: 'scanningFinished', data: {
      mappedFilesOrg: items,
      mappedFiles: items,
      isLoading: false
    }
  });
  fetchData(items);
}

function fileNameCorrector(string, ext) {
  const stringObj = string.split('\\');

  const fileName = stringObj[stringObj.length - 1];

  return fileName
    .replace(`.${ext}`, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\(/gi, '')
    .replace(/\)/gi, '')
    .replace(/\[/gi, '')
    .replace(/]/gi, '')
    .replace(/\./g, ' ')
    .replace(/_/gi, ' ')
    .replace(/-/gi, ' ')
    .split(/(?=([0-9]{4})+)/)
    .slice(0, 2);
}///
