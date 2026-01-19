require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // For Node.js (server-side) SDK, model listing might not be directly exposed easily in the main class 
        // depending on version, but let's try a simple generation with a known model 
        // or use the model-listing if available (it is in newer versions usually via a different manager, 
        // but the simplest verification is trying standard models).

        console.log("Testing API Key:", process.env.GEMINI_API_KEY);

        const modelName = "gemini-1.5-flash";
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);

        try {
            const modelNamePro = "gemini-pro";
            console.log(`\nRetrying with model: ${modelNamePro}`);
            const modelPro = genAI.getGenerativeModel({ model: modelNamePro });
            const resultPro = await modelPro.generateContent("Hello?");
            const responsePro = await resultPro.response;
            console.log("Success with gemini-pro! Response:", responsePro.text());
        } catch (err2) {
            console.error("Error with gemini-pro:", err2.message);
        }
    }
}

testGemini();
