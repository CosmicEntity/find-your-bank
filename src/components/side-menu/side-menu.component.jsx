import React,{useState} from 'react';
import { Menu } from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

const SideMenu  = () => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = ((e,{name})=>{
    setActiveItem(name)
    if(name==='All Banks')
    {history.push('/all-banks')}
    else
    {history.push('/favorites')}
  })

    return (
      <Menu vertical size={'large'}>
        <Menu.Item
          name='All Banks'
          active={activeItem === 'All Banks'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='Favorites'
          active={activeItem === 'Favorites'}
          onClick={handleItemClick}
        />
      </Menu>
    )
}

export default SideMenu