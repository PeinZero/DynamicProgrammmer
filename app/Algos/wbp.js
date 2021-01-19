export default function isWordBreakable(s, dict, answer) {
    var strLen = s.length;
    if (strLen === 0) {
      console.log(answer);
      return true;
    } else {
      var prefix = "";
      for (var i = 0; i < strLen; i++) {
        prefix += s.charAt(i);
        if (dict.indexOf(prefix) > -1) {
          answer += prefix + " ";
          var suffix = s.slice(i + 1);
          if (isWordBreakable(suffix, dict, answer)) {
            return true;
          }
        }
      }
    }
  }
  
  var inputStr = "Wordbreakproblem";
  var inputDict = [
    "this",
    "th",
    "is",
    "famous",
    "Word",
    "break",
    "b",
    "r",
    "e",
    "a",
    "k",
    "br",
    "bre",
    "brea",
    "ak",
    "problem",
  ];
  
  if (!isWordBreakable(inputStr, inputDict, "")) {
    console.log("String can not broken.");
  }
  




module.exports = { notSure }