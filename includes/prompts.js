// BQ ML LLM prompts & model configs

const SENTIMENT_VALUES = ["POSITIVE", "NEGATIVE", "NEUTRAL"];

const SPAM_VALUES = ["spam", "not spam"];


const feedback_analysis_ml_prompt = `Classify this GOV.UK feedback using British English and UK context.

sentiment: ${SENTIMENT_VALUES.join(", ")}.

Recognise British understatement ("not ideal", "could be better"), sarcasm, slang and spelling.
"Not bad" is generally POSITIVE; interpret "brilliant" and "perfect" in context.

spam_classification: "${SPAM_VALUES[0]}" or "${SPAM_VALUES[1]}".

- "${SPAM_VALUES[0]}": unsolicited advertising, promotional links, SEO, scams, fake HMRC refunds, PPI claims, lottery or gambling promotions.
- "${SPAM_VALUES[1]}": genuine public service feedback, complaints, personal comments, holiday/travel updates and lifestyle descriptions.
Short, vague, incomplete or unrelated comments are NOT automatically spam.
Only classify as "${SPAM_VALUES[0]}" when there is clear evidence of promotional, fraudulent or malicious intent.

Return valid JSON with sentiment, spam_classification and spam_probability (0-1). Probability represents confidence that the content is SPAM.

Feedback: `;


const feedback_analysis_model_params = JSON.stringify({
  generation_config: {
    max_output_tokens: 128,
    thinking_config: {
      thinking_level: "MINIMAL",
    },
    response_mime_type: "application/json",
    response_schema: {
      type: "OBJECT",
      properties: {
        sentiment: {
          type: "STRING",
          enum: SENTIMENT_VALUES,
        },
        spam_classification: {
          type: "STRING",
          enum: SPAM_VALUES,
        },
        spam_probability: {
          type: "NUMBER",
          minimum: 0,
          maximum: 1,
          description: "Confidence between 0 and 1 that the feedback is spam.",
        },
      },
      required: ["sentiment", "spam_classification", "spam_probability"],
    },
  },
});

module.exports = {
  feedback_analysis_ml_prompt,
  feedback_analysis_model_params,
};
