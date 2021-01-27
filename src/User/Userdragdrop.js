import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "antd/dist/antd.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Layout, Menu } from "antd";
import Logo from "../asserts/logo.jpg";
import { Modal, Button } from "antd";
import { FaTwitch, FaPatreon } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { GrAppleAppStore } from "react-icons/gr";
import { SiGoogleplay } from "react-icons/si";
import axiosInstance from "../axios-Instance";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "lightgrey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export default class UserDragDrop extends Component {
  state = {
    items: getItems(10),
    selected: getItems(5, 10),
    ranks: [],
    allGames: [],
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  getList = (id) => {
    return this.state.allGames
      .filter((game) => game.rank._id === id)
      .map((game) => game.games)[0];
  };

  onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );
      let oldGames = this.state.allGames;
      oldGames.map((game) => {
        if (game.rank._id === source.droppableId) {
          game.games = items;
        }
      });
      this.setState({ allGames: oldGames });
      axiosInstance
    .post("adminRanking/update-new", {
      allGames: JSON.stringify(oldGames)
    })
    
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      let oldGames = this.state.allGames;
      oldGames.map((game) => {
        if (game.rank._id === source.droppableId) {
          game.games = result[source.droppableId];
        }
        if (game.rank._id === destination.droppableId) {
          game.games = result[destination.droppableId];
        }
      });
      this.setState({ allGames: oldGames });
      axiosInstance
    .post("adminRanking/update-new", {
      allGames: JSON.stringify(oldGames)
    })
    }
  };
  componentDidMount() {
    axiosInstance
      .get("adminRanking/get")
      .then((res) => {
        if (res.data.adminRankings.length) {
          let ranks = res.data.adminRankings.map((rank) => rank.rank);
          this.setState({ ranks, allGames: res.data.adminRankings });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  showModal = (item) => {
    this.setState({
      visible: true,
      modalDetails: item,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { Content, Sider, Header } = Layout;
    return (
      <div>
        <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
          <Sider
            className="backgroundColor"
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="text-center  font-weight-bold text-white py-4">
              <img src={Logo} alt="Avatar" className="avatar" />
            </div>
            <div />
            <div className="row">
              <AiFillYoutube
                style={{
                  height: "50px",
                  color: "white",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              />
            </div>
            <div className="row">
              <FaTwitch
                style={{ height: "50px", color: "white", marginBottom: "20px" }}
              />
            </div>
            <div className="row">
              <AiOutlineTwitter
                style={{ height: "50px", color: "white", marginBottom: "20px" }}
              />
            </div>
            <div className="row">
              <FaPatreon
                style={{ height: "40px", color: "white", marginBottom: "20px" }}
              />
            </div>
          </Sider>
          <Layout className="site-layout">
            <Header style={{ backgroundColor: "white" }}>
              <div className="row">
                <div className="col-6">
                  <h1 style={{ fontSize: "34px" }}>Mobile Gaming Tier List</h1>
                </div>
                <div className="col-2">Last Updated Oct 2020</div>
              </div>
            </Header>
            <Content>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  {this.state.allGames.map((game, i) => (
                    <div>
                      <div className="Card w-100" style={{height: 50}}>
                        <h3>{game.rank.name}</h3>
                        <p>{game.rank.description}</p>
                      </div>
                      <Droppable droppableId={game.rank._id} key={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            {game.games.map((item, index) => (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <img
                                      src={"http://localhost:8000/" + item.images[0]}
                                      draggable="false"
                                      alt="pic1"
                                      // width="100px"
                                      height="100px"
                                      onClick={() => this.showModal(game)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </DragDropContext>
              </div>
              {this.state.modalDetails && (
                <Modal
                  key={this.state.modalDetails.id}
                  closeIcon={false}
                  visible={this.state.visible}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={this.handleCancel}
                >
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-1">
                      <img
                        src={this.state.modalDetails.image}
                        width="70px"
                        height="70px"
                      />
                    </div>
                    <div className="col-4">
                      <h3>Shahrukh</h3>
                    </div>
                    <div className="col-7">
                      <div className="row right">
                        <div className="col-6 Approved">Approved By FG</div>
                        <div className="col-3 S-tier">S tier</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="Youtube-button">
                        <div className="row">
                          <div
                            className="col-2"
                            style={{ fontSize: "24px", marginTop: "-7px" }}
                          >
                            <AiFillYoutube />
                          </div>
                          <div className="col-10">General Review</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="Youtube-button">
                        <div className="row">
                          <div
                            className="col-2"
                            style={{ fontSize: "24px", marginTop: "-7px" }}
                          >
                            <AiFillYoutube />
                          </div>
                          <div className="col-10">Daily Grind Review</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Carousel responsive={responsive} arrows={false}>
                    {this.state.modalDetails.imagesArr.map((item, key) => (
                      <div style={{ marginTop: "10px" }}>
                        <img src={item.SubImage} width="600px" height="400px" />
                      </div>
                    ))}
                  </Carousel> */}

                  <div className="row margin-top-bottom">
                    <div className="col-4">
                      <p>
                        Publisedby:
                        <strong>{this.state.modalDetails.Publisedby}</strong>
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        Genre:<strong>{this.state.modalDetails.Genre}</strong>
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        ReleaseDate:
                        <strong>{this.state.modalDetails.ReleaseDate}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <div>
                        <p>Download here:</p>
                      </div>

                      <div></div>
                    </div>
                    <div className="col-3">
                      <div className="row Apple-button">
                        <div className="col-3">
                          {" "}
                          <GrAppleAppStore />{" "}
                        </div>
                        <div className="col-9"> App Store</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="row Google-button">
                        <div className="col-3">
                          {" "}
                          <SiGoogleplay />{" "}
                        </div>
                        <div className="col-9"> Google Play Store</div>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

// Put the things into the DOM!
