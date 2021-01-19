import React from "react";

const Settings = () => {
  return (
    <section className="settings">
      <form>
        <label>
          Choose number of jokes:
          <input
            name="jokes"
            type="number"
          />
        </label>
        <label>
          Choose number of popular terms:
          <input
            name="terms"
            type="number"
          />
        </label>
        <button>
          <img src="../../logo.png" alt="logo" />
        </button>
      </form>
    </section>
  );
};

export default Settings;
