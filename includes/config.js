
// ============================================================
// UK PII DE-IDENTIFICATION LIBRARY
// ============================================================

const pii_regex = [

  // ----------------------------------------------------------
  // 1. EMAIL ADDRESSES
  // ----------------------------------------------------------
  {
    name: 'EMAIL',
    pattern: '(^|[^A-Z0-9._%+-])([A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,})([^A-Z0-9.-]|$)',
    flags: 'i',
    replacement: '$1[EMAIL]$3'
  },


  // ----------------------------------------------------------
  // 2. NHS NUMBERS
  // Context required to reduce false positives.
  // ----------------------------------------------------------
  {
    name: 'NHS',
    pattern: '(^|[^A-Z0-9])(NHS[ -]?(?:NUMBER|NO\\.?|ID)?[ :#=-]*)(\\d{3}[ -]?\\d{3}[ -]?\\d{4})([^0-9]|$)',
    flags: 'i',
    replacement: '$1$2[NHS]$4'
  },

  // ----------------------------------------------------------
  // 3. UK NATIONAL INSURANCE NUMBERS
  // ----------------------------------------------------------
  {
    name: 'NI',
    pattern: '(^|[^A-Z0-9])([A-CEGHJ-PR-TW-Z]{2}\\d{6}[A-D])([^A-Z0-9]|$)',
    flags: 'i',
    replacement: '$1[NI]$3'
  },

  // ----------------------------------------------------------
  // 4. UK DRIVING LICENCE NUMBERS
  // Context required.
  // ----------------------------------------------------------
  {
    name: 'DRIVING_LICENCE',
    pattern: '(^|[^A-Z0-9])(DRIVING LICENCE|DRIVER LICENCE|LICENCE NUMBER|LICENCE NO\\.?)[ :#=-]*([A-Z9]{5}\\d{6}[A-Z9]{2}\\d{3})([^A-Z0-9]|$)',
    flags: 'i',
    replacement: '$1$2[DL]$4'
  },

  // ----------------------------------------------------------
  // 5. UK PASSPORT NUMBERS
  // Context required.
  // ----------------------------------------------------------
  {
    name: 'PASSPORT',
    pattern: '(^|[^A-Z0-9])(PASSPORT(?: NUMBER| NO\\.?)?)[ :#=-]*([0-9]{9})([^0-9]|$)',
    flags: 'i',
    replacement: '$1$2[PASSPORT]$4'
  },

  // ----------------------------------------------------------
  // 6. UK VISA / IMMIGRATION REFERENCES
  // ----------------------------------------------------------
  {
    name: 'VISA',
    pattern: '\\b(?:GWF|UAN)\\d{5,12}\\b',
    flags: 'i',
    replacement: '[VISA]'
  },

  // ----------------------------------------------------------
  // 7. UNIQUE REFERENCE NUMBERS
  // Context required.
  // ----------------------------------------------------------
  {
    name: 'URN',
    pattern: '(^|[^A-Z0-9])(URN|UNIQUE REFERENCE NUMBER|UNIQUE REFERENCE NO\\.?)[ :#=-]*([A-Z0-9/-]{5,20})([^A-Z0-9]|$)',
    flags: 'i',
    replacement: '$1$2[URN]$4'
  },

  // ----------------------------------------------------------
  // 8. CREDIT / DEBIT CARD CANDIDATES
  // 13-19 digits, optional spaces or hyphens.
  // ----------------------------------------------------------
  {
    name: 'CREDIT_CARD',
    pattern: '(^|[^0-9])((?:\\d[ -]?){12,18}\\d)([^0-9]|$)',
    replacement: '$1[CC]$3'
  },

  // ----------------------------------------------------------
  // 9. UK BANK ACCOUNT NUMBERS
  // Context required.
  // ----------------------------------------------------------
  {
    name: 'BANK_ACCOUNT',
    pattern: '(^|[^A-Z0-9])(BANK ACCOUNT NUMBER|ACCOUNT NUMBER|ACCOUNT NO\\.?|ACCOUNT NUM)[ :#=-]*(\\d{8})([^0-9]|$)',
    flags: 'i',
    replacement: '$1$2[BANK_ACCOUNT]$4'
  },

  // ----------------------------------------------------------
  // 10. UK SORT CODES
  // Context required.
  // ----------------------------------------------------------
  {
    name: 'SORT_CODE',
    pattern: '(^|[^A-Z0-9])(SORT CODE|SORTCODE)[ :#=-]*(\\d{2}[- ]\\d{2}[- ]\\d{2}|\\d{6})([^0-9]|$)',
    flags: 'i',
    replacement: '$1$2[SORT_CODE]$4'
  },

  // ----------------------------------------------------------
  // 11. UK MOBILE NUMBERS
  // Supports 07, +447 and 00447 formats.
  // ----------------------------------------------------------
  {
    name: 'MOBILE',
    pattern: '(^|[^A-Z0-9])((?:\\+44|0044)[ -]?(?:\\(0\\)[ -]?)?7(?:[ -]?\\d){9}|07(?:[ -]?\\d){9})([^0-9]|$)',
    replacement: '$1[MOB]$3'
  },

  // ----------------------------------------------------------
  // 12. UK LANDLINE NUMBERS
  // Supports 01, 02 and 03 number ranges.
  // ----------------------------------------------------------
  {
    name: 'TELEPHONE',
    pattern: '(^|[^A-Z0-9])((?:(?:\\+44|0044)[ -]?(?:\\(0\\)[ -]?)?|0)(?:1\\d{8,9}|2\\d{9}|3\\d{9}))([^0-9]|$)',
    replacement: '$1[TEL]$3'
  },

  // ----------------------------------------------------------
  // 13. UK VEHICLE REGISTRATION NUMBERS
  // Current and selected older registration formats.
  // ----------------------------------------------------------
  {
    name: 'VEHICLE_REGISTRATION',
    pattern: '\\b(?:[A-HJ-PR-Y]{2}\\d{2}[ ]?[A-HJ-PR-Z]{3}|[A-HJ-PR-Y]{1,3}[ ]?\\d{1,4}[ ]?[A-HJ-PR-Y]{1,3})\\b',
    flags: 'i',
    replacement: '[VRN]'
  },

  // ----------------------------------------------------------
  // 14. UK POSTCODES
  // ----------------------------------------------------------
  {
    name: 'POSTCODE',
    pattern: '(^|[^A-Z0-9])((?:GIR\\s?0AA|(?:[A-PR-UWYZ][0-9][0-9A-HJKSTUW]?|[A-PR-UWYZ][A-HK-Y][0-9][0-9ABEHMNPRVWXY]?)\\s?[0-9][ABD-HJLNP-UW-Z]{2}))([^A-Z0-9]|$)',
    flags: 'i',
    replacement: '$1[POSTCODE]$3'
  },

  // ----------------------------------------------------------
  // 15. DOB - DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
  // ----------------------------------------------------------
  {
    name: 'DOB_NUMERIC',
    pattern: '\\b(?:0?[1-9]|[12]\\d|3[01])[-/.](?:0?[1-9]|1[0-2])[-/.](?:19\\d{2}|20\\d{2})\\b',
    replacement: '[DOB]'
  },

  // ----------------------------------------------------------
  // 16. DOB - YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD
  // ----------------------------------------------------------
  {
    name: 'DOB_ISO',
    pattern: '\\b(?:19\\d{2}|20\\d{2})[-/.](?:0?[1-9]|1[0-2])[-/.](?:0?[1-9]|[12]\\d|3[01])\\b',
    replacement: '[DOB]'
  },

  // ----------------------------------------------------------
  // 17. DOB - WRITTEN DATES
  // ----------------------------------------------------------
  {
    name: 'DOB_WRITTEN',
    pattern: '\\b(?:0?[1-9]|[12]\\d|3[01])(?:st|nd|rd|th)?[ -](?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)[ ,/-]+(?:19\\d{2}|20\\d{2})\\b',
    flags: 'i',
    replacement: '[DOB]'
  },

  // ----------------------------------------------------------
  // 18. IPV4 ADDRESSES
  // ----------------------------------------------------------
  {
    name: 'IP_ADDRESS',
    pattern: '\\b(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}\\b',
    replacement: '[IP]'
  }

];


