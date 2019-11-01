import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
// @ts-ignore
import loadable from '@loadable/component'
// import Header from '@/components/Header'

import './styles/common.less'
import './styles/content.less'

const HomePage = loadable(() => import('@/pages/home'))
const AboutPage = loadable(() => import('@/pages/about'))

const Layout: React.FC = props => {
  return (
    <>
      {/* <Header/> */}
      {props.children}
    </>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
