// components/DataFetcher.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {router} from "next/client";

const deleteData = async (formData: any, url: string) => {
    try {
        const response = await axios.delete(url, formData);
        console.log('Response data:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null in case of error
    }
};

export default deleteData;
