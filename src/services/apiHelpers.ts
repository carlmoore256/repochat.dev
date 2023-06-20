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
              callback(decoded.slice(5, -2)); // slice the "data: \n\n"
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



// export function postRequestSSE(url : string, data : any, callback : (data : any) => void) {
//     // Make the initial POST request
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Use data to open SSE connection
//       const eventSource = new EventSource(url + "/" + data.some_value_from_post_response);
  
//       eventSource.onmessage = function(event) {
//         callback(event.data);
//       }
  
//       eventSource.onerror = function(error) {
//         console.error("EventSource failed:", error);
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   }
  