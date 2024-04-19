import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import app from "../firebase";
import { Card } from "../components/Card";
import Loader from "../components/Loader";

const db = getFirestore( app );
const BlogList = collection( db, "Blogs" );

export const Home = () => {
  const [ blogsList, setBlogs ] = useState( [] );
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    // The onSnapshot function accepts a collection reference and returns an unsubscribe function
    const unsubscribe = onSnapshot( BlogList, ( querySnapshot ) => {
      const blogs = querySnapshot.docs.map( ( doc ) => ( {
        id: doc.id,
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
    <div className="container mx-auto py-5 relative">
      <h2 className="w-full font-bold text-xl mb-10">All Blogs List</h2>
      <div className="grid grid-cols-4 gap-6 h-auto">
        { blogsList.map( ( blog ) => (
          <Card key={ blog.id } blog={ blog } editable={ false } />
        ) ) }
      </div>
    </div>
  );
};
