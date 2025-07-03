import React from 'react';
import { Tabs } from 'antd';
import { AppleOutlined, ContactsOutlined,CodeOutlined, AppstoreAddOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Navigate, Route } from 'react-router-dom';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { useSelector } from 'react-redux';
import AdminExperience from './AdminExperience';
import AdminProjects from './AdminProjects';
import AdminCertificates from './AdminCertificate';
import RedirecLoggedOut from '../../customHook/RedirecLoggedOut';
import { logoutUser } from '../../redux';

const Admin = () => {

  const logout = async() =>{
    

    await dispatchEvent(logoutUser())
    Navigate("/login");
    


    
   }

  const {portfolioData } = useSelector((state) => state.root);
  const tabsData = [
    {
      key: 'intro',
      label: 'Intro',
      children: <AdminIntro/>,
      icon: <AppleOutlined />,
      
      className: 'text-secondary text-4xl py-10 sm:text-xl sm:py-1', 
    },
    {
      key: 'about',
      label: 'About',
      children: <AdminAbout/>,
      icon: <ContactsOutlined />,
      className: 'text-secondary text-4xl py-10 sm:text-xl sm:py-1 ',
    },
    {
      key: 'experiences',
      label: 'Experiences',
      children: <AdminExperience />,
      icon: <CodeOutlined />,
      className: 'text-secondary text-4xl py-10 sm:text-xl sm:py-1 ',
    },
    {
      key: 'projects',
      label: 'Projects',
      children: <AdminProjects/>,
      icon: <AppstoreAddOutlined />,
      className: 'text-secondary text-3xl py-10 sm:text-xl sm:py-1 ',
    },
    {
      key: 'certificates',
      label: 'Certificates',
      children: <AdminCertificates />,
      icon: <CloudDownloadOutlined />,
      className: 'text-secondary text-4xl py-10 sm:text-xl sm:py-1 ',
    },
  ];

  return (
    <div className='sm:w-40 sm:px-4 sm:w-80'>
    <h1 className='justify-end px-20 relative z-10 text-2xl my-0 text-white text-bold  '>Admin Page</h1>


    <div className='mt-10 w-full flex relative z-10 px-20'>

      
        {portfolioData && <div>
        <Tabs defaultActiveKey="" items={tabsData.map(tab => ({
          ...tab,
          label: (<span className={tab.className}>{tab.label}</span>
        ), 
        }))} />
      </div>
      }
    </div>
    </div>
  );
};

export default Admin;
