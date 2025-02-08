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
    document.getElementById("output").textContent = "Processing...";
    setTimeout(() => {
        const input = document.getElementById("deckInput").value;
        const output = convertToExportFormat(input);
        document.getElementById("output").textContent = JSON.stringify(output, null, 2);
    }, 100);
}

