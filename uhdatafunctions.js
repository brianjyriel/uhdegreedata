/**
 * Practice WOD for Coding Standards Module
 * Utilizes Underscore and use of coding standards.
 * Created by brianjyriel on 9/30/15.
 */

//PART ONE OF WOD

/**
 * Predicate function that will be implemented on the totalDegrees function
 * @param memo
 * @param record
 * @returns {*}
 */
function addDegrees(memo, record)
{
  return memo + record["AWARDS"];
}

/**
 * This function can be passed uhdata and returns the total number of degrees awarded in the data set.
 * @param data
 * @returns {*}
 */
function totalDegrees(data)
{
  return _.reduce(data, addDegrees, 0);
}

/**
 * Predicate function that will be implemented on the hawaiianLegacy
 * @param record
 * @returns {boolean}
 */
function isHawaiian(record)
{
  return record["HAWAIIAN_LEGACY"] === "HAWAIIAN";
}

/**
 * 2nd Predicate function of totalHawaiianLegacy, uses filter to specifiy hawaiian
 * @param data
 * @returns {Array.<T>|*}
 */
function hawaiianLegacy(data)
{
  return _.filter(data, isHawaiian);
}

/**
 * Uses the reduce function from Underscore to receive the number of Hawaiian Legacy
 * @param data
 * @returns {*}
 */
function totalHawaiianLegacy(data)
{
  return _.reduce(hawaiianLegacy(data), addDegrees, 0);
}

/**
 * This function can be passed uhdata and returns the percentage of degrees that were awarded to students of
 * Hawaiian Legacy in the dataset.
 * @param data
 * @returns {number}
 */
function percentageHawaiian(data)
{
  return (totalHawaiianLegacy(data) / totalDegrees(data) ) * 100;
}

//END OF PART ONE

//PART TWO OF WOD

/**
 *
 * @param year
 * @returns {Function}
 */
function makeYearFilter(year)
{
  return function(record)
  {
    return record["FISCAL_YEAR"] === year;
  }
}

/**
 *
 * @param data
 * @param year
 * @returns {Array.<T>|*}
 */
function dataForYear(data, year)
{
  return _.filter(data, makeYearFilter(year));
}

/**
 * This function can be passed uhdata and a year and returns the total number of degrees awarded in the passed year.
 * @param data
 * @param year
 * @returns {*}
 */
function totalDegreesByYear(data, year)
{
  return _.reduce(dataForYear(data, year), addDegrees, 0);
}

/**
 * This function can be passed uhdata and returns an array containing all the campuses referenced in the
 * passed dataset.
 * @param data
 * @returns {*}
 */
function listCampuses(data)
{
  return _.unique(_.pluck(data, "CAMPUS"));
}

//END OF PART TWO

//PART THREE OF WOD

/**
 *
 * @param data
 * @returns {*}
 */
function groupByCampus(data)
{
  return _.groupBy(data, "CAMPUS");
}

/**
 * This function can be passed uhdata and returns an object where the property keys are campuses and the
 * values are the number of degrees awarded by the campus.
 * @param data
 * @returns {*}
 */
function listCampusDegrees(data)
{
  return _.mapObject(groupByCampus(data),
      function(val, key)
      {
        return _.reduce(val, addDegrees, 0);
      });
}

/**
 *
 * @param data
 * @returns {*}
 */
function groupByYear(data)
{
  return _.groupBy(data, "FISCAL_YEAR");
}

/**
 * This function can be passed uhdata and returns an integer indicating the maximum number of degrees awarded
 * in a year.
 * @param data
 * @returns {number}
 */
function maxDegrees(data)
{
  return _.max(_.mapObject(groupByYear(data),
      function(val, key)
      {
        return _.reduce(val, addDegrees, 0);
      }));
}

/**
 *
 * @param record
 * @returns {boolean}
 */
function isDoctoralDegree(record)
{
  return record["OUTCOME"] === "Doctoral Degrees";
}

/**
 *
 * @param data
 * @returns {Array.<T>|*}
 */
function doctoralList(data)
{
  return _.filter(data, isDoctoralDegree);
}

/**
 * This function can be passed uhdata and returns a list of the degree programs (“CIP_DESC”) for which a
 * doctoral degree is granted.
 * @param data
 * @returns {*}
 */
function doctoralDegreePrograms(data)
{
  return _.unique(_.pluck(doctoralList(data), "CIP_DESC"));
}

//END OF PART THREE