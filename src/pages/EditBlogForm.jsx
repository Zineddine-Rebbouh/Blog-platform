import React, { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    updateDoc,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDb } from "../firebase";
import app from "../firebase";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";

const db = getFirestore( app );

const EditBlogForm = () => {
    const { id } = useParams(); // Get the blog ID from URL parameters
    const [ title, setTitle ] = useState( "" );
    const [ content, setContent ] = useState( "" );
    const [ image, setImage ] = useState( null );

    const [ authUser, setAuthUser ] = useState( null );

    const navigate = useNavigate()

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
        const fetchBlog = async () => {
            try
            {
                const docRef = doc( db, "Blogs", id );
                const docSnap = await getDoc( docRef );

                if ( docSnap.exists() )
                {
                    const blogData = docSnap.data();
                    setTitle( blogData.title || "" );
                    setContent( blogData.content || "" );
                    // Assuming you also want to update the image URL if it exists in the database
                    if ( blogData.imageUrl )
                    {
                        // Set image URL if it exists in the database
                        setImage( blogData.imageUrl );
                    }
                } else
                {
                    console.log( "No such document!" );
                }
            } catch ( error )
            {
                console.error( "Error fetching blog:", error );
            }
        };

        fetchBlog();
    }, [ id ] );

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !title || !content )
        {
            // Handle missing required fields (title, content)
            return;
        }

        if ( image )
        {
            const storageRef = ref( imgDb, "images/" + image.name );
            try
            {
                const uploadTask = await uploadBytes( storageRef, image );
                const imageUrl = await getDownloadURL( uploadTask.ref );

                const blogRef = doc( db, "Blogs", id );
                await updateDoc( blogRef, {
                    title,
                    content,
                    imageUrl,
                    updatedAt: serverTimestamp(), // Update timestamp
                } );

                alert( "Blog post edited successfully!" );
                navigate( '/' ); // Redirect to homepage after editing
            } catch ( error )
            {
                console.error( "Error editing blog post:", error );
                // Handle the error gracefully
            }
        }
    };


    const handleImageChange = ( e ) => {
        const selectedImage = e.target.files[ 0 ];
        setImage( selectedImage );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
            <form onSubmit={ handleSubmit }>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={ title }
                        onChange={ ( e ) => setTitle( e.target.value ) }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={ content }
                        onChange={ ( e ) => setContent( e.target.value ) }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="10"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="image"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Featured Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        onChange={ handleImageChange }
                        className="w-full py-2 px-3 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditBlogForm;
