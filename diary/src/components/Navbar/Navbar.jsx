import { useState } from 'react'
import Burger from './Button';
import Menu from './Menu';


const Navbar = () => {
    const [open, setOpen] = useState(false);

  return (
      <div>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
  )
}

export default Navbar
