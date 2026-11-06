//Configuration Constants
const pii_regex = [
  { pattern: '(?i)\\b(?:[a-z]\\W?){2}(?:\\d\\W?){6}\\W?[a-z]\\b', replacement: '[NI###]' },
  { pattern: '(?i)nhs\\s?(?:.{0,20})?(?:\\d\\D?){9}(?:\\d)', replacement: '[NHS##]' },
  { pattern: '(([0-9]{4}[\\D]?){3})[0-9]{4}', replacement: '[CC###]' },
  { pattern: '\\w{5}\\d{6}\\w{2}\\d\\w{2}', replacement: '[DL###]' },
  { pattern: '(?i)gwf[0-9]{9}', replacement: '[VISA#]' }
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