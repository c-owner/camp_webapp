import React from 'react';
import {Link} from 'react-router-dom';

const TagSectionComponent = () => {
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
    const regions = [
        {
            id: 0,
            'area': '전국',
            'key': 'all',
        }, {
            id: 1,
            'area': '서울',
            'key': 'seoul',
        }, {
            id: 2,
            'area': '경기',
            'key': 'gyeonggi',
        }, {
            id: 3,
            'area': '인천',
            'key': 'incheon',
        }, {
            id: 4,
            'area': '대전',
            'key': 'daejeon',
        }, {
            id: 5,
            'area': '대구',
            'key': 'daegu',
        }, {
            id: 6,
            'area': '광주',
            'key': 'gwangju',
        }, {
            id: 7,
            'area': '부산',
            'key': 'busan',
        }, {
            id: 8,
            'area': '울산',
            'key': 'ulsan',
        }, {
            id: 9,
            'area': '충북',
            'key': 'chungbuk',
        }, {
            id: 10,
            'area': '충남',
            'key': 'chungnam',
        }, {
            id: 11,
            'area': '전북',
            'key': 'jeonbuk',
        }, {
            id: 12,
            'area': '전남',
            'key': 'jeonnam',
        }, {
            id: 13,
            'area': '경북',
            'key': 'gyeongbuk',
        }, {
            id: 14,
            'area': '경남',
            'key': 'gyeongnam',
        }, {
            id: 15,
            'area': '제주',
            'key': 'jeju',
        }, {
            id: 16,
            'area': '강원',
            'key': 'gangwon',
        }
    ]
    // const regions = ['전국', '서울', '인천', '경기', '충북', '충남', '세종', '강원', '대전', '경북', '전북', '대구', '경남', '광주', '전남', '울산', '부산', '제주']
    const regionList = regions.map((region) => (
        <React.Fragment key={region.id}>
            <Link to="/search">
                <li className="tag-item-box" key={region.id}>
                    <span className="tag-item">{region.area}</span>
                </li>
            </Link>
        </React.Fragment>
    ))
    return (
        <div>
            <ul className="tag-box">
                {regionList}
            </ul>
        </div>
    )
}

export default TagSectionComponent;