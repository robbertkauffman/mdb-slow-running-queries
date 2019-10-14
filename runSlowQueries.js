exports = function(){
  const STITCH_CLUSTER_SERVICE_ID = 'mongodb-atlas';
  const mongodb = context.services.get(STITCH_CLUSTER_SERVICE_ID);
  
  return runSlowQueries(mongodb);
};

async function runSlowQueries(mongodb) {
  pickRandomQuery = Math.floor(Math.random() * 4);
  let result = '';
  switch (pickRandomQuery) {
    case 0:
      result = await airbnbQuery(mongodb);
      return { message: `performed airbnb query: ${result.message}`, type: result.type };
    case 1:
      result = await gradesQuery(mongodb);
      return { message: `performed grades query: ${result.message}`, type: result.type };
    case 2:
      result = await mflixQuery(mongodb);
      return { message: `performed mflix query: ${result.message}`, type: result.type };
    case 3:
      result = await weatherDataQuery(mongodb);
      return { message: `performed weather data query: ${result.message}`, type: result.type };
  }
}
    
function airbnbQuery(mongodb) {
  const db = mongodb.db('sample_airbnb');
  
  const queryTermList = ['home', 'new', 'charming', 'cosy'];
  const queryTerm = queryTermList[Math.floor(Math.random() * queryTermList.length)];
  const query = { description: { $regex: `.*${queryTerm}.*`, $options: 'i' }, };
  const sort = {};
  sort[queryTerm] = 1;

  return db.collection('listingsAndReviews')
    .find(query)
    .sort(sort)
    .toArray()
    .then(docs => { return { message: `found ${docs.length} docs`, type: 'activity' }})
    .catch(err => { return { message: err.message, type: 'error' }});
}

function gradesQuery(mongodb) {
  const db = mongodb.db('sample_training');
  
  const queryTermList = ['exam', 'quiz', 'homework'];
  const queryTerm = queryTermList[Math.floor(Math.random() * queryTermList.length)];
  const query = { 'scores.type': queryTerm };
  const sort = { student_id: 1, class_id: 1 };

  return db.collection('grades')
    .find(query)
    .sort(sort)
    .toArray()
    .then(docs => { return { message: `found ${docs.length} docs`, type: 'activity' }})
    .catch(err => { return { message: err.message, type: 'error' }});
}

function mflixQuery(mongodb) {
  const db = mongodb.db('sample_mflix');
  
  const queryFieldList = ['plot', 'title', 'fullplot'];
  const queryTermList = ['hero', 'drama', 'disaster', 'horror'];
  const queryField = queryFieldList[Math.floor(Math.random() * queryFieldList.length)];
  const queryTerm = queryTermList[Math.floor(Math.random() * queryTermList.length)];
  const query = {};
  query[queryField] = { $regex: `.*${queryTerm}.*`, $options: 'i' };
  const sort = {};
  sort[queryTerm] = 1;

  return db.collection('movies')
    .find(query)
    .sort(sort)
    .toArray()
    .then(docs => { return { message: `found ${docs.length} docs`, type: 'activity' }})
    .catch(err => { return { message: err.message, type: 'error' }});
}

function weatherDataQuery(mongodb) {
  const db = mongodb.db('sample_weatherdata');
  
  const queryList = [{ type: 'FM-13' }, { callLetters: { $ne: 'SHIP' }}];
  const sortByList = [{ callLetters: 1 }, { callLetters: 1, qualityControlProcess: 1 }, { callLetters: 1, qualityControlProcess: 1, elevation: -1 }];
  const matchQuery = queryList[Math.floor(Math.random() * queryList.length)];
  const sortBy = sortByList[Math.floor(Math.random() * sortByList.length)];
  
  const pipeline = [
    { $match: matchQuery },
    { $sort: sortBy }
  ];

  return db.collection('data')
    .aggregate(pipeline, { allowDiskUse: true })
    .toArray()
    .then(docs => { return { message: `found ${docs.length} docs`, type: 'activity' }})
    .catch(err => { return { message: err.message, type: 'error' }});
}
