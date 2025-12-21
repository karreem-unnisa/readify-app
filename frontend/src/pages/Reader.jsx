import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useState, useEffect, useRef } from "react";
import {
  addHighlight,
  getHighlights,
  deleteHighlight,
} from "../api/highlightApi";

import { addNote, deleteNote, getNotes } from "../api/noteApi";

import jsPDF from "jspdf";


function Reader() {

  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [notes, setNotes] = useState([]);

  const [query, setQuery] = useState("");

  const readerRef = useRef(null);

  const [selectedText, setSelectedText] = useState("");
  const [meta, setMeta] = useState(null);

  const [showBtn, setShowBtn] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const [noteText, setNoteText] = useState("");
  const [noteFor, setNoteFor] = useState(null);


  // LOAD
  useEffect(() => {
    async function load() {

      const a = await axiosClient.get(`/articles/${id}`);
      setArticle(a.data);

      const h = await getHighlights(id);
      setHighlights(h.data);

      const n = await getNotes(id);
      setNotes(n.data);
    }
    load();
  }, [id]);


  // REPAINT HIGHLIGHTS
  useEffect(() => {

    if (!readerRef.current || !article) return;

    readerRef.current.innerHTML = article.htmlContent;

    if (!highlights.length) return;

    const container = readerRef.current;
    const paragraphs = container.querySelectorAll("p");

    highlights.forEach((h) => {

      const p = paragraphs[h.paragraph];
      if (!p) return;

      let text = p.innerHTML;

      const before = text.slice(0, h.startIndex);
      const cut = text.slice(h.startIndex, h.endIndex);
      const after = text.slice(h.endIndex);

      p.innerHTML =
        before +
        `<mark data-hid="${h._id}" style="background:${h.color}">${cut}</mark>` +
        after;
    });

  }, [highlights, article]);


  // SAVE HIGHLIGHT
  const save = async () => {

    await addHighlight({
      articleId: article._id,
      text: selectedText,
      paragraph: meta.p,
      startIndex: meta.s,
      endIndex: meta.e,
      color: "#ffff00"
    });

    const h = await getHighlights(id);
    setHighlights(h.data);

    setSelectedText("");
    setMeta(null);
    setShowBtn(false);
  };


  // SCROLL
  const scrollTo = (h) => {

    const mark = readerRef.current.querySelector(
      `mark[data-hid="${h._id}"]`
    );

    if (!mark) return;

    mark.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    mark.style.outline = "2px solid red";
    setTimeout(() => (mark.style.outline = ""), 800);
  };


  // DELETE HIGHLIGHT
  const remove = async (hid) => {

    await deleteHighlight(hid);

    const h = await getHighlights(id);
    setHighlights(h.data);

    const n = await getNotes(id);
    setNotes(n.data);
  };


  // ON SELECT
  const select = () => {

    const sel = window.getSelection();
    const txt = sel.toString().trim();

    if (!txt) {
      setShowBtn(false);
      return;
    }

    const range = sel.getRangeAt(0);

    let node = range.startContainer;
    while (node && node.nodeName !== "P") node = node.parentNode;
    if (!node) return;

    const list = [...readerRef.current.querySelectorAll("p")];
    const paragraph = list.indexOf(node);

    const full = node.innerText;

    const start = full.indexOf(txt);
    const end = start + txt.length;

    setSelectedText(txt);
    setMeta({ p: paragraph, s: start, e: end });

    const r = range.getBoundingClientRect();
    setBtnPos({ x: r.right, y: r.top });

    setShowBtn(true);
  };


  // SAVE NOTE
  const saveNote = async () => {
    await addNote({
      articleId: article._id,
      highlightId: noteFor,
      text: noteText
    });

    const n = await getNotes(id);
    setNotes(n.data);

    setNoteText("");
    setNoteFor(null);
  };

  // DELETE NOTE
  const removeNote = async (nid) => {

    await deleteNote(nid);

    const n = await getNotes(id);
    setNotes(n.data);
  };


  // EXPORT PDF
  const exportPDF = () => {

  const doc = new jsPDF("p", "pt", "a4");

  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
  let y = 60;

  // Title
  doc.setFontSize(22);
  doc.text(article.title, margin, y);
  y += 40;

  // Date
  doc.setFontSize(12);
  doc.text("Export Date: " + new Date().toLocaleDateString(), margin, y);
  y += 30;

  // loop highlights
  highlights.forEach((h, i) => {

    // ---------- PAGE BREAK CHECK ----------
    if (y > 770) {
      doc.addPage();
      y = 60;
    }

    // Highlight head
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Highlight ${i + 1}:`, margin, y);
    y += 18;

    // highlight body
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(h.text, pageWidth);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 6;

    // notes
    const linkedNotes = notes.filter(n => n.highlightId === h._id);

    if (linkedNotes.length > 0) {

      doc.setFont("helvetica", "bold");
      doc.text("Notes:", margin, y);
      y += 16;

      linkedNotes.forEach(note => {

        const noteLines = doc.splitTextToSize("- " + note.text, pageWidth);
        doc.setFont("helvetica", "normal");
        doc.text(noteLines, margin + 10, y);

        y += noteLines.length * 14 + 4;

        if (y > 770) {
          doc.addPage();
          y = 60;
        }

      });
    }

    y += 14;
  });

  doc.save(article.title + "_highlights.pdf");
};




  if (!article) return <p>Loading...</p>;


  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* ARTICLE */}
      <div
        ref={readerRef}
        onMouseUp={select}
        style={{
          flex: 3,
          padding: "40px",
          overflowY: "auto",
          fontSize: "20px",
          lineHeight: "1.7"
        }}
      ></div>


      {/* SIDEBAR */}
      <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ccc",
          padding: "20px",
          overflowY: "auto"
        }}
      >

        {/* search */}
        <input
          placeholder="Search highlight…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "14px",
            border: "1px solid #aaa",
            borderRadius: "6px"
          }}
        />

        {/* export */}
        <button
          onClick={exportPDF}
          style={{
            width: "100%",
            padding: "8px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            marginBottom: "16px",
            cursor: "pointer"
          }}
        >
          Export PDF
        </button>


        <h2>Highlights</h2>

        {highlights
          .filter(h =>
            h.text.toLowerCase().includes(query.toLowerCase())
          )
          .map(h => (
            <div
              key={h._id}
              onClick={() => scrollTo(h)}
              style={{
                background: "#fffbd4",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {h.text.slice(0, 70)}...

              <button
                onClick={e => {
                  e.stopPropagation();
                  remove(h._id);
                }}
                style={{
                  float: "right",
                  background: "crimson",
                  color: "#fff",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                delete
              </button>


              {/* notes */}
              {notes
                .filter(n => n.highlightId === h._id)
                .map(n => (
                  <div
                    key={n._id}
                    style={{
                      background: "white",
                      marginTop: "6px",
                      padding: "6px",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  >
                    {n.text}

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        removeNote(n._id);
                      }}
                      style={{
                        float: "right",
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        cursor: "pointer"
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}


              <button
                onClick={e => {
                  e.stopPropagation();
                  setNoteFor(h._id);
                }}
                style={{
                  marginTop: "6px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add note
              </button>

            </div>
          ))}


        {/* NOTE TEXTAREA */}
        {noteFor && (
          <div style={{ marginTop: "20px" }}>

            <textarea
              rows="3"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{ width: "100%" }}
            />

            <button
              onClick={saveNote}
              style={{
                marginTop: "6px",
                background: "green",
                color: "white",
                padding: "6px 14px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none"
              }}
            >
              Save Note
            </button>

          </div>
        )}

      </div>


      {showBtn && (
        <button
          onClick={save}
          style={{
            position: "fixed",
            top: btnPos.y - 35,
            left: btnPos.x,
            background: "yellow",
            padding: "6px 16px",
            borderRadius: "4px",
            border: "1px solid black",
            cursor: "pointer",
            zIndex: 1000
          }}
        >
          highlight
        </button>
      )}

    </div>
  );
}

export default Reader;
