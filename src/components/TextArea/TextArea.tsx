import * as React from 'react';

interface Props {
  value: string;
  onChange: any;
  onSubmit: any;
}

const TextArea: React.SFC<Props> = ({ value, onChange, onSubmit }) => (
  <form
    className="mui-form mui-panel"
    onSubmit={onSubmit}
  >
    <legend>Add new note</legend>
      <div className="mui-textfield">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Your note…"
        />
      </div>

      <button
        type="submit"
        className="mui-btn mui-btn--primary"
      >
        Submit
      </button>
  </form>
);

export default TextArea;
