import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Form, Input, Button, Select } from "antd";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../axios-Instance";
import { Redirect  } from "react-router-dom";
const { Option } = Select;
// import axios from 'axios';
const { Header, Footer, Sider, Content } = Layout;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      youtube: "",
      twitch: "",
      twitter: "",
      patreon: "",
      gameName: "",
      releaseYear: "",
      genre: "",
      releaseMonth: "",
      publishedBy: "",
      generalReview: "",
      dailyGrindReview: "",
      appleAppStore: "",
      googlePlayStore: "",
      loading: false,
      images: null,
	  coverImage: "",
	  rankId: "",
	  files: [],
	  ranks: []
    };

    // this.handleChangeRank = this.handleChangeRank.bind(this);
    // this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmitLinks = this.handleSubmitLinks.bind(this);
    this.handleSubmitRank = this.handleSubmitRank.bind(this);
    this.handleSubmitGame = this.handleSubmitGame.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
  }
  componentDidMount(){
	//   console.log("admin panel componentDidMount ")
	axiosInstance
	.get("rank/getAll")
	.then((res) => {
	  this.setState({ranks: res.data.ranks})
	//   console.log(res.data.ranks);
	})
	.catch((err) => {
	  console.log('admin panel error',err.response);
	});
  }
  // handleChangeimage = info => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     );
  //   }
  // };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state.youtube)
  };
  handleChangeFiles(files) {
    this.setState({
      files: files,
    });
  }
  onChangeImage = (e) => {
    this.setState({
      // images: e.target.files[0].name
      images: e.target.files[0],
    });
    console.log(e.target.files[0].name);
  };

  onChangeCoverImage = (e) => {
    this.setState({
      // coverImage: e.target.files[0].name
      coverImage: e.target.files[0],
    });
    console.log(e.target.files[0].name);
  };
  // handleChangeRank=(event)=> {
  //   this.setState({
  //     name: event.target.value
  //   });
  // }
  // handleChangeDescription=(event)=> {
  //   this.setState({
  //     description: event.target.value
  //   });
  // }

  handleSubmitRank = (e) => {
    e.preventDefault();

    var rank = {
      name: this.state.name,
      description: this.state.description,
    };
    // console.log(form_data);
    // console.log(rank.rankName);
    // console.log(rank.description);
    axiosInstance
      .post("rank/add", rank)
      .then((res) => {
        // console.log(res);
        alert("Your Offer Added SuccessFully");
        // DealAdd()
        this.setState({
          name: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

	handleLogOut = () => {
		// localStorage.removeItem('jwtToken');
		localStorage.removeItem('loginToken');
		this.props.history.push('/');
	  }

	handleSubmitGame = (e) => {
		e.preventDefault();

    let data;
    let config;
    if (this.state.coverImage !== "" || this.state.images !== null) {
      data = new FormData();
      config = { headers: { "Content-type": "multipart/form-data" } };
      data.append("images", this.state.images);
      data.append("coverImage", this.state.coverImage);
      data.append("name", this.state.gameName);
      data.append("releaseYear", this.state.releaseYear);
      data.append("releaseMonth", this.state.releaseMonth);
      data.append("genre", this.state.genre);
      data.append("publishedBy", this.state.publishedBy);
      data.append("generalReview", this.state.generalReview);
      data.append("dailyGrindReview", this.state.dailyGrindReview);
      data.append("appleAppStore", this.state.appleAppStore);
      data.append("googlePlayStore", this.state.googlePlayStore);
      data.append("rank", this.state.rankId);
    } else {
      config = { headers: { "Content-type": "application/json" } };
      data = {
        name: this.state.gameName,
        releaseYear: this.state.releaseYear,
        releaseMonth: this.state.releaseMonth,
        genre: this.state.genre,
        coverImage: this.state.coverImage,
        images: this.state.images,
        publishedBy: this.state.publishedBy,
        generalReview: this.state.generalReview,
        dailyGrindReview: this.state.dailyGrindReview,
        appleAppStore: this.state.appleAppStore,
        googlePlayStore: this.state.googlePlayStore,
      };
    }

    // console.log(form_data);
    // console.log(rank.rankName);
    console.log(data);

    axiosInstance
      .post("games/add", data, config)
      .then((res) => {
        // console.log(res);
        alert("Your Offer Added SuccessFully");
        // DealAdd()
        this.setState({
          name: "",
          releaseYear: "",
          releaseMonth: "",
          genre: "",
          coverImage: "",
          images: "",
          publishedBy: "",
          generalReview: "",
          dailyGrindReview: "",
          appleAppStore: "",
          googlePlayStore: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmitLinks = (e) => {
    e.preventDefault();

    var links = {
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      twitch: this.state.twitch,
      patreon: this.state.patreon,
    };
    //   const formElementArray = [];

    // //   for (let key in this.state.links) {
    // //     formElementArray.push({
    // //         id: key,
    // //         config: this.state.links[key]
    // //     });
    // // }

		// const formData = {};
		//     for (let formElementIdentifier in links) {
		//         formData[formElementIdentifier] = this.state.links[formElementIdentifier].value;
		//     }
		// var form_Data = new FormData();
		// for (var key in links) {
		//   form_Data.append(key, links[key]);
		//   // console.log()
		// }
		// console.log(form_Data);
		axiosInstance
			.post('admin/add', links)
			.then((res) => {
				console.log(res);
				alert('Your Links Added SuccessFully');
				this.setState({
					youtube: '',
					twitter: '',
					twitch: '',
					patreon: '',
				});
			})
			.catch((err) => {
				console.log(err);
			});

    // axiosInstance.post('./admins',links).then
  };

  // handleSubmitGame = (e) => {
  //   e.preventDefault();

  //   const user = {
  //     gameName: this.state.gameName,
  //     releaseYear: this.state.releaseYear,
  //     genre: this.state.genre,
  //     releaseMonth: this.state.releaseMonth,
  //     publishedBy: this.state.publishedBy,
  //     generalReview: this.state.generalReview,
  //     appleAppStore: this.state.appleAppStore,
  //     googlePlayStore: this.state.googlePlayStore,
  //     dailyGrindReview: this.state.dailyGrindReview,
  //   };
  // }

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};
	// componentDidMount(){
	// // 	console.log("ADMIN PANEL",this.props)
	// //   }
	render() {
		const onFinish = (values) => {
			console.log('Success:', values);
		};
		const tailLayout = {
			wrapperCol: { offset: 14, span: 16 },
		};

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const { Content, Sider } = Layout;
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
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
              <h3 className="Admin-heading">Admin</h3>
            </div>
            <div />
          </Sider>

          <Layout className="site-layout">
            <Header style={{ backgroundColor: "white" }}>
              <div className="row">
                <div className="col-4">
                  <h1>Mobile Gaming Tier List</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-4 ">
                  <h2 className="center" {...tailLayout}>
                    Rank
                  </h2>
                  <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <div className="row">
                      <Form.Item
                        label="Name"
                        marginRight="30px"
                        style={{ marginRight: "5px" }}
                        // rules={[{ required: true, message: 'Please enter Rank!' }]}
                      >
                        <Input
                          marginLeft="10px"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </Form.Item>
                    </div>
                    <div className="row">
                      <Form.Item
                        label="Description"
                        rules={[{ required: false }]}
                      >
                        <Input
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                      </Form.Item>
                    </div>

                    <div className="row center">
                      <Form.Item {...tailLayout}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={(event) => this.handleSubmitRank(event)}
                          className="createRank"
                        >
                          Create Rank
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                  <div className="row">
                    <h2 className="center" {...tailLayout}>
                      Links
                    </h2>
                  </div>
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <div className="row">
                      <Form.Item label="Youtube">
                        <Input
                          marginLeft="10px"
                          name="youtube"
                          value={this.state.youtube}
                          onChange={this.handleChange}
                        />
                      </Form.Item>
                    </div>
                    <div className="row">
                      <Form.Item label="Twitch">
                        <Input
                          onChange={this.handleChange}
                          value={this.state.twitch}
                          name="twitch"
                        />
                      </Form.Item>

                      <Form.Item label="Twitter">
                        <Input
                          marginLeft="10px"
                          onChange={this.handleChange}
                          value={this.state.twitter}
                          name="twitter"
                        />
                      </Form.Item>

                      <Form.Item label="Patreon">
                        <Input
                          marginLeft="10px"
                          onChange={this.handleChange}
                          value={this.state.patreon}
                          name="patreon"
                        />
                      </Form.Item>
                    </div>

                    <div className="row center">
                      <Form.Item {...tailLayout}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={(e) => this.handleSubmitLinks(e)}
                          className="createRank"
                        >
                          Add Links
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
                <div className="col-8">
                  <h2 className="center" {...tailLayout}>
                    Game
                  </h2>
                  <Form
                    {...layout}
                    name="basic"
                    encType="multipart/form-data"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Name"
                      marginRight="30px"
                      style={{ marginRight: "5px" }}
                    >
                      <Input
                        marginLeft="10px"
                        onChange={this.handleChange}
                        value={this.state.gameName}
                        name="gameName"
                      />
                    </Form.Item>
					<Form.Item
                      label="Current Rank"
                      marginRight="30px"
                      style={{ marginRight: "5px" }}
                    >
					<Select defaultValue="Select Rank" style={{ width: 120 }} onChange={(value)=>this.setState({rankId: value})}>
					{this.state.ranks.map((rank, i)=> (
						<Option value={rank._id} key={i}>{rank.name}</Option>
					))}
					</Select>
					</Form.Item>
                    <Form.Item
                      label="Release Year"
                      marginRight="30px"
                      style={{ marginRight: "5px" }}
                    >
                      <Input
                        marginLeft="10px"
                        onChange={this.handleChange}
                        value={this.state.releaseYear}
                        name="releaseYear"
                      />
                    </Form.Item>

                    <Form.Item label="Genre">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.genre}
                        name="genre"
                      />
                    </Form.Item>

                    <Form.Item label="ReleaseMonth">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.releaseMonth}
                        name="releaseMonth"
                      />
                    </Form.Item>
                    <Form.Item label="PublishedBy">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.publishedBy}
                        name="publishedBy"
                      />
                    </Form.Item>
                    <Form.Item label="General Review" name="generalReview">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.generalReview}
                      />
                    </Form.Item>
                    <Form.Item label="Daily Grind Review">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.dailyGrindReview}
                        name="dailyGrindReview"
                      />
                    </Form.Item>

                    <Form.Item label="Apple App Store">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.appleAppStore}
                        name="appleAppStore"
                      />
                    </Form.Item>
                    <Form.Item label="Google Play Store">
                      <Input
                        onChange={this.handleChange}
                        value={this.state.googlePlayStore}
                        name="googlePlayStore"
                      />
                    </Form.Item>

                    <Form.Item label="Game Profile Image" name="GameImage">
                      {/* <div className="row" style={{justifyContent:"center",display:"flex",textAlign:"center"}}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChangeimage}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </div> */}
											<div className='row'>
												<div className='col-2'></div>
												<div className='col-9'>
													<div
														className='row'
														style={{
															borderRadius: '5px',
															border: '1px solid lightgrey',
														}}>
														<div
															class='file btn-lg btn-info'
															style={{
																position: 'relative',
																overflow: 'hidden',
																marginTop: '20px',
																marginBottom: '20px',
																marginInline: 'auto',
																width: '130px',
																fontSize: '16px',
																height: '45px',
																backgroundColor: '#ad1932',
																fontWeight: 'bold',
																color: 'white',
															}}>
															<p>Add Image</p>
															<input
																type='file'
																name='coverImage'
																onChange={(event) => this.onChangeCoverImage(event)}
																style={{
																	position: 'absolute',
																	fontSize: '50px',
																	opacity: 0,
																	right: 0,
																	top: 0,
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										</Form.Item>
										<Form.Item label='Game Description Images' name='GameImage'>
											<div className='row'>
												<div className='col-2'></div>
												<div className='col-9'>
													<div
														className='row'
														style={{
															borderRadius: '5px',
															border: '1px solid lightgrey',
														}}>
														<div
															class='file btn-lg btn-info'
															style={{
																position: 'relative',
																overflow: 'hidden',
																marginTop: '20px',
																marginBottom: '20px',
																marginInline: 'auto',
																width: '130px',
																fontSize: '16px',
																height: '45px',
																backgroundColor: '#ad1932',
																fontWeight: 'bold',
																color: 'white',
															}}>
															<p>Add Image</p>
															<input
																type='file'
																multiple={true}
																name='images'
																onChange={(event) => this.onChangeImage(event)}
																style={{
																	position: 'absolute',
																	fontSize: '50px',
																	opacity: 0,
																	right: 0,
																	top: 0,
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										</Form.Item>
										<div className='row center'>
											<Form.Item {...tailLayout}>
												<Button type='primary' htmlType='submit' onClick={(e) => this.handleSubmitGame(e)} className='createRank'>
													Create Game
												</Button>
												<Button type='primary' htmlType='submit' onClick={this.handleLogOut} className='createRank'>
													LogOut
												</Button>
											</Form.Item>
										</div>
									</Form>
								</div>
							</div>
						</Header>
						<Content>
							<div></div>
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default AdminPanel;
