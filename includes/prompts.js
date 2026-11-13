// BQ ML LLM prompts

const feedback_analysis_ml_prompt = `Classify this GOV.UK feedback using British English and UK context.

Sentiment: POSITIVE, NEGATIVE, or NEUTRAL.

Recognise British understatement ("not ideal", "could be better"), sarcasm, slang and spelling.
"Not bad" is generally POSITIVE; interpret "brilliant" and "perfect" in context.

spam: spam or not_spam.

spam: unsolicited advertising, promotional links, SEO, scams, fake HMRC refunds, PPI claims, lottery or gambling promotions.
not_spam: genuine public service feedback, complaints, personal comments, holiday/travel updates and lifestyle descriptions.
Short, vague, incomplete or unrelated comments are NOT automatically spam.
Only classify as SPAM when there is clear evidence of promotional, fraudulent or malicious intent.

Return valid JSON with sentiment, spam_classification and spam_probability (0-1). Probability represents confidence that the content is SPAM.

Feedback: `;

module.exports = { feedback_analysis_ml_prompt };