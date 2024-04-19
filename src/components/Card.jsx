import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import {
  getFirestore,
} from "firebase/firestore";
const db = getFirestore();


export const Card = ( { key, blog, editable } ) => {

  const navigate = useNavigate()


  const handleDeleteBlog = async ( blogId ) => {
    try
    {
      // Delete the blog document using deleteDoc function
      await deleteDoc( doc( db, "Blogs", blogId ) );
      console.log( "Blog deleted successfully" );
      // After successful deletion, navigate to a different route
    } catch ( error )
    {
      console.error( "Error deleting blog:", error );
      // Handle error if deletion fails
    }
  };



  console.log( blog );


  return (
    <div key={ key } className=" border border-gray-200 shadow-md p-2 h-auto cursor-pointer"  >
      <div className="">
        <img
          className="object-cover w-full h-full"
          width={ 200 }
          height={ 200 }
          src={ blog.imageUrl }
          alt="featured"
        />
      </div>
      <div className="py-4">
        <span>
          <p className="text-lg font-bold">{ blog.title }</p>
        </span>
        <span>
          <p className="text-sm">{ blog.content }</p>
        </span>
        { editable && (
          <div className="flex justify-end items-center gap-5 pt-10 pb-5 px-2">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer"
              onClick={
                () => navigate( `/edit-blog/${ blog.id }` )
              }
            >
              Edit
            </button>
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer"
              onClick={ () => handleDeleteBlog( blog.id ) }
            >
              Delete
            </button>
          </div>
        ) }
      </div>
    </div>
  );
};
