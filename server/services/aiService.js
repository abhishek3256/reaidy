const OpenAI = require('openai');
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeTransactionRisk(transactionData) {
    // 1. Google Gemini (Free Tier Available)
    if (process.env.GEMINI_API_KEY) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
        You are a fraud detection AI. Analyze the following transaction for fraud risk.
        Transaction: ${JSON.stringify(transactionData)}
        
        Return ONLY a JSON object (no markdown formatting) with:
        - riskScore (number 0-100)
        - riskFactors (array of strings)
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean up markdown if Gemini returns it (e.g. ```json ... ```)
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("Gemini Analysis Error:", error);
            // Fallback to mock if error
        }
    }

    // 2. OpenAI (Paid)
    if (process.env.OPENAI_API_KEY) {
        try {
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const prompt = `
        Analyze the following transaction for fraud risk:
        ${JSON.stringify(transactionData)}
        
        Return a JSON object with:
        - riskScore (0-100)
        - riskFactors (array of strings)
      `;

            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a fraud detection AI." }, { role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
                response_format: { type: "json_object" },
            });

            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error("OpenAI Analysis Error:", error);
        }
    }

    // 3. Mock Fallback (Default)
    console.warn("No API Key found (Gemini or OpenAI). Using mock data.");
    return {
        riskScore: Math.floor(Math.random() * 100),
        riskFactors: ['Mock Risk Factor (No API Key Provided)']
    };
}

module.exports = { analyzeTransactionRisk };
