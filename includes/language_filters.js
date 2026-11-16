function englishLanguageFilter(columnName) {
  const shortExactMatches =
    "r'^(n/a|na|nothing|none|no|yes|ok|okay|fine|good|great|excellent|perfect|thanks|thank you|not applicable|all good|still working best|works fine|working fine)$'";

  // Normalize text: remove apostrophes (don't -> dont), turn all punctuation/brackets/underscores into single spaces
  const cleanedText =
    "TRIM(REGEXP_REPLACE(REGEXP_REPLACE(LOWER(" + columnName + "), r\"['’]\", ''), r'[^a-z0-9]+', ' '))";

  // Valid short-phrase word: contains a vowel, is a number, or is a vowelless English title/acronym/abbreviation
  const wordToken =
    "(?:[a-z0-9]*[aeiouy][a-z0-9]*|[0-9]+|mr|mrs|ms|dr|st|rd|ltd|plc|gp|mp|pc|hr|pr|pm|am|etc|vs|ref|tel|ext|dept|govt|pls|plz|thx|btw|tbh|fyi|dob|hm|po|cv|uk|tv|id|ni|nhs|mot|vat|pip|uc|dwp|brp|dbs)";

  // Match 1 to 6 valid tokens after punctuation/brackets/underscores are stripped
  const shortPhrasePattern =
    "r'^" +
    wordToken +
    "(?: " + wordToken + ")?" +
    "(?: " + wordToken + ")?" +
    "(?: " + wordToken + ")?" +
    "(?: " + wordToken + ")?" +
    "(?: " + wordToken + ")?$'";

  const englishWordsPattern =
    "r'\\b(a|an|the|and|or|but|if|of|to|in|on|at|by|for|with|from|as|into|about|is|am|are|was|were|be|been|being|have|has|had|do|does|did|will|would|can|could|should|may|might|must|i|me|my|we|our|you|your|he|him|his|she|her|it|its|they|them|their|this|that|these|those|what|which|who|when|where|why|how|not|no|never|very|so|too|all|any|some|many|more|most|other|out|up|down|only|just|now|then|there|here|hi|hello|mr|mrs|ms|miss|dr|person|name|email|phone|address|postcode|number|good|perfect|thanks|thank|great|nice|service|excellent|well|love|amazing|happy|recommend|quality|friendly|helpful|bad|worst|broken|damaged|poor|issue|wrong|terrible|disappointed|slow|error|product|item|delivery|refund|return|app|website|page|work|working|money|waste|problem|customer|support|charge|buy|bought|order|manage|online|account|login|sign|password|payment|deposit|transfer|balance|pension|state|tax|claim|update|check|form|detail|details|dvla|hmrc|gov|quick|quickly|easy|easily|fast|simple|hard|difficult|clear|unclear|confusing|useful|useless|rubbish|brilliant|smooth|straightforward|register|registered|apply|applied|renew|renewal|car|cars|vehicle|vehicles|driver|driving|licence|license|passport|visa|foreign|pay|paid|fee|wait|waiting|need|want|try|tried|find|found|get|got|use|used|using|help)\\b'";

  const englishLetterCount =
    "LENGTH(REGEXP_REPLACE(" + columnName + ", r'[^a-zA-Z]', ''))";

  const nonAsciiCount =
    "LENGTH(REGEXP_REPLACE(" + columnName + ", r'[\\x00-\\x7F£€—–‘’“”…]', ''))";

  return (
    "(\n" +
    "  REGEXP_CONTAINS(" + columnName + ", r'[a-zA-Z]')\n" +
    "  AND (" + englishLetterCount + " + 2) >= (" + nonAsciiCount + " * 4)\n" +
    "  AND (\n" +
    "    REGEXP_CONTAINS(LOWER(TRIM(" + columnName + ")), " + shortExactMatches + ")\n" +
    "    OR REGEXP_CONTAINS(" + cleanedText + ", " + shortPhrasePattern + ")\n" +
    "    OR REGEXP_CONTAINS(" + cleanedText + ", " + englishWordsPattern + ")\n" +
    "  )\n" +
    ")"
  );
}

module.exports = { englishLanguageFilter };