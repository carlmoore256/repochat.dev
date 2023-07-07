export function getRequest(url : string, options : any) : Promise<any> {
    return fetch(url, options)
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

export function postRequest(url : string, data : any, options : any) : Promise<any> {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        },
        ...options
    })
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

export function postRequestSSE(url : string, data : any, callback : (data : any) => void) {
    // Make the initial POST request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream', // Ensure we're accepting an SSE stream in the response
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.headers.get("Content-Type")?.includes("text/event-stream")){
          // The response is an SSE stream
          const reader = response.body?.getReader();
          if (!reader) return;

          const decoder = new TextDecoder();
          return reader.read().then(function processText({ done, value }) : any {
              if (done) return;
              var decoded = decoder.decode(value);
              callback(decoded);
              return reader.read().then(processText);
          });
      } else {
        // The response is a regular JSON response
        return response.json();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
  