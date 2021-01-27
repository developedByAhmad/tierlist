import React, { Component } from "react";
import "antd/dist/antd.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Layout, Menu } from "antd";
import Logo from "../asserts/logo.jpg";
import Pic1 from "../asserts/pic1.jpeg";
import Pic2 from "../asserts/pic2.png";
import Pic3 from "../asserts/pic3.png";
import Pic4 from "../asserts/pic4.jpg";
import Pic5 from "../asserts/pic5.png";
import Pic6 from "../asserts/pic6.jpeg";
import Pic7 from "../asserts/pic7.png";
import Pic8 from "../asserts/pic8.jpeg";
import Draggable from "react-draggable";
import { Modal, Button } from "antd";
import axiosInstance from "../axios-Instance";

import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { GrAppleAppStore } from "react-icons/gr";
import { SiGoogleplay } from "react-icons/si";
import { FaTwitch, FaPatreon } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import {
  EditOutlined,
  UserOutlined,
  LoginOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
// const {  Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;
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
export default class Mainadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      visibleC: false,
      visibleB: false,
      visibleD: false,
      visibleF: false,
      visibleDont: false,
      ranks: [],
      gameDetail: [],
      gameImages: [],
      Standardsetting: [
        {
          image: Pic1,
          Publisedby: "12/30/2020",
          Genre: "usama",
          ReleaseDate: "today",
          imagesArr: [
            {
              SubImage: Pic4,
            },
            {
              SubImage: Pic5,
            },
            {
              SubImage: Pic3,
            },
            {
              SubImage: Pic8,
            },
          ],
        },
      ],
      MustPay: [
        {
          image: Pic2,
          Publisedby: "hello",
          Genre: "",
          ReleaseDate: "",
          imagesArr: [
            {
              SubImage: Pic4,
            },
          ],
        },
        {
          image: Pic3,
          Publisedby: "hi",
          Genre: "",
          ReleaseDate: "",
          imagesArr: [
            {
              SubImage: "",
            },
          ],
        },
      ],
      Aboveaverage: [
        {
          image: Pic4,
          Publisedby: "helo",
          Genre: "hi",
          ReleaseDate: "hi",
          imagesArr: [
            {
              SubImage: Pic4,
            },
            {
              SubImage: Pic5,
            },
            {
              SubImage: Pic3,
            },
            {
              SubImage: Pic8,
            },
          ],
        },
      ],
      Average: [
        {
          image: Pic5,
          Publisedby: "",
          Genre: "",
          ReleaseDate: "",
          imagesArr: [
            {
              SubImage: "",
            },
          ],
        },
        {
          image: Pic6,
          Publisedby: "",
          Genre: "",
          ReleaseDate: "",
          imagesArr: [
            {
              SubImage: "",
            },
          ],
        },
      ],
      Flawed: [
        {
          image: Pic8,
          Publisedby: "",
          Genre: "",
          ReleaseDate: "",
          imagesArr: [
            {
              SubImage: "",
            },
          ],
        },
      ],
      modalData: [],
      Card: [
        {
          name: "S",
          description: "Standard Setting",
        },
        {
          name: "A",
          description: "Must Play",
        },
        {
          name: "B",
          description: "Above Average",
        },
        {
          name: "C",
          description: "Average",
        },
        {
          name: "D",
          description: "Flawed",
        },
        {
          name: "F",
          description: "Mostly Flawed",
        },
        {
          name: "Don't",
          description: "",
        },
      ],
      allGames: [],
    };
  }
  componentDidMount() {
    axiosInstance
      .get("rank/getAll")
      .then((res) => {
        var fetchedRanks = [];
        var RankNames = {};
        for (let key in res.data) {
          fetchedRanks.push(res.data[key]);
        }
        fetchedRanks.forEach((doc) => {
          RankNames = doc;
        });
        this.setState({ ranks: RankNames });
        console.log(this.state.ranks);
        // fetchedRanks.forEach((doc)=>{
        //   obj=doc.name
        //   console.log(doc.name);
        // })

        // console.log(fetchedRanks);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .get("games/getAll")
      .then((res) => {
        var fetchedGames = [];
        var gameData = {};
        var gameDetail = [];
        var gameImagesData = [];

        for (let key in res.data) {
          fetchedGames.push(res.data[key]);
        }
        fetchedGames.forEach((doc) => {
          gameData = doc;
        });
        console.log(gameData);

        gameData.forEach((data) => {
          gameImagesData.push(data.images);

          gameDetail.push({
            id: data._id,
            coverImage: data.coverImage,
            images: data.images,
            publishedBy: data.publishedBy,
            genre: data.genre,
            releaseDate: data.releaseMonth,
          });
        });
        this.setState({ gameDetail: gameDetail });
        console.log(gameDetail);
        // {for(let key in gamesData){
        //   gamesData[key].map(img => (
        //       <div className="col-1" style={{ marginLeft: "5px", marginRight: "5px" }}>
        //         <img src={img} alt="pic1" width="100px" height="100px" onClick={() => this.showModal()} />
        //       </div>
        //       // console.log(img)
        //   ))
        //   }}
        this.setState({ gameImages: gameImagesData });
        console.log(gameImagesData);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .get("adminRanking/get")
      .then((res) => {
        console.log("===>", res.data);
        this.setState({ allGames: res.data.adminRankings });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showModal = (id) => {
    axiosInstance
      .get(`games/getById/${id}`)
      .then((res) => {
        var fetchedGame = [];
        var singleGameDetail = [];

        for (let key in res.data) {
          fetchedGame.push(res.data[key]);
        }

        fetchedGame.forEach((data) => {
          singleGameDetail.push({
            id: data._id,
            gameName: data.name,
            coverImage: data.coverImage,
            images: data.images,
            publishedBy: data.publishedBy,
            genre: data.genre,
            releaseDate: data.releaseMonth,
          });
        });

        this.setState({
          visible: true,
          modalDetails: singleGameDetail,
        });

        console.log(fetchedGame);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showModal2 = (item) => {
    this.setState({
      visible2: true,

      modalData: item,
    });
    console.log(item);
  };
  // showModalB = (item) => {
  //   this.setState({
  //     visibleB: true,

  //   });
  // };
  // showModalC = (item) => {
  //   this.setState({
  //     visibleC: true,

  //   });
  // };
  // showModalD = (item) => {
  //   this.setState({
  //     visibleD: true,

  //   });
  // };
  // showModalF = (item) => {
  //   this.setState({
  //     visibleF: true,

  //   });
  // };
  // showModalDont = (item) => {
  //   this.setState({
  //     visibleDont: true,

  //   });
  // };
  handleCancel2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
  // handleCancelB = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleB: false,
  //   });
  // };
  // handleCancelC = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleC: false,
  //   });
  // };
  // handleCancelD = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleD: false,
  //   });
  // };
  // handleCancelF = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleF: false,
  //   });
  // };
  // handleCancelDont = e => {
  //   console.log(e);
  //   this.setState({
  //     visibleDont: false,
  //   });
  // };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
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

  handleLogOut = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('loginUser');
    <Redirect to="/" />
  }

  render() {
    const { Content, Sider } = Layout;
    const gamesImagesArr = this.state.gameImages;

    for (let key in gamesImagesArr) {
      var images = gamesImagesArr.map((img) => (
        <div style={{ marginTop: "10px" }}>
          <img
            src={"http://localhost:8000/" + img}
            width="100px"
            height="100px"
          />
        </div>
      ));
    }
    this.state.allGames.map(data => (
      console.log(data)
    ))
    // data.games.map((game, i) => (
    //   console.log(game)
    // ))

    // console.log(gamesImagesArr)

    const { collapsed } = this.state;

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
            {/* <Menu style={{backgroundColor:"#34bdeb"}} mode="inline" defaultSelectedKeys={['4']}   >
                  <Menu.Item key="1" icon={ <AiFillYoutube height="100px" style={{height:"100px"}}/>}><Link to="/allUsers"></Link></Menu.Item>
                  <Menu.Item key="2" icon={<PlusSquareOutlined />}>
                    <Link to="/allfaq"> All FAQS</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<EditOutlined />}>
                  <Link to="/editfaqs"> Edit FAQS </Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<LoginOutlined/>}>
                  <Link to="/" onClick={()=>this.logout()}> Logout</Link>
                  </Menu.Item>
              </Menu> */}
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
                  <h1>Mobile Gaming Tier List</h1>
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
                  // Close={this.handleCancel}
                  // onOk={this.handleOk}
                  okButtonProps={{ style: { display: "none" } }}
                  onCancel={this.handleCancel}
                >
                  <div className="row" style={{ marginBottom: "10px" }}>
                    {this.state.modalDetails.map(data => (
                      <React.Fragment>

                        <div className="col-1">
                          <img src={"http://localhost:8000/" + data.coverImage} width="70px" height="70px" />
                        </div>

                        <div className="col-4">
                          <h3>{data.gameName}</h3>
                        </div>
                        </React.Fragment>
                    ))}
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

                  <Carousel responsive={responsive} arrows={false}>
                    {this.state.modalDetails.map((game, key) => (
                      <div style={{ marginTop: "10px" }}>
                        <img
                          src={"http://localhost:8000/" + game.coverImage}
                          width="600px"
                          height="400px"
                        />
                      </div>
                    ))}
                  </Carousel>

                  <div className="row margin-top-bottom">
                    {this.state.modalDetails.map((data) => (
                      <div>
                        <div className="col-4">
                          <p>
                            Publisedby:<strong>{data.publishedBy}</strong>
                          </p>
                        </div>
                        <div className="col-4">
                          <p>
                            Genre:<strong>{data.genre}</strong>
                          </p>
                        </div>
                        <div className="col-4">
                          <p>
                            ReleaseDate:<strong>{data.releaseDate}</strong>
                          </p>
                        </div>
                      </div>
                    ))}
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
              <div class="col-10">
                <div className="row">
                  <div class="col-12">
                    {this.state.allGames.map((data) => (
                      <div className="d-flex justify-content-start align-items-center w-100 m-4 flex-wrap">
                        <div className="Card mx-3">
                          <h3>{data.rank.name}</h3>
                          {/* <p>{doc.description}</p> */}
                        </div>
                        {/* <div className="d-flex justify-content-start align-items-center"> */}
                        {data.games.map((game, i) => (
                          <div
                            className="card mx-3"
                            key={i}
                          >
                            <img
                              src={"http://localhost:8000/" + game.images[0]}
                              alt="pic1"
                              width="100px"
                              height="100px"
                              onClick={(event) => this.showModal(game._id)}
                            />
                          </div>
                        ))}
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                  {/* <div className="row" style={{ marginTop: "10px" }}>
                    {images}
                  </div> */}
                  {/* <div className="row" style={{ marginTop: "10px" }}>
                    {this.state.gameDetail.map((data, key) => (
                      <div
                        className="col-1"
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                      >
                        <img
                          src={"http://localhost:8000/" + data.images}
                          alt="pic1"
                          width="100px"
                          height="100px"
                          onClick={() => this.showModal(data.id)}
                        />
                      </div>
                    ))}
                  </div> */}
                  {/* <div className="row" style={{ marginTop: "10px" }}>
                    {this.state.Aboveaverage.map((item, key) => (
                      <div
                        className="col-1"
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                      >
                        <img
                          src={item.image}
                          alt="pic1"
                          width="100px"
                          height="100px"
                          onClick={() => this.showModal(item)}
                        />
                                          {/* <Modal
                          
                            closeIcon={false}
                            visible={this.state.visibleB}

                            okButtonProps={{ style: { display: 'none' } }}
                            onCancel={this.handleCancelB}
                      
                          >
                                <div className="row" style={{marginBottom:"10px"}}>
                                  <div className="col-1">
                                  <img src={item.image} width="70px" height="70px"/>
                                  </div>
                                  <div className="col-4"> 
                                  <h3>Shahrukh</h3>
                                  </div>
                                <div className="col-7">
                                  <div className="row right">
                                  <div className="col-6 Approved">
                                    Approved By FG
                                  </div>
                                  <div className="col-3 S-tier">
                                  S tier
                                  </div>
                                  </div>
                                
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col-3">
                                    <div className="Youtube-button">
                                      <div className="row">
                                        <div className="col-2" style={{fontSize:"24px",marginTop:"-7px"}} >

                                          <AiFillYoutube/>
                                        </div>
                                        <div className="col-10">
                                        General Review
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                  <div className="col-3">
                                    <div className="Youtube-button">
                                      <div className="row">
                                      <div className="col-2" style={{fontSize:"24px",marginTop:"-7px"}} >
                                          <AiFillYoutube />
                                        </div>
                                        <div className="col-10">
                                          Daily Grind Review
                                        </div>
                                      </div>

                                    </div>
                                  </div>

                                </div>
                              <Carousel 
                              responsive={responsive}
                              arrows={false}
                              >
                                
                                  {
                                item.imagesArr.map((item,key)=>
                              <div style={{marginTop:"10px"}}>
                                  <img src={item.SubImage} width="600px" height="400px"/>
                              </div>
                                
                                
                            
                                )
                              
                            }

                                  
                                
                          
                              </Carousel>
                                
                            
                          <div className="row margin-top-bottom">
                              <div className="col-4"><p>Publisedby:<strong>{item.Publisedby}</strong></p></div>
                              <div className="col-4"><p>Genre:<strong>{item.Genre}</strong></p></div>
                              <div className="col-4"><p>ReleaseDate:<strong>{item.ReleaseDate}</strong></p></div>
                          </div>
                          <div className="row">
                            <div className="col-2">
                              <div><p>Download here:</p></div>
                          
                              <div></div>
                            </div>
                            <div className="col-3">
                            <div className="row Apple-button">
                              <div className="col-3"> <GrAppleAppStore/> </div>
                              <div className="col-9">     App Store</div>
                        </div>
                            </div>
                            <div className="col-3">
                            <div className="row Google-button">
                              <div className="col-3"> <SiGoogleplay/> </div>
                              <div className="col-9">   Google Play Store</div>
                        </div>
                            </div>
                          </div>
                          </Modal> 
                      </div>
                    ))}
                  </div>
                  <div className="row" style={{ marginTop: "10px" }}>
                    {this.state.Average.map((item, key) => (
                      <div
                        className="col-1"
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                      >
                        <img
                          src={item.image}
                          alt="pici"
                          width="100px"
                          height="100px"
                          onClick={() => this.showModal(item)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="row" style={{ marginTop: "10px" }}>
                    {this.state.Flawed.map((item, key) => (
                      <div
                        className="col-1"
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                      >
                        <img
                          src={item.image}
                          alt="pic1"
                          width="100px"
                          height="100px"
                          onClick={() => this.showModal(item)}
                        />
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
