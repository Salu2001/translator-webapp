document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const sourceLang = document.getElementById('sourceLang');
    const targetLang = document.getElementById('targetLang');
    const translateBtn = document.getElementById('translateBtn');
    const swapBtn = document.getElementById('swapBtn');
    const loading = document.getElementById('loading');
    
    translateBtn.addEventListener('click', translateText);
    swapBtn.addEventListener('click', swapLanguages);
    
    async function translateText() {
        const text = inputText.value.trim();
        if (!text) {
            alert('Please enter some text to translate');
            return;
        }
        
        const source = sourceLang.value;
        const target = targetLang.value;
        
        if (source === target) {
            alert('Source and target languages cannot be the same');
            return;
        }
        
        loading.style.display = 'block';
        outputText.value = '';
        
        try {
            const apiUrl = `https://global-translator-api.bjcoderx.workers.dev/?text=${encodeURIComponent(text)}&targetLang=${target}`;
            
            if (source !== 'auto') {
                apiUrl += `&sourceLang=${source}`;
            }
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.translatedText) {
                outputText.value = data.translatedText;
            } else {
                throw new Error('No translation found in response');
            }
        } catch (error) {
            console.error('Translation error:', error);
            outputText.value = 'Error: Could not translate text. Please try again.';
        } finally {
            loading.style.display = 'none';
        }
    }
    
    function swapLanguages() {
        const currentSource = sourceLang.value;
        const currentTarget = targetLang.value;
        
        // Don't swap if source is "auto"
        if (currentSource !== 'auto') {
            sourceLang.value = currentTarget;
        }
        
        // Find the option in target that matches current source (if not auto)
        if (currentSource !== 'auto') {
            targetLang.value = currentSource;
        }
        
        // Also swap the text if there's any
        if (inputText.value && outputText.value) {
            const temp = inputText.value;
            inputText.value = outputText.value;
            outputText.value = temp;
        }
    }
});