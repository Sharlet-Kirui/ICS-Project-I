    import React, { useState, useEffect } from 'react';

    function App() {
        const [message, setMessage] = useState('');

        useEffect(() => {
            fetch('http://localhost:5000/api/message')
                .then(response => response.json())
                .then(data => setMessage(data.message));
        }, []);

        return (
            
                <h1>{message}</h1>
            
        );
    }

    export default App;