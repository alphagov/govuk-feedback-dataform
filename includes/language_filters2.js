// Filter Non-English feedback records

function englishLanguageFilter(columnName) {
  return `
    REGEXP_CONTAINS(${columnName}, r'[a-zA-Z]')

    AND NOT REGEXP_CONTAINS(
      ${columnName},
      r'[^\\p{Latin}\\p{Common}\\p{Inherited}]'
    )

    AND REGEXP_CONTAINS(
      LOWER(${columnName}),
      r'\\b(hi|hello|the|and|of|to|is|it|you|that|was|for|on|are|as|with|this|they|at|be|have|from|or|by|one|had|but|not|what|your|can|there|an|each|which|if|will|about|out|many|then|them|these|so|some|her|would|make|like|good|perfect|thanks|great|nice|service|excellent|very|well|love|amazing|happy|recommend|quality|friendly|helpful|bad|worst|broken|damaged|poor|issue|wrong|terrible|disappointed|slow|no|never|error|product|item|delivery|refund|return|app|website|page|work|money|waste|problem|customer|support|charge|buy|bought|order|dvla|hmrc|nothing|n/a)\\b'
    )

    OR REGEXP_CONTAINS(
        LOWER(TRIM(${columnName})),
        r'^(n/a|na|nothing|none|no|yes|ok|okay|fine|good|great|excellent|perfect|thanks|thank you|not applicable|all good|still working best|works fine|working fine)$'
      )
  `;
}

module.exports = { englishLanguageFilter };
