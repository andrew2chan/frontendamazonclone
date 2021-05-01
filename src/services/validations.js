//return TRUE = pass
//return FALSE = fail
export function ValidateInputs(value, stringRegex) {
  let newReg = new RegExp(stringRegex);
  let returnMatchResults = false;

  if(value.match(newReg)) {
    returnMatchResults = true;
  }

  return returnMatchResults;
}
