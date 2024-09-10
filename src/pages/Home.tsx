import React from 'react';
import Stories from '../assets/components/Stories';
import AddPost from '../assets/components/AddPost';
import CurrentUserData from '../assets/js/CurrentUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home (){
    return (
        <>
            <Stories />
            <AddPost />
        </>
    );
};

