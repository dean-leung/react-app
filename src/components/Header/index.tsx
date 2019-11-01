import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
// import Menu from 'antd/es/menu'
import './header.less'

const { Item } = Menu

const Header: React.FC = props => {

  return (
    <div className="page-wrapper header">
      <header className="page-container">
        <div className="header-logo">
          <Link to="/">
            <img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg" alt=""/>
          </Link>
        </div>
        <div className="header-menu">
          <Menu
            mode="horizontal"
          >
            <Item key="home">
              <Link to="/">Home</Link>
            </Item>
          </Menu>
        </div>
      </header>
    </div>
  )
}

export default Header
