// components/DataFetcher.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type MyData = {
    app_name: string;
    owner: string;
    // Add more properties as needed
};

// Example usage:
const jsonData: MyData = {
    app_name: "app_psot_next",
    owner: "miha"

    // Add more properties as needed
};

const postData = async (formData: MyData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/angler_core/api', formData);
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Call the postData function with form data as parameter
postData(jsonData); // Replace formData with your form data object

export default postData;
