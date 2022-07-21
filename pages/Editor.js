import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CKEditor from "react-ckeditor-component";
import Header from "../components/Header";
import { auth } from "./api/firebase";
import { useSession, signIn, signOut } from "next-auth/react";

const EditorDiv = () => {
  const { data: session } = useSession();

  const slug = useRouter();
  useEffect(() => {
    var d = slug?.route;
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // slug.push('/protected-route')
      }
    });

    return () => {};
  }, []);

  return (
    <div id="editorjs">
      <Header />
      <h1>hi there</h1>
      {!session && (
        <h1>
          no session{" "}
          <button className="btn btn-danger btn-lg" onClick={signIn}>
            sign in
          </button>
        </h1>
      )}
      {session && (
        <h1>
          signed in {session?.user.email}{" "}
          <button className="btn btn-danger btn-lg" onClick={signOut}>
            sign out
          </button>
        </h1>
      )}
      {/* <CKEditor
        activeClass="p10"
        content={editorState}
        events={{
          // 'blur': this.onBlur.bind(this),
          // 'afterPaste': this.afterPaste.bind(this),
          change: onEditorChange,
        }}
      /> */}
    </div>
  );
};

export default EditorDiv;

export async function getServerSideProps(context) {
  // const { req, params, query } = context;

  // onAuthStateChanged(auth, (currentUser) => {
  //   console.log(currentUser);
  //   if (!currentUser) {
  //     // slug.push('/protected-route')
  //     console.log("out");
  //     return {
  //       redirect: {
  //         destination: "/protected-route",
  //         permanent: false,
  //       },
  //     };
  //   } else {
  //     console.log("in");
  //   }
  // });
  return {
    props: {
      data: null,
    },
  };
}
