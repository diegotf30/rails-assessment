import React from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";

export default function Redirect() {
    const { shortCode } = useParams();
    window.location = `http://localhost:3000/${shortCode}`;
    return (<div/>);
}
