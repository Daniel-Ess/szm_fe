import React, { useState, useEffect } from "react";
import DataService from "../services/DataService";
import { Link } from "react-router-dom";
import { IList, IItem } from '../types/interfaces';

const Lists: React.FC = () => {
  const [lists, setLists] = useState<Array<IList>>([]);
  const [currentList, setCurrentList] = useState<IList | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const retrieveLists = () => {
    DataService.getAllLists()
      .then((response: any) => {
        setLists(response.data.lists);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveList = (list: IList, index: number) => {
    DataService.getList(list.id)
      .then((response: any) => {
        setCurrentList(response.data.list);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    setCurrentIndex(index);
  };

  const removeListItem = (list: IList, item: IItem) => {
    DataService.removeItem(list.id, item.id)
    .then((response: any) => {
      setActiveList(list, currentIndex);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  useEffect(() => {
    retrieveLists();
  }, []);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lists</h4>

        <ul className="list-group">
          {lists &&
            lists.map((list, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveList(list, index)}
                key={index}
              >
                {list.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentList ? (
          <div>
            <h4>List</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentList.name}
            </div>
            <Link
              to={"/lists/" + currentList.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            <Link
              to={"/lists/" + currentList.id + "/add-item"}
              className="badge badge-success ml-2"
            >
              Add item
            </Link>
            <h5>Items:</h5>
              <ul className="list-group">
                {currentList.items &&
                  currentList.items.map((item, index) => (
                    <li
                      className="list-group-item"
                      key={index}
                    >
                      {item.name}
                      <i onClick={() => removeListItem(currentList, item)} >&#x2716;</i>
                    </li>
                  ))}
              </ul>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a list...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
