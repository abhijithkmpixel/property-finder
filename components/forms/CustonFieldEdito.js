import React, { useEffect, useRef, useState } from "react";

const CustonFieldEdito = ({ fieldName }) => {
  const [htmlview, sethtmlview] = useState(false)
  useEffect(() => {
    console.log('load');
  
    return () => {
      
    }
  }, [htmlview])
  
  const descritpion = useRef("asdsad");
  const addPara = () => {
    var text = document.getElementById(fieldName);
    var t = text.value.substr(
      text.selectionStart,
      text.selectionEnd - text.selectionStart
    );
    var newt = "<p>" + t + "</p>";
    text.value = text.value.replace(t.toString(), newt.toString());
  };
  const addBold = () => {
    var text = document.getElementById(fieldName);
    var t = text.value.substr(
      text.selectionStart,
      text.selectionEnd - text.selectionStart
    );
    var newt = "<b>" + t + "</b>";
    text.value = text.value.replace(t.toString(), newt.toString());
  };

  const addUl = () => {
    var areaId = "description";
    var text = "<ul></ul>";
    var txtarea = document.getElementById(areaId);
    if (!txtarea) {
      return;
    }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br =
      txtarea.selectionStart || txtarea.selectionStart == "0"
        ? "ff"
        : document.selection
        ? "ie"
        : false;
    if (br == "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart("character", -txtarea.value.length);
      strPos = range.text.length;
    } else if (br == "ff") {
      strPos = txtarea.selectionStart;
    }

    var front = txtarea.value.substring(0, strPos);
    var back = txtarea.value.substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
      txtarea.focus();
      var ieRange = document.selection.createRange();
      ieRange.moveStart("character", -txtarea.value.length);
      ieRange.moveStart("character", strPos);
      ieRange.moveEnd("character", 0);
      ieRange.select();
    } else if (br == "ff") {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
  };
  const addhead = (val, e) => {
    var text = document.getElementById(fieldName);
    var t = text.value.substr(
      text.selectionStart,
      text.selectionEnd - text.selectionStart
    );
    var newt = `<${val}>` + t + `</${val}>`;
    text.value = text.value.replace(t.toString(), newt.toString());
    e.target.value = "h1";
  };
  const addLi = (val, e) => {
    var text = document.getElementById(fieldName);
    var t = text.value.substr(
      text.selectionStart,
      text.selectionEnd - text.selectionStart
    );
    var newt = "<li>" + t + "</li>";
    text.value = text.value.replace(t.toString(), newt.toString());
  };
  function updatehtmldiv(){
    document.getElementById('htmlviewdiv').innerHTML = descritpion.current.value
  }
  return (
    <div className="custom_editor">
      <div className="controlBar">
        <button type="button" className="add-tag" onClick={addPara}>
          P
        </button>
        <button type="button" className="add-tag" onClick={addBold}>
          B
        </button>
        <button type="button" className="add-tag" onClick={addUl}>
          ul
        </button>
        <button type="button" className="add-tag" onClick={addLi}>
          li
        </button>
        <select name="" id="" onChange={(e) => addhead(e.target.value, e)}>
          <option defaultChecked>Heading</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
        </select>
        <div className="btn btn-primary" onClick={(e)=>{sethtmlview(htmlview == true? false:true);updatehtmldiv()}}>View</div>
      </div>
      <div className={`text_inputarea ${+ htmlview && 'hidden'}`}>
        <textarea name={fieldName} id={fieldName} ref={descritpion}></textarea>
        {/* <div dangerouslySetInnerHTML={{ __html:descritpion.current.value}}> 
        </div> */}

        </div>
        <div className={`htmlviewdiv p-3 bg-light border border-dark ${+ !htmlview && 'hidden'}`} style={{height:'250px'}} id="htmlviewdiv">
      </div>
    </div>
  );
};

export default CustonFieldEdito;
