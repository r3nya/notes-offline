import * as React from 'react';

interface Props {
  text: string;
  onDelete: () => void;
}

const ListItem: React.SFC<Props> = ({ text, onDelete }) => (
  <div className="mui-panel">
    <h4>{text}</h4>
    <button
      className="mui--pull-right mui-btn mui-btn--flat"
      onClick={onDelete}
    >
      Remove
    </button>
  </div>
);

export default ListItem;
