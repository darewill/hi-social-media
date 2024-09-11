import React from 'react';
import Stories from '../assets/components/Stories';
import AddPost from '../assets/components/AddPost';
import Feeds from '../assets/components/Feeds';
import CurrentUserData from '../assets/dummyAPIs/CurrentUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home (){
    return (
        <>
            <Stories />
            <AddPost />
            <Feeds />
        </>
    );
};

