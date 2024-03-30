// authorization.js

import dotenv from "dotenv";
dotenv.config();

const Authorizations = {
    'X-API-KEY': process.env.LINE_SHOPPING_API_KEY,
    'User-Agent': 'TEST ACCOUNT 4'
};

export default Authorizations;
