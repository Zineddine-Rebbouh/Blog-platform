import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const Navbar = () => {
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
  const SignOut = () => {
    signOut( auth ) // Use signOut function with auth instance
      .then( () => {
        console.log( "User signed out successfully" );
      } )
      .catch( ( error ) => {
        console.error( "Sign out error", error );
      } );
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4 py-6 text-white">
        <nav className="flex items-center justify-between">
          {/* Logo or Brand Name (Optional) */ }
          <Link to="/" className="text-xl font-bold">
            BLOGHERE
          </Link>

          {/* Navigation Links */ }
          <div className="hidden md:flex items-center gap-10 font-bold">
            <Link to="/">Home</Link>
            {
              authUser && <Link to="/my-blogs">My Blogs</Link>
            }
            {
              authUser && <Link to="/create-blog">Create Blog</Link>
            }
            { authUser ? (
              <Link
                to="/logout"
                onClick={ SignOut }
                className="text-white hover:underline"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:underline">
                  Register
                </Link>
              </>
            ) }
          </div>

          {/* Hamburger Menu for Mobile (Optional) */ }
          <button className="md:hidden focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={ 2 }
                d="M4 6h16v12H4zm-2-2a2 2 0 112 2 2 2 0 01-2-2zM4 14h16v6H4zM4 18a2 2 0 112 2 2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};
