import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import pfp from "../../../../assets/bdc3d1e89b6837036990e53c64f55683.jpg";
import "./post.css";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const code = `function factorial(n) {
  if (n === 0) {
    return 1; // Base case: factorial of 0 is 1
  }
    return n * factorial(n - 1); // Recursive case
}`;

function Post() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="feedpost">
        <div className="pfpandname">
          <img src={pfp} alt="Profile" />
          <p className="username">Codes</p>
          <p className="uploadtime">. 1 day ago</p>
        </div>
        <div className="feedpostcontent">
          <p className="feedpostdesc">
            Practicing recursion today. Here's a simple factorial function.
          </p>
        </div>

        <div className="codesection">
          <button
            className="expand-btn"
            onClick={() => setExpanded(true)}
            aria-label="Expand code"
          >
            <i className="fi fi-rr-expand" />
          </button>
          <div className="codesection__preview">
            <SyntaxHighlighter
              language="javascript"
              style={prism}
              customStyle={{ background: "transparent", fontSize: "14px", margin: 0 }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="sffdfed">
          <div className="feedpostactions">
            <button className="likeanddeslike">
              <i className="fi fi-rr-up" />
            </button>
            <p className="likecount">65</p>
            <button className="likeanddeslike">
              <i className="fi fi-rr-up" id="deslike" />
            </button>
          </div>
          <button className="commentbtn">
            <i className="fi fi-rr-comment-alt-middle" />
            50
          </button>
        </div>
      </div>

      {expanded && (
        <div className="code-modal-overlay" onClick={() => setExpanded(false)}>
          <div className="code-modal" onClick={e => e.stopPropagation()}>
            <div className="code-modal__header">
              <button
                className="code-modal__close"
                onClick={() => setExpanded(false)}
                aria-label="Close"
              >
                <i className="fi fi-rr-cross" />
              </button>
            </div>
            <div className="code-modal__body">
              <SyntaxHighlighter
                language="javascript"
                style={prism}
                showLineNumbers
                customStyle={{ background: "transparent", fontSize: "14px", margin: 0, height: "100%" }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;