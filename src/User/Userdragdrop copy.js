import React, { Component } from "react";
import "antd/dist/antd.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Layout, Menu } from "antd";
import Logo from "../asserts/logo.jpg";
import Draggable from "react-draggable";
import { Modal, Button } from "antd";
import { FaTwitch, FaPatreon } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { GrAppleAppStore } from "react-icons/gr";
import { SiGoogleplay } from "react-icons/si";
import axiosInstance from "../axios-Instance";

const { Header, Footer, Sider, Content } = Layout;
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1.5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default class UserDragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0,
      },
      controlledPosition: {
        x: -400,
        y: 200,
      },
      allGames: [],
    };
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
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    console.log(x, y)
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
    // console.log(this.state.activeDrags);
  };

  onStop = (item) => {
    this.setState({ activeDrags: --this.state.activeDrags });
    // console.log(this.state.activeDrags);
  };
  componentDidMount() {
    axiosInstance
    .get("adminRanking/get")
    .then((res) => {
      this.setState({ allGames: res.data.adminRankings });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  render() {
    const { Content, Sider } = Layout;
    const { deltaPosition, controlledPosition } = this.state;
    // const { collapsed } = this.state;
    const dragHandlers = {
      onStart: this.onStart,
      onDrag: this.handleDrag,
    };
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
              <img src={Logo} alt="Avatar" class="avatar" />
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
              <div className="row">
                <div class="col-2">
                  {this.state.allGames.map((item, key) => (
                    <div className="row center" key={key}>
                      <div className="Card">
                        <h3>{item.rank.name}</h3>
                        <p>{item.rank.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="col-10">
                {this.state.allGames.map((item, key) => (
                  <div className="row" style={{ marginTop: "10px" }} key={key}>
                    {item.games.map((game, key) => (
                      <div className="col-md-2" style={{ width: "13.2%" }}>
                        <Draggable grid={[110, 110]} {...dragHandlers} onStop={()=>this.onStop()} >
                          <div
                            className="col-1"
                            style={{ marginLeft: "5px", marginRight: "5px" }}
                          >
                            <img
                              src={"http://localhost:8000/" + game.images[0]}
                              draggable="false"
                              alt="pic1"
                              width="100px"
                              height="100px"
                              // onClick={() => this.showModal(item)}
                            />
                          </div>
                        </Draggable>
                      </div>
                    ))}
                  </div>
                ))}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
