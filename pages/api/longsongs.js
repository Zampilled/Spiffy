
import {getSession} from 'next-auth/react';
import {getUsersSongsLong} from "../../lib/longspotify";


const handler = async (req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const response = await getUsersSongsLong(accessToken);
    const {items} = await response.json();
    return res.status(200).json({items});
};

export default handler;