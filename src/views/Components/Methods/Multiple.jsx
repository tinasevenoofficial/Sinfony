import React, { useState } from 'react'
// @material-ui/core components
import useStyles from './styles/CommonStyles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PlusOutlined } from '@ant-design/icons'
import { Tabs, Menu, Dropdown } from 'antd'
import { PAYMENT_METHODS } from 'utils/constants'
import { Bono, Credito, Cheque, Datafono, Efectivo, Transferencia, Deposito } from './AllModals'

const { TabPane } = Tabs

const Multiple = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [selecteds, setSelecteds] = useState([])
  const [activeKey, setActiveKey] = useState(null)

  function callback(key) {
    setActiveKey(key)
  }

  const findMethod = id => PAYMENT_METHODS.find(item => item.id === parseInt(id))

  const Method = props => {
    switch (props.view) {
      case '1':
        return <Bono multiple />
      case '2':
        return <Cheque multiple />
      case '3':
        return <Credito creditType={props.type} multiple />
      case '4':
        return <Datafono multiple />
      case '5':
        return <Deposito multiple />
      case '6':
        return <Efectivo multiple />
      case '7':
        return <Transferencia multiple />

      default:
        console.log('Error: Dialog not found')
    }
  }

  const isSelected = key => selecteds.map(s => s.key).includes(key)

  const addMethod = method => {
    const newSelecteds = [...selecteds]
    if (!isSelected(method.key)) {
      newSelecteds.push({
        title: findMethod(method.key)?.name,
        content: <Method view={method.key} />,
        key: method.key,
      })
      setSelecteds(newSelecteds)
      setActiveKey(method.key)
    }
  }
  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      const newSelecteds = selecteds.filter(s => s.key !== targetKey)
      setSelecteds(newSelecteds)
    }
  }

  const menu = (
    <Menu onClick={addMethod}>
      {PAYMENT_METHODS.filter(m => !isSelected(m.id) && m.id !== 8).map(item => (
        <Menu.Item key={item.id}>{item.name}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <GridContainer justify="center" alignItems="center" style={{ maxWidth: '100%' }}>
          <GridItem xs={12}>
            <Tabs
              onChange={callback}
              type="editable-card"
              activeKey={activeKey}
              onEdit={onEdit}
              addIcon={
                <Dropdown overlay={menu}>
                  <PlusOutlined />
                </Dropdown>
              }
            >
              {selecteds.map(item => (
                <TabPane tab={item.title} key={item.key}>
                  {item.content}
                </TabPane>
              ))}
            </Tabs>
          </GridItem>
        </GridContainer>
      )}
    </>
  )
}

export default Multiple
