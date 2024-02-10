// components/DataFetcher.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher: React.FC<{ setData: React.Dispatch<React.SetStateAction<any>> }> = ({ setData }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/angler_core/api');
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setData]);

    return null; // Server-side component doesn't render anything
};

export default DataFetcher;
