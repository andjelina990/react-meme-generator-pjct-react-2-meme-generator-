import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import FileSaver from 'file-saver';

function App() {
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
    <div>
      <select
        className="input"
        onChange={(event) => {
          setDrop(event.currentTarget.value);
        }}
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
        fffff
      </select>
      <img
        style={{
          width: '500px',
          height: '500px',
          border: '1px solid black',
          margin: '30px 0 30px 0',
        }}
        src={image}
        alt=""
      />
      <form>
        <label>
          Enter top text here:
          <br />
          <input
            value={toptext}
            onChange={(event) => {
              setToptext(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Enter top text here:
          <br />
          <input
            value={bottomtext}
            onChange={(event) => {
              setBottomtext(event.currentTarget.value);
            }}
          />
        </label>
      </form>
      <button
        className="btn"
        onClick={() => {
          setImage(
            `https://api.memegen.link/images/${drop}/${toptext}/${bottomtext}.png`,
          );
        }}
      >
        Generate
      </button>

      <button
        onClick={() => {
          console.log(image);
          setImage(image);
          saveFile();
        }}
      >
        Download
      </button>
    </div>
  );
}
export default App;
