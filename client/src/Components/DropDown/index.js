import React, { useContext, useEffect, useRef, useState } from 'react'
import { AccountCircleRounded } from '@mui/icons-material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { ListItemIcon, ListItemText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { userContext } from '../../userContext';
import Cookies from 'js-cookie';


function UserDropDown({anchorEl,setAnchorEl}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const {state,setState} = useContext(userContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleLogout = async()=>{
    try{
     sessionStorage.removeItem('user');
     Cookies.remove('accessToken');
     setState({
      ...state,
      userState:false,
      user:''
     });
    }catch(e){
      console.log("Error is :",e);
    }
    setOpen(false);
    console.log(state);
  }

  const handleClick = ()=>{
    setState({
      ...state,
      userState:true,
    });
    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className='dropdown'>
      <div>
        <div
          ref={anchorRef}
          id="composition-div"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircleRoundedIcon className='navIcon'/>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper style={{margin:"5px 14px",padding:"2px 10px"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="composition-menu"
                    aria-labelledby="composition-div"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClick}>
                      <ListItemIcon>
                       <AccountCircleRounded />
                        </ListItemIcon>
                      <ListItemText primary="Login" />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutRoundedIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Logout"/>
                     </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}

export default UserDropDown