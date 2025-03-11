const ENDPOINT = 'http://localhost:9000/';

async function fetchGreeting() {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: 'query { greeting }',
        })
    });

    const body = await response.json();
    console.log('Body: ', body);
    return body.data.greeting;
}

fetchGreeting().then(greeting => {
    document.getElementById('responseField').textContent = greeting;
});
