import React, { useEffect, useState } from "react";
import "../../styles/sidebar.css"
import { useRecoilValue } from "recoil";
import { IsLoginSelector } from "../../Recoil/UserAtom";
import Modal from "../modal/ProfileModal";
import { Link } from "react-router-dom";

function Side(){
    // const [userNickname, setUserNickName] = useState('');
    const [userProfileUrl, setUserProfileUrl] = useState('');
    const [userNickname, setUserNickName] = useState('');
    const isLogin = useRecoilValue(IsLoginSelector);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const User = JSON.parse(sessionStorage.getItem('user'))?.UserAtom;
        console.log("sidebar user---------------------->" + User)
        setUserProfileUrl(User?.userProfileUrl);
        setUserNickName(User?.userNickname);
    }, [isLogin, userProfileUrl, isOpen, userNickname]);

    const handleClick = () => {
        setOpen(true);
    }

    return (
            <div className="sidebar">
                <div className="img">
                    {isLogin? 
                        <img className="profileImg" src={userProfileUrl}  onClick={handleClick}/>
                        : <img className="profileImg" /> }
                </div>
                <div>
                        {isOpen && (<Modal
                            open={isOpen}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />)}
                </div>
                {/* <div>
                    {userNickname}님 안녕하세요
                </div> */}
                <div className="sidebarText">모의면접</div>
                <div className="sidebarText">마이페이지
                    <div className="sidebarSmallText">자소서</div>
                    <div className="sidebarSmallText">면접 리포트</div>
                    <div className="sidebarSmallText">면접 후기</div>
                </div>
                <div className="sidebarText">면접 공유</div>
                <Link to="/mypage" > 테스트</Link>
            </div>

    );
}

export default Side;