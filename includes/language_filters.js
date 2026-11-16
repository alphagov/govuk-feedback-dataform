function englishLanguageFilter(columnName) {
  const shortExactMatches =
    "r'^(n/a|na|nothing|none|no|yes|ok|okay|fine|good|great|excellent|perfect|thanks|thank you|not applicable|all good|still working best|works fine|working fine)$'";

  const shortPhrasePattern =
    "r'^(?:[a-z0-9]*[aeiouy][a-z0-9]*)" +
    "(?:[\\s\\-/]+(?:[a-z0-9]*[aeiouy][a-z0-9]*))?" +
    "(?:[\\s\\-/]+(?:[a-z0-9]*[aeiouy][a-z0-9]*))?" +
    "(?:[\\s\\-/]+(?:[a-z0-9]*[aeiouy][a-z0-9]*))?[.!?]*$'";

  const englishWordsPattern =
    "r'\\b(a|an|the|and|or|but|if|of|to|in|on|at|by|for|with|from|as|into|about|is|am|are|was|were|be|been|being|have|has|had|do|does|did|will|would|can|could|should|may|might|must|i|me|my|we|our|you|your|he|him|his|she|her|it|its|they|them|their|this|that|these|those|what|which|who|when|where|why|how|not|no|never|very|so|too|all|any|some|many|more|most|other|out|up|down|only|just|now|then|there|here|hi|hello|good|perfect|thanks|thank|great|nice|service|excellent|well|love|amazing|happy|recommend|quality|friendly|helpful|bad|worst|broken|damaged|poor|issue|wrong|terrible|disappointed|slow|error|product|item|delivery|refund|return|app|website|page|work|working|money|waste|problem|customer|support|charge|buy|bought|order|manage|online|account|login|sign|password|payment|deposit|transfer|balance|pension|state|tax|claim|update|check|form|detail|details|dvla|hmrc|gov)\\b'";

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
    "    OR REGEXP_CONTAINS(LOWER(TRIM(" + columnName + ")), " + shortPhrasePattern + ")\n" +
    "    OR REGEXP_CONTAINS(LOWER(" + columnName + "), " + englishWordsPattern + ")\n" +
    "  )\n" +
    ")"
  );
}

module.exports = { englishLanguageFilter };