const info_types = [
  "DATE_OF_BIRTH",
  "EMAIL_ADDRESS",
  "PASSPORT",
  "PERSON_NAME",
  "PHONE_NUMBER",
  "STREET_ADDRESS",
  "UK_NATIONAL_INSURANCE_NUMBER",
  "UK_PASSPORT",
  "CREDIT_CARD_NUMBER",
  "IBAN_CODE",
  "IP_ADDRESS",
  "MEDICAL_TERM",
  "VEHICLE_IDENTIFICATION_NUMBER",
  "SCOTLAND_COMMUNITY_HEALTH_INDEX_NUMBER",
  "UK_DRIVERS_LICENSE_NUMBER",
  "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
  "UK_TAXPAYER_REFERENCE",
  "SWIFT_CODE"
];

const sentiment_models = [
  { model: "cardiffnlp/twitter-roberta-base-sentiment", label_type: 2 },
  { model: "siebert/sentiment-roberta-large-english", label_type: 1 },
  { model: "distilbert-base-uncased-finetuned-sst-2-english", label_type: 1 }
];

// Helper to generate a standardized inspect_config JSON string dynamically
function getInspectConfig() {
  const config = {
    info_types: info_types.map(it => ({ name: it })),
    min_likelihood: "LIKELY"
  };
  return JSON.stringify(config);
}

// Helper to generate a standardized deidentify_config JSON string dynamically
function getDeidentifyConfig() {
  const transformations = info_types.map(it => ({
    info_types: [{ name: it }],
    primitive_transformation: {
      replace_config: {
        new_value: { string_value: `[${it}]` }
      }
    }
  }));

  const config = {
    info_type_transformations: {
      transformations: transformations
    }
  };
  return JSON.stringify(config);
}

module.exports = {
  pii_regex,
  info_types,
  sentiment_models,
  getInspectConfig,
  getDeidentifyConfig
};