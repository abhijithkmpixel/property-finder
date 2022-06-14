import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorDiv = () => {
  const [state, setstate] = useState()
  useEffect(() => {
    
  console.log(JSON.stringify(state?._immutable.currentContent,null,4));
    return () => {
      
    }
  }, [])
  
  return (
    <div id="editorjs">
      <Editor
        editorState={state}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={setstate}
      />
    </div>
  );
};

export default EditorDiv;
