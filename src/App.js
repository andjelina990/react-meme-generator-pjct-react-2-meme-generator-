import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import FileSaver from 'file-saver';

function App() {
  const [input, setInput] = useState('');
  const [templates, setTemplates] = useState([]);
  const [drop, setDrop] = useState('');
  const [url, setUrl] = useState('');
  const [toptext, setToptext] = useState('top text');
  const [bottomtext, setBottomtext] = useState('bottom text');
  const [image, setImage] = useState(
    'https://api.memegen.link/images/aag/foo/bar.png',
  );
  const saveFile = () => {
    FileSaver.saveAs(image, 'meme.png');
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('https://api.memegen.link/templates');
        setTemplates(result.data);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    })().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div className="container">
      <label>
        <select
          className="input"
          // value={setTemplates}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              setImage(
                `https://api.memegen.link/images/${drop}/${toptext}/${bottomtext}.png`,
              );
            }
          }}
          onChange={(event) => {
            setDrop(event.currentTarget.value);
          }}
        >
          <option>Meme Templates</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </label>
      <div className="ok">
        <img
          data-test-id="meme-image"
          style={{
            width: '100%',
            height: '300px',
            margin: '30px 0 30px 0',
            borderRadius: '20px',
            boxShadow: '2px solid black',
          }}
          src={image}
          alt=""
        />
        <form>
          <label className="inp">
            Enter top text here:
            <br />
            <input
              className="inp"
              value={toptext}
              placeholder="top text"
              onChange={(event) => {
                setToptext(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <br />
          <label className="inp">
            Enter top text here:
            <br />
            <input
              className="inp"
              value={bottomtext}
              placeholder="bottom text"
              onChange={(event) => {
                setBottomtext(event.currentTarget.value);
              }}
            />
          </label>
        </form>
      </div>
      <div className="button">
        <button
          className="jump"
          onClick={() => {
            setImage(
              `https://api.memegen.link/images/${drop}/${toptext}/${bottomtext}.png`,
            );
          }}
        >
          Generate
        </button>
        <button
          className="btn"
          onClick={() => {
            console.log(image);
            setImage(image);
            saveFile();
          }}
        >
          Download
        </button>
        <button
          className="btn"
          onClick={() => setToptext('')(setBottomtext(''))}
        >
          Clear
        </button>
      </div>
      {/* <label>
        <input
          className="input"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </label> */}
    </div>
  );
}
export default App;
