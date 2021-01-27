import React from 'react';
import { Layout } from 'antd';
import Nav from "../Sidebar";
const { Header, Footer, Sider, Content } = Layout;
function MainLayout(props) {
    return (
        <div>
            

            <Layout>
            <Header>Header</Header>
      <Nav/>
      <Layout>
        
        <Content>Content</Content>
       
      </Layout>
    </Layout>
        </div>
    );
}

export default MainLayout;



