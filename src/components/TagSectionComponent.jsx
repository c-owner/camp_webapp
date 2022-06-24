import React from 'react';
import { Link } from 'react-router-dom';

const TagSectionComponent = () => {
  let regionId = 0
  // {
  //   korea : '전국',
  //   seoul : '서울',
  //   incheon : '인천',
  //   kyungki: '경기',
  //   chungbuk: '충북',
  //   chungnam: '충남',
  //   sejong: '세종',
  //   kangwon: '강원',
  //   daejeon: '대전',
  //   kyungbuk : '경북',
  //   jeonbuk: '전북',
  //   daegu: '대구',
  //   kyungnam: '경남',
  //   gwangju: '광주',
  //   jeonnam: '전남',
  //   ulsan: '울산',
  //   busan: '부산',
  //   jeju : '제주'
  // }
  const regions = ['전국', '서울', '인천', '경기', '충북', '충남', '세종', '강원', '대전', '경북', '전북', '대구', '경남', '광주', '전남', '울산', '부산', '제주']
  const regionList = regions.map((region) => (
    <Link to="/search"><li className="tag-item-box" key={regionId++}>
      <span className="tag-item">{region}</span>
    </li></Link>
  ))
  return (
    <div>
      <ul className="tag-box">
        { regionList }
      </ul>
    </div>
  )
}

export default TagSectionComponent;