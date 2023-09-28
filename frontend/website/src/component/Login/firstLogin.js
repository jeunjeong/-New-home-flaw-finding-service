import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function 첫번째로그인페이지() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState(sessionStorage.getItem('password') || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [phone, setPhone] = useState(sessionStorage.getItem('phone') || '');
  const [newPhone, setNewPhone] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [phoneChangeSuccess, setPhoneChangeSuccess] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(''); // 이미지 업로드 메시지
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = sessionStorage.getItem('refreshToken');
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target.result;
        setImage(uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인합니다.
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    // FormData 객체를 생성하여 데이터를 담습니다.
    const formData = new FormData();
    if (image) {
      formData.append("profileimage", image);
    }
    // JSON 데이터를 생성합니다.
    const jsonData = {
      name: name,
      password: newPassword,
      phone: newPhone,
    };

    // 여기서 API PATCH 요청을 보냅니다.
    sendUpdateRequest(formData, jsonData);
  };

  const sendUpdateRequest = (formData, jsonData) => {
    // axios를 사용하여 PATCH 요청을 보냅니다.
    const headers = {
      'Authorization': `${refreshToken}`,
    };

    axios
      .patch(`${BASE_URL}/api/v1/private/members/employees`, formData, { headers })
      .then((response) => {
        // 성공적으로 업데이트된 경우
        console.log("이미지 업로드 성공:", response.data);

        // 나머지 데이터 업데이트 요청
        axios
          .patch(`${BASE_URL}/api/v1/private/members/employees`, jsonData, { headers })
          .then((response) => {
            // 성공적으로 업데이트된 경우
            console.log("API 요청 성공:", response.data);

            // 여기서 성공 메시지를 처리하거나 필요한 로직을 추가하세요.
            // 예를 들어, sessionStorage 업데이트 및 성공 메시지 표시
            sessionStorage.setItem('password', newPassword);
            sessionStorage.setItem('phone', newPhone);
            setPasswordChangeSuccess(true);
            setPhoneChangeSuccess(true);
          })
          .catch((error) => {
            // 요청이 실패한 경우
            console.error("API 요청 실패:", error);

            // 실패 메시지를 처리하거나 에러 핸들링을 추가하세요.
          });
      })
      .catch((error) => {
        console.error("이미지 업로드 실패:", error);
        setUploadMessage('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className="infocha fontb">
      <div className="infoin">
        <div className="infogridx">
          <div>
            <label htmlFor="profile-image">
              <img
                src={image}
                className="infoimg"
                style={{ border: '2px solid black', cursor: 'pointer' }}
                alt="프로필"
              />
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <span className="infofirtitle">{name}</span>
            {uploadMessage && <p style={{ color: 'red' }}>{uploadMessage}</p>}
          </div>

          <div style={{ marginTop:'6.9rem', display:'flex', justifyContent:'space-between' }}>
            <p style={{ fontSize:'1.3rem', fontWeight:'bold' }}>아이디 : {username}</p>
          </div>
        </div>
       
        <div>
          <div className='passtagboxx'>
            연락처
            <p>
              <input
                className='detailpassboxs'
                placeholder='연락처를 입력해주시오.'
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </p>
            비밀번호 변경
          </div>

          <div>
            <p>
              <input
                style={{marginTop: '1rem'}}
                className='detailpassboxx'
                placeholder='새 비밀번호'
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                style={{marginTop: '1rem'}}
                className='detailpassboxx'
                placeholder='새 비밀번호 확인'
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </p>
          </div>

          <div style={{ marginTop:'1rem', display: 'flex', justifyContent: 'center' }}>
            <button className='Changeboxx' onClick={handleUpdate}>변경하기</button>
          </div>

          {passwordChangeSuccess && (
            <p style={{ color: 'green', marginTop: '1rem' }}>비밀번호가 성공적으로 변경되었습니다.</p>
          )}
          {phoneChangeSuccess && (
            <p style={{ color: 'green', marginTop: '1rem' }}>휴대폰 번호가 성공적으로 변경되었습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default 첫번째로그인페이지;
