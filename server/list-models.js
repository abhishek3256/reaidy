require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hack to access the model listing which isn't always exposed in the high-level helper
// We will try to just run a raw fetch if the SDK doesn't make it easy, 
// but actually the SDK simply requires you to know the model name usually.
// However, the error suggests "Call ListModels to see...".
// Let's try to hit the REST API directly to see what models are available for this key.

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found via dotenv!");
        return;
    }
    console.log(`Using API Key: ${apiKey.substring(0, 10)}...`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Returned Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("Available Models for this Key:");
            if (data.models) {
                data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
            } else {
                console.log("No models found. This usually means the API is not enabled or the key scope is wrong.");
            }
        }
    } catch (err) {
        console.error("Network Error:", err);
    }
}

listModels();
