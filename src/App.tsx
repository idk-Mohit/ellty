import { useState } from "react";
import Card from "./components/card/Card";
import CheckBoxListItem from "./components/checkbox-list-item/CheckBoxListItem";
import Button from "./components/button/Button";

/**
 * App component.
 *
 * It renders a Card component which contains a list of checkbox items.
 * The list includes an item for all pages and four items for individual pages.
 * Below the list, there is a horizontal line and a button.
 * The button text changes to "Clicked!" when it is clicked, and changes back to "Done" after 500ms.
 */
function App() {
  const [selectAllPages, setSelectAllPages] = useState(false);
  const [clicked, setClicked] = useState(false);

  console.log(clicked);

  return (
    <div className="app">
      <Card>
        <ul>
          <CheckBoxListItem
            label="All pages"
            onChange={(e) => setSelectAllPages(e)}
            defaultChecked={selectAllPages}
          />
          <hr className="horizontal-line" />
          {Array.from({ length: 4 }).map((_, index) => (
            <CheckBoxListItem
              key={`${index}_${selectAllPages}`}
              label={`Page ${index + 1}`}
              defaultChecked={selectAllPages}
            />
          ))}
        </ul>
        <hr className="horizontal-line" />
        <Button
          text={clicked ? "Clicked!" : "Done"}
          onClick={() => {
            setClicked(true);
            setTimeout(() => setClicked(false), 500);
          }}
        />
      </Card>
      <p
        className="me"
        style={{
          color: clicked === true ? "black !important" : "white !important",
        }}
      >
        <a
          style={{ color: clicked ? "black" : "white" }}
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://idk-mohit.com/"
        >
          hi, it's me
        </a>
      </p>
    </div>
  );
}

export default App;
