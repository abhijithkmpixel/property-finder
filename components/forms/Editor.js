import React, { useEffect, useState } from "react";
import CKEditor from "react-ckeditor-component";

const EditorDiv = ({setdesc}) => {
  const [editorState, setEditorState] = useState(null);
  const onEditorChange = (evt) => {
    const newContent = evt.editor.getData();
    
    setEditorState(newContent);
    setdesc(newContent)
    // console.log(newContent);
  };

  return (
    <div id="editorjs">
      <CKEditor
        activeClass="p10"
        content={editorState}
        events={{
          // 'blur': this.onBlur.bind(this),
          // 'afterPaste': this.afterPaste.bind(this),
          change: onEditorChange,
        }}
      />


    </div>
  );
};

export default EditorDiv;
