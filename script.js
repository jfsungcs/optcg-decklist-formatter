function parseDeckList(text) {
    if (!text) return [];
    
    return text.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => {
            let match;
            
            // Format 1: [multiplier]x[code]
            match = line.match(/(\d+)x([A-Z0-9-]+)/);
            if (match) {
                return { quantity: parseInt(match[1], 10), code: match[2] };
            }

            // Format 2: [multiplier]x[code] [card name]
            match = line.match(/(\d+)x([A-Z0-9-]+)\s(.+)/);
            if (match) {
                return { quantity: parseInt(match[1], 10), code: match[2], name: match[3] };
            }

            // Format 3: [multiplier] [code] [card name]
            match = line.match(/(\d+)\s([A-Z0-9-]+)\s(.+)/);
            if (match) {
                return { quantity: parseInt(match[1], 10), code: match[2], name: match[3] };
            }

            // Format 4: [multiplier] [code]
            match = line.match(/(\d+)\s([A-Z0-9-]+)/);
            if (match) {
                return { quantity: parseInt(match[1], 10), code: match[2] };
            }
            
            return null;
        })
        .filter(card => card !== null);
}

function convertToExportFormat(deckList) {
    const parsedDeck = parseDeckList(deckList);
    return parsedDeck.reduce((output, card) => {
        output.push(...Array(card.quantity).fill(card.code));
        return output;
    }, ["Export"]);
}

function convertDeck() {
    const deckInput = document.getElementById("deckInput").value;
    const outputElement = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");

    const exportFormat = convertToExportFormat(deckInput);

    if (exportFormat.length > 1) {
        outputElement.innerText = JSON.stringify(exportFormat, null, 2); // Keeps array formatting
        copyButton.style.display = "inline-block"; // Show button
    } else {
        outputElement.innerText = "Invalid deck list!";
        copyButton.style.display = "none"; // Hide button
    }
}


function copyToClipboard() {
    const outputElement = document.getElementById("output");
    const textToCopy = outputElement.innerText; // Get the formatted text
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Exported deck copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}
