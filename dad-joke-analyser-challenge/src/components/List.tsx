import React from "react";

const List = () => {
  return (
    <section className="list-group-flush">
      <ul>
        <li className="list-group-item">
          Dad Joke goes here
          <br />
          <button className="btn btn-info">
            Popular terms
          </button>
          <button className="btn btn-info">
            go here
          </button>
        </li>
      </ul>
    </section>
  );
};

export default List;
