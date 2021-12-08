const db = require("../../data/db-config");

function find() {
  /*
      SELECT *, 
             count(steps.step_id) 
             AS number_of_steps
      FROM schemes
      LEFT JOIN steps
          ON schemes.scheme_id = steps.scheme_id
      GROUP BY schemes.scheme_id
      ORDER BY schemes.scheme_id ASC;
  */
  return db('schemes as sch')
          .leftJoin('steps as st', {
            'sch.scheme_id':'st.scheme_id'
          })
          .groupBy('sch.scheme_id')
          .orderBy('sch.scheme_id', 'asc')
          .select('*')
          .count('st.step_id')
}


async function findById(scheme_id) {
  // SELECT
  //     sc.scheme_name,
  //     st.*
  // FROM schemes as sc
  // LEFT JOIN steps as st
  //     ON sc.scheme_id = st.scheme_id
  // WHERE sc.scheme_id = 1
  // ORDER BY st.step_number ASC;
  const schemeSteps = await db('schemes as sch')
    .leftJoin('steps as st', {
      'sch.scheme_id':'st.scheme_id'
    })
    .orderBy('st.step_number', 'asc')
    .select('sch.scheme_name', 'st.*')
    .where('sch.scheme_id', scheme_id);
  
  const { scheme_name } = schemeSteps[0];
  const steps = schemeSteps.map(s => {
    return ({
      step_id: s.step_id,
      step_number: s.step_number,
      instructions: s.instructions
    })
  })
  return {
    scheme_id,
    scheme_name,
    steps
  }                  
}

async function findSteps(scheme_id) { 
  // SELECT *
  // FROM steps as st
  // LEFT JOIN schemes as sch
  //   ON sch.scheme_id = st.scheme_id
  // WHERE sch.scheme_id = 1
  // ORDER BY st.step_number ASC;
  const schemeSteps = await db('steps as st')
    .leftJoin('schemes as sch', {
      'sch.scheme_id':'st.scheme_id'
    })
    .orderBy('st.step_number', 'asc')
    .select('*')
    .where('sch.scheme_id', scheme_id);
  console.log(schemeSteps)
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
