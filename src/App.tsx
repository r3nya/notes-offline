import * as React from 'react';
import * as PouchDB from 'pouchdb';
import * as uuidV1 from 'uuid/v1';
import { Header, ListItem, TextArea } from './components';
import './App.css';

interface Note {
  text: string;
}

interface State {
  textarea?: string;
  notes: any[];
  db: any;
}

class App extends React.Component<{}, State> {
  state = {
    textarea: '',
    notes: [],
    db: new PouchDB<Note>('notes'),
  };

  componentDidMount() {
    const remoteDB = new PouchDB('https://localhost:2020/notes');

    this.state.db.sync(remoteDB, {
      live: true,
      retry: true
    }).on('change', (change) => {
      console.info('db sync change', change);
      this.updateAllNotes();
    }).on('paused', (info) => {
      console.info('db sync paused', info);
      this.updateAllNotes();
    }).on('error', (err) => {
      console.info('db sync error', err);
    });
  }

  updateAllNotes() {
    this.state.db.allDocs({ include_docs: true }).then((docs) => {
      this.setState({ notes: docs.rows.map((item) => item.doc) });
    });
  }

  handleChangeField = (field) => (event) => {
    this.setState({
      [field]: event.target.value.trim(),
    });
   }

   handleAddNote = async (e) => {
    e.preventDefault();
    const { textarea, db } = this.state;

    if (!textarea) {
      return;
    }

    const newNote = {
      _id: uuidV1(),
      text: textarea,
    };

    try {
      await db.put(newNote).then((info) => {
        console.info('put complete', info);

        this.setState({ textarea: '' });
      });
    } finally {
      this.updateAllNotes();
    }
   }

   handleRemoveNote = async (id) => {
    const { db } = this.state;

    try {
      const doc: any = await db.get(id);
      await db.remove(doc._id, doc._rev);
    } finally {
      this.updateAllNotes();
    }
   }

  render() {
    const { textarea, notes } = this.state;

    return (
      <div
        className="mui-container-fluid"
        style={{
          backgroundColor: '#eee',
          minHeight: '100vh',
        }}
      >
        <Header />
        <div className="mui-row" style={{ marginTop: '10rem' }}>
          <div className="mui-col-md-6">
            {notes.map((item: any) => (
              <ListItem
                key={item._id}
                onDelete={() => this.handleRemoveNote(item._id)}
                {...item}
              />
            ))}
          </div>
          <div className="mui-col-md-6">
            <TextArea
              value={textarea}
              onChange={this.handleChangeField('textarea')}
              onSubmit={this.handleAddNote}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
