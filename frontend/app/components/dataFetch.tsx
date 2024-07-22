// components/DataFetcher.tsx

import axios from 'axios';
import React from "react";


const dataFetch = async (setData: React.Dispatch<React.SetStateAction<any>>, url: string) => {
    try {
        const response = await axios.get(url);
        setData(response.data)
    } catch (error) {
        console.error('Error:', error);
    }
}

export default dataFetch;
