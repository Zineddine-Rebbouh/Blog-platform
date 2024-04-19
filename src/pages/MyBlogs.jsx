import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import app from "../firebase";
import { Card } from "../components/Card";
import Loader from "../components/Loader";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";



const db = getFirestore( app );
const BlogList = collection( db, "Blogs" );



export const MyBlogs = () => {
  const [ blogsList, setBlogs ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ authUser, setAuthUser ] = useState( null );


  useEffect( () => {
    const unsubscribe = onAuthStateChanged( auth, ( user ) => {
      if ( user )
      {
        setAuthUser( user );
      } else
      {
        setAuthUser( null );
      }
    } );

    return () => unsubscribe(); // Cleanup subscription
  }, [ auth ] );

  useEffect( () => {
    // The onSnapshot function accepts a collection reference and returns an unsubscribe function
    const unsubscribe = onSnapshot( BlogList, ( querySnapshot ) => {
      const blogs = querySnapshot.docs.map( ( doc ) => ( {
        id: doc.id,
        userId: authUser,
        ...doc.data(),
      } ) );
      setBlogs( blogs );
      setLoading( false ); // Update loading state
    } );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [] );


  if ( loading ) return <Loader />;
  return (
    <div className="container mx-auto py-5 min-h-screen">
      <h2 className="w-full font-bold text-xl mb-10">All Blogs List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        { blogsList.map( ( blog ) => (
          <Card key={ blog.id } blog={ blog } editable={ true } />
        ) ) }
      </div>
    </div>
  );
};
