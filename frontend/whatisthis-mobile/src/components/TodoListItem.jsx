import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoListItem = ({ todoListName }) => {
  const navigate = useNavigate();

  //체크 됐을 때 상태, input 내용, 찍은 사진을 다 갖고 있어야함
  // 위에서 props로 받아와야 함.
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [imageList, setImageList] = useState([
    "/assets/image_none.png",
    "/assets/image_none.png",
    "/assets/image_none.png",
  ]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.checked);
  };

  return (
    <div className="TodoListItem">
      <div className="header">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        <h2>{todoListName}</h2>
        {/* 카메라로 이동할 때 해당 섹션 이름을 가져갸아함 */}
        <div className="image_wrapper" onClick={() => navigate(`/camera`)}>
          <img src={process.env.PUBLIC_URL + `/assets/camera.png`} alt="" />
        </div>
      </div>
      <input
        className="description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
      />
      {/* 이미지는 일단 세개까지만 되는걸로 하죠.. */}
      <div className="image_list">
        {imageList.map((it, idx) => {
          return <img key={idx} src={process.env.PUBLIC_URL + it} alt="img" />;
        })}
      </div>
    </div>
  );
};

TodoListItem.defaultProps = {
  todoListName: "cantGet",
};

export default TodoListItem;
