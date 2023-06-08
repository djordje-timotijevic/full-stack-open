```mermaid
sequenceDiagram
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Note over browser: Request HTML file from server
    server-->>browser: HTML file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Note over browser: Request CSS file from server
    server-->>browser: CSS file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Note over browser: Request JavaScript file from server
    server-->>browser: JavaScript file

    Note over browser: Browser executes JS code, <br/> requesting JSON data 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: JSON data

    Note over browser: JS code creates list of notes <br/> using received data
```
