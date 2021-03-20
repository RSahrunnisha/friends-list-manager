import { useEffect, useRef, useState } from "react";

import Header from "../../components/header";
import Pagination from "../../components/pagination";
import Modal from "../../components/modal";

import "./styles.scss";

const Home = () => {
  const [friendsList, setFriendsList] = useState([
    {
      id: 0,
      name: "Friend 1",
      isFavourite: false,
    },
    {
      id: 1,
      name: "Friend 2",
      isFavourite: false,
    },
  ]);
  const [displayList, setDisplayList] = useState([]);
  const [count, setCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const [searchValue, setSearchValue] = useState();
  const nameField = useRef();
  const searchField = useRef();

  const handleKeypress = (event) => {
    var code = event.keyCode || event.which;
    if (event.target.value && code === 13) {
      setFriendsList([
        {
          id: count,
          name: event.target.value,
          isFavourite: false,
        },
        ...friendsList,
      ]);
      nameField.current.value = "";
      setCount(count + 1);
    }
  };
  const handleOnSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const setFavourite = (id, flag) => {
    const _friendsList = [...friendsList];
    const index = _friendsList.findIndex((item) => item["id"] === id);
    _friendsList[index].isFavourite = flag;
    setFriendsList(_friendsList);
  };

  const deleteFriend = () => {
    const _friendsList = [...friendsList];

    const index = _friendsList.findIndex((item) => item["id"] === deleteIndex);
    _friendsList.splice(index, 1);
    setFriendsList(_friendsList);
    setIsVisible(false);
  };

  useEffect(() => {
    let _displayList = [...friendsList];
    if (searchValue) {
      _displayList = _displayList.filter((item) =>
        item["name"]
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    _displayList = [..._displayList].sort((p1, p2) =>
      p1["isFavourite"] === p2["isFavourite"]
        ? p1["id"] > p2["id"]
          ? -1
          : 1
        : p1["isFavourite"]
        ? -1
        : 1
    );
    const _listLength = Math.ceil(_displayList.length / 4);
    setListLength(_listLength);
    if (_displayList.length > 4) {
      currentPage > _listLength && setCurrentPage(_listLength);
      const endIndex = currentPage * 4;
      const startIndex = endIndex - 4;
      _displayList = _displayList.slice(startIndex, endIndex);
    }
    setDisplayList(_displayList);
  }, [friendsList, currentPage, searchValue]);

  return (
    <div className="home">
      <Header title="Friends List" />
      <div className="home_wrapper">
        <div className="container">
          <div className="container_header">
            <input
              type="text"
              ref={nameField}
              autoFocus
              onKeyPress={handleKeypress}
              className="name"
              placeholder="Enter your friend's name"
            />
            {friendsList.length ? (
              <input
                type="text"
                ref={searchField}
                onChange={handleOnSearch}
                className="search"
                placeholder="Search"
              />
            ) : null}
          </div>
          <div className="container_body">
            {displayList &&
              displayList.map((item, index) => (
                <div className="list-box" key={"myfriend-" + index}>
                  <div className="details-left">
                    <h4>{item.name}</h4>
                    <span>is your friend</span>
                  </div>
                  <div className="actions-right">
                    <button
                      onClick={() => setFavourite(item.id, !item.isFavourite)}
                      className="favourite"
                    >
                      {item.isFavourite ? <>&#9733;</> : <>&#9734;</>}
                    </button>
                    <button
                      onClick={() => {
                        setDeleteIndex(item.id);
                        setIsVisible(true);
                      }}
                      className="delete"
                    >
                      <div className="icon-trash">
                        <div className="trash-lid"></div>
                        <div className="trash-container"></div>
                        <div className="trash-line-1"></div>
                        <div className="trash-line-2"></div>
                        <div className="trash-line-3"></div>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {displayList && listLength > 1 && (
            <div className="container_footer">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                listLength={listLength}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onSuccessHandler={deleteFriend}
      />
    </div>
  );
};

export default Home;
