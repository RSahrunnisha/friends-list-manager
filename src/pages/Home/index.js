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
  const [searchData, setSearch] = useState();
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
    if (event.target.value) {
      const filteredData = friendsList.filter((item) =>
        item["name"]
          .toString()
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setSearch(filteredData);
    } else {
      setSearch(null);
    }
  };
  const setFavourite = (id, flag) => {
    const _friendsList = [...friendsList];
    const index = _friendsList.findIndex((item) => item["id"] === id);
    _friendsList[index].isFavourite = flag;
    setFriendsList(_friendsList);

    if (searchData) {
      const _searchData = [...searchData];
      const filterDataIndex = _searchData.findIndex(
        (item) => item["id"] === id
      );
      if (filterDataIndex !== -1) {
        _searchData[filterDataIndex].isFavourite = flag;
        setSearch(_searchData);
      }
    }
  };

  const deleteFriend = (id) => {
    const _friendsList = [...friendsList];

    const index = _friendsList.findIndex((item) => item["id"] === id);
    _friendsList.splice(index, 1);
    setFriendsList(_friendsList);

    if (searchData) {
      const _searchData = [...searchData];
      const filterDataIndex = _searchData.findIndex(
        (item) => item["id"] === id
      );
      if (filterDataIndex !== -1) {
        _searchData.splice(filterDataIndex, 1);
        setSearch(_searchData);
      }
    }
    setIsVisible(false);
  };

  useEffect(() => {
    let _displayList = searchData || friendsList;
    let sorted = [..._displayList].sort((p1, p2) =>
      p1["isFavourite"] === p2["isFavourite"]
        ? p1["id"] > p2["id"]
          ? -1
          : 1
        : p1["isFavourite"]
        ? -1
        : 1
    );
    _displayList && setListLength(Math.ceil(sorted.length / 4));
    if (_displayList.length > 4) {
      const endIndex = currentPage * 4;
      const startIndex = endIndex - 4;
      sorted = sorted.slice(startIndex, endIndex);
    }
    setDisplayList(sorted);
  }, [searchData, friendsList, currentPage]);

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
                <div
                  className="list-box"
                  key={"myfriend-" + index}
                >
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
        onSuccessHandler={() => deleteFriend(deleteIndex)}
      />
    </div>
  );
};

export default Home;
